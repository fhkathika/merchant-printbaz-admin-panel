

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "../../css/style.css"
import { Button, Form, OverlayTrigger, ProgressBar, Spinner, Tooltip } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetData } from '../../hooks/useGetData';
import teeShirtFormula from '../../Formulas/teeShirtFormula';

const UpdateOrder = ({ onClose,viewOrder,viewClient }) => {
    console.log("viewOrder",viewOrder?._id);

   const ordersArray = viewOrder?.orderDetailArr?.map(order => {
    console.log("order", order);
    return order;
});

console.log(ordersArray);
let  individualOrder
if(ordersArray){
    for(let i=0;i<ordersArray.length;i++){
 individualOrder=ordersArray[i]
    }
}
const filesArr=individualOrder?.file?.map(singleFile=>{
    console.log("singleFile",singleFile);
    return singleFile
})
console.log("filesArr",filesArr);
let individualFile;
if(filesArr){
    for(let i=0;i<filesArr.length;i++){
        individualFile=filesArr[i]
    }
}
   const [formData, setFormData] = useState({
        name: viewOrder?.name,
        phone: viewOrder?.phone,
        address: viewOrder?.address,
        instruction: viewOrder?.instruction,
        collectAmount: viewOrder?.collectAmount,
        area: viewOrder?.area,
        orderDetailArr: [
          {
            color: individualOrder?.color,
            teshirtSize: individualOrder?.teshirtSize,
            quantity: individualOrder?.quantity,
            printSide:individualOrder?.printSide,
            printSize: individualOrder?.printSize,
            printSizeBack:individualOrder?.printSizeBack,
            file: null,
            image: null,
            brandLogo: individualOrder?.brandLogo,
          },
        ],
      });
        let id = "resellerOrdersId";
       let collections = "resellerInfo";
       let idPrice = "teeShirtCampingId";
       let collectionsPrice = "productValues";
       const [fileprogress, setFileProgress] = useState(0);
       const [imageprogress, setImageProgress] = useState(0);
       const [showAlert, setShowAlert] = useState(false);
       const [loading, setLoading] = useState(false);
       const [dbData, setDbData] = useState({});
       const [printSide, setPrintSide] = useState('');
       const [addbrandLogo, setAddBrandLogo] = useState('');
       const [file, setFile] = useState();
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
    
    
      const d = new Date();
        const options = { month: "long", day: "numeric", year: "numeric" };
        const formattedDate = d.toLocaleDateString("en-US", options);
      
        const price1to9_10x14 = fetchedData?.printSize10x14?.price1to9_10x14;
        const price10to19_10x14 = fetchedData?.printSize10x14?.price10to19_10x14;
        const price20to29_10x14 = fetchedData?.printSize10x14?.price20to29_10x14;
        const price30to40_10x14 = fetchedData?.printSize10x14?.price30to40_10x14;
        const price41to49_10x14 = fetchedData?.printSize10x14?.price41to49_10x14;
        const price50Plus_10x14 = fetchedData?.printSize10x14?.price50Plus_10x14;
        const price1to9_10x10 = fetchedData?.printSize_10x10?.price1to9_10x10;
        const price10to19_10x10 = fetchedData?.printSize_10x10?.price10to19_10x10;
        const price20to29_10x10 = fetchedData?.printSize_10x10?.price20to29_10x10;
        const price30to40_10x10 = fetchedData?.printSize_10x10?.price30to40_10x10;
        const price41to49_10x10 = fetchedData?.printSize_10x10?.price41to49_10x10;
        const price50Plus_10x10 = fetchedData?.printSize_10x10?.price50Plus_10x10;
        const price1to9_10x5 = fetchedData?.printSize_10x5?.price1to9_10x5;
        const price10to19_10x5 = fetchedData?.printSize_10x5?.price10to19_10x5;
        const price20to29_10x5 = fetchedData?.printSize_10x5?.price20to29_10x5;
        const price30to40_10x5 = fetchedData?.printSize_10x5?.price30to40_10x5;
        const price41to49_10x5 = fetchedData?.printSize_10x5?.price41to49_10x5;
        const price50Plus_10x5 = fetchedData?.printSize_10x5?.price50Plus_10x5;
      
        const price1to9_5X5 = fetchedData?.printSize_5x5?.price1to9_5X5;
        const price10to19_5X5 = fetchedData?.printSize_5x5?.price10to19_5X5;
        const price20to29_5X5 = fetchedData?.printSize_5x5?.price20to29_5X5;
        const price30to40_5X5 = fetchedData?.printSize_5x5?.price30to40_5X5;
        const price41to49_5X5 = fetchedData?.printSize_5x5?.price41to49_5X5;
        const price50Plus_5X5 = fetchedData?.printSize_5x5?.price50Plus_5X5;
      
        const price1to9_2p5X5 = fetchedData?.printSize2p5X5?.price1to9_2p5X5;
        const price10to19_2p5X5 = fetchedData?.printSize2p5X5?.price10to19_2p5X5;
        const price20to29_2p5X5 = fetchedData?.printSize2p5X5?.price20to29_2p5X5;
        const price30to40_2p5X5 = fetchedData?.printSize2p5X5?.price30to40_2p5X5;
        const price41to49_2p5X5 = fetchedData?.printSize2p5X5?.price41to49_2p5X5;
        const price50Plus_2p5X5 = fetchedData?.printSize2p5X5?.price50Plus_2p5X5;
      
        const navigate=useNavigate()
        const location=useLocation()
        const [inputs, setInputs] = useState([{ value: '' }]);
    
    
      const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        if (name==="color" || name==="teshirtSize" || name==="quantity" || name==="printSize"|| name==="printSide" || name==="printSizeBack") {
          console.log(value)
          // const fieldName = name.split('.')[1];
          const newOrderDetailArr = [...formData.orderDetailArr];
          newOrderDetailArr[index][event.target.name]=event.target.value;
          setFormData({ ...formData, orderDetailArr: newOrderDetailArr });
       
          }
       else {
            setFormData({ ...formData, [name]: value });
            // setSum(formData.reduce((total, input) => total + Number(input.value), 0));
            console.log('order address',formData);
          }
        } 
       
      const handleFileChange = (event, index) => {
        const { name, files } = event.target;
        if (name==="file" || name==="image") {
          // const fieldName = name.split('.')[1];
          const newOrderDetailArr = [...formData.orderDetailArr];
           // Change from a single file to an array of files
          newOrderDetailArr[index][[event.target.name]] =Array.from(files);
          setFormData({ ...formData, orderDetailArr: newOrderDetailArr });
          console.log('Updated Order State:', formData);
          setFile(files)
          console.log('File:', files); // Log the file object
        }
      };

    let updatedPrintbazcost=0
      let printbazcost=0;
      let printbazcostbase;
      for  (var i = 0; i < formData?.orderDetailArr?.length; i++) {
        if (
          formData?.orderDetailArr[i]?.quantity &&
          formData?.orderDetailArr[i]?.printSize &&
          price1to9_10x14 &&
          price10to19_10x14 &&
          price20to29_10x14 &&
          price30to40_10x14 &&
          price41to49_10x14 &&
          price50Plus_10x14 &&
          price1to9_10x10 &&
          price10to19_10x10 &&
          price20to29_10x10 &&
          price30to40_10x10 &&
          price41to49_10x10 &&
          price50Plus_10x10 &&
          price1to9_10x5 &&
          price10to19_10x5 &&
          price20to29_10x5 &&
          price30to40_10x5 &&
          price41to49_10x5 &&
          price50Plus_10x5 &&
          price1to9_5X5 &&
          price10to19_5X5 &&
          price20to29_5X5 &&
          price30to40_5X5 &&
          price41to49_5X5 &&
          price50Plus_5X5 &&
          price1to9_2p5X5 &&
          price10to19_2p5X5 &&
          price20to29_2p5X5 &&
          price30to40_2p5X5 &&
          price41to49_2p5X5 &&
          price50Plus_2p5X5
        ) 
        {
          const totalPrice = teeShirtFormula(
            formData?.orderDetailArr[i]?.quantity,
            formData?.orderDetailArr[i]?.printSize,
            price1to9_10x14,
            price10to19_10x14,
            price20to29_10x14,
            price30to40_10x14,
            price41to49_10x14,
            price50Plus_10x14,
            price1to9_10x10,
            price10to19_10x10,
            price20to29_10x10,
            price30to40_10x10,
            price41to49_10x10,
            price50Plus_10x10,
            price1to9_10x5,
            price10to19_10x5,
            price20to29_10x5,
            price30to40_10x5,
            price41to49_10x5,
            price50Plus_10x5,
            price1to9_5X5,
            price10to19_5X5,
            price20to29_5X5,
            price30to40_5X5,
            price41to49_5X5,
            price50Plus_5X5,
            price1to9_2p5X5,
            price10to19_2p5X5,
            price20to29_2p5X5,
            price30to40_2p5X5,
            price41to49_2p5X5,
            price50Plus_2p5X5
          ).totalPrice;
          let backSidePrintCost=0
          if(formData?.orderDetailArr[i]?.printSizeBack==="10 x 14"){
            backSidePrintCost= formData?.orderDetailArr[i]?.quantity * 130
          }
          else if(formData?.orderDetailArr[i]?.printSizeBack==="10 x 10"){
            backSidePrintCost= formData?.orderDetailArr[i]?.quantity * 100
          } else if(formData?.orderDetailArr[i]?.printSizeBack==="10 x 5"){
            backSidePrintCost= formData?.orderDetailArr[i]?.quantity * 50
          } else if(formData?.orderDetailArr[i]?.printSizeBack==="5 X 5"){
            backSidePrintCost= formData?.orderDetailArr[i]?.quantity * 30
          }
          else if(formData?.orderDetailArr[i]?.printSizeBack==="2.5 X 5"){
            backSidePrintCost= formData?.orderDetailArr[i]?.quantity * 15
          }
          console.log("formData?.orderDetailArr[i]?.printSizeBack",(formData?.orderDetailArr[i]?.quantity * 80));
    
      printbazcostbase = Number(totalPrice)+backSidePrintCost;
      printbazcost += printbazcostbase;
      console.log("printbazcost",Number(printbazcost),"+",printbazcostbase)
    
          
                
       
        } else {
          if(printbazcostbase){
            printbazcost= printbazcostbase;
          }
          else{
            printbazcost=0;
          }
          // or any default value you want to set
        }
      }
        let deliveryFeeInsideDhaka = 0;
        const baseDeliveryFee = 70;
        const additionalDeliveryFee = 15;
        let QuantityBase=0
        let totalQuantity=0;
    
        let deliveryFeeOutSideDhaka = 0;
        const baseDeliveryFeeOutSideDhaka = 100;
        const additionalDeliveryFeeOutSideDhaka = 25;
        for  (var j = 0; j < formData?.orderDetailArr?.length; j++) {
          QuantityBase=Number( formData?.orderDetailArr[j]?.quantity)
          totalQuantity =Number(QuantityBase+totalQuantity)
         console.log("testQuantity",totalQuantity);
       
        if (formData?.orderDetailArr[j]?.quantity > 0) {
          // Calculate the number of groups of 5 items in the order
          const groups = Math.floor(totalQuantity/ 5);
      
          // Calculate the remainder
          const remainder = totalQuantity % 5;
      
          // Calculate the delivery fee
          if (groups === 0) {
            deliveryFeeInsideDhaka = baseDeliveryFee;
          } else if (remainder === 0) {
            deliveryFeeInsideDhaka =
              baseDeliveryFee + (groups - 1) * additionalDeliveryFee;
          } else {
            deliveryFeeInsideDhaka = baseDeliveryFee + groups * additionalDeliveryFee;
          }
        }
      
      // outside dhaka
      
        if (formData?.orderDetailArr[j]?.quantity > 0) {
          // Calculate the number of groups of 5 items in the order
          const groups = Math.floor(totalQuantity / 5);
      
          // Calculate the remainder
          const remainder = totalQuantity % 5;
      
          // Calculate the delivery fee
          if (groups === 0) {
            deliveryFeeOutSideDhaka = baseDeliveryFeeOutSideDhaka;
          } else if (remainder === 0) {
            deliveryFeeOutSideDhaka =
              baseDeliveryFeeOutSideDhaka +
              (groups - 1) * additionalDeliveryFeeOutSideDhaka;
          } else {
            deliveryFeeOutSideDhaka =
              baseDeliveryFeeOutSideDhaka +
              groups * additionalDeliveryFeeOutSideDhaka;
          }
        }
        }
        let deliveryFee;
        if (formData.area === "outside dhaka") {
          deliveryFee = deliveryFeeOutSideDhaka;
        } else {
          deliveryFee = deliveryFeeInsideDhaka;
        }
      
        let recvMoney = 0;
        let costHandlingfee;
        let recvMoneyWithouthandling = 0;
        recvMoneyWithouthandling = Number(
          Math.ceil(formData.collectAmount - (printbazcost + deliveryFee))
        );
        // costHandlingfee = recvMoneyWithouthandling * 0.02;
        costHandlingfee = Number(formData.collectAmount * 0.02);
        recvMoney = recvMoneyWithouthandling - costHandlingfee;
        console.log("recvMoney",recvMoney)
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
        
       
        const handleUpdate = async (e) => {
            e.preventDefault()
            try {
              const formData2 = new FormData();
              const orderDetailArr = formData.orderDetailArr || [];
              const filesAndImagesArr = [];
          
              orderDetailArr?.forEach((item, index) => {
                const fileAndImageData = {};
          
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
          
                // Append brandLogo
                if (item.brandLogo) {
                  formData2.append(`brandLogo${index}`, item.brandLogo);
                }
          
                if (Object.keys(fileAndImageData).length) {
                  filesAndImagesArr.push(fileAndImageData);
                }
          
                formData2.append(`color${index}`, item.color);
                formData2.append(`teshirtSize${index}`, item.teshirtSize);
                formData2.append(`quantity${index}`, item.quantity);
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
              formData2.append('area', formData.area);
              formData2.append('collectAmount', formData.collectAmount);
              formData2.append('printbazcost', printbazcost);
              formData2.append('deliveryFee', deliveryFee);
              formData2.append('recvMoney', recvMoney);
              formData2.append('userMail', viewClient?.email);
          
            //   const response = await fetch(`https://mserver.printbaz.com/updateorder/${viewOrder?._id}`, {
              const response = await fetch(`http://localhost:5000/updateorder/${viewOrder?._id}`, {
                method: "PUT",
                body: formData2,
              });
          
              if (response.ok) {
                const result = await response.json();
                console.log("Success:", result);
                setShowAlert(true);
              } else {
                throw new Error('API error: ' + response.status);
              }
            } catch (error) {
              console.error('API error:', error.message);
            }
          };
          
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
                <div className="row mt-5">
                  {/* 1st Column */}
                  <div className="col-md-4">
                    <h3>Recipient Details</h3>
      
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
                    <Form.Group
                      className="mb-3 Print Side w-100"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Delivery Area</Form.Label>
                      <Form.Control
                        as="select"
                        name="area"
                        value={formData.area}
                        onChange={(e) =>  handleInputChange(e)}
                        required
                      >
                        <option value="">select area</option>
                        <option value="inside dhaka">Inside Dhaka</option>
                        <option value="outside dhaka">Outside Dhaka</option>
                      </Form.Control>
                    </Form.Group>
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
                  {/* 2nd Column */}
                  <div className="col-md-4">
                    <div className="costOrder_Style">
                    <h3>Order Details</h3>
                  
                    </div>
                 
                    {formData.orderDetailArr.map((item, index) => (
                      <>
                      
                  
                     
                     
                     
                    <Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Color</Form.Label>
                      <Form.Control
                        as="select"
                        name="color"
                        required
                        value={item.color}
                        onChange={(e) =>  handleInputChange(e,index)}
                      >
                        <option value="">select color</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                      </Form.Control>
                    </Form.Group>
      
                    <Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Tee Shirt Size</Form.Label>
                      <Form.Control
                        as="select"
                        value={item.teshirtSize}
                        required
                        onChange={(e) =>  handleInputChange(e,index)}
                        name="teshirtSize"
                      >
                        <option value="">select tee shirt size</option>
                        <option value="m">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </Form.Control>
                    </Form.Group>
      
                    <Form.Group
                      className="mb-3 Quantity w-100 m-auto"
                      controlId="wccalcQuantity"
                    >
                      <Form.Label>Quantity</Form.Label>
      
                      <Form.Control
                        name="quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                           handleInputChange(e,index)
                        }}
                        required
                        placeholder="Enter Quantity"
                        min="1"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Print side</Form.Label>
                      <Form.Control
                        as="select"
                        value={item.printSide}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSide"
                        required
                      >
                       <option value="">select print side</option> 
                        <option value="frontSide">Front Side</option>
                        <option value="backSide">Back Side</option>
                        <option value="bothSide">Both Side</option>
                      </Form.Control>
                    </Form.Group>
                    {
                     ( item.printSide==="frontSide" || item.printSide==="backSide") &&
                      <Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Print Size</Form.Label>
                      <Form.Control
                        as="select"
                        value={item.printSize}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSize"
                        required
                      >
                       <option value="">select print size</option> 
                        <option value="10 x 14">10″ x 14″</option>
                        <option value="10 x 10">10″ x 10″</option>
                        <option value="10 x 5">10″ x 5″</option>
                        <option value="5 X 5">5″ x 5″</option>
                        <option value="2.5 X 5">2.5″ x 5″</option>
                      </Form.Control>
                    </Form.Group>
}
                    {
                      item.printSide==="bothSide" && 
                      <>

<Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Print Size front</Form.Label>
                      <Form.Control
                        as="select"
                        value={item.printSize}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSize"
                        required
                      >
                       <option value="">select print size</option> 
                        <option value="10 x 14">10″ x 14″</option>
                        <option value="10 x 10">10″ x 10″</option>
                        <option value="10 x 5">10″ x 5″</option>
                        <option value="5 X 5">5″ x 5″</option>
                        <option value="2.5 X 5">2.5″ x 5″</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group
                    className="mb-3 Print Side w-100 m-auto"
                    controlId="wccalcPrintSide"
                  >
                    <Form.Label className="pr-2">Print Size back</Form.Label>
                    <Form.Control
                      as="select"
                      value={item.printSizeBack}
                      onChange={(e) => {
                         handleInputChange(e,index);
                      }}
                      name="printSizeBack"
                      required
                    >
                     <option value="">select print size</option> 
                      <option value="10 x 14">10″ x 14″</option>
                      <option value="10 x 10">10″ x 10″</option>
                      <option value="10 x 5">10″ x 5″</option>
                      <option value="5 X 5">5″ x 5″</option>
                      <option value="2.5 X 5">2.5″ x 5″</option>
                    </Form.Control>
                  </Form.Group>
                      </>
                     
                    }
                   
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload Main File</Form.Label>
                      {
                         individualOrder?.file?.map(singleFile=>{
                            const fileId = singleFile.split('/d/')[1].split('/view')[0];
                            const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
                            return (
                                <div style={{position:"relative"}}>
                                {/* <iframe src={file}    style={{
                        position: "absolute",
                       top: 0,
                        left: 0,
                        width: "100%",
                        height: "auto",
                        pointerEvents: "none",
                        border: "none",
                      }} title="uni"></iframe> */}
<Form.Control
                        type="file"
                        name="file"
                       style={{height:"150px",width:"100%"}}
                        onChange={(e) => handleFileChange(e, index)} 
                        required
                        accept=".ai,.eps,.psd,.pdf,.svg,.png"
                        multiple
                      />
                                </div>
                            )
                          }
                          ) }
                      
                  
                      
                      <span style={{color:"gray"}}>upload .ai,.eps,.psd,.pdf,.svg,.png file</span>
                    </Form.Group>
                    {fileprogress === 0 ? null : (
         <ProgressBar now={fileprogress} label={`${fileprogress}%`} />
          )}
         
                    
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload Mockup/T-Shirt Demo Picture</Form.Label>
                      {
                            individualOrder?.image?.map(singleImage=>{
                                const fileId = singleImage.split('/d/')[1].split('/view')[0];
                                const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
                            return(
                                <div style={{position:"relative"}}>
    <iframe src={previewURL}    style={{
                        position: "absolute",
                       top: 0,
                        left: 0,
                        width: "100%",
                        height: "auto",
                        pointerEvents: "none",
                        border: "none",
                      }} title="uni"></iframe>
                           <Form.Control
                        type="file"
                        name="image"
                        style={{opacity:0,height:"150px",width:"100%"}}
                        required
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, index)}
                        multiple
                      />
                                </div>
                            )
                                }
                             ) }
                 
                    </Form.Group>
                    {imageprogress === 0 ? null : (
         <ProgressBar now={imageprogress} label={`${imageprogress}%`} />
          )}

<Form.Group controlId="formBrandLogo" className="mb-3">
  <Form.Label>Upload Your Brand Logo (optional)</Form.Label>
  {  (() => {
      const fileId = individualOrder?.brandLogo.split('/d/')[1].split('/view')[0];
      const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
        
      return (
        <div style={{ position: "relative" }}>
            <iframe src={previewURL}    style={{
              position: "absolute",
             top: 0,
              left: 0,
              width: "100%",
              height: "100px",
              pointerEvents: "none",
              border: "none",
            }} title="uni"></iframe>
            <Form.Control
            style={{opacity:0,width:"100%",height:"100px"}}
    type="file"
    name="brandLogo"
    accept="image/jpeg, image/png"
    onChange={(e) => {
      const orderDetailArrCopy = [...formData.orderDetailArr];
      orderDetailArrCopy[0].brandLogo = e.target.files[0];  // Change 0 with the index of the order detail item being updated
      const hasBrandLogo = e.target.files.length > 0;
      setAddBrandLogo(hasBrandLogo)
   
      setFormData({ ...formData, orderDetailArr: orderDetailArrCopy });
    }}
  />
        </div>
      )
    })()

  }
  
  {/* <iframe src={individualOrder?.brandLogo} height="200" width="300" title="Iframe Example"></iframe> */}
 
  
</Form.Group>

         
                     </>
                     ))}
                  </div>
                  {/* 3rd Column */}
                  <div className="col-md-4">
                    <h3>Cost Of Order</h3>
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Printbaz Cost</label>
      
                      <h3>
                        {" "}
                        <span style={{ fontSize: "" }}>&#2547;</span> {addbrandLogo ?parseInt(printbazcost+5):printbazcost}
                      </h3>
                    </div>
      
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Delivery Fee</label>
      
                      <h3>
                        {" "}
                        <span style={{ fontSize: "" }}>&#2547;</span>{" "}
                        {formData.area === "outside dhaka"
                          ? deliveryFeeOutSideDhaka
                          : deliveryFeeInsideDhaka}
                      </h3>
                    </div>
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
                    <div className="costOrder_Style">
                      <label htmlFor="printbazCost">Cash Handling fee</label>{" "}
                      <h3> 2%</h3>
                    </div>
      
                    {formData?.orderDetailArr[0]?.quantity && formData?.orderDetailArr[0]?.printSize && formData?.collectAmount && (
                      <div >
                        <div className="costOrder_Style">
                        <label htmlFor="printbazCost">You will receive</label>
                        <h3> {parseInt(recvMoney)}</h3>
                        </div>
                       
                      
                        { formValid===true &&
    <p style={{color:"red",textAlign:"right"}}>{recvAmount}</p>
  }
                       
                      </div>
                    )}
                      <div className="row mt-5">
                  <div className="col-12">
                    <Button type="submit" style={{ backgroundColor: "#124" }}>
                      Submit
                    </Button>
      
                    <Button
                      type="reset"
                      style={{ backgroundColor: "gray", marginLeft: "10px" }}
                  
                  onClick={onClose}>
                      Cancel
                    </Button>
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
                  </div>
                </div>
                {/* <div className="row mt-5">1st Column</div> */}
      
              
              </Form>
      </div>
  
    </>
  );
};

UpdateOrder.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UpdateOrder;
