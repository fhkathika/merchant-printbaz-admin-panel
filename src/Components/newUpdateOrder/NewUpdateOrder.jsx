

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
import useFilterValueBasedonCategory from '../../hooks/useFilterValueBasedonCategory';

const NewUpdateOrder = ({ onClose,viewOrder,viewClient,getSpecificOrderById,setGetSpecificOrderById }) => {
 
  // console.log("viewOrder",viewOrder);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [updateOrderArr, setUpdateOrderArr] = useState([]);
    const [indexNumber, setIndexNumber] = useState();
 
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
const {
  customRoundNeckinputFront10X14,
  customRoundNeckinputFront10X10,
  customRoundNeckinputFront10X5,
  customRoundNeckinputFront5X5,
  customRoundNeckinputFront2p5X5,
  customRoundNeckinputFront2p5X2p5,
  customRoundNeckinputBack10X14,
  customRoundNeckinputBack10X10,
  customRoundNeckinputBack10X5,
  customRoundNeckinputBack5X5,
  customRoundNeckinputBack2p5X5,
  customRoundNeckinputBack2p5X2p5,
  customDropSholderinputFront11p7X16p5,
  customDropSholderinputFront10X14,
  customDropSholderinputFront10X10,
  customDropSholderinputFront10X5,
  customDropSholderinputFront5X5,
  customDropSholderinputFront2p5X5,
  customDropSholderinputFront2p5X2p5,
customDropSholderinputBack11p7X16p5,
customDropSholderinputBack10X14,
customDropSholderinputBack10X10,
customDropSholderinputBack10X5,
customDropSholderinputBack5X5,
customDropSholderinputBack2p5X5,
customDropSholderinputBack2p5X2p5,
customHoodieinputFront11p7X16p5,
customHoodieinputFront10X14,
customHoodieinputFront10X10,
customHoodieinputFront10X5,
customHoodieinputFront5X5,
customHoodieinputFront2p5X5,
customHoodieinputFront2p5X2p5,
customHoodieinputBack11p7X16p5,
customHoodieinputBack10X14,
customHoodieinputBack10X10,
customHoodieinputBack10X5,
customHoodieinputBack5X5,
customHoodieinputBack2p5X5,
customHoodieinputBack2p5X2p5}=useFilterValueBasedonCategory()
// const [formData, setFormData] = useState({
 
//   name: getSpecificOrderById?.name,
//   lastName: getSpecificOrderById?.lastName,
//   companyName: getSpecificOrderById?.companyName,
//   phone: getSpecificOrderById?.phone,
//   userMail: getSpecificOrderById?.userMail,
//   regId: getSpecificOrderById?.regId,
//   createdAt: getSpecificOrderById?.createdAt,
//   clientName: getSpecificOrderById?.clientName,
//   clientbrandName: getSpecificOrderById?.clientbrandName,
//   clientPhone: getSpecificOrderById?.clientPhone,
//   address: getSpecificOrderById?.address,
//   instruction: getSpecificOrderById?.instruction,
//   districts: getSpecificOrderById?.districts,
//   zones: getSpecificOrderById?.zones,
//   areas: getSpecificOrderById?.areas,
//   quantity: getSpecificOrderById?.grandQuantity,
//   grandCost: getSpecificOrderById?.grandCost,
//   printbazcost: Number(getSpecificOrderById?.printbazcost),
//   deliveryFee: getSpecificOrderById?.deliveryFee,
//   dsicount: getSpecificOrderById?.dsicount?  getSpecificOrderById?.dsicount:'',
//   additionalCost:getSpecificOrderById?.additionalCost?getSpecificOrderById?.additionalCost:'',
//   discountNote:getSpecificOrderById?.discountNote?getSpecificOrderById?.discountNote:'',
//   additionalCostNote:getSpecificOrderById?.additionalCostNote?getSpecificOrderById?.additionalCostNote:'',
//   collectAmount: getSpecificOrderById?.collectAmount,
//   recvMoney: getSpecificOrderById?.recvMoney,
//   orderCreatedAt: getSpecificOrderById?.orderCreatedAt,
//   paymentSystem: getSpecificOrderById?.paymentSystem,
//   orderStatus: getSpecificOrderById?.orderStatus,
//   paymentStatus: getSpecificOrderById?.paymentStatus,
//   selectedItemsDetailArr:  getSpecificOrderById?.selectedItemsDetailArr?.map(order => {
        
//             return order
//               })
//   // selectedItemsDetailArr: getSpecificOrderById?.selectedItemsDetailArr?.map((order) => {
//   //   return {
//   //     productType: order.productType,
//   //     perItemQuantity: order.perItemQuantity,
//   //     printbazcost: order.printbazcost,
//   //     individualProductArr: order.individualProductArr.map((product) => {
//   //       return {
//   //         productType: product.productType,
//   //         color: product.color,
//   //         teshirtSize: product.teshirtSize,
//   //         categoryImg: product.categoryImg,
//   //         quantityM: product.quantityM,
//   //         quantityL: product.quantityL,
//   //         quantityXL: product.quantityXL,
//   //         quantityXXL: product.quantityXXL,
//   //         quantityXXXL: product.quantityXXXL,
//   //         totalQuantity: product.totalQuantity,
//   //         printSide: product.printSide,
//   //         printSize: product.printSize,
//   //         printSizeBack: product.printSizeBack,
//   //         file: product.file,
//   //         image: product.image,
//   //         brandLogo: product.brandLogo,
//   //       };
//   //     }),
//   //   };
//   // }),
// });


   const [formData, setFormData] = useState({
        name: getSpecificOrderById?.name,
        lastName: getSpecificOrderById?.lastName,
        phone: getSpecificOrderById?.phone,
        userMail: getSpecificOrderById?.userMail,
        regId: getSpecificOrderById?.regId,
        clientName: getSpecificOrderById?.clientName,
        clientbrandName: getSpecificOrderById?.clientbrandName,
        clientPhone: getSpecificOrderById?.clientPhone,
        address: getSpecificOrderById?.address,
        instruction: getSpecificOrderById?.instruction,
        collectAmount: getSpecificOrderById?.collectAmount,
        areas: getSpecificOrderById?.areas,
        zones: getSpecificOrderById?.zones,
        districts: getSpecificOrderById?.districts,
        printbazcost: Number(getSpecificOrderById?.printbazcost),
        quantity: getSpecificOrderById?.grandQuantity,
        deliveryFee: getSpecificOrderById?.deliveryFee,
        dsicount: getSpecificOrderById?.dsicount?  getSpecificOrderById?.dsicount:'',
        additionalCost:getSpecificOrderById?.additionalCost?getSpecificOrderById?.additionalCost:'',
        discountNote:getSpecificOrderById?.discountNote?getSpecificOrderById?.discountNote:'',
        additionalCostNote:getSpecificOrderById?.additionalCostNote?getSpecificOrderById?.additionalCostNote:'',
        selectedItemsDetailArr:  getSpecificOrderById?.selectedItemsDetailArr?.map(order => {
        
           return order
           })
      
      });
   
      const [filePreviews, setFilePreviews] = useState([]);
// console.log("formData...",formData)

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
  }, [formData?.selectedItemsDetailArr]);
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
useEffect(() => {
  // Calculate newPrintbazcost based on formData

  // Update the state with the new value
  setFormData((prevState) => ({
    ...prevState,
...prevState?.selectedItemsDetailArr,
    printbazcost: printbazcost>0?printbazcost:formData?.printbazcost,
  }));
}, [formData?.printbazcost,formData?.selectedItemsDetailArr]); // Dependencies

