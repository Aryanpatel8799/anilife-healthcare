const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Create or update admin user
const createAdmin = async () => {
  try {
    await connectDB();

    const adminData = {
      username: 'admin',
      email: 'admin@anilifehealthcare.com',
      password: 'anilifehealthcare@2024',
      role: 'super_admin'
    };

    // Try to find admin by username or email
    const existingAdmin = await Admin.findOne({ 
      $or: [
        { email: adminData.email },
        { username: adminData.username }
      ]
    });

    if (existingAdmin) {
      // Update existing admin
      existingAdmin.username = adminData.username;
      existingAdmin.email = adminData.email;
      existingAdmin.password = adminData.password; // This will trigger the pre-save hook to hash the password
      existingAdmin.role = adminData.role;
      
      await existingAdmin.save();
      console.log('✅ Admin user updated successfully!');
      console.log(`📧 Email: ${adminData.email}`);
      console.log(`🔑 Password: ${adminData.password}`);
      console.log(`👤 Username: ${adminData.username}`);
    } else {
      // Create new admin
      const admin = new Admin(adminData);
      await admin.save();
      console.log('✅ Admin user created successfully!');
      console.log(`📧 Email: ${adminData.email}`);
      console.log(`🔑 Password: ${adminData.password}`);
      console.log(`👤 Username: ${adminData.username}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

// Run the script
createAdmin();
