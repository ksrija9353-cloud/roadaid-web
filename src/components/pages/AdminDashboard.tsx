import React, { useState } from 'react';
import { AlertTriangle, Check, Map, ShieldCheck, Sliders, X } from 'lucide-react';
import {
  DEFAULT_PIN,
  INITIAL_DISPUTES,
  INITIAL_PROVIDER_APPLICATIONS,
} from '../../data/mockData';
import { DisputeItem, ProviderApplication, RateCardItem } from '../../types';
import { InteractivePinMap } from '../ui/CommonUI';

export function AdminDashboard({
  rateCards,
  onUpdateRateCards,
  onNotify,
}: {
  rateCards: RateCardItem[];
  onUpdateRateCards: (next: RateCardItem[]) => void;
  onNotify: (msg: string) => void;
}) {
  const [tab, setTab] = useState<'approvals' | 'map' | 'rates' | 'disputes'>('approvals');
  const [apps, setApps] = useState<ProviderApplication[]>(INITIAL_PROVIDER_APPLICATIONS);
  const [disputes, setDisputes] = useState<DisputeItem[]>(INITIAL_DISPUTES);

  const handleAppDecision = (id: string, status: 'Approved' | 'Rejected') => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    onNotify(`Provider application ${id} marked as ${status}.`);
  };

  const handleResolveDispute = (id: string) => {
    setDisputes((prev) => prev.map((d) => (d.id === id ? { ...d, status: 'Resolved' } : d)));
    onNotify(`Dispute ${id} resolved and refund credit issued.`);
  };

  const handleRateChange = (idx: number, field: 'calloutFee' | 'towPerKm', val: number) => {
    const updated = rateCards.map((item, i) =>
      i === idx ? { ...item, [field]: Math.max(0, val) } : item
    );
    onUpdateRateCards(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <div>
              <h2 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white">
                RoadAid Operations Admin
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">National Dispatch & Compliance</p>
            </div>

            <nav className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
              {[
                { id: 'approvals' as const, label: 'Provider Approvals', icon: ShieldCheck },
                { id: 'map' as const, label: 'Live Jobs Map', icon: Map },
                { id: 'rates' as const, label: 'Pricing Rate Cards', icon: Sliders },
                { id: 'disputes' as const, label: 'Disputes Queue', icon: AlertTriangle },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`w-full min-h-[44px] px-3.5 rounded-xl text-sm font-medium flex items-center gap-2.5 cursor-pointer ${
                    tab === id
                      ? 'bg-[#0F1B2D] dark:bg-[#F26B1D] text-white font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="lg:col-span-9 space-y-6">
          {tab === 'approvals' && (
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                <h1 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
                  Provider Verification Queue
                </h1>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                        <span>{app.id}</span>
                        <span>·</span>
                        <span>{app.city}</span>
                        <span>·</span>
                        <span>Max {app.maxTonnes}T</span>
                      </div>
                      <h2 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white mt-0.5">
                        {app.businessName}
                      </h2>
                      <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        Classes: {app.vehicleTypes.join(', ').toUpperCase()} · Docs: {app.docsStatus}
                      </div>
                    </div>

                    {app.status === 'Pending' ? (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleAppDecision(app.id, 'Approved')}
                          className="min-h-[40px] px-3.5 rounded-xl bg-[#16A34A] text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAppDecision(app.id, 'Rejected')}
                          className="min-h-[40px] px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`text-xs font-bold ${
                          app.status === 'Approved' ? 'text-[#16A34A]' : 'text-[#DC2626]'
                        }`}
                      >
                        {app.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'map' && (
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
                  Live Active Breakdowns — Bengaluru NH-44 Corridor
                </h1>
                <span className="text-xs font-mono text-[#16A34A] font-semibold">14 Active Dispatches</span>
              </div>
              <InteractivePinMap
                location={DEFAULT_PIN}
                interactive={false}
                providerProgress={0.62}
                providerLabel="Unit #142 · En route"
                heightClass="h-80"
              />
            </div>
          )}

          {tab === 'rates' && (
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <div>
                <h1 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
                  Platform Pricing Rate Cards
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Changes sync immediately across the public Rate Card page and Tow Request calculator.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                      <th className="py-2.5 pr-4">Vehicle Class</th>
                      <th className="py-2.5 px-4">Base Callout (₹)</th>
                      <th className="py-2.5 px-4">Tow Per Km (₹)</th>
                      <th className="py-2.5 pl-4">Target ETA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {rateCards.map((rc, idx) => (
                      <tr key={rc.vehicleType}>
                        <td className="py-3 pr-4 font-semibold capitalize">{rc.vehicleType}</td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={rc.calloutFee}
                            onChange={(e) => handleRateChange(idx, 'calloutFee', Number(e.target.value))}
                            className="w-28 min-h-[38px] px-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={rc.towPerKm}
                            onChange={(e) => handleRateChange(idx, 'towPerKm', Number(e.target.value))}
                            className="w-28 min-h-[38px] px-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm"
                          />
                        </td>
                        <td className="py-3 pl-4 font-mono text-xs text-slate-500">{rc.responseTargetMin} min</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={() => onNotify('Updated pricing rate cards published across RoadAid.')}
                className="min-h-[44px] px-5 rounded-xl bg-[#F26B1D] text-white text-sm font-semibold cursor-pointer"
              >
                Publish Rate Card Changes
              </button>
            </div>
          )}

          {tab === 'disputes' && (
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                <h1 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
                  Price & SLA Disputes
                </h1>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {disputes.map((d) => (
                  <div
                    key={d.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-mono text-xs text-slate-500">
                        {d.id} · Job {d.jobId} · ₹{d.amountInvolved} disputed
                      </div>
                      <div className="font-semibold text-sm text-[#0F1B2D] dark:text-white mt-0.5">
                        {d.driverName} vs {d.providerName}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{d.reason}</p>
                    </div>
                    {d.status === 'Open' ? (
                      <button
                        type="button"
                        onClick={() => handleResolveDispute(d.id)}
                        className="min-h-[40px] px-4 rounded-xl bg-[#0F1B2D] dark:bg-[#F26B1D] text-white text-xs font-semibold shrink-0 cursor-pointer"
                      >
                        Approve Refund & Close
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-[#16A34A] shrink-0">Resolved</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
