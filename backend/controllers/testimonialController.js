import Testimonial from '../models/Testimonial.js';

// @desc   Get Published Testimonials
// @route  GET /api/testimonials
// @access Public
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isPublished: true }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Create Testimonial
// @route  POST /api/testimonials
// @access Private (Admin)
export const createTestimonial = async (req, res, next) => {
  try {
    const { authorName, role, relation, content, rating, avatarUrl } = req.body;
    const testimonial = await Testimonial.create({
      authorName,
      role: role || 'Parent',
      relation: relation || 'Proud ZIPS Parent',
      content,
      rating: rating || 5,
      avatarUrl,
    });

    res.status(201).json({ success: true, message: 'Testimonial added', testimonial });
  } catch (error) {
    next(error);
  }
};

// @desc   Update Testimonial
// @route  PATCH /api/testimonials/:id
// @access Private
export const updateTestimonial = async (req, res, next) => {
  try {
    const allowedFields = ['authorName', 'role', 'relation', 'content', 'rating', 'avatarUrl', 'isPublished'];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.status(200).json({ success: true, message: 'Testimonial updated', testimonial });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete Testimonial
// @route  DELETE /api/testimonials/:id
// @access Private
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.status(200).json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};
