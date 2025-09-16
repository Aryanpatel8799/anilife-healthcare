# Anilife Healthcare Backend API

A comprehensive backend API for Anilife Healthcare, a cattle healthcare & feed supplement company built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **Authentication**: JWT-based admin authentication with bcrypt password hashing
- **Product Management**: Full CRUD operations for products with image upload via Cloudinary
- **Inquiry System**: Customer inquiry submission with email notifications
- **Admin Dashboard**: Statistics, analytics, and activity tracking
- **Security**: Comprehensive security with helmet, CORS, rate limiting, and input validation
- **File Upload**: Image upload handling with Multer and Cloudinary integration
- **Email Service**: Automated email notifications using Nodemailer

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Cloudinary
- **Email**: Nodemailer
- **Security**: bcrypt, helmet, CORS, express-rate-limit
- **Validation**: validator, Mongoose validation

## 📁 Project Structure

```
backend/
├── config/
│   ├── db.js                 # MongoDB connection
│   └── cloudinary.js         # Cloudinary configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── productController.js  # Product management
│   ├── inquiryController.js  # Inquiry handling
│   └── adminController.js    # Admin dashboard
├── models/
│   ├── Admin.js              # Admin user model
│   ├── Product.js            # Product model
│   └── Inquiry.js            # Inquiry model
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── productRoutes.js      # Product routes
│   ├── inquiryRoutes.js      # Inquiry routes
│   └── adminRoutes.js        # Admin routes
├── middlewares/
│   ├── authMiddleware.js     # JWT authentication
│   ├── errorMiddleware.js    # Error handling
│   └── uploadMiddleware.js   # File upload handling
├── utils/
│   └── sendEmail.js          # Email utilities
├── .env                      # Environment variables
├── server.js                 # Main server file
└── package.json              # Dependencies
```

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=your_admin_email@gmail.com
ADMIN_EMAIL_PASS=your_admin_email_password
NODE_ENV=development
```

4. **Run the application**
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new admin (restricted after first admin)
- `POST /login` - Admin login
- `GET /profile` - Get admin profile (Protected)
- `PUT /profile` - Update admin profile (Protected)

### Product Routes (`/api/products`)
- `GET /` - Get all products (Public, with pagination & filtering)
- `GET /categories` - Get product categories (Public)
- `GET /:id` - Get single product (Public)
- `POST /` - Create product (Protected, with image upload)
- `PUT /:id` - Update product (Protected, with image upload)
- `DELETE /:id` - Delete product (Protected)

### Inquiry Routes (`/api/inquiries`)
- `POST /` - Submit inquiry (Public, rate limited)
- `GET /` - Get all inquiries (Protected, with pagination & filtering)
- `GET /:id` - Get single inquiry (Protected)
- `PUT /:id/status` - Update inquiry status (Protected)
- `PUT /bulk` - Bulk update inquiries (Protected)
- `DELETE /:id` - Delete inquiry (Protected)

### Admin Routes (`/api/admin`)
- `GET /stats` - Dashboard statistics (Protected)
- `GET /analytics/inquiries` - Inquiry analytics (Protected)
- `GET /activities` - Recent activities (Protected)
- `GET /system` - System information (Protected)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **CORS**: Configured for specific origins
- **Helmet**: Security headers
- **Input Validation**: Mongoose and validator-based validation
- **Error Handling**: Centralized error management

## 📧 Email Features

- **Inquiry Notifications**: Automatic email to admin on new inquiries
- **Welcome Emails**: Welcome email for new admin registration
- **HTML Templates**: Styled email templates

## 🖼️ Image Upload

- **Cloudinary Integration**: Cloud-based image storage
- **Image Optimization**: Automatic resizing and compression
- **File Validation**: Type and size validation
- **Error Handling**: Comprehensive upload error management

## 📊 Dashboard Features

- **Statistics**: Products, inquiries, status counts
- **Analytics**: Time-based inquiry trends
- **Recent Activities**: Latest products and inquiries
- **System Info**: Server and database statistics

## 🚀 Deployment

### Prerequisites
- MongoDB Atlas account
- Cloudinary account
- Email service (Gmail with App Password)

### Environment Setup
1. Set up MongoDB Atlas cluster
2. Configure Cloudinary account
3. Set up email service
4. Update environment variables for production

### Deployment Platforms
- **Render**: Easy deployment with automatic builds
- **Heroku**: Classic cloud platform
- **Railway**: Modern deployment platform
- **DigitalOcean**: VPS deployment

## 🔧 API Usage Examples

### Register Admin
```javascript
POST /api/auth/register
{
  "username": "admin",
  "email": "admin@anilife.com",
  "password": "securepassword"
}
```

### Create Product
```javascript
POST /api/products
Headers: {
  "Authorization": "Bearer <token>",
  "Content-Type": "multipart/form-data"
}
Body: {
  "name": "Cattle Feed Supplement",
  "description": "High-quality feed supplement for cattle",
  "category": "Feed Supplements",
  "price": 299.99,
  "features": ["Vitamin enriched", "Organic", "Improves digestion"],
  "image": <file>
}
```

### Submit Inquiry
```javascript
POST /api/inquiries
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I need information about your products",
  "subject": "Product Information"
}
```

## 📈 Performance & Scalability

- **Database Indexing**: Optimized queries with proper indexes
- **Pagination**: Efficient data loading with pagination
- **Caching**: Ready for Redis integration
- **Rate Limiting**: Protection against abuse
- **Memory Management**: Optimized for production use

## 🐛 Error Handling

- **Global Error Handler**: Centralized error management
- **Custom Error Messages**: User-friendly error responses
- **Validation Errors**: Detailed validation feedback
- **Logging**: Comprehensive error logging

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Test coverage
npm run coverage
```

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Anilife Healthcare Backend API** - Empowering cattle healthcare management through technology.
