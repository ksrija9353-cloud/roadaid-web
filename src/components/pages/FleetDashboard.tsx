import React, { useState } from 'react';
import { Download, FileText, Plus, Truck, Activity } from 'lucide-react';
import { INITIAL_FLEET_VEHICLES } from '../../data/mockData';
import { FleetVehicle } from '../../types';
import { VehicleIcon } from '../ui/CommonUI';

export function FleetDashboard({
  onDispatchForVehicle,
  onNotify,
}: {
  onDispatchForVehicle: (vehicle: FleetVehicle) => void;
  onNotify: (msg: string) => void;
}) {
  const [tab, setTab] = useState<'vehicles' | 'jobs' | 'invoices'>('vehicles');
  const [vehicles] = useState<FleetVehicle[]>(INITIAL_FLEET_VEHICLES);
  const [filterStatus, setFilterStatus] = useState<'all' | 'Breakdown' | 'Active'>('all');

  const visibleVehicles = vehicles.filter((v) =>
    filterStatus === 'all' ? true : v.status === filterStatus
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <div>
              <h2 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white">
                Deccan Logistics Fleet
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">42 registered vehicles · GST Corporate</p>
            </div>

            <button
              type="button"
              onClick={() => onDispatchForVehicle(vehicles[0])}
              className="w-full min-h-[48px] px-4 rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Request help for a driver</span>
            </button>

            <nav className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
              {[
                { id: 'vehicles' as const, label: 'Fleet Vehicles', icon: Truck },
                { id: 'jobs' as const, label: 'Active Jobs', icon: Activity },
                { id: 'invoices' as const, label: 'Monthly Invoices', icon: FileText },
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

        {/* Main Content */}
        <main className="lg:col-span-9 space-y-6">
          {/* KPI Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
              <div className="text-xs text-slate-500">Total Fleet</div>
              <div className="font-display text-2xl font-extrabold tabular-nums mt-1">42</div>
            </div>
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
              <div className="text-xs text-slate-500">Active Breakdowns</div>
              <div className="font-display text-2xl font-extrabold tabular-nums text-[#DC2626] mt-1">1</div>
            </div>
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
              <div className="text-xs text-slate-500">Avg Resolution</div>
              <div className="font-display text-2xl font-extrabold tabular-nums text-[#16A34A] mt-1">24 min</div>
            </div>
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
              <div className="text-xs text-slate-500">Nov Spend (MTD)</div>
              <div className="font-display text-2xl font-extrabold tabular-nums mt-1">₹18,450</div>
            </div>
          </div>

          {tab === 'vehicles' && (
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <h1 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
                  Registered Fleet Vehicles
                </h1>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {(['all', 'Breakdown', 'Active'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        filterStatus === st
                          ? 'bg-white dark:bg-[#F26B1D] text-[#0F1B2D] dark:text-white'
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {st === 'all' ? 'All' : st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 bg-slate-50 dark:bg-slate-900/40">
                      <th className="py-3 px-5">Registration</th>
                      <th className="py-3 px-4">Vehicle</th>
                      <th className="py-3 px-4">Driver</th>
                      <th className="py-3 px-4">Corridor</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-5 text-right">Dispatch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {visibleVehicles.map((v) => (
                      <tr key={v.id}>
                        <td className="py-3.5 px-5 font-mono text-xs font-bold">{v.registration}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <VehicleIcon type={v.type} className="w-4 h-4 text-[#F26B1D]" />
                            <span className="font-medium">{v.model}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div>{v.driverName}</div>
                          <div className="text-xs font-mono text-slate-500">{v.driverPhone}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{v.city}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-xs font-semibold ${
                              v.status === 'Breakdown'
                                ? 'text-[#DC2626]'
                                : v.status === 'Active'
                                ? 'text-[#16A34A]'
                                : 'text-amber-600'
                            }`}
                          >
                            {v.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <button
                            type="button"
                            onClick={() => onDispatchForVehicle(v)}
                            className="min-h-[36px] px-3 rounded-lg bg-[#0F1B2D] dark:bg-[#F26B1D] text-white text-xs font-semibold cursor-pointer"
                          >
                            Request help
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'jobs' && (
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <h1 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
                Active Breakdown Dispatches
              </h1>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-xs text-[#F26B1D] font-bold">JOB #RA-90421 · On the way (11 min ETA)</div>
                  <div className="font-display text-base font-bold mt-1">
                    KA 51 AB 7740 (Tata Prima 5530.S) — Air-Brake Line Leak
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Driver: Suresh Gowda · Assigned: Expressway Heavy & Fleet Assist (Harpreet Singh)
                  </div>
                </div>
                <div className="font-mono tabular-nums font-bold text-lg">₹1,950 locked</div>
              </div>
            </div>
          )}

          {tab === 'invoices' && (
            <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                <h1 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
                  Monthly Consolidated GST Invoices
                </h1>
              </div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 bg-slate-50 dark:bg-slate-900/40">
                    <th className="py-3 px-5">Month</th>
                    <th className="py-3 px-4">Dispatches</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Total (incl. GST)</th>
                    <th className="py-3 px-5 text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {[
                    { month: 'October 2026', jobs: 9, status: 'Paid', total: 34280 },
                    { month: 'September 2026', jobs: 6, status: 'Paid', total: 21900 },
                  ].map((inv) => (
                    <tr key={inv.month}>
                      <td className="py-3.5 px-5 font-semibold">{inv.month}</td>
                      <td className="py-3.5 px-4 tabular-nums">{inv.jobs}</td>
                      <td className="py-3.5 px-4 text-[#16A34A] font-semibold">{inv.status}</td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold">
                        ₹{inv.total.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => onNotify(`Downloaded consolidated GST invoice for ${inv.month}.`)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#F26B1D] hover:underline cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
