import { axios } from 'hooks/worker'
import { ImovieAPIRes } from 'types/movie'

const BASE_URL = 'http://www.omdbapi.com'

interface Params {
  movieName: string
  page: number
}

// 37.494958, 126.844128
export const getWeatherApi = (params: Params) =>
  axios.get<ImovieAPIRes>(
    `${BASE_URL}/?apikey=${process.env.REACT_APP_API_KEY}&s=${params.movieName}&page=${params.page}`,
    {}
  )
