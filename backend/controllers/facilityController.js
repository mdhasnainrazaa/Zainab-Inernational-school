import Facility from '../models/Facility.js';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

// @desc   Get All Published Facilities
// @route  GET /api/facilities
// @access Public
export const getFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.find({ isPublished: true }).sort({ sortOrder: 1 });
    res.status(200).json({
      success: true,
      count: facilities.length,
      facilities,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get Facility by Slug
// @route  GET /api/facilities/:slug
// @access Public
export const getFacilityBySlug = async (req, res, next) => {
  try {
    const facility = await Facility.findOne({ slug: req.params.slug, isPublished: true });
    if (!facility) {
      return res.status(404).json({ success: false, message: 'Facility not found' });
    }
    res.status(200).json({ success: true, facility });
  } catch (error) {
    next(error);
  }
};

// @desc   Create Facility
// @route  POST /api/facilities
// @access Private (Admin)
export const createFacility = async (req, res, next) => {
  try {
    const { name, tag, highlightQuote, shortDescription, fullDescription, features, coverImage } = req.body;
    
    let slug = slugify(name);
    const existing = await Facility.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const facility = await Facility.create({
      name,
      slug,
      tag: tag || 'Infrastructure',
      highlightQuote,
      shortDescription,
      fullDescription,
      features: Array.isArray(features) ? features : (features ? features.split(',').map(f => f.trim()) : []),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1000&q=80',
    });

    res.status(201).json({ success: true, message: 'Facility added successfully', facility });
  } catch (error) {
    next(error);
  }
};

// @desc   Update Facility
// @route  PATCH /api/facilities/:id
// @access Private
export const updateFacility = async (req, res, next) => {
  try {
    let facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ success: false, message: 'Facility not found' });
    }

    const allowedFields = ['name', 'shortDescription', 'fullDescription', 'features', 'coverImage', 'icon', 'sortOrder', 'isPublished'];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    if (updateData.name && updateData.name !== facility.name && !updateData.slug) {
      updateData.slug = slugify(updateData.name);
    }

    facility = await Facility.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Facility updated successfully', facility });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete Facility
// @route  DELETE /api/facilities/:id
// @access Private
export const deleteFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) {
      return res.status(404).json({ success: false, message: 'Facility not found' });
    }
    res.status(200).json({ success: true, message: 'Facility deleted successfully' });
  } catch (error) {
    next(error);
  }
};
