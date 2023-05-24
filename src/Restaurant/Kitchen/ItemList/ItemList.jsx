import styles from "./ItemList.module.css"

function ItemList({ title, items, addItem, category }) {
    return (
      <div className={styles.item_list}>
        <div className={styles.item_list_title}>
          { title }
        </div>
        <div className={styles.item_list_content}>
          {items.map(item => <div key={item[0]} onClick={() => addItem(item[0])} className={styles.item}>
            <div>{item[1].name}</div>
            <img src={`burger/${category}/${item[0]}.png`} />
          </div>)}
        </div>
      </div>
    )
  }

  export default ItemList