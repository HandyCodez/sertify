'use client'
import React from "react";
import {
    Card,
    CardBody,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import LoadingScreen from "@/components/loadingScreen";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Page() {
    const { data: user, isLoading: userLoading, error: userError } = useSWR('/api/user', fetcher)
    const { data: certificate, isLoading: certiLoading, error: certiError } = useSWR('/api/certificate', fetcher)
    if (userLoading || certiLoading) return <LoadingScreen />
    if (userError && certiError) return <div>{JSON.stringify({ userError, certiError })}</div>
    return (
        <div className="p-4">
            {/* Header */}
            <div className="mb-8">
                <Typography variant="h4" color="blue-gray">
                    Dashboard
                </Typography>
                <Typography color="gray" className="mt-1">
                    Overview dan statistik Sertify
                </Typography>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardBody className="flex items-center">
                        <div className="rounded-full bg-blue-500 p-3 mr-4">
                            <AssignmentIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Total Sertifikat
                            </Typography>
                            <Typography variant="h4">{certificate.certificates.length}</Typography>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="flex items-center">
                        <div className="rounded-full bg-orange-500 p-3 mr-4">
                            <PeopleIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Total Users
                            </Typography>
                            <Typography variant="h4">{user.users.length}</Typography>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="flex items-center">
                        <div className="rounded-full bg-green-500 p-3 mr-4">
                            <VerifiedIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Terverifikasi
                            </Typography>
                            <Typography variant="h4">{certificate.certificates.filter(item => item.status === "T").length}</Typography>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="flex items-center">
                        <div className="rounded-full bg-red-500 p-3 mr-4">
                            <VerifiedIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Perlu Verifikasi
                            </Typography>
                            <Typography variant="h4">{certificate.certificates.filter(item => item.status === "NT").length}</Typography>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Recent Activities */}
            <Card className="mb-8">
                <CardBody>
                    <div className="flex items-center justify-between mb-4">
                        <Typography variant="h6" color="blue-gray">
                            Aktivitas Terbaru
                        </Typography>
                        <Select label="Filter" className="w-32">
                            <Option>Semua</Option>
                            <Option>Upload</Option>
                            <Option>Verifikasi</Option>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        {/* Activity Item */}
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <Typography variant="small" className="font-medium">
                                        Sertifikat baru diupload
                                    </Typography>
                                    <Typography variant="small" color="gray">
                                        Oleh: John Doe - Teknik Informatika
                                    </Typography>
                                </div>
                                <Typography variant="small" color="gray">
                                    2 menit yang lalu
                                </Typography>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>

            {/* Recent certificate */}
            <Card>
                <CardBody>
                    <Typography variant="h6" color="blue-gray" className="mb-4">
                        Sertifikat Terbaru
                    </Typography>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Nama Sertifikat
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Mahasiswa
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Jurusan
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Status
                                        </Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <tr key={item}>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray">
                                                Sertifikat Kompetensi Web
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray">
                                                John Doe
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray">
                                                Teknik Informatika
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 inline-block">
                                                Menunggu Verifikasi
                                            </Typography>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}