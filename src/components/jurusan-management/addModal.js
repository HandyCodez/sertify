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
    const [valueName, setValueName] = useState('')

    const handleSubmit = async () => {

        const response = await fetch(
            '/api/jurusan', {
            method: 'POST',
            body: JSON.stringify({
                name: valueName,
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
                Add Jurusan
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
                    Name
                </Typography>
                <Input
                    color="gray"
                    size="lg"
                    placeholder="..."
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
        </DialogBody>
        <DialogFooter>
            <Button className="ml-auto" onClick={() => handleSubmit()}>
                ADD
            </Button>
        </DialogFooter>
    </Dialog>
}