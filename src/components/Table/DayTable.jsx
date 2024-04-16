import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { resetState } from "../../features/reservation.js";
import spinner from "../../assets/spinner.svg";
import ModalPart1 from "../Reservation/ModalPart1.jsx";
import ModalPart2 from "../Reservation/ModalPart2.jsx";

export default function DayTable() {
    const dispatch = useDispatch();
    const [fetchRoomInfos, setFetchRoomInfos] = useState({
        data: undefined,
        loading: false,
        error: false,
    });
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [roomDate, setRoomDate] = useState({
        name: null,
        day: null,
        hour: null,
        icon: null,
    });
    const rooms = useSelector((state) => state.rooms);

    const handleReservation = (room, session) => {
        dispatch(resetState());
        const currentDay = new Date();
        currentDay.setHours(0, 0, 0, 0);

        const [year, month, day] = room.day.split("-");
        const dayChoiced = new Date(year, month - 1, day);

        if (
            !session.is_blocked &&
            !session.is_closed &&
            currentDay.getTime() <= dayChoiced.getTime()
        ) {
            setShowModal1(true);
            setRoomDate({
                name: room.name,
                day: room.day,
                hour: session.hour,
                icon: room.icon,
            });

            setFetchRoomInfos({ ...fetchRoomInfos, loading: true });
            fetch(
                `${import.meta.env.VITE_API_URL}/get-prices?room_id=${
                    room.room_id
                }`
            )
                .then((response) => {
                    if (!response.ok) throw new Error();
                    return response.json();
                })
                .then((data) => {
                    setFetchRoomInfos({
                        ...fetchRoomInfos,
                        data: data.roomInfos,
                        loading: false,
                    });
                })
                .catch(() =>
                    setFetchRoomInfos({
                        ...fetchRoomInfos,
                        error: true,
                        loading: false,
                    })
                );
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

        content = (
            <>
                <div key={nanoid(8)} className="flex mt-1">
                    {rooms.roomsData.map((room) => (
                        <div key={nanoid(8)} className="w-32">
                            <div
                                title={room.name}
                                className="border w-full h-14 flex justify-center items-center bg-slate-300 p-2"
                            >
                                <img
                                    src={room.icon}
                                    alt={room.name}
                                    className="w-full h-full"
                                />
                            </div>
                            <ul>
                                {Array.from({ length: maxSessionsLength }).map(
                                    (_, index) => {
                                        const session = room.sessions[index];
                                        return (
                                            <li key={nanoid(8)}>
                                                <button
                                                    onClick={() =>
                                                        handleReservation(
                                                            room,
                                                            session
                                                        )
                                                    }
                                                    disabled={
                                                        !session ||
                                                        session.is_closed
                                                    }
                                                    className={`${
                                                        session
                                                            ? `${
                                                                  session.is_blocked ||
                                                                  session.is_closed
                                                                      ? "bg-gray-500/50 cursor-default"
                                                                      : `${
                                                                            session
                                                                                ? "hover:bg-blue-200"
                                                                                : ""
                                                                        }`
                                                              }`
                                                            : "bg-gray-500/50 cursor-default"
                                                    } border flex justify-center items-center w-full h-10`}
                                                >
                                                    {session
                                                        ? `${
                                                              session.is_closed
                                                                  ? "Fermer"
                                                                  : `${
                                                                        session.is_blocked
                                                                            ? "Complet"
                                                                            : session.hour
                                                                    }`
                                                          }`
                                                        : "-"}
                                                </button>
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
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
            </>
        );
    }

    return (
        <>
            {content}
            {showModal1 &&
                createPortal(
                    <ModalPart1
                        closeModal={() => setShowModal1(false)}
                        roomDate={roomDate}
                        roomInfos={fetchRoomInfos}
                        setShowModal2={setShowModal2}
                    />,
                    document.body
                )}
            {showModal2 &&
                createPortal(
                    <ModalPart2
                        closeModal={() => setShowModal2(false)}
                        roomDate={roomDate}
                        roomInfos={fetchRoomInfos}
                        setShowModal1={setShowModal1}
                    />,
                    document.body
                )}
        </>
    );
}
