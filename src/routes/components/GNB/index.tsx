import { NavLink } from 'react-router-dom'

import cx from 'classnames'
import styles from './GNB.module.scss'
import { RiSearchLine, RiStarSFill } from 'react-icons/ri'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <span>
              <RiSearchLine size={25} />
            </span>
            <p>검색</p>
          </NavLink>
        </li>
        <li>
          <NavLink to='favorites' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <span>
              <RiStarSFill size={25} />
            </span>
            <p>즐겨찾기</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default GNB
