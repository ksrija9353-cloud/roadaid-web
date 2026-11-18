import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';
import { BreakdownRequest, Language, RateCardItem, TowDetails } from '../../types';
import { VehicleIcon, VoiceInputButton } from '../ui/CommonUI';

export function TowRequestPage({
  language,
  requestDraft,
  rateCards,
  towDetails,
  onConfirmTow,
  onBack,
}: {
  language: Language;
  requestDraft: BreakdownRequest;
  rateCards: RateCardItem[];
  towDetails: TowDetails;
  onConfirmTow: (details: TowDetails) => void;
  onBack: () => void;
}) {
  const t = TRANSLATIONS[language];
  const tt = t.tow;

  const autoTowClass: TowDetails['towClass'] =
    requestDraft.vehicleType === 'bike'
      ? 'bike_carrier'
      : requestDraft.vehicleType === 'car'
      ? 'flatbed'
      : 'heavy_wrecker';

  const rateCard =
    rateCards.find((r) => r.vehicleType === requestDraft.vehicleType) || rateCards[1];

  const [destination, setDestination] = useState(
    towDetails.destination || tt.quickDestinations[0]
  );
  const [distanceKm, setDistanceKm] = useState(towDetails.distanceKm || 6.4);

  const baseTowFee = rateCard.towBaseFee;
  const distanceCost = Math.round(distanceKm * rateCard.towPerKm);
  const totalTowPrice = baseTowFee + distanceCost;

  const handleSelectQuick = (label: string, idx: number) => {
    setDestination(label);
    const distances = [6.4, 9.1, 11.5];
    setDistanceKm(distances[idx] ?? 8.0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-24 space-y-6">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#F26B1D] mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] dark:text-white">
          {tt.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{tt.subtitle}</p>
      </div>

      {/* Auto-Selected Tow Type Card */}
      <div className="bg-white dark:bg-[#111A2B] border-2 border-[#F26B1D] rounded-2xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-[#F26B1D] inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{tt.autoSelected}</span>
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {rateCard.maxCapacityTonnes}
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#F26B1D] flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
              {tt.towClasses[autoTowClass].title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              {tt.towClasses[autoTowClass].desc}
            </p>
          </div>
        </div>
      </div>

      {/* Pre-filled Breakdown Details (Zero Re-Entry) */}
      <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400">{tt.prefilledTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <VehicleIcon type={requestDraft.vehicleType} className="w-5 h-5 text-[#F26B1D] shrink-0" />
            <div>
              <div className="font-semibold text-[#0F1B2D] dark:text-white">
                {t.common[requestDraft.vehicleType]} · {requestDraft.registrationNumber || 'KA 05 MN 4821'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t.faults[requestDraft.fault]}</div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#F26B1D] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#0F1B2D] dark:text-white">{requestDraft.location.address}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{requestDraft.location.landmark}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Destination Picker */}
      <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white">
            {tt.destinationLabel}
          </h3>
          <VoiceInputButton
            language={language}
            onTranscript={(txt) => {
              setDestination(txt);
              setDistanceKm(7.8);
            }}
            samplePhrase="Bosch Car Service HSR Layout"
            label={t.common.voiceInput}
            compact
          />
        </div>

        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full min-h-[48px] px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-[#0F1B2D] dark:text-white"
        />

        <div className="space-y-2">
          {tt.quickDestinations.map((item, idx) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSelectQuick(item, idx)}
              className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border text-left text-sm flex items-center justify-between cursor-pointer ${
                destination === item
                  ? 'border-[#F26B1D] bg-orange-50/70 dark:bg-orange-950/30 font-semibold text-[#0F1B2D] dark:text-white'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{item}</span>
              {destination === item && <CheckCircle2 className="w-4 h-4 text-[#F26B1D] shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Fixed Tow Price Breakdown */}
      <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white">{tt.priceBreakdown}</h3>
          <span className="text-xs text-[#16A34A] font-semibold inline-flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Fixed quote</span>
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-600 dark:text-slate-300">
            <span>{tt.towClasses[autoTowClass].title} base hook-up</span>
            <span className="font-mono tabular-nums">₹{baseTowFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-300">
            <span>Distance ({distanceKm} km × ₹{rateCard.towPerKm}/km)</span>
            <span className="font-mono tabular-nums">₹{distanceCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-base font-bold text-[#0F1B2D] dark:text-white">
            <span>Total Fixed Tow</span>
            <span className="font-display text-xl font-extrabold tabular-nums">
              ₹{totalTowPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onConfirmTow({
              towClass: autoTowClass,
              destination,
              distanceKm,
              baseTowFee,
              perKmRate: rateCard.towPerKm,
              totalTowPrice,
              confirmed: true,
            })
          }
          className="w-full min-h-[52px] rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white font-semibold text-base flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>
            {tt.confirmTowBtn} · ₹{totalTowPrice.toLocaleString()}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
