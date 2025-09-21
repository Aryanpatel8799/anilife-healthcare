import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { inquiryService } from '../services/inquiry';
import { validateContactForm } from '../utils/validation';
import toast from 'react-hot-toast';
import { ButtonLoader } from '../components/Loader';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      const result = await inquiryService.submitInquiry(formData);
      if (result.success) {
        toast.success('Thank you! Your inquiry has been submitted successfully. We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setErrors({});
      } else {
        toast.error(result.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Contact AniLife Healthcare for animal nutrition supplements. Located in Visnagar, Gujarat. Call +91 93273 20094 or email Anilifehelthcare@gmail.com. Expert consultation for cattle, aquaculture, poultry & pet nutrition."
        keywords="contact anilife healthcare, animal nutrition consultant, livestock supplement expert, Gujarat animal health contact, cattle supplement consultation, aquaculture nutrition advice, poultry supplement inquiry, pet nutrition expert, animal health consultation, veterinary supplement support, livestock nutrition advice, farm animal health contact, commercial animal nutrition, bulk supplement inquiry"
        url="/contact"
      />
      <div className="page-container">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-100 py-16">
        <div className="max-width section-padding">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Contact <span className="text-primary-600">Us</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Get in touch with our team of experts. We're here to help with all your 
              cattle healthcare needs and answer any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-width section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Phone,
                title: "Call Us",
                info: "+91 93273 20094",
                subtitle: "Mon-Sat 9:00 AM - 6:00 PM"
              },
              {
                icon: Mail,
                title: "Email Us",
                info: "Anilifehelthcare@gmail.com",
                subtitle: "We'll respond within 24 hours"
              },
              {
                icon: MapPin,
                title: "Visit Us",
                info: "Mehsana , Gujarat",
                subtitle: "27-Sadguru estate,depan road visnagar,Gujarat 384315"
              },
              {
                icon: Clock,
                title: "Business Hours",
                info: "Mon - Sat",
                subtitle: "9:00 AM - 6:00 PM"
              }
            ].map((contact, index) => (
              <div key={index} className="card text-center hover:shadow-lg transition-shadow duration-300">
                <contact.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-secondary-800 mb-2">{contact.title}</h3>
                <p className="text-primary-600 font-medium mb-1">{contact.info}</p>
                <p className="text-sm text-secondary-600">{contact.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-width section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="+91 93273 20094"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Information">Product Information</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`input-field ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center py-3"
                >
                  {loading ? (
                    <ButtonLoader />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="card">
                <h3 className="text-xl font-semibold text-secondary-800 mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="font-medium text-secondary-800">Sales Inquiry</p>
                      <p className="text-primary-600">+91 93273 20094</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="font-medium text-secondary-800">Technical Support</p>
                      <p className="text-primary-600">+91 93273 20094</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="font-medium text-secondary-800">General Inquiries</p>
                      <p className="text-primary-600">anilifehelthcare@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="card">
                <h3 className="text-xl font-semibold text-secondary-800 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-secondary-800 mb-1">
                      How quickly do you respond to inquiries?
                    </h4>
                    <p className="text-sm text-secondary-600">
                      We typically respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-800 mb-1">
                      Do you provide technical support?
                    </h4>
                    <p className="text-sm text-secondary-600">
                      Yes, our team of veterinarians and specialists provides comprehensive technical support.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-800 mb-1">
                      What areas do you serve?
                    </h4>
                    <p className="text-sm text-secondary-600">
                      We serve farmers across India with our nationwide distribution network.
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
          
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-width section-padding">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-secondary-600">
              Located in Visnagar, Gujarat - Find us easily with the map below
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.123456789!2d72.529902!3d23.740691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ0JzI2LjUiTiA3MsKwMzEnNDcuNiJF!5e0!3m2!1sen!2sin!4v1726594800000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Anilife Healthcare Location"
              className="w-full h-96"
            ></iframe>
          </div>
          
          {/* Location Info Card */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <MapPin className="w-8 h-8 text-primary-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-secondary-800 mb-2">Our Address</h3>
              <p className="text-secondary-600">
                27-Sadguru estate,<br />
                Depan road, Visnagar,<br />
                Gujarat 384315
              </p>
            </div>
            
            <div className="card text-center">
              <Phone className="w-8 h-8 text-primary-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-secondary-800 mb-2">Contact Number</h3>
              <p className="text-secondary-600">
                +91 93273 20094
              </p>
            </div>
            
            <div className="card text-center">
              <Clock className="w-8 h-8 text-primary-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-secondary-800 mb-2">Business Hours</h3>
              <p className="text-secondary-600">
                Monday - Saturday<br />
                9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
          
          {/* Get Directions Button */}
          <div className="text-center mt-8">
            <a
              href="https://maps.app.goo.gl/LoFtpPiv5CH9N1wz8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Get Directions
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Contact;
