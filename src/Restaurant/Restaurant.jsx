import Kitchen from '../Restaurant/Kitchen/Kitchen.jsx'

function Restaurant({ guests, serveFood }) {
    return (
      <div className="restaurant">
        <Kitchen guests={guests} serveFood={serveFood} />
      </div>
    )
  }

export default Restaurant