import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://boshqaruvch-backend.vercel.app/",
  // baseUrl: "http://localhost:8080/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authentification", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["LOGIN", "GETPRICES", "BUTCHERY", "GETWORKER"],
  endpoints: () => ({}),
});