const [hasSize,setHasSize]=useState(false)
const [hasLogo,setHasLogo]=useState(false)
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
      
     
      const handleFileChange = (event, orderIndex, productIndex, fileType, fileIndex) => {
        const { files } = event.target;
   
        setFormData((prevOrder) => {
          const newOrder = { ...prevOrder };
      
          const product = newOrder.selectedItemsDetailArr[orderIndex]?.individualProductArr[productIndex];
      
          if (product) {
            const updatedProduct = { ...product };
      
            // Assuming files is an array of files
            // const newFilesArray = Array.from(files);
            const newFilesArray = [...files];

            let updatedFiles;
   
            if (fileType === "file") {
              updatedFiles = updatedProduct.file.map((existingFile, idx) => {
                let uniqueIdentifier = existingFile.uniqueIdentifier;
                console.log("existingFile.uniqueIdentifier", uniqueIdentifier);
              if(idx === fileIndex){
                newFilesArray[0].uniqueIdentifier=uniqueIdentifier
              }
                return idx === fileIndex
                ? 
                    newFilesArray[0]   // include uniqueIdentifier from existingFile
                  
                : existingFile;
              });
              updatedProduct.file = updatedFiles;
              console.log("updatedProduct",updatedProduct)
            } else if (fileType === "image") {
              updatedFiles = updatedProduct.image.map((existingImage, idx) =>
              {
                let uniqueIdentifier = existingImage.uniqueIdentifier;
                console.log("existingImage.uniqueIdentifier", uniqueIdentifier);
              if(idx === fileIndex){
                newFilesArray[0].uniqueIdentifier=uniqueIdentifier
              }
                return idx === fileIndex
                ? 
                    newFilesArray[0]   // include uniqueIdentifier from existingFile
                  
                : existingImage;
              }
              );
              updatedProduct.image = updatedFiles;
            } else if (fileType === "brandLogo") {
              updatedFiles = updatedProduct.brandLogo.map((existingLogo, idx) =>
              {
                let uniqueIdentifier = existingLogo.uniqueIdentifier;
                console.log("existingLogo.uniqueIdentifier", uniqueIdentifier);
              if(idx === fileIndex){
                newFilesArray[0].uniqueIdentifier=uniqueIdentifier
              }
                return idx === fileIndex
                ? 
                    newFilesArray[0]   // include uniqueIdentifier from existingFile
                  
                : existingLogo;
              }
              );
              updatedProduct.brandLogo = updatedFiles;
            }
      
            // Update the nested product within the order
            newOrder.selectedItemsDetailArr[orderIndex].individualProductArr[productIndex] = updatedProduct;
          } else {
            console.error("Array or object is undefined at orderIndex:", orderIndex, "productIndex:", productIndex);
          }
      
          return { ...newOrder };
        });
      };
      
      
      
      
      // const handleFileChange = (event, orderIndex, productIndex, fileIndex) => {
      //   const { name, files } = event.target;
      
      //   setFormData((prevOrder) => {
      //     const newOrder = { ...prevOrder };
      
      //     if (
      //       newOrder.selectedItemsDetailArr[orderIndex] &&
      //       newOrder.selectedItemsDetailArr[orderIndex].individualProductArr[productIndex]
      //     ) {
      //       const product = { ...newOrder.selectedItemsDetailArr[orderIndex].individualProductArr[productIndex] };
      //       if (name === "file") {
      //         // Assuming files is an array of files
      //         const newFilesArray = Array.from(files);
      
      //         // Check if this is the second object in the array
              
      //           product.file[fileIndex] = newFilesArray[fileIndex];
             
      //       }
      //       if (name === "image" ) {
      //         // Assuming files is an array of files
      //         const newFilesArray = Array.from(files);
     
      //         // Check if this is the second object in the array
              
      //           product.image[fileIndex] = newFilesArray[fileIndex];
      //      }
      //       if (name === "brandLogo") {
      //          // Assuming files is an array of files
      //          const newFilesArray = Array.from(files);
      
      //          // Check if this is the second object in the array
               
      //            product.brandLogo[fileIndex] = newFilesArray[fileIndex];
      //       }
           
          
      
      //       // Create a new array for the product to trigger a state update
      //       newOrder.selectedItemsDetailArr[orderIndex].individualProductArr[productIndex] = { ...product };
      //     } else {
      //       // Handle the case where the array or object is undefined
      //       console.error("Array or object is undefined at orderIndex:", orderIndex, "productIndex:", productIndex);
      //     }
      
      //     return { ...newOrder };
      //   });
      // };


      
    
         
    
    
    
    
    
    
    const { tshirtPrice } = useGetTshirtPrice();
    const blankRoundNeckFilter=tshirtPrice?.find(thsirt => thsirt.category === "Blank Round Neck")
    const blankDropSholderFilter=tshirtPrice?.find(thsirt => thsirt.category === "Blank Drop Sholder")
    const blankHoodieFilter=tshirtPrice?.find(thsirt => thsirt.category === "Blank Hoodie")
