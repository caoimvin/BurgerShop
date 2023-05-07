import OrderPreview from "../../OrderPreview/OrderPreview.jsx"
import styles from './Order.module.css'

function Order({ guest, serveOrder, index }) {
    return (
      <div className={styles.order}>
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

export default Order