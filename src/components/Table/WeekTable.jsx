import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { formatDate } from "../../utils/formatDate";
import { getWeekData } from "../../features/weekRooms";
import { resetState } from "../../features/reservation";
import { getPricesData } from "../../features/prices";
import ModalReservation from "../Modal/ModalReservation";
import spinner from "../../assets/spinner.svg";

export default function WeekTable({ roomObj }) {
    const dispatch = useDispatch();
    const { dayDisplayed } = useSelector((state) => state.rooms);
    const { pricesData } = useSelector((state) => state.prices);
    const { weekRoomsData, loading, error } = useSelector(
        (state) => state.weekRooms
    );
    const [showModal, setShowModal] = useState(false);
    const [roomDate, setRoomDate] = useState({
        name: null,
        day: null,
        hour: null,
        icon: null,
    });

    useEffect(() => {
        if (roomObj) {
            dispatch(getWeekData(dayDisplayed, roomObj.room_id));
        }
    }, [dayDisplayed, dispatch, roomObj]);

    const handleReservation = (room, session) => {
        console.log(room, session);
        dispatch(resetState());
        const currentDay = new Date();
        currentDay.setHours(0, 0, 0, 0);

        const [year, month, day] = room.date.split("-");
        const dayChoiced = new Date(year, month - 1, day);

        if (
            !session.is_blocked &&
            !session.is_closed &&
            currentDay.getTime() <= dayChoiced.getTime()
        ) {
            setShowModal(true);
            setRoomDate({
                name: room.name,
                day: room.date,
                hour: session.hour,
                icon: room.icon,
            });

            dispatch(getPricesData(room.id));
        }
    };

    return (
        <>
            {loading && <img src={spinner} alt="Chargement" />}
            {error && <p>Une erreur est survenue...</p>}
            {weekRoomsData && (
                <>
                    <header>
                        <ul className="flex">
                            {weekRoomsData.dayInfos.map((room, index) => (
                                <li
                                    key={index}
                                    className="border w-32 text-center px-2 py-1 bg-slate-500 text-white"
                                >
                                    <p>
                                        {formatDate(
                                            room.date,
                                            true,
                                            false,
                                            false,
                                            false
                                        )}
                                    </p>
                                    <p>
                                        {formatDate(
                                            room.date,
                                            false,
                                            true,
                                            true,
                                            false
                                        )}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <ul className="flex">
                            {weekRoomsData.dayInfos.map((_, index) => (
                                <li
                                    key={index}
                                    className="border w-32 h-14 text-center p-2 bg-slate-300"
                                >
                                    <img
                                        src={weekRoomsData.icon}
                                        alt={`Salle - ${weekRoomsData.name}`}
                                        className="w-full h-full"
                                    />
                                </li>
                            ))}
                        </ul>
                    </header>
                    <main>
                        <div className="flex">
                            {weekRoomsData.dayInfos.map((room, index) => (
                                <ul key={index}>
                                    {room.sessions.map(
                                        (session, sessionIndex) => (
                                            <li
                                                key={`${index}-${sessionIndex}`}
                                                className="border w-32 h-10 flex justify-center items-center"
                                            >
                                                <button
                                                    onClick={() =>
                                                        handleReservation(
                                                            {
                                                                ...room,
                                                                id: weekRoomsData.room_id,
                                                                name: weekRoomsData.name,
                                                                icon: weekRoomsData.icon,
                                                            },
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
                                                    } flex justify-center items-center w-full h-10 p-2`}
                                                >
                                                    {session.hour}
                                                </button>
                                            </li>
                                        )
                                    )}
                                </ul>
                            ))}
                        </div>
                    </main>
                    <footer className="pt-2">
                        <div className="flex items-center">
                            <div className="h-4 w-5 bg-gray-600/60 mr-2"></div>
                            <p>Complet ou fermé</p>
                        </div>
                    </footer>
                </>
            )}
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
