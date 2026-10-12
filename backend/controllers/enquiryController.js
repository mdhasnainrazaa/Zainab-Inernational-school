import Enquiry from '../models/Enquiry.js';
import { escapeRegex, sanitizeString, isNonEmptyString } from '../utils/security.js';

// @desc   Submit New Admission Enquiry (Public)
// @route  POST /api/enquiries
// @access Public
export const createEnquiry = async (req, res, next) => {
  try {
    const {
      parentName,
      studentName,
      studentDob,
      currentClass,
      classApplyingFor,
      phoneNumber,
      email,
      city,
      preferredContactMethod,
      message,
      campusVisitRequested,
      preferredVisitDate,
    } = req.body;

    if (!isNonEmptyString(parentName) || !isNonEmptyString(studentName) || !isNonEmptyString(classApplyingFor) || !isNonEmptyString(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all mandatory fields (Parent Name, Student Name, Class, Phone).',
      });
    }

    const enquiry = await Enquiry.create({
      parentName: sanitizeString(parentName),
      studentName: sanitizeString(studentName),
      studentDob,
      currentClass: sanitizeString(currentClass),
      classApplyingFor: sanitizeString(classApplyingFor),
      phoneNumber: sanitizeString(phoneNumber),
      email: sanitizeString(email).toLowerCase(),
      city: sanitizeString(city) || 'Aligarh',
      preferredContactMethod: preferredContactMethod || 'PHONE',
      message: sanitizeString(message),
      campusVisitRequested: Boolean(campusVisitRequested),
      preferredVisitDate,
    });

    res.status(201).json({
      success: true,
      message: 'Admission Enquiry submitted successfully! Our admissions coordinator will contact you shortly.',
      enquiryId: enquiry.enquiryId,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get All Enquiries with Search & Filter
// @route  GET /api/enquiries
// @access Private (Admin / Editor)
export const getEnquiries = async (req, res, next) => {
  try {
    const { status, classApplyingFor, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'ALL') {
      query.status = sanitizeString(status);
    }

    if (classApplyingFor && classApplyingFor !== 'ALL') {
      query.classApplyingFor = sanitizeString(classApplyingFor);
    }

    if (search && typeof search === 'string' && search.trim().length > 0) {
      const cleanSearch = escapeRegex(search.trim());
      query.$or = [
        { parentName: { $regex: cleanSearch, $options: 'i' } },
        { studentName: { $regex: cleanSearch, $options: 'i' } },
        { phoneNumber: { $regex: cleanSearch, $options: 'i' } },
        { enquiryId: { $regex: cleanSearch, $options: 'i' } },
        { email: { $regex: cleanSearch, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));

    const [total, enquiries] = await Promise.all([
      Enquiry.countDocuments(query),
      Enquiry.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean(),
    ]);

    res.status(200).json({
      success: true,
      count: enquiries.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 1,
      enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get CRM Dashboard Stats
// @route  GET /api/enquiries/stats
// @access Private (Admin)
export const getEnquiryStats = async (req, res, next) => {
  try {
    const [total, aggStats, campusVisits] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]),
      Enquiry.countDocuments({ campusVisitRequested: true }),
    ]);

    const statMap = {};
    aggStats.forEach((item) => {
      statMap[item._id] = item.count;
    });

    const admitted = statMap['ADMITTED'] || 0;

    res.status(200).json({
      success: true,
      stats: {
        total,
        new: statMap['NEW'] || 0,
        contacted: statMap['CONTACTED'] || 0,
        followUp: statMap['FOLLOW_UP'] || 0,
        qualified: statMap['QUALIFIED'] || 0,
        campusVisits,
        applied: statMap['APPLIED'] || 0,
        admitted,
        closed: statMap['CLOSED'] || 0,
        lost: statMap['LOST'] || 0,
        conversionRate: total > 0 ? ((admitted / total) * 100).toFixed(1) : 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get Single Enquiry
// @route  GET /api/enquiries/:id
// @access Private
export const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, enquiry });
  } catch (error) {
    next(error);
  }
};

// @desc   Update Enquiry Status & Follow up
// @route  PATCH /api/enquiries/:id/status
// @access Private
export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status, followUpDate, assignedTo } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    if (status) enquiry.status = status;
    if (followUpDate) enquiry.followUpDate = followUpDate;
    if (assignedTo) enquiry.assignedTo = assignedTo;

    await enquiry.save();

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Add Note to Enquiry
// @route  POST /api/enquiries/:id/notes
// @access Private
export const addEnquiryNote = async (req, res, next) => {
  try {
    const { note } = req.body;
    if (!note) {
      return res.status(400).json({ success: false, message: 'Note content cannot be empty' });
    }

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    enquiry.notes.unshift({
      authorName: req.user ? req.user.name : 'Admissions Staff',
      note,
      createdAt: new Date(),
    });

    await enquiry.save();

    res.status(200).json({
      success: true,
      message: 'Note logged successfully',
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Export Enquiries as CSV format string
// @route  GET /api/enquiries/export/csv
// @access Private
export const exportEnquiriesCSV = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    const headers = ['Enquiry ID', 'Date', 'Parent Name', 'Student Name', 'Class Applying', 'Phone', 'Email', 'City', 'Campus Visit', 'Status'];
    
    const rows = enquiries.map(e => [
      `"${e.enquiryId}"`,
      `"${new Date(e.createdAt).toLocaleDateString()}"`,
      `"${e.parentName.replace(/"/g, '""')}"`,
      `"${e.studentName.replace(/"/g, '""')}"`,
      `"${e.classApplyingFor}"`,
      `"${e.phoneNumber}"`,
      `"${e.email || ''}"`,
      `"${e.city || ''}"`,
      `"${e.campusVisitRequested ? 'Yes' : 'No'}"`,
      `"${e.status}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=zips-admissions-enquiries.csv');
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};

// @desc   Delete Enquiry
// @route  DELETE /api/enquiries/:id
// @access Private (SUPER_ADMIN)
export const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, message: 'Enquiry record removed successfully' });
  } catch (error) {
    next(error);
  }
};
