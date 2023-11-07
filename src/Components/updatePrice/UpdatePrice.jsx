import React from 'react';
import { Container, Table } from 'react-bootstrap';
import Navigationbar from '../navigationBar/Navigationbar';
import useGetProductPrices from '../../hooks/useGetProductPrices';
import { useState } from 'react';
import UpdatePriceAlert from '../alert/UpdatePriceAlert';

const UpdatePrice = () => {
    const {tshirtPrice}=useGetProductPrices()
    const [selectProductType, setSelectProductType] = useState('Round Neck');
    const [updatepopUp, setUpdatepopUp] = useState(false);
    const [getUpdateTshirtById, setGetUpdateTshirtById] = useState();
    const [clickedId, setClickedId] = useState();
    const [tShirtDetail,setTshirtDetail]=useState([{
      printSizeFront:"",  
      frontSideprice:"",
        backSideprice:"",
        
      },
    
    ])
    const [inputAdditionalCost,setInputAdditionalCost]=useState('')
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        switch (id) {
          case 'productType-filter':
            setSelectProductType(value);
            break; 
          default:
            break;
        }
        
      };
      const [additionalCostInput,setAdditionalCostInput]=useState(false)
const handleAdditionalCostInput=()=>{
  if(additionalCostInput===false){
    setAdditionalCostInput(true)
  }
  else{
    setAdditionalCostInput(false)
  }

}
    const handleInputChangeAdditionalCost = (event) => {
        const { id, value } = event.target;
        switch (id) {
          case 'additionalCost':
            setInputAdditionalCost(value);
            break; 
          default:
            break;
        }
        
      };
      const handleSubmitAdditionalCost = (e) => {
        e.preventDefault();
        console.log("inputAdditionalCost", inputAdditionalCost);
      
        const updateData = {
          updateAll: true, // This flag indicates a bulk update is intended
          additionalCost: inputAdditionalCost
        };
      
        // fetch('http://localhost:5000/editCalcPriceAdditionalCost', {
        fetch('https://mserver.printbaz.com/editCalcPriceAdditionalCost', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Server responded with a ${response.status} status.`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setAdditionalCostInput(false)
          
          // Handle success - for instance, updating UI or state
          // alert('All additional costs updated successfully!');
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle errors - for instance, showing error message to user
        })
        .finally(() => {
          // Finalize the process - for instance, resetting form or loading indicators
        });
      };
      
      const customRoundNeckFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Custom Round Neck")
const customDropSholderFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Custom Drop Sholder")
const customHoodieFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Custom Hoodie")
const blankRoundNeckFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Blank Round Neck")
const blankDropSholderFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Blank Drop Sholder")
const blankHoodieFilter=tshirtPrice?.filter(thsirt => thsirt.category === "Blank Hoodie")
let additionalCost=tshirtPrice[0]?.additionalCost

const handleUpdatePopUp=(id)=>{
    // e.stopPropagation();
    console.log("Received id:", id);
    setUpdatepopUp(true)
    setClickedId(id)
    // fetch(`http://localhost:5000/getProductPriceById/${id}`)
    fetch(`https://mserver.printbaz.com/getProductPriceById/${id}`)
    .then(response => response.json())
    .then(data => {
      // console.log("Fetched Data:", data);
      setGetUpdateTshirtById(data)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
    return (
        <>
        <Navigationbar/>
        <Container>
        <div className="panel-title seals_report_title mb-4 mt-5">
                    <h2>{selectProductType} Price Table <span style={{float: 'right'}}>    <select 
        id="productType-filter" 
        value={selectProductType} 
        className="form-control mr-5" 
        onChange={(e) => handleInputChange(e)} 
        style={{ maxWidth: '150px' }}  // Adjust the width value accordingly
    >
        <option value='Round Neck'>Round Neck </option>
        <option value="Drop Sholder">Drop Sholder</option>
        <option value="Hoodie">Hoodie</option>
        {/* <option value="Blank Round Neck">Blank Round Neck</option>
        <option value="Blank Drop Sholder">Blank Drop Sholder</option>
        <option value="Blank Hoodie">Blank Hoodie</option> */}
    </select></span></h2>
               
                  </div>
        <Table>
     <thead>
       <tr >
 
        {
          selectProductType==="Blank Round Neck" ||
          selectProductType==="Blank Drop Sholder" ||
          selectProductType==="Blank Hoodie" ?
          <th > Price</th>
          :
          <>
           <th >Print Size (in inches)</th>
          <th >With front side print cost</th>
          <th >DTF Price</th>
          <th >Action</th>
          <th >Additional Cost</th>
          </>
         
        }
          
      
       </tr>
     </thead>
     {
         selectProductType==="Round Neck" &&
         <tbody>
         {
             customRoundNeckFilter.map(roundNeck=>
                <tr>
                <td>{roundNeck?.printSizeFront}</td>
                <td>{roundNeck?.frontSideprice}</td>
                <td>{roundNeck?.backSideprice}</td>
               
                <td>
                            <button onClick={()=> handleUpdatePopUp(roundNeck?._id)} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/edit.png" alt='delete'/></button>
                            
                         </td>
              
                         <td>{additionalCostInput? 
                <>
                <input
              id="additionalCost"
              type="text"
              value={inputAdditionalCost}
              onChange={handleInputChangeAdditionalCost}
            />
            <button onClick={handleSubmitAdditionalCost}>submit</button>
            </>
:
roundNeck?.additionalCost
}  <button onClick={handleAdditionalCostInput} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/edit.png" alt='delete'/></button></td>  
             
            </tr>
           
                )
         }
      
   
   
     </tbody>
     }   {
         selectProductType==="Drop Sholder" &&
         <tbody>
         {
             customDropSholderFilter.map(roundNeck=>
                <tr>
                <td>{roundNeck?.printSizeFront}</td>
                <td>{roundNeck?.frontSideprice}</td>
                <td>{roundNeck?.backSideprice}</td>
                {/* <td>{roundNeck?.additionalCost}</td> */}
                <td>
                            <button onClick={()=> handleUpdatePopUp(roundNeck?._id)} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/edit.png" alt='delete'/></button>
                         </td>
                         <td>{additionalCostInput? 
                <>
                <input
              id="additionalCost"
              type="text"
              value={inputAdditionalCost}
              onChange={handleInputChangeAdditionalCost}
            />
            <button onClick={handleSubmitAdditionalCost}>submit</button>
            </>
:
roundNeck?.additionalCost
}  <button onClick={handleAdditionalCostInput} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/edit.png" alt='delete'/></button></td>
             
            </tr>
                )
         }
     
     </tbody>
     }   {
         selectProductType==="Hoodie" &&
         <tbody>
         {
             customHoodieFilter.map(roundNeck=>
                <tr>
                <td>{roundNeck?.printSizeFront}</td>
                <td>{roundNeck?.frontSideprice}</td>
                <td>{roundNeck?.backSideprice}</td>
                {/* <td>{roundNeck?.additionalCost}</td> */}
                <td>
                            <button onClick={()=> handleUpdatePopUp(roundNeck?._id)} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/edit.png" alt='delete'/></button>
                         </td>
                         <td>{additionalCostInput? 
                <>
                <input
              id="additionalCost"
              type="text"
              value={inputAdditionalCost}
              onChange={handleInputChangeAdditionalCost}
            />
            <button onClick={handleSubmitAdditionalCost}>submit</button>
            </>
:
roundNeck?.additionalCost
}  <button onClick={handleAdditionalCostInput} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/edit.png" alt='delete'/></button></td>
            </tr>
                )
         }
      
       
   
     </tbody>
     }  {
         selectProductType==="Blank Round Neck" &&
         <tbody>
         {
             blankRoundNeckFilter.map(roundNeck=>
                <tr>
                {/* <td>{roundNeck?.printSizeFront}</td> */}
                <td>{roundNeck?.frontSideprice}</td>
                {/* <td>{roundNeck?.backSideprice}</td> */}
              
               
             
            </tr>
                )
         }
      
       
   
     </tbody>
     }  {
         selectProductType==="Blank Drop Sholder" &&
         <tbody>
         {
             blankDropSholderFilter.map(roundNeck=>
                <tr>
                {/* <td>{roundNeck?.printSizeFront}</td> */}
                <td>{roundNeck?.frontSideprice}</td>
                {/* <td>{roundNeck?.backSideprice}</td> */}
              
               
             
            </tr>
                )
         }
      
       
   
     </tbody>
     }  {
         selectProductType==="Blank Hoodie" &&
         <tbody>
         {
             blankHoodieFilter.map(roundNeck=>
                <tr>
                {/* <td>{roundNeck?.printSizeFront}</td> */}
                <td>{roundNeck?.frontSideprice}</td>
                {/* <td>{roundNeck?.backSideprice}</td> */}
              
               
             
            </tr>
                )
         }
       </tbody>
     }
   
   </Table>
          <hr className="mb-25"/>
        
        </Container>
        {
                    updatepopUp === true &&
                    <UpdatePriceAlert
                    getUpdateTshirtById={getUpdateTshirtById}
                    setTshirtDetail={setTshirtDetail}
                    tShirtDetail={tShirtDetail}
                    updatepopUp={updatepopUp}
                    message="Item has been updated successfully."
                    onClose={() => setUpdatepopUp(false)}
                  
                    
                    
                    />

                  }
        </>
    );
};

export default UpdatePrice;