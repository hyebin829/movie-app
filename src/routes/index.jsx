import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import LoadingPage from './components/loading/loadingPage'
import GNB from './components/GNB'

import styles from './Routes.module.scss'

const Main = lazy(() => import('./Main/index'))
const Favorites = lazy(() => import('./Favorites/index'))
const NotFound = lazy(() => import('./Notfound/notfound'))

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='favorites' element={<Favorites />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
        <GNB />
      </div>
    </BrowserRouter>
  )
}

export default App