const price_10x14CRoundNeck=customRoundNeckinputFront10X14?.frontSideprice
const price_10x10CRoundNeck=customRoundNeckinputFront10X10?.frontSideprice
const price_10x5CRoundNeck=customRoundNeckinputFront10X5?.frontSideprice
const price_5X5CRoundNeck=customRoundNeckinputFront5X5?.frontSideprice
const price_2p5X5CRoundNeck=customRoundNeckinputFront2p5X5?.frontSideprice
const price_2p5X2p5CRoundNeck=customRoundNeckinputFront2p5X2p5?.frontSideprice
 
let backSideDtfprice_10x14CustomRoundNeck=customRoundNeckinputBack10X14?.backSideprice
let backSideDtfprice_10x10CustomRoundNeck=customRoundNeckinputBack10X10?.backSideprice
let backSideDtfprice_10x5CustomRoundNeck=customRoundNeckinputBack10X5?.backSideprice
let backSideDtfprice_5X5CustomRoundNeck=customRoundNeckinputBack5X5?.backSideprice
let backSideDtfprice_2p5X5CustomRoundNeck=customRoundNeckinputBack2p5X5?.backSideprice
let backSideDtfprice_2p5X2p5CustomRoundNeck=customRoundNeckinputBack2p5X2p5?.backSideprice
let additionalCost=tshirtPrice[0]?.additionalCost

    // custom drop sholder 
    const price_11p7x16p5CDropSholder=customDropSholderinputFront11p7X16p5?.frontSideprice
    const price_10x14CDropSholder=customDropSholderinputFront10X14?.frontSideprice
    const price_10x10CDropSholder=customDropSholderinputFront10X10?.frontSideprice
    const price_10x5CDropSholder=customDropSholderinputFront10X5?.frontSideprice
    const price_5X5CDropSholder=customDropSholderinputFront5X5?.frontSideprice
    const price_2p5X5CDropSholder=customDropSholderinputFront2p5X5?.frontSideprice
    const price_2p5X2p5CDropSholder=customDropSholderinputFront2p5X2p5?.frontSideprice

 


let backSideDtfprice_11p7x16p5CustomDropSholder=customDropSholderinputBack11p7X16p5?.backSideprice
let backSideDtfprice_10x14CustomDropSholder=customDropSholderinputBack10X14?.backSideprice
let backSideDtfprice_10x10CustomDropSholder=customDropSholderinputBack10X10?.backSideprice
let backSideDtfprice_10x5CustomDropSholder=customDropSholderinputBack10X5?.backSideprice
let backSideDtfprice_5X5CustomDropSholder=customDropSholderinputBack5X5?.backSideprice
let backSideDtfprice_2p5X5CustomDropSholder=customDropSholderinputBack2p5X5?.backSideprice
let backSideDtfprice_2p5X2p5CustomDropSholder=customDropSholderinputBack2p5X2p5?.backSideprice
// let additionalCost=tshirtPrice[0]?.additionalCost
    // custom hoodie

   const price_11p7x16p5CHoodie=customHoodieinputFront11p7X16p5?.frontSideprice
   const price_10x14CHoodie=customHoodieinputFront10X14?.frontSideprice
   const price_10x10CHoodie=customHoodieinputFront10X10?.frontSideprice
   const price_10x5CHoodie=customHoodieinputFront10X5?.frontSideprice
   const price_5X5CHoodie=customHoodieinputFront5X5?.frontSideprice
   const price_2p5X5CHoodie=customHoodieinputFront2p5X5?.frontSideprice
   const price_2p5X2p5CHoodie=customHoodieinputFront2p5X2p5?.frontSideprice



//     let backSideDtfprice_11p7x16p5=150
// let backSideDtfprice_10x14=113
// let backSideDtfprice_10x10=57
// let backSideDtfprice_10x5=29
// let backSideDtfprice_5X5=15
// let backSideDtfprice_2p5X5=8
// let backSideDtfprice_2p5X2p5=4
// let additionalCost=10

let backSideDtfprice_11p7x16p5CustomHoodie=customHoodieinputBack11p7X16p5?.backSideprice
let backSideDtfprice_10x14CustomHoodie=customHoodieinputBack10X14?.backSideprice
let backSideDtfprice_10x10CustomHoodie=customHoodieinputBack10X10?.backSideprice
let backSideDtfprice_10x5CustomHoodie=customHoodieinputBack10X5?.backSideprice
let backSideDtfprice_5X5CustomHoodie=customHoodieinputBack5X5?.backSideprice
let backSideDtfprice_2p5X5CustomHoodie=customHoodieinputBack2p5X5?.backSideprice
let backSideDtfprice_2p5X2p5CustomHoodie=customHoodieinputBack2p5X2p5?.backSideprice

   formData?.selectedItemsDetailArr?.forEach(item => {
    item.totalQuantity = safeParseInt(item.quantityM) + 
                         safeParseInt(item.quantityL) + 
                         safeParseInt(item.quantityXL) + 
                         safeParseInt(item.quantityXXL)+
                         safeParseInt(item.quantityXXXL);
  });
  // Function to calculate the total quantity for a specific product type
const calculateTotalQuantityForProductType = (productType) => {
  let totalQuantity = 0;

  formData.selectedItemsDetailArr?.forEach((item) => {
    if (item.productType === productType) {
      totalQuantity += item.perItemQuantity
    }
  });

  return totalQuantity;
};

// Calculate total quantity for "orderDetailArrCustomHoodie"
const totalQuantityCustomHoodie = calculateTotalQuantityForProductType("orderDetailArrCustomHoodie");
const totalQuantityCustomRoundNeck = calculateTotalQuantityForProductType("orderDetailArr");
const totalQuantityCustomDropSholder = calculateTotalQuantityForProductType("orderDetailArrCustomDropSholder");
const totalQuantityBlankRNeck = calculateTotalQuantityForProductType("orderDetailArrBlankRoundNeck");

const totalQuantityBlankDropSholder = calculateTotalQuantityForProductType("orderDetailArrBlankDropSholder");
const totalQuantityBlankHoodie = calculateTotalQuantityForProductType("orderDetailArrBlankHoodie");

let sumofTQuansityForIndividualDetailArrCRoundNeck = 0;
let sumofTQuansityForIndividualDetailArrCHoodie = 0;
let sumofTQuansityForIndividualDetailArrCDropsholder = 0;

