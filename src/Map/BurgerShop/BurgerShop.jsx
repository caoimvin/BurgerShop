import { useEffect } from "react"

function BurgerShop({ guests, setHappiness }) {

    useEffect(() => {
      const interval = setInterval(() => {
        guests.forEach(guest => {
          if (guest.status === 'waiting') setHappiness(guest.id, guest.happiness - 10)
        })
      }, 1000)
      return () => clearInterval(interval)
    }, [guests])
  
    return (
      <div className="burger-shop">
        {
          guests.map(guest => {
            if (guest.status === 'waiting') return <p key={guest.id}>serve guest: {guest.id}</p>
          })
        }
        
      </div>
    )
  }

  export default BurgerShop