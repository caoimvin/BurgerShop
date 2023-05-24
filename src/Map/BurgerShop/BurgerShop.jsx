import { useEffect, useRef } from "react"
import styles from "./BurgerShop.module.css"
import Guest from "../Street/Guest/Guest"

function BurgerShop({ guests, setHappiness, play }) {

    const interval = useRef()

    function startInterval() {
      interval.current = setInterval(() => {
        guests.forEach(guest => {
          if (guest.status === 'waiting') setHappiness(guest.id, guest.happiness - 1)
        })
      }, 1000)
    }

    function stopInterval() {
      if (interval.current) clearInterval(interval.current)
    }

    useEffect(() => {
      startInterval()
      return () => stopInterval()
    }, [guests])

    useEffect(() => {
      if (!play) stopInterval()
      else startInterval()
    }, [play])
  
    return (
      <div className={styles.burgerShop}>
        {
          guests.map(guest => {
            if (guest.status === 'waiting') return <Guest play={play} inside={true} id={guest.id} color={guest.color} speed={guest.speed} key={guest.id} delay={0} />
          })
        }
        
      </div>
    )
  }

  export default BurgerShop