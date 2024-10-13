export default function Page() {
    return (
        <main className="px-3">
            <div className="flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:w-1/2">
                    <div className="bg-white rounded-lg shadow-lg p-3 text-center">
                        <p className="font-bold">Jumlah Sertifikat</p>
                        <p className="text-xl font-semibold">20</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-3 text-center">
                        <p className="font-bold">Certificate Unverified</p>
                        <p className="text-xl font-semibold">15</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-3 text-center">
                        <p className="font-bold">Certificate Verified</p>
                        <p className="text-xl font-semibold">10</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
