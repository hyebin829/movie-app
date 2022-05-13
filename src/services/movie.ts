import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { axios } from 'hooks/worker'

import { MovieDataState, PageNumState, SearchWordState, TotalResultNum } from 'state'
import { ImovieAPIRes } from 'types/movie'

const BASE_URL = 'http://www.omdbapi.com'

interface Params {
  movieName: string
  page: number
}

export const getMovieApi = (params: Params) =>
  axios.get<ImovieAPIRes>(
    `${BASE_URL}/?apikey=${process.env.REACT_APP_API_KEY}&s=${params.movieName}&page=${params.page}`
  )

export const useGetMovie = () => {
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const setMovieData = useSetRecoilState(MovieDataState)

  const searchWord = useRecoilValue(SearchWordState)
  const pageNum = useRecoilValue(PageNumState)

  const setTotalResultNum = useSetRecoilState(TotalResultNum)

  useEffect(() => {
    setLoading(true)
    getMovieApi({
      movieName: searchWord,
      page: pageNum,
    }).then((res) => {
      if (res.data.Response === 'False') {
        setMovieData([])
        setHasMore(false)
        setLoading(false)
        return
      }
      if (res.data.Response === 'True') {
        setMovieData((prev) => Array.from(new Set([...prev, ...res.data.Search])))

        setTotalResultNum(Number(res.data.totalResults))
        setHasMore([...res.data.Search].length > 0)
      }
      setLoading(false)
    })
  }, [searchWord, pageNum, setMovieData, setTotalResultNum])

  return { loading, hasMore }
}
