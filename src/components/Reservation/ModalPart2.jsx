export default function ModalPart2({
    closeModal,
    roomDate,
    roomInfos,
    setShowModal1,
}) {
    const handleGoBack = () => {
        closeModal();
        setShowModal1(true);
    };

    return (
        <div
            onClick={closeModal}
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-300 text-slate-900 p-10 rounded relative mb-[10vh]"
            >
                <button
                    onClick={closeModal}
                    className="absolute top-1 right-1 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center"
                >
                    X
                </button>
                <form>
                    <button>Réserver</button>
                </form>
                <div>
                    <h2>Récap</h2>
                    <p>{roomDate.name}</p>
                </div>

                <div className="flex">
                    <button onClick={handleGoBack}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#fff"
                            viewBox="0 0 320 512"
                            width="1.5rem"
                            height="1.5rem"
                        >
                            Font Awesome Free 6.5.1 by @fontawesome -
                            https://fontawesome.com License -
                            https://fontawesome.com/license/free Copyright 2024
                            Fonticons, Inc.
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                        </svg>
                    </button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gray"
                        opacity="0.4"
                        viewBox="0 0 320 512"
                        width="1.5rem"
                        height="1.5rem"
                    >
                        Font Awesome Free 6.5.1 by @fontawesome -
                        https://fontawesome.com License -
                        https://fontawesome.com/license/free Copyright 2024
                        Fonticons, Inc.
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
