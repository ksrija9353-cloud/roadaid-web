import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock, RefreshCw, ShieldCheck, Star, WifiOff } from 'lucide-react';
import { LANGUAGE_LABELS, TRANSLATIONS } from '../../i18n/translations';
import { BreakdownRequest, Language, ProviderQuote } from '../../types';
import { SafeImage, SkeletonQuoteCard } from '../ui/CommonUI';

export function QuotesPage({
  language,
  requestDraft,
  quotes,
  onAcceptQuote,
  onBackToRequest,
}: {
  language: Language;
  requestDraft: BreakdownRequest;
  quotes: ProviderQuote[];
  onAcceptQuote: (quote: ProviderQuote) => void;
  onBackToRequest: () => void;
}) {
  const t = TRANSLATIONS[language];
  const qt = t.quotes;
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'eta'>('price');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyMyLang, setOnlyMyLang] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  const retryLoad = () => {
    setHasError(false);
    setLoading(true);
    window.setTimeout(() => setLoading(false), 450);
  };

  const filteredQuotes = quotes
    .filter((q) => (onlyVerified ? q.verified : true))
    .filter((q) => (onlyMyLang ? q.languages.includes(language) : true))
    .sort((a, b) => (sortBy === 'price' ? a.totalFixedPrice - b.totalFixedPrice : a.etaMinutes - b.etaMinutes));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-20 space-y-6">
      {/* Header & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <button
            type="button"
            onClick={onBackToRequest}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#F26B1D] mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Edit location or fault</span>
          </button>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] dark:text-white">
            {qt.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
            {t.common[requestDraft.vehicleType]} · {t.faults[requestDraft.fault]} · {requestDraft.location.address}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setHasError((v) => !v)}
          className="min-h-[38px] px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-[#0F1B2D] dark:hover:text-white self-start sm:self-auto cursor-pointer"
        >
          {qt.simulateError}
        </button>
      </div>

      {/* Sort & Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
        <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setSortBy('price')}
            className={`min-h-[38px] px-3.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              sortBy === 'price'
                ? 'bg-white dark:bg-[#F26B1D] text-[#0F1B2D] dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {qt.sortByPrice}
          </button>
          <button
            type="button"
            onClick={() => setSortBy('eta')}
            className={`min-h-[38px] px-3.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              sortBy === 'eta'
                ? 'bg-white dark:bg-[#F26B1D] text-[#0F1B2D] dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {qt.sortByEta}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setOnlyVerified((v) => !v)}
            className={`min-h-[38px] px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
              onlyVerified
                ? 'border-[#16A34A] bg-emerald-50 dark:bg-emerald-950/30 text-[#16A34A]'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {qt.filterVerified}
          </button>
          <button
            type="button"
            onClick={() => setOnlyMyLang((v) => !v)}
            className={`min-h-[38px] px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
              onlyMyLang
                ? 'border-[#F26B1D] bg-orange-50 dark:bg-orange-950/30 text-[#F26B1D]'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {qt.filterSpeaksLang} ({LANGUAGE_LABELS[language].native})
          </button>
        </div>
      </div>

      {/* Error State */}
      {hasError ? (
        <div className="bg-white dark:bg-[#111A2B] border border-red-200 dark:border-red-900 rounded-2xl p-8 text-center space-y-3">
          <WifiOff className="w-8 h-8 text-[#DC2626] mx-auto" />
          <h2 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">{qt.errorTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Mobile signal dropped briefly while fetching live provider ETAs.
          </p>
          <button
            type="button"
            onClick={retryLoad}
            className="min-h-[48px] px-5 rounded-xl bg-[#0F1B2D] dark:bg-[#F26B1D] text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{qt.retryBtn}</span>
          </button>
        </div>
      ) : loading ? (
        <div className="space-y-4">
          <SkeletonQuoteCard />
          <SkeletonQuoteCard />
          <SkeletonQuoteCard />
        </div>
      ) : filteredQuotes.length === 0 ? (
        <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3">
          <h2 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">{qt.noQuotesTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">{qt.noQuotesDesc}</p>
          <button
            type="button"
            onClick={() => {
              setOnlyVerified(false);
              setOnlyMyLang(false);
            }}
            className="min-h-[44px] px-5 rounded-xl bg-[#F26B1D] text-white text-sm font-semibold cursor-pointer"
          >
            {qt.resetFilters}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuotes.map((q) => (
            <div
              key={q.id}
              className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 hover:border-[#F26B1D] rounded-2xl p-5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                <SafeImage
                  src={q.avatarUrl}
                  alt={q.mechanicName}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                  fallbackTitle={q.mechanicName}
                />
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h2 className="font-display text-base sm:text-lg font-bold text-[#0F1B2D] dark:text-white">
                      {q.providerName}
                    </h2>
                    {q.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#16A34A]">
                        <ShieldCheck className="w-4 h-4" />
                        <span>{qt.verifiedBadge}</span>
                      </span>
                    )}
                  </div>

                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                    <span className="font-medium text-[#0F1B2D] dark:text-slate-100">{q.mechanicName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#0F1B2D] dark:text-white">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {q.rating.toFixed(1)}
                    </span>
                    <span>({q.completedJobs} {t.common.jobs})</span>
                    <span aria-hidden="true">·</span>
                    <span>{q.distanceKm} {t.common.km}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#16A34A]">
                      <Clock className="w-3.5 h-3.5" />
                      {q.etaMinutes} {t.common.min}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span>{q.equipmentTag}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {qt.speaksLabel}:{' '}
                      <strong className="font-medium text-[#0F1B2D] dark:text-slate-200">
                        {q.languages.map((l) => LANGUAGE_LABELS[l].native).join(' · ')}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                <div className="sm:text-right">
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {qt.fixedPriceLabel}
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] dark:text-white tabular-nums">
                    ₹{q.totalFixedPrice}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onAcceptQuote(q)}
                  className="min-h-[48px] px-5 rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{qt.acceptBtn}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
