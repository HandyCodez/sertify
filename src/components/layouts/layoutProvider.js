'use client'
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import { SessionProvider } from "next-auth/react"

export default function LayoutProvider({ children }) {
    const pathname = usePathname()
    const showNavbar = pathname !== "/login" && pathname !== "/signup";
    return (<div>
        <SessionProvider>
            {showNavbar && <Navbar />}
            {children}
        </SessionProvider>
    </div>)
}