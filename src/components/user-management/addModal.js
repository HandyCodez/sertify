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


export default function AddModal({ open, setOpen }) {
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
                    placeholder="eg. White Shoes"
                    name="nim"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
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
                    placeholder="eg. White Shoes"
                    name="name"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
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
                    placeholder="eg. White Shoes"
                    name="phone"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    type="number"
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
                    <Option>Admin</Option>
                    <Option>User</Option>
                </Select>
            </div>
        </DialogBody>
        <DialogFooter>
            <Button className="ml-auto" onClick={() => setOpen(!open)}>
                ADD
            </Button>
        </DialogFooter>
    </Dialog>
}