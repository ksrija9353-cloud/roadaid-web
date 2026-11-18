import React, { useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { LANGUAGE_LABELS } from '../../i18n/translations';
import { BreakdownRequest, Language, PageRoute, VehicleType } from '../../types';
import { LandingPage } from './LandingPage';
import { RequestPage } from './RequestPage';

export function PrototypeShowcasePage({
  language,
  onLanguageChange,
  requestDraft,
  onUpdateDraft,
  onStartRequest,
  onSubmitRequest,
  onNavigate,
  onOpenSmsModal,
  onNotify,
  locationText,
  onLocationTextChange,
  onDetectGps,
}: {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  requestDraft: BreakdownRequest;
  onUpdateDraft: (next: BreakdownRequest) => void;
  onStartRequest: (vehicle?: VehicleType) => void;
  onSubmitRequest: () => void;
  onNavigate: (route: PageRoute) => void;
  onOpenSmsModal: () => void;
  onNotify: (msg: string) => void;
  locationText: string;
  onLocationTextChange: (v: string) => void;
  onDetectGps: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'landing_responsive' | 'request_responsive' | 'multilingual'>(
    'landing_responsive'
  );
  const [scriptChoice, setScriptChoice] = useState<'hi' | 'kn'>('hi');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] dark:text-white">
            Responsive & Multi-Script Showcase
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
            Compare Desktop (1440px) and Mobile (375px) layouts side-by-side, plus Hindi & Kannada variants.
          </p>
        </div>

        <div className="inline-flex flex-wrap items-center bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 p-1 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('landing_responsive')}
            className={`min-h-[40px] px-3.5 rounded-lg text-xs font-semibold cursor-pointer ${
              activeTab === 'landing_responsive'
                ? 'bg-[#0F1B2D] dark:bg-[#F26B1D] text-white'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Landing: Desktop & Mobile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('request_responsive')}
            className={`min-h-[40px] px-3.5 rounded-lg text-xs font-semibold cursor-pointer ${
              activeTab === 'request_responsive'
                ? 'bg-[#0F1B2D] dark:bg-[#F26B1D] text-white'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Request: Desktop & Mobile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('multilingual')}
            className={`min-h-[40px] px-3.5 rounded-lg text-xs font-semibold cursor-pointer ${
              activeTab === 'multilingual'
                ? 'bg-[#0F1B2D] dark:bg-[#F26B1D] text-white'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Hindi / Kannada Variant
          </button>
        </div>
      </div>

      {activeTab === 'landing_responsive' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Desktop Viewport Frame */}
          <div className="xl:col-span-8 bg-white dark:bg-[#0B121E] border border-slate-300 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-[#F26B1D]" />
                <span>Desktop Layout (1440px scale)</span>
              </span>
              <span className="font-mono">{LANGUAGE_LABELS[language].native}</span>
            </div>
            <div className="max-h-[680px] overflow-y-auto bg-[#F7F8FA] dark:bg-[#0B121E]">
              <LandingPage
                language={language}
                onLanguageChange={onLanguageChange}
                onStartRequest={onStartRequest}
                onNavigate={onNavigate}
                locationText={locationText}
                onLocationTextChange={onLocationTextChange}
                onDetectGps={onDetectGps}
              />
            </div>
          </div>

          {/* Mobile 375px Viewport Frame */}
          <div className="xl:col-span-4 flex flex-col items-center">
            <div className="w-full max-w-[375px] bg-white dark:bg-[#0B121E] border-2 border-slate-300 dark:border-slate-700 rounded-3xl overflow-hidden shadow-md">
              <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#F26B1D]" />
                  <span>Mobile Browser (375px)</span>
                </span>
                <span className="font-mono">{LANGUAGE_LABELS[language].short}</span>
              </div>
              <div className="max-h-[660px] overflow-y-auto bg-[#F7F8FA] dark:bg-[#0B121E]">
                <LandingPage
                  language={language}
                  onLanguageChange={onLanguageChange}
                  onStartRequest={onStartRequest}
                  onNavigate={onNavigate}
                  locationText={locationText}
                  onLocationTextChange={onLocationTextChange}
                  onDetectGps={onDetectGps}
                  compactMobilePreview
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'request_responsive' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-8 bg-white dark:bg-[#0B121E] border border-slate-300 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-[#F26B1D]" />
                <span>Request Flow — Desktop</span>
              </span>
              <span className="font-mono">{LANGUAGE_LABELS[language].native}</span>
            </div>
            <div className="max-h-[700px] overflow-y-auto bg-[#F7F8FA] dark:bg-[#0B121E]">
              <RequestPage
                language={language}
                onLanguageChange={onLanguageChange}
                requestDraft={requestDraft}
                onUpdateDraft={onUpdateDraft}
                onSubmitRequest={onSubmitRequest}
                onOpenSmsModal={onOpenSmsModal}
                onNotify={onNotify}
              />
            </div>
          </div>

          <div className="xl:col-span-4 flex flex-col items-center">
            <div className="w-full max-w-[375px] bg-white dark:bg-[#0B121E] border-2 border-slate-300 dark:border-slate-700 rounded-3xl overflow-hidden shadow-md">
              <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#F26B1D]" />
                  <span>Request Flow — Mobile (375px)</span>
                </span>
                <span className="font-mono">{LANGUAGE_LABELS[language].short}</span>
              </div>
              <div className="max-h-[680px] overflow-y-auto bg-[#F7F8FA] dark:bg-[#0B121E]">
                <RequestPage
                  language={language}
                  onLanguageChange={onLanguageChange}
                  requestDraft={requestDraft}
                  onUpdateDraft={onUpdateDraft}
                  onSubmitRequest={onSubmitRequest}
                  onOpenSmsModal={onOpenSmsModal}
                  onNotify={onNotify}
                  compactMobilePreview
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'multilingual' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Compare English alongside:</span>
            <button
              type="button"
              onClick={() => setScriptChoice('hi')}
              className={`min-h-[38px] px-3.5 rounded-xl text-xs font-semibold border cursor-pointer ${
                scriptChoice === 'hi'
                  ? 'bg-[#F26B1D] border-[#F26B1D] text-white'
                  : 'bg-white dark:bg-[#111A2B] border-slate-200 dark:border-slate-700'
              }`}
            >
              हिंदी (Hindi — Devanagari)
            </button>
            <button
              type="button"
              onClick={() => setScriptChoice('kn')}
              className={`min-h-[38px] px-3.5 rounded-xl text-xs font-semibold border cursor-pointer ${
                scriptChoice === 'kn'
                  ? 'bg-[#F26B1D] border-[#F26B1D] text-white'
                  : 'bg-white dark:bg-[#111A2B] border-slate-200 dark:border-slate-700'
              }`}
            >
              ಕನ್ನಡ (Kannada Script)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#F7F8FA] dark:bg-[#0B121E] border border-slate-300 dark:border-slate-700 rounded-2xl overflow-hidden">
              <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
                English (Latin Script)
              </div>
              <div className="max-h-[660px] overflow-y-auto">
                <LandingPage
                  language="en"
                  onLanguageChange={onLanguageChange}
                  onStartRequest={onStartRequest}
                  onNavigate={onNavigate}
                  locationText={locationText}
                  onLocationTextChange={onLocationTextChange}
                  onDetectGps={onDetectGps}
                  compactMobilePreview
                />
              </div>
            </div>

            <div className="bg-[#F7F8FA] dark:bg-[#0B121E] border-2 border-[#F26B1D] rounded-2xl overflow-hidden">
              <div className="px-4 py-2.5 bg-orange-50 dark:bg-orange-950/40 border-b border-orange-200 dark:border-orange-900 flex items-center justify-between text-xs font-semibold">
                <span>{LANGUAGE_LABELS[scriptChoice].native} ({LANGUAGE_LABELS[scriptChoice].english})</span>
                <button
                  type="button"
                  onClick={() => {
                    onLanguageChange(scriptChoice);
                    onNotify(`Switched whole website to ${LANGUAGE_LABELS[scriptChoice].native}.`);
                  }}
                  className="text-[#F26B1D] hover:underline cursor-pointer"
                >
                  Apply to whole site →
                </button>
              </div>
              <div className="max-h-[660px] overflow-y-auto">
                <LandingPage
                  language={scriptChoice}
                  onLanguageChange={onLanguageChange}
                  onStartRequest={onStartRequest}
                  onNavigate={onNavigate}
                  locationText={locationText}
                  onLocationTextChange={onLocationTextChange}
                  onDetectGps={onDetectGps}
                  compactMobilePreview
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
