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

  export default OrderPreview