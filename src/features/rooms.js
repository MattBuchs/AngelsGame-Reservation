import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomsData: undefined,
    loading: false,
    error: false,
    dayDisplayed: null,
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
    },
});

export function getData(action) {
    return function (dispatch, getState) {
        console.log(action);
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
            .then((data) => dispatch(addData(data.dayRooms)))
            .catch(() => dispatch(addError()));
    };
}

export const { addLoader, addData, addError, addDayDisplayed } = rooms.actions;
export default rooms.reducer;