if (totalQuantityCustomRoundNeck > 0) {
  formData?.selectedItemsDetailArr?.forEach((item) => {
    item?.individualProductArr?.forEach((product) => {
      if (product?.printSide === "bothSide") {
        sumofTQuansityForIndividualDetailArrCRoundNeck += safeParseInt(product?.totalQuantity) || 0;
      }
    });
  });
}
if (totalQuantityCustomHoodie > 0) {
  formData?.selectedItemsDetailArr?.forEach((item) => {
    item?.individualProductArr?.forEach((product) => {
      if (product?.printSide === "bothSide") {
        sumofTQuansityForIndividualDetailArrCHoodie += safeParseInt(product?.totalQuantity) || 0;
      }
    });
  });
}
if (totalQuantityCustomDropSholder > 0) {
  formData?.selectedItemsDetailArr?.forEach((item) => {
    item?.individualProductArr?.forEach((product) => {
      if (product?.printSide === "bothSide") {
        sumofTQuansityForIndividualDetailArrCDropsholder += safeParseInt(product?.totalQuantity) || 0;
      }
    });
  });
}


  let printbazcost = 0;
  let printbazcostbase = 0;
  let printbazcostCRoundNeck = 0;
  let printbazcostbaseCRoundNeck = 0;
  let printbazcostCHoodie = 0;
  let printbazcostbaseCHoodie = 0;
  let printbazcostCDropSholder= 0;
  let printbazcostbaseCDropSholder = 0;

  let printbazcostbaseBlankDropSholder = 0;
  let printbazcostbaseBlankHoodie = 0;
  let printbazcostbaseBlankRoundNeck = 0;

  let printbazcostBHoodie = 0;
  let printbazcostBRoundNeck= 0;
  let printbazcostBDropsholder = 0;
  let backSidePrintCost=0;
  let totalBrandLogoCost=0;

  for (let i = 0; i < formData?.selectedItemsDetailArr?.length; i++) {
      const selectedItem = formData?.selectedItemsDetailArr[i];
  
      if (
          (selectedItem?.productType === "orderDetailArrCustomHoodie") &&
          selectedItem?.perItemQuantity &&
          totalQuantityCustomHoodie &&
          selectedItem?.individualProductArr &&
          selectedItem?.individualProductArr.length &&
          price_11p7x16p5CHoodie &&
          price_10x14CHoodie &&
          price_10x10CHoodie &&
          price_10x5CHoodie &&
          price_5X5CHoodie &&
          price_2p5X5CHoodie &&
          price_2p5X2p5CHoodie
      ) {
        let totalBackSidePrintCostCHoodie=0;
        let totalFrontSidePrintCostCHoodie=0;
          selectedItem?.individualProductArr.forEach((individualProduct) => {
              const {
                  printSize,
                  printSizeBack,printSide,totalQuantity
                  // Added to get the size
                  // Add other properties as needed
              } = individualProduct;
              // Your existing logic goes here
              const totalPrice = tshirtFormulaCustomDropSholder(
                  
                 
                  // formData?.quantity,
                  selectedItem?.perItemQuantity,
                  totalQuantity,
                  printSize,
                  price_11p7x16p5CHoodie,
                  price_10x14CHoodie,
                  price_10x10CHoodie,
                  price_10x5CHoodie,
                  price_5X5CHoodie,
                  price_2p5X5CHoodie,
                  price_2p5X2p5CHoodie
              ).totalPrice;
              totalFrontSidePrintCostCHoodie+=totalPrice;
              // Back side dtf cost plus additional cost
              backSidePrintCost = backsiideFormulaDropSholderHoodie(
                selectedItem?.perItemQuantity,
             
                sumofTQuansityForIndividualDetailArrCHoodie,
                  printSizeBack,
                 printSide,
                  backSideDtfprice_11p7x16p5CustomHoodie,
                  backSideDtfprice_10x14CustomHoodie,
                  backSideDtfprice_10x10CustomHoodie,
                  backSideDtfprice_10x5CustomHoodie,
                  backSideDtfprice_5X5CustomHoodie,
                  backSideDtfprice_2p5X5CustomHoodie,
                  backSideDtfprice_2p5X2p5CustomHoodie,
                  additionalCost
              ).backDtfAndAdditionalCost;
              totalBackSidePrintCostCHoodie+=backSidePrintCost
              if (addBrandLogoArray[i] || individualProduct?.brandLogo !== null) {
                  let brandLogoCost = 5 * individualProduct?.totalQuantity;
                  //  totalBrandLogoCost+=brandLogoCost;
                  printbazcostbaseCHoodie = Number(totalFrontSidePrintCostCHoodie) + Number(totalBackSidePrintCostCHoodie) + brandLogoCost;
                  printbazcostCHoodie = printbazcostbaseCHoodie;
                 
              } else {
                printbazcostbaseCHoodie = Number(totalFrontSidePrintCostCHoodie) + Number(totalBackSidePrintCostCHoodie);
                printbazcostCHoodie = printbazcostbaseCHoodie;
              
          
              }
            
             
             
          });
      }
      else  if (
        (selectedItem?.productType === "orderDetailArrCustomDropSholder") &&
        selectedItem?.perItemQuantity &&
        totalQuantityCustomDropSholder &&
        selectedItem?.individualProductArr &&
        selectedItem?.individualProductArr.length &&
        price_11p7x16p5CDropSholder &&
        price_10x14CDropSholder &&
        price_10x10CDropSholder &&
        price_10x5CDropSholder &&
        price_5X5CDropSholder &&
        price_2p5X5CDropSholder &&
        price_2p5X2p5CDropSholder 
    ) {
      let totalBackSidePrintCostCDropSholder=0;
      let totalFrontSidePrintCostCDropSholder=0;
        selectedItem?.individualProductArr.forEach((individualProduct) => {
            const {
                printSize,
                printSizeBack,printSide,totalQuantity
                // Added to get the size
                // Add other properties as needed
            } = individualProduct;
            // Your existing logic goes here
            const totalPrice = tshirtFormulaCustomDropSholder(
                
               
                // formData?.quantity,
                selectedItem?.perItemQuantity,
                totalQuantity,
                printSize,
                price_11p7x16p5CDropSholder &&
                price_10x14CDropSholder &&
                price_10x10CDropSholder &&
                price_10x5CDropSholder &&
                price_5X5CDropSholder &&
                price_2p5X5CDropSholder &&
                price_2p5X2p5CDropSholder 
            ).totalPrice;
            totalFrontSidePrintCostCDropSholder+=totalPrice;
            // Back side dtf cost plus additional cost
            backSidePrintCost = backsiideFormulaDropSholderHoodie(
              selectedItem?.perItemQuantity,
           
              sumofTQuansityForIndividualDetailArrCHoodie,
                printSizeBack,
               printSide,
               backSideDtfprice_11p7x16p5CustomDropSholder,
  backSideDtfprice_10x14CustomDropSholder,
  backSideDtfprice_10x10CustomDropSholder,
  backSideDtfprice_10x5CustomDropSholder,
  backSideDtfprice_5X5CustomDropSholder,
  backSideDtfprice_2p5X5CustomDropSholder,
  backSideDtfprice_2p5X2p5CustomDropSholder,
  additionalCost,
            ).backDtfAndAdditionalCost;
            totalBackSidePrintCostCDropSholder+=backSidePrintCost
            if (addBrandLogoArray[i] || individualProduct?.brandLogo !== null) {
                let brandLogoCost = 5 * individualProduct?.totalQuantity;
                //  totalBrandLogoCost+=brandLogoCost;
                printbazcostbaseCHoodie = Number(totalFrontSidePrintCostCDropSholder) + Number(totalBackSidePrintCostCDropSholder) + brandLogoCost;
                printbazcostCDropSholder = printbazcostbaseCDropSholder;
               
            } else {
              printbazcostbaseCHoodie = Number(totalFrontSidePrintCostCDropSholder) + Number(totalBackSidePrintCostCDropSholder);
              printbazcostCDropSholder = printbazcostbaseCDropSholder;
            
        
            }
          
           
           
        });
    }
      else  if (
        (selectedItem?.productType === "orderDetailArr") &&
        selectedItem?.perItemQuantity &&
        totalQuantityCustomRoundNeck &&
        selectedItem?.individualProductArr &&
        selectedItem?.individualProductArr.length &&
        price_10x14CRoundNeck &&
        price_10x10CRoundNeck &&
        price_10x5CRoundNeck &&
        price_5X5CRoundNeck &&
        price_2p5X5CRoundNeck &&
        price_2p5X2p5CRoundNeck
    ) {
      let totalBackSidePrintCostCRoundNeck=0;
      let totalFrontSidePrintCostCRoundNeck=0;
        selectedItem?.individualProductArr?.forEach((individualProduct) => {
            const {
                printSize,
                printSizeBack,printSide,totalQuantity
                // Added to get the size
                // Add other properties as needed
            } = individualProduct;

            // Your existing logic goes here
            const totalPrice = teeShirtFormula(
               // formData?.quantity,
                selectedItem?.perItemQuantity,
                totalQuantity,
                printSize,
                price_10x14CRoundNeck,
      price_10x10CRoundNeck,
      price_10x5CRoundNeck,
      price_5X5CRoundNeck,
      price_2p5X5CRoundNeck,
      price_2p5X2p5CRoundNeck
            ).totalPrice;

            // Back side dtf cost plus additional cost
            backSidePrintCost = backsideFormula(
              selectedItem?.perItemQuantity,
              sumofTQuansityForIndividualDetailArrCRoundNeck,
                printSizeBack,
               printSide,
               backSideDtfprice_10x14CustomRoundNeck,
               backSideDtfprice_10x10CustomRoundNeck,
               backSideDtfprice_10x5CustomRoundNeck,
               backSideDtfprice_5X5CustomRoundNeck,
               backSideDtfprice_2p5X5CustomRoundNeck,
               backSideDtfprice_2p5X2p5CustomRoundNeck,
               additionalCost,
            ).backDtfAndAdditionalCost;
            totalBackSidePrintCostCRoundNeck += backSidePrintCost;
            totalFrontSidePrintCostCRoundNeck += totalPrice;

            if (addBrandLogoArray[i] || individualProduct?.brandLogo !== null) {
                let brandLogoCost = 5 * individualProduct?.totalQuantity;
                // totalBrandLogoCost+=brandLogoCost;
                printbazcostbaseCRoundNeck = Number(totalFrontSidePrintCostCRoundNeck) + Number(totalBackSidePrintCostCRoundNeck) + brandLogoCost;
                printbazcostCRoundNeck = printbazcostbaseCRoundNeck;
              
          
            } 
            else {
              printbazcostbaseCRoundNeck = Number(totalFrontSidePrintCostCRoundNeck) + Number(totalBackSidePrintCostCRoundNeck);
              printbazcostCRoundNeck = printbazcostbaseCRoundNeck;
            
          
            }
            
           
        });
      
    }
   else if (
      selectedItem?.productType === "orderDetailArrBlankRoundNeck" &&
      selectedItem?.perItemQuantity &&
      totalQuantityBlankRNeck &&
      selectedItem?.individualProductArr &&
      selectedItem?.individualProductArr.length 
    ){
      printbazcostbaseBlankRoundNeck=selectedItem?.perItemQuantity * blankRoundNeckFilter?.frontSideprice
    
      printbazcostBRoundNeck =printbazcostbaseBlankRoundNeck
      
    }
   else if (
      selectedItem?.productType === "orderDetailArrBlankHoodie" &&
      selectedItem?.perItemQuantity &&
      totalQuantityBlankHoodie &&
      selectedItem?.individualProductArr &&
      selectedItem?.individualProductArr.length 
    ){
      printbazcostbaseBlankHoodie=selectedItem?.perItemQuantity * blankHoodieFilter?.frontSideprice
    
      printbazcostBHoodie =printbazcostbaseBlankHoodie
      
    }
   else if (
      selectedItem?.productType === "orderDetailArrBlankDropSholder" &&
      selectedItem?.perItemQuantity &&
      totalQuantityBlankDropSholder &&
      selectedItem?.individualProductArr &&
      selectedItem?.individualProductArr.length 
    ){
      printbazcostbaseBlankDropSholder=selectedItem?.perItemQuantity * blankDropSholderFilter?.frontSideprice
     
      printbazcostBDropsholder =printbazcostbaseBlankDropSholder
      
    }
     
  }
  printbazcost=printbazcostCHoodie+printbazcostCRoundNeck+printbazcostCDropSholder+printbazcostBRoundNeck+printbazcostBHoodie+printbazcostBDropsholder


