
import React from 'react';

const backsideFormula = (
    quantity,
    totalQuantity,
    printSizeBack,
    printSide,
    backSideDtfprice_10x14CustomRoundNeck,
    backSideDtfprice_10x10CustomRoundNeck,
    backSideDtfprice_10x5CustomRoundNeck,
    backSideDtfprice_5X5CustomRoundNeck,
    backSideDtfprice_2p5X5CustomRoundNeck,
    backSideDtfprice_2p5X2p5CustomRoundNeck,
    additionalCost,
   
    ) => {
        const safeParseInt = (str) => {
            const value = parseInt(str);
            return isNaN(value) ? 0 : value;
        };
let selectedSizes = [];    
let backDtfAndAdditionalCost=0
// let totalQuantity = formData?.orderDetailArr[i]?.totalQuantity;
// backSidePrintCost += totalQuantity * 130;
if(printSide==="bothSide" && printSizeBack==="10 x 14"){
    backDtfAndAdditionalCost+= totalQuantity * Number(backSideDtfprice_10x14CustomRoundNeck)+Number(additionalCost)
}
else if(printSide==="bothSide" &&printSizeBack==="10 x 10"){
    backDtfAndAdditionalCost+= totalQuantity * Number(backSideDtfprice_10x10CustomRoundNeck) +Number(additionalCost)
} else if(printSide==="bothSide" && printSizeBack==="10 x 5"){
    backDtfAndAdditionalCost+= totalQuantity * Number(backSideDtfprice_10x5CustomRoundNeck)+Number(additionalCost)
} else if(printSide==="bothSide" && printSizeBack==="5 X 5"){
    backDtfAndAdditionalCost+=totalQuantity * Number(backSideDtfprice_5X5CustomRoundNeck)+Number(additionalCost)
}
else if(printSide==="bothSide" && printSizeBack==="2.5 X 5"){
    backDtfAndAdditionalCost+= totalQuantity * Number(backSideDtfprice_2p5X5CustomRoundNeck)+Number(additionalCost)
}
  else if(printSide==="bothSide" && printSizeBack==="2.5 X 2.5"){
    backDtfAndAdditionalCost+= totalQuantity * Number(backSideDtfprice_2p5X2p5CustomRoundNeck)+Number(additionalCost)
}



  console.log("backDtfAndAdditionalCost from round neck",backDtfAndAdditionalCost);  
  return ({ backDtfAndAdditionalCost: backDtfAndAdditionalCost });
};

export default backsideFormula;