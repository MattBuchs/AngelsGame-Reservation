import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDayDisplayed } from "../../features/rooms";

export default function NextBtn() {
    const dispatch = useDispatch();
    const [btnDisabled, setBtnDisabled] = useState(false);
    const { dayDisplayed, farthestDay } = useSelector((state) => state.rooms);
    const { weekRoomsData } = useSelector((state) => state.weekRooms);

    useEffect(() => {
        if (dayDisplayed && farthestDay) {
            const [year, month, day] = dayDisplayed.split("-");
            const chosenDay = new Date(year, month - 1, day);
            chosenDay.setDate(chosenDay.getDate() + 7);

            const [year2, month2, day2] = farthestDay.split("-");
            const lastDay = new Date(year2, month2 - 1, day2);

            setBtnDisabled(chosenDay.getTime() >= lastDay.getTime());
        }
    }, [dayDisplayed, farthestDay]);

    const handleClick = () => {
        const lastDate =
            weekRoomsData.dayInfos[weekRoomsData.dayInfos.length - 1].date;

        const [year, month, day] = lastDate.split("-");
        const currentDate = new Date(year, month - 1, day);

        // Ajouter un jour à la date actuelle pour obtenir la date du jour suivant
        currentDate.setDate(currentDate.getDate() + 1);

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
            className="bg-blue-600 w-8 h-8 py-1 hover:bg-blue-700 rounded-e disabled:bg-gray-500"
        >
            <img
                src="/img/chevron-right.svg"
                alt={`Semaine suivante`}
                className="w-full h-full"
            />
        </button>
    );
}
