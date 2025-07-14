import React, { useState, useRef, useEffect } from "react";
import AddEmployeeForm from "../components/AddEmployeeForm";
import EmployeeList from "../components/EmployeeListing";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  UserCheck,
  Smile,
  ScanSearch,
  Search,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Clock,
  Calendar,
  Wallet,
  Target,
  FilePen,
} from "lucide-react";

const AdminDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [employeeMenuOpen, setEmployeeMenuOpen] = useState(true);
  const [designationMenuOpen, setDesignationMenuOpen] = useState(true);
  const [departmentMenuOpen, setDepartmentMenuOpen] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const dropdownRef = useRef(null);

  const growthData = [
    { month: "Jan", employees: 120 },
    { month: "Feb", employees: 135 },
    { month: "Mar", employees: 140 },
    { month: "Apr", employees: 150 },
    { month: "May", employees: 165 },
    { month: "Jun", employees: 180 },
  ];

  const STATUS_COLORS = {
    Active: "#10b981",
    "On Leave": "#f97316",
    Inactive: "#64748b",
  };

  const statusData = [
    { name: "Active", value: 181 },
    { name: "On Leave", value: 17 },
    { name: "Inactive", value: 10 },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#fef7f4]">
      <aside className="w-72 bg-black text-white flex flex-col py-6 px-4">
        <h1 className="text-4xl font-bold mb-6">HELLO!</h1>
        <nav className="space-y-2">
          <SidebarItem
            icon={<LayoutDashboard size={16} />}
            text="Dashboard"
            active={currentView === "dashboard"}
            onClick={() => setCurrentView("dashboard")}
          />
          <div>
            <div
              className="flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-800"
              onClick={() => setEmployeeMenuOpen(!employeeMenuOpen)}
            >
              <div className="flex items-center gap-2 font-semibold">
                <Users size={16} />
                Employee
              </div>
              {employeeMenuOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
            {employeeMenuOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l border-gray-700 pl-3">
                <SidebarItem
                  text="Add Employee"
                  icon={<FilePen size={18} />}
                  onClick={() => setCurrentView("add-employee")}
                />
                <SidebarItem
                  text="Employee Listing"
                  icon={<Users size={18} />}
                  onClick={() => setCurrentView("employee-listing")}
                />
              </div>
            )}
          </div>
          <div>
            <div
              className="flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-800"
              onClick={() => setDesignationMenuOpen(!designationMenuOpen)}
            >
              <div className="flex items-center gap-2 font-semibold">
                <Clock size={16} />
                Designation
              </div>
              {designationMenuOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
            {designationMenuOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l border-gray-700 pl-3">
                <SidebarSubItem text="Add Designation" />
              </div>
            )}
          </div>
          <div>
            <div
              className="flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-800"
              onClick={() => setDepartmentMenuOpen(!departmentMenuOpen)}
            >
              <div className="flex items-center gap-2 font-semibold">
                <Calendar size={16} />
                Department
              </div>
              {departmentMenuOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
            {departmentMenuOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l border-gray-700 pl-3">
                <SidebarSubItem text="Add Department" />
              </div>
            )}
          </div>
          <SidebarItem icon={<Wallet size={16} />} text="Payroll" />
          <SidebarItem icon={<Target size={16} />} text="Goals" />
        </nav>
      </aside>

      <div className="flex-1">
        <div className="flex justify-between items-center bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3 w-full max-w-md"> 
          </div>
          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            <div className="relative">
              <Bell className="text-gray-600 cursor-pointer" size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40?img=4"
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                  <div className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer">
                    View Profile
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer">
                    Settings
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer">
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <main className="p-6">
          {currentView === "dashboard" && (
            <>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  Manage Employee
                </h2>
                <div className="flex items-center gap-2">
                  <button className="text-sm border px-3 py-1.5 rounded-md text-gray-700 bg-white hover:bg-gray-100">
                    Default View
                  </button>
                  <button className="p-2 rounded-md hover:bg-white text-gray-600">
                    <Settings size={20} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                <StatCard
                  icon={<Users className="text-red-500" />}
                  title="Total Employee"
                  value="192"
                />
                <StatCard
                  icon={<UserCheck className="text-red-500" />}
                  title="Active Employee"
                  value="181"
                />
                <StatCard
                  icon={<Smile className="text-red-500" />}
                  title="On Leave"
                  value="17"
                />
                <StatCard
                  icon={<ScanSearch className="text-red-500" />}
                  title="Onboarding"
                  value="27"
                />
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Employee Growth
                  </h3>
                  <LineChart width={400} height={250} data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="employees"
                      stroke="#8884d8"
                      strokeWidth={3}
                    />
                  </LineChart>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Active vs Leave
                  </h3>
                  <PieChart width={400} height={250}>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {statusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={STATUS_COLORS[entry.name] || "#ccc"}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
              </div>
            </>
          )}
          {currentView === "add-employee" && (
            <AddEmployeeForm onClose={() => setCurrentView("dashboard")} />
          )}
          {currentView === "employee-listing" && <EmployeeList />}
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ text, icon, active = false, onClick }) => (
  <div
    className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center gap-2 ${
      active
        ? "bg-white text-black font-semibold"
        : "text-white hover:bg-gray-800"
    }`}
    onClick={onClick}
  >
    {icon}
    {text}
  </div>
);

const SidebarSubItem = ({ text, active = false }) => (
  <div
    className={`px-3 py-1.5 text-sm rounded-md cursor-pointer ${
      active
        ? "bg-white text-red-600 font-semibold"
        : "hover:bg-gray-800 text-gray-300"
    }`}
  >
    {text}
  </div>
);

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
    <div className="p-3 bg-red-100 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

export default AdminDashboard;
