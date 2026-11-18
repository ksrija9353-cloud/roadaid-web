import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react';
import { COVERAGE_CORRIDORS } from '../../data/mockData';
import { TRANSLATIONS } from '../../i18n/translations';
import { Language, RateCardItem, VehicleType } from '../../types';
import { VehicleIcon } from '../ui/CommonUI';

export function PricingCoveragePage({
  language,
  rateCards,
  onStartRequest,
}: {
  language: Language;
  rateCards: RateCardItem[];
  onStartRequest: (vehicle: VehicleType) => void;
}) {
  const t = TRANSLATIONS[language];
  const [selectedCity, setSelectedCity] = useState(COVERAGE_CORRIDORS[0].city);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="max-w-3xl space-y-2">
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0F1B2D] dark:text-white">
          Transparent rate cards & highway coverage
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Every RoadAid dispatch locks your callout and per-km tow rate before the technician moves. No surge pricing for night breakdowns or highway shoulders.
        </p>
      </div>

      {/* Rate Card Table */}
      <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
            Standard rate card per vehicle class
          </h2>
          <span className="text-xs font-medium text-[#16A34A] inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Price-lock guaranteed before dispatch</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50">
                <th className="py-3.5 px-5">Vehicle Class</th>
                <th className="py-3.5 px-4">Base Callout</th>
                <th className="py-3.5 px-4">Spot Repair From</th>
                <th className="py-3.5 px-4">Tow Base Fee</th>
                <th className="py-3.5 px-4">Tow Per Km</th>
                <th className="py-3.5 px-4">Capacity</th>
                <th className="py-3.5 px-4">Target ETA</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              {rateCards.map((row) => (
                <tr key={row.vehicleType} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-5 font-semibold text-[#0F1B2D] dark:text-white">
                    <div className="flex items-center gap-2.5">
                      <VehicleIcon type={row.vehicleType} className="w-5 h-5 text-[#F26B1D]" />
                      <span>{t.landing.vehicleCards[row.vehicleType].name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono tabular-nums text-[#0F1B2D] dark:text-slate-200">
                    ₹{row.calloutFee}
                  </td>
                  <td className="py-4 px-4 font-mono tabular-nums font-bold text-[#0F1B2D] dark:text-white">
                    ₹{row.minorRepairFrom}
                  </td>
                  <td className="py-4 px-4 font-mono tabular-nums text-[#0F1B2D] dark:text-slate-200">
                    ₹{row.towBaseFee.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 font-mono tabular-nums text-[#0F1B2D] dark:text-slate-200">
                    ₹{row.towPerKm}/km
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{row.maxCapacityTonnes}</td>
                  <td className="py-4 px-4 font-mono tabular-nums text-[#16A34A] font-semibold">
                    ~{row.responseTargetMin} min
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => onStartRequest(row.vehicleType)}
                      className="min-h-[40px] px-3.5 rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      <span>Request</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coverage Corridors & No-Hidden-Charges Promise */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
              Active Metro & National Highway Corridors
            </h2>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">28+ cities · 24/7 dispatch</span>
          </div>

          {/* Interactive Corridor Selector & Schematic Map */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COVERAGE_CORRIDORS.map((corridor) => {
              const active = selectedCity === corridor.city;
              return (
                <button
                  key={corridor.city}
                  type="button"
                  onClick={() => setSelectedCity(corridor.city)}
                  className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                    active
                      ? 'border-[#F26B1D] bg-orange-50/70 dark:bg-orange-950/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-[#0F1B2D] dark:text-white">{corridor.city}</span>
                    <MapPin className={`w-4 h-4 shrink-0 ${active ? 'text-[#F26B1D]' : 'text-slate-400'}`} />
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 tabular-nums">
                    <span>{corridor.hubs} hubs</span>
                    <span>·</span>
                    <span>{corridor.activeVans} units</span>
                    <span>·</span>
                    <span className="text-[#16A34A] font-semibold">{corridor.avgEta} avg</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#0F1B2D] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold">Our No-Hidden-Charges Promise</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Roadside breakdowns are stressful enough without roadside haggling. Every RoadAid job follows three strict billing rules:
            </p>
            <ul className="space-y-3 text-sm pt-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Upfront fixed callout and diagnostic fee locked before dispatch.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Any extra spare part requires an on-site photo and your one-tap approval.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>If the mechanic arrives and cannot fix it on the spot, callout fee credits toward your tow.</span>
              </li>
            </ul>
          </div>
          <div className="pt-2 border-t border-slate-700 text-xs text-slate-300">
            Selected corridor: <span className="font-semibold text-white">{selectedCity}</span> — 24/7 Heavy Wrecker & Two-Wheeler vans standing by.
          </div>
        </div>
      </div>
    </div>
  );
}
