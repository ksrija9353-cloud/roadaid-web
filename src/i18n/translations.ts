import { FaultType, Language, VehicleType } from '../types';

export interface TranslationBundle {
  nav: {
    getHelp: string;
    pricing: string;
    helpCentre: string;
    dashboards: string;
    previewStudio: string;
    getHelpNow: string;
    driverAccount: string;
    providerDash: string;
    fleetDash: string;
    adminDash: string;
  };
  landing: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    locationPlaceholder: string;
    detectLocation: string;
    getHelpBtn: string;
    noAppNote: string;
    howItWorksTitle: string;
    steps: { title: string; desc: string }[];
    vehiclesTitle: string;
    vehiclesSubtitle: string;
    vehicleCards: Record<VehicleType, { name: string; desc: string; priceFrom: string }>;
    heavyTitle: string;
    heavySubtitle: string;
    heavyBullets: string[];
    heavyCta: string;
    languagesTitle: string;
    languagesSubtitle: string;
    statsTitle: string;
    stats: { value: string; label: string; context: string }[];
    providerCtaTitle: string;
    providerCtaSubtitle: string;
    providerCtaBtn: string;
    faqTitle: string;
    faqs: { q: string; a: string }[];
  };
  request: {
    title: string;
    subtitle: string;
    stepLocation: string;
    dragPinHint: string;
    addressLabel: string;
    stepVehicle: string;
    regLabel: string;
    regPlaceholder: string;
    stepFault: string;
    stepMedia: string;
    addPhoto: string;
    useSamplePhoto: string;
    recordVoice: string;
    stopVoice: string;
    voiceRecorded: string;
    notesPlaceholder: string;
    preferredLang: string;
    submitBtn: string;
    offlineToggle: string;
    offlineBanner: string;
    requestBySms: string;
  };
  quotes: {
    title: string;
    subtitle: string;
    sortByPrice: string;
    sortByEta: string;
    filterVerified: string;
    filterSpeaksLang: string;
    acceptBtn: string;
    fixedPriceLabel: string;
    verifiedBadge: string;
    speaksLabel: string;
    noQuotesTitle: string;
    noQuotesDesc: string;
    resetFilters: string;
    simulateError: string;
    errorTitle: string;
    retryBtn: string;
  };
  liveJob: {
    title: string;
    etaBanner: string;
    arrivingIn: string;
    timelineLabels: [string, string, string, string, string];
    chatTitle: string;
    autoTranslated: string;
    showOriginal: string;
    hideOriginal: string;
    chatPlaceholder: string;
    sendBtn: string;
    callBtn: string;
    shareLocation: string;
    sosBtn: string;
    needTowBtn: string;
    proceedPayBtn: string;
    simulateRevisionBtn: string;
    advanceStepBtn: string;
  };
  priceModal: {
    title: string;
    subtitle: string;
    oldPrice: string;
    newPrice: string;
    reasonLabel: string;
    photoLabel: string;
    approveBtn: string;
    declineBtn: string;
  };
  tow: {
    title: string;
    subtitle: string;
    autoSelected: string;
    towClasses: {
      bike_carrier: { title: string; desc: string };
      flatbed: { title: string; desc: string };
      heavy_wrecker: { title: string; desc: string };
    };
    prefilledTitle: string;
    destinationLabel: string;
    quickDestinations: string[];
    priceBreakdown: string;
    confirmTowBtn: string;
  };
  payment: {
    title: string;
    subtitle: string;
    itemisedTitle: string;
    baseCallout: string;
    repairOrTow: string;
    approvedParts: string;
    gst: string;
    totalPayable: string;
    methodTitle: string;
    methods: { upi: string; card: string; cash: string };
    payNowBtn: string;
    paidConfirmed: string;
    downloadReceipt: string;
    rateTitle: string;
    submitRating: string;
    backHome: string;
  };
  faults: Record<FaultType, string>;
  common: {
    bike: string;
    car: string;
    truck: string;
    bus: string;
    voiceInput: string;
    listening: string;
    min: string;
    km: string;
    jobs: string;
    darkMode: string;
    lightMode: string;
  };
}

export const LANGUAGE_LABELS: Record<Language, { short: string; native: string; english: string }> = {
  en: { short: 'EN', native: 'English', english: 'English' },
  hi: { short: 'हिं', native: 'हिंदी', english: 'Hindi' },
  kn: { short: 'ಕನ್ನಡ', native: 'ಕನ್ನಡ', english: 'Kannada' },
};

