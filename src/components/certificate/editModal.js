'use client'
import { useSession } from "next-auth/react";
import {
    Input,
    Option,
    Select,
    Button,
    Dialog,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function EditModal({ open, setOpen, mutate, certificate }) {
    const { data: session } = useSession();

    const [formData, setFormData] = useState({
        userId: session?.user?.id || '',
        idSertifikat: certificate?._id || '',
        namaSertifikat: '',
        jenisSertifikat: '',
        lembagaPenerbit: '',
        tanggalPenerbitan: '',
        nomorSertifikat: '',
        tingkatSertifikat: '',
        kategoriSertifikat: '',
        deskripsi: '',
        fileSertifikat: null,
        status: 'NT', // Default status
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (certificate) {
            setFormData({
                userId: session?.user?.id || '',
                idSertifikat: certificate._id || '',
                namaSertifikat: certificate.namaSertifikat || '',
                jenisSertifikat: certificate.jenisSertifikat || '',
                lembagaPenerbit: certificate.lembagaPenerbit || '',
                tanggalPenerbitan: certificate.tanggalPenerbitan || '',
                nomorSertifikat: certificate.nomorSertifikat || '',
                tingkatSertifikat: certificate.tingkatSertifikat || '',
                kategoriSertifikat: certificate.kategoriSertifikat || '',
                deskripsi: certificate.deskripsi || '',
                fileSertifikat: null,
                status: certificate.status || 'NT', // Set status from certificate data
            });
        }
    }, [certificate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            fileSertifikat: e.target.files[0],
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError('');

            // Validasi form
            if (!formData.namaSertifikat || !formData.jenisSertifikat || !formData.lembagaPenerbit) {
                throw new Error('Mohon isi semua field yang wajib');
            }

            // Buat FormData untuk upload file
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            // Kirim ke API
            const response = await fetch(`/api/certificate`, {
                method: 'PUT', // Menggunakan PUT untuk edit
                body: data,
            });

            if (!response.ok) {
                throw new Error('Gagal mengedit sertifikat');
            }

            // Reset form dan tutup modal
            setOpen(false);
            mutate(); // Refresh data setelah edit
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog size="md" open={open} handler={() => setOpen(!open)} className="p-4">
            <div className="h-[90vh] flex flex-col">
                <DialogHeader className="relative m-0 block shrink-0">
                    <Typography variant="h4" color="blue-gray">
                        Edit Certificate
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={() => setOpen(!open)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6 overflow-y-auto flex-1">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {Object.entries(formData).map(([key, value]) => (
                        // Sembunyikan input userId dan idSertifikat
                        (key !== 'userId' && key !== 'idSertifikat') && (
                            <div key={key}>
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                    {key === 'namaSertifikat' ? 'Nama Sertifikat*' :
                                        key === 'tingkatSertifikat' ? 'Tingkat Sertifikat*' :
                                            key === 'kategoriSertifikat' ? 'Kategori Sertifikat*' :
                                                key === 'jenisSertifikat' ? 'Jenis Sertifikat*' :
                                                    key === 'lembagaPenerbit' ? 'Lembaga Penerbit*' :
                                                        key === 'tanggalPenerbitan' ? 'Tanggal Penerbitan' :
                                                            key === 'nomorSertifikat' ? 'Nomor Sertifikat' :
                                                                key === 'deskripsi' ? 'Deskripsi' :
                                                                    key === 'fileSertifikat' ? 'File Sertifikat' :
                                                                        key === 'status' ? 'Status*' : ''}
                                </Typography>
                                {key === 'jenisSertifikat' ? (
                                    <Input
                                        type={key === 'tanggalPenerbitan' ? 'date' : key === 'fileSertifikat' ? 'file' : 'text'}
                                        name={key}
                                        value={key === 'fileSertifikat' ? undefined : value}
                                        onChange={key === 'fileSertifikat' ? handleFileChange : handleChange}
                                        placeholder={key === 'fileSertifikat' ? undefined : `Masukkan ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                        accept={key === 'fileSertifikat' ? 'image/jpeg' : undefined}
                                    />
                                ) : key === 'status' ? (
                                    <Select
                                        name={key}
                                        value={value}
                                        onChange={(val) => handleChange({ target: { name: key, value: val } })}
                                    >
                                        <Option value="NT">Belum Terverifikasi</Option>
                                        <Option value="T">Terverifikasi</Option>
                                        <Option value="G">Gagal Diverifikasi</Option>
                                    </Select>
                                ) : (
                                    <Input
                                        type={key === 'tanggalPenerbitan' ? 'date' : key === 'fileSertifikat' ? 'file' : 'text'}
                                        name={key}
                                        value={key === 'fileSertifikat' ? undefined : value}
                                        onChange={key === 'fileSertifikat' ? handleFileChange : handleChange}
                                        placeholder={key === 'fileSertifikat' ? undefined : `Masukkan ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                        accept={key === 'fileSertifikat' ? 'image/jpeg' : undefined}
                                    />
                                )}
                            </div>
                        )
                    ))}
                </DialogBody>
                <DialogFooter className="space-x-2 shrink-0">
                    <Button
                        variant="outlined"
                        color="red"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-blue-500"
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogFooter>
            </div>
        </Dialog>
    );
}