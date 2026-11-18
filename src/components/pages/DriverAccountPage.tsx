import React, { useState } from 'react';
import { ArrowRight, Download, Plus, ShieldCheck } from 'lucide-react';
import { INITIAL_JOB_HISTORY, INITIAL_SAVED_VEHICLES } from '../../data/mockData';
import { LANGUAGE_LABELS } from '../../i18n/translations';
import { Language, SavedVehicle, VehicleType } from '../../types';
import { VehicleIcon } from '../ui/CommonUI';

export function DriverAccountPage({
  language,
  onLanguageChange,
  onRequestForVehicle,
  onNotify,
}: {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onRequestForVehicle: (vehicle: SavedVehicle) => void;
  onNotify: (msg: string) => void;
}) {
  const [vehicles, setVehicles] = useState<SavedVehicle[]>(INITIAL_SAVED_VEHICLES);
  const [adding, setAdding] = useState(false);
  const [newType, setNewType] = useState<VehicleType>('car');
  const [newModel, setNewModel] = useState('');
  const [newReg, setNewReg] = useState('');

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModel.trim() || !newReg.trim()) return;
    setVehicles((prev) => [
      {
        id: `v-${Date.now()}`,
        type: newType,
        makeModel: newModel.trim(),
        registration: newReg.trim().toUpperCase(),
        fuelType: 'Petrol',
      },
      ...prev,
    ]);
    setNewModel('');
    setNewReg('');
    setAdding(false);
    onNotify('Vehicle saved to your driver profile.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] dark:text-white">
            Driver Account
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Arjun Hegde · +91 98450 61290 · Optional account for saved vehicles & GST receipts
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-xl p-1.5">
          <span className="text-xs font-medium text-slate-500 px-2">Default language:</span>
          {(['en', 'hi', 'kn'] as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                onLanguageChange(lang);
                onNotify(`Default chat & interface language saved: ${LANGUAGE_LABELS[lang].native}`);
              }}
              className={`min-h-[34px] px-2.5 rounded-lg text-xs font-semibold cursor-pointer ${
                language === lang
                  ? 'bg-[#F26B1D] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {LANGUAGE_LABELS[lang].native}
            </button>
          ))}
        </div>
      </div>

      {/* Saved Vehicles */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">Saved vehicles</h2>
          <button
            type="button"
            onClick={() => setAdding((v) => !v)}
            className="min-h-[42px] px-4 rounded-xl bg-[#0F1B2D] dark:bg-[#F26B1D] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add vehicle</span>
          </button>
        </div>

        {adding && (
          <form
            onSubmit={handleAddVehicle}
            className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-4 gap-3"
          >
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as VehicleType)}
              className="min-h-[44px] px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
            >
              <option value="bike">Two-Wheeler</option>
              <option value="car">Car / SUV</option>
              <option value="truck">Truck</option>
              <option value="bus">Bus</option>
            </select>
            <input
              type="text"
              value={newModel}
              onChange={(e) => setNewModel(e.target.value)}
              placeholder="Make & model (e.g. Maruti Swift)"
              className="min-h-[44px] px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
            />
            <input
              type="text"
              value={newReg}
              onChange={(e) => setNewReg(e.target.value)}
              placeholder="KA 01 AB 1234"
              className="min-h-[44px] px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-mono uppercase"
            />
            <button
              type="submit"
              className="min-h-[44px] rounded-xl bg-[#F26B1D] text-white text-sm font-semibold cursor-pointer"
            >
              Save Vehicle
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#F26B1D] flex items-center justify-center shrink-0">
                  <VehicleIcon type={v.type} className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display text-base font-bold text-[#0F1B2D] dark:text-white">
                    {v.makeModel}
                  </div>
                  <div className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {v.registration} · {v.fuelType}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRequestForVehicle(v)}
                className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#F26B1D] text-sm font-semibold text-[#0F1B2D] dark:text-white inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request help</span>
                <ArrowRight className="w-4 h-4 text-[#F26B1D]" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Job History Table */}
      <section className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">Job history</h2>
          <span className="text-xs font-medium text-[#16A34A] inline-flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Receipts archived</span>
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/40">
                <th className="py-3 px-5">Job ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Vehicle & Fault</th>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {INITIAL_JOB_HISTORY.map((job) => (
                <tr key={job.id}>
                  <td className="py-3.5 px-5 font-mono text-xs font-semibold text-[#0F1B2D] dark:text-white">
                    {job.id}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">{job.date}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#0F1B2D] dark:text-white">{job.vehicle}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {job.fault} · {job.location}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{job.provider}</td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-[#0F1B2D] dark:text-white">
                    ₹{job.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => onNotify(`Downloaded GST receipt for ${job.id}.`)}
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
      </section>
    </div>
  );
}
