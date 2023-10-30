
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "../../css/style.css"
import { Button, Card, Col, Form, ListGroup, OverlayTrigger, ProgressBar, Row, Spinner, Tooltip } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetData } from '../../hooks/useGetData';
import teeShirtFormula from '../../Formulas/teeShirtFormula';
import AlertMessage from '../alert/AlertMessage';
import OrderUpdateAlert from '../alert/OrderUpdateAlert';
import DeleteRoleAlert from '../alert/DeleteRoleAlert';
import axios from 'axios';
import deliveryCharge from '../../Formulas/deliveryCharge';
import tshirtFormulaCustomDropSholder from '../../Formulas/tshirtFormulaCustomDropSholder';

const UpdateOrderBlankProduct = ({ onClose,viewOrder,viewClient,getSpecificOrderById,setGetSpecificOrderById }) => {
  console.log("getSpecificOrderById from edit order page",getSpecificOrderById); 
  console.log("viewOrder",viewOrder); 
  // console.log("viewOrder",viewOrder);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [updateOrderArr, setUpdateOrderArr] = useState([]);
    const [indexNumber, setIndexNumber] = useState();

    // console.log("getSpecificOrderById",getSpecificOrderById);

// useEffect(()=>{
//   const getOrderById=async()=>{
//     // Fetch the updated order details
// await fetch(`https://mserver.printbaz.com/getorder/${viewOrder?._id}`)
// // await fetch(`http://localhost:5000/getorder/${viewOrder?._id}`)
// .then(res=>res.json())
// .then(data => setGetSpecificOrderById(data))


// }
// getOrderById()
// },[getSpecificOrderById])
 
   
let  individualOrder
// if(ordersArray){
//     for(let i=0;i<ordersArray.length;i++){
//  individualOrder=ordersArray[i]
//     }
// }
const filesArr=individualOrder?.file?.map(singleFile=>{
  
    return singleFile
})
const ImagesArr=individualOrder?.image?.map(singleImage=>{
  
    return singleImage
})
let individualFile;
if(filesArr){
    for(let i=0;i<filesArr.length;i++){
        individualFile=filesArr[i]
    }
}
let individualImage;
if(ImagesArr){
    for(let i=0;i<ImagesArr.length;i++){
      individualImage=ImagesArr[i]
    }
}

console.log("getSpecificOrderById out side delete func",getSpecificOrderById);
   const [formData, setFormData] = useState({
        name: getSpecificOrderById?.name,
        phone: getSpecificOrderById?.phone,
        address: getSpecificOrderById?.address,
        instruction: getSpecificOrderById?.instruction,
        collectAmount: getSpecificOrderById?.collectAmount,
        areas: getSpecificOrderById?.areas,
        zones: getSpecificOrderById?.zones,
        districts: getSpecificOrderById?.districts,
        printbazcost: getSpecificOrderById?.printbazcost,
        quantity: getSpecificOrderById?.quantity,
        deliveryFee: getSpecificOrderById?.deliveryFee,
        dsicount: getSpecificOrderById?.dsicount?  getSpecificOrderById?.dsicount:'',
        additionalCost:getSpecificOrderById?.additionalCost?getSpecificOrderById?.additionalCost:'',
        discountNote:getSpecificOrderById?.discountNote?getSpecificOrderById?.discountNote:'',
        additionalCostNote:getSpecificOrderById?.additionalCostNote?getSpecificOrderById?.additionalCostNote:'',
        category:getSpecificOrderById?.category,
        orderDetailArr:  getSpecificOrderById?.orderDetailArr?.map(order => {
        
           return order
           })
      
      });
   
      console.log("orderDetailArr",formData?.orderDetailArr);
      console.log("formData",formData);
    
        let id = "resellerOrdersId";
       let collections = "resellerInfo";
       let idPrice = "teeShirtCampingId";
       let collectionsPrice = "productValues";
       const [fileprogress, setFileProgress] = useState(0);
       const [imageprogress, setImageProgress] = useState(0);
       const [showAlert, setShowAlert] = useState(false);
       const [dbData, setDbData] = useState({});
       const [printSide, setPrintSide] = useState('');
       const [addbrandLogo, setAddBrandLogo] = useState('');
       const [file, setFile] = useState();
       const [districts, setDistricts] = useState([]);
       const [zones, setZones] = useState([]);
       const [areas, setAreas] = useState([]);
       const [deliveryAreas, setDeliveryAreas] = useState('');
       const { fetchedData, searchProduct, setSearchProduct } = useGetData(
         idPrice,
         collectionsPrice,
         dbData
       );
    //   const {user}=useContext(AuthContext);
    //   const userEmail=user?.email
      const [isLoading, setIsLoading] = useState(false);
      const [recvAmount,setRecvAmount]=useState()
      const [formValid, setFormValid] = useState(false);
      const [updateDataSent, setUpdateDataSent] = useState(false);
      const [showCreateRole, setShowCreateRole] = useState(false);
      const [deletepopUp, setDeletepopUp] = useState(false);
      const [deleteId, setDeleteId] = useState();
      const [addBrandLogoArray, setAddBrandLogoArray] = useState([]);
    // Fetch unique districts when the component mounts
  useEffect(() => {
    // axios.get('http://localhost:5000/unique-districts')
    axios.get('https://mserver.printbaz.com/unique-districts')
      .then(response => {
        setDistricts(response.data);
      })
      .catch(error => {
        console.error('Error fetching unique districts:', error);
      });
  }, []);
  useEffect(() => {
    if (formData?.districts) {
    //   axios.get(`http://localhost:5000/zones?district=${encodeURIComponent(formData?.districts)}`)
      axios.get(`https://mserver.printbaz.com/zones?district=${encodeURIComponent(formData?.districts)}`)
        .then(response => {
          setZones(response.data);
          // console.log("response.data", response.data);
        })
        .catch(error => {
          console.error('Error fetching zones:', error);
          setZones([]);  // Optionally, clear zones if the fetch fails
        });
    } else {
      setZones([]); // Clear zones if the district is not selected
      setAreas([]); // Clear areas as well, as they depend on the zone
    }
  }, [formData?.districts]);
  
    // Fetch areas based on selected zone
    useEffect(() => {
      if (formData?.zones) {
        // axios.get(`http://localhost:5000/areas/${encodeURIComponent(formData?.zones)}`)
        axios.get(`https://mserver.printbaz.com/areas/${encodeURIComponent(formData?.zones)}`)
          .then(response => {
            setAreas(response.data);
          })
          .catch(error => {
            console.error('Error fetching areas:', error);
            setAreas([]);  // Optionally, clear areas if the fetch fails
          });
      } else {
        setAreas([]); // Clear areas if the zone is not selected
      }
    }, [formData?.zones]);
 // fetch delievryArea 
 useEffect(() => {
  if (formData?.districts && formData?.zones && formData?.areas) {
    // axios.get(`http://localhost:5000/deliveryAreaByLocation?District=${formData?.districts}&Zone=${formData?.zones}&Area=${formData?.areas}`)
    axios.get(`https://mserver.printbaz.com/deliveryAreaByLocation?District=${formData?.districts}&Zone=${formData?.zones}&Area=${formData?.areas}`)
      .then((res) => setDeliveryAreas(res.data.deliveryArea))
      .catch((error) => console.error('Error fetching deliveryArea:', error));
  }
}, [formData?.districts ,formData?.zones , formData?.areas]);


      const d = new Date();
        const options = { month: "long", day: "numeric", year: "numeric" };
        const formattedDate = d.toLocaleDateString("en-US", options);
      
       
      
        const navigate=useNavigate()
        const location=useLocation()
        const [inputs, setInputs] = useState([{ value: '' }]);
    
        const safeParseInt = (str) => {
          const value = parseInt(str);
          return isNaN(value) ? 0 : value;
      };
      
     
        const handleInputChange = (event, index) => {
          const { name, value } = event.target;
          const color = event.target.getAttribute('data-color');
          const size = event.target.getAttribute('data-size');
          const newOrderDetailArr = [...formData.orderDetailArr];
      
          let itemIndex = newOrderDetailArr.findIndex(item => item.color === color);
      console.log("printSIde",value)
          if (name==="color" || name==="teshirtSize" || name==="quantityM" ||  name==="quantityL"|| name==="quantityXL"||  name==="quantityXXL"|| name==="printSize"|| name==="printSide" || name==="printSizeBack") {
              if (size) {
                  newOrderDetailArr[itemIndex].teshirtSize = { ...newOrderDetailArr[itemIndex].teshirtSize, [size]: value };
              }
              newOrderDetailArr[itemIndex][name] = value;
          } else {
           
              setFormData({ ...formData, [name]: value });
              return;
          }
        
          // Compute grand total based on the newOrderDetailArr
          const newGrandQuantity = newOrderDetailArr.reduce((acc, item) => 
        acc + safeParseInt(item.quantityM) + 
              safeParseInt(item.quantityL) + 
              safeParseInt(item.quantityXL) + 
              safeParseInt(item.quantityXXL), 
      0);
          
          // Update state
          setFormData(prevState => ({
              ...prevState,
              orderDetailArr: newOrderDetailArr,
              quantity: parseInt(newGrandQuantity)
          }));
      }

   
   formData?.orderDetailArr.forEach(item => {
    item.totalQuantity = safeParseInt(item.quantityM) + 
                         safeParseInt(item.quantityL) + 
                         safeParseInt(item.quantityXL) + 
                         safeParseInt(item.quantityXXL);
  });
  // charge based on weight 
  const chargeForInSideZeroToP5=70;
  const chargeForInSidep5To1=80;
  const chargeForInSideoneTo2=90;
  const chargeForInSidetwoTo3=115;
  const chargeForOutSideZeroToP5=100;
  const chargeForOutSidep5To1=120;
  const chargeForOutSideoneTo2=150;
  const chargeForOutSidetwoTo3=175;
  const weightPerShirt=0.18;
  const extraInSideDhakaChange=15
  const extraOutSideDhakaChange=25
  let grandQuantity=formData?.quantity

  let deliveryFee = 0; // Initialize fees as 0

  // Check if grandQuantity is defined and greater than 0
  if (grandQuantity && grandQuantity > 0) {
    deliveryFee = deliveryCharge({
      grandQuantity: grandQuantity,
      weightPerShirt: weightPerShirt,
      chargeForInSideZeroToP5: chargeForInSideZeroToP5,
      chargeForInSidep5To1: chargeForInSidep5To1,
      chargeForInSideoneTo2: chargeForInSideoneTo2,
      chargeForInSidetwoTo3: chargeForInSidetwoTo3,
      chargeForOutSideZeroToP5: chargeForOutSideZeroToP5,
      chargeForOutSidep5To1: chargeForOutSidep5To1,
      chargeForOutSideoneTo2: chargeForOutSideoneTo2,
      chargeForOutSidetwoTo3: chargeForOutSidetwoTo3,
      extraInSideDhakaChange: extraInSideDhakaChange,
      extraOutSideDhakaChange: extraOutSideDhakaChange,
      deliveryAreas: deliveryAreas
    }).deliveryFee;
  }
  
  console.log("updated deliveryFee", deliveryFee);
//   (getSpecificOrderById?.category==="blankRoundNeck"|| getSpecificOrderById?.category==="Blank Round Neck"|| getSpecificOrderById?.category==="Blank Drop Sholder"|| getSpecificOrderById?.category==="Blank Hoodie")
  
  let perCategoryCost=0
  let printbazcost=0;
  let printbazcostbase;
  for  (var i = 0; i < formData?.orderDetailArr?.length; i++) {
    if (formData?.quantity && formData?.orderDetailArr[i]?.totalQuantity ) {
        // perCategoryCost=formData?.orderDetailArr[i]?.totalQuantity  * 220
        if(formData?.category==="blankRoundNeck" || formData?.category==="Blank Round Neck"){
            perCategoryCost=formData?.orderDetailArr[i]?.totalQuantity  * 220
        }
       else  if(formData?.category==="Blank Drop Sholder"|| formData?.category==="blankDropsholder"){
            perCategoryCost=formData?.orderDetailArr[i]?.totalQuantity  * 265
        }
        else if(formData?.category==="Blank Hoodie"|| formData?.category==="blankHoodie"){
            perCategoryCost=formData?.orderDetailArr[i]?.totalQuantity  * 400
        }
        console.log("perCategoryCost",perCategoryCost);
        printbazcost +=perCategoryCost
      }
   

    }
    if(formData.dsicount
        ){
        printbazcost=printbazcost-Number(formData?.dsicount)
      }
      
      if(formData.additionalCost){
        printbazcost=printbazcost+Number(formData?.additionalCost)
      }
     

    console.log("printbazCost",printbazcost);
  
  /////////////////////////////////////     prev delivery fee calculaton    //////////////////////////////
    let recvMoney = 0;
    let costHandlingfee;
    let recvMoneyWithouthandling = 0;
    recvMoneyWithouthandling = Number(
      Math.ceil(formData.collectAmount - (printbazcost + deliveryFee))
    );
    // costHandlingfee = recvMoneyWithouthandling * 0.03;
    costHandlingfee = Number(formData.collectAmount * 0.03);
    recvMoney = recvMoneyWithouthandling - costHandlingfee;
   
    let suggestedCollectAmount = Math.ceil((1 + printbazcost + deliveryFee) / 0.97);
    // console.log("recvMoney",recvMoney)
    // console.log("suggestedCollectAmount",suggestedCollectAmount)
    const validateForm = () => {
      if (recvMoney < 0) {
        setFormValid(true);
        setRecvAmount("Received money cannot be less than 0.");
        return true;
      } else {
        setFormValid(false);
        return false;
      }
    };
        const handleDeleteItem = (indexToDelete) => {
         
          setDeletepopUp(true);
          // console.log("click Delete button ", indexToDelete);
        
          if (deletepopUp) {
            let remainingOrders
            // Uncomment and use this code to update the remainingOrders array
           
               remainingOrders = getSpecificOrderById?.orderDetailArr.filter((_, index) => index !== indexToDelete);
              setGetSpecificOrderById(prevState => ({
                ...prevState,
                orderDetailArr: remainingOrders
              }));
              // setFormData(remainingOrders)
           
        
            setFormData({
              name: getSpecificOrderById?.name,
              phone: getSpecificOrderById?.phone,
              address: getSpecificOrderById?.address,
              instruction: getSpecificOrderById?.instruction,
              collectAmount: getSpecificOrderById?.collectAmount,
              area: getSpecificOrderById?.area,
              orderDetailArr:  remainingOrders?.map(order => {
              
                 return order
                 }),
                 
            
            })
    
            setDeletepopUp(false); // Close the modal here if needed
          }
        };
   
          const handleUpdate = async (e) => {
            e.preventDefault();
            console.log("call function")
            setIsLoading(true)
              // Validate the form here
              if (validateForm()) {
                setIsLoading(false);
                return; 
              }
              
            
            try {
              const formData2 = new FormData();
              const orderDetailArr = formData.orderDetailArr || [];
              const filesAndImagesArr = [];
          
              orderDetailArr?.forEach((item, index) => {
                const fileAndImageData = {};
                // console.log("item.brandLogo",item.brandLogo);
                if (item.file) {
                  item.file.forEach((file, fileIndex) => {
                    formData2.append(`file${index}_${fileIndex}`, file); // Append each file
                  });
                }
                
                if (item.image) {
                  item.image.forEach((image, imageIndex) => {
                    formData2.append(`image${index}_${imageIndex}`, image); // Append each image
                  });
                }   
                //  if (item.brandLogo) {
                //   item.brandLogo.forEach((brandLogo, brandLogoIndex) => {
                //     formData2.append(`brandLogo${index}_${brandLogoIndex}`, brandLogo); // Append each image
                //   });
                // }
               
                // Append brandLogo
                if (item.brandLogo ) {
                  // console.log("item.brandLogo",item.brandLogo);
                  formData2.append(`brandLogo${index}`, item.brandLogo);
              }
          
               
                  // Append brandLogo
          
          //   if (item.brandLogo) {
          //     formData2.append(`brandLogo${index}`, item.brandLogo);
          // }
            if (Object.keys(fileAndImageData).length) {
                  filesAndImagesArr.push(fileAndImageData);
                }
          
                formData2.append(`color${index}`, item.color);
                formData2.append(`teshirtSize${index}`, item.teshirtSize);
                // Handle different sizes for quantity
            formData2.append(`quantityM${index}`, item.quantityM);
            formData2.append(`quantityL${index}`, item.quantityL);
            formData2.append(`quantityXL${index}`, item.quantityXL);
            formData2.append(`quantityXXL${index}`, item.quantityXXL);
            
                formData2.append(`printSize${index}`, item.printSize);
                formData2.append(`printSide${index}`, item.printSide);
            
          
          
                return item;
              });
          
              formData2.append('filesAndImages', JSON.stringify(filesAndImagesArr)); // Append the filesAndImagesArr as a JSON string
          
              // Append the remaining form data
              formData2.append('orderDetailArr', JSON.stringify(orderDetailArr));
              formData2.append('name', formData.name);
              formData2.append('phone', formData.phone);
              formData2.append('address', formData.address);
              formData2.append('instruction', formData.instruction);
              formData2.append('districts', formData.districts);
              formData2.append('zones', formData.zones);
              formData2.append('areas', formData.areas);
              formData2.append('collectAmount', formData.collectAmount);
              formData2.append('quantity', formData.quantity);
              formData2.append('printbazcost', printbazcost);
              formData2.append('deliveryFee', deliveryFee);
              formData2.append('recvMoney', Math.floor(recvMoney));
              // formData2.append('id',orderId);
              formData2.append('userMail', getSpecificOrderById?.userMail);
              formData2.append('dsicount', formData?.dsicount);
              formData2.append('additionalCost', formData?.additionalCost);
              formData2.append('discountNote', formData?.discountNote)
              formData2.append('additionalCostNote', formData?.additionalCostNote)
       // formData2.append('orderDetailArr', JSON.stringify(formData.orderDetailArr));  // Use the updated orderDetailArr
              const response = await fetch(`https://mserver.printbaz.com/updateorder/${getSpecificOrderById?._id}`, {
                // const response = await fetch(`http://localhost:5000/updateorder/${getSpecificOrderById?._id}`, {
                  method: "PUT",
                  body: formData2,
                });
            
                if (response.ok) {
                  const result = await response.json();
                  // console.log("Success:", result);
                  // console.log('API response:', response);
              
               // Fetch the updated order details
    const orderResponse = await fetch(`https://mserver.printbaz.com/getorder/${getSpecificOrderById?._id}`);
    // const orderResponse = await fetch(`http://localhost:5000/getorder/${getSpecificOrderById?._id}`);
    if (orderResponse.ok) {
     await orderResponse.json();
      // console.log('Updated order:', updatedOrder);
    } 
    else {
      throw new Error('Order fetch error: ' + orderResponse.status);
    }
  
                  setShowAlert(true);
                } else {
                  throw new Error('API error: ' + response.status);
                }
              } catch (error) {
                console.error('API error:', error.message);
              }
              finally {
                setIsLoading(false); // Set loading status to false
              }
          };
         
          const handleDeletePopUp=(e,index)=>{
            // e.stopPropagation();
          e.preventDefault()
            setDeletepopUp(true)
            setIndexNumber(index)
            // setDeleteId(id)
          }
          const handleDeleteModalClose=()=>{
            setDeletepopUp(false)
          }
          const numObjects = formData?.orderDetailArr.length;

          // Define default values for xs and md
          let xs ;
          let md ;
        
          // Adjust xs and md values based on the number of objects
          if (numObjects === 1) {
            xs = 12; // If there's only one object, make it full width on xs
            md = 6;  // On md, it can take half the width
          } else if (numObjects === 2) {
            xs = 6;  // Two objects can take half the width on xs
            md = 6;  // On md, it can take half the width
          } else if (numObjects === 3) {
            xs = 6;  // Three objects can take half the width on xs
            md = 4;  // On md, it can take one-third of the width
          }
          
  return (
    <>
       <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>New Order</title>
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            />
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n    /* General styles */\nbody {\n  font-family: 'Arial', sans-serif;\n  background-color: #f8f9fa;\n  margin: 0;\n  padding: 0;\n}\n\nh1, h3 {\n  font-weight: bold;\n}\n\n.row {\n  margin: 0 auto;\n}\n\n.navbar {\n  background-color: #001846 !important;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  padding: 20px;\n  padding-left: 40px !important;\n}\n\n{\n  -moz-appearance: textfield;\n}\n\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n}\n\n/* Buttons */\nbutton {\n  margin-right: 10px;\n}\n\n.add-field {\n  margin-left: 5px;\n}\n\n/* Terms and conditions */\np {\n  text-align: justify;\n  line-height: 1.5;\n  margin-left: 15px;\n  margin-right: 15px;\n}\n\n  ",
              }}
            />
      <div className="alert-overlay" onClick={onClose} />
      <div className="alert-box-updateOrder">
        {/* <img src='/images/checked.png' alt='alert message'/> */}
     
              <Form onSubmit={handleUpdate}  className="mb-4">



<Row  className="g-2 m45 m_1responsive700">

{formData.orderDetailArr.map((item, index) => (
//    (item?.printSide || formData?.category==="blankRoundNeck")  &&
  <Col xs={xs} md={md}>
   <Card >
       <Card.Title className='m-auto p-3' style={{backgroundColor:"#001846",color:"white",width:"100%",textAlign:"center"}}>{item.color}
           <input data-color={item.color} name="color" type="hidden" value={item.color} />
       </Card.Title>
   
       <ListGroup className="list-group-flush pl-0 pr-0">
           <ListGroup.Item className="d-flex align-items-center  ">
               <span value="m">M</span>
               <input 
                   data-size="m"
                   data-color={item.color}
                   name="quantityM"
                   type="number"
                   value={item.quantityM}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
           </ListGroup.Item>
           <ListGroup.Item className="d-flex align-items-center">
               <span value="L">L</span>
               <input 
                   data-size="L"
                   data-color={item.color}
                   name="quantityL"
                   type="number"
                   value={item.quantityL}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
           </ListGroup.Item> 
            <ListGroup.Item className="d-flex align-items-center">
               <span value="XL">XL</span>
               <input 
                   data-size="XL"
                   data-color={item.color}
                   name="quantityXL"
                   type="number"
                   value={item.quantityXL}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
           </ListGroup.Item>
           <ListGroup.Item className="d-flex align-items-center">
               <span value="XXL">XXL</span>
               <input 
                   data-size="XXL"
                   data-color={item.color}
                   name="quantityXXL"
                   type="number"
                   value={item.quantityXXL}
                   style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                   onChange={(e) => handleInputChange(e, index)}
               />
           </ListGroup.Item>  
       </ListGroup>
    
   </Card>
   </Col>
))}


</Row>
<div className='row m45 m_12responsive700'>
<div className="col-md-12">
                    <h3>Recipient Details</h3>
      <Row xs={12} md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Recipient's Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        className="form-control"
                        id="recipientName"
                        onChange={(e) =>  handleInputChange(e)}
                        required
                        placeholder="Enter Name"
                      />
                    </Form.Group>
      
                    <Form.Group className="mb-3">
                      <Form.Label>Recipient's Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        pattern="[0-9]{11}"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) =>  handleInputChange(e)}
                        className="form-control"
                        id="recipientPhone"
                        required
                        placeholder="Enter recipient number"
                      />
                    </Form.Group>
                    </Row>
                   <Row xs={12} md={3} >
                   <Form.Group
                      className="mb-3 Print Side w-100"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">District</Form.Label>
                      <Form.Control
                        as="select"
                        name="districts"
                        value={formData.districts}
                        onChange={(e) =>  handleInputChange(e)}
                        required
                      >
                       
        <option value="">Select District</option>
        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                      </Form.Control>
                    </Form.Group>
           <Form.Group
                      className="mb-3 Print Side w-100"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Zone</Form.Label>
                      <Form.Control
                        as="select"
                        name="zones"
                        value={formData.zones}
                        onChange={(e) =>  handleInputChange(e)}
                        required
                      >
                       
        <option value="">Select Zone</option>
        {zones.map(d => <option key={d} value={d}>{d}</option>)}
                      </Form.Control>
                    </Form.Group>
<Form.Group
                      className="mb-3 Print Side w-100"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Area</Form.Label>
                      <Form.Control
                        as="select"
                        name="areas"
                        value={formData.areas}
                        onChange={(e) =>  handleInputChange(e)}
                        required
                      >
                       
        <option value="">Select Area</option>
        {areas.map(d => <option key={d} value={d}>{d}</option>)}
                      </Form.Control>
                    </Form.Group>


                   </Row>
                 

                    <Form.Group className="mb-3 ">
                      <Form.Label>Recipient's/Delivery Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={(e) =>  handleInputChange(e)}
                        className="form-control"
                        id="recipientAddress"
                        required
                        placeholder="Enter recipient address"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label> Special Instructions</Form.Label>
                      {["bottom"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              Any specific request for
                              production, branding or delivery
                            </Tooltip>
                          }
                        >
                          <span variant="secondary" className="info_icon">
                            <img
                              style={{
                                marginLeft: "5px",
                                width: "15px",
                                height: "15px",
                              }}
                              src="/images/info.png"
                              alt="info"
                            />
                          </span>
                        </OverlayTrigger>
                      ))}
                      <Form.Control
                        as="textarea"
                        type="text"
                        name="instruction"
                        value={formData.instruction}
                        onChange={(e) =>  handleInputChange(e)}
                        className="form-control"
                        id="recipientAddress"
                        style={{ height: "150px" }}
                        placeholder=""
                      />
                    </Form.Group>
                  </div> 
                  {/* <hr /> */}
                  <div className="col-md-12 d-flex flex-column align-items-center ">            
