import { api } from "./api";

export const pricesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getShashlikXonaPrices: builder.query({
      query: () => "/api/prices/shPrices",
      providesTags: ["GETPRICES"],
    }),
    getGoshtXonaPrices: builder.query({
      query: () => "/api/prices/gPrices",
      providesTags: ["GETPRICES"],
    }),

    updateShashlikXonaPrices: builder.mutation({
      query(body) {
        let { id, shashlikPrices } = body;
        return {
          url: `/api/prices/shPricesUpdate/${id}`,
          method: "PUT",
          body: shashlikPrices,
        };
      },
      invalidatesTags: ["GETPRICES"],
    }),

    updateGoshtXonaPrices: builder.mutation({
      query(body) {
        let { id, data } = body;
        return {
          url: `/api/prices/gPricesUpdate/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["GETPRICES"],
    }),
  }),
});

export const {
  useGetGoshtXonaPricesQuery,
  useGetShashlikXonaPricesQuery,
  useUpdateGoshtXonaPricesMutation,
  useUpdateShashlikXonaPricesMutation,
} = pricesApi;
