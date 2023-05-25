import ItemList from "./ItemList/ItemList.jsx"
import OrderPreview from "./OrderPreview/OrderPreview.jsx"
import Orders from "./Orders/Orders.jsx"
import toppingData from "../../data/toppings.js"
import bunData from "../../data/buns.js"
import meatData from "../../data/meat.js"
import extraData from "../../data/extras.js"
import { useState } from "react"
import styles from "./Kitchen.module.css"

function Kitchen({ guests, serveFood, play }) {

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
      if (!play) return
      setOrder(current => ({...current, toppings: [...current.toppings, item]}))
    }
  
    function addExtra(item) {
      if (!play) return
      setOrder(current => ({...current, extras: [...current.extras, item]}))
    }
  
    function addBun(item) {
      if (!play) return
      setOrder(current => ({...current, bun: item}))
    }
  
    function addMeat(item) {
      if (!play) return
      setOrder(current => ({...current, meat: item}))
    }
  
    function serveOrder(id) {
      if (!play) return
      serveFood(id, order)
      deleteFood()
    }
    
    function deleteFood() {
      if (!play) return
      setOrder({
        bun: null,
        meat: null,
        toppings: [],
        extras: []
      })
    }
  
    return (
      <div className={styles.kitchen}>
        <div className={styles.workplace}>
          <div className={styles.label}>
            Burger Shop
          </div>
          <ItemList title="Buns" category="buns" items={bunItems} addItem={addBun} />
          <ItemList title="Meat" category="meat" items={meatItems} addItem={addMeat} />
          <ItemList title="Toppings" category="toppings" items={toppingItems} addItem={addTopping} />
          <ItemList title="Extras" category="extras" items={extraItems} addItem={addExtra} />
        </div>
        <div className={styles.orders}>
          <Orders guests={guests} serveOrder={serveOrder} />
          <div className="order-kitchen">
            <div className={styles.label}>Food</div>
            <OrderPreview order={order} />
            <button onClick={() => deleteFood()}>delete food</button>
          </div>
        </div>
      </div>
    )
  }

  export default Kitchen