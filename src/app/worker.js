import { api } from "./api";

export const worker = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorker: builder.query({
      query: () => "/api/workerUser",
      providesTags: ["GETWORKER"],
    }),
    addData: builder.mutation({
      query(body) {
        return {
          url: "/api/workerUser/addData",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetAllWorkerQuery, useAddDataMutation } = worker;
