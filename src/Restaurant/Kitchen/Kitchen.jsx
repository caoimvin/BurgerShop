import ItemList from "./ItemList/ItemList.jsx"
import OrderPreview from "./OrderPreview/OrderPreview.jsx"
import Orders from "./Orders/Orders.jsx"
import toppingData from "../../data/toppings.js"
import bunData from "../../data/buns.js"
import meatData from "../../data/meat.js"
import extraData from "../../data/extras.js"
import { useState } from "react"

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

  export default Kitchen