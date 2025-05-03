import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFilteredProduct = createAsyncThunk(
  "/products/fetchProduct",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams();

    if (filterParams) {
      for (const key in filterParams) {
        filterParams[key].forEach((value) => {
          query.append(key, value);
        });
      }
    }

    if (sortParams) {
      query.append("sortBy", sortParams);
    }

    const result = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/shop/products/get?${query.toString()}`
    );

    return result.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
    );

    return result.data;
  }
);

const ShoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState: {
    isLoading: false,
    productList: [],
    productDetails: null,
  },
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredProduct.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchFilteredProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = ShoppingProductSlice.actions;

export default ShoppingProductSlice.reducer;
