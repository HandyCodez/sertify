'use client'
import React, { useState, useEffect } from "react";
import { Button, Input, Typography, Card, CardBody, Select, Option } from "@material-tailwind/react";
import Link from "next/link";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        nim: "",
        password: "",
        name: "",
        jurusan: "",
        prodi: "",
        phone: "",
    });

    // State untuk menyimpan list jurusan dan prodi
    const [jurusanList, setJurusanList] = useState([]);
    const [prodiList, setProdiList] = useState([]);

    // Fungsi untuk mengambil data jurusan dan prodi
    useEffect(() => {
        // Di sini Anda bisa menambahkan API call untuk mengambil data jurusan
        // fetchJurusan();
    }, []);

    // Mengupdate prodi ketika jurusan berubah
    useEffect(() => {
        if (formData.jurusan) {
            // Di sini Anda bisa menambahkan API call untuk mengambil data prodi berdasarkan jurusan
            // fetchProdi(formData.jurusan);
        }
    }, [formData.jurusan]);

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
            // Handle sign-up logic here (API call, etc.)
            console.log(formData);
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
                                type="text"
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
                                label="Jurusan"
                                name="jurusan"
                                value={formData.jurusan}
                                onChange={(value) => handleChange({ target: { name: 'jurusan', value } })}
                                required
                            >
                                {jurusanList.map((jurusan) => (
                                    <Option key={jurusan._id} value={jurusan._id}>
                                        {jurusan.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="mb-4">
                            <Select
                                label="Prodi"
                                name="prodi"
                                value={formData.prodi}
                                onChange={(value) => handleChange({ target: { name: 'prodi', value } })}
                                required
                                disabled={!formData.jurusan}
                            >
                                {prodiList.map((prodi) => (
                                    <Option key={prodi._id} value={prodi._id}>
                                        {prodi.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Phone"
                                type="tel"
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