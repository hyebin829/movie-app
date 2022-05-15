import { DragEvent, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { ModalVisibleState } from 'state'
import { IsearchResult } from 'types/movie'

import FavoriteButton from 'routes/components/favoriteButton/favoriteButton'
import Modal from 'routes/components/modal'
import Movie from 'routes/Main/movie'
import styles from './Favorites.module.scss'

const Favorites = () => {
  const favorite = localStorage.getItem('favorite')
  const favoriteList = favorite ? JSON.parse(favorite) : []
  const modalVisible = useRecoilValue(ModalVisibleState)
  const [list, setList] = useState(favoriteList)

  const draggingItem = useRef<string | undefined>()
  const dragOverItem = useRef<string | undefined>()

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    draggingItem.current = e.currentTarget.dataset.id
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    dragOverItem.current = e.currentTarget.dataset.id
  }

  const handleDragEnd = () => {
    const listCopy = [...list]

    let draggingItemContent = listCopy[Number(draggingItem.current)]
    let dragOverItemContent = listCopy[Number(dragOverItem.current)]

    const save = draggingItemContent
    draggingItemContent = dragOverItemContent
    dragOverItemContent = save

    listCopy.splice(Number(draggingItem.current), 1, draggingItemContent)
    listCopy.splice(Number(dragOverItem.current), 1, dragOverItemContent)

    localStorage.setItem('favorite', JSON.stringify(listCopy))
    setList(listCopy)
  }

  return (
    <>
      {modalVisible && <Modal />}
      <div className={styles.favoritesWrapper}>
        <h1>&#x2B50; Favorite List &#x2B50;</h1>
        <div className={styles.favoriteList}>
          {list.map((item: IsearchResult, index: number) => (
            <div
              key={`${item.imdbID}-movie-${index + 1}`}
              data-id={index}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragEnd={handleDragEnd}
              draggable='true'
            >
              <Movie item={item}>
                <FavoriteButton item={item} />
              </Movie>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Favorites
