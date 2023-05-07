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

  export default ItemList