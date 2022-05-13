import { MouseEvent } from 'react'
import { useSetRecoilState } from 'recoil'

import { FavoriteState, ModalVisibleState } from 'state'
import { IsearchResult } from 'types/movie'

import { MdImageNotSupported } from 'react-icons/md'
import styles from './Movie.module.scss'

interface ImovieProps {
  item: IsearchResult
  children: JSX.Element
}

const Movie = ({ item, children }: ImovieProps) => {
  const setModalVisible = useSetRecoilState(ModalVisibleState)

  const setFavoriteState = useSetRecoilState(FavoriteState)

  const handleModalClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { title, year, type, postersrc, imdbid } = e.currentTarget.dataset
    setModalVisible(true)
    setFavoriteState({
      imdbID: `${imdbid}`,
      Title: `${title}`,
      Year: `${year}`,
      Type: `${type}`,
      Poster: `${postersrc}`,
    })
  }

  return (
    <button
      type='button'
      onClick={handleModalClick}
      data-imdbid={item.imdbID}
      data-title={item.Title}
      data-year={item.Year}
      data-type={item.Type}
      data-postersrc={item.Poster}
      className={styles.movieWrapper}
    >
      <ul className={styles.movieList}>
        {children}
        {item.Poster === 'N/A' ? (
          <MdImageNotSupported size={100} color='gray' className={styles.notFoundImg} />
        ) : (
          <img src={item.Poster} alt='movie poster' className={styles.moviePoster} />
        )}
        <div className={styles.movieInfoWrapper}>
          <li className={styles.movieTitle}>{item.Title}</li>
          <li className={styles.movieYear}>{item.Year}</li>
          <li className={styles.movieType}>{item.Type}</li>
        </div>
      </ul>
    </button>
  )
}

export default Movie
