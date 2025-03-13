import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleMember = createAsyncThunk(
  "fetchSingleMember",
  async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/member/member/${id}`
      );
      const data = await response.data;
      return data.data;
    } catch (error) {
      console.log("Single Member Not Fetched :)", error);
    }
  }
);

// http://localhost:4000/member/delete/67d000abe7da79af6158942e
export const deleteOne = createAsyncThunk(
  "deleteOne",
  async (id = "67d000abe7da79af6158942e") => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER}/member/delete/${id}`,
        { withCredentials: true }
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.log("Member Not Deleted ", error);
    }
  }
);

const initialState = {
  member: null,
  singleMemberLoading: false,
  deleteLoading : false

};

const oneMemberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleMember.pending, (state, action) => {
      state.singleMemberLoading = true;
    });
    builder.addCase(fetchSingleMember.fulfilled, (state, action) => {
      console.log("Single Success", action.payload);
      state.member = action.payload;
      state.singleMemberLoading = false;
    });

    builder.addCase(deleteOne.pending, (state , action)=>{
      state.deleteLoading = true
    });
    builder.addCase(deleteOne.fulfilled , (state, action)=>{
      state.deleteLoading = false
    })

  },
});

export const {} = oneMemberSlice.actions;
export default oneMemberSlice.reducer;
