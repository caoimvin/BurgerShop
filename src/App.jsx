import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styles from './Order.module.css'

const data = [
  {
    id: 1,
    color: 'blue',
    status: 'entering',
    delay: 0,
    happiness: 100,
    order: ['patty','meat','patty']
  },{
    id: 2,
    color: 'green',
    status: 'entering',
    delay: 2,
    happiness: 80,
    order: ['patty','salad','meat','salad','patty']
  },{
    id: 3,
    color: 'red',
    status: 'entering',
    delay: 5,
    happiness: 95,
    order: ['patty','meat','cheese','patty']
  }
]

const food = {
  'patty': {
    name: 'Patty',
    image: null
  },
  'salad': {
    name: 'Salad',
    image: null
  },
  'meat': {
    name: 'Meat',
    image: null
  },
  'cheese': {
    name: 'Cheese',
    image: null
  }
}

function App() {
  const [play, setPlay] = useState(false)
  const [guests, setGuests] = useState(data)

  // function test() {
  //   setGuests(guests => guests.map(guest => ({...guest, status: 'leaving'})))
  // }

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

  function serveFood(id, burger) {
    console.log(burger);
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
      {/* <button onClick={() => test()}>test</button> */}
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
      <div className="game">
        <Kitchen guests={guests} serveFood={serveFood} />
      </div>
    </>
  )
}

function Street({ children }) {

  return (
    <div className="conveyor-belt">
        {children}
    </div>
  )
}

function Kitchen({ guests, serveFood }) {

  const foodItems = Object.entries(food)

  const [burger, setBurger] = useState([])

  function addBurger(item) {
    setBurger(current => [...current, item])
  }

  function serveOrder(id) {
    serveFood(id, burger)
    setBurger([])
  }

  return (
    <div className="kitchen">
      <div className="orders">
        {
          guests.map(guest => {
            if (guest.status === 'waiting') return <Order key={guest.id} serveOrder={serveOrder} guest={guest} />
          })
        }
      </div>
      <div className="workplace">
        {burger.join(',')}
        {foodItems.map(item => <div key={item[0]} onClick={() => addBurger(item[0])} className='food-item'>{item[1].name}</div>)}
      </div>
    </div>
  )
}

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

function Order({ guest, serveOrder }) {
  return (
    <div className={styles.order} style={{borderColor: guest.color}} onClick={() => serveOrder(guest.id)}>
      {guest.order.map(item => item).join(',')}
      {guest.happiness}
    </div>
  )
}

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

export default App
