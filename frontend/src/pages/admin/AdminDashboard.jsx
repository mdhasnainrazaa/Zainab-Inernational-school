import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Bell,
  RefreshCw,
  Compass,
} from 'lucide-react';
import api from '../../services/api';

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [counts, setCounts] = useState({
    enquiries: 0,
    newLeads: 0,
    campusVisits: 0,
    notices: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const [enqRes, statsRes, noticeRes] = await Promise.allSettled([
        api.getEnquiries({ limit: 10 }),
        api.getEnquiryStats(),
        api.getAdminNotices(),
      ]);

      const enqList = enqRes.status === 'fulfilled' && enqRes.value?.enquiries ? enqRes.value.enquiries : [];
      const statsData = statsRes.status === 'fulfilled' && statsRes.value?.stats ? statsRes.value.stats : null;
      const noticesList = noticeRes.status === 'fulfilled' && noticeRes.value?.notices ? noticeRes.value.notices : [];

      setEnquiries(enqList);
      setCounts({
        enquiries: statsData?.total ?? (enqRes.status === 'fulfilled' ? (enqRes.value.total ?? enqList.length) : enqList.length),
        newLeads: statsData?.new ?? enqList.filter((e) => e.status === 'NEW').length,
        campusVisits: statsData?.campusVisits ?? enqList.filter((e) => e.campusVisitRequested).length,
        notices: noticesList.length,
      });
    } catch (err) {
      console.error('Failed to fetch dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();

    const onFocus = () => {
      fetchDashboard();
    };

    window.addEventListener('focus', onFocus);
    const interval = setInterval(fetchDashboard, 15000); // 15s auto-refresh for real-time lead tracking

    return () => {
      window.removeEventListener('focus', onFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. Welcome Banner */}
      <div className="bg-gradient-to-r from-zips-green-950 via-zips-green-900 to-zips-green-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-zips-gold-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-zips-gold-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>ZIPS Live Database Control Desk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white">
            Welcome to ZIPS Administrative Portal
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
            Connected to real-time MongoDB Atlas database. Manage live admission leads, schedule student campus tours, and publish school notices.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchDashboard}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center gap-2 cursor-pointer"
            title="Refresh database records"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Live Data</span>
          </button>
          <Link
            to="/admin/enquiries"
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zips-green-950 bg-zips-gold-500 hover:bg-zips-gold-400 transition-colors shadow-md flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>View Enquiries CRM</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Inquiries</p>
            <h3 className="text-2xl font-sans font-bold text-zips-green-950 mt-1">
              {loading ? '...' : counts.enquiries}
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Live Database Leads</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-zips-green-50 text-zips-green-900 flex items-center justify-center">
            <Users className="w-6 h-6 text-zips-green-800" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">New Leads</p>
            <h3 className="text-2xl font-sans font-bold text-amber-600 mt-1">
              {loading ? '...' : counts.newLeads}
            </h3>
            <p className="text-[11px] text-amber-600 font-medium mt-1">Awaiting Contact</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Campus Visits</p>
            <h3 className="text-2xl font-sans font-bold text-purple-600 mt-1">
              {loading ? '...' : counts.campusVisits}
            </h3>
            <p className="text-[11px] text-purple-600 font-medium mt-1">Tour Requests</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Compass className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Notices</p>
            <h3 className="text-2xl font-sans font-bold text-blue-600 mt-1">
              {loading ? '...' : counts.notices}
            </h3>
            <p className="text-[11px] text-blue-600 font-medium mt-1">Notice Board Live</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* 3. Recent Admission Enquiries Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="font-sans font-bold text-base text-zips-green-950">
              Recent Admission Inquiries
            </h3>
            <p className="text-xs text-gray-500">Live submissions saved in MongoDB database</p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-bold text-zips-green-800 hover:text-zips-gold-700 flex items-center gap-1"
          >
            <span>Full CRM Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-zips-green-800 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading live inquiries from database...</span>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-400">
              No admission inquiries found in the database.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-4">Ref ID</th>
                  <th className="p-4">Parent Name</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Class</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Tour Req.</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-zips-green-900">{enq.enquiryId}</td>
                    <td className="p-4 font-semibold text-zips-charcoal-900">{enq.parentName}</td>
                    <td className="p-4 text-gray-700">{enq.studentName}</td>
                    <td className="p-4 font-medium text-zips-green-950">{enq.classApplyingFor}</td>
                    <td className="p-4 font-mono text-gray-700">{enq.phoneNumber}</td>
                    <td className="p-4">
                      {enq.campusVisitRequested ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-400 text-[10px]">No</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          enq.status === 'NEW'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'CONTACTED'
                            ? 'bg-blue-100 text-blue-800'
                            : enq.status === 'QUALIFIED'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
