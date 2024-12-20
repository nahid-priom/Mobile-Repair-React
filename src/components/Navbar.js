import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faPhoneAlt, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFacebook} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

import logo from "../assets/logo.jpeg";


export const navLinks = [
 
  { id: "service", title: "Services" },
  { id: "about", title: "About" },
  { id: "blog", title: "Blogs" },
  { id: "contact", title: "Contact" },
  {id: "bodyoils", title: "Body Oils"}
];



const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [navbarShadow, setNavbarShadow] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://phonespotbackend.blacktechcorp.com/api");
  
       
        const fetchedCategories = response.data.categories.map((category) => ({
          name: category.name,
          slug: category.slug, 
          image: `https://phonespotbackend.blacktechcorp.com/${category.image}`, 
          shortDescription: category.short_description, 
        }));
  
        setCategories(fetchedCategories); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories(); 
  }, []);
  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarShadow(true);
      } else {
        setNavbarShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    const currentNav = navLinks.find((nav) => nav.id === currentPath);
    if (currentNav) {
      setActive(currentNav.title);
    } else {
      setActive("Home");
    }
  }, [location]);

  return (
    <section className="bg-white">
      
      

      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow ${
          navbarShadow ? "shadow-lg" : ""
        }`}
      >
        <div className="bg-red-600 py-1 pt-2">
        <div className="max-w-7xl mx-auto px-4 lg:px-0 flex justify-between items-center">
          <div className="flex space-x-4">
            <Link to="https://www.facebook.com/phonespotshop" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="text-white text-lg" />
            </Link>
           
          </div>
          <div className="flex gap-4 lg:space-x-12 justify-center items-center text-white text-sm">
            <span className="hidden md:block">Mon-Sat: 10:00 AM - 9:00 PM</span>
            <Link to="tel:+1(240)-696-5671" className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhoneAlt} className="text-xl font-bold animate-bounce" />
              <span className="text-base lg:text-xl font-bold">+1 (240)-696-5671</span>
            </Link>
          </div>
        </div>
      </div>
        <div className="max-w-7xl px-4 lg:px-0 mx-auto flex py-3 justify-between items-center">
          <Link to={"/"}>
            <img src={logo} alt="Logo" className="w-[120px] h-[60px] lg:w-[140px] lg:h-[70px]" />
          </Link>

          <ul className="list-none sm:flex hidden justify-center items-center">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] relative ${
                  active === nav.title ? "text-red-500" : "text-black"
                } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                onMouseEnter={() => nav.id === "service" && setServiceDropdownOpen(true)}
                onMouseLeave={() => nav.id === "service" && setServiceDropdownOpen(false)}
                onClick={() => setActive(nav.title)}
              >
                <Link className="text-lg relative" to={`/${nav.id}`}>
                  {nav.title}
                  {nav.id === "service" && <FontAwesomeIcon icon={faChevronDown} className="ml-2" />}
                  {active === nav.title && <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-red-600"></span>}
                </Link>
                {nav.id === "service" && serviceDropdownOpen && (
                  <ul className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md z-10">
                    {categories.map((category) => (
                      <li
                        key={category.name}
                        className="relative hover:bg-red-600 border-b border-red-400 p-4 hover:text-white items-center py-2"
                      >
                        <Link to={`/service/${category.slug}`} className="flex items-center w-full">
                          <img src={category.image} alt={category.name} className="w-8 h-8 mr-2" />
                          <span className="text-black hover:text-white w-full p-1 rounded">{category.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link to="/service" className="bg-red-600 text-white px-4 py-1 rounded-md text-lg font-bold hover:bg-red-600">
            Repair Now
          </Link>

          {/* Sidebar for mobile */}
          <div className="sm:hidden flex justify-end items-center">
            <FontAwesomeIcon
              icon={toggle ? faTimes : faBars}
              className="w-[28px] h-[28px] pr-4 text-black cursor-pointer"
              onClick={() => setToggle((prev) => !prev)}
            />
            <div
              className={`fixed top-0 right-0 h-full w-[250px] rounded-bl-2xl bg-black p-6 z-50 transition-transform duration-300 ${
                toggle ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="absolute top-6 right-6">
                <FontAwesomeIcon
                  icon={faTimes}
                  className="w-[32px] h-[32px] text-white cursor-pointer"
                  onClick={() => setToggle(false)}
                />
              </div>
              <ul className="list-none flex flex-col justify-start items-center h-auto space-y-6 mt-20">
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[18px] relative ${
                      active === nav.title ? "text-red-500" : "text-dimWhite"
                    }`}
                    onClick={() => {
                      if (nav.id === "service") {
                        setServiceDropdownOpen((prev) => !prev);
                      } else {
                        setActive(nav.title);
                        setToggle(false);
                      }
                    }}
                  >
                    <Link
                      to={nav.id === "service" ? "#" : `/${nav.id}`}
                      className="relative text-xl flex items-center"
                      onClick={() => nav.id !== "service" && setToggle(false)}
                    >
                      {nav.title}
                      {nav.id === "service" && (
                        <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                      )}
                      {active === nav.title && (
                        <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-white"></span>
                      )}
                    </Link>
                    {nav.id === "service" && serviceDropdownOpen && (
                      <ul className="ml-4 bg-white p-2 rounded-xl hover:bg-red-500 mt-2">
                        {categories.map((category) => (
                          <li
                            key={category.name}
                            className="flex items-center py-2 border-b border-red-400 cursor-pointer"
                          >
                            <Link
                              to={`/service/${category.slug}`}
                              className="flex items-center w-full"
                              onClick={() => {
                                setToggle(false);
                                setServiceDropdownOpen(false);
                              }}
                            >
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-8 h-8 mr-2"
                              />
                              <span className="text-black hover:text-white w-full p-1 rounded">
                                {category.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
