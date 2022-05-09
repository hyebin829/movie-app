import styles from './Main.module.scss'

import { useMount, useState } from 'hooks'
import { getWeatherApi } from 'services/weather'
import { ImovieAPIRes } from 'types/movie'
import MovieItem from './MovieItem'

const Weather = () => {
  const [data, setData] = useState<ImovieAPIRes>()

  useMount(() => {
    getWeatherApi({
      movieName: 'doctor',
      page: 2,
    })
      .then((res) => {
        setData(res.data)
        console.log(res)
      })
      .catch((res) => {
        console.error('error')
      })
  })

  if (!data) return null

  return (
    <section className={styles.weather}>
      <div className={styles.forecast}>
        <h2>Next forecast</h2>
        <div>
          {data.Search.map((item, index) => (
            <MovieItem key={`movie-${item.Title}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Weather
