// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchWishlist = createAsyncThunk(
//   "wishlist/fetchWishlist",
//   async (userId) => {
//     const res = await axios.get(`/api/wishlist/${userId}`);
//     return res.data;
//   }
// );

// export const toggleWishlist = createAsyncThunk(
//   "wishlist/toggleWishlist",
//   async ({ userId, productId }) => {
//     const res = await axios.post(`/api/wishlist/toggle`, { userId, productId });
//     return res.data;
//   }
// );

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWishlist.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(toggleWishlist.fulfilled, (state, action) => {
//         state.items = action.payload;
//       });
//   },
// });

// export default wishlistSlice.reducer;
