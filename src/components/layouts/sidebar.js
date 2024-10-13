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

const menu = [
    {
        name: "Dashboard",
        icons: <DashboardIcon />,
        href: "/admin",
    },
    {
        name: "Certificate Management",
        icons: <DescriptionIcon />,
        href: "/admin",
    },
    {
        name: "Users Management",
        icons: <GroupIcon />,
        href: "/admin",
    },
    {
        name: "Profile",
        icons: <PersonIcon />,
        href: "/admin",
    },
    {
        name: "Log Activity",
        icons: <ReceiptIcon />,
        href: "/admin",
    },
    {
        name: "Log Out",
        icons: <LogoutIcon />,
        href: "/admin",
    },
];

export function Sidebar({ open, setOpen }) {

    const closeDrawer = () => setOpen(false);

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
                    {menu.map((item, index) => (
                        <Link href={item.href} key={index} passHref>
                            <ListItem className="cursor-pointer" onClick={closeDrawer}>
                                <ListItemPrefix>
                                    {item.icons}
                                </ListItemPrefix>
                                {item.name}
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </React.Fragment>
    );
}
