"use client";
import { ChevronDownIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";

// Navigation items data
const navigationItems = [
  { name: "HOME", active: true, hasDropdown: false },
  { name: "ABOUT", active: false, hasDropdown: false },
  { 
    name: "TEAMS", 
    active: false, 
    hasDropdown: true,
    dropdownItems: ["PROPULSION", "GSE", "AVIONICS"]
  },
  { 
    name: "PROJECTS", 
    active: false, 
    hasDropdown: true,
    dropdownItems: ["MOJAVE SPINE", "TVC"]
  },
  { name: "CONTACT", active: false, hasDropdown: false }
];

export default function HomePage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations on component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDropdownMouseEnter = (itemName: string) => {
    setHoveredItem(itemName);
    setActiveDropdown(itemName);
  };

  const handleDropdownMouseLeave = () => {
    setHoveredItem(null);
    setActiveDropdown(null);
  };

  return (
    <div className="bg-[#4f679a] w-full min-h-screen">
      <header className="w-full overflow-hidden">
        <div className="relative h-[1010px]">
          {/* Blue background layer */}
          <div className="absolute inset-0 bg-[#4f679a]" />
          
          {/* Fire background image with opacity */}
          <div 
            className="absolute inset-0 bg-[url(/fire.png)] bg-cover bg-[50%_50%] opacity-70"
          />
          {/* Logo with 2-second slide-in animation */}
          <div
            className={`absolute w-[113px] h-[121px] top-[58px] transition-all duration-[2000ms] ease-out ${
              isLoaded ? 'left-[71px] opacity-100' : 'left-[-400px] opacity-0'
            }`}
          >
            <Image
              alt="Blue Horizon Logo"
              src="/g3.png"
              width={113}
              height={121}
              priority
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* Navigation container with 2-second slide-in animation */}
          <div className={`absolute top-[85px] transition-all duration-[2000ms] ease-out ${
            isLoaded ? 'left-[247px] opacity-100' : 'left-[-800px] opacity-0'
          }`}>
            <NavigationMenu className="max-w-none">
              <NavigationMenuList className="flex items-center space-x-12 relative">
                {navigationItems.map((item, index) => (
                  <NavigationMenuItem 
                    key={index}
                    className={`relative transition-all duration-[2000ms] ease-out ${
                      isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-[-50px] opacity-0'
                    }`}
                    onMouseEnter={() => {
                      setHoveredItem(item.name);
                      if (item.hasDropdown) {
                        setActiveDropdown(item.name);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredItem(null);
                      if (item.hasDropdown) {
                        setActiveDropdown(null);
                      }
                    }}
                  >
                    <NavigationMenuLink
                      className={`[text-shadow:0px_4px_4px_#00000040] font-['PCap_Terminal'] font-normal text-2xl tracking-[1.20px] leading-[normal] whitespace-nowrap relative cursor-pointer flex items-center transition-colors duration-300 ${
                        hoveredItem === item.name ? 'text-[#0033a0]' : 'text-white'
                      }`}
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <ChevronDownIcon className="inline-block ml-2 w-4 h-4" />
                      )}
                    </NavigationMenuLink>

                    {/* Dropdown Menu with extended hover area */}
                    {item.hasDropdown && activeDropdown === item.name && (
                      <div 
                        className="absolute top-full left-0 pt-2 z-50"
                        onMouseEnter={() => handleDropdownMouseEnter(item.name)}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="bg-transparent py-2 min-w-[160px] animate-in fade-in-0 slide-in-from-top-2 duration-200">
                          {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                            <div
                              key={dropdownIndex}
                              className="px-4 py-2 text-white hover:text-[#0033a0] cursor-pointer transition-colors duration-300 ease-out font-['PCap_Terminal'] text-lg tracking-wide"
                            >
                              {dropdownItem}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Hero Text with 2-second slide-in animation */}
          <div className={`absolute w-[822px] h-[130px] top-[415px] transition-all duration-[2000ms] ease-out ${
            isLoaded ? 'left-[105px] opacity-100' : 'left-[-1000px] opacity-0'
          }`}>
            <h1 className="absolute h-[110px] top-0 left-0 font-['PCap_Terminal'] font-bold text-[#0033a0] text-8xl tracking-[4.80px] leading-[normal] whitespace-nowrap">
              BLUE HORIZON
            </h1>
            <p className="absolute h-[41px] top-[89px] left-0 font-['PCap_Terminal'] font-normal text-white text-4xl tracking-[1.80px] leading-[normal] whitespace-nowrap">
              USAFA Collegiate Rocketry Club
            </p>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-[80px] left-1/2 transform -translate-x-1/2 cursor-pointer">
            <ChevronDownIcon className="w-[26px] h-[18px] text-white animate-bounce" />
          </div>
        </div>
      </header>
    </div>
  );
}