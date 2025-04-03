import React from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/marketplace');  
    };
    const handleClick2 = () => {
      navigate('/job');  
  };
  const handleClick3 = () => {
    navigate('/workshop');  
};
  return (
    <>
        <section className="flex flex-col lg:flex-row items-center justify-between px-4 py-12 md:px-8 md:py-16 bg-blue-50 text-blue-900">
      {/* Left Content */}
      <div className="w-full lg:max-w-2xl mb-10 lg:mb-0">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 md:mb-6">
          Empowering Women to Build, Grow, and Thrive – Together.
        </h1>
        
        {/* Subtitle */}
        <p className="text-base md:text-lg text-blue-700 mb-6 md:mb-8">
          A one-stop platform for women entrepreneurs, job seekers, and career returners. 
          Access funding, mentorship, jobs, and tools to succeed.
        </p>

        {/* Highlights */}
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
          <div className="flex items-start gap-3 md:gap-4 p-3 rounded-lg hover:bg-blue-100 transition-all duration-300">
            <span className="text-2xl hover:scale-110 transition-transform">🚀</span>
            <p className="hover:text-blue-800 transition-colors">Launch & Grow Your Business – Showcase your brand, connect with buyers, and secure funding.</p>
          </div>
          <div className="flex items-start gap-3 md:gap-4 p-3 rounded-lg hover:bg-blue-100 transition-all duration-300">
            <span className="text-2xl hover:scale-110 transition-transform">💼</span>
            <p className="hover:text-blue-800 transition-colors">Find Flexible Jobs & Internships – Discover women-friendly workplaces and restart your career.</p>
          </div>
          <div className="flex items-start gap-3 md:gap-4 p-3 rounded-lg hover:bg-blue-100 transition-all duration-300">
            <span className="text-2xl hover:scale-110 transition-transform">🎓</span>
            <p className="hover:text-blue-800 transition-colors">Learn & Upskill – Attend workshops, get certified, and gain mentorship from experts.</p>
          </div>
          <div className="flex items-start gap-3 md:gap-4 p-3 rounded-lg hover:bg-blue-100 transition-all duration-300">
            <span className="text-2xl hover:scale-110 transition-transform">💰</span>
            <p className="hover:text-blue-800 transition-colors">Financial Independence Made Easy – Calculators, budgeting tools, and funding guidance.</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10">
          <button onClick={handleClick} className="px-4 py-2 md:px-6 md:py-3 bg-white text-blue-600 font-semibold border-2 border-blue-600 rounded-lg rounded-lg hover:bg-blue-700 hover:text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Join as an Entrepreneur
          </button>
          <button  onClick={handleClick2} className="px-4 py-2 md:px-6 md:py-3 bg-white text-blue-600 font-semibold border-2 border-blue-600 rounded-lg rounded-lg hover:bg-blue-700 hover:text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Explore Job Opportunities
          </button>
          <button  onClick={handleClick3} className="px-4 py-2 md:px-6 md:py-3 text-blue-600 font-semibold underline hover:text-blue-800 hover:no-underline transition-colors duration-300">
            Become a Mentor/Investor
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="text-sm">
          <p className="text-blue-700">Supported by 10,000+ women-led businesses</p>
          <div className="flex flex-wrap gap-3 md:gap-4 mt-2">
            <span className="font-medium px-3 py-1 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">Forbes</span>
            <span className="font-medium px-3 py-1 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">UN Women</span>
            <span className="font-medium px-3 py-1 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">She Leads</span>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2 lg:pl-8">
        <div className="w-full h-64 sm:h-80 md:h-96 bg-blue-200 rounded-2xl flex items-center justify-center text-center p-6 text-blue-700 hover:shadow-xl transition-shadow duration-500">
          <div className="max-w-md">
            <div className="text-4xl mb-4">👩‍💼👩‍🔧👩‍🎓</div>
            <p>Diverse women collaborating on laptops, in workshops, and networking</p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 lg:pl-8">
        <div className="w-full h-64 sm:h-80 md:h-96 bg-blue-200 rounded-2xl flex items-center justify-center text-center p-6 text-blue-700 hover:shadow-xl transition-shadow duration-500">
          <div className="max-w-md">
            <div className="text-4xl mb-4">👩‍💼👩‍🔧👩‍🎓</div>
            <p>Diverse women collaborating on laptops, in workshops, and networking</p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Home;