import OrderPreview from "../../OrderPreview/OrderPreview.jsx"
import styles from './Order.module.css'

function Order({ guest, serveOrder, index, next, prev, max }) {
    return (
      <div className={styles.order}>
        <div className={styles.guest_image}>
          {/* {guest.color} */}
            <div style={{ background: guest.color[0] }}></div>
            <div style={{ background: guest.color[1] }}></div>
            <div style={{ background: guest.color[2] }}></div>
        </div>
          <div className={styles.guest_happiness}>
            {/* {guest.happiness} */}
            <div style={{ width: `${100 - guest.happiness}%` }}></div>
          </div>
        <div className={`${styles.label} ${styles.guest_number}`}>
          number {index + 1} of {max} items
          <button onClick={() => prev()}>prev</button>
          <button onClick={() => next()}>next</button>
        </div>
        <div className={styles.guest_order}>
          <OrderPreview order={guest.order} />
        </div>
        <button onClick={() => serveOrder(guest.id)}>serve food</button>
      </div>
    )
  }

export default Order