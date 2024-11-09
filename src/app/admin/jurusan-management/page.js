'use client'
import LoadingScreen from '@/components/loadingScreen';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import useSWR from 'swr';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useCallback, useMemo } from 'react';
import AddModal from '@/components/jurusan-management/addModal';
import { DeleteModal } from '@/components/jurusan-management/deleteModal';
import { Input, Select, Option } from "@material-tailwind/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Page() {
    const { data, error, isLoading, mutate } = useSWR('/api/jurusan', fetcher)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectData, setSelectData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchBy, setSearchBy] = useState('name')

    const handleDelete = useCallback((jurusan) => {
        setSelectData(jurusan)
        setIsDeleteModalOpen(true)
    }, [])

    const filteredJurusan = useMemo(() => {
        if (!data || !data.jurusan) return [];
        if (!searchTerm) return data.jurusan;

        return data.jurusan.filter(jurusan => {
            const searchValue = String(jurusan[searchBy] || '').toLowerCase();
            return searchValue.includes(searchTerm.toLowerCase());
        });
    }, [data, searchTerm, searchBy]);

    if (isLoading) return <LoadingScreen />
    if (error) return <p>{JSON.stringify(error)}</p>
    if (!data) return null

    return (
        <main className="px-3">
            <AddModal open={isAddModalOpen} setOpen={setIsAddModalOpen} mutate={mutate} />
            <DeleteModal open={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} data={selectData} mutate={mutate} />
            <div className="bg-white rounded-lg shadow-lg p-3 mb-3">
                <div className="mb-3 flex p-1 items-center">
                    <ArrowForwardIosIcon className="mr-3" />
                    <p className="text-xl font-bold">Jurusan Management</p>
                </div>

                {/* Search and Filter Section */}
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
                            <Option value="_id">ID</Option>
                            <Option value="name">Name</Option>
                        </Select>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className='text-white p-2 px-4 rounded-lg shadow-lg bg-green-500 hover:bg-green-600 transition-colors'
                    >
                        + Add Jurusan
                    </button>
                </div>

                {/* Results Summary */}
                <div className="mb-3 text-sm text-gray-600">
                    Showing {filteredJurusan.length} of {data.jurusan.length} jurusan
                </div>

                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Id
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredJurusan.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                                No jurusan found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredJurusan.map((jurusan, i) => (
                                            <tr key={i} className="hover:bg-gray-100">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{jurusan._id}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{jurusan.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        <button
                                                            className='bg-yellow-500 p-1 rounded-lg shadow-lg text-white mr-1 hover:bg-yellow-600 transition-colors'
                                                        >
                                                            <ModeEditIcon />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(jurusan)}
                                                            className='bg-red-500 p-1 rounded-lg shadow-lg text-white hover:bg-red-600 transition-colors'
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
    )
}