import { useQuery } from "@tanstack/react-query";
import { StaleTime } from "queries/constants";
import { QueryKeys } from "queries/QueryKeys";
import { CommonQueryOptions } from "queries/types";
import { collectionsService } from "services/collections";
import { CollectionList } from "types/collection.types";

const fetchCollections = async () => {
  const { data } = await collectionsService.getCollections();
  return data;
};

export const useCollections = (config?: CommonQueryOptions<CollectionList>) => {
  const { data, isLoading, error } = useQuery({
    queryKey: QueryKeys.collections.all(),
    queryFn: fetchCollections,
    staleTime: StaleTime.FIVE_MIN,
    ...config,
  });

  return { data, isLoading, error };
};
