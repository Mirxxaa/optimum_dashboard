import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Mail,
  Briefcase,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Here you would normally clear any authentication tokens or user data
    // For example, if using localStorage:
    // localStorage.removeItem('authToken');
    // localStorage.removeItem('userData');
    
    // Navigate back to login page
    navigate("/login");
  };

  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: LayoutDashboard
    },
    {
      path: "/dashboard/contact",
      name: "Contact Forms",
      icon: MessageSquare
    },
    {
      path: "/dashboard/careers",
      name: "Career Forms",
      icon: Users
    },
    {
      path: "/dashboard/newsletters",
      name: "Newsletter Emails",
      icon: Mail
    },
    {
      path: "/dashboard/jobs",
      name: "Job Management",
      icon: Briefcase
    },
    {
      path: "/dashboard/JobsApplications",
      name: "Job Applications",
      icon: FileText
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
          text-white transition-all duration-300 ease-in-out z-50 shadow-2xl
          ${isCollapsed ? "w-16" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <LayoutDashboard size={20} />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Admin Panel
                </h2>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ChevronRight 
                size={18} 
                className={`transform transition-transform duration-300 ${
                  isCollapsed ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group
                      ${active 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    `}
                  >
                    <Icon 
                      size={20} 
                      className={`
                        transition-all duration-200 group-hover:scale-110
                        ${active ? "text-white" : "text-gray-400 group-hover:text-white"}
                      `}
                    />
                    {!isCollapsed && (
                      <span className="font-medium text-sm">{item.name}</span>
                    )}
                    {!isCollapsed && active && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </Link>
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-16 top-0 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      {item.name}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-700">
          {!isCollapsed && (
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-700 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">admin@company.com</p>
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 
              bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl
              group hover:scale-105 active:scale-95
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform duration-200" />
            {!isCollapsed && (
              <span className="font-medium text-sm">Logout</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;