<div style={{ width: '100%' }}>
                    <h3>Cost Of Order</h3>
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Total Quantity</label>
      
                      <h3>
                        {" "}
                        {/* <span style={{ fontSize: "" }}>&#2547;</span> {addbrandLogo ?parseInt(printbazcost+5):printbazcost} */}
                        <span style={{ fontSize: "" }}>{formData?.quantity}</span> 
                      </h3>
                    </div> 
                    <hr />
                    <div className="costOrder_Style">
                    <Form.Label>Printbaz Cost</Form.Label>
                       <Form.Group className="mb-3 ">
                     <Form.Control
                        type="number"
                        name="printbazcost"
                        value={printbazcost}
                        className="form-control"
                        onChange={(e) => {
                           handleInputChange(e);
                        }}
                        required
                        placeholder=""
                      />
                      
                    </Form.Group>
                    </div>
                    <hr />
                    <div className="costOrder_Style">
                    <Form.Label>Discount</Form.Label>
                       <Form.Group className="mb-3 ">
                     
                   
                      <Form.Control
                        type="number"
                       
                        name="dsicount"
                        value={formData?.dsicount}
                        className="form-control"
                        onChange={(e) => {
                           handleInputChange(e);;
                        }}
                        
                        placeholder=""
                      />
                    </Form.Group>
                    </div>
                    <hr />
                    <div className="costOrder_Style">
                    <Form.Label>Discount Note</Form.Label>
                       <Form.Group className="mb-3 ">
                     
                   
                      <Form.Control
                      as="textarea"
                        type="number"
                        style={{width:"220px"}}
                        name="discountNote"
                        value={formData?.discountNote}
                        className="form-control"
                        onChange={(e) => {
                           handleInputChange(e);;
                        }}
                        
                        placeholder=""
                      />
                    </Form.Group>
                    </div>
                    <hr />
                    <div className="costOrder_Style">
                    <Form.Label>Additional Cost</Form.Label>
                       <Form.Group className="mb-3 ">
                      <Form.Control
                        type="number"
                        name="additionalCost"
                        value={formData.additionalCost}
                        className="form-control"
                        onChange={(e) => {
                           handleInputChange(e);;
                        }}
                        
                        placeholder=""
                      />
                    </Form.Group>
                    </div>
                    <hr />
                    <div className="costOrder_Style">
                    <Form.Label>Additional Cost note</Form.Label>
                       <Form.Group className="mb-3 ">
                     
                   
                      <Form.Control
                      as="textarea"
                        type="number"
                        name="additionalCostNote"
                        style={{width:"220px"}}
                        value={formData.additionalCostNote}
                        className="form-control"
                        onChange={(e) => {
                           handleInputChange(e);;
                        }}
                        
                        placeholder=""
                      />
                    </Form.Group>
                    </div>
      <hr />
                    <div className="costOrder_Style">
                     

                      <Form.Label>Delivery Fee</Form.Label>
                       <Form.Group className="mb-3 ">
                     
                   
                      <Form.Control
                        type="number"
                        name="deliveryFee"
                        value={deliveryFee?deliveryFee:formData?.deliveryFee}
                        className="form-control"
                        onChange={(e) => {
                           handleInputChange(e);;
                        }}
                        required
                        placeholder=""
                      />
                    </Form.Group>
                    </div>
                    <hr />
                    <div>

                    <Row  className="costOrder_Style">
                      <Col xs={12} md={6}>
                    <Form.Group className="mb-3 ">
                      <Form.Label>Amount to Collect</Form.Label>
                      {["bottom"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                             Amount of money you want the
                              receiver will pay; Must include delivery fee
                            </Tooltip>
                          }
                        >
                          <span variant="secondary" className="info_icon">
                            <img
                              style={{
                                marginLeft: "5px",
                                width: "15px",
                                height: "15px",
                              }}
                              src="/images/info.png"
                              alt="info"
                            />
                          </span>
                        </OverlayTrigger>
                      ))}
                    
                      <Form.Control
                        type="number"
                        name="collectAmount"
                        value={formData.collectAmount}
                        className="form-control"
                        onChange={(e) => {
                           handleInputChange(e);;
                        }}
                        required
                        placeholder=""
                      />
                    </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                           <Form.Group className="mb-3 ">
                           <Form.Label>Minimum Amount to Collect</Form.Label>
                          
                           <Form.Control
                             type="number"
                             name="collectAmount"
                             value={ printbazcost && (  {deliveryFee}) && suggestedCollectAmount ?suggestedCollectAmount : '' }
                             readOnly
                           />
                         </Form.Group>
                         </Col>
                    
                   
                     
                      </Row>
                    </div>
                    
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Cash Handling fee</label>{" "}
                      <h3> 3%</h3>
                    </div>
      
                    {/* {formData?.quantity && formData?.orderDetailArr[0]?.printSize && formData?.collectAmount && ( */}
                      <div >
                        <div className="costOrder_Style">
                        <label htmlFor="printbazCost">You will receive</label>
                        <h3> {(recvMoney ||formData?.recvMoney)>0 && Math.floor(recvMoney?recvMoney: formData?.recvMoney)}</h3>
                        </div>
                       
                      
                        { formValid===true &&
    <p style={{color:"red",textAlign:"right"}}>{recvAmount}</p>
  }
                       
             
                  {/* <Button  className='ordercancel_btn' type="submit">
        Cancel
      </Button> */}
                      </div>
                    {/* )} */}
                  </div>
                  <Button  className='orderSubmit_btn' type="submit">
        Submit
      </Button>

      {/* <Button
                      type="reset"
                      style={{ backgroundColor: "gray", marginLeft: "10px" }}
                    >
                      Cancel
                    </Button> */}
                    {
  isLoading===true &&(
    <>
     <div className="alert-overlay"  />
       <div className="alert-box" >
     
         <Spinner  style={{padding:"20px"}} animation="grow" variant="warning" />
         
         <h2>Please wait!</h2>
       </div>
    </>
  )
  
} 
                  </div>
</div>


</Form> 
              {
                    setIndexNumber && (
                      <DeleteRoleAlert isOpen={ deletepopUp} deleteId={indexNumber} onClose={handleDeleteModalClose} onConfirm={()=>handleDeleteItem(indexNumber)} />
                    )
                   
                  }
          
      </div>

      {showAlert===true && (
          
          <OrderUpdateAlert
          message="Your order has been updated successfully."
          onClose={() => setShowAlert(false)}
       
          
          
          />
          
          
          )
          
          
          }
  
    </>
  );
};

UpdateOrderBlankProduct.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UpdateOrderBlankProduct;
