import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/product-slice";
import AdminOrderSlice from "./admin/order-slice";
import ShoppingProductSlice from "./shop/product-slice";
import ShoppingCartSlice from "./shop/cart-slice";
import ShoppingAddressSlice from "./shop/address-slice";
import ShoppingOrderSlice from "./shop/order-slice";
import ProductSearchSlice from "./shop/search-slice";
import ProductReviewSlice from "./shop/review-slice";
import CommonFeatureSlice from "./common-slice"; 

// import WishlistSlice from "./shop/wishlist-slice"; // Uncomment if you have a wishlist slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    adminOrders: AdminOrderSlice,
    shoppingProducts: ShoppingProductSlice,
    shoppingCart: ShoppingCartSlice,
    shoppingAddress: ShoppingAddressSlice,
    shoppingOrder: ShoppingOrderSlice,
    productSearch: ProductSearchSlice,
    productReview: ProductReviewSlice,
    commonFeature: CommonFeatureSlice, 
    // wishlist: WishlistSlice, // Add the wishlist slice here
  },
});

export default store;
