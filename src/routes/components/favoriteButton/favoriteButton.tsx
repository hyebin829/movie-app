import { BsStar, BsStarFill } from 'react-icons/bs'
import { IsearchResult } from 'types/movie'
import styles from './FavoriteButton.module.scss'

interface ImovieProps {
  item: IsearchResult
}

const FavoriteButton = ({ item }: ImovieProps) => {
  const favorite = localStorage.getItem('favorite')
  const favoriteList = favorite ? JSON.parse(favorite) : []

  const isFavorite = favoriteList.find((movie: IsearchResult) => movie.imdbID === item.imdbID)

  return isFavorite ? (
    <span className={styles.isFavorite}>
      <BsStarFill size={18} />
    </span>
  ) : (
    <span className={styles.isNotFavorite}>
      <BsStar size={18} />
    </span>
  )
}

export default FavoriteButton
