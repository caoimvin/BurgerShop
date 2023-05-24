import styles from "./OrderPreview.module.css"

function OrderPreview({ order }) {
    return (
      <div className={styles.orderPreview}>
        <div className={styles.burger}>
          <div className={styles.bunTop}>
            {order.bun && <img src={`burger/buns/${order.bun}-top.png`} /> }
          </div>
          <div className={styles.toppings}>
            {order.toppings && order.toppings.map((topping, index) => <img key={index} className={styles[topping]} src={`burger/toppings/${topping}.png`} />)}
          </div>
          <div className={styles.meat}>
            {order.meat && <img src={`burger/meat/${order.meat}.png`} />}
          </div>
          <div className={styles.bunBottom}>
            {order.bun && <img src={`burger/buns/${order.bun}-bottom.png`} />}
          </div>
        </div>
        <div className={styles.extras}>
          {order.extras.map((extra, index) => <img key={index} src={`burger/extras/${extra}.png`} />)}
        </div>
      </div>
    )
  }

  export default OrderPreview