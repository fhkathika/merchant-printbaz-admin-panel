const countSizeForOrders = (orders) => {
    return orders?.reduce((acc, order) => {
      return (order?.orderDetailArr || []).reduce((innerAcc, item) => {
        const color = item.color.toLowerCase();
        
        // Initialize innerAcc[color] if it doesn't exist
        if (!innerAcc[color]) {
          innerAcc[color] = {};
        }
        
        // Check if the teshirtSize is a string or an object
        if (typeof item.teshirtSize === 'string') {
          // Handle string case (old format)
          if (!innerAcc[color][item.teshirtSize]) {
            innerAcc[color][item.teshirtSize] = 0;
          }
          innerAcc[color][item.teshirtSize] += parseInt(item.quantity || 0);
        } else {
          // Handle object case (new format)
          Object.entries(item.teshirtSize || {}).forEach(([size, quantity]) => {
            if (!innerAcc[color][size]) {
              innerAcc[color][size] = 0;
            }
            innerAcc[color][size] += parseInt(quantity || 0);
          });
        }
    
        return innerAcc;
      }, acc);
    }, { white: {}, black: {},green:{},maroon:{},nBlue:{},gray:{},red:{} /* Initialize other colors as needed */ });
  };
  export default countSizeForOrders