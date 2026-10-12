import axios from 'axios';

// Ensure baseURL always ends with /api even if user sets VITE_API_URL to the root domain
const rawBase = import.meta.env.VITE_API_URL || '/api';
const cleanBase = rawBase.replace(/\/+$/, ''); // strip trailing slash
const API_BASE = cleanBase.endsWith('/api') ? cleanBase : `${cleanBase}/api`;

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 25000, // increased timeout for Render free tier cold starts
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('zips_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('zips_token');
      localStorage.removeItem('zips_user');
      // If user is inside the admin panel (except login page), redirect to login
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login?sessionExpired=true';
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  // 1. Auth API
  async login(email, password) {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res.data?.token) {
        localStorage.setItem('zips_token', res.data.token);
        localStorage.setItem('zips_user', JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      if (err.message) {
        throw new Error(err.message);
      }
      throw new Error('Login failed. Please check your credentials or backend server.');
    }
  },

  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch (_) {}
    localStorage.removeItem('zips_token');
    localStorage.removeItem('zips_user');
    return { success: true };
  },

  async getMe() {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('zips_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // 2. Enquiries API (Admission CRM)
  async submitEnquiry(enquiryData) {
    const res = await apiClient.post('/enquiries', enquiryData);
    return res.data;
  },

  async getEnquiries(params = {}) {
    const res = await apiClient.get('/enquiries', { params });
    return res.data;
  },

  async getEnquiryStats() {
    const res = await apiClient.get('/enquiries/stats');
    return res.data;
  },

  async updateEnquiryStatus(id, updateData) {
    const res = await apiClient.patch(`/enquiries/${id}/status`, updateData);
    return res.data;
  },

  async addEnquiryNote(id, noteText) {
    const res = await apiClient.post(`/enquiries/${id}/notes`, { note: noteText });
    return res.data;
  },

  async deleteEnquiry(id) {
    const res = await apiClient.delete(`/enquiries/${id}`);
    return res.data;
  },

  // 3. Blogs & Articles API
  async getBlogs(params = {}) {
    const res = await apiClient.get('/blogs', { params });
    return res.data;
  },

  async getAdminBlogs() {
    const res = await apiClient.get('/blogs/admin');
    return res.data;
  },

  async getBlogBySlug(slug) {
    const res = await apiClient.get(`/blogs/${slug}`);
    return res.data;
  },

  async createBlog(blogData) {
    const res = await apiClient.post('/blogs', blogData);
    return res.data;
  },

  async updateBlog(id, blogData) {
    const res = await apiClient.patch(`/blogs/${id}`, blogData);
    return res.data;
  },

  async deleteBlog(id) {
    const res = await apiClient.delete(`/blogs/${id}`);
    return res.data;
  },

  // 4. Notice Board & Announcements API
  async getNotices(params = {}) {
    const res = await apiClient.get('/notices', { params });
    return res.data;
  },

  async getAdminNotices() {
    const res = await apiClient.get('/notices/admin');
    return res.data;
  },

  async getNoticeById(id) {
    const res = await apiClient.get(`/notices/${id}`);
    return res.data;
  },

  async createNotice(data) {
    const res = await apiClient.post('/notices', data);
    return res.data;
  },

  async updateNotice(id, data) {
    const res = await apiClient.put(`/notices/${id}`, data);
    return res.data;
  },

  async deleteNotice(id) {
    const res = await apiClient.delete(`/notices/${id}`);
    return res.data;
  },

  // 5. Events & Calendar API
  async getEvents() {
    const res = await apiClient.get('/events');
    return res.data;
  },

  async createEvent(data) {
    const res = await apiClient.post('/events', data);
    return res.data;
  },

  async updateEvent(id, data) {
    const res = await apiClient.patch(`/events/${id}`, data);
    return res.data;
  },

  async deleteEvent(id) {
    const res = await apiClient.delete(`/events/${id}`);
    return res.data;
  },

  // 6. Facilities API
  async getFacilities() {
    const res = await apiClient.get('/facilities');
    return res.data;
  },

  async createFacility(data) {
    const res = await apiClient.post('/facilities', data);
    return res.data;
  },

  async updateFacility(id, data) {
    const res = await apiClient.patch(`/facilities/${id}`, data);
    return res.data;
  },

  async deleteFacility(id) {
    const res = await apiClient.delete(`/facilities/${id}`);
    return res.data;
  },

  // 7. Activities (Beyond Academics) API
  async getActivities() {
    const res = await apiClient.get('/activities');
    return res.data;
  },

  async createActivity(data) {
    const res = await apiClient.post('/activities', data);
    return res.data;
  },

  async updateActivity(id, data) {
    const res = await apiClient.patch(`/activities/${id}`, data);
    return res.data;
  },

  async deleteActivity(id) {
    const res = await apiClient.delete(`/activities/${id}`);
    return res.data;
  },

  // 8. Media Gallery API
  async getGallery() {
    const res = await apiClient.get('/gallery');
    return res.data;
  },

  async createGalleryItem(data) {
    const res = await apiClient.post('/gallery', data);
    return res.data;
  },

  async updateGalleryItem(id, data) {
    const res = await apiClient.patch(`/gallery/${id}`, data);
    return res.data;
  },

  async deleteGalleryItem(id) {
    const res = await apiClient.delete(`/gallery/${id}`);
    return res.data;
  },

  // 9. Testimonials API
  async getTestimonials() {
    const res = await apiClient.get('/testimonials');
    return res.data;
  },

  async createTestimonial(data) {
    const res = await apiClient.post('/testimonials', data);
    return res.data;
  },

  async updateTestimonial(id, data) {
    const res = await apiClient.patch(`/testimonials/${id}`, data);
    return res.data;
  },

  async deleteTestimonial(id) {
    const res = await apiClient.delete(`/testimonials/${id}`);
    return res.data;
  },

  // 10. Site Settings API
  async getSettings() {
    const res = await apiClient.get('/settings');
    return res.data;
  },

  async updateSettings(data) {
    const res = await apiClient.patch('/settings', data);
    return res.data;
  },
};

export default api;
