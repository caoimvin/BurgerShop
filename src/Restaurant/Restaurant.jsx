import Kitchen from '../Restaurant/Kitchen/Kitchen.jsx'
import styles from './Restaurant.module.css'

function Restaurant({ guests, serveFood, play }) {
    return (
      <div className={styles.restaurant}>
        <Kitchen guests={guests} serveFood={serveFood} play={play} />
      </div>
    )
  }

export default Restaurant