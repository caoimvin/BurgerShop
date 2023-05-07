import { useEffect, useRef, useState } from "react";

function Guest({ play, id, color, arrived, delay }) {
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
  
    return (
      <div className={`guest ${moving ? 'moving' : 'stopped'} ${play ? '' : 'paused'}`} ref={guest} style={{background: color, animationDelay: `${delay}s`}}></div>
    )
  }
  
export default Guest