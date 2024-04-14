import { useEffect } from "react";
import { getWeekData } from "../../features/weekRooms";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";
import spinner from "../../assets/spinner.svg";

export default function WeekTable({ roomObj }) {
    const dispatch = useDispatch();
    const { dayDisplayed } = useSelector((state) => state.rooms);
    const { weekRoomsData, loading, error } = useSelector(
        (state) => state.weekRooms
    );

    useEffect(() => {
        if (roomObj) {
            let day;

            if (dayDisplayed) day = dayDisplayed;
            else {
                const newDate = new Date();

                day = `${newDate.getFullYear()}-${
                    newDate.getMonth() + 1
                }-${newDate.getDate()}`;
            }

            dispatch(getWeekData(day, roomObj.room_id));
        }
    }, [dayDisplayed, dispatch, roomObj]);

    return (
        <>
            {loading && <img src={spinner} alt="Chargement" />}
            {error && <p>Une erreur est survenue...</p>}
            {weekRoomsData && (
                <div>
                    <header>
                        <ul className="flex">
                            {weekRoomsData.dayInfos.map((room, index) => (
                                <li
                                    key={index}
                                    className="border w-32 text-center px-2"
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
                                    className="border w-32 h-14 text-center p-2"
                                >
                                    <img
                                        src={weekRoomsData.icon}
                                        alt={`Salle - ${weekRoomsData.name}`}
                                        className="w-full h-full"
                                    />
                                </li>
                            ))}
                        </ul>
                        <div className="flex">
                            {weekRoomsData.dayInfos.map((room, index) => (
                                <ul key={index}>
                                    {room.sessions.map(
                                        (session, sessionIndex) => (
                                            <li
                                                key={`${index}-${sessionIndex}`}
                                                className="border w-32 h-10 p-2 flex justify-center items-center"
                                            >
                                                <button>{session.hour}</button>
                                            </li>
                                        )
                                    )}
                                </ul>
                            ))}
                        </div>
                    </header>
                </div>
            )}
        </>
    );
}