// Output results
  if(formData?.dsicount){
    printbazcost=printbazcost-Number(formData?.dsicount)
  }
  
  if(formData?.additionalCost){
    printbazcost=printbazcost+Number(formData?.additionalCost)
  }


 


 
const handleInputChange = (event, orderIndex, productIndex) => {
  const { name, value } = event.target;
  const color = event.target.closest('.card-title')?.getAttribute('data-color');

  setFormData((prevState) => {
  let updatedItem;
    let newSelectedItemsDetailArr = prevState?.selectedItemsDetailArr?.map((item, i) => {
      let updatedProduct;
      if (i === orderIndex && item.color === color) {
         updatedItem = {
          ...item,
          individualProductArr: item.individualProductArr.map((product, j) => {
            if (j === productIndex) {
            
              if (name === 'color' || name === 'teshirtSize' || name === 'printSize' || name === 'printSide' || name === 'printSizeBack') {
                // Handle different properties individually
                if (name === 'teshirtSize') {
                  updatedProduct = {
                    ...product,
                    [name]: {
                      ...product[name],
                      [event.target.getAttribute('data-size')]: value,
                    },
                  };
                } else {
                  updatedProduct = { ...product, [name]: value };
                }
              } else if (name.startsWith('quantity')) {
                updatedProduct = { ...product, [name]: value };
              }

             
                updatedProduct.totalQuantity = calculateTotalQuantity(updatedProduct);
              

              return updatedProduct;
            }
            return product;
          }),
        };
        
        // Update perItemQuantity based on the updated item
        updatedItem.perItemQuantity = calculatePerItemQuantity(updatedItem);
        // updatedItem.printbazcost = calculateIndividualPrintBazCost(item,i,updatedProduct.totalQuantity);

        if (item?.productType === "orderDetailArr" && totalQuantityCustomRoundNeck > 0) {
         
          updatedItem.printbazcost =printbazcostCRoundNeck;
        }
        // Update printbazcost based on the updated item
        if (item?.productType === "orderDetailArrCustomHoodie" && totalQuantityCustomHoodie > 0) {
          
          updatedItem.printbazcost =printbazcostCHoodie;
        }
        if (item?.productType === "orderDetailArrCustomDropSholder" && totalQuantityCustomDropSholder > 0) {
         
          updatedItem.printbazcost =printbazcostCDropSholder;
        }

       

        return updatedItem; // Return the updated item
      }

      return item;
    });

    // Calculate new grand quantity based on the updated data
    const newGrandQuantity = newSelectedItemsDetailArr.reduce((acc, item) => acc + item.perItemQuantity, 0);

    // Calculate new printbazcost based on the updated data
    const newPrintBazCost = newSelectedItemsDetailArr.reduce((acc, item) => acc + item.printbazcost, 0);


    return { ...prevState, [name]: value,selectedItemsDetailArr: newSelectedItemsDetailArr, quantity: newGrandQuantity, printbazcost: printbazcost};
  });
  // setFormData({ ...formData, [name]: value});
};


