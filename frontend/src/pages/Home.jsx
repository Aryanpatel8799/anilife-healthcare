import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, Award, Users, Truck, Heart, CheckCircle, 
  Star, Quote, Play, Calendar, Phone, Mail, MapPin, 
  Stethoscope, Leaf, Target, TrendingUp, Clock, Globe,
  Fish, Bird, Dog, Zap, Building2, FlaskConical, Factory
} from 'lucide-react';
import SEO from '../components/SEO';

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      location: "Punjab Dairy Farm",
      initials: "RK",
      text: "AniLife's calcium supplements improved our milk production by 25%. The quality is exceptional and results are consistent.",
      rating: 5
    },
    {
      name: "Suresh Patel",
      location: "Gujarat Aquaculture", 
      initials: "SP",
      text: "Their aquaculture solutions transformed our fish farm. Better growth rates and healthier stock with AniLife products.",
      rating: 5
    },
    {
      name: "Dr. Priya Sharma",
      location: "Delhi Pet Clinic",
      initials: "PS",
      text: "I recommend AniLife pet supplements to all my clients. Premium quality and visible improvements in animal health.",
      rating: 5
    }
  ];

  return (
    <>
      <SEO 
        title="Home"
        description="AniLife Healthcare - Leading animal nutrition supplement company specializing in high-quality supplements for cattle, aquaculture, poultry, and pets. Based in Visnagar, Gujarat with international exports."
        keywords="animal nutrition supplements, cattle supplements, aquaculture supplements, poultry supplements, pet supplements, livestock health, animal healthcare, Gujarat animal nutrition, veterinary supplements, feed additives, dairy cattle nutrition, fish farming supplements, poultry nutrition, pet health products, animal wellness solutions, livestock nutrition consultant, farm animal supplements, organic animal nutrition, export quality supplements, FSSAI approved supplements"
        url="/"
      />
      <div className="page-container">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-100 py-16 lg:py-24 relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Elements */}
        {/* <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary-300 rounded-full animate-pulse-slow delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-100 rounded-full animate-bounce delay-500"></div>
        </div> */}
        
        <div className="max-width section-padding relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-left order-2 lg:order-1">
              <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
                🌟 Leading Animal Nutrition Supplement Company
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-secondary-900 mb-6 leading-tight">
                <span className="text-primary-600">AniLife</span><br />
                Healthcare
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-secondary-600 mb-8 leading-relaxed">
                Excellence in animal wellness through innovative, scientifically-backed nutrition supplements for 
                <span className="text-primary-600 font-semibold"> cattle, aquaculture, poultry, and pets</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link to="/products" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Explore Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/contact" className="btn-outline text-lg px-8 py-4 inline-flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Get Quote
                </Link>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1">2024</div>
                  <div className="text-sm lg:text-base text-secondary-600">Established</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1">95%</div>
                  <div className="text-sm lg:text-base text-secondary-600">Customer Satisfaction</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1">Global</div>
                  <div className="text-sm lg:text-base text-secondary-600">Reach</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1">Expert</div>
                  <div className="text-sm lg:text-base text-secondary-600">Team</div>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                {/* Main Hero Image */}
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 lg:p-12 shadow-2xl">
                  <img 
                    src="./happy-cow-illustration-while-farmer-milking_9645-1436 2.AVIF" 
                    alt="Animal healthcare and nutrition supplements"
                    className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
                  />
                  
                  {/* Floating Stats Cards */}
                  <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-bold text-secondary-900">500+</div>
                        <div className="text-xs text-secondary-600">Happy Customers</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-secondary-900">100%</div>
                        <div className="text-xs text-secondary-600">Quality Assured</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -z-10 top-8 right-8 w-32 h-32 bg-primary-200 rounded-full opacity-50"></div>
                <div className="absolute -z-10 -bottom-8 -left-8 w-24 h-24 bg-secondary-200 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-width section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
                Our Purpose
              </div>
              <h2 className="text-4xl font-bold text-secondary-900 mb-8">Mission & Vision</h2>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-primary-50 to-white p-6 rounded-xl border-l-4 border-primary-500">
                  <h3 className="text-xl font-semibold text-secondary-800 mb-3 flex items-center">
                    <Target className="w-6 h-6 text-primary-600 mr-3" />
                    Mission
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    To enhance animal health and productivity through innovative, scientifically-backed nutrition supplements. 
                    Provide safe, effective, and affordable solutions that improve animal life and support farmers & pet owners.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-primary-50 to-white p-6 rounded-xl border-l-4 border-primary-500">
                  <h3 className="text-xl font-semibold text-secondary-800 mb-3 flex items-center">
                    <Globe className="w-6 h-6 text-primary-600 mr-3" />
                    Vision
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    To be a globally recognized leader in animal nutrition, setting industry standards for quality, innovation, 
                    and customer service. Ensure every animal receives optimal nutrition for a healthier, more productive life.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 lg:p-12 relative shadow-xl">
                {/* Happy Animals Illustration */}
                <div className="mb-6 relative">
                  <img 
                    src="/image.png" 
                    alt="Happy farm animals - cattle, sheep, chickens representing AniLife Healthcare's commitment to animal wellness"
                    className="w-full max-w-md mx-auto h-64 lg:h-80 object-contain rounded-2xl"
                  />
                  {/* Floating elements for enhanced visual appeal */}
                  <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                    <Heart className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 bg-white rounded-full p-2 shadow-lg">
                    <Shield className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-secondary-800 mb-4">Partner with AniLife Healthcare</h3>
                <p className="text-lg text-secondary-600 mb-6">
                  for innovative animal nutrition solutions that drive results
                </p>
                
                {/* Enhanced stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-3 shadow-md">
                    <div className="text-xl font-bold text-primary-600">2024</div>
                    <div className="text-xs text-secondary-600">Established</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-md">
                    <div className="text-xl font-bold text-primary-600">500+</div>
                    <div className="text-xs text-secondary-600">Happy Clients</div>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Since 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AniLife Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-width section-padding">
          <div className="text-center mb-16">
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">
              Why Choose AniLife Healthcare
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Excellence in animal wellness through quality assurance, scientific innovation, and global reach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Quality Assurance",
                description: "Rigorous testing, certified facilities, expert team ensuring the highest standards",
                features: ["GMP Compliance", "FSSAI License", "Expert Testing"]
              },
              {
                icon: FlaskConical,
                title: "Scientific Innovation",
                description: "Research-driven formulations based on latest nutritional science",
                features: ["R&D Based", "Custom Solutions", "Proven Results"]
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Export-ready, international partnerships, consistent quality worldwide",
                features: ["FIEO Certified", "APEDA Registration", "Multiple Countries"]
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-4">{feature.title}</h3>
                <p className="text-secondary-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-secondary-700">
                      <CheckCircle className="w-4 h-4 text-primary-500 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Range Section */}
      <section className="py-20 bg-white">
        <div className="max-width section-padding">
          <div className="text-center mb-16">
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Our Solutions
            </div>
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">Product Range</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Comprehensive nutrition solutions for all your animals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Cattle Supplements",
                description: "Calcium boosters, multivitamins, digestive health enhancers",
                color: "bg-red-50 text-red-600"
              },
              {
                icon: Fish,
                title: "Aquaculture Solutions",
                description: "Water-soluble feed additives for fish & shrimp growth, immunity, water quality",
                color: "bg-blue-50 text-blue-600"
              },
              {
                icon: Bird,
                title: "Poultry Products",
                description: "Vitamin complexes, calcium supplements, immunity boosters for egg & meat quality",
                color: "bg-yellow-50 text-yellow-600"
              },
              {
                icon: Dog,
                title: "Pet Care",
                description: "Premium supplements for dogs, cats & pets – joint health, coat shine, digestion, vitality",
                color: "bg-green-50 text-green-600"
              }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-800 mb-3">{category.title}</h3>
                <p className="text-secondary-600 text-sm leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-width section-padding">
          <div className="text-center mb-16">
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Featured Products
            </div>
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">Our Signature Solutions</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Advanced formulations for optimal animal health and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Calcium Supplements",
                description: "For bone health, milk production, deficiency prevention",
                icon: Heart,
                features: ["Enhanced milk production", "Stronger bones", "Disease prevention"]
              },
              {
                title: "Multivitamin Liquid",
                description: "Vitamins A, D, E, B-complex – immunity, growth, reproduction",
                icon: Zap,
                features: ["Complete nutrition", "Immune support", "Growth enhancement"]
              },
              {
                title: "Liver Tonic",
                description: "Herbal detox & digestion support",
                icon: Leaf,
                features: ["Natural detox", "Digestive health", "Liver protection"]
              }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                  <product.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-3">{product.title}</h3>
                <p className="text-secondary-600 mb-4">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-secondary-700">
                      <CheckCircle className="w-4 h-4 text-primary-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/products" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center">
                  Learn More
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Global Reach & Certifications */}
      <section className="py-20 bg-white">
        <div className="max-width section-padding">
          <div className="text-center mb-16">
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Global Excellence
            </div>
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">Global Reach & Certifications</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Trusted worldwide with international certifications and export excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-secondary-800 mb-6">Global Presence</h3>
              <p className="text-lg text-secondary-600 mb-6">
                Exporting to multiple countries with consistent quality and international partnerships
              </p>
              <div className="space-y-4">
                {[
                  "Export to multiple countries",
                  "International quality standards",
                  "Global distribution network",
                  "Consistent quality worldwide"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Globe className="w-5 h-5 text-primary-500 mr-3" />
                    <span className="text-secondary-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-secondary-800 mb-6">Our Certifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "FIEO", desc: "Export Excellence" },
                  { name: "APEDA", desc: "Registration" },
                  { name: "GMP", desc: "Compliance" },
                  { name: "FSSAI", desc: "License" }
                ].map((cert, index) => (
                  <div key={index} className="bg-primary-50 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="font-semibold text-secondary-800">{cert.name}</div>
                    <div className="text-sm text-secondary-600">{cert.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-width section-padding">
          <div className="text-center mb-16">
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Custom Solutions
            </div>
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">
              We Manufacture According to Your Needs
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              From consultation to delivery - complete custom solutions for your specific requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Identify health/nutrition needs through expert assessment",
                icon: Stethoscope
              },
              {
                step: "02", 
                title: "Formulation",
                description: "Custom R&D-based product development tailored to your needs",
                icon: FlaskConical
              },
              {
                step: "03",
                title: "Production",
                description: "State-of-the-art manufacturing & timely delivery",
                icon: Factory
              },
              {
                step: "04",
                title: "Delivery",
                description: "Global distribution & shipping to your location",
                icon: Truck
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="bg-primary-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm absolute -top-2 -right-2">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-800 mb-3">{item.title}</h3>
                  <p className="text-secondary-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-width section-padding">
          <div className="text-center mb-16">
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Success Stories
            </div>
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Real experiences from veterinarians, farmers, and pet owners who trust AniLife Healthcare
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary-50 to-white rounded-2xl p-8 md:p-12 relative shadow-lg">
              <Quote className="w-12 h-12 text-primary-500 mb-6" />
              <p className="text-xl text-secondary-700 mb-8 leading-relaxed">
                "{testimonials[activeTestimonial].text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center text-xl font-bold mr-4">
                    {testimonials[activeTestimonial].initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-800">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-secondary-600">{testimonials[activeTestimonial].location}</p>
                  </div>
                </div>
                
                <div className="flex">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === activeTestimonial ? 'bg-primary-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
   
      {/* CTA Section */}
     
      </div>
    </>
  );
};

export default Home;
