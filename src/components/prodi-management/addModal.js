'use client'
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
import { useState } from "react";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function AddModal({ open, setOpen, mutate }) {
    const { data, isLoading, error } = useSWR('/api/jurusan', fetcher)
    const [valueProdi, setValueProdi] = useState('')
    const [valueJurusan, setValueJurusan] = useState('')

    const handleSubmit = async () => {
        const response = await fetch(
            '/api/prodi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: valueProdi,
                jurusan: valueJurusan
            })
        }
        )

        const result = await response.json()

        if (result.success) {
            mutate()
            setOpen(false)
        } else {
            console.log(result)
        }
    }

    return (
        <Dialog size="sm" open={open} handler={() => setOpen(!open)} className="p-4">
            {isLoading ? <p>Loading...</p> : error ? <p>{JSON.stringify(error)}</p> : (
                <>
                    <DialogHeader className="relative m-0 block">
                        <Typography variant="h4" color="blue-gray">
                            Add Prodi
                        </Typography>
                        <IconButton
                            size="sm"
                            variant="text"
                            className="!absolute right-3.5 top-3.5"
                            onClick={() => setOpen(!open)}
                        >
                            X
                        </IconButton>
                    </DialogHeader>
                    <DialogBody className="space-y-4 pb-6">
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Nama Prodi
                            </Typography>
                            <Input
                                color="gray"
                                size="lg"
                                placeholder="Nama Prodi"
                                name="prodi"
                                className="placeholder:opacity-100 focus:!border-t-gray-900"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                                type="text"
                                onChange={(e) => setValueProdi(e.target.value)}
                            />
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Jurusan
                            </Typography>
                            <Select
                                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                                placeholder="Pilih Jurusan"
                                labelProps={{
                                    className: "hidden",
                                }}
                                onChange={(value) => setValueJurusan(value)}
                            >
                                {data.jurusan.map((jurusan, i) => (
                                    <Option key={jurusan._id} value={jurusan._id}>
                                        {jurusan.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button className="ml-auto" onClick={handleSubmit}>
                            ADD
                        </Button>
                    </DialogFooter>
                </>
            )}
        </Dialog>
    )
}