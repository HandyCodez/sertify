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
import { useEffect, useState } from "react";

export default function EditModal({ open, setOpen, mutate, user }) {
    const [valueNim, setValueNim] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const [valueName, setValueName] = useState('')
    const [valuePhone, setValuePhone] = useState('')
    const [valueJurusan, setValueJurusan] = useState('')
    const [valueProdi, setValueProdi] = useState('')
    const [valueRole, setValueRole] = useState('')
    const [jurusanList, setJurusanList] = useState([])
    const [prodiList, setProdiList] = useState([])

    // Fetch jurusan dan prodi
    useEffect(() => {
        const fetchJurusanAndProdi = async () => {
            try {
                const response = await fetch('/api/jurusan')
                const result = await response.json()
                if (result.success) {
                    setJurusanList(result.jurusan)
                }
            } catch (error) {
                console.error('Error fetching jurusan and prodi:', error)
            }
        }

        fetchJurusanAndProdi()
    }, [])

    // Set initial values when user data changes
    useEffect(() => {
        if (user) {
            setValueNim(user.nim)
            setValueName(user.name)
            setValuePhone(user.phone)
            setValueJurusan(user.jurusan)
            setValueProdi(user.prodi)
            setValueRole(user.role)
        }
    }, [user])

    // Update prodi list when jurusan changes
    useEffect(() => {
        if (valueJurusan) {
            const selectedJurusan = jurusanList.find(j => j._id === valueJurusan)
            if (selectedJurusan) {
                setProdiList(selectedJurusan.prodi || [])
                setValueProdi('') // Reset prodi selection
            }
        }
    }, [valueJurusan, jurusanList])

    const handleSubmit = async () => {
        try {
            const dataToUpdate = {
                nim: valueNim,
                name: valueName,
                phone: valuePhone,
                jurusan: valueJurusan,
                prodi: valueProdi,
                role: valueRole
            }

            if (valuePassword) {
                dataToUpdate.password = valuePassword
            }

            const response = await fetch(
                `/api/user/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToUpdate)
            })

            const result = await response.json()

            if (result.success) {
                mutate()
                setOpen(false)
            } else {
                console.error('Update failed:', result.error)
            }
        } catch (error) {
            console.error('Error updating user:', error)
        }
    }

    return (
        <Dialog size="sm"
            open={open}
            handler={() => setOpen(!open)}
            className="h-[90vh] overflow-y-auto"
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        >
            <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blue-gray">
                    Edit User
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
                {/* NIM Input */}
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                        NIM
                    </Typography>
                    <Input
                        value={valueNim}
                        onChange={(e) => setValueNim(e.target.value)}
                        type="number"
                        placeholder="1234567"
                    />
                </div>

                {/* Password Input */}
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                        Password (Leave blank to keep current password)
                    </Typography>
                    <Input
                        value={valuePassword}
                        onChange={(e) => setValuePassword(e.target.value)}
                        type="password"
                        placeholder="Enter new password"
                    />
                </div>

                {/* Name Input */}
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                        Name
                    </Typography>
                    <Input
                        value={valueName}
                        onChange={(e) => setValueName(e.target.value)}
                        placeholder="Full Name"
                    />
                </div>

                {/* Phone Input */}
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                        Phone
                    </Typography>
                    <Input
                        value={valuePhone}
                        onChange={(e) => setValuePhone(e.target.value)}
                        type="number"
                        placeholder="081234567890"
                    />
                </div>

                {/* Jurusan Select */}
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium text-black">
                        Jurusan
                    </Typography>
                    <Select
                        value={valueJurusan}
                        onChange={(value) => setValueJurusan(value)}
                        className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800"
                    >
                        {jurusanList.map((jurusan) => (
                            <Option key={jurusan._id} value={jurusan._id}>
                                {jurusan.name}
                            </Option>
                        ))}
                    </Select>
                </div>

                {/* Prodi Select */}
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                        Program Studi
                    </Typography>
                    <Select
                        value={valueProdi}
                        onChange={(value) => setValueProdi(value)}
                        className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800"
                        disabled={!valueJurusan}
                    >
                        {prodiList.map((prodi) => (
                            <Option key={prodi._id} value={prodi._id}>
                                {prodi.name}
                            </Option>
                        ))}
                    </Select>
                </div>

                {/* Role Select */}
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                        Role
                    </Typography>
                    <Select
                        value={valueRole}
                        onChange={(value) => setValueRole(value)}
                        className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800"
                    >
                        <Option value="superadmin">Superadmin</Option>
                        <Option value="admin">Admin</Option>
                        <Option value="user">User</Option>
                    </Select>
                </div>
            </DialogBody>
            <DialogFooter>
                <Button className="ml-auto" onClick={handleSubmit}>
                    Update
                </Button>
            </DialogFooter>
        </Dialog>
    )
}