import { ImovieAPIRes, IsearchResult } from 'types/movie'

interface Props {
  item: IsearchResult
}

const MovieItem = ({ item }: Props) => {
  return (
    <ul key={`movie-${item.Title}`}>
      <li>{item.Title}</li>
      <img src={item.Poster} alt='posterImg' />
      <li>{item.Type}</li>
      <li>{item.Year}</li>
    </ul>
  )
}
export default MovieItem
