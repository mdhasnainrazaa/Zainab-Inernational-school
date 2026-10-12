import Gallery from '../models/Gallery.js';

// @desc   Get All Gallery Items (Public)
// @route  GET /api/gallery
// @access Public
export const getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    const items = await Gallery.find(query).sort({ sortOrder: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Create Gallery Item
// @route  POST /api/gallery
// @access Private (Admin)
export const createGalleryItem = async (req, res, next) => {
  try {
    const { title, category, imageUrl, caption, sortOrder } = req.body;
    const item = await Gallery.create({
      title,
      category: category || 'Campus & Buildings',
      imageUrl,
      caption,
      sortOrder: sortOrder || 0,
    });

    res.status(201).json({ success: true, message: 'Photo added to gallery', item });
  } catch (error) {
    next(error);
  }
};

// @desc   Update Gallery Item
// @route  PATCH /api/gallery/:id
// @access Private
export const updateGalleryItem = async (req, res, next) => {
  try {
    const allowedFields = ['title', 'category', 'imageUrl', 'caption', 'sortOrder', 'isPublished'];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const item = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    res.status(200).json({ success: true, message: 'Gallery item updated', item });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete Gallery Item
// @route  DELETE /api/gallery/:id
// @access Private
export const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    res.status(200).json({ success: true, message: 'Gallery item removed' });
  } catch (error) {
    next(error);
  }
};
