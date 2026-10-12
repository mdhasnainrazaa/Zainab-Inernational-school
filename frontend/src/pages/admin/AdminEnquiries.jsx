import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  FileSpreadsheet,
  ChevronRight,
  Send,
  RefreshCw,
} from 'lucide-react';
import api from '../../services/api';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  const statuses = ['ALL', 'NEW', 'CONTACTED', 'FOLLOW_UP', 'QUALIFIED', 'CAMPUS_VISIT', 'APPLIED', 'ADMITTED', 'CLOSED', 'LOST'];

  const fetchEnquiries = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await api.getEnquiries({ status: statusFilter, search, limit: 100 });
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
  }, [statusFilter, search]);

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      await api.updateEnquiryStatus(enquiryId, { status: newStatus });
      fetchEnquiries();
    } catch (_) {
      alert('Failed to update status');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedEnquiry) return;
    try {
      await api.addEnquiryNote(selectedEnquiry._id, newNote);
      setNewNote('');
      fetchEnquiries();
    } catch (_) {
      alert('Failed to add note');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Ref ID,Date,Parent,Student,Class,Phone,Email,City,Campus Visit,Status'];
    const rows = enquiries.map(e =>
      `"${e.enquiryId}","${new Date(e.createdAt).toLocaleDateString()}","${e.parentName}","${e.studentName}","${e.classApplyingFor}","${e.phoneNumber}","${e.email || ''}","${e.city || 'Aligarh'}","${e.campusVisitRequested ? 'Yes' : 'No'}","${e.status}"`
    );
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
          <p className="text-xs text-gray-500">Track prospective student leads, parent interactions, and tour schedules</p>
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

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors ${
                statusFilter === st
                  ? 'bg-zips-green-900 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, parent, phone..."
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
                  <th className="p-4">Parent & Student</th>
                  <th className="p-4">Class</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-xs text-gray-500">
                      Loading inquiries from database...
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-xs text-gray-400">
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
                      <td className="p-4">
                        <p className="font-semibold text-zips-charcoal-900">{enq.parentName}</p>
                        <p className="text-[11px] text-gray-500">{enq.studentName}</p>
                      </td>
                      <td className="p-4 font-medium text-zips-green-950">{enq.classApplyingFor}</td>
                      <td className="p-4 font-mono text-gray-700">{enq.phoneNumber}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          enq.status === 'NEW'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'CONTACTED'
                            ? 'bg-blue-100 text-blue-800'
                            : enq.status === 'QUALIFIED'
                            ? 'bg-purple-100 text-purple-800'
                            : enq.status === 'ADMITTED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {enq.status}
                        </span>
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
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-xl p-6 space-y-6 sticky top-20">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
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
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Details */}
            <div className="space-y-2.5 text-xs text-zips-charcoal-800 bg-gray-50 p-4 rounded-xl">
              <p><strong>Parent / Guardian:</strong> {selectedEnquiry.parentName}</p>
              <p><strong>Class Applying For:</strong> <span className="font-semibold text-zips-green-900">{selectedEnquiry.classApplyingFor}</span></p>
              <p><strong>Phone:</strong> <a href={`tel:${selectedEnquiry.phoneNumber}`} className="text-zips-green-800 font-mono font-bold underline">{selectedEnquiry.phoneNumber}</a></p>
              {selectedEnquiry.email && <p><strong>Email:</strong> {selectedEnquiry.email}</p>}
              <p><strong>City:</strong> {selectedEnquiry.city || 'Aligarh'}</p>
              <p><strong>Campus Tour Requested:</strong> {selectedEnquiry.campusVisitRequested ? '✅ Yes' : 'No'}</p>
              {selectedEnquiry.message && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-gray-500 font-medium">Parent Note/Query:</p>
                  <p className="italic text-gray-700 mt-0.5">"{selectedEnquiry.message}"</p>
                </div>
              )}
            </div>

            {/* Update Status Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zips-charcoal-800 mb-1">
                Update Lead Status:
              </label>
              <select
                value={selectedEnquiry.status}
                onChange={(e) => handleStatusChange(selectedEnquiry._id, e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-zips-green-950 bg-white focus:ring-2 focus:ring-zips-green-700"
              >
                {statuses.filter(s => s !== 'ALL').map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Follow-up Notes History & Input */}
            <div className="space-y-3 pt-2">
              <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-zips-green-950">
                Staff Interaction Notes:
              </h5>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add interaction note / call record..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-zips-green-700"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-zips-green-900 text-white rounded-xl text-xs font-bold hover:bg-zips-green-800"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {selectedEnquiry.notes && selectedEnquiry.notes.length > 0 ? (
                  selectedEnquiry.notes.map((note, i) => (
                    <div key={i} className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                        <span className="font-bold text-zips-green-900">{note.authorName}</span>
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700">{note.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic">No notes logged yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
