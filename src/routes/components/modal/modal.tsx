/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { FavoriteState, ModalVisibleState } from 'state'
import { IsearchResult } from 'types/movie'

import styles from './Modal.module.scss'

const Modal = () => {
  const favoriteState = useRecoilValue(FavoriteState)
  const favorite = localStorage.getItem('favorite')

  const favoriteList = favorite ? JSON.parse(favorite) : []

  const initialIsFavorite = favoriteList.find((movie: IsearchResult) => movie.imdbID === favoriteState.imdbID)

  const setModalVisible = useSetRecoilState(ModalVisibleState)
  const resetFavoriteState = useResetRecoilState(FavoriteState)
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)

  const handleAddFavorite = () => {
    localStorage.setItem('favorite', JSON.stringify([...favoriteList, favoriteState]))
    resetFavoriteState()
    setModalVisible(false)
  }

  const handleDeleteFavorite = () => {
    setIsFavorite(false)
    const filteredArr = favoriteList.filter((movie: IsearchResult) => movie.imdbID !== favoriteState.imdbID)
    localStorage.setItem('favorite', JSON.stringify([...filteredArr]))
    setModalVisible(false)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <>
      <div className={styles.modalContent}>
        <div className={styles.text}>
          <h5>{favoriteState.Title}</h5>
          {isFavorite ? <p>즐겨찾기를 해제 하시겠습니까?</p> : <p>즐겨찾기 하시겠습니까?</p>}
        </div>
        <div className={styles.buttonWrapper}>
          {isFavorite ? (
            <button type='button' className={styles.deleteFavorite} onClick={handleDeleteFavorite}>
              즐겨찾기 해제
            </button>
          ) : (
            <button type='button' className={styles.addFavorite} onClick={handleAddFavorite}>
              즐겨찾기
            </button>
          )}
          <button type='button' className={styles.cancelButton} onClick={handleCloseModal}>
            취소
          </button>
        </div>
      </div>
      <div className={styles.modalBackground} onClick={handleCloseModal} />
    </>
  )
}

export default Modal
