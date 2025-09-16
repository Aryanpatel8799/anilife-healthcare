import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { inquiryService } from '../services/inquiry';
import { validateContactForm } from '../utils/validation';
import toast from 'react-hot-toast';
import { ButtonLoader } from '../components/Loader';

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
                info: "+91 98765 43210",
                subtitle: "Mon-Sat 9:00 AM - 6:00 PM"
              },
              {
                icon: Mail,
                title: "Email Us",
                info: "info@anilife.com",
                subtitle: "We'll respond within 24 hours"
              },
              {
                icon: MapPin,
                title: "Visit Us",
                info: "Mumbai, Maharashtra",
                subtitle: "123 Agriculture Street"
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
                      placeholder="+91 98765 43210"
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
                      <p className="text-primary-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="font-medium text-secondary-800">Technical Support</p>
                      <p className="text-primary-600">+91 98765 43211</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="font-medium text-secondary-800">General Inquiries</p>
                      <p className="text-primary-600">info@anilife.com</p>
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
              Located in the heart of Mumbai's agricultural district
            </p>
          </div>

          {/* Placeholder for map - in real implementation, you would use Google Maps or similar */}
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                Anilife Healthcare
              </h3>
              <p className="text-secondary-600 mb-2">
                123 Agriculture Street, Farm District<br />
                Mumbai, Maharashtra 400001
              </p>
              <button className="btn-primary">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
