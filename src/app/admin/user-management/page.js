'use client'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import useSWR from 'swr';
import LoadingScreen from '@/components/loadingScreen';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddModal from '@/components/user-management/addModal';
import { useState, useMemo } from 'react';
import { DeleteModal } from '@/components/user-management/deleteModal';
import EditModal from '@/components/user-management/editModal';
import { Input, Select, Option } from "@material-tailwind/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Page() {
    const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectData, setSelectData] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchBy, setSearchBy] = useState('name')

    const handleDelete = async (user) => {
        setSelectData(user)
        setIsDeleteModalOpen(true)
    }

    const handleEdit = async (user) => {
        setSelectData(user)
        setIsEditModalOpen(true)
    }

    const filteredUsers = useMemo(() => {
        if (!data || !data.users) return [];
        if (!searchTerm) return data.users;

        return data.users.filter(user => {
            const searchValue = String(user[searchBy] || '').toLowerCase();
            return searchValue.includes(searchTerm.toLowerCase());
        });
    }, [data, searchTerm, searchBy]);

    if (isLoading) return <LoadingScreen />
    if (error) return <p>{JSON.stringify(error)}</p>

    return <main className="px-3">
        <AddModal open={isAddModalOpen} setOpen={setIsAddModalOpen} mutate={mutate} />
        <DeleteModal open={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} data={selectData} mutate={mutate} />
        <EditModal open={isEditModalOpen} setOpen={setIsEditModalOpen} mutate={mutate} user={selectData} />
        <div className="bg-white rounded-lg shadow-lg p-3">
            <div className="mb-3 flex p-1 items-center">
                <ArrowForwardIosIcon className="mr-3" />
                <p className="text-xl font-bold">User Management</p>
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
                        <Option value="nim">NIM</Option>
                        <Option value="name">Name</Option>
                        <Option value="phone">Phone</Option>
                        <Option value="role">Role</Option>
                    </Select>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className='text-white p-2 px-4 rounded-lg shadow-lg bg-green-500 hover:bg-green-600 transition-colors'
                >
                    + Add User
                </button>
            </div>

            {/* Results Summary */}
            <div className="mb-3 text-sm text-gray-600">
                Showing {filteredUsers.length} of {data.users.length} users
            </div>

            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NIM
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        phone
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Jurusan
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Prodi
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        role
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user, i) => (
                                        <tr key={i} className="hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.nim}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.jurusan?.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.prodi?.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.role}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className='bg-yellow-500 p-1 rounded-lg shadow-lg text-white mr-1 hover:bg-yellow-600 transition-colors'
                                                    >
                                                        <ModeEditIcon />
                                                    </button>
                                                    {user.role !== "superadmin" && (
                                                        <button
                                                            onClick={() => handleDelete(user)}
                                                            className='bg-red-500 p-1 rounded-lg shadow-lg text-white hover:bg-red-600 transition-colors'
                                                        >
                                                            <DeleteIcon />
                                                        </button>
                                                    )}
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
}