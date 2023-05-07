import Order from "./Order/Order.jsx"

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

  export default Orders