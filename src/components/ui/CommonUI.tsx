import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  Bike,
  Bus,
  Car,
  Check,
  CheckCircle2,
  Copy,
  MapPin,
  MessageSquare,
  Mic,
  MicOff,
  Navigation,
  ShieldCheck,
  Truck,
  WifiOff,
  X,
} from 'lucide-react';
import { MAP_LANDMARKS } from '../../data/mockData';
import { FaultType, JobStep, Language, LocationPin, ToastMessage, VehicleType } from '../../types';

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-600 dark:text-slate-300 p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ShieldCheck className="w-8 h-8 text-[#F26B1D] mb-2" />
        <span className="text-xs font-medium">{fallbackTitle || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setErrored(true)}
      className={className}
    />
  );
}

export function VehicleIcon({
  type,
  className = 'w-5 h-5',
}: {
  type: VehicleType;
  className?: string;
}) {
  switch (type) {
    case 'bike':
      return <Bike className={className} aria-hidden="true" />;
    case 'car':
      return <Car className={className} aria-hidden="true" />;
    case 'truck':
      return <Truck className={className} aria-hidden="true" />;
    case 'bus':
      return <Bus className={className} aria-hidden="true" />;
  }
}

export function VoiceInputButton({
  language,
  onTranscript,
  samplePhrase,
  label = 'Voice',
  compact = false,
}: {
  language: Language;
  onTranscript: (text: string) => void;
  samplePhrase?: string;
  label?: string;
  compact?: boolean;
}) {
  const [listening, setListening] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const defaultSamples: Record<Language, string> = {
    en: samplePhrase || 'Rear left tyre burst near Pillar 148 Silk Board',
    hi: samplePhrase || 'सिल्क बोर्ड पिलर 148 के पास पिछला टायर पंक्चर हो गया है',
    kn: samplePhrase || 'ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಪಿಲ್ಲರ್ 148 ಹತ್ತಿರ ಹಿಂಬದಿಯ ಟೈರ್ ಪಂಕ್ಚರ್ ಆಗಿದೆ',
  };

  const handleVoiceClick = () => {
    if (listening) {
      setListening(false);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      return;
    }

    const SpeechRecognitionCtor =
      (window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => unknown }).webkitSpeechRecognition;

    setListening(true);

    if (SpeechRecognitionCtor) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition: any = new SpeechRecognitionCtor();
        recognition.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        let resolved = false;
        recognition.onresult = (event: { results: { transcript: string }[][] }) => {
          resolved = true;
          const text = event.results?.[0]?.[0]?.transcript;
          if (text) onTranscript(text);
          setListening(false);
        };
        recognition.onerror = () => {
          if (!resolved) {
            onTranscript(defaultSamples[language]);
            setListening(false);
          }
        };
        recognition.onend = () => {
          setListening(false);
        };
        recognition.start();
        timerRef.current = window.setTimeout(() => {
          if (!resolved) {
            try {
              recognition.stop();
            } catch {
              // ignore
            }
            onTranscript(defaultSamples[language]);
            setListening(false);
          }
        }, 3500);
        return;
      } catch {
        // fallback below
      }
    }

    timerRef.current = window.setTimeout(() => {
      onTranscript(defaultSamples[language]);
      setListening(false);
    }, 1100);
  };

  return (
    <button
      type="button"
      onClick={handleVoiceClick}
      aria-label={listening ? 'Stop voice input' : 'Start voice input'}
      className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-xl font-medium text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
        compact ? 'px-3' : 'px-3.5 py-2'
      } ${
        listening
          ? 'bg-[#DC2626] text-white'
          : 'bg-slate-100 hover:bg-slate-200 text-[#0F1B2D] dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border border-slate-200 dark:border-slate-700'
      }`}
    >
      {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#F26B1D]" />}
      <span>{listening ? 'Listening…' : label}</span>
    </button>
  );
}

export function InteractivePinMap({
  location,
  onLocationChange,
  interactive = true,
  providerProgress,
  heightClass = 'h-64 sm:h-72',
  providerLabel = 'Rajesh K. (Van)',
}: {
  location: LocationPin;
  onLocationChange?: (pin: LocationPin) => void;
  interactive?: boolean;
  providerProgress?: number; // 0 to 1 for live job tracking
  heightClass?: string;
  providerLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  // Normalize lat/lng inside Bengaluru corridor viewbox
  const latToY = (lat: number) => Math.max(14, Math.min(86, ((12.99 - lat) / 0.16) * 100));
  const lngToX = (lng: number) => Math.max(14, Math.min(86, ((lng - 77.55) / 0.14) * 100));

  const pinX = lngToX(location.lng);
  const pinY = latToY(location.lat);

  const updateFromClientPos = (clientX: number, clientY: number) => {
    if (!interactive || !onLocationChange || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = Math.max(10, Math.min(90, ((clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(12, Math.min(88, ((clientY - rect.top) / rect.height) * 100));

    const newLat = Number((12.99 - (yPct / 100) * 0.16).toFixed(4));
    const newLng = Number((77.55 + (xPct / 100) * 0.14).toFixed(4));

    // Snap landmark label to closest corridor landmark
    let closest = MAP_LANDMARKS[0];
    let minDist = Infinity;
    for (const lm of MAP_LANDMARKS) {
      const d = Math.hypot(lm.lat - newLat, lm.lng - newLng);
      if (d < minDist) {
        minDist = d;
        closest = lm;
      }
    }

    onLocationChange({
      lat: newLat,
      lng: newLng,
      address: minDist < 0.02 ? closest.address : `NH-44 Corridor (${newLat}°N, ${newLng}°E)`,
      landmark: minDist < 0.02 ? closest.landmark : `Near ${closest.address.split(',')[0]}`,
      city: closest.city,
    });
  };

  // Provider marker interpolates from top-left hub toward driver pin
  const startX = 18;
  const startY = 24;
  const clampedProgress = providerProgress !== undefined ? Math.max(0, Math.min(1, providerProgress)) : 0;
  const providerX = startX + (pinX - startX) * clampedProgress;
  const providerY = startY + (pinY - startY) * clampedProgress;

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        if (!interactive) return;
        setDragging(true);
        updateFromClientPos(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (dragging && interactive) {
          updateFromClientPos(e.clientX, e.clientY);
        }
      }}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
      className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-[#EAEFF5] dark:bg-[#131F33] select-none ${
        interactive ? 'cursor-crosshair touch-none' : ''
      }`}
      aria-label="Interactive roadside breakdown map"
    >
      {/* Vector street & expressway grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
        <defs>
          <pattern id="roadaid-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              className="text-slate-300/60 dark:text-slate-700/50"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#roadaid-grid)" />

        {/* Parks / Green Zones */}
        <path
          d="M 40 240 Q 120 200 180 260 T 260 350 L 40 370 Z"
          className="fill-emerald-200/45 dark:fill-emerald-900/25"
        />
        <circle cx="660" cy="90" r="58" className="fill-emerald-200/40 dark:fill-emerald-900/20" />

        {/* Secondary Roads */}
        <path
          d="M 0 130 L 800 170 M 220 0 L 290 400 M 540 0 L 470 400 M 0 300 L 800 260"
          fill="none"
          stroke="currentColor"
          className="text-white/90 dark:text-slate-700"
          strokeWidth="6"
        />

        {/* Primary National Highway NH-44 / Ring Road */}
        <path
          d="M 0 80 C 210 110, 380 210, 800 220"
          fill="none"
          stroke="currentColor"
          className="text-amber-400/80 dark:text-amber-500/50"
          strokeWidth="11"
        />
        <path
          d="M 0 80 C 210 110, 380 210, 800 220"
          fill="none"
          stroke="currentColor"
          className="text-white/80 dark:text-slate-900"
          strokeWidth="2"
          strokeDasharray="10 8"
        />

        {/* Route line when provider tracking is active */}
        {providerProgress !== undefined && (
          <line
            x1={providerX * 8}
            y1={providerY * 4}
            x2={pinX * 8}
            y2={pinY * 4}
            stroke="#F26B1D"
            strokeWidth="4"
            strokeDasharray="8 6"
          />
        )}
      </svg>

      {/* Highway labels */}
      <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#0F1B2D] dark:text-slate-100 shadow-sm pointer-events-none">
        <Navigation className="w-3.5 h-3.5 text-[#F26B1D]" />
        <span className="font-mono tabular-nums text-[11px]">
          {location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E
        </span>
      </div>

      {/* Quick landmark buttons when interactive */}
      {interactive && onLocationChange && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 overflow-x-auto pb-0.5">
          {MAP_LANDMARKS.slice(0, 3).map((lm) => {
            const active = lm.address === location.address;
            return (
              <button
                key={lm.address}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onLocationChange(lm);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#0F1B2D] text-white dark:bg-[#F26B1D] dark:text-white'
                    : 'bg-white/95 dark:bg-slate-900/95 text-[#0F1B2D] dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {lm.address.split(',')[0]}
              </button>
            );
          })}
        </div>
      )}

      {/* Moving Provider Marker (Live Job) */}
      {providerProgress !== undefined && (
        <div
          style={{ left: `${providerX}%`, top: `${providerY}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 pointer-events-none z-10"
        >
          <div className="flex flex-col items-center">
            <div className="px-2 py-1 rounded-lg bg-[#0F1B2D] text-white text-[11px] font-medium whitespace-nowrap mb-1 shadow-md">
              {providerLabel}
            </div>
            <div className="w-9 h-9 rounded-full bg-[#16A34A] border-2 border-white shadow-lg flex items-center justify-center text-white">
              <Truck className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Driver Breakdown Pin */}
      <div
        style={{ left: `${pinX}%`, top: `${pinY}%` }}
        className="absolute -translate-x-1/2 -translate-y-full pointer-events-none transition-all duration-150 z-20"
      >
        <div className="flex flex-col items-center">
          <div className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-[#0F1B2D] dark:text-white border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-md whitespace-nowrap mb-1">
            {location.city} Pin
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F26B1D] border-2 border-white shadow-lg flex items-center justify-center text-white">
            <MapPin className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusTimeline({
  steps,
  currentStep,
}: {
  steps: [string, string, string, string, string];
  currentStep: JobStep;
}) {
  const order: JobStep[] = ['accepted', 'on_the_way', 'arrived', 'repairing', 'done'];
  const currentIdx = order.indexOf(currentStep);

  return (
    <div className="w-full" aria-label="Job progress timeline">
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {order.map((stepKey, idx) => {
          const completed = idx < currentIdx;
          const active = idx === currentIdx;
          return (
            <div key={stepKey} className="flex flex-col items-center text-center">
              <div className="w-full flex items-center">
                <div
                  className={`h-1.5 flex-1 rounded-l-full ${
                    idx === 0
                      ? 'bg-transparent'
                      : idx <= currentIdx
                      ? 'bg-[#16A34A]'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 border-2 ${
                    completed
                      ? 'bg-[#16A34A] border-[#16A34A] text-white'
                      : active
                      ? 'bg-[#F26B1D] border-[#F26B1D] text-white'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-400'
                  }`}
                >
                  {completed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <div
                  className={`h-1.5 flex-1 rounded-r-full ${
                    idx === order.length - 1
                      ? 'bg-transparent'
                      : idx < currentIdx
                      ? 'bg-[#16A34A]'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              </div>
              <span
                className={`mt-1.5 text-[11px] sm:text-xs font-medium leading-tight ${
                  active
                    ? 'text-[#F26B1D] font-semibold'
                    : completed
                    ? 'text-[#16A34A]'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {steps[idx]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SkeletonQuoteCard() {
  return (
    <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-44 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-56 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
          <div className="h-7 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-12 w-36 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function OfflineBanner({
  message,
  buttonLabel,
  onRequestSms,
}: {
  message: string;
  buttonLabel: string;
  onRequestSms: () => void;
}) {
  return (
    <div
      role="alert"
      className="bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
    >
      <div className="flex items-start gap-3">
        <WifiOff className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-amber-950 dark:text-amber-100">{message}</p>
      </div>
      <button
        type="button"
        onClick={onRequestSms}
        className="min-h-[44px] px-4 py-2 rounded-xl bg-[#0F1B2D] dark:bg-[#F26B1D] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer hover:opacity-95"
      >
        <MessageSquare className="w-4 h-4" />
        <span>{buttonLabel}</span>
      </button>
    </div>
  );
}

export function SmsFallbackModal({
  open,
  onClose,
  vehicleType,
  fault,
  location,
  onNotify,
}: {
  open: boolean;
  onClose: () => void;
  vehicleType: VehicleType;
  fault: FaultType;
  location: LocationPin;
  onNotify: (msg: string) => void;
}) {
  if (!open) return null;
  const smsCode = `ROADAID ${vehicleType.toUpperCase()} ${fault.toUpperCase()} ${location.lat.toFixed(4)},${location.lng.toFixed(4)}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(smsCode).catch(() => {});
    onNotify('SMS dispatch code copied to clipboard.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-[#0F1B2D] dark:text-white">Request Help by SMS</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close SMS dialog"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          No mobile data? Send this one-line SMS to <span className="font-mono font-semibold text-[#0F1B2D] dark:text-white">92205 92205</span>. You will receive fixed quotes via SMS within 60 seconds.
        </p>
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-[#0F1B2D] dark:text-slate-100 break-all mb-4">
          {smsCode}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 min-h-[48px] px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            <span>Copy SMS Text</span>
          </button>
          <a
            href={`sms:+919220592205?body=${encodeURIComponent(smsCode)}`}
            onClick={() => {
              onNotify('Opening device SMS app with pre-filled coordinates.');
              onClose();
            }}
            className="flex-1 min-h-[48px] px-4 rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white text-sm font-semibold inline-flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open SMS App</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-2 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto bg-[#0F1B2D] dark:bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-3 shadow-lg flex items-center justify-between gap-3 text-sm"
        >
          <div className="flex items-center gap-2.5">
            {t.tone === 'success' && <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />}
            {t.tone === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
            {t.tone === 'error' && <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0" />}
            {t.tone === 'info' && <ShieldCheck className="w-4 h-4 text-[#F26B1D] shrink-0" />}
            <span>{t.title}</span>
          </div>
          <button
            type="button"
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss notification"
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
