import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [sliderData, setSliderData] = useState(null); 
  const leftContentRef = useRef(null);
  const imageRef = useRef(null);

  
  useEffect(() => {
    const fetchSliderData = async () => {
      const cachedSliderData = localStorage.getItem('sliderData');
      
      
      if (cachedSliderData) {
        setSliderData(JSON.parse(cachedSliderData));
        
      } else {
        try {
          const response = await fetch('https://phonespotbackend.blacktechcorp.com/api');
          const data = await response.json();
          setSliderData(data.slider);
          
         
          localStorage.setItem('sliderData', JSON.stringify(data.slider));
          
        } catch (error) {
          console.error('Error fetching slider data:', error);
         
        }
      }
    };

    fetchSliderData();
  }, []);

  useEffect(() => {
    const handleScrollAnimation = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateX(0)';
          entry.target.style.opacity = '1';
        }
      });
    };
  
    const observer = new IntersectionObserver(handleScrollAnimation, {
      threshold: 0.5,
    });
  
    const leftContentElement = leftContentRef.current;
    const imageElement = imageRef.current;
  
    if (leftContentElement) {
      observer.observe(leftContentElement);
    }
  
    if (imageElement) {
      observer.observe(imageElement);
    }
  
    return () => {
      if (leftContentElement) {
        observer.unobserve(leftContentElement);
      }
      if (imageElement) {
        observer.unobserve(imageElement);
      }
    };
  }, []);
  

  return (
    <section className="relative bg-red-50 py-10 pt-36 lg:pt-44 pb-6 lg:pb-32">
      <div className="max-w-7xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex">
        
        
          <>
            {/* Left Content */}
            <div
              ref={leftContentRef}
              className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl opacity-0 transform -translate-x-20 transition-all duration-1000"
            >
              <h1 className="text-base text-center md:text-start text-black font-medium">
                Do you have problems with your device?<br />
                <span className="text-red-600 text-lg font-bold">Find a Solution Here!!</span>
              </h1>
              <h2 className="text-3xl px-2 lg:px-0 lg:text-4xl text-center md:text-start text-gray-800 font-extrabold md:text-5xl">
                {sliderData?.title_one}
              </h2>
              <p className="text-center md:text-start px-2 lg:px-0">{sliderData?.title_two}</p>
              <div className="items-center gap-x-3 justify-center lg:justify-start flex sm:space-y-0">
                <Link
                  to="/service"
                  className="block py-2 px-4 text-center text-white font-medium bg-red-600 duration-150 hover:bg-gray-900 rounded-lg shadow-lg hover:shadow-none"
                >
                  Our Services
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-x-2 py-2 px-4 bg-white text-black hover:text-white hover:bg-red-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
                >
                  Contact
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Image Content */}
            <div
              ref={imageRef}
              className="flex-none my-6 md:mt-0 mx-auto md:max-w-xl opacity-0 transform translate-x-20 transition-all duration-1000"
            >
              {sliderData && (
                <img
                  src={`https://phonespotbackend.blacktechcorp.com/${sliderData.image}`}
                  className="lg:rounded-2xl"
                  alt={sliderData.title_one}
                />
              )}
            </div>
          </>
       
      </div>
    </section>
  );
};

export default HeroSection;
