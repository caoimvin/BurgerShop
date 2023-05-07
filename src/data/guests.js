const guests = [
    {
      id: 1,
      color: 'blue',
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
      color: 'green',
      status: 'entering',
      delay: 2,
      happiness: 80,
      order: {
        bun: 'default',
        meat: 'chicken',
        toppings: ['salad'],
        extras: []
      }
    },{
      id: 3,
      color: 'red',
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

  export default guests