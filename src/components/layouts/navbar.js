'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from './sidebar';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toogleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <nav className="bg-white shadow-lg py-3 sm:px-10 p-3 mb-3">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <p className="text-2xl font-bold">Sertify</p>
                </Link>

                {/* Button for Mobile Menu */}
                <button
                    className="block focus:outline-none"
                    onClick={toogleSidebar}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>

                <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
            </div>
        </nav>
    );
};

export default Navbar;
