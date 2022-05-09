import styles from './Routes.module.scss'
import Main from './Main'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Favorites from './Favorites'

const App = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
