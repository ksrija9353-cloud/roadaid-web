import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BatteryCharging,
  Camera,
  CheckCircle2,
  CircleDot,
  Flame,
  Fuel,
  KeyRound,
  Mic,
  Navigation,
  Settings,
  Square,
  Trash2,
  Truck,
  WifiOff,
  Wrench,
} from 'lucide-react';
import { ASSET_IMAGES, DEFAULT_PIN } from '../../data/mockData';
import { LANGUAGE_LABELS, TRANSLATIONS } from '../../i18n/translations';
import { BreakdownRequest, FaultType, Language, LocationPin, VehicleType } from '../../types';
import {
  InteractivePinMap,
  OfflineBanner,
  SafeImage,
  VehicleIcon,
  VoiceInputButton,
} from '../ui/CommonUI';

const FAULT_OPTIONS: { key: FaultType; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'flat_tyre', icon: CircleDot },
  { key: 'dead_battery', icon: BatteryCharging },
  { key: 'engine_wont_start', icon: Wrench },
  { key: 'out_of_fuel', icon: Fuel },
  { key: 'clutch_gear', icon: Settings },
  { key: 'overheating', icon: Flame },
  { key: 'key_locked', icon: KeyRound },
  { key: 'accident_tow', icon: Truck },
];

export function RequestPage({
  language,
  onLanguageChange,
  requestDraft,
  onUpdateDraft,
  onSubmitRequest,
  onOpenSmsModal,
  onNotify,
  compactMobilePreview = false,
}: {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  requestDraft: BreakdownRequest;
  onUpdateDraft: (next: BreakdownRequest) => void;
  onSubmitRequest: () => void;
  onOpenSmsModal: () => void;
  onNotify: (msg: string) => void;
  compactMobilePreview?: boolean;
}) {
  const t = TRANSLATIONS[language];
  const reqT = t.request;
  const [simulateOffline, setSimulateOffline] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordSec, setRecordSec] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!recording) return;
    const id = window.setInterval(() => {
      setRecordSec((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [recording]);

  const setLocation = (loc: LocationPin) => {
    onUpdateDraft({ ...requestDraft, location: loc });
  };

  const toggleVoiceRecording = () => {
    if (recording) {
      setRecording(false);
      const duration = Math.max(2, recordSec);
      const sampleTranscript: Record<Language, string> = {
        en: 'Car pulled onto left shoulder after rear tyre blowout. Hazard lights are on.',
        hi: 'पिछला टायर फटने के बाद गाड़ी बाईं ओर खड़ी है। हज़ार्ड लाइट चालू है।',
        kn: 'ಹಿಂಬದಿಯ ಟೈರ್ ಪಂಕ್ಚರ್ ಆದ ನಂತರ ಕಾರನ್ನು ಎಡಭಾಗದಲ್ಲಿ ನಿಲ್ಲಿಸಿದ್ದೇನೆ.',
      };
      onUpdateDraft({
        ...requestDraft,
        voiceNoteDurationSec: duration,
        voiceTranscript: sampleTranscript[language],
      });
      setRecordSec(0);
      onNotify('Voice note attached and transcribed.');
    } else {
      setRecordSec(0);
      setRecording(true);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpdateDraft({ ...requestDraft, photoUrl: url });
    onNotify('Fault photo attached.');
  };

  const layoutGridClass = compactMobilePreview
    ? 'grid grid-cols-1 gap-5'
    : 'grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8';

  return (
    <div
      className={`${
        compactMobilePreview ? 'px-4 py-5 pb-20' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-24 sm:pb-12'
      }`}
    >
      {/* Header row with offline simulator toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] dark:text-white">
            {reqT.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{reqT.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => setSimulateOffline((v) => !v)}
          className={`min-h-[42px] px-3.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer ${
            simulateOffline
              ? 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-700 dark:text-amber-200'
              : 'bg-white dark:bg-[#111A2B] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          <WifiOff className="w-4 h-4" />
          <span>{reqT.offlineToggle}</span>
        </button>
      </div>

      {simulateOffline && (
        <div className="mb-6">
          <OfflineBanner
            message={reqT.offlineBanner}
            buttonLabel={reqT.requestBySms}
            onRequestSms={onOpenSmsModal}
          />
        </div>
      )}

      <div className={layoutGridClass}>
        {/* Left column: Location Map + Vehicle + Fault */}
        <div className={compactMobilePreview ? 'space-y-5' : 'lg:col-span-7 space-y-6'}>
          {/* Step 1: Location Pin */}
          <section className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-base sm:text-lg font-bold text-[#0F1B2D] dark:text-white">
                {reqT.stepLocation}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setLocation(DEFAULT_PIN);
                  onNotify('GPS coordinates refreshed.');
                }}
                className="text-xs font-semibold text-[#F26B1D] inline-flex items-center gap-1 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t.landing.detectLocation}</span>
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{reqT.dragPinHint}</p>

            <InteractivePinMap
              location={requestDraft.location}
              onLocationChange={setLocation}
              heightClass={compactMobilePreview ? 'h-48' : 'h-56 sm:h-64'}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                {reqT.addressLabel}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={requestDraft.location.address}
                  onChange={(e) =>
                    setLocation({ ...requestDraft.location, address: e.target.value })
                  }
                  className="flex-1 min-h-[48px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-[#0F1B2D] dark:text-white"
                />
                <VoiceInputButton
                  language={language}
                  onTranscript={(txt) =>
                    setLocation({ ...requestDraft.location, address: txt })
                  }
                  samplePhrase={DEFAULT_PIN.address}
                  label={t.common.voiceInput}
                  compact
                />
              </div>
            </div>
          </section>

          {/* Step 2: Vehicle Type Icon Row */}
          <section className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
            <h2 className="font-display text-base sm:text-lg font-bold text-[#0F1B2D] dark:text-white">
              {reqT.stepVehicle}
            </h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {(['bike', 'car', 'truck', 'bus'] as VehicleType[]).map((v) => {
                const selected = requestDraft.vehicleType === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => onUpdateDraft({ ...requestDraft, vehicleType: v })}
                    className={`min-h-[76px] p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      selected
                        ? 'bg-[#0F1B2D] dark:bg-[#F26B1D] border-[#0F1B2D] dark:border-[#F26B1D] text-white'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-[#0F1B2D] dark:text-slate-200 hover:border-[#F26B1D]'
                    }`}
                  >
                    <VehicleIcon type={v} className="w-6 h-6" />
                    <span className="text-xs font-semibold whitespace-nowrap">{t.common[v]}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                {reqT.regLabel}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={requestDraft.registrationNumber}
                  onChange={(e) =>
                    onUpdateDraft({
                      ...requestDraft,
                      registrationNumber: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder={reqT.regPlaceholder}
                  className="flex-1 min-h-[48px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-mono uppercase text-[#0F1B2D] dark:text-white"
                />
                <VoiceInputButton
                  language={language}
                  onTranscript={(txt) =>
                    onUpdateDraft({
                      ...requestDraft,
                      registrationNumber: txt.slice(0, 14).toUpperCase(),
                    })
                  }
                  samplePhrase="KA 05 MN 4821"
                  label={t.common.voiceInput}
                  compact
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right column: Fault Quick Cards + Media + Language + Submit */}
        <div className={compactMobilePreview ? 'space-y-5' : 'lg:col-span-5 space-y-6'}>
          {/* Step 3: Fault Quick Cards */}
          <section className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
            <h2 className="font-display text-base sm:text-lg font-bold text-[#0F1B2D] dark:text-white">
              {reqT.stepFault}
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {FAULT_OPTIONS.map(({ key, icon: Icon }) => {
                const selected = requestDraft.fault === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onUpdateDraft({ ...requestDraft, fault: key })}
                    className={`min-h-[54px] px-3 py-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                      selected
                        ? 'border-[#F26B1D] bg-orange-50 dark:bg-orange-950/40 text-[#0F1B2D] dark:text-white font-semibold'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${selected ? 'text-[#F26B1D]' : 'text-slate-500'}`} />
                    <span className="text-xs sm:text-sm leading-tight">{t.faults[key]}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 4: Photo, Voice Note & Language */}
          <section className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
            <h2 className="font-display text-base sm:text-lg font-bold text-[#0F1B2D] dark:text-white">
              {reqT.stepMedia}
            </h2>

            {/* Photo Upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            {requestDraft.photoUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 h-36">
                <SafeImage
                  src={requestDraft.photoUrl}
                  alt="Uploaded vehicle breakdown photo"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => onUpdateDraft({ ...requestDraft, photoUrl: null })}
                  aria-label="Remove photo"
                  className="absolute top-2 right-2 min-h-[36px] min-w-[36px] rounded-lg bg-black/70 text-white flex items-center justify-center cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="min-h-[48px] px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-xs font-semibold text-[#0F1B2D] dark:text-slate-200 inline-flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-[#F26B1D]" />
                  <span>{reqT.addPhoto}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateDraft({ ...requestDraft, photoUrl: ASSET_IMAGES.faultInspection })
                  }
                  className="min-h-[48px] px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
                >
                  {reqT.useSamplePhoto}
                </button>
              </div>
            )}

            {/* Voice Note Recorder */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={toggleVoiceRecording}
                className={`w-full min-h-[48px] px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  recording
                    ? 'bg-[#DC2626] border-[#DC2626] text-white'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-[#0F1B2D] dark:text-slate-100 hover:bg-slate-100'
                }`}
              >
                {recording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#F26B1D]" />}
                <span>
                  {recording
                    ? `${reqT.stopVoice} (${recordSec}s)`
                    : reqT.recordVoice}
                </span>
              </button>

              {requestDraft.voiceNoteDurationSec && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#16A34A]">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {reqT.voiceRecorded} ({requestDraft.voiceNoteDurationSec}s)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateDraft({ ...requestDraft, voiceNoteDurationSec: null, voiceTranscript: null })
                      }
                      className="text-slate-500 hover:text-[#DC2626] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                  {requestDraft.voiceTranscript && (
                    <p className="text-slate-700 dark:text-slate-300">“{requestDraft.voiceTranscript}”</p>
                  )}
                </div>
              )}
            </div>

            {/* Notes with Voice Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Notes</span>
                <VoiceInputButton
                  language={language}
                  onTranscript={(txt) => onUpdateDraft({ ...requestDraft, notes: txt })}
                  label={t.common.voiceInput}
                  compact
                />
              </div>
              <textarea
                rows={2}
                value={requestDraft.notes}
                onChange={(e) => onUpdateDraft({ ...requestDraft, notes: e.target.value })}
                placeholder={reqT.notesPlaceholder}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-[#0F1B2D] dark:text-white"
              />
            </div>

            {/* Language Selector */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{reqT.preferredLang}</span>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {(['en', 'hi', 'kn'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      onLanguageChange(lang);
                      onUpdateDraft({ ...requestDraft, language: lang });
                    }}
                    className={`min-h-[34px] px-2.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      language === lang
                        ? 'bg-white dark:bg-[#F26B1D] text-[#0F1B2D] dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {LANGUAGE_LABELS[lang].native}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Submit CTA */}
            {!compactMobilePreview && (
              <button
                type="button"
                onClick={onSubmitRequest}
                className="hidden sm:flex w-full min-h-[52px] px-6 rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white font-semibold text-base items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{reqT.submitBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </section>
        </div>
      </div>

      {/* Sticky Bottom Action Bar on Mobile */}
      <div
        className={`${
          compactMobilePreview ? 'sticky bottom-0' : 'sm:hidden fixed bottom-0 left-0 right-0 z-30'
        } bg-white/95 dark:bg-[#0B121E]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 no-print`}
      >
        <button
          type="button"
          onClick={onSubmitRequest}
          className="w-full min-h-[48px] rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{reqT.submitBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
