

import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../Apis/auth.Api";

const authSlices = createSlice({
    name: "authSlices",
    initialState: {
        manager: JSON.parse(localStorage.getItem("manager")) || null,
    },
    reducers: {
        managerLogout: (state) => {
            localStorage.removeItem("manager");
            state.manager = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.manager = payload;
                localStorage.setItem("manager", JSON.stringify(payload));
            }
        );
    },
});

export const { managerLogout } = authSlices.actions;
export default authSlices.reducer;