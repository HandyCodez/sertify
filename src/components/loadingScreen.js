export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-white z-50">
            <div className="flex flex-col items-center text-center">
                <img
                    className="mb-3"
                    style={{ width: 200 }}
                    src="https://custom-doodle.com/wp-content/uploads/doodle/chainsaw-man-happy-pochita/chainsaw-man-happy-pochita-doodle.gif"
                    alt="Loading"
                />
                <div className="mt-2">
                    <p className="text-gray-700">Loading...</p>
                </div>
            </div>
        </div>
    );
}
