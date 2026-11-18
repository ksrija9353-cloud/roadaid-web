import React, { useState } from 'react';
import { ChevronDown, Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { LANGUAGE_LABELS, TRANSLATIONS } from '../../i18n/translations';
import { Language, PageRoute } from '../../types';

export function Header({
  currentRoute,
  onNavigate,
  language,
  onLanguageChange,
  darkMode,
  onToggleDarkMode,
}: {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}) {
  const t = TRANSLATIONS[language];
  const [portalsOpen, setPortalsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = (active: boolean) =>
    `text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
      active
        ? 'border-[#F26B1D] text-[#0F1B2D] dark:text-white'
        : 'border-transparent text-slate-600 hover:text-[#0F1B2D] dark:text-slate-300 dark:hover:text-white'
    }`;

  const go = (route: PageRoute) => {
    setPortalsOpen(false);
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B121E]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single clean wordmark */}
        <button
          type="button"
          onClick={() => go('landing')}
          className="font-display text-xl font-extrabold tracking-tight text-[#0F1B2D] dark:text-white whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
        >
          <span className="w-2.5 h-6 rounded-sm bg-[#F26B1D] inline-block" aria-hidden="true" />
          <span>RoadAid</span>
        </button>

        {/* Zone 2: Concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary navigation">
          <button type="button" onClick={() => go('request')} className={navLinkClass(currentRoute === 'request')}>
            {t.nav.getHelp}
          </button>
          <button type="button" onClick={() => go('pricing')} className={navLinkClass(currentRoute === 'pricing')}>
            {t.nav.pricing}
          </button>
          <button type="button" onClick={() => go('help')} className={navLinkClass(currentRoute === 'help')}>
            {t.nav.helpCentre}
          </button>
          <button
            type="button"
            onClick={() => go('preview-studio')}
            className={navLinkClass(currentRoute === 'preview-studio')}
          >
            {t.nav.previewStudio}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setPortalsOpen((v) => !v)}
              aria-expanded={portalsOpen}
              className={`inline-flex items-center gap-1 ${navLinkClass(
                ['driver-account', 'provider-dashboard', 'fleet-dashboard', 'admin-dashboard'].includes(currentRoute)
              )}`}
            >
              <span>{t.nav.dashboards}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {portalsOpen && (
              <div
                onMouseLeave={() => setPortalsOpen(false)}
                className="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1.5 z-50"
              >
                <button
                  type="button"
                  onClick={() => go('driver-account')}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#0F1B2D] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {t.nav.driverAccount}
                </button>
                <button
                  type="button"
                  onClick={() => go('provider-dashboard')}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#0F1B2D] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {t.nav.providerDash}
                </button>
                <button
                  type="button"
                  onClick={() => go('fleet-dashboard')}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#0F1B2D] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {t.nav.fleetDash}
                </button>
                <button
                  type="button"
                  onClick={() => go('admin-dashboard')}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#0F1B2D] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {t.nav.adminDash}
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Language Switcher + Dark Mode + Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Always-visible Language Switcher */}
          <div
            className="inline-flex items-center bg-slate-100 dark:bg-slate-800/90 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700"
            role="group"
            aria-label="Language switcher"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 ml-1.5 mr-1 hidden sm:block" aria-hidden="true" />
            {(['en', 'hi', 'kn'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange(lang)}
                className={`min-h-[34px] px-2 sm:px-2.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === lang
                    ? 'bg-white dark:bg-[#F26B1D] text-[#0F1B2D] dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#0F1B2D] dark:hover:text-white'
                }`}
              >
                {LANGUAGE_LABELS[lang].short}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? t.common.lightMode : t.common.darkMode}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => go('request')}
            className="hidden sm:inline-flex items-center justify-center min-h-[42px] px-4 py-2 rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.getHelpNow}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-[#0F1B2D] dark:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0F172A] border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-1">
          <button
            type="button"
            onClick={() => go('request')}
            className="w-full text-left px-3 py-3 rounded-xl text-sm font-semibold text-[#F26B1D] hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            {t.nav.getHelpNow}
          </button>
          <button
            type="button"
            onClick={() => go('pricing')}
            className="w-full text-left px-3 py-3 rounded-xl text-sm font-medium text-[#0F1B2D] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            {t.nav.pricing}
          </button>
          <button
            type="button"
            onClick={() => go('help')}
            className="w-full text-left px-3 py-3 rounded-xl text-sm font-medium text-[#0F1B2D] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            {t.nav.helpCentre}
          </button>
          <button
            type="button"
            onClick={() => go('preview-studio')}
            className="w-full text-left px-3 py-3 rounded-xl text-sm font-medium text-[#0F1B2D] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            {t.nav.previewStudio}
          </button>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-2 mt-2">
            <p className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">{t.nav.dashboards}</p>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => go('driver-account')}
                className="text-left px-3 py-2.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800 text-[#0F1B2D] dark:text-slate-100 cursor-pointer"
              >
                {t.nav.driverAccount}
              </button>
              <button
                type="button"
                onClick={() => go('provider-dashboard')}
                className="text-left px-3 py-2.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800 text-[#0F1B2D] dark:text-slate-100 cursor-pointer"
              >
                {t.nav.providerDash}
              </button>
              <button
                type="button"
                onClick={() => go('fleet-dashboard')}
                className="text-left px-3 py-2.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800 text-[#0F1B2D] dark:text-slate-100 cursor-pointer"
              >
                {t.nav.fleetDash}
              </button>
              <button
                type="button"
                onClick={() => go('admin-dashboard')}
                className="text-left px-3 py-2.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800 text-[#0F1B2D] dark:text-slate-100 cursor-pointer"
              >
                {t.nav.adminDash}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
