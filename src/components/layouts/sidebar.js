import React from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import Link from "next/link";
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import { signOut, useSession } from "next-auth/react"

const adminMenu = [
    {
        name: "Dashboard",
        icons: <DashboardIcon />,
        href: "/admin",
        role: ['superadmin', 'admin']
    },
    {
        name: "Certificate",
        icons: <DescriptionIcon />,
        href: "/admin/certificate",
        role: ['superadmin', 'admin']
    },
    {
        name: "Users",
        icons: <GroupIcon />,
        href: "/admin/user-management",
        role: ['superadmin', 'admin']
    },
    {
        name: "Jurusan",
        icons: <SchoolIcon />,
        href: "/admin/jurusan-management",
        role: ['superadmin', 'admin']
    },
    {
        name: "Prodi",
        icons: <ClassIcon />,
        href: "/admin/prodi-management",
        role: ['superadmin', 'admin']
    },
    // {
    //     name: "Log Activity",
    //     icons: <ReceiptIcon />,
    //     href: "/admin/activity",
    //     role: ['superadmin', 'admin']
    // },
];

const userMenu = [
    {
        name: "Dashboard",
        icons: <DashboardIcon />,
        href: "/user",
    },
    {
        name: "My Certificates",
        icons: <DescriptionIcon />,
        href: "/user/mycertificate",
    },
    {
        name: "Your Account",
        icons: <PersonIcon />,
        href: "/user/account",
    }
];

export function Sidebar({ open, setOpen }) {
    const { data: session } = useSession();
    const closeDrawer = () => setOpen(false);

    // Menentukan menu yang akan ditampilkan berdasarkan role
    const menuToShow = session?.user?.role === 'user' ? userMenu : adminMenu;

    return (
        <React.Fragment>
            <Drawer placement="right" open={open} onClose={closeDrawer} className="p-4">
                {/* Header Drawer */}
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        Sertify
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>

                {/* Menu Items */}
                <List>
                    {session?.user.role === 'superadmin' | 'admin' ? <><p>Admin Menu</p><hr className="border-t-2" /></> : ''}
                    {session?.user?.role === 'superadmin' | 'admin' ? adminMenu.map((item, index) => (
                        <Link href={item.href} key={index} passHref>
                            <ListItem className="cursor-pointer" onClick={closeDrawer}>
                                <ListItemPrefix>
                                    {item.icons}
                                </ListItemPrefix>
                                {item.name}
                            </ListItem>
                        </Link>
                    )) : ''}

                    {session?.user.role === 'superadmin' | 'admin' ? <><p className="mt-3">User Menu</p><hr className="border-t-2" /></> : ''}
                    {userMenu.map((item, index) => {
                        return <Link href={item.href} key={index} passHref>
                            <ListItem className="cursor-pointer" onClick={closeDrawer}>
                                <ListItemPrefix>
                                    {item.icons}
                                </ListItemPrefix>
                                {item.name}
                            </ListItem>
                        </Link>
                    })}
                    <button onClick={() => signOut()} className="w-full">
                        <ListItem className="cursor-pointer" onClick={closeDrawer}>
                            <ListItemPrefix>
                                <LogoutIcon />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </button>
                </List>
            </Drawer>
        </React.Fragment>
    );
}