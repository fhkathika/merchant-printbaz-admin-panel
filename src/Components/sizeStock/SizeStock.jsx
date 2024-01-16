import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import Navigationbar from '../navigationBar/Navigationbar';

const SizeStock = () => {
  const [sizeData,setSizeData]=useState([])
  const data=
   [
    {
      "size": "m",
      "colors": {
        "Black": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": false,
          "blank_Hoodie": false,
          "custom_Round_Neck": false,
          "custom_Drop_Shoulder": true,
          "custom_Hoodie": true
         
        },
        "White": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
        
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Bottle Green": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
         "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Maroon": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Green": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        },
        "Navy Blue": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        },
        "Red": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        }
      }
    },
    {
      "size": "L",
      "colors": {
        "Black": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
          "blank_Hoodie": true,
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true,
          "custom_Hoodie": true
         
        },
        "White": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
        
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Bottle Green": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
         "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Maroon": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Green": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        },
        "Navy Blue": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        },
        "Red": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        }
      }
    },
    {
      "size": "XL",
      "colors": {
        "Black": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
          "blank_Hoodie": true,
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true,
          "custom_Hoodie": true
         
        },
        "White": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
        
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Bottle Green": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
         "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Maroon": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Green": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        },
        "Navy Blue": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        },
        "Red": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        }
      }
    },
    {
      "size": "XXL",
      "colors": {
        "Black": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
          "blank_Hoodie": true,
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true,
          "custom_Hoodie": true
         
        },
        "White": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
        
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Bottle Green": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
         "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Maroon": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Green": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        },
        "Navy Blue": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        },
        "Red": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        }
      }
    },
    {
      "size": "XXXL",
      "colors": {
        "Black": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
          "blank_Hoodie": true,
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true,
          "custom_Hoodie": true
         
        },
        "White": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
        
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Bottle Green": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
         "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Maroon": {
          "blank_Round_Neck": true,
          "blank_Drop_Shoulder": true,
          "custom_Round_Neck": true,
          "custom_Drop_Shoulder": true
          
        },
        "Green": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        },
        "Navy Blue": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        },
        "Red": {
          "blank_Hoodie": true,
          "custom_Hoodie": true
          
        }
      }
    }
   
  ];
  
  useEffect(()=>{

  const getSizeStock = async () => {
    // await fetch("http://localhost:5000/getAllSize") 
    await fetch("https://mserver.printbaz.com/getAllSize") 
   .then(res=>res.json())
   .then(data => setSizeData(data))
   }
   getSizeStock()
  },[])
  const handleToggleChange = async (property, size, color) => {
    try {
      // Modify the selected property in the local state
      const updatedSizeData = sizeData.map((item) => {
        if (item.size === size.size) {
          return {
            ...item,
            colors: {
              ...item.colors,
              [color]: {
                ...item.colors[color],
                [property]: !item.colors[color][property],
              },
            },
          };
        }
        return item;
      });
  
      // Update the local state
      setSizeData(updatedSizeData);
  
      // Make a POST request to the server to update the data
      // const response = await fetch('http://localhost:5000/updateSizeData', {
      const response = await fetch('https://mserver.printbaz.com/updateSizeData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedSizes: updatedSizeData }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Size data updated successfully on the server');
      } else {
        console.error('Failed to update size data on the server:', data.message);
      }
    } catch (error) {
      console.error('Error updating size data:', error);
    }
  };

  console.log("sizeData........",sizeData)
  
  
  const [selectedSize, setSelectedSize] = useState('m'); // State to store selected size

  // Function to handle size selection from dropdown
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
    return (
        <div>
            <Navigationbar/>
            <Container>
              
          


 <select onChange={(e) => handleSizeSelect(e.target.value)} style={{marginTop:"10px",height:"30px",width:"120px",backgroundColor:"#21175b",color:""}}>
        <option value="">Select Size</option>
        {sizeData.map((size) => (
          <option key={size.size} value={size.size}>
            {size.size}
          </option>
        ))}
      </select>
    <Table responsive>
  <thead>
    <tr>
      <th>Size</th>
      <th>Color</th>
      <th>Blank Round Neck</th>
      <th>Custom Round Neck</th>
      <th>Blank Drop Shoulder</th>
     <th>Custom Drop Shoulder</th>
      <th>Blank Hoodie</th>
      <th>Custom Hoodie</th>
    </tr>
  </thead>
  <tbody>
  {sizeData?.map((size) => (
  Object.keys(size.colors).map((color) => (
    (selectedSize === size.size || selectedSize === '') && (
    <tr key={`${size.size}-${color}`}>
      <td>{size.size}</td>
      <td>{color}</td>
      
      {/* blank_Round_Neck */}
      <td>
        {size.colors[color].blank_Round_Neck !== undefined && (
          <>
            <label className="switch">
              <input
                type="checkbox"
                checked={size.colors[color].blank_Round_Neck}
                onChange={() => handleToggleChange("blank_Round_Neck", size, color)}
              />
              <span className="slider round"></span>
            </label>
            <p>{size.colors[color].blank_Round_Neck ? "In Stock" : "Out of Stock"}</p>
          </>
        )}
      </td>

      {/* custom_Round_Neck */}
      <td>
        {size.colors[color].custom_Round_Neck !== undefined && (
          <>
            <label className="switch">
              <input
                type="checkbox"
                checked={size.colors[color].custom_Round_Neck}
                onChange={() => handleToggleChange("custom_Round_Neck", size, color)}
              />
              <span className="slider round"></span>
            </label>
            <p>{size.colors[color].custom_Round_Neck ? "In Stock" : "Out of Stock"}</p>
          </>
        )}
      </td>

      {/* blank_Drop_Shoulder */}
      <td>
        {size.colors[color].blank_Drop_Shoulder !== undefined && (
          <>
            <label className="switch">
              <input
                type="checkbox"
                checked={size.colors[color].blank_Drop_Shoulder}
                onChange={() => handleToggleChange("blank_Drop_Shoulder", size, color)}
              />
              <span className="slider round"></span>
            </label>
            <p>{size.colors[color].blank_Drop_Shoulder ? "In Stock" : "Out of Stock"}</p>
          </>
        )}
      </td>

      {/* custom_Drop_Shoulder */}
      <td>
        {size.colors[color].custom_Drop_Shoulder !== undefined && (
          <>
            <label className="switch">
              <input
                type="checkbox"
                checked={size.colors[color].custom_Drop_Shoulder}
                onChange={() => handleToggleChange("custom_Drop_Shoulder", size, color)}
              />
              <span className="slider round"></span>
            </label>
            <p>{size.colors[color].custom_Drop_Shoulder ? "In Stock" : "Out of Stock"}</p>
          </>
        )}
      </td>

      {/* blank_Hoodie */}
      <td>
        {size.colors[color].blank_Hoodie !== undefined && (
          <>
            <label className="switch">
              <input
                type="checkbox"
                checked={size.colors[color].blank_Hoodie}
                onChange={() => handleToggleChange("blank_Hoodie", size, color)}
              />
              <span className="slider round"></span>
            </label>
            <p>{size.colors[color].blank_Hoodie ? "In Stock" : "Out of Stock"}</p>
          </>
        )}
      </td>

      {/* custom_Hoodie */}
      <td>
        {size.colors[color].custom_Hoodie !== undefined && (
          <>
            <label className="switch">
              <input
                type="checkbox"
                checked={size.colors[color].custom_Hoodie}
                onChange={() => handleToggleChange("custom_Hoodie", size, color)}
              />
              <span className="slider round"></span>
            </label>
            <p>{size.colors[color].custom_Hoodie ? "In Stock" : "Out of Stock"}</p>
          </>
        )}
      </td>
    </tr>
    )
  ))
))}

  </tbody>
</Table>


            </Container>
            
        </div>
    );
};

export default SizeStock;