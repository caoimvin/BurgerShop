import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map from './Map/Map.jsx'
import Restaurant from './Restaurant/Restaurant.jsx'
import guestData from './data/guests.js'
import styles from './Game.module.css'

function Game() {
  const [play, setPlay] = useState(false)
  const [guests, setGuests] = useState(guestData)
  const [finishedGuests, setFinishedGuests] = useState(0)

  useEffect(() => {
    if (finishedGuests === guests.length) setPlay(false)
  }, [finishedGuests])

  function arrived(id) {
    console.log(id);
    setGuests(guests => guests.map(guest => {
      if (guest.id === id) {
        return {
          ...guest,
          status: 'waiting',
          entered: new Date().getTime()
        }
      } else {
        return guest
      }
    }))
  }

  function finished(id) {
    console.log('item finished', id);
    setFinishedGuests(current => current + 1)
  }

  function serveFood(id, food) {
    // console.log(food);
    setGuests(guests => guests.map(guest => {
      if (guest.id === id) {
        return {
          ...guest,
          status: 'leaving',
          happiness: checkOrder(guest, food)
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

  function checkOrder(guest, food) {
    let guestHappiness = guest.happiness
    const guestOrder = guest.order

    // check if bun is the same
    if (guestOrder.bun === food.bun) guestHappiness += 5
    else guestHappiness -= 25

    // check if meat is the same
    if (guestOrder.meat === food.meat) guestHappiness += 5
    else guestHappiness -= 35

    // check if toppings are in correct order
    guestOrder.toppings.forEach((topping, index) => {
      console.log(topping, index);
      if (food.toppings[index] === topping) guestHappiness += 5
      else guestHappiness -= 5
    })
    // minus points for too many toppings
    if (guestOrder.toppings.length < food.toppings.length) {
      guestHappiness = guestHappiness - (food.toppings.length - guestOrder.toppings.length) * 5
    }

    // check if every extra is included
    guestOrder.extras.forEach(extra => {
      if (food.extras.includes(extra)) guestHappiness += 5
      else guestHappiness -= 10
    })
    // minus points for too many extras
    if (guestOrder.extras.length < food.extras.length) {
      guestHappiness = guestHappiness - (food.extras.length - guestOrder.extras.length) * 5
    }

    if (guestHappiness < 0) guestHappiness = 0
    else if (guestHappiness > 100) guestHappiness = 100

    return guestHappiness
  }

  return (
    <div className={styles.game}>
      <button className={styles.pause_button} onClick={() => setPlay(!play)}>Menu</button>
      {!play && 
      <div className={styles.game_menu}>
        <div className={styles.game_menu_container}>
          <h1>Welcome to Burger Shop</h1>
          <button className='main' onClick={() => setPlay(!play)}>toggle</button>
        </div>
      </div> }
      <Map guests={guests} play={play} arrived={arrived} setHappiness={setHappiness} finished={finished} />
      <Restaurant guests={guests} serveFood={serveFood} play={play} />
    </div>
  )
}

export default Game
