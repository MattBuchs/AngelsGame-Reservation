import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { addDayDisplayed } from "../../features/rooms";
import { getData } from "../../features/rooms";

export default function ManageCalendar() {
    const dispatch = useDispatch();
    const { roomsData, dayDisplayed } = useSelector((state) => state.rooms);
    const dateRef = useRef();
    const dateLongRef = useRef();

    useEffect(() => {
        if (roomsData) dispatch(addDayDisplayed(roomsData[0].day));
    }, [roomsData, dispatch]);

    const formatDate = (dateString) => {
        // Analyse la chaîne de date pour obtenir l'année, le mois et le jour
        const [year, month, day] = dateString.split("-");

        // Crée un objet de date avec les valeurs obtenues
        const date = new Date(year, month - 1, day);

        // Obtient le nom du jour de la semaine
        const days = [
            "Dimanche",
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi",
        ];
        const dayOfWeek = days[date.getDay()];

        // Obtient le nom du mois
        const months = [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre",
        ];
        const monthName = months[date.getMonth()];

        // Retourne la date formatée
        return `${dayOfWeek} ${day} ${monthName} ${year}`;
    };

    const handleNext = () => {
        const [year, month, day] = dayDisplayed.split("-");

        const newDate = new Date(year, month - 1, day);
        newDate.setDate(newDate.getDate() + 1);

        dispatch(getData(newDate));
    };

    const handlePrevious = () => {
        const [year, month, day] = dayDisplayed.split("-");

        const newDate = new Date(year, month - 1, day);
        newDate.setDate(newDate.getDate() - 1);

        dispatch(getData(newDate));
    };

    return (
        <>
            <div className="flex items-center">
                <button
                    onClick={handlePrevious}
                    className="bg-blue-600 text-white px-4 py-1 rounded-s"
                >
                    Prev
                </button>
                <p ref={dateLongRef}>
                    {roomsData && formatDate(roomsData[0].day)}
                </p>
                <img src="/img/calendar.svg" alt="" className="w-5 h-5" />
                <button
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-4 py-1 rounded-e"
                >
                    Next
                </button>
            </div>
            <input
                type="date"
                defaultValue={dayDisplayed}
                className=""
                ref={dateRef}
            />
        </>
    );
}
