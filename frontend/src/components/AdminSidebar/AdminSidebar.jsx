import React, { useState } from "react";
import {
  FaUserGraduate,
  FaChartLine,
  FaClipboardList,
  FaCogs,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "./AdminSidebar.css";

const AdminSidebar = ({ onSelect }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Static menu items
  const menuItems = [
    { label: "Dashboard", path: "dashboard" },
    { label: "Users", path: "users" },
    { label: "Quizzes", path: "quizzes" },
    { label: "Resumes", path: "resumes" },
  ];

  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case "dashboard":
        return <FaChartLine />;
      case "students":
        return <FaUserGraduate />;
      case "quizzes":
        return <FaClipboardList />;
      case "settings":
        return <FaCogs />;
      default:
        return <FaCogs />;
    }
  };

  return (
    <div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">{collapsed ? "PP" : "Placement Prep"}</h2>
        <FaBars className="toggle-icon" onClick={toggleSidebar} />
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="sidebar-item"
            onClick={() => onSelect && onSelect(item.path)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="icon">{getIcon(item.label)}</span>
            {!collapsed && <span className="label">{item.label}</span>}
          </li>
        ))}
      </ul>

      <div className="sidebar-footer" onClick={() => onSelect && onSelect("logout")}>
        <FaSignOutAlt className="icon" />
        {!collapsed && <span>Logout</span>}
      </div>
    </div>
  );
};

export default AdminSidebar;
