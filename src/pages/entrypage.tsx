import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaTachometerAlt, FaHome, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ItemsDashboard from 'src/components/customs/ItemsDashboard/ItemsDashboard';

const DefaultPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-400">Welcome to the Entry Page</h1>
            <p className="text-center text-white">Please use the sidebar to navigate to the dashboard.</p>
        </div>
    );
};

const EntryPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className="flex h-screen bg-gray-900">
                <aside className={`bg-gray-800 text-white h-full p-4 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
                    <button onClick={toggleSidebar} className="text-blue-300 hover:text-blue-500 mb-4 w-full flex justify-end">
                        {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
                    </button>
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <Link to="/" className="text-blue-300 hover:text-blue-500 flex items-center">
                                    <FaHome className="mr-2" />
                                    {isSidebarOpen && 'Home'}
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/dashboard" className="text-blue-300 hover:text-blue-500 flex items-center">
                                    <FaTachometerAlt className="mr-2" />
                                    {isSidebarOpen && 'Dashboard'}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-4 overflow-auto">
                    <Routes>
                        <Route path="/" element={<DefaultPage />} />
                        <Route path="/dashboard" element={<ItemsDashboard />} />
                        <Route path="*" element={<DefaultPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default EntryPage;