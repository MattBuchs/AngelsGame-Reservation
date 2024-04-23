import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomsData: undefined,
    loading: false,
    error: false,
    dayDisplayed: null,
    farthestDay: null,
    calendarDisplayed: false,
};

export const rooms = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        addData: (state, action) => {
            state.roomsData = action.payload;
            state.loading = false;
        },
        addLoader: (state) => {
            state.loading = true;
        },
        addError: (state) => {
            state.error = true;
            state.loading = false;
        },
        addDayDisplayed: (state, action) => {
            state.dayDisplayed = action.payload;
        },
        addFarthestDay: (state, action) => {
            state.farthestDay = action.payload;
        },
        toggleCalendar: (state) => {
            state.calendarDisplayed = !state.calendarDisplayed;
        },
        disabledCalendar: (state) => {
            state.calendarDisplayed = false;
        },
    },
});

export function getData(action) {
    return function (dispatch) {
        dispatch(addLoader());

        let formatDate;
        if (!action) {
            const date = new Date();
            formatDate = `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()}`;
        } else formatDate = action;

        fetch(`${import.meta.env.VITE_API_URL}/get-day?date=${formatDate}`)
            .then((response) => {
                if (!response.ok) throw new Error();
                return response.json();
            })
            .then((data) => {
                dispatch(addData(data.dayRooms));
                dispatch(addFarthestDay(data.farthestDay));
            })
            .catch(() => dispatch(addError()));
    };
}

export const {
    addLoader,
    addData,
    addError,
    addDayDisplayed,
    addFarthestDay,
    toggleCalendar,
    disabledCalendar,
} = rooms.actions;
export default rooms.reducer;
