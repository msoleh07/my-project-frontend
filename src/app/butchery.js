import { api } from "./api";

export const butcheryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getButcheryAllData: builder.query({
      query: () => "/api/butcheryUser",
      providesTags: ["BUTCHERY", "GETWORKER"],
    }),
    addMeatData: builder.mutation({
      query(body) {
        return {
          url: "/api/butcheryUser/addMeatKG",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["BUTCHERY"],
    }),
  }),
});

export const { useGetButcheryAllDataQuery, useAddMeatDataMutation } =
  butcheryApi;
