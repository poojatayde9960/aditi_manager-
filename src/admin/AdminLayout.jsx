import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen overflow-hidden bg-[#020523]">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden relative bg-[#020523]">
                <Header toggleSidebar={toggleSidebar} />

                <main className="flex-1 overflow-y-auto md:ml-23 px-4 md:px-10 pt-24 bg-[#020523] text-white">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;