'use client';

import { useEffect, useState, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { FaHome, FaUser, FaPhone, FaTools } from "react-icons/fa";
import SideNavButton from "@/components/SideNavButton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [expandSideNav, toggleSideNav] = useState(false);
    const [navBState, setNavBState] = useState('Home');
    const [isLg, setIsLg] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (typeof window === "undefined") return;
  
      const checkSize = () => {
        if (window.innerWidth >= 1024) {
          if (!isLg) {
            toggleSideNav(false);
            setIsLg(true);
          }
        } else {
          if (isLg) {
            setIsLg(false);
          }
        }
      };
  
      window.addEventListener("resize", checkSize);
      checkSize(); // Run once on mount
  
      return () => window.removeEventListener("resize", checkSize);
    }, [isLg]);

    useEffect(() => {
      if (!expandSideNav) return;

      const handleClickOutside = (event: MouseEvent) => {
          if (navRef.current && !navRef.current.contains(event.target as Node)) {
              toggleSideNav(false);
          }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandSideNav]);
  
    return (
      <div className="h-screen w-screen flex bg-[linear-gradient(to_top_right,#2E2E2E,#353535,#474747,#5C5C5C,#707070,#8A8A8A,#A0A0A0,#B0B0B0,#C0C0C0)]
">
        {/* Sidebar */}
        <nav 
          ref={navRef}
          className={`h-full text-white p-4 space-y-4 shadow-lg cursor-pointer
          ${expandSideNav ? 'w-64 shadow-2xl' : isLg ? 'w-64 shadow-2xl' : 'w-20 shadow-lg'}
          transition-width duration-300 ease-in-out`}>
  
          <h2 className={`text-2xl font-bold mb-4 transition-opacity duration-300 ${expandSideNav ? 'opacity-100 block' : 'opacity-0 hidden'} lg:block lg:opacity-100`}>
            Pawspace
          </h2>
  
          <SideNavButton 
            icon={FiMenu} 
            text="" 
            onClick={() => toggleSideNav(!expandSideNav)}
            color="gray"
            className={`lg:hidden ${expandSideNav ? 'hidden' : ''}`}
            isCurrent={false}
          />
  
          <ul className="space-y-4">
            {/* Add side navigation buttons here. Use SideNavButton Component */}
            <SideNavButton icon={FaHome} 
              text="Home" 
              isCurrent={navBState === "Home"} 
              showText={expandSideNav} 
              href="/customer"
              color="gray"
              onClick={() => { 
                  setNavBState("Home"); 
                  toggleSideNav(false); 
                  }
              }
            />

            <SideNavButton 
              icon={FaUser} 
              text="About Us" 
              isCurrent={navBState === "About"} 
              showText={expandSideNav} 
              href=""
              color="gray"
              onClick={() => { 
                  setNavBState("About"); 
                  toggleSideNav(false); 
                  }
              }
            />

          </ul>
        </nav>
  
        {/* Main Content */}
        <div className={`flex-1 p-6 transition-all duration-300 ease-in-out overflow-x-hidden overflow-y-auto ${expandSideNav ? 'opacity-20' : 'opacity-100'}`}>
          {children}
        </div>
        
      </div>
    );
  }
  