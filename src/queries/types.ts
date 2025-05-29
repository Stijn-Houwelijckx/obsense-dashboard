import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type CommonQueryOptions<T> = Omit<
  UseQueryOptions<T, AxiosError, T, QueryKey>,
  "queryKey" | "queryFn"
>;
