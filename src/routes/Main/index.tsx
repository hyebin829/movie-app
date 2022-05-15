import { ChangeEvent, useEffect, FormEvent, useState, Fragment } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useInView } from 'react-intersection-observer'

import { ModalVisibleState, MovieDataState, PageNumState, SearchWordState, TotalResultNum } from 'state'
import { useGetMovie } from 'services/movie'
import { IsearchResult } from 'types/movie'

import Modal from '../components/modal'
import Movie from './movie'
import FavoriteButton from 'routes/components/favoriteButton/favoriteButton'
import Loading from 'routes/components/loading/loadingIcon'
import styles from './Main.module.scss'
import { BsSearch } from 'react-icons/bs'

const Main = () => {
  const movieData = useRecoilValue<IsearchResult[]>(MovieDataState)
  const setMovieData = useSetRecoilState(MovieDataState)
  const setSearchWord = useSetRecoilState(SearchWordState)

  const [inputValue, setInputValue] = useState('')

  const setPageNum = useSetRecoilState(PageNumState)
  const totalResultNum = useRecoilValue(TotalResultNum)

  const modalVisible = useRecoilValue(ModalVisibleState)

  const [target, inView] = useInView({
    threshold: 1,
  })

  const { hasMore, loading } = useGetMovie()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchWord(inputValue)
    setMovieData([])
    setPageNum(1)
  }
  useEffect(() => {
    if (inView && hasMore && !loading && movieData.length < totalResultNum) {
      setPageNum((prev) => prev + 1)
    }
  }, [hasMore, loading, inView, setPageNum, totalResultNum, movieData.length])

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }

  const handleClickSearch = () => {
    setSearchWord(inputValue)
    setMovieData([])
    setPageNum(1)
  }

  return (
    <>
      {modalVisible && <Modal />}
      <div className={styles.mainWrapper}>
        <div className={styles.mainFixed}>
          <h1>Search Movie ! &#x1F3AC;</h1>
          <form onSubmit={handleSubmit} className={styles.inputWrapper}>
            <input
              className={styles.searchInput}
              type='text'
              placeholder='Search'
              value={inputValue}
              onChange={onChangeInput}
            />
            <button onClick={handleClickSearch} type='button' className={styles.searchButton}>
              <BsSearch size={20} color='white' />
            </button>
          </form>
        </div>
        <section>
          {movieData &&
            movieData.map((item, index) => (
              <Fragment key={`${item.imdbID}-movie-${index + 1}`}>
                <Movie item={item}>
                  <FavoriteButton item={item} />
                </Movie>
              </Fragment>
            ))}
          {!movieData.length && !loading ? <div className={styles.notFoundData}>검색 결과가 없습니다.</div> : <div />}
          {loading && (
            // <div className={styles.loading}>Loading... </div>
            <Loading />
          )}
          <div ref={target} className={styles.refdiv} />
        </section>
      </div>
    </>
  )
}

export default Main
