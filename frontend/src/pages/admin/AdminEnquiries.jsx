import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Download,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  X,
  ChevronRight,
  RefreshCw,
  MessageCircle,
} from 'lucide-react';
import api from '../../services/api';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await api.getEnquiries({ search, limit: 100 });
      if (res.enquiries) {
        setEnquiries(res.enquiries);
        if (selectedEnquiry) {
          const updated = res.enquiries.find(e => e._id === selectedEnquiry._id);
          if (updated) setSelectedEnquiry(updated);
        }
      }
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(true);

    const onFocus = () => {
      fetchEnquiries(false);
    };

    window.addEventListener('focus', onFocus);
    const interval = setInterval(() => fetchEnquiries(false), 15000);

    return () => {
      window.removeEventListener('focus', onFocus);
      clearInterval(interval);
    };
  }, [search]);

  const handleExportCSV = () => {
    const headers = ['Ref ID,Date,Time,Parent Name,Student Name,Class Applying,Phone,Email,City,Campus Visit,Message'];
    const rows = enquiries.map(e => {
      const d = new Date(e.createdAt);
      const dateStr = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
      const cleanMsg = (e.message || '').replace(/"/g, '""');
      return `"${e.enquiryId}","${dateStr}","${timeStr}","${e.parentName}","${e.studentName}","${e.classApplyingFor}","${e.phoneNumber}","${e.email || ''}","${e.city || 'Aligarh'}","${e.campusVisitRequested ? 'Yes' : 'No'}","${cleanMsg}"`;
    });
    const blob = new Blob([[headers.join('\n'), ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `zips-admission-enquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-sans font-bold text-zips-green-950">
            Admissions CRM & Inquiries Pipeline
          </h2>
          <p className="text-xs text-gray-500">Track prospective student leads, parent contact details, and tour requests</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchEnquiries(true)}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-gray-300 text-zips-charcoal-800 hover:bg-gray-50 shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
            title="Refresh database records"
          >
            <RefreshCw className={`w-4 h-4 text-zips-green-800 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Live Data</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-gray-300 text-zips-charcoal-800 hover:bg-gray-50 shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-zips-green-800" />
            <span>Export CSV Spreadsheet</span>
          </button>
        </div>
      </div>

      {/* Summary and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            Total Inquiries: <strong className="text-zips-green-950 font-bold text-sm">{enquiries.length}</strong>
          </span>
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, parent, phone, ref ID..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-zips-green-700 bg-white"
          />
        </div>
      </div>

      {/* Main Table and Detail Drawer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Enquiries List */}
        <div className={`bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden ${selectedEnquiry ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-4">Ref ID</th>
                  <th className="p-4">Submission Date</th>
                  <th className="p-4">Parent Name</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Class</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Campus Tour</th>
                  <th className="p-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-xs text-gray-500">
                      Loading inquiries from database...
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-12 text-center text-xs text-gray-400">
                      No admission inquiries found. Inquiries submitted by parents through the website will appear here in real-time.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enq) => (
                    <tr
                      key={enq._id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className={`cursor-pointer transition-colors ${
                        selectedEnquiry?._id === enq._id ? 'bg-zips-green-50/70 font-medium' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="p-4 font-mono font-bold text-zips-green-900">{enq.enquiryId}</td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                          <Calendar className="w-3.5 h-3.5 text-zips-gold-600 flex-shrink-0" />
                          <span>
                            {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 pl-5">
                          {new Date(enq.createdAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </p>
                      </td>
                      <td className="p-4 font-semibold text-zips-charcoal-900">{enq.parentName}</td>
                      <td className="p-4 text-gray-700">{enq.studentName}</td>
                      <td className="p-4 font-medium text-zips-green-950">{enq.classApplyingFor}</td>
                      <td className="p-4 font-mono text-gray-800">
                        <a
                          href={`tel:${enq.phoneNumber}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:underline hover:text-zips-green-800 font-semibold"
                        >
                          {enq.phoneNumber}
                        </a>
                      </td>
                      <td className="p-4">
                        {enq.campusVisitRequested ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            Requested
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[10px]">No</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <ChevronRight className="w-4 h-4 text-gray-400 inline" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Enquiry Details Drawer */}
        {selectedEnquiry && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-xl p-6 space-y-5 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zips-gold-700 bg-zips-gold-50 px-2.5 py-0.5 rounded-full border border-zips-gold-300">
                  {selectedEnquiry.enquiryId}
                </span>
                <h3 className="font-sans font-bold text-lg text-zips-green-950 mt-1">
                  {selectedEnquiry.studentName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Action Buttons */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${selectedEnquiry.phoneNumber}`}
                className="flex-1 py-2 px-3 rounded-xl bg-zips-green-900 hover:bg-zips-green-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Parent</span>
              </a>
              <a
                href={`https://wa.me/${(selectedEnquiry.phoneNumber || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              {selectedEnquiry.email && (
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  title="Send Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Detailed Information */}
            <div className="space-y-3 text-xs text-zips-charcoal-800 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-start justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">Form Submitted On:</span>
                <span className="font-semibold text-gray-900 text-right">
                  {new Date(selectedEnquiry.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                  at{' '}
                  {new Date(selectedEnquiry.createdAt).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">Parent / Guardian:</span>
                <span className="font-semibold text-gray-900">{selectedEnquiry.parentName}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">Student Name:</span>
                <span className="font-semibold text-gray-900">{selectedEnquiry.studentName}</span>
              </div>

              {selectedEnquiry.studentDob && (
                <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Date of Birth:</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(selectedEnquiry.studentDob).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}

              {selectedEnquiry.currentClass && (
                <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Current Class:</span>
                  <span className="font-semibold text-gray-900">{selectedEnquiry.currentClass}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">Class Applying For:</span>
                <span className="font-bold text-zips-green-900 text-sm">{selectedEnquiry.classApplyingFor}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">Phone Number:</span>
                <a href={`tel:${selectedEnquiry.phoneNumber}`} className="font-mono font-bold text-zips-green-800 underline">
                  {selectedEnquiry.phoneNumber}
                </a>
              </div>

              {selectedEnquiry.email && (
                <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Email:</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-zips-green-800 underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
              )}

              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">City / Location:</span>
                <span className="font-semibold text-gray-900">{selectedEnquiry.city || 'Aligarh'}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">Preferred Contact:</span>
                <span className="font-semibold uppercase text-gray-900">{selectedEnquiry.preferredContactMethod || 'PHONE'}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500 font-medium">Campus Tour:</span>
                <span className="font-bold text-gray-900">
                  {selectedEnquiry.campusVisitRequested ? '✅ Requested' : 'No'}
                </span>
              </div>

              {selectedEnquiry.preferredVisitDate && (
                <div className="flex items-center justify-between py-1 border-t border-gray-200/60">
                  <span className="text-gray-500 font-medium">Preferred Tour Date:</span>
                  <span className="font-semibold text-emerald-800">
                    {new Date(selectedEnquiry.preferredVisitDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}

              {selectedEnquiry.message && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-gray-500 font-medium mb-1">Parent Message / Notes:</p>
                  <p className="italic text-gray-800 bg-white p-2.5 rounded-lg border border-gray-200 whitespace-pre-line">
                    "{selectedEnquiry.message}"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
