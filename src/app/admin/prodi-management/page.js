'use client'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import useSWR from 'swr';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingScreen from '@/components/loadingScreen';
import { useState } from 'react';
import AddModal from '@/components/prodi-management/addModal';
import { DeleteModal } from '@/components/prodi-management/deleteModal';
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Page() {
    const { data, isLoading, error, mutate } = useSWR('/api/prodi', fetcher)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectData, setSelectData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    if (isLoading) return <LoadingScreen />
    if (error) return <p>{JSON.stringify(error)}</p>

    const handleDelete = async (prodi) => {
        setSelectData(prodi)
        setIsDeleteModalOpen(true)
    }

    const filteredProdi = data.prodi.filter(prodi =>
        prodi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prodi.jurusan.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return <main className="px-3">
        <AddModal open={isAddModalOpen} setOpen={setIsAddModalOpen} mutate={mutate} />
        <DeleteModal open={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} data={selectData} mutate={mutate} />
        <div className="bg-white rounded-lg shadow-lg p-3 mb-3">
            <div className="mb-3 flex p-1 items-center">
                <ArrowForwardIosIcon className="mr-3" />
                <p className="text-xl font-bold">Prodi Management</p>
            </div>

            <div className='mb-3 flex justify-between items-center'>
                <button onClick={() => setIsAddModalOpen(true)} className='text-white p-1 px-2 rounded-lg shadow-lg bg-green-500'>+ Jurusan</button>

                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari prodi atau jurusan..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Jurusan
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProdi.map((prodi, i) => (
                                    <tr key={i} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{prodi.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{prodi.jurusan.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {/* <button className='bg-yellow-500 p-1 rounded-lg shadow-lg text-white mr-1'><ModeEditIcon /></button> */}
                                                <button onClick={() => handleDelete(prodi)} className='bg-red-500 p-1 rounded-lg shadow-lg text-white'><DeleteIcon /></button>
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