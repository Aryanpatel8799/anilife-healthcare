import React from 'react';
import { Award, Building2, Zap, Factory } from 'lucide-react';
import SEO from '../components/SEO';

const OurCompanies = () => {
  return (
    <>
      <SEO 
        title="Our Companies"
        description="Learn about our parent companies - Ganesh Oil Industry and Gajanand Oil Industry. Built on 27+ years of industry excellence in cotton seed processing and oil production."
        keywords="ganesh oil industry, gajanand oil industry, cotton seed processing, oil production, agricultural expertise, parent companies, industrial experience, cotton seed cake, oil business, agricultural products"
        url="/our-companies"
      />
      <div className="page-container">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-primary-100 py-20">
          <div className="max-width section-padding">
            <div className="text-center">
              <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
                <Building2 className="w-4 h-4 inline mr-2" />
                Our Companies
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-secondary-900 mb-8">
                Built on <span className="text-primary-600">27+ Years</span> of Industry Excellence
              </h1>
              <p className="text-2xl text-secondary-600 max-w-4xl mx-auto leading-relaxed mb-8">
                AniLife Healthcare is backed by decades of agricultural expertise through our established parent companies
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-lg text-secondary-700">
                <div className="flex items-center">
                  <Factory className="w-5 h-5 text-primary-600 mr-2" />
                  Cotton Seed Processing Excellence
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-primary-600 mr-2" />
                  Industry Leadership Since 1997
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-white">
          <div className="max-width section-padding">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl mb-12">
                <div className="space-y-6">
                  <p className="text-lg text-secondary-600 leading-relaxed">
                    AniLife Healthcare stands on the strong foundation of decades of industry expertise through our parent companies, 
                    <strong className="text-primary-700"> Ganesh Oil Industry</strong> and <strong className="text-primary-700">Gajanand Oil Industry</strong>. 
                    For over 27 years, these established enterprises have been leaders in the cotton seed cake and oil business, building a reputation 
                    for quality, reliability, and deep understanding of agricultural needs.
                  </p>
                  <p className="text-lg text-secondary-600 leading-relaxed">
                    This rich heritage in agricultural products and processing has given us invaluable insights into the nutritional 
                    requirements of farm animals and the challenges faced by farmers. Our transition into animal healthcare supplements 
                    is a natural evolution, leveraging decades of experience in agricultural nutrition and quality processing.
                  </p>
                  <p className="text-lg text-secondary-600 leading-relaxed">
                    The trust and relationships built over 27+ years in the agricultural sector form the cornerstone of AniLife Healthcare's 
                    commitment to excellence. We bring the same dedication to quality, customer service, and innovation that has made 
                    our parent companies successful for nearly three decades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Heritage Stats */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-width section-padding">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-secondary-900 mb-6">Our Heritage in Numbers</h2>
                <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                  Decades of excellence and industry leadership
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-primary-100">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-4xl font-bold text-primary-600 mb-2">27+</div>
                  <div className="text-secondary-800 font-semibold mb-1">Years of Experience</div>
                  <div className="text-sm text-secondary-500">Industry Leadership</div>
                </div>
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-primary-100">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Factory className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-4xl font-bold text-primary-600 mb-2">2</div>
                  <div className="text-secondary-800 font-semibold mb-1">Established Companies</div>
                  <div className="text-sm text-secondary-500">Ganesh & Gajanand Oil</div>
                </div>
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-primary-100">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
                  <div className="text-secondary-800 font-semibold mb-1">Agricultural Focus</div>
                  <div className="text-sm text-secondary-500">Cotton Seed Expertise</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Highlight Cards */}
        <section className="py-20 bg-white">
          <div className="max-width section-padding">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-secondary-900 mb-6">Our Parent Companies</h2>
                <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                  Two pillars of excellence in agricultural processing and oil production
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-white to-primary-50 border border-primary-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                      <Building2 className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-800">Ganesh Oil Industry</h3>
                  </div>
                  <p className="text-primary-700 leading-relaxed mb-6">
                    Pioneer in cotton seed processing and oil production, established with a commitment to quality 
                    and agricultural excellence. Leading the industry with innovative processing techniques and 
                    sustainable practices.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-primary-800">Advanced Processing Technology</div>
                        <div className="text-sm text-primary-600">State-of-the-art equipment for maximum yield</div>
                      </div>
                    </div>
                   
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-primary-800">Market Leadership</div>
                        <div className="text-sm text-primary-600">Trusted supplier in regional markets</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">Cotton Seed Processing</span>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">Oil Production</span>
                    {/* <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">Quality Excellence</span> */}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-primary-50 border border-primary-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                      <Building2 className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-800">Gajanand Oil Industry</h3>
                  </div>
                  <p className="text-primary-700 leading-relaxed mb-6">
                    Complementing our expertise in cotton seed cake and oil business, strengthening our 
                    agricultural industry presence. Focused on expanding market reach and enhancing 
                    product quality standards.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-primary-800">Market Expansion</div>
                        <div className="text-sm text-primary-600">Growing presence in new territories</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-primary-800">Customer Relations</div>
                        <div className="text-sm text-primary-600">Strong partnerships with agricultural community</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">Agricultural Products</span>
                    {/* <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">Industry Expertise</span> */}
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">Market Leadership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default OurCompanies;
