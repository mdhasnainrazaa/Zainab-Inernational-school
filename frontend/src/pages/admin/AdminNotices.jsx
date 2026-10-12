import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Calendar,
  AlertCircle,
  Eye,
  FileText,
  Tag,
  ShieldAlert,
} from 'lucide-react';
import api from '../../services/api';
import { SAMPLE_NOTICES } from '../../data/schoolData';

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [editingNotice, setEditingNotice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    priority: 'Normal',
    shortSummary: '',
    content: '',
    targetAudience: 'All',
    attachmentUrl: '',
    isActive: true,
  });

  const fetchNotices = async () => {
    try {
      const res = await api.getAdminNotices();
      if (res?.notices) {
        setNotices(res.notices);
      }
    } catch (err) {
      console.error('Failed to load notices:', err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleOpenCreate = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      category: 'General',
      priority: 'Normal',
      shortSummary: '',
      content: '',
      targetAudience: 'All',
      attachmentUrl: '',
      isActive: true,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (n) => {
    setEditingNotice(n);
    setFormData({
      title: n.title || '',
      category: n.category || 'General',
      priority: n.priority || 'Normal',
      shortSummary: n.shortSummary || '',
      content: n.content || '',
      targetAudience: n.targetAudience || 'All',
      attachmentUrl: n.attachmentUrl || '',
      isActive: n.isActive !== false,
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingNotice) {
        await api.updateNotice(editingNotice._id, formData);
      } else {
        await api.createNotice(formData);
      }
      await fetchNotices();
      setShowModal(false);
    } catch (err) {
      alert('Error saving notice: ' + (err.message || 'Please try again'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await api.deleteNotice(id);
        await fetchNotices();
      } catch (err) {
        alert('Error deleting notice');
      }
    }
  };

  const handleToggleStatus = async (notice) => {
    try {
      await api.updateNotice(notice._id, { isActive: !notice.isActive });
      await fetchNotices();
    } catch (_) {}
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-zips-gold-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4 text-zips-gold-600" />
            <span>Digital Bulletin Board CMS</span>
          </div>
          <h1 className="text-2xl font-sans font-bold text-zips-green-950">
            Notice Board & Circulars
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Publish announcements, urgent alerts, holiday notices, and academic circulars on the homepage.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zips-green-950 hover:bg-zips-green-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all border border-zips-gold-400"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Publish New Notice</span>
        </button>
      </div>

      {/* 2. Notices Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4">Priority & Date</th>
                <th className="py-3.5 px-4">Notice Title & Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Audience</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {notices.map((n) => (
                <tr key={n._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {n.priority === 'Urgent' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-md w-max">
                          <ShieldAlert className="w-3 h-3" /> Urgent
                        </span>
                      ) : n.priority === 'Important' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md w-max">
                          ⭐ Important
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md w-max">
                          Normal
                        </span>
                      )}
                      <span className="text-[11px] text-gray-400 font-mono">
                        {new Date(n.publishDate || Date.now()).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 max-w-xs sm:max-w-md">
                    <h4 className="font-bold text-zips-green-950 text-sm">{n.title}</h4>
                    <p className="text-gray-500 line-clamp-1 mt-0.5">{n.shortSummary || n.content}</p>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {n.category || 'General'}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-gray-600 font-medium">{n.targetAudience || 'All'}</span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(n)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                        n.isActive !== false
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {n.isActive !== false ? '● Active' : '○ Inactive'}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(n)}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-zips-green-100 text-zips-green-950 transition-colors"
                        title="Edit Notice"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(n._id)}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-100 text-red-600 transition-colors"
                        title="Delete Notice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border-2 border-zips-gold-400 p-6 my-auto overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-zips-green-950">
                {editingNotice ? 'Edit Notice' : 'Publish New Notice'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Admissions Open for Session 2026-27"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-zips-green-700 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-zips-green-700 focus:outline-none text-xs bg-white"
                  >
                    <option value="General">General</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Academic">Academic</option>
                    <option value="Events">Events</option>
                    <option value="Holidays">Holidays</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-zips-green-700 focus:outline-none text-xs bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Important">⭐ Important</option>
                    <option value="Urgent">🔴 Urgent Alert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Target Audience
                  </label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-zips-green-700 focus:outline-none text-xs bg-white"
                  >
                    <option value="All">All</option>
                    <option value="Parents">Parents</option>
                    <option value="Students">Students</option>
                    <option value="Faculty">Faculty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Short Excerpt / Summary (Optional)
                </label>
                <input
                  type="text"
                  value={formData.shortSummary}
                  onChange={(e) => setFormData({ ...formData, shortSummary: e.target.value })}
                  placeholder="One-line summary visible on homepage card"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-zips-green-700 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Notice / Circular Content *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the complete official notice message..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-zips-green-700 focus:outline-none text-xs sm:text-sm"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  PDF / Document Attachment URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.attachmentUrl}
                  onChange={(e) => setFormData({ ...formData, attachmentUrl: e.target.value })}
                  placeholder="e.g. /docs/circular-2026.pdf or external URL"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-zips-green-700 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="noticeActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-zips-green-800 focus:ring-zips-green-700 border-gray-300 cursor-pointer"
                />
                <label htmlFor="noticeActive" className="text-xs font-bold text-gray-700 cursor-pointer">
                  Publish & Make Visible on Website Immediately
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-zips-green-950 hover:bg-zips-green-900 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-zips-gold-400"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>{saving ? 'Saving...' : 'Save & Publish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
