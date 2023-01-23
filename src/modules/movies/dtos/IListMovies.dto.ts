export interface IListMovieDTO {
  id: string;
  name: string;
  description: string;
  author: string;
  year: number;
  duration: string;
  created_at: Date;
  updated_at: Date;
  genres: Array<{
    id: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
  }>;
  votes: Array<{
    id: string;
    note: number;
    movie_id: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
  }>;
  average: number;
}
