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
    butcheryUserDeleteOne: builder.mutation({
      query(body) {
        let { id } = body;
        return {
          url: `/api/butcheryUser/deleteOneUser/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["BUTCHERY"],
    }),
  }),
});

export const {
  useGetButcheryAllDataQuery,
  useAddMeatDataMutation,
  useButcheryUserDeleteOneMutation,
} = butcheryApi;
