import React, { useState } from 'react';
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  Download,
  Printer,
  QrCode,
  Star,
} from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';
import {
  BreakdownRequest,
  Language,
  PriceRevision,
  ProviderQuote,
  TowDetails,
} from '../../types';

export function PaymentInvoicePage({
  language,
  requestDraft,
  selectedQuote,
  priceRevision,
  towDetails,
  onBackHome,
  onNotify,
}: {
  language: Language;
  requestDraft: BreakdownRequest;
  selectedQuote: ProviderQuote;
  priceRevision: PriceRevision | null;
  towDetails: TowDetails;
  onBackHome: () => void;
  onNotify: (msg: string) => void;
}) {
  const t = TRANSLATIONS[language];
  const pt = t.payment;

  const [method, setMethod] = useState<'upi' | 'card' | 'cash'>('upi');
  const [paid, setPaid] = useState(false);
  const [rating, setRating] = useState(5);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const baseCallout = selectedQuote.baseCalloutFee;
  const serviceFee = towDetails.confirmed ? towDetails.totalTowPrice : selectedQuote.serviceEstimate;
  const approvedExtra =
    priceRevision && priceRevision.status === 'approved'
      ? Math.max(0, priceRevision.newPrice - priceRevision.oldPrice)
      : 0;
  const subtotal = baseCallout + serviceFee + approvedExtra;
  const gst = Math.round(subtotal * 0.18);
  const totalPayable = subtotal + gst;

  const invoiceId = 'INV-RA-2026-90421';

  const handleDownloadReceipt = () => {
    const htmlReceipt = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>RoadAid Receipt ${invoiceId}</title>
<style>body{font-family:sans-serif;padding:32px;color:#0F1B2D;max-width:680px;margin:auto}h1{color:#F26B1D}table{width:100%;border-collapse:collapse;margin-top:20px}td,th{padding:10px;border-bottom:1px solid #e2e8f0;text-align:left}.right{text-align:right}</style>
</head>
<body>
<h1>RoadAid — Official GST Receipt</h1>
<p><strong>Invoice:</strong> ${invoiceId} &nbsp;|&nbsp; <strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
<p><strong>Location:</strong> ${requestDraft.location.address}</p>
<p><strong>Vehicle:</strong> ${requestDraft.vehicleType.toUpperCase()} (${requestDraft.registrationNumber || 'KA 05 MN 4821'})</p>
<p><strong>Provider:</strong> ${selectedQuote.providerName} (${selectedQuote.mechanicName})</p>
<table>
  <tr><th>Item</th><th class="right">Amount</th></tr>
  <tr><td>Roadside callout & inspection</td><td class="right">₹${baseCallout}</td></tr>
  <tr><td>${towDetails.confirmed ? `Tow dispatch (${towDetails.distanceKm} km)` : 'On-spot repair service'}</td><td class="right">₹${serviceFee}</td></tr>
  ${approvedExtra > 0 ? `<tr><td>Approved extra part / valve</td><td class="right">₹${approvedExtra}</td></tr>` : ''}
  <tr><td>GST (18%)</td><td class="right">₹${gst}</td></tr>
  <tr><th>Total Paid (${method.toUpperCase()})</th><th class="right">₹${totalPayable}</th></tr>
</table>
<p style="margin-top:24px;font-size:12px;color:#64748b">RoadAid Mobility Rescue Pvt. Ltd. · 24/7 Helpline 1800-103-7623</p>
</body></html>`;

    const blob = new Blob([htmlReceipt], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoiceId}.html`;
    a.click();
    URL.revokeObjectURL(url);
    onNotify('Receipt downloaded. You can also print directly to PDF.');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-24 space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] dark:text-white">
          {pt.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{pt.subtitle}</p>
      </div>

      {/* Itemised Invoice Card */}
      <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white">{pt.itemisedTitle}</h2>
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400">{invoiceId}</p>
          </div>
          {paid && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A]">
              <CheckCircle2 className="w-4 h-4" />
              <span>{pt.paidConfirmed}</span>
            </span>
          )}
        </div>

        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between text-slate-600 dark:text-slate-300">
            <span>{pt.baseCallout}</span>
            <span className="font-mono tabular-nums">₹{baseCallout}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-300">
            <span>
              {towDetails.confirmed
                ? `${pt.repairOrTow} (${towDetails.destination.split('—')[0].trim()})`
                : pt.repairOrTow}
            </span>
            <span className="font-mono tabular-nums">₹{serviceFee}</span>
          </div>
          {approvedExtra > 0 && (
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>{pt.approvedParts}</span>
              <span className="font-mono tabular-nums">₹{approvedExtra}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-600 dark:text-slate-300">
            <span>{pt.gst}</span>
            <span className="font-mono tabular-nums">₹{gst}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-base font-bold text-[#0F1B2D] dark:text-white">
            <span>{pt.totalPayable}</span>
            <span className="font-display text-2xl font-extrabold tabular-nums">
              ₹{totalPayable.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Method OR Receipt & Rating */}
      {!paid ? (
        <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
          <h2 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white">{pt.methodTitle}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'upi' as const, label: pt.methods.upi, icon: QrCode },
              { id: 'card' as const, label: pt.methods.card, icon: CreditCard },
              { id: 'cash' as const, label: pt.methods.cash, icon: Banknote },
            ].map(({ id, label, icon: Icon }) => {
              const selected = method === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMethod(id)}
                  className={`min-h-[64px] p-3.5 rounded-xl border text-left flex items-center gap-3 cursor-pointer transition-colors ${
                    selected
                      ? 'border-[#F26B1D] bg-orange-50/70 dark:bg-orange-950/30 text-[#0F1B2D] dark:text-white font-semibold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${selected ? 'text-[#F26B1D]' : 'text-slate-400'}`} />
                  <span className="text-xs sm:text-sm leading-tight">{label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              setPaid(true);
              onNotify(`Payment of ₹${totalPayable} confirmed via ${method.toUpperCase()}.`);
            }}
            className="w-full min-h-[52px] rounded-xl bg-[#16A34A] hover:bg-emerald-700 text-white font-semibold text-base cursor-pointer"
          >
            {pt.payNowBtn} ₹{totalPayable.toLocaleString()}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <h2 className="font-display text-lg font-bold text-[#0F1B2D] dark:text-white">
                  {pt.paidConfirmed} · ₹{totalPayable.toLocaleString()}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  Paid via {method.toUpperCase()} · GST Invoice sent to driver browser receipt
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 no-print">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="min-h-[44px] px-4 rounded-xl bg-[#0F1B2D] dark:bg-[#F26B1D] text-white text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{pt.downloadReceipt}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="min-h-[44px] px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Star Rating */}
          <div className="bg-white dark:bg-[#111A2B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 no-print">
            <h2 className="font-display text-base font-bold text-[#0F1B2D] dark:text-white">
              {pt.rateTitle} ({selectedQuote.mechanicName})
            </h2>

            {ratingSubmitted ? (
              <div className="text-sm font-medium text-[#16A34A]">
                Thank you for rating {rating}/5 stars. Safe travels ahead!
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      aria-label={`Rate ${star} stars`}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Quick note (e.g. Fast arrival, polite, carried safety cones)…"
                  className="w-full min-h-[44px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
                />
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setRatingSubmitted(true);
                      onNotify('Rating submitted. Thank you!');
                    }}
                    className="min-h-[44px] px-5 rounded-xl bg-[#F26B1D] text-white text-sm font-semibold cursor-pointer"
                  >
                    {pt.submitRating}
                  </button>
                  <button
                    type="button"
                    onClick={onBackHome}
                    className="min-h-[44px] px-5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold cursor-pointer"
                  >
                    {pt.backHome}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
