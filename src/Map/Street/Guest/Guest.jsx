import { useEffect, useRef, useState } from "react";
import styles from "./Guest.module.css"

function Guest({ play, id, color, speed, arrived, delay, inside, happiness }) {
    const [moving, setMoving] = useState(false)
    const guest = useRef()
    
    useEffect(() => {
      function animationend() {
        console.log('animation ended');
        setMoving(false)
        guest.current.removeEventListener('animationend', animationend)
        arrived(id)
      }
      guest.current.addEventListener('animationend', animationend)
  
      return () => {
        if (guest.current) {
          guest.current.removeEventListener('animationend', animationend)
        }
      }
    }, [])

    function getMood() {
      if (!happiness && happiness != 0) return ''
      if (happiness > 70) return 'happy'
      else if (happiness > 40) return 'normal'
      else return 'sad'
    }
  
    return (
      <div className={`${styles.guest} ${moving ? styles.moving : styles.stopped} ${play ? '' : styles.paused} ${inside ? styles.inside : ''} ${styles[getMood()]}`} ref={guest} style={{animationDelay: `${delay}s`, animationDuration: `${speed}s`}}>
        <div style={{ background: color[0] }}></div>
        <div style={{ background: color[1] }}></div>
        <div style={{ background: color[2] }}></div>
      </div>
    )
  }
  
export default Guest