export const SUPPORTED_LANGUAGES_ROW = [
  { code: 'en', name: 'English', script: 'English' },
  { code: 'hi', name: 'Hindi', script: 'हिंदी' },
  { code: 'kn', name: 'Kannada', script: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'Tamil', script: 'தமிழ்' },
  { code: 'te', name: 'Telugu', script: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', script: 'मराठी' },
];

export const TRANSLATIONS: Record<Language, TranslationBundle> = {
  en: {
    nav: {
      getHelp: 'Get Help',
      pricing: 'Pricing & Coverage',
      helpCentre: 'Help Centre',
      dashboards: 'Portals',
      previewStudio: 'Layouts & Scripts',
      getHelpNow: 'Get help now',
      driverAccount: 'Driver Account',
      providerDash: 'Provider Dashboard',
      fleetDash: 'Fleet Owner',
      adminDash: 'Admin Console',
    },
    landing: {
      heroEyebrow: 'No app install · Works on any mobile browser · 24/7 dispatch',
      heroTitle: 'Roadside help for any vehicle, priced before we roll.',
      heroSubtitle:
        'Stranded with a bike, car, truck, or bus? Pin your breakdown location in under 60 seconds, see fixed quotes upfront, chat in your own language, or request the right tow in one tap.',
      locationPlaceholder: 'Enter highway, landmark, or GPS location…',
      detectLocation: 'Use GPS',
      getHelpBtn: 'Get help now',
      noAppNote: 'First request works with zero sign-up. Offline? SMS dispatch available.',
      howItWorksTitle: 'How RoadAid works on the road',
      steps: [
        { title: '01. Request', desc: 'Pin your spot, tap vehicle & fault, or speak a voice note.' },
        { title: '02. Get fixed price', desc: 'Compare upfront quotes with distance, ETA, and verified badges.' },
        { title: '03. Track & chat', desc: 'Watch your mechanic arrive live with auto-translated chat.' },
        { title: '04. Pay & go', desc: 'Approve any parts with photo proof. Pay via UPI, card, or cash.' },
      ],
      vehiclesTitle: 'Every vehicle on the road covered',
      vehiclesSubtitle: 'Tap your vehicle class to start an instant breakdown request.',
      vehicleCards: {
        bike: { name: 'Two-Wheelers', desc: 'Puncture, battery, chain, key & carrier tow', priceFrom: 'From ₹249' },
        car: { name: 'Cars & SUVs', desc: 'Jumpstart, tyre swap, overheating & flatbed tow', priceFrom: 'From ₹499' },
        truck: { name: 'Trucks & LCVs', desc: 'Air-brake, hub, diesel bleed & underlift recovery', priceFrom: 'From ₹1,499' },
        bus: { name: 'Buses & Coaches', desc: '24T+ highway wrecker, axle & fleet priority', priceFrom: 'From ₹2,499' },
      },
      heavyTitle: 'Heavy vehicle recovery built for highways',
      heavySubtitle:
        'Commercial trucks and intercity coaches cannot wait hours for standard garages. RoadAid dispatches certified air-brake technicians and 24T–40T underlift wreckers directly to national highway corridors.',
      heavyBullets: [
        'Axle-safe underlift & heavy rotator winches up to 40 tonnes',
        'Pre-negotiated fleet rate cards with GST-compliant monthly billing',
        'Direct coordination with NHAI highway patrol & fleet managers',
      ],
      heavyCta: 'Request heavy recovery',
      languagesTitle: 'Speak in your language. Mechanics read in theirs.',
      languagesSubtitle:
        'Live two-way message translation across regional scripts so you never struggle to explain a breakdown on an unfamiliar highway.',
      statsTitle: 'Built for reliability when every minute counts',
      stats: [
        { value: '18 min', label: 'Median urban arrival', context: 'Across 28 metro & expressway zones in 2026' },
        { value: '100%', label: 'Upfront fixed quotes', context: 'Zero surprise callout fees before dispatch' },
        { value: '14,200+', label: 'Verified technicians', context: 'RC-checked tow trucks & skill-audited garages' },
        { value: '99.2%', label: 'Price-lock adherence', context: 'Extra parts require photo & driver tap approval' },
      ],
      providerCtaTitle: 'Own a garage, mobile repair van, or tow truck?',
      providerCtaSubtitle:
        'Receive verified breakdown jobs near your corridor with instant UPI settlements and zero lead-buying fees.',
      providerCtaBtn: 'Open Provider Dashboard',
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'Do I need to install an app or create an account first?',
          a: 'No. Your first breakdown request works directly in your phone browser without creating an account or downloading an app.',
        },
        {
          q: 'Can the mechanic change the price after arriving?',
          a: 'Only if they inspect an additional fault and send you a photo-backed Price Revision Request. You can approve or decline in one tap.',
        },
        {
          q: 'What if mobile internet drops on a remote highway?',
          a: 'Tap "Request by SMS" to generate a compact one-line SMS code with your GPS coordinates, vehicle type, and fault.',
        },
        {
          q: 'Do I have to re-enter my details if my car needs a tow instead?',
          a: 'Never. One tap on "Request Tow" carries over your exact pin, vehicle details, and pre-selects the right carrier or flatbed.',
        },
      ],
    },
    request: {
      title: 'Request roadside help',
      subtitle: 'No sign-up needed · Takes under 60 seconds',
      stepLocation: '1. Confirm breakdown location',
      dragPinHint: 'Drag the map pin or tap anywhere on the map to fine-tune your spot.',
      addressLabel: 'Highway / Street landmark',
      stepVehicle: '2. Select vehicle type',
      regLabel: 'Vehicle number (optional)',
      regPlaceholder: 'e.g. KA 05 MN 4821',
      stepFault: '3. What happened?',
      stepMedia: '4. Photo or voice note (optional)',
      addPhoto: 'Upload fault photo',
      useSamplePhoto: 'Attach sample tyre photo',
      recordVoice: 'Hold or tap to record voice note',
      stopVoice: 'Stop recording',
      voiceRecorded: 'Voice note attached',
      notesPlaceholder: 'Describe noise, warning light, or safe landmark…',
      preferredLang: 'Chat language',
      submitBtn: 'See fixed quotes now',
      offlineToggle: 'Simulate slow / offline network',
      offlineBanner: 'Weak signal detected. You can still dispatch help over standard SMS.',
      requestBySms: 'Request by SMS',
    },
    quotes: {
      title: 'Fixed quotes near you',
      subtitle: 'Prices are locked before the mechanic starts driving.',
      sortByPrice: 'Lowest price',
      sortByEta: 'Fastest ETA',
      filterVerified: 'Verified only',
      filterSpeaksLang: 'Speaks my language',
      acceptBtn: 'Accept fixed quote',
      fixedPriceLabel: 'Fixed total',
      verifiedBadge: 'Verified',
      speaksLabel: 'Speaks',
      noQuotesTitle: 'No providers match these filters',
      noQuotesDesc: 'Reset filters to view all verified mechanics within 15 km.',
      resetFilters: 'Show all quotes',
      simulateError: 'Simulate network error',
      errorTitle: 'Could not refresh live quotes',
      retryBtn: 'Retry connection',
    },
    liveJob: {
      title: 'Help is on the way',
      etaBanner: 'Mechanic dispatched · Fixed price locked',
      arrivingIn: 'Arriving in',
      timelineLabels: ['Accepted', 'On the way', 'Arrived', 'Repairing', 'Done'],
      chatTitle: 'Translated chat',
      autoTranslated: 'Auto-translated',
      showOriginal: 'Show original',
      hideOriginal: 'Show translated',
      chatPlaceholder: 'Message mechanic or use voice…',
      sendBtn: 'Send',
      callBtn: 'Call',
      shareLocation: 'Share live link',
      sosBtn: 'SOS',
      needTowBtn: 'Switch to tow (1-click)',
      proceedPayBtn: 'Complete & pay',
      simulateRevisionBtn: 'Demo: Mechanic price update',
      advanceStepBtn: 'Demo: Next status step',
    },
    priceModal: {
      title: 'Price update requested by mechanic',
      subtitle: 'Approve only if you agree with the inspection photo and added work.',
      oldPrice: 'Original fixed price',
      newPrice: 'Updated total',
      reasonLabel: 'Mechanic explanation',
      photoLabel: 'On-site inspection photo',
      approveBtn: 'Approve ₹',
      declineBtn: 'Decline & keep original',
    },
    tow: {
      title: 'Confirm recovery tow',
      subtitle: 'Vehicle & breakdown pin pre-filled from your active job.',
      autoSelected: 'Auto-selected for your vehicle',
      towClasses: {
        bike_carrier: { title: 'Enclosed Bike Carrier', desc: 'Soft-strap cradle & hydraulic ramp for two-wheelers' },
        flatbed: { title: 'Hydraulic Flatbed Tow', desc: 'Zero-drag wheel-strap flatbed for cars & SUVs' },
        heavy_wrecker: { title: 'Heavy-Duty Underlift Wrecker', desc: 'Up to 40T axle-lift & air-supply towing for trucks/buses' },
      },
      prefilledTitle: 'Pre-filled breakdown details',
      destinationLabel: 'Drop-off workshop or destination',
      quickDestinations: [
        'Bosch Car Service — HSR Layout (6.4 km)',
        'Authorised Dealership — Silk Board (9.1 km)',
        'Home / Fleet Yard — Koramangala (11.5 km)',
      ],
      priceBreakdown: 'Fixed tow price breakdown',
      confirmTowBtn: 'Confirm fixed tow',
    },
    payment: {
      title: 'Invoice & payment',
      subtitle: 'Pay securely after inspecting the completed repair.',
      itemisedTitle: 'Itemised invoice',
      baseCallout: 'Roadside callout & inspection',
      repairOrTow: 'Repair / Tow service',
      approvedParts: 'Approved replacement / valve',
      gst: 'GST (18%)',
      totalPayable: 'Total payable',
      methodTitle: 'Choose payment method',
      methods: { upi: 'UPI (GPay / PhonePe / QR)', card: 'Debit / Credit Card', cash: 'Cash to Mechanic' },
      payNowBtn: 'Pay',
      paidConfirmed: 'Payment confirmed',
      downloadReceipt: 'Download PDF Receipt',
      rateTitle: 'Rate your mechanic',
      submitRating: 'Submit rating',
      backHome: 'Back to RoadAid Home',
    },
    faults: {
      flat_tyre: 'Flat Tyre',
      dead_battery: 'Dead Battery',
      engine_wont_start: 'Engine Won’t Start',
      out_of_fuel: 'Out of Fuel',
      clutch_gear: 'Clutch / Gear',
      overheating: 'Overheating',
      key_locked: 'Key Locked In',
      accident_tow: 'Need Tow',
    },
    common: {
      bike: 'Bike',
      car: 'Car',
      truck: 'Truck',
      bus: 'Bus',
      voiceInput: 'Voice',
      listening: 'Listening…',
      min: 'min',
      km: 'km',
      jobs: 'jobs',
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
    },
  },
  hi: {
    nav: {
      getHelp: 'मदद लें',
      pricing: 'दरें और कवरेज',
      helpCentre: 'सहायता केंद्र',
      dashboards: 'पोर्टल',
      previewStudio: 'लेआउट और भाषाएं',
      getHelpNow: 'अभी मदद पाएं',
      driverAccount: 'ड्राइवर खाता',
      providerDash: 'मैकेनिक डैशबोर्ड',
      fleetDash: 'फ्लीट मालिक',
      adminDash: 'एडमिन कंसोल',
    },
    landing: {
      heroEyebrow: 'कोई ऐप इंस्टॉल नहीं · किसी भी मोबाइल ब्राउज़र पर · 24/7 सहायता',
      heroTitle: 'हर वाहन के लिए सड़क पर तुरंत मदद, निकलने से पहले तय कीमत।',
      heroSubtitle:
        'बाइक, कार, ट्रक या बस बीच रास्ते में रुक गई? 60 सेकंड से कम में लोकेशन पिन करें, पहले से तय कीमत देखें, अपनी भाषा में चैट करें या एक टैप में सही टो ट्रक बुलाएं।',
      locationPlaceholder: 'हाईवे, लैंडमार्क या GPS लोकेशन दर्ज करें…',
      detectLocation: 'GPS चुनें',
      getHelpBtn: 'अभी मदद पाएं',
      noAppNote: 'पहली रिक्वेस्ट के लिए साइन-अप ज़रूरी नहीं। नेटवर्क नहीं है? SMS से मदद पाएं।',
      howItWorksTitle: 'RoadAid सड़क पर कैसे काम करता है',
      steps: [
        { title: '01. अनुरोध करें', desc: 'जगह पिन करें, वाहन और खराबी चुनें, या वॉइस नोट भेजें।' },
        { title: '02. तय कीमत देखें', desc: 'दूरी, पहुंचने का समय और वेरिफाइड बैज के साथ रेट चुनें।' },
        { title: '03. लाइव ट्रैक और चैट', desc: 'मैकेनिक को आते देखें और अपनी भाषा में अनुवादित चैट करें।' },
        { title: '04. भुगतान करें', desc: 'फोटो प्रूफ देखकर पार्ट्स मंजूर करें। UPI, कार्ड या नकद दें।' },
      ],
      vehiclesTitle: 'सड़क पर चलने वाले हर वाहन के लिए सहायता',
      vehiclesSubtitle: 'तुरंत ब्रेकडाउन अनुरोध शुरू करने के लिए अपना वाहन चुनें।',
      vehicleCards: {
        bike: { name: 'दोपहिया वाहन', desc: 'पंक्चर, बैटरी, चेन, चाबी और बाइक कैरियर टो', priceFrom: '₹249 से शुरू' },
        car: { name: 'कार और SUV', desc: 'जंपस्टार्ट, टायर बदलना, ओवरहीटिंग और फ्लैटबेड टो', priceFrom: '₹499 से शुरू' },
        truck: { name: 'ट्रक और LCV', desc: 'एयर-ब्रेक, हब, डीजल ब्लीड और अंडरलिफ्ट रिकवरी', priceFrom: '₹1,499 से शुरू' },
        bus: { name: 'बस और कोच', desc: '24T+ हाईवे रेकर, एक्सल और फ्लीट प्राथमिकता', priceFrom: '₹2,499 से शुरू' },
      },
      heavyTitle: 'हाईवे के लिए भारी वाहन रिकवरी',
      heavySubtitle:
        'कॉमर्शियल ट्रक और इंटरसिटी बसें घंटों इंतज़ार नहीं कर सकतीं। RoadAid प्रमाणित एयर-ब्रेक तकनीशियन और 24T–40T अंडरलिफ्ट रेकर सीधे हाईवे पर भेजता है।',
      heavyBullets: [
        '40 टन तक सुरक्षित अंडरलिफ्ट और हेवी विंच रिकवरी',
        'GST बिलिंग के साथ प्री-अप्रूव्ड फ्लीट रेट कार्ड',
        'NHAI हाईवे पेट्रोल और फ्लीट मैनेजर के साथ सीधा तालमेल',
      ],
      heavyCta: 'हेवी रिकवरी मंगाएं',
      languagesTitle: 'अपनी भाषा में लिखें। मैकेनिक अपनी भाषा में पढ़ेगा।',
      languagesSubtitle:
        'रीजनल भाषाओं में रियल-टाइम ऑटो-अनुवाद ताकि अनजान हाईवे पर समस्या समझाना कभी मुश्किल न हो।',
      statsTitle: 'जब हर मिनट कीमती हो, तब भरोसेमंद सेवा',
      stats: [
        { value: '18 मिनट', label: 'औसत शहरी पहुंच समय', context: '28 शहरों और एक्सप्रेसवे ज़ोन में' },
        { value: '100%', label: 'पहले से तय कीमत', context: 'मैकेनिक के निकलने से पहले कोई छिपा शुल्क नहीं' },
        { value: '14,200+', label: 'वेरिफाइड मैकेनिक', context: 'RC-चेक्ड टो ट्रक और स्किल-वेरिफाइड गैरेज' },
        { value: '99.2%', label: 'प्राइस-लॉक भरोसा', context: 'अतिरिक्त पार्ट्स के लिए फोटो व मंजूरी अनिवार्य' },
      ],
      providerCtaTitle: 'क्या आपका गैरेज, मोबाइल वैन या टो ट्रक है?',
      providerCtaSubtitle:
        'अपने इलाके के वेरिफाइड ब्रेकडाउन जॉब पाएं, तुरंत UPI पेमेंट के साथ।',
      providerCtaBtn: 'प्रोवाइडर डैशबोर्ड खोलें',
      faqTitle: 'अक्सर पूछे जाने वाले सवाल',
      faqs: [
        {
          q: 'क्या मदद मांगने के लिए ऐप इंस्टॉल या लॉगिन करना होगा?',
          a: 'नहीं। आप बिना किसी ऐप या अकाउंट के सीधे मोबाइल ब्राउज़र से मदद बुला सकते हैं।',
        },
        {
          q: 'क्या मैकेनिक आने के बाद कीमत बढ़ा सकता है?',
          a: 'केवल अगर कोई अतिरिक्त खराबी मिले और वह फोटो के साथ प्राइस अपडेट भेजे। आप एक टैप में मंजूर या मना कर सकते हैं।',
        },
        {
          q: 'अगर हाईवे पर मोबाइल इंटरनेट बंद हो जाए तो?',
          a: '"SMS से मदद मांगें" पर टैप करें—यह आपके GPS और खराबी का छोटा SMS तैयार कर देता है।',
        },
        {
          q: 'अगर रिपेयर की जगह टो ट्रक चाहिए तो क्या फिर से जानकारी भरनी होगी?',
          a: 'बिल्कुल नहीं। एक टैप में आपकी लोकेशन और वाहन विवरण सीधे सही टो ट्रक के लिए भर जाते हैं।',
        },
      ],
    },
    request: {
      title: 'रोडसाइड मदद का अनुरोध करें',
      subtitle: 'साइन-अप की ज़रूरत नहीं · 60 सेकंड से कम में',
      stepLocation: '1. ब्रेकडाउन की जगह पक्की करें',
      dragPinHint: 'सही जगह सेट करने के लिए मैप पिन को खींचें या टैप करें।',
      addressLabel: 'हाईवे / सड़क का लैंडमार्क',
      stepVehicle: '2. वाहन का प्रकार चुनें',
      regLabel: 'वाहन नंबर (वैकल्पिक)',
      regPlaceholder: 'जैसे KA 05 MN 4821',
      stepFault: '3. क्या खराबी हुई है?',
      stepMedia: '4. फोटो या वॉइस नोट जोड़ें (वैकल्पिक)',
      addPhoto: 'खराबी की फोटो अपलोड करें',
      useSamplePhoto: 'सैंपल टायर फोटो जोड़ें',
      recordVoice: 'वॉइस नोट रिकॉर्ड करें',
      stopVoice: 'रिकॉर्डिंग रोकें',
      voiceRecorded: 'वॉइस नोट जुड़ा हुआ है',
      notesPlaceholder: 'आवाज़, चेतावनी लाइट या आस-पास की पहचान लिखें…',
      preferredLang: 'चैट की भाषा',
      submitBtn: 'अभी तय कीमतें देखें',
      offlineToggle: 'धीमा / ऑफलाइन नेटवर्क जांचें',
      offlineBanner: 'नेटवर्क कमजोर है। आप सामान्य SMS से भी मदद बुला सकते हैं।',
      requestBySms: 'SMS से मदद मांगें',
    },
    quotes: {
      title: 'आपके पास तय कीमत वाले मैकेनिक',
      subtitle: 'मैकेनिक के निकलने से पहले कीमत पक्की होती है।',
      sortByPrice: 'सबसे कम कीमत',
      sortByEta: 'सबसे तेज़ पहुंच',
      filterVerified: 'केवल वेरिफाइड',
      filterSpeaksLang: 'मेरी भाषा बोलने वाले',
      acceptBtn: 'तय कीमत स्वीकार करें',
      fixedPriceLabel: 'तय कुल शुल्क',
      verifiedBadge: 'वेरिफाइड',
      speaksLabel: 'भाषाएं',
      noQuotesTitle: 'इन फ़िल्टर से कोई मैकेनिक नहीं मिला',
      noQuotesDesc: '15 किमी के भीतर सभी वेरिफाइड मैकेनिक देखने के लिए फ़िल्टर हटाएं।',
      resetFilters: 'सभी कोट दिखाएं',
      simulateError: 'नेटवर्क त्रुटि जांचें',
      errorTitle: 'लाइव कोट लोड नहीं हो सके',
      retryBtn: 'पुनः प्रयास करें',
    },
    liveJob: {
      title: 'मदद रास्ते में है',
      etaBanner: 'मैकेनिक रवाना · कीमत लॉक है',
      arrivingIn: 'पहुंचने में समय',
      timelineLabels: ['स्वीकृत', 'रास्ते में', 'पहुंच गए', 'रिपेयर जारी', 'पूरा हुआ'],
      chatTitle: 'अनुवादित चैट',
      autoTranslated: 'ऑटो-अनुवादित',
      showOriginal: 'मूल संदेश देखें',
      hideOriginal: 'अनुवाद देखें',
      chatPlaceholder: 'मैकेनिक को लिखें या बोलें…',
      sendBtn: 'भेजें',
      callBtn: 'कॉल',
      shareLocation: 'लाइव लिंक भेजें',
      sosBtn: 'SOS',
      needTowBtn: 'टो ट्रक बदलें (1-क्लिक)',
      proceedPayBtn: 'काम पूरा · भुगतान करें',
      simulateRevisionBtn: 'डेमो: कीमत अपडेट अनुरोध',
      advanceStepBtn: 'डेमो: अगला चरण',
    },
    priceModal: {
      title: 'मैकेनिक ने कीमत अपडेट भेजी है',
      subtitle: 'तभी मंजूर करें जब आप फोटो और अतिरिक्त काम से सहमत हों।',
      oldPrice: 'पुरानी तय कीमत',
      newPrice: 'नया कुल शुल्क',
      reasonLabel: 'मैकेनिक का कारण',
      photoLabel: 'मौके की जांच फोटो',
      approveBtn: 'मंजूर करें ₹',
      declineBtn: 'मना करें व पुरानी दर रखें',
    },
    tow: {
      title: 'रिकवरी टो कन्फर्म करें',
      subtitle: 'वाहन और लोकेशन विवरण पहले से भरे हुए हैं।',
      autoSelected: 'आपके वाहन के लिए ऑटो-चयनित',
      towClasses: {
        bike_carrier: { title: 'एन्क्लोज़्ड बाइक कैरियर', desc: 'दोपहिया वाहनों के लिए सुरक्षित रैंप और स्ट्रैप' },
        flatbed: { title: 'हाइड्रोलिक फ्लैटबेड टो', desc: 'कारों और SUV के लिए बिना घसीटे फ्लैटबेड' },
        heavy_wrecker: { title: 'हेवी-ड्यूटी अंडरलिफ्ट रेकर', desc: 'ट्रक व बसों के लिए 40T तक एक्सल-लिफ्ट टोइंग' },
      },
      prefilledTitle: 'पहले से भरा ब्रेकडाउन विवरण',
      destinationLabel: 'ड्रॉप-ऑफ वर्कशॉप या पता चुनें',
      quickDestinations: [
        'बॉश कार सर्विस — HSR लेआउट (6.4 किमी)',
        'अधिकृत डीलरशिप — सिल्क बोर्ड (9.1 किमी)',
        'घर / फ्लीट यार्ड — कोरमंगला (11.5 किमी)',
      ],
      priceBreakdown: 'तय टो कीमत विवरण',
      confirmTowBtn: 'तय टो कन्फर्म करें',
    },
    payment: {
      title: 'बिल और भुगतान',
      subtitle: 'रिपेयर जांचने के बाद सुरक्षित भुगतान करें।',
      itemisedTitle: 'विस्तृत बिल',
      baseCallout: 'रोडसाइड विज़िट और जांच',
      repairOrTow: 'रिपेयर / टो सेवा',
      approvedParts: 'मंजूर किया गया पार्ट / वाल्व',
      gst: 'GST (18%)',
      totalPayable: 'कुल देय राशि',
      methodTitle: 'भुगतान का तरीका चुनें',
      methods: { upi: 'UPI (GPay / PhonePe / QR)', card: 'डेबिट / क्रेडिट कार्ड', cash: 'मैकेनिक को नकद' },
      payNowBtn: 'भुगतान करें',
      paidConfirmed: 'भुगतान सफल रहा',
      downloadReceipt: 'PDF रसीद डाउनलोड करें',
      rateTitle: 'मैकेनिक को रेटिंग दें',
      submitRating: 'रेटिंग भेजें',
      backHome: 'RoadAid होम पर लौटें',
    },
    faults: {
      flat_tyre: 'टायर पंक्चर',
      dead_battery: 'बैटरी डेड',
      engine_wont_start: 'इंजन स्टार्ट नहीं',
      out_of_fuel: 'ईंधन खत्म',
      clutch_gear: 'क्लच / गियर',
      overheating: 'इंजन गरम होना',
      key_locked: 'चाबी अंदर लॉक',
      accident_tow: 'टो ट्रक चाहिए',
    },
    common: {
      bike: 'बाइक',
      car: 'कार',
      truck: 'ट्रक',
      bus: 'बस',
      voiceInput: 'आवाज़',
      listening: 'सुन रहा है…',
      min: 'मिनट',
      km: 'किमी',
      jobs: 'जॉब्स',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड',
    },
  },
  kn: {
    nav: {
      getHelp: 'ಸಹಾಯ ಪಡೆಯಿರಿ',
      pricing: 'ದರ ಮತ್ತು ವ್ಯಾಪ್ತಿ',
      helpCentre: 'ಸಹಾಯ ಕೇಂದ್ರ',
      dashboards: 'ಪೋರ್ಟಲ್‌ಗಳು',
      previewStudio: 'ವಿನ್ಯಾಸ ಮತ್ತು ಭಾಷೆಗಳು',
      getHelpNow: 'ಈಗಲೇ ಸಹಾಯ ಪಡೆಯಿರಿ',
      driverAccount: 'ಚಾಲಕ ಖಾತೆ',
      providerDash: 'ಮೆಕ್ಯಾನಿಕ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      fleetDash: 'ಫ್ಲೀಟ್ ಮಾಲೀಕ',
      adminDash: 'ನಿರ್ವಾಹಕ ಪ್ಯಾನೆಲ್',
    },
    landing: {
      heroEyebrow: 'ಯಾವುದೇ ಆ್ಯಪ್ ಬೇಡ · ಮೊಬೈಲ್ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ನೇರವಾಗಿ · 24/7 ಸೇವೆ',
      heroTitle: 'ಯಾವುದೇ ವಾಹನಕ್ಕೂ ರಸ್ತೆಬದಿಯ ನೆರವು, ಹೊರಡುವ ಮುನ್ನವೇ ನಿಗದಿತ ದರ.',
      heroSubtitle:
        'ಬೈಕ್, ಕಾರು, ಟ್ರಕ್ ಅಥವಾ ಬಸ್ ಮಧ್ಯದಲ್ಲಿ ಕೆಟ್ಟು ನಿಂತಿದೆಯೇ? 60 ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ ಸ್ಥಳ ಪಿನ್ ಮಾಡಿ, ನಿಗದಿತ ದರ ನೋಡಿ, ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ ಅಥವಾ ಒಂದೇ ಟ್ಯಾಪ್‌ನಲ್ಲಿ ಟೋ ಟ್ರಕ್ ಕರೆಸಿ.',
      locationPlaceholder: 'ಹೆದ್ದಾರಿ, ಲ್ಯಾಂಡ್‌ಮಾರ್ಕ್ ಅಥವಾ GPS ಸ್ಥಳ ನಮೂದಿಸಿ…',
      detectLocation: 'GPS ಬಳಸಿ',
      getHelpBtn: 'ಈಗಲೇ ಸಹಾಯ ಪಡೆಯಿರಿ',
      noAppNote: 'ಮೊದಲ ಸೇವೆಗೆ ಸೈನ್-ಅಪ್ ಬೇಕಿಲ್ಲ. ನೆಟ್‌ವರ್ಕ್ ಇಲ್ಲವೇ? SMS ಮೂಲಕ ಕರೆಸಿ.',
      howItWorksTitle: 'ರಸ್ತೆಯಲ್ಲಿ RoadAid ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
      steps: [
        { title: '01. ವಿನಂತಿಸಿ', desc: 'ಸ್ಥಳವನ್ನು ಪಿನ್ ಮಾಡಿ, ವಾಹನ ಮತ್ತು ದೋಷ ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಧ್ವನಿ ಸಂದೇಶ ನೀಡಿ.' },
        { title: '02. ನಿಗದಿತ ದರ ನೋಡಿ', desc: 'ದೂರ, ತಲುಪುವ ಸಮಯ ಮತ್ತು ಪರಿಶೀಲಿಸಿದ ಬ್ಯಾಡ್ಜ್‌ಗಳೊಂದಿಗೆ ದರ ಹೋಲಿಸಿ.' },
        { title: '03. ಲೈವ್ ಟ್ರ್ಯಾಕ್ ಮತ್ತು ಚಾಟ್', desc: 'ಮೆಕ್ಯಾನಿಕ್ ಬರುವುದನ್ನು ಲೈವ್ ಆಗಿ ನೋಡಿ ಮತ್ತು ಅನುವಾದಿತ ಚಾಟ್ ಮಾಡಿ.' },
        { title: '04. ಪಾವತಿಸಿ', desc: 'ಫೋಟೋ ಪುರಾವೆಯೊಂದಿಗೆ ಬಿಡಿಭಾಗ ಒಪ್ಪಿಕೊಳ್ಳಿ. UPI, ಕಾರ್ಡ್ ಅಥವಾ ನಗದು ನೀಡಿ.' },
      ],
      vehiclesTitle: 'ರಸ್ತೆಯಲ್ಲಿರುವ ಪ್ರತಿಯೊಂದು ವಾಹನಕ್ಕೂ ಸೇವೆ',
      vehiclesSubtitle: 'ತಕ್ಷಣ ಬ್ರೇಕ್‌ಡೌನ್ ಸಹಾಯ ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ವಾಹನವನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ.',
      vehicleCards: {
        bike: { name: 'ದ್ವಿಚಕ್ರ ವಾಹನಗಳು', desc: 'ಪಂಕ್ಚರ್, ಬ್ಯಾಟರಿ, ಚೈನ್, ಕೀ ಮತ್ತು ಬೈಕ್ ಕ್ಯಾರಿಯರ್ ಟೋ', priceFrom: '₹249 ರಿಂದ' },
        car: { name: 'ಕಾರು ಮತ್ತು SUV', desc: 'ಜಂಪ್‌ಸ್ಟಾರ್ಟ್, ಟೈರ್ ಬದಲಾವಣೆ, ಓವರ್‌ಹೀಟ್ ಮತ್ತು ಫ್ಲಾಟ್‌ಬೆಡ್ ಟೋ', priceFrom: '₹499 ರಿಂದ' },
        truck: { name: 'ಟ್ರಕ್ ಮತ್ತು LCV', desc: 'ಏರ್-ಬ್ರೇಕ್, ಹಬ್, ಡೀಸೆಲ್ ಬ್ಲೀಡ್ ಮತ್ತು ಅಂಡರ್‌ಲಿಫ್ಟ್', priceFrom: '₹1,499 ರಿಂದ' },
        bus: { name: 'ಬಸ್ ಮತ್ತು ಕೋಚ್', desc: '24T+ ಹೆದ್ದಾರಿ ರೆಕರ್, ಆಕ್ಸಲ್ ಮತ್ತು ಫ್ಲೀಟ್ ಆದ್ಯತೆ', priceFrom: '₹2,499 ರಿಂದ' },
      },
      heavyTitle: 'ಹೆದ್ದಾರಿಗಳಿಗಾಗಿ ಭಾರೀ ವಾಹನ ರಿಕವರಿ',
      heavySubtitle:
        'ವಾಣಿಜ್ಯ ಟ್ರಕ್‌ಗಳು ಮತ್ತು ಬಸ್‌ಗಳು ಗಂಟೆಗಟ್ಟಲೆ ಕಾಯಲು ಸಾಧ್ಯವಿಲ್ಲ. RoadAid ಪ್ರಮಾಣೀಕೃತ ಏರ್-ಬ್ರೇಕ್ ತಂತ್ರಜ್ಞರು ಮತ್ತು 24T–40T ಅಂಡರ್‌ಲಿಫ್ಟ್ ರೆಕರ್‌ಗಳನ್ನು ನೇರವಾಗಿ ಹೆದ್ದಾರಿಗಳಿಗೆ ಕಳುಹಿಸುತ್ತದೆ.',
      heavyBullets: [
        '40 ಟನ್‌ವರೆಗೆ ಸುರಕ್ಷಿತ ಅಂಡರ್‌ಲಿಫ್ಟ್ ಮತ್ತು ಹೆವಿ ವಿಂಚ್ ರಿಕವರಿ',
        'GST ಬಿಲ್ಲಿಂಗ್‌ನೊಂದಿಗೆ ಮುಂಚಿತವಾಗಿ ನಿಗದಿತ ಫ್ಲೀಟ್ ದರಗಳು',
        'NHAI ಹೆದ್ದಾರಿ ಪೆಟ್ರೋಲ್ ಮತ್ತು ಫ್ಲೀಟ್ ಮ್ಯಾನೇಜರ್‌ಗಳೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ',
      ],
      heavyCta: 'ಹೆವಿ ರಿಕವರಿ ಕರೆಸಿ',
      languagesTitle: 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ. ಮೆಕ್ಯಾನಿಕ್ ಅವರ ಭಾಷೆಯಲ್ಲಿ ಓದುತ್ತಾರೆ.',
      languagesSubtitle:
        'ಪ್ರಾದೇಶಿಕ ಲಿಪಿಗಳಲ್ಲಿ ನೇರ ದ್ವಿಮುಖ ಅನುವಾದ—ಅಪರಿಚಿತ ಹೆದ್ದಾರಿಯಲ್ಲಿ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸುವುದು ಈಗ ಸುಲಭ.',
      statsTitle: 'ಪ್ರತಿ ನಿಮಿಷವೂ ಮುಖ್ಯವಾದಾಗ ನಂಬಿಕಸ್ತ ಸೇವೆ',
      stats: [
        { value: '18 ನಿಮಿಷ', label: 'ನಗರ ತಲುಪುವ ಸರಾಸರಿ ಸಮಯ', context: '28 ನಗರ ಮತ್ತು ಎಕ್ಸ್‌ಪ್ರೆಸ್‌ವೇ ವಲಯಗಳಲ್ಲಿ' },
        { value: '100%', label: 'ಮುಂಚಿತ ನಿಗದಿತ ದರ', context: 'ಹೊರಡುವ ಮುನ್ನ ಯಾವುದೇ ಗುಪ್ತ ಶುಲ್ಕವಿಲ್ಲ' },
        { value: '14,200+', label: 'ಪರಿಶೀಲಿಸಿದ ತಂತ್ರಜ್ಞರು', context: 'RC-ಪರಿಶೀಲಿತ ಟೋ ಟ್ರಕ್ ಮತ್ತು ಗ್ಯಾರೇಜ್‌ಗಳು' },
        { value: '99.2%', label: 'ದರ ಬದ್ಧತೆ', context: 'ಹೆಚ್ಚುವರಿ ಭಾಗಗಳಿಗೆ ಫೋಟೋ ಮತ್ತು ನಿಮ್ಮ ಒಪ್ಪಿಗೆ ಕಡ್ಡಾಯ' },
      ],
      providerCtaTitle: 'ನೀವು ಗ್ಯಾರೇಜ್, ಮೊಬೈಲ್ ವ್ಯಾನ್ ಅಥವಾ ಟೋ ಟ್ರಕ್ ಹೊಂದಿದ್ದೀರಾ?',
      providerCtaSubtitle:
        'ನಿಮ್ಮ ಮಾರ್ಗದ ಹತ್ತಿರದ ಬ್ರೇಕ್‌ಡೌನ್ ಕೆಲಸಗಳನ್ನು ಪಡೆಯಿರಿ, ತಕ್ಷಣ UPI ಪಾವತಿಯೊಂದಿಗೆ.',
      providerCtaBtn: 'ಪ್ರೊವೈಡರ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ',
      faqTitle: 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
      faqs: [
        {
          q: 'ಮೊದಲು ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಅಥವಾ ಖಾತೆ ತೆರೆಯಬೇಕೇ?',
          a: 'ಬೇಡ. ನಿಮ್ಮ ಮೊದಲ ಸಹಾಯ ವಿನಂತಿಯು ನೇರವಾಗಿ ಮೊಬೈಲ್ ಬ್ರೌಸರ್‌ನಲ್ಲಿಯೇ ಖಾತೆ ಇಲ್ಲದೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ.',
        },
        {
          q: 'ಮೆಕ್ಯಾನಿಕ್ ಬಂದ ನಂತರ ದರವನ್ನು ಬದಲಾಯಿಸಬಹುದೇ?',
          a: 'ಹೆಚ್ಚುವರಿ ದೋಷ ಕಂಡುಬಂದು ಅವರು ಫೋಟೋ ಸಹಿತ ದರ ಪರಿಷ್ಕರಣೆ ಕಳುಹಿಸಿದರೆ ಮಾತ್ರ. ನೀವು ಒಂದೇ ಟ್ಯಾಪ್‌ನಲ್ಲಿ ಒಪ್ಪಬಹುದು ಅಥವಾ ನಿರಾಕರಿಸಬಹುದು.',
        },
        {
          q: 'ಹೆದ್ದಾರಿಯಲ್ಲಿ ಮೊಬೈಲ್ ಇಂಟರ್ನೆಟ್ ನಿಂತುಹೋದರೆ ಏನು ಮಾಡುವುದು?',
          a: '"SMS ಮೂಲಕ ವಿನಂತಿಸಿ" ಟ್ಯಾಪ್ ಮಾಡಿ—ನಿಮ್ಮ GPS ಮತ್ತು ವಾಹನದ ವಿವರಗಳೊಂದಿಗೆ ಸಿದ್ಧ SMS ಕಳುಹಿಸಬಹುದು.',
        },
        {
          q: 'ದುರಸ್ತಿ ಬದಲು ಟೋ ಟ್ರಕ್ ಬೇಕಾದರೆ ವಿವರಗಳನ್ನು ಮತ್ತೆ ನಮೂದಿಸಬೇಕೇ?',
          a: 'ಇಲ್ಲ. ಒಂದೇ ಟ್ಯಾಪ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಸ್ಥಳ ಮತ್ತು ವಾಹನದ ಮಾಹಿತಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸೂಕ್ತ ಟೋ ಟ್ರಕ್‌ಗೆ ವರ್ಗಾವಣೆಯಾಗುತ್ತದೆ.',
        },
      ],
    },
    request: {
      title: 'ರಸ್ತೆಬದಿ ಸಹಾಯ ವಿನಂತಿಸಿ',
      subtitle: 'ಸೈನ್-ಅಪ್ ಅಗತ್ಯವಿಲ್ಲ · 60 ಸೆಕೆಂಡ್‌ಗಳಿಗಿಂತ ಕಡಿಮೆ',
      stepLocation: '1. ವಾಹನ ನಿಂತ ಸ್ಥಳವನ್ನು ದೃಢೀಕರಿಸಿ',
      dragPinHint: 'ಸರಿಯಾದ ಸ್ಥಳವನ್ನು ಗುರುತಿಸಲು ನಕ್ಷೆಯ ಪಿನ್ ಎಳೆಯಿರಿ ಅಥವಾ ಟ್ಯಾಪ್ ಮಾಡಿ.',
      addressLabel: 'ಹೆದ್ದಾರಿ / ರಸ್ತೆ ಗುರುತು',
      stepVehicle: '2. ವಾಹನದ ವಿಧವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      regLabel: 'ವಾಹನ ಸಂಖ್ಯೆ (ಐಚ್ಛಿಕ)',
      regPlaceholder: 'ಉದಾ. KA 05 MN 4821',
      stepFault: '3. ಏನು ಸಮಸ್ಯೆ ಆಗಿದೆ?',
      stepMedia: '4. ಫೋಟೋ ಅಥವಾ ಧ್ವನಿ ಟಿಪ್ಪಣಿ (ಐಚ್ಛಿಕ)',
      addPhoto: 'ದೋಷದ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      useSamplePhoto: 'ಮಾದರಿ ಟೈರ್ ಫೋಟೋ ಲಗತ್ತಿಸಿ',
      recordVoice: 'ಧ್ವನಿ ಟಿಪ್ಪಣಿ ರೆಕಾರ್ಡ್ ಮಾಡಿ',
      stopVoice: 'ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ',
      voiceRecorded: 'ಧ್ವನಿ ಟಿಪ್ಪಣಿ ಲಗತ್ತಿಸಲಾಗಿದೆ',
      notesPlaceholder: 'ಶಬ್ದ, ವಾರ್ನಿಂಗ್ ಲೈಟ್ ಅಥವಾ ಹತ್ತಿರದ ಗುರುತು ಬರೆಯಿರಿ…',
      preferredLang: 'ಚಾಟ್ ಭಾಷೆ',
      submitBtn: 'ನಿಗದಿತ ದರಗಳನ್ನು ನೋಡಿ',
      offlineToggle: 'ನಿಧಾನ / ಆಫ್‌ಲೈನ್ ನೆಟ್‌ವರ್ಕ್ ಪರೀಕ್ಷಿಸಿ',
      offlineBanner: 'ಸಿಗ್ನಲ್ ದುರ್ಬಲವಾಗಿದೆ. ನೀವು ಸಾಮಾನ್ಯ SMS ಮೂಲಕವೂ ಸಹಾಯ ಕರೆಸಬಹುದು.',
      requestBySms: 'SMS ಮೂಲಕ ವಿನಂತಿಸಿ',
    },
    quotes: {
      title: 'ನಿಮ್ಮ ಹತ್ತಿರದ ನಿಗದಿತ ದರಗಳು',
      subtitle: 'ಮೆಕ್ಯಾನಿಕ್ ಹೊರಡುವ ಮುನ್ನವೇ ದರ ಲಾಕ್ ಆಗಿರುತ್ತದೆ.',
      sortByPrice: 'ಕಡಿಮೆ ದರ',
      sortByEta: 'ವೇಗದ ಆಗಮನ',
      filterVerified: 'ಪರಿಶೀಲಿಸಿದವರು ಮಾತ್ರ',
      filterSpeaksLang: 'ನನ್ನ ಭಾಷೆ ಮಾತನಾಡುವವರು',
      acceptBtn: 'ನಿಗದಿತ ದರ ಒಪ್ಪಿಕೊಳ್ಳಿ',
      fixedPriceLabel: 'ನಿಗದಿತ ಒಟ್ಟು ದರ',
      verifiedBadge: 'ಪರಿಶೀಲಿತ',
      speaksLabel: 'ಭಾಷೆಗಳು',
      noQuotesTitle: 'ಈ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ಮೆಕ್ಯಾನಿಕ್ ಕಂಡುಬಂದಿಲ್ಲ',
      noQuotesDesc: '15 ಕಿಮೀ ಒಳಗಿನ ಎಲ್ಲಾ ಮೆಕ್ಯಾನಿಕ್‌ಗಳನ್ನು ನೋಡಲು ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ.',
      resetFilters: 'ಎಲ್ಲಾ ದರಗಳನ್ನು ತೋರಿಸಿ',
      simulateError: 'ನೆಟ್‌ವರ್ಕ್ ದೋಷ ಪರೀಕ್ಷಿಸಿ',
      errorTitle: 'ಲೈವ್ ದರಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ',
      retryBtn: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    },
    liveJob: {
      title: 'ಸಹಾಯ ದಾರಿಯಲ್ಲಿದೆ',
      etaBanner: 'ಮೆಕ್ಯಾನಿಕ್ ಹೊರಟಿದ್ದಾರೆ · ದರ ನಿಗದಿಯಾಗಿದೆ',
      arrivingIn: 'ತಲುಪುವ ಸಮಯ',
      timelineLabels: ['ಒಪ್ಪಲಾಗಿದೆ', 'ದಾರಿಯಲ್ಲಿ', 'ತಲುಪಿದ್ದಾರೆ', 'ದುರಸ್ತಿ', 'ಪೂರ್ಣ'],
      chatTitle: 'ಅನುವಾದಿತ ಚಾಟ್',
      autoTranslated: 'ಸ್ವಯಂ-ಅನುವಾದಿತ',
      showOriginal: 'ಮೂಲ ಪಠ್ಯ ನೋಡಿ',
      hideOriginal: 'ಅನುವಾದ ನೋಡಿ',
      chatPlaceholder: 'ಮೆಕ್ಯಾನಿಕ್‌ಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ…',
      sendBtn: 'ಕಳುಹಿಸಿ',
      callBtn: 'ಕರೆ',
      shareLocation: 'ಲೈವ್ ಲಿಂಕ್ ಹಂಚಿ',
      sosBtn: 'SOS',
      needTowBtn: 'ಟೋ ಟ್ರಕ್ ಬದಲಾಯಿಸಿ (1-ಕ್ಲಿಕ್)',
      proceedPayBtn: 'ಮುಕ್ತಾಯ · ಪಾವತಿಸಿ',
      simulateRevisionBtn: 'ಡೆಮೊ: ದರ ಪರಿಷ್ಕರಣೆ',
      advanceStepBtn: 'ಡೆಮೊ: ಮುಂದಿನ ಹಂತ',
    },
    priceModal: {
      title: 'ಮೆಕ್ಯಾನಿಕ್ ದರ ಪರಿಷ್ಕರಣೆ ಕೇಳಿದ್ದಾರೆ',
      subtitle: 'ತಪಾಸಣಾ ಫೋಟೋ ಮತ್ತು ಹೆಚ್ಚುವರಿ ಕೆಲಸಕ್ಕೆ ಒಪ್ಪಿಗೆ ಇದ್ದರೆ ಮಾತ್ರ ಅನುಮೋದಿಸಿ.',
      oldPrice: 'ಹಿಂದಿನ ನಿಗದಿತ ದರ',
      newPrice: 'ಹೊಸ ಒಟ್ಟು ದರ',
      reasonLabel: 'ಮೆಕ್ಯಾನಿಕ್ ವಿವರಣೆ',
      photoLabel: 'ಸ್ಥಳದ ತಪಾಸಣಾ ಫೋಟೋ',
      approveBtn: 'ಅನುಮೋದಿಸಿ ₹',
      declineBtn: 'ನಿರಾಕರಿಸಿ, ಹಳೆಯ ದರ ಉಳಿಸಿ',
    },
    tow: {
      title: 'ರಿಕವರಿ ಟೋ ದೃಢೀಕರಿಸಿ',
      subtitle: 'ವಾಹನ ಮತ್ತು ಸ್ಥಳದ ವಿವರಗಳು ಸಕ್ರಿಯ ಕೆಲಸದಿಂದ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ತುಂಬಿವೆ.',
      autoSelected: 'ನಿಮ್ಮ ವಾಹನಕ್ಕೆ ಸ್ವಯಂ-ಆಯ್ಕೆ',
      towClasses: {
        bike_carrier: { title: 'ಮುಚ್ಚಿದ ಬೈಕ್ ಕ್ಯಾರಿಯರ್', desc: 'ದ್ವಿಚಕ್ರ ವಾಹನಗಳಿಗೆ ಸುರಕ್ಷಿತ ರ‍್ಯಾಂಪ್ ಮತ್ತು ಸ್ಟ್ರ್ಯಾಪ್' },
        flatbed: { title: 'ಹೈಡ್ರಾಲಿಕ್ ಫ್ಲಾಟ್‌ಬೆಡ್ ಟೋ', desc: 'ಕಾರು ಮತ್ತು SUV ಗಳಿಗೆ ಸುರಕ್ಷಿತ ಫ್ಲಾಟ್‌ಬೆಡ್' },
        heavy_wrecker: { title: 'ಹೆವಿ-ಡ್ಯೂಟಿ ಅಂಡರ್‌ಲಿಫ್ಟ್ ರೆಕರ್', desc: 'ಟ್ರಕ್ ಮತ್ತು ಬಸ್‌ಗಳಿಗೆ 40T ವರೆಗೆ ಆಕ್ಸಲ್-ಲಿಫ್ಟ್ ಟೋಯಿಂಗ್' },
      },
      prefilledTitle: 'ತುಂಬಿದ ಬ್ರೇಕ್‌ಡೌನ್ ವಿವರಗಳು',
      destinationLabel: 'ತಲುಪಬೇಕಾದ ಗ್ಯಾರೇಜ್ ಅಥವಾ ಸ್ಥಳ',
      quickDestinations: [
        'ಬಾಷ್ ಕಾರ್ ಸರ್ವಿಸ್ — HSR ಲೇಔಟ್ (6.4 ಕಿಮೀ)',
        'ಅಧಿಕೃತ ಡೀಲರ್‌ಶಿಪ್ — ಸಿಲ್ಕ್ ಬೋರ್ಡ್ (9.1 ಕಿಮೀ)',
        'ಮನೆ / ಫ್ಲೀಟ್ ಯಾರ್ಡ್ — ಕೋರಮಂಗಲ (11.5 ಕಿಮೀ)',
      ],
      priceBreakdown: 'ನಿಗದಿತ ಟೋ ದರ ವಿವರ',
      confirmTowBtn: 'ನಿಗದಿತ ಟೋ ದೃಢೀಕರಿಸಿ',
    },
    payment: {
      title: 'ಬಿಲ್ ಮತ್ತು ಪಾವತಿ',
      subtitle: 'ದುರಸ್ತಿ ಪರಿಶೀಲಿಸಿದ ನಂತರ ಸುರಕ್ಷಿತವಾಗಿ ಪಾವತಿಸಿ.',
      itemisedTitle: 'ವಿವರವಾದ ರಸೀದಿ',
      baseCallout: 'ರಸ್ತೆಬದಿ ಭೇಟಿ ಮತ್ತು ತಪಾಸಣೆ',
      repairOrTow: 'ದುರಸ್ತಿ / ಟೋ ಸೇವೆ',
      approvedParts: 'ಅನುಮೋದಿತ ಬಿಡಿಭಾಗ / ವಾಲ್ವ್',
      gst: 'GST (18%)',
      totalPayable: 'ಒಟ್ಟು ಪಾವತಿ ಮೊತ್ತ',
      methodTitle: 'ಪಾವತಿ ವಿಧಾನ ಆಯ್ಕೆಮಾಡಿ',
      methods: { upi: 'UPI (GPay / PhonePe / QR)', card: 'ಡೆಬಿಟ್ / ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್', cash: 'ಮೆಕ್ಯಾನಿಕ್‌ಗೆ ನಗದು' },
      payNowBtn: 'ಪಾವತಿಸಿ',
      paidConfirmed: 'ಪಾವತಿ ದೃಢೀಕೃತವಾಗಿದೆ',
      downloadReceipt: 'PDF ರಸೀದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
      rateTitle: 'ನಿಮ್ಮ ಮೆಕ್ಯಾನಿಕ್‌ಗೆ ರೇಟಿಂಗ್ ನೀಡಿ',
      submitRating: 'ರೇಟಿಂಗ್ ಸಲ್ಲಿಸಿ',
      backHome: 'RoadAid ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    },
    faults: {
      flat_tyre: 'ಟೈರ್ ಪಂಕ್ಚರ್',
      dead_battery: 'ಬ್ಯಾಟರಿ ಡೌನ್',
      engine_wont_start: 'ಎಂಜಿನ್ ಸ್ಟಾರ್ಟ್ ಆಗಲ್ಲ',
      out_of_fuel: 'ಇಂಧನ ಖಾಲಿ',
      clutch_gear: 'ಕ್ಲಚ್ / ಗೇರ್',
      overheating: 'ಎಂಜಿನ್ ಬಿಸಿ',
      key_locked: 'ಕೀ ಒಳಗೆ ಲಾಕ್',
      accident_tow: 'ಟೋ ಟ್ರಕ್ ಬೇಕು',
    },
    common: {
      bike: 'ಬೈಕ್',
      car: 'ಕಾರು',
      truck: 'ಟ್ರಕ್',
      bus: 'ಬಸ್',
      voiceInput: 'ಧ್ವನಿ',
      listening: 'ಕೇಳುತ್ತಿದೆ…',
      min: 'ನಿಮಿಷ',
      km: 'ಕಿಮೀ',
      jobs: 'ಕೆಲಸಗಳು',
      darkMode: 'ಡಾರ್ಕ್ ಮೋಡ್',
      lightMode: 'ಲೈಟ್ ಮೋಡ್',
    },
  },
};
