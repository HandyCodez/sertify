'use client'
import { useMemo, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import useSWR from 'swr';
import LoadingScreen from '@/components/loadingScreen';
import EditModal from '@/components/certificate/editModal';
import { Input, Option, Select } from '@material-tailwind/react';
import SearchIcon from '@mui/icons-material/Search';
import DetailModal from '@/components/certificate/detailModal';
import { DeleteModal } from '@/components/certificate/deleteModal';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
    const { data, isLoading, error, mutate } = useSWR('/api/certificate?get=all', fetcher);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isEditModalOpen, setIsEditModal] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectData, setSelectData] = useState(null);
    const [searchBy, setSearchBy] = useState('namaSertifikat');

    const filteredCertificates = useMemo(() => {
        if (!data || !data.certificates) return [];

        let certificates = data.certificates;

        // Filter by status
        if (statusFilter !== 'all') {
            certificates = certificates.filter(certificate => certificate.status === statusFilter);
        }

        // Filter by search term
        if (searchTerm) {
            certificates = certificates.filter(certificate => {
                const searchValue = String(certificate[searchBy] || '').toLowerCase();
                return searchValue.includes(searchTerm.toLowerCase());
            });
        }

        return certificates;
    }, [data, searchTerm, searchBy, statusFilter]);

    if (isLoading) return <LoadingScreen />;
    if (error) return <p>{JSON.stringify(error)}</p>;

    const handleDelete = (certificate) => {
        setSelectData(certificate);
        setIsDeleteModalOpen(true);
    };

    const handleEdit = (certificate) => {
        setSelectData(certificate);
        setIsEditModal(true);
    };

    const handleView = (certificate) => {
        setSelectData(certificate)
        setIsDetailModalOpen(true)
    };

    return (
        <main className="px-3">
            <EditModal open={isEditModalOpen} setOpen={setIsEditModal} mutate={mutate} certificate={selectData} />
            <DetailModal open={isDetailModalOpen} setOpen={setIsDetailModalOpen} certificate={selectData} />
            <DeleteModal open={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} data={selectData} mutate={mutate} />
            <div className="bg-white rounded-lg shadow-lg p-3 mb-3">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <ArrowForwardIosIcon className="mr-3" />
                        <h1 className="text-xl font-bold">All Certificate</h1>
                    </div>
                </div>

                <div className="mb-5 flex flex-col md:flex-row gap-4 items-center">
                    <div className='flex-1'>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pr-10"
                                variant="outlined"
                                icon={<SearchIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div>
                    <div className="w-48">
                        <Select
                            value={searchBy}
                            onChange={(value) => setSearchBy(value)}
                            label="Search by"
                        >
                            <Option value="user">User</Option>
                            <Option value="namaSertifikat">Nama Sertifikat</Option>
                            <Option value="jenisSertifikat">Jenis Sertifikat</Option>
                            <Option value="lembagaPenerbit">Lembaga Penerbit</Option>
                            <Option value="nomorSertifikat">Nomor Sertifikat</Option>
                        </Select>
                    </div>
                    <div className="w-48">
                        <Select
                            value={statusFilter}
                            onChange={(value) => setStatusFilter(value)}
                            label="Status"
                        >
                            <Option value="all">All</Option>
                            <Option value="T">Verified</Option>
                            <Option value="NT">Unverified</Option>
                            <Option value="G">Invalid</Option>
                        </Select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                {['Action', 'User', 'Status', 'Nama', 'Jenis', 'Penerbit', 'Tanggal Terbit', 'Nomor', 'Tingkat', 'Deskripsi', 'File', 'Kategori'].map((header) => (
                                    <th key={header} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCertificates.length === 0 ? (
                                <tr>
                                    <td colSpan="12" className="px-6 py-4 text-center text-gray-500">
                                        No certificates found
                                    </td>
                                </tr>
                            ) : (
                                filteredCertificates.map((certificate, i) => (
                                    <tr key={i} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleView(certificate)} className="bg-blue-500 p-1 rounded-lg shadow-lg text-white hover:bg-blue-600 transition-colors" title="View">
                                                    <VisibilityIcon />
                                                </button>
                                                <button onClick={() => handleEdit(certificate)} className="bg-yellow-500 p-1 rounded-lg shadow-lg text-white hover:bg-yellow-600 transition-colors" title="Edit">
                                                    <ModeEditIcon />
                                                </button>
                                                <button onClick={() => handleDelete(certificate)} className="bg-red-500 p-1 rounded-lg shadow-lg text-white hover:bg-red-600 transition-colors" title="Delete">
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{certificate.user.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${certificate.status === "NT" ? "bg-yellow-200 text-yellow-800" : certificate.status === "T" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                                                {certificate.status === "NT" ? "Unverified" : certificate.status === "T" ? "Verified" : "Invalid"}
                                            </span>
                                        </td>
                                        {['namaSertifikat', 'jenisSertifikat', 'lembagaPenerbit', 'tanggalPenerbitan', 'nomorSertifikat', 'tingkatSertifikat', 'deskripsi', 'fileSertifikat', 'kategoriSertifikat'].map((field) => (
                                            <td key={field} className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {field === 'tanggalPenerbitan' ? new Date(certificate[field]).toLocaleDateString() : certificate[field]}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}