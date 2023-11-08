

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
import useGetTshirtPrice from '../../hooks/useGetTshirtPrice';
import backsideFormula from '../../Formulas/backsideFormula';
import backsiideFormulaDropSholderHoodie from '../../Formulas/backsiideFormulaDropSholderHoodie';

const UpdateOrder = ({ onClose,viewOrder,viewClient,getSpecificOrderById,setGetSpecificOrderById }) => {
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
      // axios.get(`http://localhost:5000/zones?district=${encodeURIComponent(formData?.districts)}`)
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
      
     
  
      //   const handleFileChange = (event, orderIndex, fileIndex) => {
         
      //     const { name, files } = event.target;
         
      //     if (files.length > 0) {
      //         setFormData(prevState => {
      //             const newOrderDetailArr = prevState.orderDetailArr.map((item, index) => {
      //                 if (index === orderIndex) {
      //                     let updatedFilesOrImages;
      //                     if (name === "file") {
      //                         updatedFilesOrImages = [...item.file]; // Create a copy of the file array
      //                         updatedFilesOrImages[fileIndex] = files[0]; // Update the file at the specified index
      //                         return { ...item, file: updatedFilesOrImages }; // Update the file array in the item
      //                     } else if (name === "image") {
      //                         updatedFilesOrImages = [...item.image]; // Create a copy of the image array
      //                         updatedFilesOrImages[fileIndex] = files[0]; // Update the image at the specified index
      //                         return { ...item, image: updatedFilesOrImages }; // Update the image array in the item
      //                     }
      //                 }
      //                 return item;
      //             });
      //             return { ...prevState, orderDetailArr: newOrderDetailArr }; // Update the orderDetailArr in the formData state
      //         });
      //     }
      // };
    
      // const handleFileChange = (event, index) => {
      //   const { name, files } = event.target;
      //   const updatedBrandLogoArray = [...addBrandLogoArray];
      //   if (name==="file" || name==="image" || name==="brandLogo") {
      //     if (name === "brandLogo") {
      //       updatedBrandLogoArray[index] = files && files.length > 0;;
      //       setAddBrandLogoArray(updatedBrandLogoArray);
      //   }
      //     // const fieldName = name.split('.')[1];
      //     const newOrderDetailArr = [...formData.orderDetailArr];
      //      // Change from a single file to an array of files
      //     newOrderDetailArr[index][[event.target.name]] =Array.from(files);
      //     setFormData({ ...formData, orderDetailArr: newOrderDetailArr });
      
      //   }
      // };
      const handleFileChange = (event, index) => {
        const { name, files } = event.target;
        const newOrderDetailArr = [...formData.orderDetailArr];
    
        if (name === "file" || name === "image" || name === "brandLogo") {
            if (name === "brandLogo") {
                const updatedBrandLogoArray = [...addBrandLogoArray];
                updatedBrandLogoArray[index] = files && files.length > 0;
                setAddBrandLogoArray(updatedBrandLogoArray);
    
                newOrderDetailArr[index].brandLogo = files[0]; // Assuming brandLogo is a single file not an array of files
            } else {
                newOrderDetailArr[index][name] = Array.from(files);
            }
        }
    
        setFormData({ ...formData, orderDetailArr: newOrderDetailArr });
    };
    const { tshirtPrice } = useGetTshirtPrice();
    // custom round neck 
   
    const price_10x14CRoundNeck=tshirtPrice[0]?.frontSideprice
    const price_10x10CRoundNeck=tshirtPrice[1]?.frontSideprice
    const price_10x5CRoundNeck=tshirtPrice[2]?.frontSideprice
    const price_5X5CRoundNeck=tshirtPrice[3]?.frontSideprice
    const price_2p5X5CRoundNeck=tshirtPrice[4]?.frontSideprice
    const price_2p5X2p5CRoundNeck=tshirtPrice[5]?.frontSideprice

  
let backSideDtfprice_10x14CustomRoundNeck=tshirtPrice[0]?.backSideprice
let backSideDtfprice_10x10CustomRoundNeck=tshirtPrice[1]?.backSideprice
let backSideDtfprice_10x5CustomRoundNeck=tshirtPrice[2]?.backSideprice
let backSideDtfprice_5X5CustomRoundNeck=tshirtPrice[3]?.backSideprice
let backSideDtfprice_2p5X5CustomRoundNeck=tshirtPrice[4]?.backSideprice
let backSideDtfprice_2p5X2p5CustomRoundNeck=tshirtPrice[5]?.backSideprice
let additionalCost=tshirtPrice[0]?.additionalCost

    // custom drop sholder 
    const price_11p7x16p5CDropSholder=tshirtPrice[6]?.frontSideprice
    const price_10x14CDropSholder=tshirtPrice[7]?.frontSideprice
    const price_10x10CDropSholder=tshirtPrice[8]?.frontSideprice
    const price_10x5CDropSholder=tshirtPrice[9]?.frontSideprice
    const price_5X5CDropSholder=tshirtPrice[10]?.frontSideprice
    const price_2p5X5CDropSholder=tshirtPrice[11]?.frontSideprice
    const price_2p5X2p5CDropSholder=tshirtPrice[12]?.frontSideprice

 


let backSideDtfprice_11p7x16p5CustomDropSholder=tshirtPrice[6]?.backSideprice
let backSideDtfprice_10x14CustomDropSholder=tshirtPrice[7]?.backSideprice
let backSideDtfprice_10x10CustomDropSholder=tshirtPrice[8]?.backSideprice
let backSideDtfprice_10x5CustomDropSholder=tshirtPrice[9]?.backSideprice
let backSideDtfprice_5X5CustomDropSholder=tshirtPrice[10]?.backSideprice
let backSideDtfprice_2p5X5CustomDropSholder=tshirtPrice[11]?.backSideprice
let backSideDtfprice_2p5X2p5CustomDropSholder=tshirtPrice[12]?.backSideprice
// let additionalCost=tshirtPrice[0]?.additionalCost
    // custom hoodie

   const price_11p7x16p5CHoodie=tshirtPrice[13]?.frontSideprice
   const price_10x14CHoodie=tshirtPrice[14]?.frontSideprice
   const price_10x10CHoodie=tshirtPrice[15]?.frontSideprice
   const price_10x5CHoodie=tshirtPrice[16]?.frontSideprice
   const price_5X5CHoodie=tshirtPrice[17]?.frontSideprice
   const price_2p5X5CHoodie=tshirtPrice[18]?.frontSideprice
   const price_2p5X2p5CHoodie=tshirtPrice[19]?.frontSideprice



//     let backSideDtfprice_11p7x16p5=150
// let backSideDtfprice_10x14=113
// let backSideDtfprice_10x10=57
// let backSideDtfprice_10x5=29
// let backSideDtfprice_5X5=15
// let backSideDtfprice_2p5X5=8
// let backSideDtfprice_2p5X2p5=4
// let additionalCost=10

let backSideDtfprice_11p7x16p5CustomHoodie=tshirtPrice[13]?.backSideprice
let backSideDtfprice_10x14CustomHoodie=tshirtPrice[14]?.backSideprice
let backSideDtfprice_10x10CustomHoodie=tshirtPrice[15]?.backSideprice
let backSideDtfprice_10x5CustomHoodie=tshirtPrice[16]?.backSideprice
let backSideDtfprice_5X5CustomHoodie=tshirtPrice[17]?.backSideprice
let backSideDtfprice_2p5X5CustomHoodie=tshirtPrice[18]?.backSideprice
let backSideDtfprice_2p5X2p5CustomHoodie=tshirtPrice[19]?.backSideprice

   formData?.orderDetailArr.forEach(item => {
    item.totalQuantity = safeParseInt(item.quantityM) + 
                         safeParseInt(item.quantityL) + 
                         safeParseInt(item.quantityXL) + 
                         safeParseInt(item.quantityXXL);
  });
    let updatedPrintbazcost=0
    let printbazcost=0;
    let printbazcostbase=0;
    let backSidePrintCost 
    for  (var i = 0; i < formData?.orderDetailArr?.length; i++) {
      if (( getSpecificOrderById?.category==="customRoundNeck" || getSpecificOrderById?.category==="Custom Round Neck") &&
        formData?.quantity &&
        formData?.orderDetailArr[i]?.totalQuantity &&
        formData?.orderDetailArr[i]?.printSize &&
        price_10x14CRoundNeck &&
        price_10x10CRoundNeck &&
        price_10x5CRoundNeck &&
        price_5X5CRoundNeck &&
        price_2p5X5CRoundNeck &&
        price_2p5X2p5CRoundNeck 
       
      ) 
      {
        const totalPrice = teeShirtFormula(
          formData?.quantity,
          formData?.orderDetailArr[i]?.totalQuantity,
          formData?.orderDetailArr[i]?.printSize,
          price_10x14CRoundNeck,
          price_10x10CRoundNeck,
          price_10x5CRoundNeck,
          price_5X5CRoundNeck,
          price_2p5X5CRoundNeck,
          price_2p5X2p5CRoundNeck
        ).totalPrice;
      
        // back side dtf cost plus additional cost 
    backSidePrintCost =backsideFormula(
        formData?.quantity,
        formData?.orderDetailArr[i]?.totalQuantity,
        formData?.orderDetailArr[i]?.printSizeBack,
        formData?.orderDetailArr[i]?.printSide,
        backSideDtfprice_10x14CustomRoundNeck,
        backSideDtfprice_10x10CustomRoundNeck,
        backSideDtfprice_10x5CustomRoundNeck,
        backSideDtfprice_5X5CustomRoundNeck,
        backSideDtfprice_2p5X5CustomRoundNeck,
        backSideDtfprice_2p5X2p5CustomRoundNeck,
        additionalCost,

      ).backDtfAndAdditionalCost;
  
        
        // At this point, backSidePrintCost contains the total cost for the current item's back side print
        
        if(addBrandLogoArray[i] || formData?.orderDetailArr[i]?.brandLogo!==""){
          // printbazcost=parseInt(printbazcostbase+5)
          let brandLogoCost=5*formData?.orderDetailArr[i]?.totalQuantity
          printbazcostbase = Number(totalPrice)+backSidePrintCost+brandLogoCost;
          console.log("brandLogoCost",brandLogoCost);
          console.log("prinbazcostbaze", Number(totalPrice)+backSidePrintCost ,"+",brandLogoCost);
          printbazcost += printbazcostbase;
          // setFormData({ ...formData, printbazcost});
          const test=printbazcost+backSidePrintCost
        console.log("addbrandLogo",addbrandLogo);
        }
        else{
          printbazcostbase = Number(totalPrice) + Number(backSidePrintCost);
          printbazcost += printbazcostbase;
          // setFormData({ ...formData, printbazcost});
          console.log("printbazcost",printbazcost)
          console.log("printbazcostbase",printbazcostbase)
          console.log("backSidePrintCost",backSidePrintCost)
          console.log("totalPrice",totalPrice)
        }
  
   
      }

      else  if ((getSpecificOrderById?.category==="customDropSholder" || getSpecificOrderById?.category==="Custom Drop Sholder") &&
        formData?.quantity &&
        formData?.orderDetailArr[i]?.totalQuantity &&
        formData?.orderDetailArr[i]?.printSize &&
        price_11p7x16p5CDropSholder &&
        price_10x14CDropSholder &&
        price_10x10CDropSholder &&
        price_10x5CDropSholder &&
        price_5X5CDropSholder &&
        price_2p5X5CDropSholder &&
        price_2p5X2p5CDropSholder 
       
      ) 
      {
        const totalPrice = tshirtFormulaCustomDropSholder(
          formData?.quantity,
          formData?.orderDetailArr[i]?.totalQuantity,
          formData?.orderDetailArr[i]?.printSize,
          price_11p7x16p5CDropSholder,
          price_10x14CDropSholder,
          price_10x10CDropSholder,
          price_10x5CDropSholder,
          price_5X5CDropSholder,
          price_2p5X5CDropSholder,
          price_2p5X2p5CDropSholder
        ).totalPrice;
     
        // back side dtf cost plus additional cost 
    backSidePrintCost =backsiideFormulaDropSholderHoodie(
    formData?.quantity,
    formData?.orderDetailArr[i]?.totalQuantity,
    formData?.orderDetailArr[i]?.printSizeBack,
    formData?.orderDetailArr[i]?.printSide,
    backSideDtfprice_11p7x16p5CustomDropSholder,
    backSideDtfprice_10x14CustomDropSholder,
    backSideDtfprice_10x10CustomDropSholder,
    backSideDtfprice_10x5CustomDropSholder,
    backSideDtfprice_5X5CustomDropSholder,
    backSideDtfprice_2p5X5CustomDropSholder,
    backSideDtfprice_2p5X2p5CustomDropSholder,
    additionalCost,

  ).backDtfAndAdditionalCost;
        
        if(addBrandLogoArray[i]|| formData?.orderDetailArr[i]?.brandLogo!==""){
          // printbazcost=parseInt(printbazcostbase+5)
          let brandLogoCost=5*formData?.orderDetailArr[i]?.totalQuantity
          printbazcostbase = Number(totalPrice)+backSidePrintCost+brandLogoCost;
          console.log("brandLogoCost",brandLogoCost);
          console.log("prinbazcostbaze", Number(totalPrice)+backSidePrintCost ,"+",brandLogoCost);
          printbazcost += printbazcostbase;
        
          const test=printbazcost+backSidePrintCost
        console.log("addbrandLogo",addbrandLogo);
        }
        else{
          printbazcostbase = Number(totalPrice) + Number(backSidePrintCost);
          printbazcost += printbazcostbase;
        
          console.log("printbazcost",printbazcost)
          console.log("printbazcostbase",printbazcostbase)
          console.log("backSidePrintCost",backSidePrintCost)
          console.log("totalPrice",totalPrice)
        }
      
      //  else {
      //   if(printbazcostbase){
        
      //     printbazcost= printbazcostbase;
      //   }
      //   else{
      //     printbazcost=0;
      //   }
      //   // or any default value you want to set
      // }
    }
    else  if ((getSpecificOrderById?.category==="Custom Hoodie" || getSpecificOrderById?.category==="customHoodie") &&
      formData?.quantity &&
      formData?.orderDetailArr[i]?.totalQuantity &&
      formData?.orderDetailArr[i]?.printSize &&
      price_11p7x16p5CHoodie &&
      price_10x14CHoodie &&
      price_10x10CHoodie &&
      price_10x5CHoodie &&
      price_5X5CHoodie &&
      price_2p5X5CHoodie &&
      price_2p5X2p5CHoodie 
     
    ) 
    {
      const totalPrice = tshirtFormulaCustomDropSholder(
        formData?.quantity,
        formData?.orderDetailArr[i]?.totalQuantity,
        formData?.orderDetailArr[i]?.printSize,
        price_11p7x16p5CHoodie,
        price_10x14CHoodie,
        price_10x10CHoodie,
        price_10x5CHoodie,
        price_5X5CHoodie,
        price_2p5X5CHoodie,
        price_2p5X2p5CHoodie
      ).totalPrice;
          // back side dtf cost plus additional cost 
   backSidePrintCost =backsiideFormulaDropSholderHoodie(
    formData?.quantity,
    formData?.orderDetailArr[i]?.totalQuantity,
    formData?.orderDetailArr[i]?.printSizeBack,
    formData?.orderDetailArr[i]?.printSide,
    backSideDtfprice_11p7x16p5CustomHoodie,
    backSideDtfprice_10x14CustomHoodie,
    backSideDtfprice_10x10CustomHoodie,
    backSideDtfprice_10x5CustomHoodie,
    backSideDtfprice_5X5CustomHoodie,
    backSideDtfprice_2p5X5CustomHoodie,
    backSideDtfprice_2p5X2p5CustomHoodie,
    additionalCost,

  ).backDtfAndAdditionalCost;
      // At this point, backSidePrintCost contains the total cost for the current item's back side print
      
      // if(addbrandLogo===true){
      //   // printbazcost=parseInt(printbazcostbase+5)
        
      //   printbazcostbase = Number(totalPrice)+backSidePrintCost+(5*formData?.orderDetailArr[i]?.totalQuantity);
      //   printbazcost += printbazcostbase;
      //   const test=printbazcost+backSidePrintCost
      //   console.log("printbazcost",printbazcost)
      //   console.log("backSidePrintCost",backSidePrintCost)
      //   console.log("test",test)
      // }
      // else{
      //   printbazcostbase = Number(totalPrice) + backSidePrintCost;
      //   printbazcost +=printbazcostbase;
      
      //   console.log("printbazcost",printbazcost)
      //   console.log("backSidePrintCost",backSidePrintCost)
      // }
      if(addBrandLogoArray[i]|| formData?.orderDetailArr[i]?.brandLogo!==""){
        // printbazcost=parseInt(printbazcostbase+5)
        let brandLogoCost=5*formData?.orderDetailArr[i]?.totalQuantity
        printbazcostbase = Number(totalPrice)+backSidePrintCost+brandLogoCost;
        console.log("brandLogoCost",brandLogoCost);
        console.log("prinbazcostbaze", Number(totalPrice)+backSidePrintCost ,"+",brandLogoCost);
        printbazcost += printbazcostbase;
     
        const test=printbazcost+backSidePrintCost
      console.log("addbrandLogo",addbrandLogo);
      }
      else{
        printbazcostbase = Number(totalPrice) + Number(backSidePrintCost);
        printbazcost += printbazcostbase;
      
        console.log("printbazcost",printbazcost)
        console.log("printbazcostbase",printbazcostbase)
        console.log("backSidePrintCost",backSidePrintCost)
        console.log("totalPrice",totalPrice)
      }
 
    }
      //  else {
      //   if(printbazcostbase){
        
      //     printbazcost= printbazcostbase;
      //   }
      //   else{
      //     printbazcost=0;
      //   }
      //   // or any default value you want to set
      // }
    }

    if(formData.dsicount
      ){
      printbazcost=printbazcost-Number(formData?.dsicount)
    }
    
    if(formData.additionalCost){
      printbazcost=printbazcost+Number(formData?.additionalCost)
    }
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
       
          setFormData({ ...formData, [name]: value});
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
          quantity: parseInt(newGrandQuantity),
          // printbazcost:parseInt(printbazcost)
      }));
  }

 // charge based on weight 
    // inside dhaka 
    const chargeForInSideZeroToP5=70;
    const chargeForInSidep5To1=80;
    const chargeForInSideoneTo2=90;
    const chargeForInSidetwoTo3=115;
    // outside dhaka 
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
    console.log("deliveryFee",deliveryFee)
   
        let recvMoney = 0;
        let costHandlingfee;
        let recvMoneyWithouthandling = 0;
        recvMoneyWithouthandling = Number(
          Math.ceil(formData.collectAmount - (printbazcost + deliveryFee))
        );
        // costHandlingfee = recvMoneyWithouthandling * 0.02;
        costHandlingfee = Number(formData.collectAmount * 0.03);
        recvMoney = recvMoneyWithouthandling - costHandlingfee;
        let suggestedCollectAmount = Math.ceil((1 + printbazcost + deliveryFee) / 0.97);
        // console.log("recvMoney",recvMoney)
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
        
       
  //       const handleUpdate = async (e) => {
  //           e.preventDefault()
  //           setIsLoading(true)
  //           // Validate the form here
  //           if (validateForm()) {
  //             setIsLoading(false) // Set loading status to false if form is invalid
  //             return; // Exit the function if form is invalid
  //           }
  //           try {
  //             const formData2 = new FormData();
  //             const orderDetailArr = formData.orderDetailArr || [];
  //             const filesAndImagesArr = [];
  //         // console.log("formData.orderDetailArr",formData.orderDetailArr);
  //             orderDetailArr?.forEach((item, index) => {
  //               const fileAndImageData = {};
  //              // Only append 'file' and 'image' fields if they have been updated:
  //              if (item.file && item.file.length > 0) {
  //               // console.log("item.file.length",item.file.length);
  //               item.file.forEach((file, fileIndex) => {
  //                 if (file instanceof File) {
  //                   formData2.append(`file${index}_${fileIndex}`, file); // Append each file
  //                 } else {
  //                   // console.error(`item.file[${fileIndex}] is not a File object:`, file);
  //                 }
  //               });
  //             }
          
  //               if (item.image && item.image.length > 0) {
  //                 item.image.forEach((image, imageIndex) => {
  //                   formData2.append(`image${index}_${imageIndex}`, image); // Append each image
  //                 });
  //               }
          
  //               // Append brandLogo
  //               if (item.brandLogo ) {
  //                 // console.log("item.brandLogo",item.brandLogo);
  //                 formData2.append(`brandLogo${index}`, item.brandLogo);
  //             }
          
  //               if (Object.keys(fileAndImageData).length) {
  //                 filesAndImagesArr.push(fileAndImageData);
  //               }
          
  //               formData2.append(`color${index}`, item.color);
  //               formData2.append(`teshirtSize${index}`, item.teshirtSize);
  //               formData2.append(`quantity${index}`, item.quantity);
  //               formData2.append(`printSize${index}`, item.printSize);
  //               formData2.append(`printSide${index}`, item.printSide);
          
  //               return item;
  //             });
  //          // Only append 'orderDetailArr' if it has been updated:
  //   if (orderDetailArr.length > 0) {
  //     formData2.append('orderDetailArr', JSON.stringify(orderDetailArr));
  //   }
  //             formData2.append('filesAndImages', JSON.stringify(filesAndImagesArr)); // Append the filesAndImagesArr as a JSON string
          
  //             // Append the remaining form data
  //             // formData2.append('orderDetailArr', JSON.stringify(orderDetailArr));
  //             formData2.append('name', formData.name);
  //             formData2.append('phone', formData.phone);
  //             formData2.append('address', formData.address);
  //             formData2.append('instruction', formData.instruction);
  //             formData2.append('area', formData.areas);
  //             formData2.append('collectAmount', formData.collectAmount);
  //             formData2.append('printbazcost', printbazcost);
  //             formData2.append('deliveryFee', deliveryFee);
  //             formData2.append('recvMoney', recvMoney);
  //             formData2.append('userMail', getSpecificOrderById?.userMail);
  //             // formData2.append('orderDetailArr', JSON.stringify(formData.orderDetailArr));  // Use the updated orderDetailArr
  //             // const response = await fetch(`https://mserver.printbaz.com/updateorder/${viewOrder?._id}`, {
  //             const response = await fetch(`http://localhost:5000/updateorder/${viewOrder?._id}`, {
  //               method: "PUT",
  //               body: formData2,
  //             });
          
  //             if (response.ok) {
  //               const result = await response.json();
  //               // console.log("Success:", result);
  //               // console.log('API response:', response);
            
  //            // Fetch the updated order details
  // // const orderResponse = await fetch(`https://mserver.printbaz.com/getorder/${viewOrder?._id}`);
  // const orderResponse = await fetch(`http://localhost:5000/getorder/${viewOrder?._id}`);
  // if (orderResponse.ok) {
  //   const updatedOrder = await orderResponse.json();
  //   // console.log('Updated order:', updatedOrder);
  // } 
  // else {
  //   throw new Error('Order fetch error: ' + orderResponse.status);
  // }

  //               setShowAlert(true);
  //             } else {
  //               throw new Error('API error: ' + response.status);
  //             }
  //           } catch (error) {
  //             console.error('API error:', error.message);
  //           }
  //           finally {
  //             setIsLoading(false); // Set loading status to false
  //           }
  //         };

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
  item?.printSide  &&
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
       <Card.Body>
       <Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Print side</Form.Label>
                    
                      <Form.Control  
                        as="select"
                        data-color={item.color}
                        value={item.printSide}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSide"
                        required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}
                        
                        
                      >
                       <option value="">select print side</option> 
                        <option value="frontSide">Front Side</option>
                        <option value="backSide">Back Side</option>
                        <option value="bothSide">Both Side</option>
                      </Form.Control>
                    
                    </Form.Group>
                   {
                      item.printSide === "backSide" &&
                      <Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Print Size</Form.Label>
                      <Form.Control
                        as="select"
                        data-color={item.color}
                        value={item.printSize}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSize"
                        required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}
                      >
                       <option value="">select print size</option> 
                       {(getSpecificOrderById?.category==="Custom Hoodie" || getSpecificOrderById?.category==="customHoodie" || getSpecificOrderById?.category==="customDropSholder" || getSpecificOrderById?.category==="Custom Drop Sholder") &&    <option value="11.7 x 16.5">11.7″ x 16.5″</option> }
                     
                        <option value="10 x 14">10″ x 14″</option>
                        <option value="10 x 10">10″ x 10″</option>
                        <option value="10 x 5">10″ x 5″</option>
                        <option value="5 X 5">5″ x 5″</option>
                        <option value="2.5 X 5">2.5″ x 5″</option>
                        <option value="2.5 X 2.5">2.5″ x 2.5″</option>
                      </Form.Control>
                    </Form.Group>
}
                    {
                      item.printSide==="frontSide"  &&
                      <Form.Group
                      className="mb-3 Print Side w-100 m-auto"
                      controlId="wccalcPrintSide"
                    >
                      <Form.Label className="pr-2">Print Size</Form.Label>
                      <Form.Control
                        as="select"
                        data-color={item.color}
                        value={item.printSize}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSize"
                        required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}
                      >
                       <option value="">select print size</option> 
                       {(getSpecificOrderById?.category==="Custom Hoodie" || getSpecificOrderById?.category==="customHoodie" || getSpecificOrderById?.category==="customDropSholder" || getSpecificOrderById?.category==="Custom Drop Sholder") &&    <option value="11.7 x 16.5">11.7″ x 16.5″</option> }
                        <option value="10 x 14">10″ x 14″</option>
                        <option value="10 x 10">10″ x 10″</option>
                        <option value="10 x 5">10″ x 5″</option>
                        <option value="5 X 5">5″ x 5″</option>
                        <option value="2.5 X 5">2.5″ x 5″</option>
                        <option value="2.5 X 2.5">2.5″ x 2.5″</option>
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
                        data-color={item.color}
                        value={item.printSize}
                        onChange={(e) => {
                           handleInputChange(e,index);
                        }}
                        name="printSize"
                        required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}
                      >
                       <option value="">select print size</option> 
                   
                        <option value="10 x 14">10″ x 14″</option>
                        <option value="10 x 10">10″ x 10″</option>
                        <option value="10 x 5">10″ x 5″</option>
                        <option value="5 X 5">5″ x 5″</option>
                        <option value="2.5 X 5">2.5″ x 5″</option>
                        <option value="2.5 X 2.5">2.5″ x 2.5″</option>    {(getSpecificOrderById?.category==="Custom Hoodie" || getSpecificOrderById?.category==="customHoodie" || getSpecificOrderById?.category==="customDropSholder" || getSpecificOrderById?.category==="Custom Drop Sholder") &&    <option value="11.7 x 16.5">11.7″ x 16.5″</option> }
                      </Form.Control>
                    </Form.Group>
                    <Form.Group
                    className="mb-3 Print Side w-100 m-auto"
                    controlId="wccalcPrintSide"
                  >
                    <Form.Label className="pr-2">Print Size back</Form.Label>
                    <Form.Control
                      as="select"
                      data-color={item.color}
                      name="printSizeBack"
                      value={item?.printSizeBack}
                      onChange={(e) => {
                         handleInputChange(e,index);
                      }}
                     
                      required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL}
                    >
                     <option value="">select print size</option>
                     {(getSpecificOrderById?.category==="Custom Hoodie" || getSpecificOrderById?.category==="customHoodie" || getSpecificOrderById?.category==="customDropSholder" || getSpecificOrderById?.category==="Custom Drop Sholder") &&    <option value="11.7 x 16.5">11.7″ x 16.5″</option> } 
                      <option value="10 x 14">10″ x 14″</option>
                      <option value="10 x 10">10″ x 10″</option>
                      <option value="10 x 5">10″ x 5″</option>
                      <option value="5 X 5">5″ x 5″</option>
                      <option value="2.5 X 5">2.5″ x 5″</option>
                      <option value="2.5 X 2.5">2.5″ x 2.5″</option>
                    </Form.Control>
                  </Form.Group>
                      </>
                     
                    }
                 <Form.Group  className="">
  <Form.Label>Upload Main File</Form.Label>
  {item?.file?.map((singleFile, fileIndex) => {
    let fileId, filePreviewURLDrive,filePreviewURL;
    if (typeof singleFile === 'string') { // singleFile is a URL string
      fileId = singleFile?.split('/d/')[1].split('/view')[0];
      filePreviewURL =`https://drive.google.com/file/d/${fileId}/preview`;
    } else if (singleFile instanceof File) { // singleFile is a file object
      filePreviewURL = URL.createObjectURL(singleFile);
    
    }

    return (
      <div style={{ marginBottom:"55px", height: "150px", width: "100%"  }} key={fileIndex} >
      
     
        <iframe
        src={filePreviewURL}
        style={{
        
          width: "100%",
          height: "100%",
          overflow:"auto",
          // marginBottom:'10px',
        //  pointerEvents: "none",
          border: "none",
        }}
        title={`file-${fileIndex}`}
      ></iframe>
      <Form.Control
          type="file"
          name="file"
          id={`fileInput-${fileIndex}`}
         
          style={{position:"absolute",width:"85%",margin:"auto",display:"" }}
          onChange={(e) => handleFileChange(e, index, fileIndex)}// Pass the correct index
          accept=".ai,.eps,.psd,.pdf,.svg,.png"
          multiple
        />
      </div>
    );
  })}
  <span style={{ color: "gray" }}>upload .ai, .eps,.psd,.pdf,.svg, .png file</span>
