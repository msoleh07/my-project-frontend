import { api } from "./api";

export const worker = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorker: builder.query({
      query: () => "/api/workerUser",
      providesTags: ["GETWORKER", "BUTCHERY"],
    }),
    addData: builder.mutation({
      query(body) {
        return {
          url: "/api/workerUser/addData",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETWORKER"],
    }),
  }),
});

export const { useGetAllWorkerQuery, useAddDataMutation } = worker;
