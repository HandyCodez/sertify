'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import LoadingScreen from "@/components/loadingScreen";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    Input,
    Typography,
    Option,
    Select
} from "@material-tailwind/react";
import useSWR from 'swr';
import Toast from '@/components/toast';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
    const { data: prodiData, isLoading: prodiLoading, error: prodiError } = useSWR('/api/prodi', fetcher);
    const { data: session, status } = useSession();
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const [isToastOpen, setIsToastOpen] = useState(false)
    const [messageToast, setToastMessage] = useState('')
    const [colorToast, setColorToast] = useState('')

    // Loading states
    if (status === 'loading' || prodiLoading) return <LoadingScreen />;
    if (!session) return <div>Please sign in to view this page.</div>;
    if (prodiError) return <div>{JSON.stringify(prodiError)}</div>;

    const onSubmit = async (event) => {
        event.preventDefault()
        setIsSubmitLoading(true)

        const formData = new FormData(event.target);


        try {
            const response = await fetch('/api/user', {
                method: 'PUT',
                body: formData
            })

            if (!response) {
                setColorToast('red')
                setToastMessage('Error')
                setIsToastOpen(true)
                return
            }
            setColorToast('green')
            setToastMessage('Success')
            setIsToastOpen(true)
        } catch (error) {
            console.log(error)
            setColorToast('red')
            setToastMessage('Error')
            setIsToastOpen(true)
        }
    }

    return (
        <main className="px-3">
            <Toast color={colorToast} message={messageToast} show={isToastOpen} onClose={setIsToastOpen} />
            <div className="bg-white rounded-lg shadow-lg p-6 mb-3">
                <div className="flex items-center mb-4">
                    <ArrowForwardIosIcon className="mr-3" />
                    <h1 className="text-xl font-bold">Your Account</h1>
                </div>
                <div className='flex justify-center'>
                    <form onSubmit={onSubmit}>
                        <div className='flex items-center gap-3 mb-3'>
                            <Typography variant="h6" color="gray">Name:</Typography>
                            <Input name='name' value={session.user.name} />
                        </div>
                        <div className='flex items-center gap-3 mb-3'>
                            <Typography variant="h6" color="gray">NIM:</Typography>
                            <Input name='nim' value={session.user.nim} />
                        </div>
                        <div className='flex items-center gap-3 mb-3'>
                            <Typography variant="h6" color="gray">Phone:</Typography>
                            <Input name='phone' value={session.user.phone} />
                        </div>
                        <div className='flex items-center gap-3 mb-3'>
                            <Typography variant="h6" color="gray">Prodi:</Typography>
                            <Select
                                name='prodi'
                                value={session.user.prodi._id}
                                onChange={(value) => console.log('Selected Prodi:', value)}
                            // disabled // Disable if you don't want to allow changes
                            >
                                {prodiData.prodi.map((prodi) => (
                                    <Option key={prodi._id} value={prodi._id}>{prodi.name}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className='flex justify-end'>
                            <button type='submit' className='bg-green-500 shadow-lg rounded-lg text-white px-3 py-1'>Ubah</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}