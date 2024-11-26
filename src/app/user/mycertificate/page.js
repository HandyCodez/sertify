'use client';
import AddModal from "@/components/user/mycertificate/addModal";
import { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useSWR from "swr";
import LoadingScreen from "@/components/loadingScreen";
import { useSession } from "next-auth/react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import ModeEditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailModal from "@/components/certificate/detailModal";
import EditModal from "@/components/certificate/editModal";
import { DeleteModal } from "@/components/certificate/deleteModal";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
    const { data, isLoading, error, mutate } = useSWR('/api/certificate?get=all', fetcher);
    const { data: session, status } = useSession();


    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState('semua');
    const [selectedStatus, setSelectedStatus] = useState('all');

    if (isLoading || status === 'loading') return <LoadingScreen />;
    if (error) return <div>{JSON.stringify(error)}</div>;

    // Filter sertifikat berdasarkan user dan status
    const certificates = data.certificates.filter(certi =>
        certi.user.nim === session.user.nim &&
        (certi.namaSertifikat.toLowerCase().includes(searchTerm.toLowerCase()) ||
            certi.jenisSertifikat.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Filter berdasarkan status
    const filteredCertificates = selectedStatus === 'all' ? certificates :
        certificates.filter(certificate =>
            (selectedStatus === 'verified' && certificate.status === 'T') ||
            (selectedStatus === 'unverified' && certificate.status === 'NT') ||
            (selectedStatus === 'invalid' && certificate.status === 'G')
        );

    const handleDetail = (certificate) => {
        setSelectedCertificate(certificate)
        setIsDetailModalOpen(true)
    }
    const handleEdit = (certificate) => {
        setSelectedCertificate(certificate)
        setIsEditModalOpen(true)
    }
    const handleDelete = (certificate) => {
        setSelectedCertificate(certificate)
        setIsDeleteModalOpen(true)
    }


    return (
        <main className="px-3">
            <AddModal open={isAddModalOpen} setOpen={setIsAddModalOpen} mutate={mutate} />
            <DetailModal open={isDetailModalOpen} setOpen={setIsDetailModalOpen} certificate={selectedCertificate} />
            <EditModal open={isEditModalOpen} setOpen={setIsEditModalOpen} mutate={mutate} certificate={selectedCertificate} />
            <DeleteModal open={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} mutate={mutate} certificate={selectedCertificate} />
            <div className="bg-white rounded-lg shadow-lg p-3 mb-3">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <ArrowForwardIosIcon className="mr-3" />
                        <h1 className="text-xl font-bold">My Certificate</h1>
                    </div>
                </div>

                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded-lg p-2 w-full mr-3"
                    />
                    <select
                        value={selectedField}
                        onChange={(e) => setSelectedField(e.target.value)}
                        className="border rounded-lg p-2 mr-3"
                    >
                        <option value="semua">All Fields</option>
                        <option value="nameSertifikat">Name</option>
                        <option value="jenisSertifikat">Jenis Sertifikat</option>
                        <option value="lemabagaPenerbit">Lembaga Penerbit</option>
                    </select>

                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="border rounded-lg p-2"
                    >
                        <option value="all">All Status</option>
                        <option value="verified">Verified</option>
                        <option value="unverified">Unverified</option>
                        <option value="invalid">Invalid</option>
                    </select>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="mb-3 bg-green-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    + Certificate
                </button>

                <div className="overflow-x-auto">
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
                                    {filteredCertificates.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                No certificates found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredCertificates.map((certificate, i) => (
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
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${certificate.status === 'T' ? 'bg-green-100 text-green-800' : certificate.status === 'NT' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                        {certificate.status === 'T' ? 'Verified' : certificate.status === 'NT' ? 'Unverified' : 'Invalid'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleDetail(certificate)}
                                                            className="bg-blue-500 p-1 rounded-lg shadow-lg text-white hover:bg-blue-600 transition-colors"
                                                            title="View"
                                                        >
                                                            <VisibilityIcon />
                                                        </button>
                                                        {/* <button
                                                            onClick={() => handleDownload(certificate)}
                                                            className="bg-green-500 p-1 rounded-lg shadow-lg text-white hover:bg-green-600 transition-colors"
                                                            title="Download"
                                                        >
                                                            <DownloadIcon />
                                                        </button> */}
                                                        {certificate.status != 'T' ?
                                                            <button
                                                                onClick={() => handleEdit(certificate)}
                                                                className="bg-yellow-500 p-1 rounded-lg shadow-lg text-white hover:bg-yellow-600 transition-colors"
                                                                title="Edit"
                                                            >
                                                                <ModeEditIcon />
                                                            </button> : ''
                                                        }

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
                </div>
            </div>
        </main>
    );
}