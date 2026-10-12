import Notice from '../models/Notice.js';

// @desc   Get All Active Notices (Public)
// @route  GET /api/notices
// @access Public
export const getNotices = async (req, res, next) => {
  try {
    const { category, priority, limit } = req.query;
    const query = { isActive: true };

    if (category && category !== 'All') {
      query.category = category;
    }
    if (priority) {
      query.priority = priority;
    }

    // Check expiry
    const now = new Date();
    query.$or = [{ expiryDate: null }, { expiryDate: { $gte: now } }];

    let dbQuery = Notice.find(query).sort({ priority: -1, publishDate: -1 });

    if (limit) {
      dbQuery = dbQuery.limit(parseInt(limit, 10));
    }

    const notices = await dbQuery.lean();

    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=180');

    res.status(200).json({
      success: true,
      count: notices.length,
      notices,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get All Notices for Admin (includes inactive)
// @route  GET /api/notices/admin
// @access Private (Admin)
export const getAdminNotices = async (req, res, next) => {
  try {
    const notices = await Notice.find().sort({ publishDate: -1 });
    res.status(200).json({
      success: true,
      count: notices.length,
      notices,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get Single Notice
// @route  GET /api/notices/:id
// @access Public
export const getNoticeById = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }
    res.status(200).json({ success: true, notice });
  } catch (error) {
    next(error);
  }
};

// @desc   Create New Notice
// @route  POST /api/notices
// @access Private (Admin)
export const createNotice = async (req, res, next) => {
  try {
    const {
      title,
      category,
      priority,
      content,
      shortSummary,
      attachmentUrl,
      publishDate,
      expiryDate,
      isActive,
      targetAudience,
    } = req.body;

    const notice = await Notice.create({
      title,
      category: category || 'General',
      priority: priority || 'Normal',
      content,
      shortSummary: shortSummary || content.slice(0, 140),
      attachmentUrl: attachmentUrl || '',
      publishDate: publishDate || new Date(),
      expiryDate: expiryDate || null,
      isActive: isActive !== undefined ? isActive : true,
      targetAudience: targetAudience || 'All',
    });

    res.status(201).json({
      success: true,
      message: 'Notice published successfully',
      notice,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Update Notice
// @route  PUT /api/notices/:id
// @access Private (Admin)
export const updateNotice = async (req, res, next) => {
  try {
    let notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    const allowedFields = ['title', 'category', 'priority', 'content', 'shortSummary', 'attachmentUrl', 'publishDate', 'expiryDate', 'isActive', 'targetAudience'];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    notice = await Notice.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Notice updated successfully',
      notice,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete Notice
// @route  DELETE /api/notices/:id
// @access Private (Admin)
export const deleteNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    await Notice.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Notice removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
