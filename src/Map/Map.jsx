import BurgerShop from "./BurgerShop/BurgerShop.jsx"
import Guest from "./Street/Guest/Guest.jsx"
import Street from "./Street/Street.jsx"

function Map({ guests, play, arrived, setHappiness, finished }) {
    return (
      <div className="map">
        <Street>
          {guests.map(item => {
            if (item.status === 'entering') return <Guest play={play} id={item.id} color={item.color} key={item.id} arrived={arrived} delay={item.delay} />
          }
            )}
        </Street>
        <BurgerShop guests={guests} setHappiness={setHappiness} />
        <Street>
        {guests.map(item => {
          if (item.status === 'leaving') return <Guest play={play} id={item.id} color={item.color} key={item.id} arrived={finished} delay={0} />
        }
            )}
        </Street>
      </div>
    )
  }

export default Map