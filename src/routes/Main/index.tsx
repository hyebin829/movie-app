import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ChangeEvent, useCallback, useEffect, FormEvent } from 'react'

import { MovieDataState, SearchWordState } from 'state'
import { getMovieApi } from 'services/movie'

import styles from './Main.module.scss'

const Main = () => {
  const movieData = useRecoilValue(MovieDataState)
  const setMovieData = useSetRecoilState(MovieDataState)

  const searchWord = useRecoilValue(SearchWordState)
  const setSearchWord = useSetRecoilState(SearchWordState)

  useEffect(() => {}, [movieData, setMovieData])

  const getMovie = useCallback(() => {
    getMovieApi({
      movieName: searchWord,
      page: 1,
    }).then((res) => {
      if (res.data.Response === 'False') setMovieData([])
      setMovieData(res.data.Search)
    })
  }, [searchWord, setMovieData])

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchWord(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getMovie()
  }

  return (
    <section className={styles.weather}>
      <div className={styles.forecast}>
        <h2>Next forecast</h2>
        <form onSubmit={handleSubmit}>
          <input type='text' value={searchWord} onChange={onChangeInput} />
        </form>
        <button onClick={getMovie} type='button'>
          버튼
        </button>
        {movieData &&
          movieData.map((item) => (
            <ul key={`${item.imdbID}-movie`}>
              <li>{item.Title}</li>
              <li>{item.Year}</li>
              <li>{item.Type}</li>
              <img src={item.Poster} alt='moviePoster' />
            </ul>
          ))}
        {!movieData && <div>noting</div>}
      </div>
    </section>
  )
}

export default Main
