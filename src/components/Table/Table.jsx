import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { getData } from "../../features/rooms.js";
import spinner from "../../assets/spinner.svg";
import ModalContent from "../Reservation/ModalContent.jsx";
import { createPortal } from "react-dom";

export default function Table() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [roomInfos, setRoomInfos] = useState({
        name: null,
        day: null,
        hour: null,
    });
    const rooms = useSelector((state) => state.rooms);

    if (!rooms.roomsData && !rooms.loading && !rooms.error) {
        dispatch(getData());
    }

    const handleReservation = (room, session) => {
        const currentDay = new Date();
        currentDay.setHours(0, 0, 0, 0);

        const [year, month, day] = room.day.split("-");
        const dayChoiced = new Date(year, month - 1, day);

        if (
            !session.is_blocked &&
            currentDay.getTime() <= dayChoiced.getTime()
        ) {
            setShowModal(true);
            setRoomInfos({
                name: room.name,
                day: room.day,
                hour: session.hour,
            });
        }
    };

    let content;
    if (rooms.loading) {
        content = <img src={spinner} alt="Chargement en cours..." />;
    } else if (rooms.error) {
        content = <p className="text-red-600">Une erreur est survenue...</p>;
    } else if (rooms.roomsData) {
        // Trouver la taille maximale du tableau de sessions pour toutes les pièces
        const maxSessionsLength = Math.max(
            ...rooms.roomsData.map((room) => room.sessions.length)
        );

        content = rooms.roomsData.map((room) => (
            <div key={nanoid(8)} className="w-20 border">
                <div
                    title={room.name}
                    className="border w-full h-10 flex justify-center items-center bg-slate-300"
                >
                    <img src={room.icon} alt={room.name} className="w-7 h-7" />
                </div>
                <div>
                    {Array.from({ length: maxSessionsLength }).map(
                        (_, index) => {
                            const session = room.sessions[index];
                            return (
                                <button
                                    key={nanoid(8)}
                                    onClick={() =>
                                        handleReservation(room, session)
                                    }
                                    className={`${
                                        session && session.is_blocked
                                            ? "bg-gray-500/50 cursor-default"
                                            : "hover:bg-blue-200"
                                    } border flex justify-center items-center w-full h-8`}
                                >
                                    {session
                                        ? session.is_blocked
                                            ? "Complet"
                                            : session.hour
                                        : "-"}
                                </button>
                            );
                        }
                    )}
                </div>
            </div>
        ));
    }

    return (
        <>
            <div className="flex">{content}</div>
            {rooms.roomsData && (
                <div>
                    {rooms.roomsData.map((room) => (
                        <p key={nanoid(8)}>
                            <img
                                src={room.icon}
                                alt={room.name}
                                className="w-10 h-10 inline"
                            />
                            <span>= {room.name}</span>
                        </p>
                    ))}
                </div>
            )}
            {showModal &&
                createPortal(
                    <ModalContent
                        closeModal={() => setShowModal(false)}
                        roomInfos={roomInfos}
                    />,
                    document.body
                )}
        </>
    );
}
