import BurgerShop from "./BurgerShop/BurgerShop.jsx"
import Guest from "./Street/Guest/Guest.jsx"
import Street from "./Street/Street.jsx"
import styles from "./Map.module.css"

function Map({ guests, play, arrived, setHappiness, finished }) {
    return (
      <div className={styles.map}>
        <Street>
          {guests.map(item => {
            if (item.status === 'entering') return <Guest play={play} id={item.id} color={item.color} speed={item.speed} key={item.id} arrived={arrived} delay={item.delay} />
          }
            )}
        </Street>
        <BurgerShop guests={guests} setHappiness={setHappiness} play={play} />
        <Street>
        {guests.map(item => {
          if (item.status === 'leaving') return <Guest play={play} id={item.id} color={item.color} speed={item.speed} key={item.id} arrived={finished} delay={0} happiness={item.happiness} />
        }
            )}
        </Street>
      </div>
    )
  }

export default Map