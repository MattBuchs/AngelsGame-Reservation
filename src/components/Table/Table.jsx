import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { getData } from "../../features/rooms.js";
import { resetState } from "../../features/reservation.js";
import spinner from "../../assets/spinner.svg";
import ModalPart1 from "../Reservation/ModalPart1.jsx";
import ModalPart2 from "../Reservation/ModalPart2.jsx";

export default function Table() {
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
    });
    const rooms = useSelector((state) => state.rooms);

    if (!rooms.roomsData && !rooms.loading && !rooms.error) {
        dispatch(getData());
    }

    const handleReservation = (room, session) => {
        dispatch(resetState());
        const currentDay = new Date();
        currentDay.setHours(0, 0, 0, 0);

        const [year, month, day] = room.day.split("-");
        const dayChoiced = new Date(year, month - 1, day);

        if (
            !session.is_blocked &&
            currentDay.getTime() <= dayChoiced.getTime()
        ) {
            setShowModal1(true);
            setRoomDate({
                name: room.name,
                day: room.day,
                hour: session.hour,
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
                                    disabled={!session}
                                    className={`${
                                        session && session.is_blocked
                                            ? "bg-gray-500/50 cursor-default"
                                            : `${
                                                  session
                                                      ? "hover:bg-blue-200"
                                                      : ""
                                              }`
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
