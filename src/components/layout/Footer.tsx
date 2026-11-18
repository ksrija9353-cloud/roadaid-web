import React from 'react';
import { PhoneCall, ShieldCheck } from 'lucide-react';
import { LANGUAGE_LABELS, TRANSLATIONS } from '../../i18n/translations';
import { Language, PageRoute } from '../../types';

export function Footer({
  onNavigate,
  language,
  onLanguageChange,
  consentAccepted,
  onOpenConsent,
}: {
  onNavigate: (route: PageRoute) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  consentAccepted: boolean;
  onOpenConsent: () => void;
}) {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-white dark:bg-[#0B121E] border-t border-slate-200 dark:border-slate-800 mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="font-display text-lg font-extrabold text-[#0F1B2D] dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-5 rounded-sm bg-[#F26B1D] inline-block" aria-hidden="true" />
              <span>RoadAid</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Fixed-price roadside breakdown assistance and towing across India for two-wheelers, cars, trucks, and buses.
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0F1B2D] dark:text-slate-200 pt-1">
              <PhoneCall className="w-4 h-4 text-[#F26B1D]" />
              <span className="font-mono tabular-nums">1800-103-7623 (24/7)</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#0F1B2D] dark:text-white mb-3">Driver Flow</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button type="button" onClick={() => onNavigate('request')} className="hover:text-[#F26B1D] cursor-pointer">
                  {t.nav.getHelp}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('tow-request')} className="hover:text-[#F26B1D] cursor-pointer">
                  One-Click Tow Dispatch
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('pricing')} className="hover:text-[#F26B1D] cursor-pointer">
                  {t.nav.pricing}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('driver-account')} className="hover:text-[#F26B1D] cursor-pointer">
                  {t.nav.driverAccount}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#0F1B2D] dark:text-white mb-3">Partner & Fleet Portals</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button type="button" onClick={() => onNavigate('provider-dashboard')} className="hover:text-[#F26B1D] cursor-pointer">
                  {t.nav.providerDash}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('fleet-dashboard')} className="hover:text-[#F26B1D] cursor-pointer">
                  {t.nav.fleetDash}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('admin-dashboard')} className="hover:text-[#F26B1D] cursor-pointer">
                  {t.nav.adminDash}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('preview-studio')} className="hover:text-[#F26B1D] cursor-pointer">
                  {t.nav.previewStudio}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#0F1B2D] dark:text-white mb-3">Language & Safety</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {(['en', 'hi', 'kn'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                    language === lang
                      ? 'bg-[#0F1B2D] text-white border-[#0F1B2D] dark:bg-[#F26B1D] dark:border-[#F26B1D]'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {LANGUAGE_LABELS[lang].native}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onNavigate('help')}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#F26B1D] block mb-2 cursor-pointer"
            >
              {t.nav.helpCentre} & Highway Safety
            </button>
            <button
              type="button"
              onClick={onOpenConsent}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-[#0F1B2D] dark:hover:text-white inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>{consentAccepted ? 'Cookie & GPS consent active (Manage)' : 'Cookie & GPS consent settings'}</span>
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>© 2026 RoadAid Mobility Rescue Pvt. Ltd. · All rights reserved.</span>
          <span>WCAG AA High-Contrast Mode · ISO-compliant Highway Dispatch</span>
        </div>
      </div>
    </footer>
  );
}