</Form.Group>
  {/* image upload  */}
                    
  <Form.Group  className="mb-3">
                      <Form.Label>Upload Mockup/T-Shirt Demo Picture</Form.Label>
                      {
                           item?.image?.map((singleImage,imageIndex)=>{
                            let fileId, imagePreviewURL;
                            if (typeof singleImage === 'string') { // singleFile is a URL string
                              fileId = singleImage?.split('/d/')[1].split('/view')[0];
                              imagePreviewURL =`https://drive.google.com/file/d/${fileId}/preview`;
                            } else if (singleImage instanceof File) { // singleFile is a file object
                             imagePreviewURL = URL.createObjectURL(singleImage);
                            }
                              
                            return(
                              <div style={{ marginBottom:"55px", height: "150px", width: "100%"  }} key={imageIndex} >
      
     
                              <iframe
                              src={imagePreviewURL}
                              style={{
                              
                                width: "100%",
                                height: "100%",
                                overflow:"auto",
                                // marginBottom:'10px',
                              //  pointerEvents: "none",
                                border: "none",
                              }}
                              title={`image-${imageIndex}`}
                            ></iframe>
                           
                        
                      
                              <Form.Control
                                type="file"
                                name="image"
                                id={`imageInput-${imageIndex}`}
                               
                                style={{position:"absolute",width:"85%",display:"" }}
                                onChange={(e) => handleFileChange(e, index, imageIndex)}// Pass the correct index
                                accept=".ai,.eps,.psd,.pdf,.svg,.png"
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

<Form.Group  className="mb-3">
  <Form.Label>Upload Your Brand Logo (optional)</Form.Label>
  {(() => {
    let fileId, brandLogoPreviewURL;
    if (typeof item?.brandLogo === 'string') {
      fileId = item?.brandLogo?.split('/d/')[1]?.split('/view')[0];
      brandLogoPreviewURL = `https://drive.google.com/file/d/${fileId}/preview`;
    } else if (item?.brandLogo instanceof Blob || item?.brandLogo instanceof File) {
      brandLogoPreviewURL = URL.createObjectURL(item?.brandLogo);
    } else {
      brandLogoPreviewURL = null;
    }
        
      // const fileId = item?.brandLogo?.split('/d/')[1].split('/view')[0];
      // const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
        
      return (
        <div style={{ position: "relative", marginBottom: "5px", height: "150px", width: "100%" }}>
            <iframe src={brandLogoPreviewURL}    style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
          
            }} title="update brandlogo"></iframe>
            <label 
htmlFor={`brandlogo-${index}`} 
    style={{ 
      position: "absolute", 
      top: "50%", 
      left: "50%", 
      transform: "translate(-50%, -50%)",  
      cursor: "pointer", 
      width: "50%", 
      height: "40px", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      color: "black",
      textAlign: "center",
      transition: "background-color 0.2s"
    }}
    onMouseOver={(e) => {
      e.target.innerHTML = "Choose file"
      e.target.style.backgroundColor = "rgba(255,255,255,0.8)"
    }}
    onMouseOut={(e) => {
      e.target.innerHTML = ""
      e.target.style.backgroundColor = "transparent"
    }}
  >
  </label>
  <Form.Control
          type="file"
          id={`brandlogo-${index}`}
          name="brandLogo"
          style={{ display: "none" }}
          accept="image/jpeg, image/png"
          onChange={(e) => handleFileChange(e, index)}
        />
        </div>
      )
    })()

  }
  
  {/* <iframe src={individualOrder?.brandLogo} height="200" width="300" title="Iframe Example"></iframe> */}
 
  
</Form.Group>

 {/* <Form.Group controlId="formBrandLogo" className="mb-3">
<Form.Label>Upload Your Brand Logo (optional)</Form.Label>
<Form.Control
type="file"
name="brandLogo"
accept="image/jpeg, image/png"
onChange={(e) => handleFileChange(e, index)}
/>
</Form.Group>  */}


       </Card.Body>
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
                        
                        placeholder="note.."
                      />
                    </Form.Group>
                    </div>
                    <hr />
                    {/* <div className="costOrder_Style">
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
                    <hr /> */}
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
                        
                        placeholder="note.."
                      />
                    </Form.Group>
                    
                  
                    </div>
                    <hr />
                    {/* <div className="costOrder_Style">
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
      <hr /> */}
                    <div className="costOrder_Style">
                     

                      <Form.Label>Delivery Fee</Form.Label>
                       <Form.Group className="mb-3 ">
                     
                   
                      <Form.Control
                        type="number"
                        name="deliveryFee"
                        value={deliveryFee}
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
                        <h3> {recvMoney>0 && Math.floor(recvMoney)}</h3>
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

UpdateOrder.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UpdateOrder;
