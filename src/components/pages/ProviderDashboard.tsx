import React, { useState } from 'react';
import {
  CheckCircle2,
  ClipboardList,
  IndianRupee,
  ShieldCheck,
  Truck,
  Wallet,
} from 'lucide-react';
import { ASSET_IMAGES } from '../../data/mockData';
import { LANGUAGE_LABELS } from '../../i18n/translations';
import { Language, VehicleType } from '../../types';
import { SafeImage, VehicleIcon } from '../ui/CommonUI';

interface InboxJob {
  id: string;
  vehicle: VehicleType;
  fault: string;
  location: string;
  distanceKm: number;
  driverLang: Language;
  quotedPrice?: number;
}

const INITIAL_INBOX: InboxJob[] = [
  {
    id: 'REQ-4421',
    vehicle: 'car',
    fault: 'Flat Tyre (Sidewall Tear)',
    location: 'NH-44 Silk Board, Pillar 148',
    distanceKm: 2.3,
    driverLang: 'kn',
  },
  {
    id: 'REQ-4422',
    vehicle: 'truck',
    fault: 'Air-Brake Pressure Drop',
    location: 'Electronic City Elevated Toll',
    distanceKm: 4.8,
    driverLang: 'hi',
  },
  {
    id: 'REQ-4423',
    vehicle: 'bike',
    fault: 'Dead Battery / Starter Relay',
    location: 'HSR Layout 27th Main',
    distanceKm: 1.9,
    driverLang: 'en',
  },
];

