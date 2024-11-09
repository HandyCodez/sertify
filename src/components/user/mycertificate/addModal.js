'use client'
import { useSession } from "next-auth/react"
import {
    Input,
    Option,
    Select,
    Button,
    Dialog,
    Textarea,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function AddModal({ open, setOpen, mutate }) {
    const { data: session, status } = useSession()

    const [formData, setFormData] = useState({
        id: '',
        namaSertifikat: '',
        jenisSertifikat: '',
        lembagaPenerbit: '',
        tanggalPenerbitan: '',
        nomorSertifikat: '',
        tingkatSertifikat: '',
        kategoriSertifikat: '',
        deskripsi: '',
        fileSertifikat: null
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (session?.user?.id) {
            setFormData(prev => ({
                ...prev,
                id: session.user.id
            }));
        }
    }, [session]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            fileSertifikat: e.target.files[0]
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
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            // Kirim ke API
            const response = await fetch('/api/certificate', {
                method: 'POST',
                body: data
            });

            if (!response.ok) {
                throw new Error('Gagal menambahkan sertifikat');
            }

            // Reset form dan tutup modal
            setFormData({
                namaSertifikat: '',
                jenisSertifikat: '',
                lembagaPenerbit: '',
                tanggalPenerbitan: '',
                nomorSertifikat: '',
                deskripsi: '',
                fileSertifikat: null
            });
            mutate();
            setOpen(false);

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
                        Add Certificate
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

                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Nama Sertifikat*
                        </Typography>
                        <Input
                            name="namaSertifikat"
                            value={formData.namaSertifikat}
                            onChange={handleChange}
                            placeholder="Masukkan nama sertifikat"
                            className="focus:!border-t-gray-900"
                        />
                    </div>

                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Tingkat Sertifikat*
                        </Typography>
                        <Input
                            name="tingkatSertifikat"
                            value={formData.tingkatSertifikat}
                            onChange={handleChange}
                            placeholder="Masukkan nama sertifikat"
                            className="focus:!border-t-gray-900"
                        />
                    </div>
                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Kategori Sertifikat*
                        </Typography>
                        <Input
                            name="kategoriSertifikat"
                            value={formData.kategoriSertifikat}
                            onChange={handleChange}
                            placeholder="Masukkan nama sertifikat"
                            className="focus:!border-t-gray-900"
                        />
                    </div>

                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Jenis Sertifikat*
                        </Typography>
                        <Select
                            name="jenisSertifikat"
                            value={formData.jenisSertifikat}
                            onChange={(value) => handleChange({ target: { name: 'jenisSertifikat', value } })}
                            placeholder="Pilih jenis sertifikat"
                        >
                            <Option value="kompetensi">Kompetensi</Option>
                            <Option value="pelatihan">Pelatihan</Option>
                            <Option value="penghargaan">Penghargaan</Option>
                        </Select>
                    </div>

                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Lembaga Penerbit*
                        </Typography>
                        <Input
                            name="lembagaPenerbit"
                            value={formData.lembagaPenerbit}
                            onChange={handleChange}
                            placeholder="Masukkan nama lembaga penerbit"
                        />
                    </div>

                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Tanggal Penerbitan
                        </Typography>
                        <Input
                            type="date"
                            name="tanggalPenerbitan"
                            value={formData.tanggalPenerbitan}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Nomor Sertifikat
                        </Typography>
                        <Input
                            name="nomorSertifikat"
                            value={formData.nomorSertifikat}
                            onChange={handleChange}
                            placeholder="Masukkan nomor sertifikat"
                        />
                    </div>

                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Deskripsi
                        </Typography>
                        <Textarea
                            name="deskripsi"
                            value={formData.deskripsi}
                            onChange={handleChange}
                            placeholder="Masukkan deskripsi sertifikat"
                        />
                    </div>

                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            File Sertifikat
                        </Typography>
                        <Input
                            type="file"
                            name="fileSertifikat"
                            onChange={handleFileChange}
                            accept="application/jpg"
                        />
                        <Typography variant="small" color="gray" className="mt-1">
                            Format yang diterima: JPG
                        </Typography>
                    </div>
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