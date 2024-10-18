'use client'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useSWR from 'swr';
import { getSession } from 'next-auth/react';
import LoadingScreen from '@/components/loadingScreen';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddModal from '@/components/user-management/addModal';
import { useState } from 'react';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Page() {
    const { data, error, isLoading } = useSWR('/api/user', fetcher)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    if (isLoading) return <LoadingScreen />
    if (error) return <p>{JSON.stringify(error)}</p>

    return <main className="px-3">
        <AddModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
        <div className="bg-white rounded-lg shadow-lg p-3">
            <div className="mb-3 flex p-1 items-center">
                <ArrowForwardIosIcon className="mr-3" />
                <p className="text-xl font-bold">User Management</p>
            </div>

            <div className='mb-3 flex justify-start'>
                <button onClick={() => setIsAddModalOpen(true)} className='text-white p-1 px-2 rounded-lg shadow-lg bg-green-500'>+ User</button>
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
                                        role
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.users.map((user, i) => (
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
                                            <div className="text-sm text-gray-900">{user.role}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                <button className='bg-green-500 p-1 rounded-lg shadow-lg text-white mr-1'><VisibilityIcon /></button>
                                                <button className='bg-yellow-500 p-1 rounded-lg shadow-lg text-white mr-1'><ModeEditIcon /></button>
                                                <button className='bg-red-500 p-1 rounded-lg shadow-lg text-white'><DeleteIcon /></button>
                                            </div>
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
}