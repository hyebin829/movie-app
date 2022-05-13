import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinnerBox}>
        <div className={styles.circleBorder}>
          <div className={styles.circleCore} />
        </div>
      </div>
    </div>
  )
}

export default Loading
