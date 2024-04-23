import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
import { addDayDisplayed } from "../../features/rooms";
import { formatDate } from "../../utils/formatDate";
import { toggleCalendar, disabledCalendar } from "../../features/rooms";

registerLocale("fr", fr);

export default function Calendar({ bgButton }) {
    const dispatch = useDispatch();
    const { dayDisplayed, farthestDay, calendarDisplayed } = useSelector(
        (state) => state.rooms
    );
    const { weekRoomsData } = useSelector((state) => state.weekRooms);

    const handleChange = (date) => {
        const dateFormated = `${date.getFullYear()}-${
            date.getMonth() + 1
        }-${date.getDate()}`;

        dispatch(addDayDisplayed(dateFormated));
    };

    const CustomInput = forwardRef(({ onClick }, ref) => (
        <button
            className={`text-white text-lg w-full h-full flex justify-center items-center px-4 py-1 ${
                bgButton && "bg-gray-400 rounded hover:bg-gray-500"
            }`}
            onClick={(e) => {
                dispatch(toggleCalendar());
                onClick(e);
            }}
            ref={ref}
        >
            <span>
                {weekRoomsData &&
                    bgButton &&
                    "A partir de " + formatDate(weekRoomsData.dayInfos[0].date)}
                {!bgButton && formatDate(dayDisplayed)}
            </span>
            <img src="/img/calendar.svg" alt="" className="w-5 h-5 ml-2" />
        </button>
    ));

    CustomInput.displayName = "CustomInput"; // Add display name

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <DatePicker
                selected={dayDisplayed}
                onChange={(date) => {
                    handleChange(date);
                    dispatch(disabledCalendar());
                }}
                minDate={new Date()}
                maxDate={farthestDay}
                locale="fr"
                open={calendarDisplayed}
                customInput={<CustomInput />}
            />
        </div>
    );
}
