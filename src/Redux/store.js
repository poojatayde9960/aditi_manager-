import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../Redux/Apis/auth.Api";
import { productApi } from "./Apis/product.Api";
import { userOrderApi } from "./Apis/usersApi";
import { OrderApi } from "./Apis/OrdersApi";
import { dashboardApi } from "./Apis/dashboardApi";
import { updateStatusApi } from "./Apis/updateStatusApi";
import authSlices from "./slices/authSlices";
import { enquiryApi } from "./Apis/enquiryApi";
import { giftApi } from "./Apis/giftApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userOrderApi.reducerPath]: userOrderApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [updateStatusApi.reducerPath]: updateStatusApi.reducer,
    [enquiryApi.reducerPath]: enquiryApi.reducer,
    [giftApi.reducerPath]: giftApi.reducer,
    auth: authSlices
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(authApi.middleware)
      .concat(userOrderApi.middleware)
      .concat(OrderApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(updateStatusApi.middleware)
      .concat(enquiryApi.middleware)
      .concat(giftApi.middleware)
});

setupListeners(store.dispatch);

export default store;
