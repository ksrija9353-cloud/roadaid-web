import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Languages,
  MapPin,
  Navigation,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { ASSET_IMAGES, DEFAULT_PIN } from '../../data/mockData';
import { SUPPORTED_LANGUAGES_ROW, TRANSLATIONS } from '../../i18n/translations';
import { Language, PageRoute, VehicleType } from '../../types';
import { SafeImage, VehicleIcon, VoiceInputButton } from '../ui/CommonUI';

export function LandingPage({
  language,
  onLanguageChange,
  onStartRequest,
  onNavigate,
  locationText,
  onLocationTextChange,
  onDetectGps,
  compactMobilePreview = false,
}: {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onStartRequest: (vehicle?: VehicleType) => void;
  onNavigate: (route: PageRoute) => void;
  locationText: string;
  onLocationTextChange: (val: string) => void;
  onDetectGps: () => void;
  compactMobilePreview?: boolean;
}) {
  const t = TRANSLATIONS[language].landing;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const gridHeroClass = compactMobilePreview
    ? 'grid grid-cols-1 gap-6'
    : 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch';

  const gridVehiclesClass = compactMobilePreview
    ? 'grid grid-cols-2 gap-3'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4';

  const gridStepsClass = compactMobilePreview
    ? 'grid grid-cols-1 gap-3'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4';

  return (
    <div className={compactMobilePreview ? 'pb-16' : 'pb-20 sm:pb-0'}>
      {/* Hero Section */}
      <section className={`${compactMobilePreview ? 'pt-5 pb-8 px-4' : 'pt-8 sm:pt-12 pb-12 px-4 sm:px-6 lg:px-8'} max-w-7xl mx-auto`}>
        <div className={gridHeroClass}>
          <div className={compactMobilePreview ? 'space-y-4' : 'lg:col-span-7 flex flex-col justify-center space-y-6'}>
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
              {t.heroEyebrow}
            </p>
            <h1
              className={`font-display font-extrabold tracking-tight text-[#0F1B2D] dark:text-white leading-[1.12] [text-wrap:balance] ${
                compactMobilePreview ? 'text-2xl' : 'text-[clamp(2rem,4vw,3.35rem)]'
              }`}
            >
              {t.heroTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Primary Location & Action Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onStartRequest();
              }}
              className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-xs space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 flex items-center">
                  <MapPin className="w-5 h-5 text-[#F26B1D] absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={locationText}
                    onChange={(e) => onLocationTextChange(e.target.value)}
                    placeholder={t.locationPlaceholder}
                    aria-label={t.locationPlaceholder}
                    className="w-full min-h-[48px] pl-10 pr-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-[#0F1B2D] dark:text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={onDetectGps}
                    className="min-h-[48px] px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-[#0F1B2D] dark:text-slate-100 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Navigation className="w-4 h-4 text-[#F26B1D]" />
                    <span>{t.detectLocation}</span>
                  </button>
                  <VoiceInputButton
                    language={language}
                    onTranscript={(txt) => onLocationTextChange(txt)}
                    samplePhrase={DEFAULT_PIN.address}
                    label={TRANSLATIONS[language].common.voiceInput}
                    compact
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[52px] px-6 rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white font-semibold text-base inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{t.getHelpBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>{t.noAppNote}</span>
            </p>
          </div>

          <div className={compactMobilePreview ? '' : 'lg:col-span-5'}>
            <div className="h-full min-h-[220px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 relative">
              <SafeImage
                src={ASSET_IMAGES.heroAssistance}
                alt="RoadAid service technician assisting a car on an expressway shoulder"
                className="w-full h-full object-cover"
                fallbackTitle="RoadAid 24/7 Express Van"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-5 text-white">
                <p className="text-xs font-medium text-white/85">NH-44 · Bengaluru · Verified Unit #142</p>
                <p className="text-sm sm:text-base font-semibold mt-0.5">
                  Fixed callout from ₹249 · Live mechanic arrival in 18 min median
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works 4-Step Strip */}
      <section className={`${compactMobilePreview ? 'px-4 py-6' : 'px-4 sm:px-6 lg:px-8 py-10'} max-w-7xl mx-auto`}>
        <h2 className="font-display text-lg sm:text-2xl font-bold text-[#0F1B2D] dark:text-white mb-5">
          {t.howItWorksTitle}
        </h2>
        <div className={gridStepsClass}>
          {t.steps.map((step) => (
            <div
              key={step.title}
              className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
            >
              <h3 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white mb-1.5">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vehicle-Type Cards */}
      <section className={`${compactMobilePreview ? 'px-4 py-6' : 'px-4 sm:px-6 lg:px-8 py-10'} max-w-7xl mx-auto`}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
          <div>
            <h2 className="font-display text-lg sm:text-2xl font-bold text-[#0F1B2D] dark:text-white">
              {t.vehiclesTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{t.vehiclesSubtitle}</p>
          </div>
          {!compactMobilePreview && (
            <button
              type="button"
              onClick={() => onNavigate('pricing')}
              className="text-sm font-semibold text-[#F26B1D] hover:underline self-start sm:self-auto cursor-pointer"
            >
              {TRANSLATIONS[language].nav.pricing} →
            </button>
          )}
        </div>
        <div className={gridVehiclesClass}>
          {(['bike', 'car', 'truck', 'bus'] as VehicleType[]).map((vType) => {
            const card = t.vehicleCards[vType];
            return (
              <button
                key={vType}
                type="button"
                onClick={() => onStartRequest(vType)}
                className="text-left bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 hover:border-[#F26B1D] dark:hover:border-[#F26B1D] rounded-2xl p-4 sm:p-5 transition-colors flex flex-col justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#F26B1D] flex items-center justify-center shrink-0">
                    <VehicleIcon type={vType} className="w-6 h-6" />
                  </div>
                  <span className="font-mono tabular-nums text-xs font-semibold text-[#0F1B2D] dark:text-slate-200">
                    {card.priceFrom}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white group-hover:text-[#F26B1D] transition-colors">
                    {card.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Heavy Vehicle Recovery Highlight */}
      <section className={`${compactMobilePreview ? 'px-4 py-6' : 'px-4 sm:px-6 lg:px-8 py-10'} max-w-7xl mx-auto`}>
        <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className={`${compactMobilePreview ? 'p-5' : 'lg:col-span-6 p-6 sm:p-10'} flex flex-col justify-center space-y-4`}>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#F26B1D]">
              <Truck className="w-4 h-4" />
              <span>24T – 40T Highway Wreckers</span>
            </div>
            <h2 className="font-display text-xl sm:text-3xl font-bold text-[#0F1B2D] dark:text-white [text-wrap:balance]">
              {t.heavyTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.heavySubtitle}
            </p>
            <ul className="space-y-2.5 pt-1">
              {t.heavyBullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-[#0F1B2D] dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onStartRequest('truck')}
                className="min-h-[48px] px-5 rounded-xl bg-[#0F1B2D] dark:bg-[#F26B1D] hover:opacity-95 text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{t.heavyCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className={compactMobilePreview ? 'h-48' : 'lg:col-span-6 min-h-[280px]'}>
            <SafeImage
              src={ASSET_IMAGES.heavyRecovery}
              alt="Heavy-duty underlift recovery wrecker assisting a highway bus"
              className="w-full h-full object-cover"
              fallbackTitle="Heavy Vehicle Recovery"
            />
          </div>
        </div>
      </section>

      {/* Supported Languages Row + Trust Stats */}
      <section className={`${compactMobilePreview ? 'px-4 py-6' : 'px-4 sm:px-6 lg:px-8 py-10'} max-w-7xl mx-auto space-y-10`}>
        <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="font-display text-lg sm:text-2xl font-bold text-[#0F1B2D] dark:text-white flex items-center gap-2">
                <Languages className="w-5 h-5 text-[#F26B1D]" />
                <span>{t.languagesTitle}</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{t.languagesSubtitle}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SUPPORTED_LANGUAGES_ROW.map((item) => {
              const isInteractive = item.code === 'en' || item.code === 'hi' || item.code === 'kn';
              const isSelected = language === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    if (isInteractive) onLanguageChange(item.code as Language);
                  }}
                  className={`min-h-[56px] p-3 rounded-xl border text-left transition-colors ${
                    isSelected
                      ? 'border-[#F26B1D] bg-orange-50/70 dark:bg-orange-950/30'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60'
                  } ${isInteractive ? 'cursor-pointer hover:border-[#F26B1D]' : 'cursor-default opacity-85'}`}
                >
                  <div className="text-base font-bold text-[#0F1B2D] dark:text-white">{item.script}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {item.name} {isInteractive ? '· Live' : '· Voice'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust Stats (Claim-to-Proof Adjacent) */}
        <div>
          <h2 className="font-display text-lg sm:text-2xl font-bold text-[#0F1B2D] dark:text-white mb-5">
            {t.statsTitle}
          </h2>
          <div className={compactMobilePreview ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'}>
            {t.stats.map((st) => (
              <div
                key={st.label}
                className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
              >
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#F26B1D] tabular-nums">
                  {st.value}
                </div>
                <div className="text-sm font-bold text-[#0F1B2D] dark:text-white mt-1">{st.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{st.context}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider Sign-Up CTA & FAQ */}
      {!compactMobilePreview && (
        <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-[#0F1B2D] text-white rounded-2xl p-7 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-bold [text-wrap:balance]">{t.providerCtaTitle}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{t.providerCtaSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('provider-dashboard')}
                className="min-h-[48px] px-5 rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{t.providerCtaBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('fleet-dashboard')}
                className="min-h-[48px] px-4 rounded-xl border border-slate-600 hover:bg-slate-800 text-white text-sm font-medium cursor-pointer"
              >
                {TRANSLATIONS[language].nav.fleetDash}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-[#0F1B2D] dark:text-white mb-4">{t.faqTitle}</h2>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {t.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.q} className="py-3.5">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-[#0F1B2D] dark:text-white cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{faq.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Mobile Bottom CTA (Strictly <= 15% of mobile viewport) */}
      <div
        className={`${
          compactMobilePreview ? 'sticky bottom-0' : 'sm:hidden fixed bottom-0 left-0 right-0 z-30'
        } bg-white/95 dark:bg-[#0B121E]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 no-print`}
      >
        <button
          type="button"
          onClick={() => onStartRequest()}
          className="w-full min-h-[48px] rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{t.getHelpBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
