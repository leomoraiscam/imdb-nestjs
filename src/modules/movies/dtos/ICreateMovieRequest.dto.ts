export interface ICreateMovieRequestDTO {
  name: string;
  description: string;
  author: string;
  year: number;
  duration: string;
  genre_ids: string[];
}
