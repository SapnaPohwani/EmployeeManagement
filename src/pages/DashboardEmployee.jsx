import React, { useState } from "react";
import {
  LayoutDashboard,
  Folder,
  ListTodo,
  Clock,
  Users,
  UserCircle,
  FileText,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const DashboardPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const taskStatusData = [
    { name: "Pending", value: 1022 },
    { name: "Completed", value: 30 },
    { name: "In Progress", value: 35 },
  ];

  const taskGrowthData = [
    { month: "Jan", tasks: 30 },
    { month: "Feb", tasks: 50 },
    { month: "Mar", tasks: 80 },
    { month: "Apr", tasks: 95 },
  ];

  const COLORS = ["#fb923c", "#3b82f6", "#facc15"];

  return (
    <div className="flex min-h-screen bg-[#fef7f4]">
      {isSidebarOpen && (
        <aside className="w-72 bg-black cursor-pointer text-white flex flex-col justify-between py-6 px-4 transition-all duration-300">
          <div>
            <button className="w-full flex items-center justify-center bg-orange-500 py-2 px-3 rounded-md mb-6 font-semibold text-sm gap-2">
              <Plus size={18} /> Create new project
            </button>
            <nav className="cursor-pointer space-y-3">
              <SidebarItem text="Dashboard" icon={<LayoutDashboard size={18} />} active />
              <SidebarItem text="Projects" icon={<Folder size={18} />} />
              <SidebarItem text="Tasks" icon={<ListTodo size={18} />} />
              <SidebarItem text="Time log" icon={<Clock size={18} />} />
              <SidebarItem text="Resource management" icon={<Users size={18} />} />
              <SidebarItem text="Users" icon={<UserCircle size={18} />} />
              <SidebarItem text="Project template" icon={<FileText size={18} />} />
              <SidebarItem text="Menu settings" icon={<Settings size={18} />} />
            </nav>
          </div>
          <button className="bg-orange-500 py-2 px-3 rounded-md text-sm font-semibold flex items-center justify-center gap-2">
            <LogOut size={18} /> Logout
          </button>
        </aside>
      )}

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button
            className="text-black text-2xl font-bold px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40?img=4"
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-10">
                  <div className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer">View Profile</div>
                  <div className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer">Settings</div>
                  <div className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer">Logout</div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card title="Total Tasks" count="95" subtitle="/100" color="bg-green-100" textColor="text-green-700" />
            <Card title="Pending Tasks" count="1022" subtitle="pending" color="bg-orange-100" textColor="text-orange-700" />
            <Card title="Completed Tasks" count="30+" subtitle="completed" color="bg-blue-100" textColor="text-blue-700" />
            <Card title="In Progress" count="35" subtitle="tasks" color="bg-yellow-100" textColor="text-yellow-700" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6 w-full">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Task Status Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow rounded-lg p-6 w-full">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Task Growth Over Months</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taskGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tasks" fill="#34d399" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ text, icon, active = false }) => (
  <div
    className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
      active ? "bg-white text-black" : "hover:bg-gray-800"
    }`}
  >
    {icon}
    {text}
  </div>
);

const Card = ({ title, count, subtitle, color, textColor }) => (
  <div className={`rounded-lg p-5 shadow ${color}`}>
    <h3 className={`text-2xl font-medium ${textColor}`}>{title}</h3>
    <div className="text-2xl font-bold text-black mt-2">
      {count} <span className="text-sm font-normal">{subtitle}</span>
    </div>
  </div>
);

export default DashboardPage;
