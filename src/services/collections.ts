import api from "./api";

export const collectionsService = {
  getCollections: async () => {
    const response = await api.get("/artist/collections");

    if (response.status === 204) {
      return {
        code: 204,
        status: "success",
        message: "No collections found.",
        data: { collections: [] },
      };
    }

    return response.data;
  },
};
