'use client'
import { useState } from "react";
import { Card, Typography, Input, Select, Option } from "@material-tailwind/react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const data = [
    {
        name: "OMARU",
        institusi: "Polnes",
        diterbitkan: "23/04/18",
        kadaluarsa: "23/04/18",
        jenis: "akademik",
        status: "aktif",
        user: "leham",
    },
    {
        name: "OMARU",
        institusi: "Polnes",
        diterbitkan: "23/04/18",
        kadaluarsa: "23/04/18",
        jenis: "akademik",
        status: "aktif",
        user: "leham",
    },
    {
        name: "OMARU",
        institusi: "Polnes",
        diterbitkan: "23/04/18",
        kadaluarsa: "23/04/18",
        jenis: "akademik",
        status: "aktif",
        user: "leham",
    },
    {
        name: "OMARU",
        institusi: "Polnes",
        diterbitkan: "23/04/18",
        kadaluarsa: "23/04/18",
        jenis: "akademik",
        status: "aktif",
        user: "leham",
    },
];

export default function Page() {
    const [filters, setFilters] = useState({
        name: "",
        institusi: "",
        jenis: "",
        status: "",
    });

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        item.institusi.toLowerCase().includes(filters.institusi.toLowerCase()) &&
        (filters.jenis === "" || item.jenis === filters.jenis) &&
        (filters.status === "" || item.status === filters.status)
    );

    return (
        <main className="px-3 flex justify-center">
            <div className="w-full bg-white shadow-lg p-3 rounded-lg">
                <div className="mb-3 flex p-1 items-center">
                    <ArrowForwardIosIcon className="mr-3" />
                    <p className="text-xl font-bold">Certificate Management</p>
                </div>
                {/* Filter Section */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                        label="Filter by Name"
                        value={filters.name}
                        onChange={(e) => handleFilterChange("name", e.target.value)}
                    />
                    <Input
                        label="Filter by Institusi"
                        value={filters.institusi}
                        onChange={(e) => handleFilterChange("institusi", e.target.value)}
                    />
                    <Select
                        label="Filter by Jenis"
                        value={filters.jenis}
                        onChange={(value) => handleFilterChange("jenis", value)}
                    >
                        <Option value="">All</Option>
                        <Option value="akademik">Akademik</Option>
                        {/* Add other jenis options as needed */}
                    </Select>
                    <Select
                        label="Filter by Status"
                        value={filters.status}
                        onChange={(value) => handleFilterChange("status", value)}
                    >
                        <Option value="">All</Option>
                        <Option value="aktif">Aktif</Option>
                        {/* Add other status options as needed */}
                    </Select>
                </div>
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            No.
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Institusi
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Diterbitkan
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kadaluarsa
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Jenis
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Verified
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.map((item, i) => (
                                        <tr key={i} className="hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{i + 1}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.institusi}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.diterbitkan}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.kadaluarsa}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.jenis}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.status}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">false</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.user}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}