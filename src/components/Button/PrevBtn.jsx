import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDayDisplayed } from "../../features/rooms";

export default function PrevBtn({ isWeek }) {
    const dispatch = useDispatch();
    const [btnDisabled, setBtnDisabled] = useState(false);
    const { dayDisplayed } = useSelector((state) => state.rooms);
    const { weekRoomsData } = useSelector((state) => state.weekRooms);

    useEffect(() => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);

        if (!dayDisplayed) {
            const day = `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()}`;

            dispatch(addDayDisplayed(day));
            setBtnDisabled(true);
        } else {
            const [year, month, day] = dayDisplayed.split("-");
            const chosenDay = new Date(year, month - 1, day);
            chosenDay.setDate(chosenDay.getDate() - 1);

            setBtnDisabled(chosenDay.getTime() < date.getTime());
        }
    }, [dayDisplayed, dispatch]);

    const handleClick = () => {
        const lastDate = weekRoomsData.dayInfos[0].date;

        const [lastYear, lastMonth, lastDay] = lastDate.split("-");
        let currentDate = new Date(lastYear, lastMonth - 1, lastDay);

        // Ajouter un jour à la date actuelle pour obtenir la date du jour suivant
        currentDate.setDate(currentDate.getDate() - 7);

        if (currentDate < new Date()) currentDate = new Date();

        const newYear = currentDate.getFullYear();
        const newMonth = currentDate.getMonth() + 1;
        const newDay = currentDate.getDate();
        const newDate = `${newYear}-${newMonth}-${newDay}`;

        dispatch(addDayDisplayed(newDate));
    };

    return (
        <button
            onClick={handleClick}
            disabled={btnDisabled}
            className="bg-blue-600 w-8 h-8 py-1 hover:bg-blue-700 rounded-s disabled:bg-gray-500"
        >
            <img
                src="/img/chevron-left.svg"
                alt={`Semaine précédente`}
                className="w-full h-full"
            />
        </button>
    );
}
