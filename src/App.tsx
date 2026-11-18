import React, { useEffect, useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { DriverAccountPage } from './components/pages/DriverAccountPage';
import { FleetDashboard } from './components/pages/FleetDashboard';
import { HelpCentrePage } from './components/pages/HelpCentrePage';
import { LandingPage } from './components/pages/LandingPage';
import { LiveJobPage } from './components/pages/LiveJobPage';
import { PaymentInvoicePage } from './components/pages/PaymentInvoicePage';
import { PricingCoveragePage } from './components/pages/PricingCoveragePage';
import { PrototypeShowcasePage } from './components/pages/PrototypeShowcasePage';
import { ProviderDashboard } from './components/pages/ProviderDashboard';
import { QuotesPage } from './components/pages/QuotesPage';
import { RequestPage } from './components/pages/RequestPage';
import { TowRequestPage } from './components/pages/TowRequestPage';
import { SmsFallbackModal, ToastContainer } from './components/ui/CommonUI';
import {
  ASSET_IMAGES,
  DEFAULT_PIN,
  INITIAL_CHAT_THREAD,
  INITIAL_QUOTES,
  INITIAL_RATE_CARDS,
} from './data/mockData';
import {
  BreakdownRequest,
  ChatMessage,
  FleetVehicle,
  JobStep,
  Language,
  PageRoute,
  PriceRevision,
  ProviderQuote,
  RateCardItem,
  SavedVehicle,
  ToastMessage,
  TowDetails,
  VehicleType,
} from './types';

const DRIVER_FLOW_ROUTES: { route: PageRoute; label: string }[] = [
  { route: 'request', label: '1. Request' },
  { route: 'quotes', label: '2. Quotes' },
  { route: 'live-job', label: '3. Live Job' },
  { route: 'tow-request', label: '4. Tow' },
  { route: 'payment', label: '5. Payment' },
];

export default function App() {
  const [route, setRoute] = useState<PageRoute>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(false);

  const [requestDraft, setRequestDraft] = useState<BreakdownRequest>({
    id: 'REQ-90421',
    vehicleType: 'car',
    vehicleLabel: 'Car / SUV',
    registrationNumber: 'KA 05 MN 4821',
    fault: 'flat_tyre',
    location: DEFAULT_PIN,
    notes: '',
    voiceNoteDurationSec: null,
    voiceTranscript: null,
    photoUrl: null,
    language: 'en',
    createdAt: new Date().toISOString(),
  });

  const [rateCards, setRateCards] = useState<RateCardItem[]>(INITIAL_RATE_CARDS);
  const [selectedQuote, setSelectedQuote] = useState<ProviderQuote>(INITIAL_QUOTES[0]);
  const [jobStep, setJobStep] = useState<JobStep>('on_the_way');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_THREAD);
  const [priceRevision, setPriceRevision] = useState<PriceRevision | null>(null);

  const [towDetails, setTowDetails] = useState<TowDetails>({
    towClass: 'flatbed',
    destination: 'Bosch Car Service — HSR Layout (6.4 km)',
    distanceKm: 6.4,
    baseTowFee: 1199,
    perKmRate: 45,
    totalTowPrice: 1487,
    confirmed: false,
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [smsModalOpen, setSmsModalOpen] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [consentModalOpen, setConsentModalOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const notify = (title: string, tone: ToastMessage['tone'] = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  };

  const navigate = (nextRoute: PageRoute) => {
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartRequest = (vehicle?: VehicleType) => {
    if (vehicle) {
      setRequestDraft((prev) => ({ ...prev, vehicleType: vehicle }));
    }
    navigate('request');
  };

  const handleAcceptQuote = (quote: ProviderQuote) => {
    setSelectedQuote(quote);
    setJobStep('accepted');
    setPriceRevision(null);
    setTowDetails((prev) => ({ ...prev, confirmed: false }));
    notify(`Fixed quote ₹${quote.totalFixedPrice} locked with ${quote.providerName}.`);
    navigate('live-job');
  };

  const handleSendChat = (text: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const driverMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'driver',
      textTranslated: text,
      textOriginal: text,
      originalLanguage: language,
      timestamp: now,
    };
    setChatMessages((prev) => [...prev, driverMsg]);

    // Realistic mechanic bilingual auto-translated reply
    window.setTimeout(() => {
      const replies: Record<Language, { translated: string; original: string }> = {
        en: {
          translated: 'Copy that. I have spotted your hazard lights and am pulling in behind you now.',
          original: 'ಸರಿ, ನಿಮ್ಮ ಹಜಾರ್ಡ್ ಲೈಟ್ ಕಾಣಿಸುತ್ತಿದೆ. ಈಗ ನಿಮ್ಮ ಹಿಂದೆ ನಿಲ್ಲಿಸುತ್ತಿದ್ದೇನೆ.',
        },
        hi: {
          translated: 'ठीक है, आपकी हज़ार्ड लाइट दिख रही है। मैं ठीक आपके पीछे गाड़ी लगा रहा हूँ।',
          original: 'ಸರಿ, ನಿಮ್ಮ ಹಜಾರ್ಡ್ ಲೈಟ್ ಕಾಣಿಸುತ್ತಿದೆ. ಈಗ ನಿಮ್ಮ ಹಿಂದೆ ನಿಲ್ಲಿಸುತ್ತಿದ್ದೇನೆ.',
        },
        kn: {
          translated: 'ಸರಿ, ನಿಮ್ಮ ಹಜಾರ್ಡ್ ಲೈಟ್ ಕಾಣಿಸುತ್ತಿದೆ. ಈಗ ನಿಮ್ಮ ಹಿಂದೆ ನಿಲ್ಲಿಸುತ್ತಿದ್ದೇನೆ.',
          original: 'ಸರಿ, ನಿಮ್ಮ ಹಜಾರ್ಡ್ ಲೈಟ್ ಕಾಣಿಸುತ್ತಿದೆ. ಈಗ ನಿಮ್ಮ ಹಿಂದೆ ನಿಲ್ಲಿಸುತ್ತಿದ್ದೇನೆ.',
        },
      };
      setChatMessages((prev) => [
        ...prev,
        {
          id: `m-reply-${Date.now()}`,
          sender: 'mechanic',
          textTranslated: replies[language].translated,
          textOriginal: replies[language].original,
          originalLanguage: 'kn',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 650);
  };

  const handleTriggerPriceRevision = () => {
    const base = selectedQuote.totalFixedPrice;
    setPriceRevision({
      id: 'REV-101',
      oldPrice: base,
      newPrice: base + 350,
      reason: 'Sidewall tear cannot be safely plugged; requires valve stem & spare rim mount.',
      photoUrl: ASSET_IMAGES.faultInspection,
      status: 'pending',
    });
  };

  const handleResolvePriceRevision = (approved: boolean) => {
    if (!priceRevision) return;
    setPriceRevision({ ...priceRevision, status: approved ? 'approved' : 'declined' });
    if (approved) {
      notify(`Price update approved. New locked total: ₹${priceRevision.newPrice}.`);
    } else {
      notify('Price update declined. Original fixed quote remains locked.', 'info');
    }
  };

  const handleFleetDispatch = (v: FleetVehicle) => {
    setRequestDraft((prev) => ({
      ...prev,
      vehicleType: v.type,
      registrationNumber: v.registration,
      location: { ...DEFAULT_PIN, address: `${v.city} Highway Corridor` },
      notes: `Fleet dispatch for driver ${v.driverName} (${v.driverPhone})`,
    }));
    notify(`Pre-filled breakdown request for ${v.registration}.`);
    navigate('request');
  };

  const handleDriverVehicleRequest = (v: SavedVehicle) => {
    setRequestDraft((prev) => ({
      ...prev,
      vehicleType: v.type,
      registrationNumber: v.registration,
    }));
    navigate('request');
  };

  const inDriverFlow = DRIVER_FLOW_ROUTES.some((d) => d.route === route);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] dark:bg-[#0B121E] text-[#0F1B2D] dark:text-slate-100">
      <Header
        currentRoute={route}
        onNavigate={navigate}
        language={language}
        onLanguageChange={(lang) => {
          setLanguage(lang);
          setRequestDraft((prev) => ({ ...prev, language: lang }));
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((v) => !v)}
      />

      {/* Clean Driver Flow Progress Bar when inside the 5-step driver flow */}
      {inDriverFlow && (
        <div className="bg-white dark:bg-[#111A2B] border-b border-slate-200 dark:border-slate-800 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 overflow-x-auto">
            {DRIVER_FLOW_ROUTES.map((step) => {
              const active = route === step.route;
              return (
                <button
                  key={step.route}
                  type="button"
                  onClick={() => navigate(step.route)}
                  className={`min-h-[34px] px-3 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                    active
                      ? 'bg-[#0F1B2D] dark:bg-[#F26B1D] text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {step.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <main className="flex-1">
        {route === 'landing' && (
          <LandingPage
            language={language}
            onLanguageChange={setLanguage}
            onStartRequest={handleStartRequest}
            onNavigate={navigate}
            locationText={requestDraft.location.address}
            onLocationTextChange={(val) =>
              setRequestDraft((prev) => ({
                ...prev,
                location: { ...prev.location, address: val },
              }))
            }
            onDetectGps={() => {
              setRequestDraft((prev) => ({ ...prev, location: DEFAULT_PIN }));
              notify('GPS location detected: NH-44 Silk Board Junction.');
            }}
          />
        )}

        {route === 'request' && (
          <RequestPage
            language={language}
            onLanguageChange={setLanguage}
            requestDraft={requestDraft}
            onUpdateDraft={setRequestDraft}
            onSubmitRequest={() => navigate('quotes')}
            onOpenSmsModal={() => setSmsModalOpen(true)}
            onNotify={(msg) => notify(msg)}
          />
        )}

        {route === 'quotes' && (
          <QuotesPage
            language={language}
            requestDraft={requestDraft}
            quotes={INITIAL_QUOTES}
            onAcceptQuote={handleAcceptQuote}
            onBackToRequest={() => navigate('request')}
          />
        )}

        {route === 'live-job' && (
          <LiveJobPage
            language={language}
            requestDraft={requestDraft}
            selectedQuote={selectedQuote}
            jobStep={jobStep}
            onAdvanceStep={(next) => {
              setJobStep(next);
              notify(`Status updated: ${next.replace('_', ' ')}`);
            }}
            chatMessages={chatMessages}
            onSendMessage={handleSendChat}
            priceRevision={priceRevision}
            onTriggerPriceRevision={handleTriggerPriceRevision}
            onResolvePriceRevision={handleResolvePriceRevision}
            onRequestTow={() => navigate('tow-request')}
            onProceedToPayment={() => navigate('payment')}
            onNotify={(msg) => notify(msg)}
          />
        )}

        {route === 'tow-request' && (
          <TowRequestPage
            language={language}
            requestDraft={requestDraft}
            rateCards={rateCards}
            towDetails={towDetails}
            onConfirmTow={(details) => {
              setTowDetails(details);
              notify(`Confirmed fixed tow ₹${details.totalTowPrice.toLocaleString()}.`);
              navigate('payment');
            }}
            onBack={() => navigate('live-job')}
          />
        )}

        {route === 'payment' && (
          <PaymentInvoicePage
            language={language}
            requestDraft={requestDraft}
            selectedQuote={selectedQuote}
            priceRevision={priceRevision}
            towDetails={towDetails}
            onBackHome={() => navigate('landing')}
            onNotify={(msg) => notify(msg)}
          />
        )}

        {route === 'pricing' && (
          <PricingCoveragePage
            language={language}
            rateCards={rateCards}
            onStartRequest={(vt) => handleStartRequest(vt)}
          />
        )}

        {route === 'help' && (
          <HelpCentrePage language={language} onNotify={(msg) => notify(msg)} />
        )}

        {route === 'driver-account' && (
          <DriverAccountPage
            language={language}
            onLanguageChange={setLanguage}
            onRequestForVehicle={handleDriverVehicleRequest}
            onNotify={(msg) => notify(msg)}
          />
        )}

        {route === 'provider-dashboard' && (
          <ProviderDashboard onNotify={(msg) => notify(msg)} />
        )}

        {route === 'fleet-dashboard' && (
          <FleetDashboard
            onDispatchForVehicle={handleFleetDispatch}
            onNotify={(msg) => notify(msg)}
          />
        )}

        {route === 'admin-dashboard' && (
          <AdminDashboard
            rateCards={rateCards}
            onUpdateRateCards={setRateCards}
            onNotify={(msg) => notify(msg)}
          />
        )}

        {route === 'preview-studio' && (
          <PrototypeShowcasePage
            language={language}
            onLanguageChange={setLanguage}
            requestDraft={requestDraft}
            onUpdateDraft={setRequestDraft}
            onStartRequest={handleStartRequest}
            onSubmitRequest={() => navigate('quotes')}
            onNavigate={navigate}
            onOpenSmsModal={() => setSmsModalOpen(true)}
            onNotify={(msg) => notify(msg)}
            locationText={requestDraft.location.address}
            onLocationTextChange={(val) =>
              setRequestDraft((prev) => ({
                ...prev,
                location: { ...prev.location, address: val },
              }))
            }
            onDetectGps={() => {
              setRequestDraft((prev) => ({ ...prev, location: DEFAULT_PIN }));
              notify('GPS coordinates refreshed.');
            }}
          />
        )}
      </main>

      <Footer
        onNavigate={navigate}
        language={language}
        onLanguageChange={setLanguage}
        consentAccepted={consentAccepted}
        onOpenConsent={() => setConsentModalOpen(true)}
      />

      <SmsFallbackModal
        open={smsModalOpen}
        onClose={() => setSmsModalOpen(false)}
        vehicleType={requestDraft.vehicleType}
        fault={requestDraft.fault}
        location={requestDraft.location}
        onNotify={(msg) => notify(msg)}
      />

      {consentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" role="dialog" aria-modal="true">
          <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
              Cookie & GPS Location Consent
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              RoadAid uses essential browser storage for your selected language and active breakdown pin, and GPS coordinates strictly to dispatch mechanics to your location.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setConsentAccepted(false);
                  setConsentModalOpen(false);
                  notify('Only essential session cookies active.', 'info');
                }}
                className="flex-1 min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold cursor-pointer"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={() => {
                  setConsentAccepted(true);
                  setConsentModalOpen(false);
                  notify('Location & cookie preferences saved.');
                }}
                className="flex-1 min-h-[44px] rounded-xl bg-[#F26B1D] text-white text-sm font-semibold cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
}
