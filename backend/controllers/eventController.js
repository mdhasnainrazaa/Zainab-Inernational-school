import Event from '../models/Event.js';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

// @desc   Get All Published Events (Public)
// @route  GET /api/events
// @access Public
export const getEvents = async (req, res, next) => {
  try {
    const { upcoming } = req.query;
    const query = { isPublished: true };

    if (upcoming === 'true') {
      query.eventDate = { $gte: new Date() };
    }

    const events = await Event.find(query).sort({ eventDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get Single Event by Slug
// @route  GET /api/events/:slug
// @access Public
export const getEventBySlug = async (req, res, next) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug, isPublished: true });
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// @desc   Create Event
// @route  POST /api/events
// @access Private (Admin)
export const createEvent = async (req, res, next) => {
  try {
    const { title, eventDate, eventTime, location, shortDescription, fullDescription, coverImage } = req.body;
    
    let slug = slugify(title);
    const existing = await Event.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const event = await Event.create({
      title,
      slug,
      eventDate: eventDate || new Date(),
      eventTime: eventTime || '09:00 AM - 01:00 PM',
      location: location || 'ZIPS Campus, Rathgawan, Aligarh',
      shortDescription,
      fullDescription,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    });

    res.status(201).json({ success: true, message: 'Event created successfully', event });
  } catch (error) {
    next(error);
  }
};

// @desc   Update Event
// @route  PATCH /api/events/:id
// @access Private
export const updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const allowedFields = ['title', 'eventDate', 'eventTime', 'location', 'shortDescription', 'fullDescription', 'coverImage', 'isPublished'];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    if (updateData.title && updateData.title !== event.title && !updateData.slug) {
      updateData.slug = slugify(updateData.title);
    }

    event = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Event updated successfully', event });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete Event
// @route  DELETE /api/events/:id
// @access Private
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};
