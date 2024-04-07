import { api } from "./api";

export const butcheryApi = api.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useAddMeatDataMutation } = butcheryApi;
