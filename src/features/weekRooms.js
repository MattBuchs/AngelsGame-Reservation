import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weekRoomsData: undefined,
    loading: false,
    error: false,
};

export const weekRooms = createSlice({
    name: "weekRooms",
    initialState,
    reducers: {
        addData: (state, action) => {
            state.weekRoomsData = action.payload;
            state.loading = false;
        },
        addLoader: (state) => {
            state.loading = true;
        },
        addError: (state) => {
            state.error = true;
            state.loading = false;
        },
    },
});

export function getWeekData(date, roomId) {
    return function (dispatch) {
        dispatch(addLoader());

        fetch(
            `${
                import.meta.env.VITE_API_URL
            }/get-week?date=${date}&room_id=${roomId}`
        )
            .then((response) => {
                if (!response.ok) throw new Error();
                return response.json();
            })
            .then((data) => dispatch(addData(data.rooms)))
            .catch(() => dispatch(addError()));
    };
}

export const { addLoader, addData, addError } = weekRooms.actions;
export default weekRooms.reducer;
