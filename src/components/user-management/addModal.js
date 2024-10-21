'use client'
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
import { useState } from "react";


export default function AddModal({ open, setOpen, mutate }) {
    const [valueNim, setValueNim] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const [valueName, setValueName] = useState('')
    const [valuePhone, setValuePhone] = useState('')
    const [valueRole, setValueRole] = useState('')

    const handleSubmit = async () => {

        const response = await fetch(
            '/api/user', {
            method: 'POST',
            body: JSON.stringify({
                nim: valueNim,
                password: valuePassword,
                name: valueName,
                phone: valuePhone,
                role: valueRole
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


    return <Dialog size="sm" open={open} handler={() => setOpen(!open)} className="p-4">
        <DialogHeader className="relative m-0 block">
            <Typography variant="h4" color="blue-gray">
                Add User
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
                    NIM
                </Typography>
                <Input
                    color="gray"
                    size="lg"
                    placeholder="1234567"
                    name="nim"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    type="number"
                    onChange={(e) => setValueNim(e.target.value)}
                />
            </div>
            <div>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                >
                    Password
                </Typography>
                <Input
                    color="gray"
                    size="lg"
                    placeholder="1234567"
                    name="password"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    type="password"
                    onChange={(e) => setValuePassword(e.target.value)}
                />
            </div>
            <div>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                >
                    Name
                </Typography>
                <Input
                    color="gray"
                    size="lg"
                    placeholder="Sky Oliver"
                    name="name"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    onChange={(e) => setValueName(e.target.value)}
                />
            </div>
            <div>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                >
                    Phone
                </Typography>
                <Input
                    color="gray"
                    size="lg"
                    placeholder="081234566789"
                    name="phone"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    type="number"
                    onChange={(e) => setValuePhone(e.target.value)}
                />
            </div>
            <div>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                >
                    Role
                </Typography>
                <Select
                    className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                    placeholder="1"
                    labelProps={{
                        className: "hidden",
                    }}
                >
                    <Option onClick={() => setValueRole('admin')} value="admin">Admin</Option>
                    <Option onClick={() => setValueRole('user')} value="user">User</Option>
                </Select>
            </div>
        </DialogBody>
        <DialogFooter>
            <Button className="ml-auto" onClick={() => handleSubmit()}>
                ADD
            </Button>
        </DialogFooter>
    </Dialog>
}