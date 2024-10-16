'use client'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useSWR from 'swr';
import { getSession } from 'next-auth/react';

const fetcherWithToken = async (url) => {
    const session = await getSession(); // Get session including JWT token

    if (!session) {
        throw new Error('Not authenticated');
    }

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session?.token}`, // Pass token in Authorization header
        },
    });

    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.');
        error.status = res.status;
        error.info = await res.json();
        throw error;
    }

    return res.json();
};


function useUserData() {
    const { data, error } = useSWR('/api/user', fetcherWithToken); // Use fetcher with token
    console.log('==========================s')

    if (error && error.status === 403) {
        return { data: null, error: 'You do not have permission to access this data' };
    }

    return {
        data,
        isLoading: !error && !data,
        isError: error
    };
}




export default function Page() {
    const { data, isLoading, isError, error } = useUserData();

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{JSON.stringify(error)}</p>
    return <div>{JSON.stringify(data)}</div>

    return <main className="px-3">
        <div className="bg-white rounded-lg shadow-lg p-3">
            <div className="mb-3 flex p-1 items-center">
                <ArrowForwardIosIcon className="mr-3" />
                <p className="text-xl font-bold">User Management</p>
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
                                {data.map((item, i) => (
                                    <tr key={i} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{i + 1}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{i + 1}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{i + 1}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{i + 1}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{i + 1}</div>
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