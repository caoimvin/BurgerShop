import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map from './Map/Map.jsx'
import Restaurant from './Restaurant/Restaurant.jsx'
import guestData from './data/guests.js'

function App() {
  const [play, setPlay] = useState(false)
  const [guests, setGuests] = useState(guestData)

  function arrived(id) {
    console.log(id);
    setGuests(guests => guests.map(guest => {
      if (guest.id === id) {
        return {
          ...guest,
          status: 'waiting'
        }
      } else {
        return guest
      }
    }))
  }

  function finished(id) {
    console.log('item finished', id);
  }

  function serveFood(id, food) {
    console.log(food);
    setGuests(guests => guests.map(guest => {
      if (guest.id === id) {
        return {
          ...guest,
          status: 'leaving'
        }
      } else {
        return guest
      }
    }))
  }

  function setHappiness(id, happiness) {
    setGuests(guests => guests.map(guest => {
      if (guest.id === id) {
        return {
          ...guest,
          happiness: happiness <= 0 ? 0 : happiness
        }
      } else {
        return guest
      }
    }))
  }

  return (
    <>
      <button className='main' onClick={() => setPlay(!play)}>toggle</button>
      <Map guests={guests} play={play} arrived={arrived} setHappiness={setHappiness} finished={finished} />
      <Restaurant guests={guests} serveFood={serveFood} />
    </>
  )
}

export default App
