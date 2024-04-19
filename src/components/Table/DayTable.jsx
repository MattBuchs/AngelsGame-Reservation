import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { resetState } from "../../features/reservation.js";
import { getPricesData } from "../../features/prices.js";
import { getData } from "../../features/rooms.js";
import spinner from "../../assets/spinner.svg";
import ModalReservation from "../Modal/ModalReservation.jsx";
import { formatDate } from "../../utils/formatDate.js";

export default function DayTable() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [roomDate, setRoomDate] = useState({
        name: null,
        day: null,
        hour: null,
        icon: null,
    });
    const rooms = useSelector((state) => state.rooms);
    const { pricesData } = useSelector((state) => state.prices);

    useEffect(() => {
        dispatch(getData(rooms.dayDisplayed));
    }, [dispatch, rooms.dayDisplayed]);

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
            setShowModal(true);
            setRoomDate({
                name: room.name,
                day: room.day,
                hour: session.hour,
                icon: room.icon,
            });

            dispatch(getPricesData(room.room_id));
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
                <div className="w-[40rem] h-10 bg-slate-500 mt-2 flex justify-center items-center">
                    <p className="text-white text-lg">
                        {formatDate(rooms.dayDisplayed)}
                    </p>
                </div>
                <div key={nanoid(8)} className="flex">
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
                                                        session.is_closed ||
                                                        session.is_blocked
                                                    }
                                                    className={`${
                                                        session
                                                            ? `${
                                                                  session.is_blocked ||
                                                                  session.is_closed
                                                                      ? "bg-gray-600/60"
                                                                      : "hover:bg-blue-200"
                                                              }`
                                                            : "bg-gray-600/60"
                                                    } border flex justify-center items-center w-full h-10`}
                                                >
                                                    {session
                                                        ? session.hour
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
            {showModal &&
                createPortal(
                    <ModalReservation
                        closeModal={() => setShowModal(false)}
                        roomDate={roomDate}
                        roomInfos={pricesData}
                    />,
                    document.body
                )}
        </>
    );
}
