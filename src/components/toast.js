import { useState, useEffect } from "react";
import { Alert } from "@material-tailwind/react";

const Toast = ({ show, message, duration = 3000, onClose, color }) => {
    useEffect(() => {
        let timeout;
        if (show) {
            // Mengatur timer untuk menutup toast otomatis setelah beberapa waktu
            timeout = setTimeout(() => {
                onClose();
            }, duration);
        }

        return () => clearTimeout(timeout); // Membersihkan timeout jika komponen di-unmount
    }, [show, duration, onClose]);

    if (!show) return null; // Jika tidak ada toast yang ditampilkan, jangan render apa-apa

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Alert color={color} className="shadow-lg">
                {message}
            </Alert>
        </div>
    );
};

export default Toast;
