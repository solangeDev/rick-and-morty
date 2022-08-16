export interface characters {
  id: number;
  name: string;
  status: string;
  spacies: string;
  gender: string;
  image: string;
  isFavorite?: boolean;
}

export interface episodes {
  name: string;
  episode: string;
}

//generic
export interface apiResponse<T> {
  results: T
}

export interface dataResponse<T> {
  characters: apiResponse<characters[]>
  episodes: apiResponse<episodes[]>
}
