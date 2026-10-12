import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Download,
  Calendar,
  Sparkles,
  Phone,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  FileText,
  BadgeIndianRupee,
  Building2,
  ExternalLink,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import { SCHOOL_INFO, FEE_STRUCTURE } from '../data/schoolData';

export default function FeeStructurePage({ onOpenEnquiry }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div>
      <SEO
        title="Fee Structure Session 2025-26 | Zainab International Public School"
        description="Official tuition and monthly fee structure for Session 2025-26 at Zainab International Public School, Rathgawan, Aligarh. Transparent fees from Nursery to Class IX."
        schemaType="WebPage"
      />

      <PageHero
        badge="Official Tuition Circular • Session 2025-26"
        title="Transparent & Affordable Fee Structure"
        subtitle="World-class educational experience accessible to every aspiring student with clear monthly and annual tuition schedules."
        breadcrumb={[{ name: 'Fee Structure' }]}
        bgImage="/infrastructure/zips-school-modern-smart-classroom-interior.webp"
      />

      {/* Main Fee Table Section */}
      <section className="py-12 sm:py-16 bg-[#FDFCF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Official Document Container Card */}
          <div
            className="bg-white rounded-3xl shadow-xl border-2 border-zips-gold-400/40 overflow-hidden"
          >
            {/* Header Ribbon */}
            <div className="bg-gradient-to-r from-zips-green-950 via-zips-green-900 to-zips-green-950 text-white p-6 sm:p-8 text-center relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-zips-gold-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zips-gold-500/20 border border-zips-gold-400/30 text-zips-gold-300 text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-zips-gold-400" />
                <span>Academic Session {FEE_STRUCTURE.session}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                Fee Structure
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/90 font-sans max-w-xl mx-auto">
                Zainab International Public School, Rathgawan, Aligarh
              </p>
            </div>

            {/* Sub-Header Notice Bar */}
            <div className="bg-zips-green-900/10 border-b border-zips-green-900/20 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-zips-green-950 font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-zips-green-800" />
                <span>Applicable for Session: <strong>{FEE_STRUCTURE.session}</strong></span>
              </div>
              <a
                href="/fee-structure.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-zips-green-900 hover:text-zips-gold-700 transition-colors underline"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Official Circular Notice</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zips-green-900 text-white text-xs sm:text-sm uppercase tracking-wider font-semibold">
                    <th className="py-4 px-4 sm:px-6 text-center w-16 border-r border-zips-green-800">S.No.</th>
                    <th className="py-4 px-4 sm:px-6 border-r border-zips-green-800">Class / Grade</th>
                    <th className="py-4 px-4 sm:px-6 text-center border-r border-zips-green-800">Monthly Fee</th>
                    <th className="py-4 px-4 sm:px-6 text-center">Total Fee (Annual)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-sans">
                  {FEE_STRUCTURE.schedule.map((row, idx) => (
                    <tr
                      key={row.sNo}
                      className={`hover:bg-amber-50/50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                      }`}
                    >
                      <td className="py-4 px-4 sm:px-6 text-center font-bold text-gray-600 border-r border-gray-200">
                        {row.sNo}.
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-bold text-zips-green-950 border-r border-gray-200">
                        <span className="text-sm sm:text-base">{row.classGroup}</span>
                        <p className="text-[11px] font-normal text-gray-500 mt-0.5">{row.description}</p>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-center font-bold font-mono text-zips-charcoal-900 border-r border-gray-200">
                        <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                          {row.monthlyDisplay}
                        </span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-center font-bold font-mono text-zips-green-950">
                        <span className="bg-amber-50 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
                          {row.totalDisplay}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note & Guidelines Footer */}
            <div className="p-6 bg-red-50/60 border-t border-red-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-800 text-sm">Important Institutional Notice:</h4>
                  <p className="text-xs text-red-700 mt-0.5 font-medium">
                    {FEE_STRUCTURE.importantNote}
                  </p>
                </div>
              </div>

              <a
                href="/fee-structure.png"
                download="ZIPS-Fee-Structure-2025-26.png"
                className="px-4 py-2 rounded-xl text-xs font-bold text-zips-green-950 bg-white border border-gray-300 hover:bg-gray-50 shadow-xs flex items-center gap-2 flex-shrink-0 transition-colors"
              >
                <Download className="w-4 h-4 text-zips-green-900" />
                <span>Download Fee Notice</span>
              </a>
            </div>
          </div>

          {/* Quick Summary Cards (Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {FEE_STRUCTURE.schedule.map((item) => (
              <div
                key={item.sNo}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-zips-gold-100/40 rounded-full blur-xl pointer-events-none"></div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zips-gold-700 bg-zips-gold-100 px-2 py-0.5 rounded-md">
                  Grade Wing
                </span>
                <h3 className="font-bold text-base text-zips-green-950 mt-2">
                  {item.classGroup}
                </h3>
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-baseline justify-between">
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-semibold">Monthly</p>
                    <p className="font-mono font-bold text-lg text-emerald-700">{item.monthlyDisplay}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase text-gray-400 font-semibold">Annual Total</p>
                    <p className="font-mono font-bold text-sm text-zips-green-950">{item.totalDisplay}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Modes Information */}
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-zips-green-900 text-zips-gold-400 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-zips-green-950">
                  Accepted Payment Methods
                </h3>
                <p className="text-xs text-gray-500">Convenient, secure, and hassle-free payment options for parents</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FEE_STRUCTURE.paymentModes.map((mode, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#FDFCF7] border border-gray-200/80 hover:border-zips-gold-400 transition-colors"
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-zips-green-950 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{mode.name}</span>
                  </div>
                  <p className="text-xs text-gray-600 pl-6 leading-relaxed">
                    {mode.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-zips-gold-700 bg-zips-gold-100 px-3.5 py-1 rounded-full border border-zips-gold-300">
                Fee Guidelines
              </span>
              <h3 className="text-2xl font-sans font-bold text-zips-green-950 mt-2">
                Frequently Asked Fee Questions
              </h3>
            </div>

            <div className="space-y-3 max-w-3xl mx-auto">
              {FEE_STRUCTURE.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-zips-green-950 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-zips-gold-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                    {openFaq === idx && (
                      <div
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                          {faq.a}
                        </div>
                      </div>
                    )}
                  
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Admission & Counseling CTA */}
          <div className="mt-12 bg-gradient-to-r from-zips-green-950 via-zips-green-900 to-zips-green-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-zips-gold-400/30">
            <div>
              <div className="inline-flex items-center gap-2 text-zips-gold-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Admissions Counseling Desk</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-sans">
                Need Help with Admission & Fees?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-lg">
                Our admissions officers are available Monday to Saturday (8:00 AM – 3:30 PM) behind CDF, Rathgawan, Aligarh to assist you.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${SCHOOL_INFO.phones[0]}`}
                className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-zips-gold-400" />
                <span>Call Helpdesk</span>
              </a>
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zips-green-950 bg-zips-gold-400 hover:bg-zips-gold-300 transition-colors shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-zips-green-950" />
                <span>Online Enquiry</span>
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
