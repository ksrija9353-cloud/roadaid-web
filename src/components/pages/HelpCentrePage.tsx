import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, PhoneCall, Search, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';
import { Language } from '../../types';
import { VoiceInputButton } from '../ui/CommonUI';

const HELP_TOPICS = [
  {
    category: 'Pricing & Refunds',
    q: 'What happens if the mechanic cannot repair my vehicle on the spot?',
    a: 'You can tap "Switch to Tow" directly inside the live job screen. Your vehicle and location are carried over automatically, and your initial diagnostic callout fee is credited toward the tow base fee.',
  },
  {
    category: 'Safety & SOS',
    q: 'How does the SOS button work during a highway breakdown?',
    a: 'Tapping SOS opens one-tap dialing to National Emergency 112 and NHAI Highway Patrol 1033 while generating a shareable live GPS link for your family or fleet manager.',
  },
  {
    category: 'Offline Support',
    q: 'Can I request RoadAid without mobile internet?',
    a: 'Yes. Use our SMS fallback format (ROADAID <VEHICLE> <FAULT> <LAT,LNG>) sent to 92205 92205. Our dispatch desk replies via SMS with mechanic details and fixed quote.',
  },
  {
    category: 'Heavy Vehicles',
    q: 'Do you support loaded trucks and multi-axle coaches?',
    a: 'Yes. Select Truck or Bus when requesting help to filter only 24T–40T air-brake technicians and heavy underlift wreckers.',
  },
];

export function HelpCentrePage({
  language,
  onNotify,
}: {
  language: Language;
  onNotify: (msg: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filteredTopics = HELP_TOPICS.filter(
    (item) =>
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      onNotify('Please complete your name, phone number, and message.');
      return;
    }
    setSubmitted(true);
    onNotify('Callback request received. Support desk will call within 5 minutes.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="max-w-2xl space-y-2">
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0F1B2D] dark:text-white">
          Help Centre & Roadside Safety
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Immediate answers, emergency highway numbers, and direct 24/7 dispatch support.
        </p>
      </div>

      {/* Emergency Numbers Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#DC2626]">
            <AlertTriangle className="w-4 h-4" />
            <span>National Emergency / Police</span>
          </div>
          <div className="font-mono tabular-nums text-2xl font-extrabold text-[#0F1B2D] dark:text-white mt-2">
            112
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Immediate accident or medical response</p>
        </div>

        <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0F1B2D] dark:text-white">
            <PhoneCall className="w-4 h-4 text-[#F26B1D]" />
            <span>NHAI Highway Patrol</span>
          </div>
          <div className="font-mono tabular-nums text-2xl font-extrabold text-[#0F1B2D] dark:text-white mt-2">
            1033
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">National highway expressway helpline</p>
        </div>

        <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0F1B2D] dark:text-white">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>RoadAid 24/7 Dispatch Desk</span>
          </div>
          <div className="font-mono tabular-nums text-2xl font-extrabold text-[#0F1B2D] dark:text-white mt-2">
            1800-103-7623
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Multilingual toll-free breakdown desk</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Searchable FAQ */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search help articles (e.g. tow, SMS, refund)…"
                aria-label="Search help articles"
                className="w-full min-h-[48px] pl-10 pr-4 rounded-xl bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-700 text-sm text-[#0F1B2D] dark:text-white"
              />
            </div>
            <VoiceInputButton
              language={language}
              onTranscript={(txt) => setQuery(txt.includes('tow') ? 'tow' : 'SMS')}
              samplePhrase="tow"
              label={TRANSLATIONS[language].common.voiceInput}
            />
          </div>

          <div className="space-y-3">
            {filteredTopics.map((item) => (
              <div
                key={item.q}
                className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
              >
                <div className="text-xs font-semibold text-[#F26B1D] mb-1">{item.category}</div>
                <h3 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white">{item.q}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{item.a}</p>
              </div>
            ))}
            {filteredTopics.length === 0 && (
              <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-300">No help articles matched “{query}”.</p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="mt-3 text-sm font-semibold text-[#F26B1D] hover:underline cursor-pointer"
                >
                  Show all topics
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contact / Callback Form */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-fit">
          <h2 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white mb-1">
            Request an urgent callback
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Average response time under 5 minutes for active roadside queries.
          </p>

          {submitted ? (
            <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 text-[#16A34A] font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Callback Scheduled</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200">
                Our Bengaluru dispatch lead will call <span className="font-mono font-semibold">{phone}</span> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="text-xs font-semibold text-[#F26B1D] hover:underline pt-1 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#0F1B2D] dark:text-slate-200 mb-1">
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Karthik Rao"
                  className="w-full min-h-[44px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F1B2D] dark:text-slate-200 mb-1">
                  Mobile number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98450 00000"
                  className="w-full min-h-[44px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-mono"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#0F1B2D] dark:text-slate-200">
                    How can we help?
                  </label>
                  <VoiceInputButton
                    language={language}
                    onTranscript={(txt) => setMessage(txt)}
                    samplePhrase="Need invoice copy for yesterday highway tow"
                    label={TRANSLATIONS[language].common.voiceInput}
                    compact
                  />
                </div>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or job ID…"
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full min-h-[48px] rounded-xl bg-[#F26B1D] hover:bg-[#d95b12] text-white font-semibold text-sm cursor-pointer"
              >
                Request Callback
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
