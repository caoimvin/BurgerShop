import OrderPreview from "../../OrderPreview/OrderPreview.jsx"
import styles from './Order.module.css'

function Order({ guest, serveOrder, index, next, prev, max }) {
    return (
      <div className={styles.order}>
        <div className={styles.label}>
          <div className={styles.guest_image}>
              <div style={{ background: guest.color[0] }}></div>
              <div style={{ background: guest.color[1] }}></div>
              <div style={{ background: guest.color[2] }}></div>
          </div>
          <div className={styles.guest_number}>
            {max > 1 && <button onClick={() => prev()}>&#65124;</button>}
            <p>Guest {index + 1} of {max}</p>
            {max > 1 && <button onClick={() => next()}>&#65125;</button>}
          </div>
        </div>
        <div className={styles.guest_happiness}>
          <div style={{ width: `${100 - guest.happiness}%` }}></div>
        </div>
        <div className={styles.guest_order}>
          <OrderPreview order={guest.order} />
        </div>
        <button onClick={() => serveOrder(guest.id)}>serve food</button>
      </div>
    )
  }

export default Order