export function ProviderDashboard({
  onNotify,
}: {
  onNotify: (msg: string) => void;
}) {
  const [tab, setTab] = useState<'inbox' | 'capacity' | 'earnings' | 'verification'>('inbox');
  const [online, setOnline] = useState(true);
  const [jobs, setJobs] = useState<InboxJob[]>(INITIAL_INBOX);
  const [selectedJobId, setSelectedJobId] = useState<string>(INITIAL_INBOX[0].id);

  // Quote Entry Form state
  const [calloutFee, setCalloutFee] = useState('299');
  const [serviceEst, setServiceEst] = useState('200');
  const [etaMin, setEtaMin] = useState('14');

  // Capacity state
  const [supportedTypes, setSupportedTypes] = useState<VehicleType[]>(['bike', 'car', 'truck']);
  const [maxTonnes, setMaxTonnes] = useState('12');
  const [hasFlatbed, setHasFlatbed] = useState(true);
  const [hasUnderlift, setHasUnderlift] = useState(false);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const total = (Number(calloutFee) || 0) + (Number(serviceEst) || 0);
    setJobs((prev) =>
      prev.map((j) => (j.id === selectedJob.id ? { ...j, quotedPrice: total } : j))
    );
    onNotify(`Fixed quote ₹${total} (${etaMin} min ETA) sent for ${selectedJob.id}.`);
  };

  const toggleVehicleCap = (vt: VehicleType) => {
    setSupportedTypes((prev) =>
      prev.includes(vt) ? prev.filter((x) => x !== vt) : [...prev, vt]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <SafeImage
                src={ASSET_IMAGES.mechanicRajesh}
                alt="Rajesh Kumar"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h2 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white">
                  Kaveri Rapid Care
                </h2>
                <p className="text-xs text-[#16A34A] font-semibold inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Partner</span>
                </p>
              </div>
            </div>

            {/* Availability Toggle */}
            <button
              type="button"
              onClick={() => {
                setOnline((v) => !v);
                onNotify(!online ? 'Status set to Online — receiving breakdown alerts.' : 'Status set to Offline.');
              }}
              className={`w-full min-h-[44px] px-3.5 rounded-xl border text-xs font-bold flex items-center justify-between cursor-pointer transition-colors ${
                online
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-[#16A34A] text-[#16A34A]'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>{online ? 'Online · Accepting Jobs' : 'Offline · Paused'}</span>
              <span
                className={`w-8 h-4 rounded-full p-0.5 flex items-center transition-colors ${
                  online ? 'bg-[#16A34A] justify-end' : 'bg-slate-400 justify-start'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-white" />
              </span>
            </button>

            <nav className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
              {[
                { id: 'inbox' as const, label: 'Job Inbox', icon: ClipboardList },
                { id: 'capacity' as const, label: 'Vehicle Capacity', icon: Truck },
                { id: 'earnings' as const, label: 'Earnings & Payouts', icon: Wallet },
                { id: 'verification' as const, label: 'Verification Status', icon: ShieldCheck },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`w-full min-h-[44px] px-3.5 rounded-xl text-sm font-medium flex items-center gap-2.5 cursor-pointer transition-colors ${
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

        {/* Main Panel */}
        <main className="lg:col-span-9 space-y-6">
          {tab === 'inbox' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-7 space-y-3">
                <h1 className="font-display text-2xl font-extrabold text-[#0F1B2D] dark:text-white">
                  Incoming Breakdown Inbox
                </h1>
                {!online ? (
                  <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-2">
                    <p className="font-semibold text-[#0F1B2D] dark:text-white">You are currently Offline</p>
                    <p className="text-sm text-slate-500">Switch availability to Online to receive nearby requests.</p>
                  </div>
                ) : (
                  jobs.map((job) => {
                    const active = job.id === selectedJob.id;
                    return (
                      <button
                        key={job.id}
                        type="button"
                        onClick={() => setSelectedJobId(job.id)}
                        className={`w-full text-left bg-white dark:bg-[#111A2B] border rounded-2xl p-4 transition-colors cursor-pointer ${
                          active
                            ? 'border-[#F26B1D]'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#F26B1D] flex items-center justify-center shrink-0">
                              <VehicleIcon type={job.vehicle} className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                                <span>{job.id}</span>
                                <span>·</span>
                                <span>{job.distanceKm} km away</span>
                                <span>·</span>
                                <span>Driver: {LANGUAGE_LABELS[job.driverLang].native}</span>
                              </div>
                              <div className="font-display text-base font-bold text-[#0F1B2D] dark:text-white mt-0.5">
                                {job.fault}
                              </div>
                              <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{job.location}</div>
                            </div>
                          </div>
                          {job.quotedPrice && (
                            <span className="font-mono tabular-nums text-xs font-bold text-[#16A34A] whitespace-nowrap">
                              Quoted ₹{job.quotedPrice}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Quote Entry Form */}
              <div className="xl:col-span-5 bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 h-fit space-y-4">
                <div>
                  <div className="text-xs font-mono text-slate-500">{selectedJob.id}</div>
                  <h2 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
                    Submit Fixed Quote
                  </h2>
                </div>
                <form onSubmit={handleSubmitQuote} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Base callout fee (₹)
                    </label>
                    <input
                      type="number"
                      value={calloutFee}
                      onChange={(e) => setCalloutFee(e.target.value)}
                      className="w-full min-h-[44px] px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Estimated repair labour (₹)
                    </label>
                    <input
                      type="number"
                      value={serviceEst}
                      onChange={(e) => setServiceEst(e.target.value)}
                      className="w-full min-h-[44px] px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Arrival ETA (minutes)
                    </label>
                    <input
                      type="number"
                      value={etaMin}
                      onChange={(e) => setEtaMin(e.target.value)}
                      className="w-full min-h-[44px] px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600 dark:text-slate-300">Total Fixed Quote</span>
                    <span className="font-display text-xl font-extrabold text-[#0F1B2D] dark:text-white tabular-nums">
                      ₹{(Number(calloutFee) || 0) + (Number(serviceEst) || 0)}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full min-h-[48px] rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white font-semibold text-sm cursor-pointer"
                  >
                    Send Fixed Quote
                  </button>
                </form>
              </div>
            </div>
          )}

          {tab === 'capacity' && (
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
              <h1 className="font-display text-2xl font-extrabold text-[#0F1B2D] dark:text-white">
                Vehicle Capacity & Equipment Settings
              </h1>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  Vehicle classes your team services
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['bike', 'car', 'truck', 'bus'] as VehicleType[]).map((vt) => {
                    const active = supportedTypes.includes(vt);
                    return (
                      <button
                        key={vt}
                        type="button"
                        onClick={() => toggleVehicleCap(vt)}
                        className={`min-h-[56px] px-3 rounded-xl border flex items-center gap-2.5 text-sm font-semibold capitalize cursor-pointer ${
                          active
                            ? 'border-[#F26B1D] bg-orange-50/70 dark:bg-orange-950/30 text-[#0F1B2D] dark:text-white'
                            : 'border-slate-200 dark:border-slate-700 text-slate-500'
                        }`}
                      >
                        <VehicleIcon type={vt} className="w-5 h-5 text-[#F26B1D]" />
                        <span>{vt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Max towing / lift capacity (Tonnes)
                  </label>
                  <input
                    type="number"
                    value={maxTonnes}
                    onChange={(e) => setMaxTonnes(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm"
                  />
                </div>
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasFlatbed}
                      onChange={(e) => setHasFlatbed(e.target.checked)}
                      className="w-4 h-4 accent-[#F26B1D]"
                    />
                    <span>Hydraulic Flatbed (Cars & SUVs)</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasUnderlift}
                      onChange={(e) => setHasUnderlift(e.target.checked)}
                      className="w-4 h-4 accent-[#F26B1D]"
                    />
                    <span>Heavy Axle Underlift Wrecker (24T+)</span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNotify('Vehicle capacity & equipment profile updated.')}
                className="min-h-[48px] px-6 rounded-xl bg-[#0F1B2D] dark:bg-[#F26B1D] text-white text-sm font-semibold cursor-pointer"
              >
                Save Capacity Settings
              </button>
            </div>
          )}

          {tab === 'earnings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                  <div className="text-xs text-slate-500">This week settled</div>
                  <div className="font-display text-2xl font-extrabold tabular-nums text-[#0F1B2D] dark:text-white mt-1">
                    ₹24,850
                  </div>
                </div>
                <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                  <div className="text-xs text-slate-500">Pending instant UPI payout</div>
                  <div className="font-display text-2xl font-extrabold tabular-nums text-[#F26B1D] mt-1">
                    ₹3,420
                  </div>
                </div>
                <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Completed jobs</div>
                    <div className="font-display text-2xl font-extrabold tabular-nums text-[#16A34A] mt-1">
                      342
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNotify('Instant UPI payout of ₹3,420 initiated.')}
                    className="min-h-[42px] px-3.5 rounded-xl bg-[#16A34A] text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>Settle Now</span>
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 bg-slate-50 dark:bg-slate-900/40">
                      <th className="py-3 px-5">Payout ID</th>
                      <th className="py-3 px-4">Jobs</th>
                      <th className="py-3 px-4">Mode</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {[
                      { id: 'PAY-9921', jobs: '8 jobs', mode: 'UPI Auto-Settle', status: 'Settled', amt: 9420 },
                      { id: 'PAY-9884', jobs: '14 jobs', mode: 'IMPS Bank', status: 'Settled', amt: 15430 },
                    ].map((p) => (
                      <tr key={p.id}>
                        <td className="py-3.5 px-5 font-mono text-xs font-semibold">{p.id}</td>
                        <td className="py-3.5 px-4">{p.jobs}</td>
                        <td className="py-3.5 px-4">{p.mode}</td>
                        <td className="py-3.5 px-4 text-[#16A34A] font-semibold">{p.status}</td>
                        <td className="py-3.5 px-5 text-right font-mono tabular-nums font-bold">
                          ₹{p.amt.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'verification' && (
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <h1 className="font-display text-2xl font-extrabold text-[#0F1B2D] dark:text-white">
                Partner Verification Status
              </h1>
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {[
                  { item: 'Garage / Business GST & Aadhaar KYC', status: 'Verified · Valid till 2028' },
                  { item: 'Service Van & Hydraulic Flatbed RC (KA 01 MG 4102)', status: 'Verified · Commercial Permit Active' },
                  { item: 'Technician Police Verification & Safety Training', status: 'Verified · Badge #RA-1142' },
                  { item: 'Multi-Language Support Profile (EN / HI / KN)', status: 'Active' },
                ].map((row) => (
                  <div key={row.item} className="py-3.5 flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-[#0F1B2D] dark:text-slate-100">{row.item}</span>
                    <span className="text-xs font-semibold text-[#16A34A] inline-flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{row.status}</span>
                    </span>
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
