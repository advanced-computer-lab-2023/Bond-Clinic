import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    role: "patient",
    username: "",
    openedAppbar: "",
    openedNavbar: "",
    info: {},
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setOpenedAppbar: (state, action) => {
      state.openedAppbar = action.payload;
    },
    setOpenedNavbar: (state, action) => {
      state.openedNavbar = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const {
  setOpenedAppbar,
  setOpenedNavbar,
  setUsername,
  setRole,
  setInfo,
} = userSlice.actions;

export default userSlice.reducer;
