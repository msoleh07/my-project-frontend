import { api } from "./api";

export const login = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query(body) {
        let { url, userData } = body;
        return {
          url: `${url + "/signup"}`,
          method: "POST",
          body: userData,
        };
      },
      invalidatesTags: ["LOGIN"],
    }),
    logIn: builder.mutation({
      query(body) {
        let { value, url } = body;
        return {
          url: url,
          method: "POST",
          body: value,
        };
      },
      invalidatesTags: ["LOGIN"],
    }),
  }),
});

export const { useLogInMutation, useSignUpMutation, useLogoutMutation } = login;
