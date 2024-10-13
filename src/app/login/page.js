'use client'
import React, { useState } from "react";
import { Button, Input, Typography, Card, CardBody } from "@material-tailwind/react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here (API call, etc.)
        console.log({ email, password });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-96 p-6 shadow-lg">
                <CardBody>
                    <Typography variant="h4" className="text-center mb-4">
                        Login
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" fullWidth color="blue">
                            Log In
                        </Button>
                    </form>
                    <Typography variant="small" className="text-center mt-4">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </Typography>
                </CardBody>
            </Card>
        </div>
    );
}
