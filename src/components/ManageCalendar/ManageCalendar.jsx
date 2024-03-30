import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addDayDisplayed } from "../../features/rooms";
import { getData, addLoader, addData, addError } from "../../features/rooms";
import { formatDate } from "../../utils/formatDate";

export default function ManageCalendar() {
    const dispatch = useDispatch();
    const { roomsData, dayDisplayed, farthestDay } = useSelector(
        (state) => state.rooms
    );
    const [btnsDisabled, setBtnsDisabled] = useState({
        previousBtn: true,
        nextBtn: false,
    });

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let maxDate;
    if (farthestDay) {
        const [yearMax, monthMax, dayMax] = farthestDay.split("-");
        maxDate = new Date(yearMax, monthMax - 1, dayMax);
    }

    useEffect(() => {
        if (roomsData) dispatch(addDayDisplayed(roomsData[0].day));
    }, [roomsData, dispatch]);

    const handleNext = () => {
        const [year, month, day] = dayDisplayed.split("-");

        const newDate = new Date(year, month - 1, day);
        newDate.setDate(newDate.getDate() + 1);

        dispatch(getData(newDate));

        newDate.setDate(newDate.getDate() + 1);
        let btnDisabled = false;

        if (newDate.getTime() > maxDate.getTime()) btnDisabled = true;
        setBtnsDisabled({ previousBtn: false, nextBtn: btnDisabled });
    };

    const handlePrevious = () => {
        const [year, month, day] = dayDisplayed.split("-");

        const newDate = new Date(year, month - 1, day);
        newDate.setDate(newDate.getDate() - 1);

        dispatch(getData(newDate));

        newDate.setDate(newDate.getDate() - 1);
        let btnDisabled = false;

        if (newDate.getTime() < currentDate.getTime()) btnDisabled = true;
        setBtnsDisabled({ previousBtn: btnDisabled, nextBtn: false });
    };

    const handleDate = (e) => {
        const value = e.target.value;
        const [year, month, day] = value.split("-");
        const chosenDate = new Date(year, month - 1, day);
        chosenDate.setHours(0, 0, 0, 0);

        if (
            chosenDate.getTime() < currentDate.getTime() ||
            chosenDate.getTime() > maxDate.getTime()
        )
            return;

        dispatch(addLoader());
        const formatDate = `${year}-${month}-${day}`;

        fetch(`${import.meta.env.VITE_API_URL}/get-day?date=${formatDate}`)
            .then((response) => {
                if (!response.ok) throw new Error();
                return response.json();
            })
            .then((data) => {
                dispatch(addData(data.dayRooms));
            })
            .catch(() => dispatch(addError()));

        const previousDate = chosenDate.setDate(chosenDate.getDate() - 1);
        const nextDate = chosenDate.setDate(chosenDate.getDate() + 1);
        let previousBtnDisabled = false;
        let nextBtnDisabled = false;

        if (previousDate <= currentDate.getTime()) previousBtnDisabled = true;
        console.log(nextDate, maxDate.getTime());
        if (nextDate >= maxDate.getTime()) nextBtnDisabled = true;

        setBtnsDisabled({
            previousBtn: previousBtnDisabled,
            nextBtn: nextBtnDisabled,
        });
    };

    return (
        <div className="flex items-center">
            <button
                onClick={handlePrevious}
                disabled={btnsDisabled.previousBtn}
                className="bg-blue-600 text-white px-4 py-1 rounded-s disabled:bg-gray-500"
            >
                Prev
            </button>
            <p>{roomsData && formatDate(roomsData[0].day)}</p>
            <div className="relative">
                <img
                    src="/img/calendar.svg"
                    alt="Cliquez pour ouvrir le calendrier"
                    className="w-5 h-5"
                />
                <input
                    type="date"
                    value={dayDisplayed || ""}
                    onChange={handleDate}
                    min={`${currentDate.getFullYear()}-${
                        currentDate.getMonth() + 1 < 10
                            ? `0${Number(currentDate.getMonth() + 1)}`
                            : currentDate.getMonth() + 1
                    }-${
                        currentDate.getDate() < 10
                            ? `0${currentDate.getDate()}`
                            : currentDate.getDate()
                    }`}
                    max={
                        maxDate &&
                        `${maxDate.getFullYear()}-${
                            Number(maxDate.getMonth() + 1) < 10
                                ? `0${Number(maxDate.getMonth() + 1)}`
                                : maxDate.getMonth()
                        }-${
                            maxDate.getDate() < 10
                                ? `0${maxDate.getDate()}`
                                : maxDate.getDate()
                        }`
                    }
                    className="absolute top-0 left-0 opacity-0 w-full h-full"
                />
            </div>
            <button
                onClick={handleNext}
                disabled={btnsDisabled.nextBtn}
                className="bg-blue-600 text-white px-4 py-1 rounded-e disabled:bg-gray-500"
            >
                Next
            </button>
        </div>
    );
}