// Function to calculate totalQuantity based on quantity fields
const calculateTotalQuantity = (product) => {
  // Add your logic here based on your quantity fields
  return Object.entries(product)
    .filter(([key, value]) => key.startsWith('quantity') && value !== "")
    .reduce((acc, [key, quantity]) => acc + parseInt(quantity), 0);
};




// Function to calculate perItemQuantity based on individual product quantities
const calculatePerItemQuantity = (orderItem) => {
  return orderItem.individualProductArr?.reduce((total, product) => {
      return total + safeParseInt(product.quantityM) + safeParseInt(product.quantityL) +
          safeParseInt(product.quantityXL) + safeParseInt(product.quantityXXL) +
          safeParseInt(product.quantityXXXL);
  }, 0);
};





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
    const weightPerHoodie=0.465;
    const weightPerDropSholder=0.205;
    const extraInSideDhakaChange=15
    const extraOutSideDhakaChange=25
    let grandQuantity=formData?.quantity
  
    let deliveryFee = 0; // Initialize fees as 0
   let totalWeight=(totalQuantityCustomHoodie*weightPerHoodie)+
  (totalQuantityCustomRoundNeck*weightPerShirt)+
 (totalQuantityCustomDropSholder*weightPerDropSholder)+
 (totalQuantityBlankDropSholder*weightPerDropSholder)+
 (totalQuantityBlankHoodie*weightPerHoodie)+
 (totalQuantityBlankRNeck*weightPerShirt)
    // Check if grandQuantity is defined and greater than 0
    if (grandQuantity && grandQuantity > 0) {
      deliveryFee = deliveryCharge({
        grandQuantity: grandQuantity,
        totalWeight: totalWeight,
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
  
        let recvMoney = 0;
        let costHandlingfee;
        let recvMoneyWithouthandling = 0;
        recvMoneyWithouthandling = Number(
          Math.ceil(formData.collectAmount - (Number(printbazcost) + deliveryFee))
        );
        // costHandlingfee = recvMoneyWithouthandling * 0.02;
        costHandlingfee = Number(formData.collectAmount * 0.03);
        recvMoney = recvMoneyWithouthandling - costHandlingfee;
        let suggestedCollectAmount = Math.ceil((1 + Number(printbazcost)  + deliveryFee) / 0.97);
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
        let orderTotalCalculation=printbazcost+deliveryFee-Number(formData?.dsicount);
        
        let grandCost=Math.ceil(orderTotalCalculation+(orderTotalCalculation*0.03))
         
      
  const handleUpdate=async(e)=>{
    e.preventDefault()
    
    setIsLoading(true)
    // Validate the form here
    if (validateForm()) {
      setIsLoading(false);
      return; 
    }
try{
  const formDataSendOrdertoServer = new FormData();

 
  // Iterate over each item in selectedItemsDetailArr
  formData.selectedItemsDetailArr?.forEach((item, index) => {
   const filesAndImagesArr = [];
           
   // Iterate over each individual product in individualProductArr
   item?.individualProductArr?.forEach(async(product, productIndex) => {
     const fileAndImageData = {};
     // console.log("item.brandLogo",item.brandLogo);
     if (product.file) {
      product.file.forEach((files, fileIndex) => {
       
  
        console.log("files...",files)
        formDataSendOrdertoServer.append(`file${index}_${fileIndex}_${files?.uniqueIdentifier}`, files); // Append each image
      });
    }
    
     if (product.image) {
       product.image.forEach((images, imageIndex) => {
         formDataSendOrdertoServer.append(`image${index}_${imageIndex}_${images?.uniqueIdentifier}`, images); // Append each image
       });
     }   
     if (product.brandLogo) {
       product.brandLogo.forEach((logo, logoIndex) => {
         formDataSendOrdertoServer.append(`brandLogo${index}_${logoIndex}_${logo?.uniqueIdentifier}`, logo); // Append each image
       });
     }   
  
   
 
 if (Object.keys(fileAndImageData).length) {
       filesAndImagesArr.push(fileAndImageData);
     }

     formDataSendOrdertoServer.append(`color${index}_${productIndex}`, product.color);
     formDataSendOrdertoServer.append(`productType${index}_${productIndex}`, product.productType);
     formDataSendOrdertoServer.append(`teshirtSize${index}_${productIndex}`, product.teshirtSize);
     formDataSendOrdertoServer.append(`quantityM${index}_${productIndex}`, product.quantityM);
     formDataSendOrdertoServer.append(`quantityL${index}_${productIndex}`, product.quantityL);
     formDataSendOrdertoServer.append(`quantityXL${index}_${productIndex}`, product.quantityXL);
     formDataSendOrdertoServer.append(`quantityXXL${index}_${productIndex}`, product.quantityXXL);
     formDataSendOrdertoServer.append(`quantityXXXL${index}_${productIndex}`, product.quantityXXXL);
     formDataSendOrdertoServer.append(`printSize${index}_${productIndex}`, product.printSize);
     formDataSendOrdertoServer.append(`printSizeBack${index}_${productIndex}`, product.printSizeBack);
     formDataSendOrdertoServer.append(`printSide${index}_${productIndex}`, product.printSide);
     formDataSendOrdertoServer.append(`totalQuantity${index}_${productIndex}`, product.totalQuantity);
   });
   formDataSendOrdertoServer.append(`printbazcost${index}`,item.printbazcost);
   formDataSendOrdertoServer.append(`quantity${index}`,item.quantity);
 return item
 });
   formDataSendOrdertoServer.append('selectedItemsDetailArr', JSON.stringify(formData?.selectedItemsDetailArr)); // Add your data as a JSON string
   formDataSendOrdertoServer.append("name",formData?.name);
   formDataSendOrdertoServer.append("lastName",formData?.lastName);
   formDataSendOrdertoServer.append("companyName",formData?.companyName);
   formDataSendOrdertoServer.append("phone",formData?.phone);
   formDataSendOrdertoServer.append("userMail",formData?.userMail);
   formDataSendOrdertoServer.append("regId",formData?.regId);
   formDataSendOrdertoServer.append('createdAt', formattedDate);
   formDataSendOrdertoServer.append('clientName', formData?.clientName);
   formDataSendOrdertoServer.append('clientbrandName', formData?.clientbrandName);
  //  formDataSendOrdertoServer.append('clientPhone', formData?.clientPhone);
   formDataSendOrdertoServer.append("address",formData?.address);
   formDataSendOrdertoServer.append("instruction",formData?.instruction);
   formDataSendOrdertoServer.append("districts",formData?.districts);
   formDataSendOrdertoServer.append("zones",formData?.zones);
   formDataSendOrdertoServer.append("areas",formData?.areas);
   formDataSendOrdertoServer.append("grandQuantity",formData?.quantity);
   formDataSendOrdertoServer.append("grandCost",grandCost);
   formDataSendOrdertoServer.append("printbazcost",printbazcost);
   formDataSendOrdertoServer.append("deliveryFee",formData?.deliveryFee);
   formDataSendOrdertoServer.append("dsicount",formData?.dsicount);
   formDataSendOrdertoServer.append("additionalCost",formData?.additionalCost);
   formDataSendOrdertoServer.append("discountNote",formData?.discountNote);
   formDataSendOrdertoServer.append("additionalCostNote",formData?.additionalCostNote);
   formDataSendOrdertoServer.append("collectAmount",formData?.collectAmount);
   formDataSendOrdertoServer.append("recvMoney",recvMoney);
  //  formDataSendOrdertoServer.append("orderCreatedAt",formData?.orderCreatedAt);
  //  formDataSendOrdertoServer.append("paymentSystem",formData?.paymentSystem);
  //  formDataSendOrdertoServer.append("orderStatus",formData?.orderStatus);
  //  formDataSendOrdertoServer.append("paymentStatus",formData?.paymentStatus);
 

                 const response = await fetch(`https://mserver.printbaz.com/updateneworder/${getSpecificOrderById?._id}`, {
                //  const response = await fetch(`http://localhost:5000/updateneworder/${getSpecificOrderById?._id}`, {
                   method: "PUT",
                   body: formDataSendOrdertoServer,
                 });
             
                 if (response.ok) {
                   const result = await response.json();
                   // console.log("Success:", result);
                   // console.log('API response:', response);
                   setShowAlert(true);
                 } else {
                   throw new Error('API error: ' + response.status);
                 }
}
 catch  (error){
  console.error('API error:', error.message);
 }   
 finally {
  setIsLoading(false); // Set loading status to false
}
  }  
       

     
          const numObjects = formData?.selectedItemsDetailArr?.length;

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
      
          if (getSpecificOrderById?.grandQuantity!=formData?.quantity){
      
          }
          if (getSpecificOrderById?.dsicount!=formData?.dsicount){
       
          }
          if (getSpecificOrderById?.additionalCost!=formData?.additionalCost ){
      
          }
          if (hasSize!==false){
         
          }

      let finalPrintbazcost=0    
      if((getSpecificOrderById?.quantity!==formData?.quantity)|| (getSpecificOrderById?.dsicount!==formData?.dsicount) || (getSpecificOrderById?.additionalCost!== formData?.additionalCost) || hasSize===true || hasLogo===true ){
        finalPrintbazcost=printbazcost
      

      }
      else{
        finalPrintbazcost=formData?.printbazcost
      
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


{
      formData?.selectedItemsDetailArr
      ?.map((insideDetail,orderIndex)=> 
  
        insideDetail?.individualProductArr?.map((item,index)=>{
          const maxIndex = insideDetail?.individualProductArr?.length || 1;
          const uniqueIndex = orderIndex * maxIndex + index;
    
          return(
            <Col key={uniqueIndex} >
                <input type="hidden" name="uniqueIndex" value={uniqueIndex} />
       
            <Card >
                <Card.Title className='m-auto p-3' style={{backgroundColor:"#001846",color:"white",width:"100%",textAlign:"center"}}>{item.color}
                    <input data-color={item.color} name="color" type="hidden" value={item.color} />
                    <p style={{color:"orange",textAlign:"center"}}>{item?.productType}</p>
                    {/* <p style={{color:"orange",textAlign:"center"}}>{index}{uniqueIndex}</p> */}
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
                            onChange={(e) => handleInputChange(e,orderIndex, index)}
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
                            onChange={(e) => handleInputChange(e,orderIndex, index)}
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
                            onChange={(e) => handleInputChange(e,orderIndex, index)}
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
                            onChange={(e) => handleInputChange(e,orderIndex, index)}
                        />
                    </ListGroup.Item>  
                       <ListGroup.Item className="d-flex align-items-center">
                        <span value="XXXL">3XL</span>
                        <input 
                            data-size="XXXL"
                            data-color={item.color}
                            name="quantityXXXL"
                            type="number"
                            value={item.quantityXXXL}
                            style={{marginLeft:"auto",height:"30px",border:"1px solid #ddd8d8"}}
                            onChange={(e) => handleInputChange(e,orderIndex, index)}
                        />
                    </ListGroup.Item>  
                </ListGroup>
               
                {
                (  insideDetail?.productType==="orderDetailArr"||
                   insideDetail?.productType==="orderDetailArrCustomDropSholder"||
                   insideDetail?.productType==="orderDetailArrCustomHoodie") &&
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
                                 onChange={(e) => handleInputChange(e,orderIndex, index)}
                                 name="printSide"
                                 required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL|| item.quantityXXXL}
                                 
                                 
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
                                 onChange={(e) => handleInputChange(e,orderIndex, index)}
                                 name="printSize"
                                 required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL || item.quantityXXXL}
                               >
                                <option value="">select print size</option> 
                                 <option value="11.7 x 16.5">11.7″ x 16.5″</option> 
                              
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
                                 onChange={(e) => handleInputChange(e,orderIndex, index)}
                                 name="printSize"
                                 required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL|| item.quantityXXXL}
                               >
                                <option value="">select print size</option> 
                               <option value="11.7 x 16.5">11.7″ x 16.5″</option> 
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
                                 onChange={(e) => handleInputChange(e,orderIndex, index)}
                                 name="printSize"
                                 required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL|| item.quantityXXXL}
                               >
                                <option value="">select print size</option> 
                            
                                 <option value="10 x 14">10″ x 14″</option>
                                 <option value="10 x 10">10″ x 10″</option>
                                 <option value="10 x 5">10″ x 5″</option>
                                 <option value="5 X 5">5″ x 5″</option>
                                 <option value="2.5 X 5">2.5″ x 5″</option>
                                 <option value="2.5 X 2.5">2.5″ x 2.5″</option>     
                                  <option value="11.7 x 16.5">11.7″ x 16.5″</option> 
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
                               onChange={(e) => handleInputChange(e,orderIndex, index)}
                              
                               required={item.quantityM || item.quantityL || item.quantityXL || item.quantityXXL || item.quantityXXXL}
                             >
                              <option value="">select print size</option>
                               <option value="11.7 x 16.5">11.7″ x 16.5″</option>  
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
           
   
             if (singleFile instanceof File) {
              // Local file
              filePreviewURL = URL.createObjectURL(singleFile);
            }
              else{
                filePreviewURL =`https://drive.google.com/file/d/${singleFile?.fileId}/preview`;
           
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
                   onChange={(e) => handleFileChange(e, orderIndex, index,"file", fileIndex)}
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
                                     if (singleImage instanceof File) { // singleFile is a file object
                                        imagePreviewURL = URL.createObjectURL(singleImage);
                                       }
                                       else{
                                        imagePreviewURL =`https://drive.google.com/file/d/${singleImage?.fileId}/preview`;
                                    
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
                                         onChange={(e) => handleFileChange(e, orderIndex, index,"image",imageIndex)}
                                         accept=".ai,.eps,.psd,.pdf,.svg,.png"
                                         multiple
                                       />
                                     </div>
                                     
                                     )
                                         }
                                      ) }
                          
                             </Form.Group>
                      
         
         {/* <Form.Group  className="mb-3">
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
           
          
         </Form.Group>
          */}
             <Form.Group  className="mb-3">
              {
                item?.brandLogo &&
                <Form.Label>BrandLogo(optional)</Form.Label>
              }
                        
                               {
                                    item?.brandLogo?.map((logo,logoIndex)=>{
                                     let fileId, logoPreviewURL;
                                     if (logo instanceof File) { // singleFile is a file object
                                      logoPreviewURL = URL.createObjectURL(logo);
                                       }
                                       else{
                                        logoPreviewURL =`https://drive.google.com/file/d/${logo?.fileId}/preview`;
                                    
                                       }
                                      
                                       
                                     return(
                                       <div style={{ marginBottom:"55px", height: "150px", width: "100%"  }} key={logoIndex} >
               
              
                                       <iframe
                                       src={logoPreviewURL}
                                       style={{
                                       
                                         width: "100%",
                                         height: "100%",
                                         overflow:"auto",
                                         // marginBottom:'10px',
                                       //  pointerEvents: "none",
                                         border: "none",
                                       }}
                                       title={`brandLogo-${logoIndex}`}
                                     ></iframe>
                                    
                                 
                               
                                       <Form.Control
                                         type="file"
                                         name="brandLogo"
                                         id={`logoInput-${logoIndex}`}
                                        
                                         style={{position:"absolute",width:"85%",display:"" }}
                                         onChange={(e) => handleFileChange(e, orderIndex, index,"brandLogo", logoIndex)}
                                         accept=".ai,.eps,.psd,.pdf,.svg,.png"
                                         
                                       />
                                     </div>
                                     
                                     )
                                         }
                                      ) }
                          
                             </Form.Group>
                    
         
                </Card.Body>
                }
                
            </Card>
            </Col>
          )
        }
       
        )
 )
    }

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
                    <Form.Label>Printbaz Cost ..</Form.Label>
                       <Form.Group className="mb-3 ">
                     
                   
                      <Form.Control
                        type="number"
                        name="printbazcost"
                        // value={printbazcost}
                        value={formData?.printbazcost}
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
        
                  </div>
</div>


</Form> 
             
          
      </div>
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

NewUpdateOrder.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NewUpdateOrder;
