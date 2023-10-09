
const getTodayDateString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

const countSizePerDay = (orders) => {
    const dailyCounts = [];
    const todayString = getTodayDateString();
    const colors = ['white', 'black', 'bottle green', 'maroon', 'nBlue', 'gray', 'red'];
  
    // Find today's record or create a new one
    let todayRecord = dailyCounts.find(record => record.date === todayString);
    if (!todayRecord) {
      todayRecord = { date: todayString, counts: {} };
      colors.forEach(color => todayRecord.counts[color] = {});
      dailyCounts.push(todayRecord);
    }
  
    // Filter orders with orderStatus of 'out for delivery'
    const filteredOrders = orders?.filter(order => order.orderStatus === 'out for delivery');
  
    console.log("Filtered Orders:", filteredOrders); // DEBUG
  
    filteredOrders?.forEach(order => {
      (order?.orderDetailArr || []).forEach(item => {
        
        console.log("Processing item:", item); // DEBUG
  
        const color = item.color?.toLowerCase();
        
        if (colors.includes(color)) {
          if (typeof item.teshirtSize === 'string') {
            if (!todayRecord.counts[color][item.teshirtSize]) {
              todayRecord.counts[color][item.teshirtSize] = 0;
            }
            todayRecord.counts[color][item.teshirtSize] += parseInt(item.quantity || 0);
          } else {
            Object.entries(item.teshirtSize || {}).forEach(([size, quantity]) => {
              if (!todayRecord.counts[color][size]) {
                todayRecord.counts[color][size] = 0;
              }
              todayRecord.counts[color][size] += parseInt(quantity || 0);
            });
          }
        }
      });
    });
  
    return dailyCounts;
  };
  
export default countSizePerDay;
