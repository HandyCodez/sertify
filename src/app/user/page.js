'use client'
import LoadingScreen from '@/components/loadingScreen';
import { Button } from '@material-tailwind/react';
import { Icon } from '@material-tailwind/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Page() {
    const { data: certificate, isLoading, error } = useSWR('/api/certificate?get=all', fetcher)
    const { data: session, status } = useSession()

    if (status == 'loading' || isLoading) return <LoadingScreen />
    if (error) return <div>{JSON.stringify(error)}</div>

    const userCertif = certificate.certificates.filter(certi => certi.user.nim == session.user.nim)

    return <div className="min-h-screen bg-gray-100 p-6">

        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex items-center">
                {/* <img src="/profile.jpg" alt="Foto Profil" className="w-20 h-20 rounded-full mr-4" /> */}
                <AccountCircleIcon className="w-20 h-20 rounded-full mr-4" />
                <div>
                    <h2 className="text-xl font-semibold">{session.user.name}</h2>
                    <p className="text-gray-600 mb-3">NIM: {session.user.nim}</p>
                    <Link href={'/user/mycertificate'} color="lightBlue" className=" bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg">My ertificate</Link>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">Jumlah Sertifikat</h3>
                <p className="text-2xl">{userCertif.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">Sertifikat di setujui</h3>
                <p className="text-2xl">{userCertif.filter(certi => certi.status === 'T').length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">Sertifikat gagal di setujui</h3>
                <p className="text-2xl">{userCertif.filter(certi => certi.status === 'G').length}</p>
            </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold">Daftar Sertifikat</h3>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-200 p-2">Nama Sertifikat</th>
                        <th className="border border-gray-200 p-2">Tanggal Penerbitan</th>
                        <th className="border border-gray-200 p-2">Status</th>
                        {/* <th className="border border-gray-200 p-2">Aksi</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-200 p-2">Sertifikat A</td>
                        <td className="border border-gray-200 p-2">01 Jan 2023</td>
                        <td className="border border-gray-200 p-2">verified</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-200 p-2">Sertifikat B</td>
                        <td className="border border-gray-200 p-2">15 Feb 2023</td>
                        <td className="border border-gray-200 p-2">unverified</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-200 p-2">Sertifikat C</td>
                        <td className="border border-gray-200 p-2">10 Mar 2023</td>
                        <td className="border border-gray-200 p-2">invalid</td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
}