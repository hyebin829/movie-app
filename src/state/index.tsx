import { atom } from 'recoil'
import { IsearchResult } from 'types/movie'

export const MovieDataState = atom<IsearchResult[]>({
  key: 'movieDataState',
  default: [],
})

export const SearchWordState = atom({
  key: 'searchWordState',
  default: '',
})

export const PageNumState = atom({
  key: 'pageNumState',
  default: 1,
})

export const TotalResultNum = atom({
  key: 'totalResultNumState',
  default: 1,
})

export const ModalVisibleState = atom({
  key: 'modalVisiblaState',
  default: false,
})

export const FavoriteState = atom({
  key: 'favoriteState',
  default: {
    imdbID: '',
    Title: '',
    Year: '',
    Type: '',
    Poster: '',
  },
})
