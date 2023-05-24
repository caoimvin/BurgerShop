function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getSkinColor() {
  const colors = ['#8d5524', '#c68642', '#e0ac69', '#f1c27d', '#ffdbac']
  return colors[Math.floor(Math.random() * colors.length)]
}

function createGuestColors() {
  return [getSkinColor(), getRandomColor(), getRandomColor()]
}

function getSpeed() {
  const max = 10
  const min = 5
  return (Math.random() * (max - min + 1) + min).toFixed(1)
}

const guests = [
    {
      id: 1,
      // color: getRandomColor(),
      status: 'entering',
      delay: 0,
      happiness: 100,
      order: {
        bun: 'default',
        meat: 'beef',
        toppings: ['cheese', 'salad'],
        extras: []
      }
    },{
      id: 2,
      // color: 'green',
      status: 'entering',
      delay: 2,
      happiness: 80,
      order: {
        bun: 'default',
        meat: 'chicken',
        toppings: ['salad'],
        extras: ['coke', 'sweet']
      }
    },{
      id: 3,
      // color: 'red',
      status: 'entering',
      delay: 5,
      happiness: 95,
      order: {
        bun: 'default',
        meat: 'vegetarian',
        toppings: ['cheese'],
        extras: []
      }
    }
  ]

  const guestsFormatted = guests.map(guest => ({...guest, color: createGuestColors(), speed: getSpeed()}))

  // console.log(guestsFormatted);

  export default guestsFormatted