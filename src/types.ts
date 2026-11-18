export type Language = 'en' | 'hi' | 'kn';

export type VehicleType = 'bike' | 'car' | 'truck' | 'bus';

export type FaultType =
  | 'flat_tyre'
  | 'dead_battery'
  | 'engine_wont_start'
  | 'out_of_fuel'
  | 'clutch_gear'
  | 'overheating'
  | 'key_locked'
  | 'accident_tow';

export type PageRoute =
  | 'landing'
  | 'request'
  | 'quotes'
  | 'live-job'
  | 'tow-request'
  | 'payment'
  | 'pricing'
  | 'help'
  | 'driver-account'
  | 'provider-dashboard'
  | 'fleet-dashboard'
  | 'admin-dashboard'
  | 'preview-studio';

export type JobStep = 'accepted' | 'on_the_way' | 'arrived' | 'repairing' | 'done';

export interface LocationPin {
  lat: number;
  lng: number;
  address: string;
  landmark: string;
  city: string;
}

export interface BreakdownRequest {
  id: string;
  vehicleType: VehicleType;
  vehicleLabel: string;
  registrationNumber: string;
  fault: FaultType;
  location: LocationPin;
  notes: string;
  voiceNoteDurationSec: number | null;
  voiceTranscript: string | null;
  photoUrl: string | null;
  language: Language;
  createdAt: string;
}

export interface ProviderQuote {
  id: string;
  providerName: string;
  mechanicName: string;
  avatarUrl: string;
  rating: number;
  completedJobs: number;
  distanceKm: number;
  etaMinutes: number;
  languages: Language[];
  verified: boolean;
  vehicleCapabilities: VehicleType[];
  baseCalloutFee: number;
  serviceEstimate: number;
  totalFixedPrice: number;
  equipmentTag: string;
}

export interface ChatMessage {
  id: string;
  sender: 'driver' | 'mechanic' | 'system';
  textTranslated: string;
  textOriginal: string;
  originalLanguage: Language;
  timestamp: string;
}

export interface PriceRevision {
  id: string;
  oldPrice: number;
  newPrice: number;
  reason: string;
  photoUrl: string;
  status: 'pending' | 'approved' | 'declined';
}

export interface TowDetails {
  towClass: 'bike_carrier' | 'flatbed' | 'heavy_wrecker';
  destination: string;
  distanceKm: number;
  baseTowFee: number;
  perKmRate: number;
  totalTowPrice: number;
  confirmed: boolean;
}

export interface SavedVehicle {
  id: string;
  type: VehicleType;
  makeModel: string;
  registration: string;
  fuelType: string;
}

export interface JobHistoryItem {
  id: string;
  date: string;
  vehicle: string;
  fault: string;
  location: string;
  provider: string;
  amount: number;
  status: 'Completed' | 'Towed';
}

export interface RateCardItem {
  vehicleType: VehicleType;
  calloutFee: number;
  minorRepairFrom: number;
  towBaseFee: number;
  towPerKm: number;
  maxCapacityTonnes: string;
  responseTargetMin: number;
}

export interface FleetVehicle {
  id: string;
  registration: string;
  type: VehicleType;
  model: string;
  driverName: string;
  driverPhone: string;
  city: string;
  status: 'Active' | 'Breakdown' | 'In Workshop';
  activeJobId?: string;
}

export interface ProviderApplication {
  id: string;
  businessName: string;
  city: string;
  vehicleTypes: VehicleType[];
  maxTonnes: number;
  docsStatus: 'Complete' | 'Needs RC Check';
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface DisputeItem {
  id: string;
  jobId: string;
  driverName: string;
  providerName: string;
  reason: string;
  amountInvolved: number;
  status: 'Open' | 'Resolved';
}

export interface ToastMessage {
  id: string;
  title: string;
  tone: 'success' | 'info' | 'warning' | 'error';
}
