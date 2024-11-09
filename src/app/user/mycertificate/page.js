'use client'
import AddModal from "@/components/user/mycertificate/addModal";
import { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Page() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    return <main className="px-3">
        <AddModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
        <div className="bg-white rounded-lg shadow-lg p-3 mb-3">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <ArrowForwardIosIcon className="mr-3" />
                    <h1 className="text-xl font-bold">My Certificate</h1>
                </div>
            </div>

            <div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-green-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    + Certificate
                </button>
            </div>

            {/* <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nama Sertifikat
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Jenis
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Lembaga Penerbit
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tanggal Terbit
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {certificates?.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No certificates found
                                    </td>
                                </tr>
                            ) : (
                                certificates?.map((certificate, i) => (
                                    <tr key={i} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {certificate.namaSertifikat}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {certificate.jenisSertifikat}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {certificate.lembagaPenerbit}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(certificate.tanggalPenerbitan).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleView(certificate)}
                                                    className="bg-blue-500 p-1 rounded-lg shadow-lg text-white hover:bg-blue-600 transition-colors"
                                                    title="View"
                                                >
                                                    <VisibilityIcon />
                                                </button>
                                                <button
                                                    onClick={() => handleDownload(certificate)}
                                                    className="bg-green-500 p-1 rounded-lg shadow-lg text-white hover:bg-green-600 transition-colors"
                                                    title="Download"
                                                >
                                                    <DownloadIcon />
                                                </button>
                                                <button
                                                    className="bg-yellow-500 p-1 rounded-lg shadow-lg text-white hover:bg-yellow-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <ModeEditIcon />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(certificate)}
                                                    className="bg-red-500 p-1 rounded-lg shadow-lg text-white hover:bg-red-600 transition-colors"
                                                    title="Delete"
                                                >
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div> */}
        </div>
    </main>
}