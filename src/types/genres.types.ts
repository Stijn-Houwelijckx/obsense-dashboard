export type Genre = {
  genre: GenreItem;
};

export type Genres = {
  genres: GenreItem[];
};

export type GenreItem = {
  _id: string;
  name: string;
};

export type GenreItemFormData = {
  genre: {
    name: string;
  };
};
