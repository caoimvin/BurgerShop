import { useEffect, useState } from "react"
import Order from "./Order/Order.jsx"
import styles from "./Orders.module.css"

function Orders({ guests, serveOrder }) {

    // const orders = guests.filter(guest => guest.entered && guest.status === 'waiting')

    // console.log(orders);

    const [orders, setOrders] = useState([])
    const [activeOrder, setActiveOrder] = useState(0)

    useEffect(() => {
      let guestOrders = guests.filter(guest => guest.entered && guest.status === 'waiting')
      guestOrders.sort((orderA, orderB) => orderA.entered - orderB.entered)
      setOrders(guestOrders)
    }, [guests])

    function nextOrder() {
      if (activeOrder + 1 > orders.length - 1) setActiveOrder(0)
      else setActiveOrder(current => current + 1)
    }

    function prevOrder() {
      if (activeOrder - 1 < 0) setActiveOrder(orders.length - 1)
      else setActiveOrder(current => current - 1)
    }

    return (
      <div className={styles.oder_items}>
        {
          orders[activeOrder] && <Order key={orders[activeOrder].id} index={activeOrder} max={orders.length} serveOrder={serveOrder} guest={orders[activeOrder]} next={nextOrder} prev={prevOrder} />
          // guests.map((guest, index) => {
          //   if (guest.entered && guest.status === 'waiting') return <Order key={guest.id} index={index} serveOrder={serveOrder} guest={guest} />
          // })
        }
      </div>
    )
  }

  export default Orders