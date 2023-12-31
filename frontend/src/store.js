import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
export const { setUser, clearUser } = userSlice.actions;
