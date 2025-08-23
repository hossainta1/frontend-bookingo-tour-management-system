import { createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),

  // If i use Fetchbase quey instade of AxiosQuery
  // baseQuery : fetchBaseQuery({baseUrl: "aehbhebrh", credentials: "include"})
  tagTypes: ["USER", "TOUR", "DIVISION", "BOOKING"],

  endpoints: () => ({}),
});


