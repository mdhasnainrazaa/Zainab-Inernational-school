import SiteSetting from '../models/SiteSetting.js';

// @desc   Get Global Site Settings & Contact Info
// @route  GET /api/settings
// @access Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create({});
    }
    res.status(200).json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};

// @desc   Update Site Settings
// @route  PATCH /api/settings
// @access Private (Admin)
export const updateSettings = async (req, res, next) => {
  try {
    const allowedFields = [
      'schoolName', 'tagline', 'affiliationNo', 'schoolCode', 'email', 'admissionsEmail',
      'principalEmail', 'primaryPhone', 'secondaryPhone', 'whatsappNumber', 'address',
      'city', 'state', 'pincode', 'socialLinks', 'academicYear', 'admissionsOpen',
      'announcementBanner'
    ];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(updateData);
    } else {
      settings = await SiteSetting.findByIdAndUpdate(settings._id, updateData, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({ success: true, message: 'Settings updated successfully', settings });
  } catch (error) {
    next(error);
  }
};
