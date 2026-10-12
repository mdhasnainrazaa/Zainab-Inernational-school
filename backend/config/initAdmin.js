import User from '../models/User.js';

/**
 * Automatically syncs or creates Admin user from .env credentials on server startup
 */
export const syncAdminUser = async () => {
  try {
    const adminEmail = (
      process.env.ADMIN_EMAIL ||
      process.env.ADMIN_GMAIL ||
      process.env.ADMIN_USER ||
      process.env.ADMIN_USERNAME
    )?.trim().toLowerCase();

    const adminPassword = (
      process.env.ADMIN_PASSWORD ||
      process.env.ADMIN_PASS ||
      process.env.ADMIN_PWD
    )?.trim();

    if (!adminEmail || !adminPassword) {
      return;
    }

    let admin = await User.findOne({ email: adminEmail }).select('+password');

    if (!admin) {
      // Create new Admin user
      admin = await User.create({
        name: process.env.ADMIN_NAME || 'ZIPS Administrator',
        email: adminEmail,
        password: adminPassword,
        role: 'SUPER_ADMIN',
        isActive: true,
      });
      console.log(`👑 [Admin Setup]: Admin account created in database for: ${adminEmail}`);
    } else {
      // Update password / role if changed in .env
      const isMatch = await admin.matchPassword(adminPassword);
      if (!isMatch || admin.role !== 'SUPER_ADMIN' || !admin.isActive) {
        admin.password = adminPassword; // pre-save hook will bcrypt hash it
        admin.role = 'SUPER_ADMIN';
        admin.isActive = true;
        await admin.save();
        console.log(`👑 [Admin Setup]: Admin credentials synchronized in database for: ${adminEmail}`);
      } else {
        console.log(`👑 [Admin Setup]: Admin verified in database for: ${adminEmail}`);
      }
    }
  } catch (error) {
    console.error(`⚠️ [Admin Setup Error]: ${error.message}`);
  }
};
