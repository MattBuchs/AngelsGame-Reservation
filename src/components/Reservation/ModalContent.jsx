import { formatDate } from "../../utils/formatDate";

export default function ModalContent({ closeModal, roomInfos }) {
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
                <p>{roomInfos.name}</p>
                <p>{formatDate(roomInfos.day)}</p>
                <p>{roomInfos.hour}</p>
            </div>
        </div>
    );
}
