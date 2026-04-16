import React, { useState } from "react";
import { Outlet } from "react-router"; // or 'react-router-dom'
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);


  return (
    <div className="max-w-screen min-h-screen relative overflow-x-hidden font-sans antialiased text-gray-800">
      <Toaster />
      
      {/* 1. DARK OVERLAY (Backdrop) */}
      {/* Only visible when sidebar is open. Clicking it closes the sidebar. */}
      {isSideBarOpen && (
        <div 
          onClick={() => setIsSideBarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* 2. MAIN CONTENT */}
      {/* We keep this w-full now because the sidebar floats on top */}
      <div className="w-full min-h-screen flex flex-col">
        <Header
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        
        {/* Main page content */}
        <div className="grow">
            <ScrollToTop />
            <Outlet />
        </div>
        <Footer />
      </div>

      {/* 3. SIDEBAR COMPONENT */}
      {/* We always render it, but CSS handles the sliding in/out */}
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      
    </div>
  );
};

export default Layout;