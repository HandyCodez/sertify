'use client'
import React, { useState } from "react";
import { Button, Input, Typography, Card, CardBody } from "@material-tailwind/react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [nim, setNim] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                nim,
                password,
                redirect: false
            });

            if (result.error) {
                setError(result.error);
            } else {
                // Redirect berdasarkan role akan ditangani oleh middleware
                router.refresh();
                router.push("/");
            }
        } catch (error) {
            setError("Terjadi kesalahan saat login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-96 p-6 shadow-lg">
                <CardBody>
                    <Typography variant="h4" className="text-center mb-4">
                        Login
                    </Typography>
                    {error && (
                        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <Input
                                label="NIM"
                                type="text"
                                value={nim}
                                onChange={(e) => setNim(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            color="blue"
                            disabled={loading}
                            className="flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Loading...
                                </>
                            ) : (
                                "Log In"
                            )}
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