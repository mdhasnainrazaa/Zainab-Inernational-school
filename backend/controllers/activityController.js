import Activity from '../models/Activity.js';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

// @desc   Get All Published Activities (Public)
// @route  GET /api/activities
// @access Public
export const getActivities = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    const activities = await Activity.find(query).sort({ sortOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get Single Activity by Slug
// @route  GET /api/activities/:slug
// @access Public
export const getActivityBySlug = async (req, res, next) => {
  try {
    const activity = await Activity.findOne({ slug: req.params.slug, isPublished: true });
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.status(200).json({ success: true, activity });
  } catch (error) {
    next(error);
  }
};

// @desc   Create Activity
// @route  POST /api/activities
// @access Private (Admin)
export const createActivity = async (req, res, next) => {
  try {
    const { title, category, shortDescription, fullDescription, keyOutcomes, coverImage, ageGroup, frequency } = req.body;
    
    let slug = slugify(title);
    const existing = await Activity.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const activity = await Activity.create({
      title,
      slug,
      category,
      shortDescription,
      fullDescription,
      keyOutcomes: Array.isArray(keyOutcomes) ? keyOutcomes : (keyOutcomes ? keyOutcomes.split(',').map(s => s.trim()) : []),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
      ageGroup: ageGroup || 'All Grades',
      frequency: frequency || 'Weekly',
    });

    res.status(201).json({ success: true, message: 'Activity created successfully', activity });
  } catch (error) {
    next(error);
  }
};

// @desc   Update Activity
// @route  PATCH /api/activities/:id
// @access Private
export const updateActivity = async (req, res, next) => {
  try {
    let activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    const allowedFields = ['title', 'category', 'shortDescription', 'fullDescription', 'keyOutcomes', 'coverImage', 'ageGroup', 'frequency', 'isPublished', 'sortOrder'];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    if (updateData.title && updateData.title !== activity.title && !updateData.slug) {
      updateData.slug = slugify(updateData.title);
    }

    if (updateData.keyOutcomes && typeof updateData.keyOutcomes === 'string') {
      updateData.keyOutcomes = updateData.keyOutcomes.split(',').map(s => s.trim());
    }

    activity = await Activity.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Activity updated successfully', activity });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete Activity
// @route  DELETE /api/activities/:id
// @access Private
export const deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.status(200).json({ success: true, message: 'Activity deleted successfully' });
  } catch (error) {
    next(error);
  }
};
