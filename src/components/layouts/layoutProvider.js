'use client'
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function LayoutProvider({ children }) {
    const pathname = usePathname()
    const showNavbar = pathname !== "/login" && pathname !== "/signup";
    return (<div>
        {showNavbar && <Navbar />}
        {children}
    </div>)
}