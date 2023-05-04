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
    order: {
      bun: 'default',
      meat: 'beef',
      toppings: ['cheese', 'salad']
    }
  },{
    id: 2,
    color: 'green',
    status: 'entering',
    delay: 2,
    happiness: 80,
    order: {
      bun: 'default',
      meat: 'chicken',
      toppings: ['salad']
    }
  },{
    id: 3,
    color: 'red',
    status: 'entering',
    delay: 5,
    happiness: 95,
    order: {
      bun: 'default',
      meat: 'vegetarian',
      toppings: ['cheese']
    }
  }
]

const bunData = {
  'default': {
    name: 'Default Bun',
    image: null
  }
}

const toppingData = {
  'salad': {
    name: 'Salad',
    image: null
  },
  'cheese': {
    name: 'Cheese',
    image: null
  }
}

const meatData = {
  'beef': {
    name: 'Beef',
    image: null
  },
  'chicken': {
    name: 'Chicken',
    image: null
  },
  'vegetarian': {
    name: 'Vegetarian',
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

  const toppingItems = Object.entries(toppingData)
  const bunItems = Object.entries(bunData)
  const meatItems = Object.entries(meatData)

  const [toppings, setToppings] = useState([])

  function addTopping(item) {
    setToppings(current => [...current, item])
  }

  function serveOrder(id) {
    serveFood(id, toppings)
    setToppings([])
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
        {toppings.join(',')}
        {toppingItems.map(item => <div key={item[0]} onClick={() => addTopping(item[0])} className='food-item'>{item[1].name}</div>)}
        {bunItems.map(item => <div key={item[0]} onClick={() => addTopping(item[0])} className='food-item'>{item[1].name}</div>)}
        {meatItems.map(item => <div key={item[0]} onClick={() => addTopping(item[0])} className='food-item'>{item[1].name}</div>)}
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
      {guest.order.toppings.map(item => item).join(',')}
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
