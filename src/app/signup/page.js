'use client'
import React, { useState, useEffect } from "react";
import { Button, Input, Typography, Card, CardBody, Select, Option } from "@material-tailwind/react";
import Link from "next/link";
import LoadingScreen from "@/components/loadingScreen";
import useSWR from "swr";
import { useRouter } from "next/navigation";
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function SignUpPage() {
    const router = useRouter()
    const { data: prodi, isLoading, error } = useSWR('/api/prodi', fetcher)
    const [formData, setFormData] = useState({
        nim: "",
        password: "",
        name: "",
        prodi: "",
        phone: "",
    });

    if (isLoading) return <LoadingScreen />
    if (error) return <div>Failed to load data</div>

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                '/api/user', {
                method: 'POST',
                body: JSON.stringify(formData)
            }
            )

            const result = await response.json()
            if (result.success) {
                router.push('/login')
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-96 p-6 shadow-lg">
                <CardBody>
                    <Typography variant="h4" className="text-center mb-4">
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSignUp}>
                        <div className="mb-4">
                            <Input
                                label="NIM"
                                type="number"
                                name="nim"
                                value={formData.nim}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label="Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Select
                                label="Prodi"
                                name="prodi"
                                value={formData.prodi}
                                onChange={(value) => handleChange({ target: { name: 'prodi', value } })}
                                required
                            // disabled={!formData.jurusan}
                            >
                                {prodi.prodi.map((prodi) => (
                                    <Option key={prodi._id} value={prodi._id}>
                                        {prodi.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Phone"
                                type="number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button type="submit" fullWidth color="green">
                            Sign Up
                        </Button>
                    </form>
                    <Typography variant="small" className="text-center mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Log In
                        </Link>
                    </Typography>
                </CardBody>
            </Card>
        </div>
    );
}