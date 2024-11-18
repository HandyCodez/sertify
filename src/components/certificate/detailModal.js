import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";

export default function DetailModal({ open, setOpen, certificate }) {
    return (
        <Dialog open={open} size="xxl" handler={() => setOpen(!open)}>
            <div className="h-screen flex flex-col">
                <DialogHeader className="relative m-0 block shrink-0">{certificate?.user?.name}'s Certificate</DialogHeader>
                <DialogBody className="space-y-4 pb-6 overflow-y-auto flex-1">
                    <div className="flex justify-center">
                        {certificate ? (<>
                            <img className="w-1/4 mr-3" src={certificate.fileSertifikat} alt={`Certificate of ${certificate.user.name}`} />
                            <div>
                                <ul>
                                    <li>Nama Sertifikat : {certificate.namaSertifikat}</li>
                                    <li>Jenis : {certificate.jenisSertifikat}</li>
                                    <li>Lembaga Penerbit : {certificate.lembagaPenerbit}</li>
                                    <li>Tanggal Terbit : {certificate.tanggalPenerbitan}</li>
                                    <li>Nomor : {certificate.nomorSertifikat}</li>
                                    <li>Tingkat : {certificate.tingkatSertifikat}</li>
                                    <li>Deskripsi : {certificate.deskripsi}</li>
                                    <li>Kategori : {certificate.kategoriSertifikat}</li>
                                    <li>status : <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${certificate.status === "NT" ? "bg-yellow-200 text-yellow-800" : certificate.status === "T" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                                        {certificate.status === "NT" ? "Unverified" : certificate.status === "T" ? "Verified" : "Invalid"}
                                    </span></li>
                                </ul>
                                <button onClick={() => window.open(certificate.fileSertifikat, '_blank')} className="bg-blue-500 text-white px-3 py-1 rounded-lg mt-3">Lihat File</button>
                            </div>
                        </>
                        ) : (
                            <p className="text-gray-500">No certificate available.</p>
                        )}
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" color="green" onClick={() => setOpen(false)}>
                        <span>Exit</span>
                    </Button>
                </DialogFooter>
            </div>
        </Dialog>
    );
}