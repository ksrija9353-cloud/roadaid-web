import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Languages,
  PhoneCall,
  Send,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import { ASSET_IMAGES } from '../../data/mockData';
import { LANGUAGE_LABELS, TRANSLATIONS } from '../../i18n/translations';
import {
  BreakdownRequest,
  ChatMessage,
  JobStep,
  Language,
  PriceRevision,
  ProviderQuote,
} from '../../types';
import { InteractivePinMap, SafeImage, StatusTimeline, VoiceInputButton } from '../ui/CommonUI';

const STEP_ORDER: JobStep[] = ['accepted', 'on_the_way', 'arrived', 'repairing', 'done'];

export function LiveJobPage({
  language,
  requestDraft,
  selectedQuote,
  jobStep,
  onAdvanceStep,
  chatMessages,
  onSendMessage,
  priceRevision,
  onTriggerPriceRevision,
  onResolvePriceRevision,
  onRequestTow,
  onProceedToPayment,
  onNotify,
}: {
  language: Language;
  requestDraft: BreakdownRequest;
  selectedQuote: ProviderQuote;
  jobStep: JobStep;
  onAdvanceStep: (step: JobStep) => void;
  chatMessages: ChatMessage[];
  onSendMessage: (text: string) => void;
  priceRevision: PriceRevision | null;
  onTriggerPriceRevision: () => void;
  onResolvePriceRevision: (approved: boolean) => void;
  onRequestTow: () => void;
  onProceedToPayment: () => void;
  onNotify: (msg: string) => void;
}) {
  const t = TRANSLATIONS[language];
  const lt = t.liveJob;
  const pmt = t.priceModal;

  const [chatInput, setChatInput] = useState('');
  const [showOriginalIds, setShowOriginalIds] = useState<Record<string, boolean>>({});
  const [callOpen, setCallOpen] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const [liveProgress, setLiveProgress] = useState(0.35);

  useEffect(() => {
    const stepProgressMap: Record<JobStep, number> = {
      accepted: 0.2,
      on_the_way: 0.58,
      arrived: 0.96,
      repairing: 0.98,
      done: 1,
    };
    setLiveProgress(stepProgressMap[jobStep]);
  }, [jobStep]);

  const currentIdx = STEP_ORDER.indexOf(jobStep);
  const nextStep = STEP_ORDER[Math.min(STEP_ORDER.length - 1, currentIdx + 1)];
  const remainingEta = Math.max(0, Math.round(selectedQuote.etaMinutes * (1 - liveProgress)));

  const effectiveTotal =
    priceRevision && priceRevision.status === 'approved'
      ? priceRevision.newPrice
      : selectedQuote.totalFixedPrice;

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendMessage(chatInput.trim());
    setChatInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-12 space-y-6">
      {/* ETA & Price Lock Banner */}
      <div className="bg-[#0F1B2D] text-white rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>{lt.etaBanner}</span>
          </div>
          <h1 className="font-display text-xl sm:text-2xl font-extrabold">
            {jobStep === 'done'
              ? 'Repair completed · Ready to pay'
              : jobStep === 'arrived' || jobStep === 'repairing'
              ? `${selectedQuote.mechanicName} is on site`
              : `${lt.arrivingIn} ${remainingEta} ${t.common.min}`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {selectedQuote.providerName} · {selectedQuote.equipmentTag}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-right">
            <div className="text-[11px] text-slate-400">Locked total</div>
            <div className="font-display text-xl font-extrabold tabular-nums">₹{effectiveTotal}</div>
          </div>

          <button
            type="button"
            onClick={() => setCallOpen(true)}
            className="min-h-[48px] px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-[#16A34A]" />
            <span>{lt.callBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href).catch(() => {});
              onNotify('Live GPS tracking link copied. Share with family or fleet lead.');
            }}
            className="min-h-[48px] px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-[#F26B1D]" />
            <span>{lt.shareLocation}</span>
          </button>

          <button
            type="button"
            onClick={() => setSosOpen(true)}
            className="min-h-[48px] px-4 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{lt.sosBtn}</span>
          </button>
        </div>
      </div>

      {/* Status Timeline + Interactive Prototype Controls */}
      <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5">
        <StatusTimeline steps={lt.timelineLabels} currentStep={jobStep} />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            {jobStep !== 'done' && (
              <button
                type="button"
                onClick={() => onAdvanceStep(nextStep)}
                className="min-h-[40px] px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-[#0F1B2D] dark:text-slate-100 cursor-pointer"
              >
                {lt.advanceStepBtn}
              </button>
            )}
            <button
              type="button"
              onClick={onTriggerPriceRevision}
              className="min-h-[40px] px-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-semibold text-amber-900 dark:text-amber-200 cursor-pointer"
            >
              {lt.simulateRevisionBtn}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onRequestTow}
              className="min-h-[44px] px-4 rounded-xl border border-[#0F1B2D] dark:border-slate-600 text-sm font-semibold text-[#0F1B2D] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 inline-flex items-center gap-2 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#F26B1D]" />
              <span>{lt.needTowBtn}</span>
            </button>
            <button
              type="button"
              onClick={onProceedToPayment}
              className="min-h-[44px] px-5 rounded-xl bg-[#16A34A] hover:bg-emerald-700 text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lt.proceedPayBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split: Live Map + Auto-Translated Side Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <InteractivePinMap
            location={requestDraft.location}
            interactive={false}
            providerProgress={liveProgress}
            providerLabel={`${selectedQuote.mechanicName} · ${remainingEta}m`}
            heightClass="h-72 sm:h-96"
          />

          <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SafeImage
                src={selectedQuote.avatarUrl}
                alt={selectedQuote.mechanicName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
              />
              <div>
                <div className="text-sm font-bold text-[#0F1B2D] dark:text-white">
                  {selectedQuote.mechanicName} · {selectedQuote.providerName}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {requestDraft.location.landmark} · {t.common[requestDraft.vehicleType]} ({requestDraft.registrationNumber || 'Unregistered'})
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#16A34A] whitespace-nowrap">PIN Verified</span>
          </div>
        </div>

        {/* Auto-Translated Chat Panel */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col h-[440px]">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-[#F26B1D]" />
              <h2 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white">{lt.chatTitle}</h2>
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {lt.autoTranslated} → {LANGUAGE_LABELS[language].native}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => {
              const isDriver = msg.sender === 'driver';
              const showingOriginal = Boolean(showOriginalIds[msg.id]);
              const hasDifferentOriginal = msg.textOriginal !== msg.textTranslated;
              return (
                <div key={msg.id} className={`flex flex-col ${isDriver ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      isDriver
                        ? 'bg-[#0F1B2D] dark:bg-[#F26B1D] text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-[#0F1B2D] dark:text-slate-100'
                    }`}
                  >
                    <p className="leading-relaxed">
                      {showingOriginal ? msg.textOriginal : msg.textTranslated}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 px-1">
                    <span>{msg.timestamp}</span>
                    {hasDifferentOriginal && (
                      <button
                        type="button"
                        onClick={() =>
                          setShowOriginalIds((prev) => ({ ...prev, [msg.id]: !prev[msg.id] }))
                        }
                        className="font-semibold text-[#F26B1D] hover:underline cursor-pointer"
                      >
                        {showingOriginal ? lt.hideOriginal : lt.showOriginal} ({LANGUAGE_LABELS[msg.originalLanguage].short})
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleChatSubmit} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={lt.chatPlaceholder}
              className="flex-1 min-h-[44px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-[#0F1B2D] dark:text-white"
            />
            <VoiceInputButton
              language={language}
              onTranscript={(txt) => setChatInput(txt)}
              samplePhrase="I am standing by the toll lane barrier"
              label=""
              compact
            />
            <button
              type="submit"
              aria-label={lt.sendBtn}
              className="min-h-[44px] px-4 rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Price Approval Modal */}
      {priceRevision && priceRevision.status === 'pending' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs p-4" role="dialog" aria-modal="true">
          <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">RoadAid Price Lock Protection</div>
              <h2 className="font-display text-xl font-bold text-[#0F1B2D] dark:text-white">{pmt.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{pmt.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <div className="text-xs text-slate-500 dark:text-slate-400">{pmt.oldPrice}</div>
                <div className="font-display text-xl font-bold text-slate-500 line-through tabular-nums mt-0.5">
                  ₹{priceRevision.oldPrice}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-[#F26B1D]">
                <div className="text-xs font-semibold text-[#F26B1D]">{pmt.newPrice}</div>
                <div className="font-display text-2xl font-extrabold text-[#0F1B2D] dark:text-white tabular-nums mt-0.5">
                  ₹{priceRevision.newPrice}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{pmt.reasonLabel}</div>
              <p className="text-sm font-medium text-[#0F1B2D] dark:text-slate-100">{priceRevision.reason}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{pmt.photoLabel}</div>
              <div className="h-40 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <SafeImage
                  src={priceRevision.photoUrl || ASSET_IMAGES.faultInspection}
                  alt="Sidewall tear inspection photo uploaded by mechanic"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={() => onResolvePriceRevision(false)}
                className="flex-1 min-h-[48px] px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-[#0F1B2D] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                {pmt.declineBtn}
              </button>
              <button
                type="button"
                onClick={() => onResolvePriceRevision(true)}
                className="flex-1 min-h-[48px] px-4 rounded-xl bg-[#16A34A] hover:bg-emerald-700 text-white text-sm font-semibold cursor-pointer"
              >
                {pmt.approveBtn}{priceRevision.newPrice}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call Modal */}
      {callOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" role="dialog" aria-modal="true">
          <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 text-center space-y-4">
            <SafeImage
              src={selectedQuote.avatarUrl}
              alt={selectedQuote.mechanicName}
              className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-[#16A34A]"
            />
            <div>
              <h3 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
                {selectedQuote.mechanicName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Masked privacy relay · +91 80 4568 xxxx</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCallOpen(false)}
                className="flex-1 min-h-[48px] rounded-xl bg-[#DC2626] text-white font-semibold text-sm cursor-pointer"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SOS Emergency Modal */}
      {sosOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" role="dialog" aria-modal="true">
          <div className="bg-white dark:bg-[#111A2B] border-2 border-[#DC2626] rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#DC2626] font-bold">
                <AlertTriangle className="w-5 h-5" />
                <span>Roadside Emergency SOS</span>
              </div>
              <button
                type="button"
                onClick={() => setSosOpen(false)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Your live GPS pin ({requestDraft.location.lat.toFixed(4)}°N, {requestDraft.location.lng.toFixed(4)}°E) is ready to dispatch to emergency responders and RoadAid’s safety desk.
            </p>
            <div className="space-y-2.5">
              <a
                href="tel:112"
                onClick={() => onNotify('Triggering 112 emergency call…')}
                className="w-full min-h-[48px] rounded-xl bg-[#DC2626] text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call National Emergency (112)</span>
              </a>
              <a
                href="tel:1033"
                onClick={() => onNotify('Triggering NHAI Highway Patrol 1033…')}
                className="w-full min-h-[48px] rounded-xl bg-[#0F1B2D] text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call NHAI Highway Patrol (1033)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
