import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMembers = createAsyncThunk("fetchMembers", async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER}/member/members`,
      { withCredentials: true }
    );
    return data.data;
  } catch (error) {
    console.log("Members Are Not Fetched :)", error);
  }
});

const initialState = {
  members: [],
  membersLoading: false,
  membersError  : false,
};

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMembers.pending, (state, action) => {
      console.log("loading........");
      state.membersLoading = true;
    });
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.members = action.payload;
      state.membersLoading = false;
    });
    builder.addCase(fetchMembers.rejected  ,(state , action)=>{
        state.membersError = true;
        state.membersLoading = false;

    })
  },
});

export const {} = memberSlice.actions; // Reduces are here
export default memberSlice.reducer;
