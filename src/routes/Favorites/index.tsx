import { Fragment } from 'react'
import { useRecoilValue } from 'recoil'

import { ModalVisibleState } from 'state'
import { IsearchResult } from 'types/movie'

import FavoriteButton from 'routes/components/favoriteButton/favoriteButton'
import Modal from 'routes/components/modal/modal'
import Movie from 'routes/Main/movie'
import styles from './Favorites.module.scss'

const Favorites = () => {
  const favorite = localStorage.getItem('favorite')
  const favoriteList = favorite ? JSON.parse(favorite) : []
  const modalVisible = useRecoilValue(ModalVisibleState)

  return (
    <>
      {modalVisible && <Modal />}
      <div className={styles.favoritesWrapper}>
        <h1>&#x2B50; Favorite List &#x2B50;</h1>
        <div className={styles.favoriteList}>
          {favoriteList.map((item: IsearchResult, index: number) => (
            <Fragment key={`${item.imdbID}-movie-${index + 1}`}>
              <Movie item={item}>
                <FavoriteButton item={item} />
              </Movie>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

export default Favorites
