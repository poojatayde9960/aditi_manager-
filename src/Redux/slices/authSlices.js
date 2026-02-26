

import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../Apis/auth.Api";

const authSlices = createSlice({
    name: "authSlices",
    initialState: {
        manager: JSON.parse(localStorage.getItem("manager")) || null,
        token: localStorage.getItem("token") || null,
    },
    reducers: {
        managerLogout: (state) => {
            localStorage.removeItem("manager");
            localStorage.removeItem("token");
            state.manager = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                const token = payload.token || payload.managerToken || payload?.data?.token || payload?.data?.managerToken;
                const manager = payload.manager || payload?.data?.manager || payload;

                state.manager = manager;
                state.token = token;
                localStorage.setItem("manager", JSON.stringify(manager));
                if (token) {
                    localStorage.setItem("token", token);
                }
            }
        );
    },
});

export const { managerLogout } = authSlices.actions;
export default authSlices.reducer;