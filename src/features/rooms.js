import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomsData: undefined,
    loading: false,
    error: false,
    dayDisplayed: null,
    farthestDay: null,
};

export const rooms = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        addData: (state, action) => {
            state.roomsData = action.payload;
            state.loading = false;
        },
        addLoader: (state, action) => {
            state.loading = true;
        },
        addError: (state, action) => {
            state.error = true;
            state.loading = false;
        },
        addDayDisplayed: (state, action) => {
            state.dayDisplayed = action.payload;
        },
        addFarthestDay: (state, action) => {
            state.farthestDay = action.payload;
        },
    },
});

export function getData(action) {
    return function (dispatch, getState) {
        dispatch(addLoader());

        let date;
        if (!action) date = new Date();
        else date = action;

        const formatDate = `${date.getFullYear()}-${
            date.getMonth() + 1
        }-${date.getDate()}`;

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

export const { addLoader, addData, addError, addDayDisplayed, addFarthestDay } =
    rooms.actions;
export default rooms.reducer;
