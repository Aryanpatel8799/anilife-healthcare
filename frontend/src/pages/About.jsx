import React from 'react';
import { Award, Users, Heart, CheckCircle, Globe, Factory, Building2 } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about AniLife Healthcare - Leading animal nutrition supplement company established in 2024. Specializing in cattle, aquaculture, poultry, and pet supplements with international certifications and global reach."
        keywords="about anilife healthcare, animal nutrition company, livestock supplement manufacturer, Gujarat animal health company, cattle supplement supplier, aquaculture nutrition expert, poultry supplement specialist, pet nutrition company, animal wellness solutions, veterinary supplement manufacturer, export quality animal supplements, FSSAI licensed company, GMP certified supplements, international animal nutrition"
        url="/about"
      />
      <div className="page-container">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-100 py-20">
        <div className="max-width section-padding">
          <div className="text-center">
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Established 2024
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-secondary-900 mb-8">
              About <span className="text-primary-600">AniLife Healthcare</span>
            </h1>
            <p className="text-2xl text-secondary-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Leading Animal Nutrition Supplement Company specializing in high-quality supplements 
              for cattle, aquaculture, poultry, and pets
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg text-secondary-700">
              <div className="flex items-center">
                <Building2 className="w-5 h-5 text-primary-600 mr-2" />
                Domestic & International Markets
              </div>
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-primary-600 mr-2" />
                Excellence in Animal Wellness
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-width section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Company Overview
            </div>
            <h2 className="text-4xl font-bold text-secondary-900 mb-8">
              Our Story
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-secondary-600 leading-relaxed">
                <strong>AniLife Healthcare</strong> was born from a simple yet powerful vision: to revolutionize animal nutrition and create a healthier world for all creatures. Founded in 2024 by a team of passionate veterinarians, nutritionists, and animal welfare advocates, we recognized a critical gap in the market for truly effective, scientifically-backed animal supplements.
              </p>
              <p className="text-lg text-secondary-600 leading-relaxed">
                What started as a mission to help local farmers improve their livestock health has evolved into a comprehensive solution provider serving cattle, aquaculture, poultry, and pet owners across the globe. Our journey is driven by countless success stories – from dairy farmers seeing 25% increased milk production to pet owners watching their companions regain vitality and energy.
              </p>
              <p className="text-lg text-secondary-600 leading-relaxed">
                Today, we stand as a testament to the power of innovation, dedication, and genuine care for animal welfare. Every product we develop undergoes rigorous testing, adheres to international standards, and carries the promise of improving lives – both animal and human. Our commitment extends beyond business; it's about creating a sustainable future where animals thrive and communities prosper.
              </p>
              <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg mt-8">
                <p className="text-lg text-primary-800 font-medium italic">
                  "We believe that healthy animals are the foundation of a healthy planet. Every supplement we create is a step towards that vision."
                </p>
                <p className="text-sm text-primary-600 mt-2">— AniLife Healthcare Team</p>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-3xl font-bold text-primary-600">2024</div>
                <div className="text-secondary-600 text-sm">Founded</div>
                <div className="text-xs text-secondary-500 mt-1">Innovation Starts</div>
              </div>
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-3xl font-bold text-primary-600">500+</div>
                <div className="text-secondary-600 text-sm">Happy Customers</div>
                <div className="text-xs text-secondary-500 mt-1">Trust & Results</div>
              </div>
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-3xl font-bold text-primary-600">4+</div>
                <div className="text-secondary-600 text-sm">Specializations</div>
                <div className="text-xs text-secondary-500 mt-1">Complete Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-width section-padding">
          <div className="text-center mb-16">
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Our Purpose
            </div>
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">Mission & Vision</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              {/* <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-600" />
              </div> */}
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">Our Mission</h3>
              <p className="text-lg text-secondary-600 leading-relaxed">
                To enhance animal health and productivity through innovative, scientifically-backed nutrition supplements. 
                Provide safe, effective, and affordable solutions that improve animal life and support farmers & pet owners.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              {/* <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-primary-600" />
              </div> */}
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">Our Vision</h3>
              <p className="text-lg text-secondary-600 leading-relaxed">
                To be a globally recognized leader in animal nutrition, setting industry standards for quality, innovation, 
                and customer service. Ensure every animal receives optimal nutrition for a healthier, more productive life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-width section-padding">
          <div className="text-center mb-16">
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Our Excellence
            </div>
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">Why Choose AniLife Healthcare</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Excellence in animal wellness through quality assurance, scientific innovation, and global reach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                // icon: Shield,
                title: "Quality Assurance",
                description: "Rigorous testing, certified facilities, expert team ensuring the highest standards for all our products.",
                features: ["Rigorous testing protocols", "Certified facilities", "Expert team validation", "International standards"]
              },
              {
                // icon: Zap,
                title: "Scientific Innovation",
                description: "Research-driven formulations based on latest nutritional science and cutting-edge technology.",
                features: ["Research-driven formulations", "Latest nutritional science", "Custom R&D solutions", "Proven efficacy"]
              },
              {
                // icon: Globe,
                title: "Global Reach",
                description: "Export-ready products, international partnerships, and consistent quality worldwide.",
                features: ["Export-ready products", "International partnerships", "Consistent quality", "Global distribution"]
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                {/* <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div> */}
                <h3 className="text-xl font-semibold text-secondary-800 mb-4">{feature.title}</h3>
                <p className="text-secondary-600 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-secondary-700">
                      <CheckCircle className="w-4 h-4 text-primary-500 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach & Certifications */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
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

          {/* Global Presence */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                    <Globe className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900">Global Presence</h3>
                </div>
                <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                  Exporting to multiple countries with consistent quality and international partnerships
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Export to multiple countries",
                    "International quality standards", 
                    "Global distribution network",
                    "Consistent quality worldwide"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-primary-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                      <span className="text-secondary-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 text-center shadow-lg">
                  <img 
                    src="/global-reach-illustration.png" 
                    alt="Global Distribution Network - AniLife Healthcare serving customers worldwide"
                    className="w-full max-w-md mx-auto h-64 lg:h-80 object-contain rounded-xl mb-4"
                  />
                  <h4 className="text-xl font-bold text-primary-800 mb-3">International Markets</h4>
                  <p className="text-primary-600 text-lg">
                    Serving customers across continents with reliable quality
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                {/* <div className="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-primary-600" />
                </div> */}
                <h3 className="text-2xl font-bold text-secondary-900">Our Certifications</h3>
              </div>
              <p className="text-lg text-secondary-600">
                Certified excellence ensuring the highest quality standards
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  name: "FIEO", 
                  desc: "Export Excellence", 
                  color: "from-blue-500 to-blue-600",
                  logo: "/certifications/fieo-logo.png",
                  fullName: "Federation of Indian Export Organizations"
                },
                { 
                  name: "APEDA", 
                  // desc: "Registration", 
                  color: "from-green-500 to-green-600",
                  logo: "/certifications/apeda-logo.png",
                  fullName: "Agricultural & Processed Food Products Export Development Authority"
                },
                { 
                  name: "GMP", 
                  desc: "Compliance", 
                  color: "from-purple-500 to-purple-600",
                  logo: "/certifications/gmp-logo.png",
                  fullName: "Good Manufacturing Practice"
                }, 
                { 
                  name: "MSME", 
                  desc: "Registered", 
                  color: "from-red-500 to-red-600",
                  logo: "/certifications/msme-logo.png",
                  fullName: "Micro, Small & Medium Enterprises"
                }
              ].map((cert, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-xl p-6 shadow-lg transform group-hover:scale-105 transition-all duration-300 border border-gray-100">
                    <div className="relative mb-4">
                      <img 
                        src={cert.logo} 
                        alt={`${cert.name} - ${cert.fullName}`}
                        className="w-full h-20 object-contain mx-auto"
                        onError={(e) => {
                          // Fallback to icon if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className={`hidden bg-gradient-to-br ${cert.color} rounded-lg p-4 text-white text-center`}>
                        <Award className="w-8 h-8 mx-auto mb-2 text-white" />
                        <div className="text-lg font-bold">{cert.name}</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800 mb-1">{cert.name}</div>
                      <div className="text-sm text-gray-600 mb-2">{cert.desc}</div>
                      <div className="text-xs text-gray-500 leading-tight">{cert.fullName}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-white">
        <div className="max-width section-padding">
          <div className="text-center mb-16">
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Our Promise
            </div>
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">Our Commitment to Excellence</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Every product we develop reflects our dedication to animal welfare and agricultural success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Animal Welfare",
                description: "Prioritizing the health and well-being of every animal"
              },
              {
                icon: Users,
                title: "Farmer Support",
                description: "Empowering farmers with effective and reliable solutions"
              },
              {
                icon: Factory,
                title: "Quality Manufacturing",
                description: "State-of-the-art facilities ensuring consistent excellence"
              },
              {
                icon: Award,
                title: "Innovation",
                description: "Continuous research and development for better solutions"
              }
            ].map((commitment, index) => (
              <div key={index} className="text-center group">
                <div className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                  <commitment.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-800 mb-3">{commitment.title}</h3>
                <p className="text-secondary-600">{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default About;
