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
      toppings: ['cheese', 'salad'],
      extras: []
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
      toppings: ['salad'],
      extras: []
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
      toppings: ['cheese'],
      extras: []
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

const extraData = {
  'coke': {
    name: 'Coke',
    image: null
  },
  'juice': {
    name: 'Juice',
    image: null
  },
  'fries': {
    name: 'Fries',
    image: null
  },
  'shake': {
    name: 'Milkshake',
    image: null
  },
  'sweet': {
    name: 'Sweet',
    image: null
  }
}

function App() {
  const [play, setPlay] = useState(false)
  const [guests, setGuests] = useState(data)

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

function Restaurant({ guests, serveFood }) {
  return (
    <div className="restaurant">
      <Kitchen guests={guests} serveFood={serveFood} />
    </div>
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
  const extraItems = Object.entries(extraData)

  const [order, setOrder] = useState({
    bun: null,
    meat: null,
    toppings: [],
    extras: []
  })

  function addTopping(item) {
    setOrder(current => ({...current, toppings: [...current.toppings, item]}))
  }

  function addExtra(item) {
    setOrder(current => ({...current, extras: [...current.extras, item]}))
  }

  function addBun(item) {
    setOrder(current => ({...current, bun: item}))
  }

  function addMeat(item) {
    setOrder(current => ({...current, meat: item}))
  }

  function serveOrder(id) {
    serveFood(id, order)
    setOrder({
      bun: null,
      meat: null,
      toppings: [],
      extras: []
    })
  }

  return (
    <div className="kitchen">
      <div className="workplace">
        <h1>Burger Shop</h1>
        <ItemList title="Bun" items={bunItems} addItem={addBun} />
        <ItemList title="Meat" items={meatItems} addItem={addMeat} />
        <ItemList title="Toppings" items={toppingItems} addItem={addTopping} />
        <ItemList title="Extras" items={extraItems} addItem={addExtra} />
      </div>
      <div className="orders">
        <Orders guests={guests} serveOrder={serveOrder} />
        <div className="order-kitchen">
          <OrderPreview order={order} />
          <button>delete food</button>
        </div>
      </div>
    </div>
  )
}

function Orders({ guests, serveOrder }) {
  return (
    <div className="order-items">
      {
        guests.map((guest, index) => {
          if (guest.status === 'waiting') return <Order key={guest.id} index={index} serveOrder={serveOrder} guest={guest} />
        })
      }
    </div>
  )
}

function ItemList({ title, items, addItem }) {
  return (
    <div className="item-list">
      <div className="item-list-title">
        { title }
      </div>
      <div className="item-list-content">
        {items.map(item => <div key={item[0]} onClick={() => addItem(item[0])} className='item'>{item[1].name}</div>)}
      </div>
    </div>
  )
}

function OrderPreview({ order }) {
  return (
    <div className="order-preview">
      <div className="burger">
        <div className="bun-top">
          {order.bun}
        </div>
        <div className="toppings">
          {order.toppings.map((topping, index) => <div key={index}>{topping}</div>)}
        </div>
        <div className="meat">
          {order.meat}
        </div>
        <div className="bun-button">
          {order.bun}
        </div>
      </div>
      <div className="extras">
        {order.extras.map((extra, index) => <div key={index}>{extra}</div>)}
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

function Order({ guest, serveOrder, index }) {
  return (
    <div className="order">
      <div className="guest-image">
        {guest.color}
        <div className="happiness">
          {guest.happiness}
        </div>
      </div>
      <div className="guest-number">
        {index + 1}
      </div>
      <div className="guest-order">
        <OrderPreview order={guest.order} />
      </div>
      <button onClick={() => serveOrder(guest.id)}>serve food</button>
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
