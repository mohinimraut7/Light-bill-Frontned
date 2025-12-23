const handleSaveConsumerDetails = () => {
  if (!jakraKramank || !consumerNumber || !date) {
    setSnackbarMessage('Please fill all consumer details');
    setSnackbarOpen(true);

    setPdfData({ jakraKramank, consumerNumber, date });
    setPdfPreviewOpen(true);

    handleCloseFaultyMeterModal();
    return;
  }
function convertToMarathiDigits(numberStr) {
  const marathiDigits = ['०','१','२','३','४','५','६','७','८','९'];
  return String(numberStr).split('').map(char =>
    /\d/.test(char) ? marathiDigits[parseInt(char)] : char
  ).join('');
}

  console.log('Consumer details saved:', { jakraKramank, consumerNumber, date });

  setSnackbarMessage('Consumer details saved successfully!');
  setSnackbarOpen(true);
  setFaultyMeterModalOpen(false);

  // Generate the PDF
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  doc.addFileToVFS("DVOTSurekh_B_Ship.ttf", DVOTSurekhBShip);
  doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
  loadDvoSBShipFont(doc);
  doc.setFont("DVOTSurekh_B_Ship");
  doc.setFontSize(12);

  const pageWidth = doc.internal.pageSize.getWidth();
  const leftX = 10;
  const centerX = pageWidth / 2 - 10;
  const rightX = pageWidth - 60;
  let y = 20;

  // Add ward logo
  const isPrivilegedUser = ['Executive Engineer', 'Admin', 'Super Admin'].includes(user.role) || (user.role === 'Junior Engineer' && user.ward === 'Head Office');
  const selectedWard = isPrivilegedUser ? wardName : user.ward;

  // const addressImage = getWardAddressImage(selectedWard);
  // if (addressImage) {
  //   doc.addImage(addressImage, 'PNG', leftX, y, 50, 28);
  // }


 const addressLines = wardAddressTextMap[selectedWard];

  if (addressLines && addressLines.length > 0) {
    doc.setFontSize(11);
    let addrY = y + 4;

    addressLines.forEach(line => {
      doc.text(line, leftX, addrY);
      addrY += 5;
    });
  

  // Phone
  const phoneText = ": ०२५०-२३३४१४४";
  const phoneTextWidth = doc.getTextWidth(phoneText);
  doc.addImage(FADurdhwani, 'PNG', rightX - phoneTextWidth - 15 + 50, y - 1.2, 15, 5.2);
  doc.text(phoneText, rightX - phoneTextWidth + 50, y + 2.5);

  // Fax
  const faxText = ": ०२५०-२५२५१०७";
  const faxTextWidth = doc.getTextWidth(faxText);
  doc.addImage(FAFax, 'PNG', rightX - faxTextWidth - 13 + 48 - 0.3, y + 5.5, 12, 5);
  doc.text(faxText, rightX - faxTextWidth + 47, y + 9.5);

  // जा.क्र.
  const jaKraSuffix = " :";
  const jaKraTextWidth = doc.getTextWidth(jaKraSuffix);
  doc.addImage(FAJaKra, 'PNG', rightX - jaKraTextWidth - 12 + 15, y + 13, 12, 4);
  doc.text(jaKraSuffix, rightX - jaKraTextWidth + 15, y + 17);
  doc.addImage(FAJakraFirstValue, 'PNG', rightX - jaKraTextWidth + 16, y + 11.8, 29,7);

 


if (jakraKramank) {
    const marathiJakra = convertToMarathiDigits(jakraKramank); 
  doc.setFontSize(12); // 1pt ने कमी
  doc.text(
    // String(jakraKramank),
    marathiJakra,
    rightX - jaKraTextWidth + 18 + 26 + 2 - 1, // 1px left
    y + 16.7 // 1px up
  );
  doc.setFontSize(12); // reset font size if needed
}


  // दिनांक
  const formattedDate = new Date(date).toLocaleDateString('mr-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  doc.text(reverseDevanagariIfContainsViOrLi(`दिनांक : ${formattedDate}`), rightX+1, y + 24);

  // Center logo
  const logoWidth = 30;
  const logoHeight = 30;
  doc.addImage(logovvcmccmp, 'PNG', centerX, 15, logoWidth, logoHeight);

  y += 36;
  doc.line(10, y - 2, pageWidth - 10, y - 2);
  y += 15;

  // Add prati image
  const pratiImage = getWardPrati(selectedWard);
  if (pratiImage) {
    doc.addImage(pratiImage, 'PNG', leftX, y, 50, 28);
    y += 28 + 12;
  }

  doc.setFontSize(15);

  // Center heading
  const headingY = 100 + 7;
  const updatedWidth = 46;
  const updatedHeight = 7.2;
  const imageX = (pageWidth - updatedWidth) / 2;
  doc.addImage(FAFaultyMeterBabat, 'PNG', imageX, headingY, updatedWidth+2, updatedHeight-1);

  // 🔒 Optionally add consumer number/date inside the PDF body
  // doc.text(`Customer No: ${consumerNumber}`, 20, headingY + 20);

  // Output
let currentY;
currentY += updatedHeight + 30;



 
const normalSpacing = 8;
const extraSpacing = 14;
const leftspaceX = leftX + 15;
 doc.setFontSize(14); 
y += 10;
 




const imageWidth = 75;
const imageHeight = 6;

const prabhagImageWidth = 75;
const prabhagImageHeight = 6;


doc.addImage(FAMahodayUproktaVishayanwaye, 'PNG', leftspaceX, y+6, imageWidth, imageHeight);


const gapBetweenImages = 1;
const secondImageX = leftspaceX + imageWidth + gapBetweenImages;

doc.addImage(FAVVCMCPrabhagSamiti, 'PNG', secondImageX, y+6, prabhagImageWidth, prabhagImageHeight);

y += Math.max(imageHeight, prabhagImageHeight) + normalSpacing;

const grahakIconWidth = 16;
const grahakIconHeight = 6;

// Draw FAGrahakK icon on left
doc.addImage(FAGrahakK, 'PNG', leftspaceX, y, grahakIconWidth, grahakIconHeight);

// Draw Consumer Number next to icon
// if (consumerNumber) {
//   doc.setFontSize(8);
//   doc.text(`${consumerNumber}`, leftspaceX + grahakIconWidth + 2, y + 4);
// }

if (consumerNumber) {
  const marathiConsumerNumber = convertToMarathiDigits(consumerNumber); // ← मराठीत रूपांतर
  doc.setFontSize(11);
  doc.text(
    marathiConsumerNumber,
    leftspaceX + grahakIconWidth + 2+1,
    y + 4
  );
}

// Draw FAGrahakKRaBadali image on same line (next to consumer number)
const grahakTextWidth = doc.getTextWidth(consumerNumber || '');
const grahakImageStartX = leftspaceX + grahakIconWidth + 2 + grahakTextWidth + 4; // Add margin after text

const grahakImageWidth = 99;
const grahakImageHeight = 5;
doc.addImage(FAGrahakKRaBadali, 'PNG', grahakImageStartX, y, grahakImageWidth-3.8, grahakImageHeight+0.8);



y += grahakImageHeight + 2;

// Add FAGrahakKNextNavinMeter image on new line
const navinMeterWidth = 70;
const navinMeterHeight = 5;
doc.addImage(FAGrahakKNextNavinMeter, 'PNG', leftspaceX, y, navinMeterWidth-4, navinMeterHeight+0.8);




const jenekarunImageWidth = 150;
const jenekarunImageHeight = 6;
y += grahakImageHeight + 2;
doc.addImage(FAJenekarunBillBharneSopeHoil, 'PNG', leftspaceX, y, jenekarunImageWidth, jenekarunImageHeight);

// Prepare y for next content
y += jenekarunImageHeight + 2;


const navinMeterImageWidth = 150; 
const navinMeterImageHeight = 6; 


doc.addImage(FANavinMeterBasavinycheMaganipatrak, 'PNG', leftspaceX, y, navinMeterImageWidth, navinMeterImageHeight);


y += navinMeterImageHeight + 2;
   
    y = 240;
const signatureX = pageWidth - 60;


let prabhagSamitiText = "प्रभाग समिती";

if (user?.ward === "Ward-A") {
  prabhagSamitiText = "प्रभाग समिती अ";
} else if (user?.ward === "Ward-B") {
  prabhagSamitiText = "प्रभाग समिती बी";
} else if (user?.ward === "Ward-C") {
  prabhagSamitiText = "प्रभाग समिती सी";
} else if (user?.ward === "Ward-D") {
  prabhagSamitiText = "प्रभाग समिती डी";
} else if (user?.ward === "Ward-E") {
  prabhagSamitiText = "प्रभाग समिती 'ई'";
} else if (user?.ward === "Ward-F") {
  prabhagSamitiText = "प्रभाग समिती एफ";
} else if (user?.ward === "Ward-G") {
  prabhagSamitiText = "प्रभाग समिती जी";
} else if (user?.ward === "Ward-H") {
  prabhagSamitiText = "प्रभाग समिती एच";
} else if (user?.ward === "Ward-I") {
  prabhagSamitiText = "प्रभाग समिती आय";
}


;


const rightPadding = 100;
const rightlX = pageWidth - 10; 



const wardImageMap = {
  'Ward-A': FAAdhikshakWardA,
  'Ward-B': FAAdhikshakWardB,
  'Ward-C': FAAdhikshakWardC,
  'Ward-D': FAAdhikshakWardD,
  'Ward-E': FAAdhikshakWardE,
  'Ward-F': FAAdhikshakWardF,
  'Ward-G': FAAdhikshakWardG,
  'Ward-H': FAAdhikshakWardH,
  'Ward-I': FAAdhikshakWardI,
};

// const isPrivilegedUser =
//   user.role === 'Executive Engineer' ||
//   user.role === 'Admin' ||
//   user.role === 'Super Admin' ||
//   (user.role === 'Junior Engineer' && user.ward === 'Head Office');


// const selectedWard = isPrivilegedUser ? wardName : user.ward;

const adhikshakImage = wardImageMap[selectedWard];






if (adhikshakImage) {
  const adhikshakImageWidth = 60;
  const adhikshakImageHeight = 20;

  doc.addImage(
    adhikshakImage,
    'PNG',
    rightlX - adhikshakImageWidth,
    y - 50, // shifted 15px upward
    adhikshakImageWidth,
    adhikshakImageHeight
  );

  y += adhikshakImageHeight + 2;
}


  
  const pdfData = doc.output('datauristring');
  const pdfBlob = doc.output('blob');
  const url = URL.createObjectURL(pdfBlob);
  const type = 'faultymeter';
  const selectedMonthYear = date;

  handlePdfPreview(pdfData, type, selectedMonthYear);
  setPdfBlobUrl(url);
};

}

// =========================================




// const handleDownloadForm22 = async() => {

//  const { foundReport, reportingData } = await fetchReportData(
//     selectedMonthYear,
//     user,
//     setMode,
//     setReportingDataSM,
//     setMonthArr
//   );


//   console.log("dhdhdhdhd",monthArr)

//   const signatureMatches = checkSignatureStatusForm22(monthArr);
// console.log("signatureMatches test form22-->>",signatureMatches[0])

//   const lipikInfo = signatureMatches.find(
//   match => match.role === "Lipik" && match.checked
// );


//     if (selectedMonthYear) {
//       try {
//          const finalWard = user.ward === 'Head Office' ? wardName : user.ward;
//         const response = await axios.post(`${baseUrl}/searchReport`, {
//            ward:finalWard,
//           month: selectedMonthYear,
//         });
//         const foundReport = response.data;
        
//         if (foundReport && foundReport[0] && foundReport[0].monthReport === selectedMonthYear) {
//           setMode('edit');
//         } else {
//           setMode('create');
//         }
//       } catch (error) {
//         console.error("Error searching for report:", error);
//       }
//     }
    
//     setShowFormControl(true); 
    
//     try {
   
//       const doc = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: 'a4'
//       });
      
      
//       doc.addFileToVFS("DVOTSurekh_B_Ship.ttf", DVOTSurekhBShip);
//       doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
//       loadDvoSBShipFont(doc);
//       doc.setFont("DVOTSurekh_B_Ship");
      
     
//       let yPos = 15;
      
     
//       doc.setFontSize(10);
//       doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
//       doc.text("M.S.C. 22", 170, yPos);
      
//       const logoWidth = 30;
//       const logoHeight = 30;
//       const logoX = 15;
//       const logoY = yPos + 10; 
      
//       const allWardNames = [...new Set(rows.map(row => row.ward))];
      
     
//       const wardnameList = allWardNames.includes(wardName)
//         ? [wardName, ...allWardNames.filter(name => name !== wardName)]
//         : allWardNames;
      
     
//       const wardname = wardnameList.join(', ');
      
//       doc.addImage(logovvcmc, 'PNG', logoX, logoY, logoWidth, logoHeight);
      
//       yPos += 20;
//       doc.setFontSize(12);
//       doc.text("नमुना नं. २२", 85, yPos);
      
//       yPos += 8;
//       doc.text(reverseDevanagariIfContainsViOrLi("(नियम २२ (१))"), 85, yPos);
      
//       yPos += 10;
//       doc.setFontSize(14);
//       doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), 65, yPos);
      
//       yPos += 15;
//       doc.setFontSize(11);
      
      
//       //doc.addImage(billkramank, 'PNG', 15, yPos - 3, 20, 5);
//       doc.addImage(billkramank, 'PNG', 14, yPos - 4, 21, 6);


//       doc.line(40, yPos, 100, yPos);
//        //doc.addImage(pramanakKramank, 'PNG', 105, yPos - 2.5, 23, 4);
//       doc.addImage(pramanakKramank, 'PNG', 104, yPos - 3.5, 28, 4.5);

      
//       doc.line(140, yPos, 170, yPos);
//       const currentDate = new Date().toLocaleDateString('en-IN');
//       doc.text(reverseDevanagariIfContainsViOrLi(`दिनांक ${currentDate}`), 150, yPos);
      
//       yPos += 10;
//       doc.text(reverseDevanagariIfContainsViOrLi("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी"), 15, yPos);
//       yPos += 8;
      
//       doc.text(`पत्ता : ${user?.ward}`, 15, yPos);
      
//       yPos += 8;
//       doc.text(reverseDevanagariIfContainsViOrLi("माल : विद्युत विभाग"), 15, yPos);
//       yPos += 8;
      
//       doc.addImage(bookRef, 'PNG', 15, yPos - 2.5, 100, 6);
      
//       const totalAmount = rows
//         .filter(row => row.monthAndYear === selectedMonthYear)
//         .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
      
//       const totalAmountInWords = (totalAmount); 
//       let l1 = fixPashchim(`पश्चिम`);
      
      
//       yPos += 10;
      
//       // -------------------------------------------------------------------
//       doc.autoTable({
//         startY: yPos,
//         head: [[
//           '', 
//           '',
//           '',
//           'दर',
//           reverseDevanagariIfContainsViOrLi('युनिट'),
//           'रक्कम\nरु.    पै.'
//         ]],
//         body: [[
//           '१',
//           reverseDevanagariIfContainsViOrLi(`वसई विरार शहर महानगरपालिका`), 
//           '',
//           '',
//           '',
//           `${totalAmount.toFixed(2)}/-`
//         ]],
        
//         foot: [[
//           { content: 'एकूण',  colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
//           { content: `${totalAmount.toFixed(2)}/-`, styles: { halign: 'right', fontStyle: 'bold' } }
//         ]],




        
//         didParseCell: function (data) {
//           // दर आणि युनिट headings vertical center साठी
//   if (
//     data.section === 'head' &&
//     (data.column.index === 0||data.column.index === 1||data.column.index === 2 || data.column.index === 3 || data.column.index === 4)
//   ) {
//     data.cell.styles.valign = 'middle'; // vertical align center
//   }
// // ------
//           if (data.section === 'body' && data.row.index === 0 && data.column.index === 1) {
//             data.cell.styles.minCellHeight = 30; 
//             data.cell.styles.textColor = [0, 0, 0];
//           }
//         },
        
//         didDrawCell: function (data) {
//           if (data.section === 'body' && data.column.index === 1 && data.row.index === 0) {
//             doc.addImage(
//               NAkaryashetraPrabhaSamiti,
//               'PNG',
//               data.cell.x + 2,
//               data.cell.y + 6.3,
//               41,             
//               5.7             
//             );
            
//             doc.setFontSize(10);
//             doc.setTextColor(0, 0, 0);
//             doc.text(
//               `${user?.ward}`,           
//               data.cell.x + 3 + 40 ,         
//               data.cell.y + 6.4 + 3.9           
//             );
            
//             doc.addImage(
//               NAVibhagatilVirarVibhagache,
//               'PNG',
//               data.cell.x + 2,
//               data.cell.y + 11.6,   
//               41,
//               4.8
//             );
//             doc.addImage(
//               NAMRaVVComMahe,
//               'PNG',
//               data.cell.x + 2,
//               data.cell.y + 17,    
//               35,
//               4.8
//             );
           
//             doc.setFontSize(8);
//             doc.setTextColor(0, 0, 0);
//             doc.text(
//               `${selectedMonthYear}`,
//               data.cell.x + 2 + 35+1, 
//               data.cell.y + 16 + 2.8+2    
//             );
//             doc.addImage(
//               NACheVidvutDeyak,
//               'PNG',
//               data.cell.x + 2,
//               data.cell.y + 22.5,   
//               26,
//               4.8
//             );
//           }

          
          
//           if (data.section === 'head') {
//             if (data.column.index === 0 && data.row.index === 0) {
//               // doc.addImage(anukramank, 'PNG', data.cell.x + 2, data.cell.y + 3, 15, 6);

//               doc.addImage(anukramank, 'PNG', data.cell.x + 2, data.cell.y + 3.7, 16.8, 6.37);

//             }
            
//             if (data.column.index === 1 && data.row.index === 0) {
//               doc.addImage(kamachaTapashil, 'PNG', data.cell.x + 2, data.cell.y + 3.7, 44, 6);
//             }

            
            
//             if (data.column.index === 2 && data.row.index === 0) {
//               // doc.addImage(parimanVajan, 'PNG', data.cell.x + 2, data.cell.y + 2, 28, 6);
//               doc.addImage(parimanVajan, 'PNG', data.cell.x + 2, data.cell.y + 2.7, 30, 7);

//             }
            
            
//           }
//         },
//         styles: {
//           font: 'DVOTSurekh_B_Ship',
//           fontSize: 10,
//           cellPadding: 2,
//           lineWidth: 0.1,
//           lineColor: [0, 0, 0]
//         },
//         headStyles: {
//           fillColor: [255, 255, 255],
//           textColor: 0,
//           lineWidth: 0.1,
//           lineColor: [0, 0, 0],
//            fontSize: 11 // default पेक्षा 1px ने वाढवले
//         },
//         bodyStyles: {
//           lineWidth: 0.1,
//           lineColor: [0, 0, 0],
//           fontSize: 11 // default पेक्षा 1px ने वाढवले
//         },
//         footStyles: {
//           fillColor: [255, 255, 255],
//           textColor: 0,
//           lineWidth: 0.1,
//           lineColor: [0, 0, 0]
//         },
//         columnStyles: {
//           0: { cellWidth: 20 },
//           1: { cellWidth: 82 },
//           2: { cellWidth: 35 },
//           3: { cellWidth: 15 },
//           4: { cellWidth: 15 },
//           5: { cellWidth: 25 }
//         },
//         theme: 'grid',
//         tableLineWidth: 0.1,
//         tableLineColor: [0, 0, 0]
//       });
      
      
    
//       yPos = doc.autoTable.previous.finalY + 10;
      
    
//       doc.setFontSize(11);
//       const pageWidth = doc.internal.pageSize.getWidth();
      
      
//       const prefix = 'एकूण रक्कम रुपये (';

//       const suffix = `${totalAmount.toFixed(2)}/-`;

//       const closingBracket = ')';
      
//       const prefixWidth = doc.getTextWidth(prefix);
//       const amountWidth = doc.getTextWidth(suffix);
//       const closingBracketWidth = doc.getTextWidth(closingBracket);
      
//       const akshariImageWidth = 14;
//       const matraImageWidth = 10;
      
//       const totalWidth = prefixWidth + akshariImageWidth + amountWidth + matraImageWidth + closingBracketWidth;
//       let currentX = (pageWidth - totalWidth) / 2;
//       const y = yPos;
      
      
//       doc.text(prefix, currentX, y);
//       currentX += prefixWidth;
      
//       // ***please dont remove this is remaining akshari logic put karane.nuntur uncomment karne
//       // doc.addImage(akshari, 'PNG', currentX, y - 4, akshariImageWidth, 4);
//       currentX += akshariImageWidth;
      
      
//       doc.text(suffix, currentX, y);
//       currentX += amountWidth;
      
      
//       doc.addImage(matra, 'PNG', currentX, y - 3, matraImageWidth, 4);
//       currentX += matraImageWidth;
      
      
//       doc.text(closingBracket, currentX, y);
      
      
//       yPos += 15;
      
//       const labelY = 270+5; 
     

// const vastuImgOrigW = 52;
// const vastuImgOrigH = 4.5;


// const vastuDiagOrig = Math.sqrt(vastuImgOrigW ** 2 + vastuImgOrigH ** 2);
// const vastuDiagTarget = vastuDiagOrig - 2;
// const vastuDiagScale = vastuDiagTarget / vastuDiagOrig;


// const vastuImgScaledW = parseFloat((vastuImgOrigW * vastuDiagScale).toFixed(2));
// const vastuImgScaledH = parseFloat((vastuImgOrigH * vastuDiagScale).toFixed(2));


// const vastuImgPosX = 140; 
// const vastuImgPosY = yPos+85; 
// doc.setFontSize(13);
// doc.text(
//   reverseDevanagariIfContainsViOrLi("दिनांक:"),
//   vastuImgPosX - 20, 
//   vastuImgPosY + (vastuImgScaledH / 2) 
// );


// // const vastuImgPosXa = 140; 
// // const vastuImgPosYb = yPos+85; 
// // doc.addImage(
// //   VastuGhenaryaAdhikaryachiSahi,
// //   'PNG',
// //   vastuImgPosXa,
// //   vastuImgPosYb,
// //   vastuImgScaledW,
// //   vastuImgScaledH
// // );


// // Add vertical line on first page from 200px to bottom
// const pageHeight = doc.internal.pageSize.getHeight();
// doc.setLineWidth(0.1);
// doc.setDrawColor(0, 0, 0);
// doc.line(110, 206, 110, pageHeight - 17);

// const vastuImgPosXa = 135; 
// const vastuImgPosYb = yPos + 82.5; 
// doc.addImage(
//   VastuGhenaryaAdhikaryachiSahi,
//   'PNG',
//   vastuImgPosXa,
//   vastuImgPosYb,
//   vastuImgScaledW + 2.5,
//   vastuImgScaledH + 2.5
// );



// const testUser = users[19]; 


// const testSignature = testUser?.signature || null; 

// // if (testSignature) {
// //   const signatureWidth = 40;
// //   const signatureHeight = 12;

// //   // 🠘 Shift 13px to the left and 5px upward
// //   const signatureX = pageWidth - signatureWidth - 15 - 13;
// //   const signatureY = labelY - signatureHeight - 8;
// //   // ----------------------
// //   // *******

// //   doc.addImage(
// //     testSignature,
// //     'PNG',
// //     signatureX,
// //     signatureY,
// //     signatureWidth,
// //     signatureHeight
// //   );




// //  const today = new Date();
// //   const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
// //     (today.getMonth() + 1).toString().padStart(2, '0')
// //   }/${today.getFullYear()}`;

// //   doc.text(
// //     `${formattedDate}`,
// //     signatureX - 22,
// //     signatureY + signatureHeight - 1
// //   );



// //   const textX = signatureX + signatureWidth / 2;
// //   const textY = signatureY + signatureHeight + 4; // little below the image



  
// // // if (lipikInfo && lipikInfo.checked && lipikInfo.isVerified){
// // doc.setFontSize(8);
// // doc.setTextColor(0, 128, 0); // green color
// // doc.text('Verified', textX, textY, { align: 'center' });

// // // }

// // }  


// if (signatureMatches[0] === "verified") {
//   const signatureWidth = 40;
//   const signatureHeight = 12;

//   const signatureX = pageWidth - signatureWidth - 15 - 13;
//   const signatureY = labelY - signatureHeight - 8;

//   const today = new Date();
//   const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
//     (today.getMonth() + 1).toString().padStart(2, '0')
//   }/${today.getFullYear()}`;

//   doc.setFontSize(8);
//   doc.setTextColor(0, 0, 0); // black for date
//   doc.text(formattedDate, signatureX - 22, signatureY + signatureHeight - 1);

//   // Final position adjustment: 5px left, 3px upward
//   const textXa = signatureX + signatureWidth / 2 - 15;
//   const textYa = signatureY + signatureHeight + 4 - 3;

//   doc.setFontSize(8);
//   // doc.setTextColor(0, 128, 0); // green color for Verified
//    doc.setTextColor(0, 0, 0); // green color for Verified
//   doc.text('Verified', textXa, textYa, { align: 'center' });
// }


// doc.setTextColor(0, 0, 0); 
//       yPos += 10;
//       const availableWidth = pageWidth - 30;
//       const colWidth = availableWidth / 2;
      
//       // Create the two-column section with image replacements using the didDrawCell callback
//       doc.autoTable({
//         startY: yPos,
//         head: false,
//         body: [['', '']], // Empty placeholders for left and right columns
//         styles: {
//           font: 'DVOTSurekh_B_Ship',
//           fontStyle: 'normal',
//           fontSize: 10,
//           cellPadding: 2
//         },
//         columnStyles: {
//           0: { cellWidth: colWidth, halign: 'left' },
//           1: { cellWidth: colWidth, halign: 'right' }
//         },
//         theme: 'plain',
//         didDrawCell: function(data) {
//           // Handle left column
//           if (data.column.index === 0 && data.row.index === 0) {
//             const leftColX = data.cell.x + 2;
//             let imgY = data.cell.y + 5;
//             const imgHeight = 6.7;
//             const imgGap = 12; // Gap between images
            
          

//          const shrinkRatio = 0.83; 
// doc.addImage(FTRakmecheNiyamWatap, 'PNG', leftColX, imgY, (36 * shrinkRatio)+2.1,(imgHeight * shrinkRatio)+1.1);


//             doc.text("_______________ रु.", leftColX + 37, imgY + 4);
//             imgY += imgGap;
            
            

// const imageScaleFactor = 0.76; 
// doc.addImage(FTPurvichaKharch, 'PNG', leftColX, imgY, (28 * imageScaleFactor)+1.7, (imgHeight * imageScaleFactor)+1.2);



//             doc.text("_______________ रु.", leftColX + 37, imgY + 4);
//             imgY += imgGap;
            
            

//             const scaleFactor = 0.91; 
// const newWidth = 45 * scaleFactor;
// const newHeight = imgHeight * scaleFactor;

// doc.addImage(FTHyaBilantDakhavilela, 'PNG', leftColX-1, imgY, newWidth, newHeight);
//             doc.text(`${totalAmount.toFixed(2)}/-`, leftColX + 50, imgY + 6);
//             imgY += imgGap;
            
//            doc.setFontSize(12); 
//             doc.text("२ व ३ यांची बेरीज", leftColX, imgY + 4);

// // Line आणि "रु." हा भाग 20px ने उजवीकडे
// doc.text("_______________ रु.", leftColX + 37, imgY + 4);
//             imgY += imgGap;
            
          
            
//  const imgShrinkRatio = 0.75; 
// doc.addImage(FTUpalabdhShillak, 'PNG', leftColX, imgY, (35 * imgShrinkRatio)+1, (imgHeight * imgShrinkRatio)+1);



//             doc.text("_______________ रु.", leftColX + 37, imgY + 4);
//           }
          
          
//           if (data.column.index === 1 && data.row.index === 0) {
//             const rightColX = data.cell.x + 15;
//             let imgY = data.cell.y + 5;
//             const imgHeight = 6;
//             const imgGap = 12; 
            
           
//              const shrinkRatioPr = 0.92;
//             // doc.addImage(FTPramanitKarnyat, 'PNG', rightColX, imgY, 74, imgHeight*shrinkRatioPr);
//             doc.addImage(FTPramanitKarnyat, 'PNG', rightColX, imgY, 82, (imgHeight * shrinkRatioPr) + 1);

//             imgY += imgGap;
            
           
//             doc.addImage(FTParimaneAchuk, 'PNG', rightColX, imgY, 84, imgHeight+1.7);
//             imgY += imgGap;
            
           
//             const shrinkRatio = 0.94;
// // doc.addImage(FTSthititMilalya, 'PNG', rightColX, imgY, 40 * shrinkRatio, imgHeight * shrinkRatio);

//            doc.addImage(
//   FTSthititMilalya,
//   'PNG',
//   rightColX,
//   imgY,
//   (42 * shrinkRatio) + 1.7,
//   (imgHeight * shrinkRatio) + 1.7
// );

//             imgY += imgGap;
            
          
//             doc.addImage(FTSakhyatmakLekhachya, 'PNG', rightColX, imgY, 66.7, imgHeight+1.7);
//             imgY += imgGap;
            
            

// const imageWidth = 40 - 2; 
// const imageHeight = imgHeight - 2;

// doc.addImage(FTKarnyatAalyaAahet, 'PNG', rightColX, imgY, imageWidth+1.7, imageHeight+1.7);
          
//             imgY += imgGap * 1.5;
            
         
//             doc.text("       ________    ________", rightColX+1, imgY-2);
//           }
//         }
//       });
      
      
//       const breakdownTable = doc.autoTable.previous;
//       if (
//         breakdownTable &&
//         breakdownTable.settings.margin &&
//         typeof breakdownTable.startY === "number" &&
//         typeof breakdownTable.finalY === "number"
//       ) {
//         const marginLeft = breakdownTable.settings.margin.left;
//         const verticalLineX = marginLeft + colWidth;
//         const tableTopY = breakdownTable.startY;
//         const tableBottomY = breakdownTable.finalY;
//         doc.setLineWidth(0.1);
//         doc.setDrawColor(0, 0, 0);
//         doc.line(verticalLineX, tableTopY, verticalLineX, tableBottomY);
//       }
      
      
//       doc.addPage();
//       yPos = 17; 
//       doc.setFontSize(12);
     

    
// const ushaFontShrinkRatio = 0.6875; 

// const ayuktaImgWidth = 69 * ushaFontShrinkRatio;
// const ayuktaImgHeight = (25 * ushaFontShrinkRatio) - 12; 

// doc.addImage(
//   MUMaAayuktaYanchyakade,
//   'PNG',
//   15,
//   yPos,
//   ayuktaImgWidth+3,
//   ayuktaImgHeight+1.5
// );
   
//       yPos += 10;

// const tapasaniImgShrinkRatio = 0.6875; 
// const tapasaniImgWidth = (95 * tapasaniImgShrinkRatio); 
// const tapasaniImgHeight = ((24 * tapasaniImgShrinkRatio) - 11); 
// doc.addImage(
//   MUMemaganichiTapasani,
//   'PNG',
//   15,
//   yPos - 2, 
//   tapasaniImgWidth,
//   tapasaniImgHeight+1.6
// );



//       yPos += 12;
//       doc.setFontSize(12);
//       doc.text("अचूक आहे.", 15, yPos);
//       yPos += 10;
//          doc.setFontSize(12);
//       doc.text(reverseDevanagariIfContainsViOrLi("दिनांक: ----------------------------"), 15, yPos);
//       yPos += 15;
      
      



//  // 🧪 Use the demo signature from testUser
// const testUsert = users[19]; // Make sure at least 20 users exist
// const demoSignature = testUsert?.signature || null; // or testUser?.sahi if applicable

// // if (demoSignature) {
// //   var demoSigWidth = 40;
// //   var demoSigHeight = 12;
// //   var demoSigX = 15;
// //   var demoSigY = yPos;

// //   doc.addImage(
// //     demoSignature,
// //     'PNG',
// //     demoSigX,
// //     demoSigY - demoSigHeight - 2,
// //     demoSigWidth,
// //     demoSigHeight
// //   );
// // }



// if (signatureMatches[3] === "verified") {
//     var demoSigWidth = 40;
//   var demoSigHeight = 12;
//   var demoSigX = 15;
//   var demoSigY = yPos;

//   const today = new Date();
//   const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
//     (today.getMonth() + 1).toString().padStart(2, '0')
//   }/${today.getFullYear()}`;

//   // Position based on demoSignature
//   const signatureX = demoSigX;
//   const signatureY = demoSigY - demoSigHeight - 2;
//   const textX = signatureX + demoSigWidth / 2; // center aligned horizontally
//   const dateY = signatureY + demoSigHeight + 4; // just below image
//   const verifiedY = dateY + 5; // a bit below date

//   doc.setFontSize(8);
//   doc.setTextColor(0, 0, 0); // black for date
//   doc.text(formattedDate, textX, dateY, { align: 'center' });

//   doc.setFontSize(8);
//   // doc.setTextColor(0, 128, 0); // green for 'Verified'
//   doc.setTextColor(0, 0, 0); // green for 'Verified'
//   doc.text('Verified', textX, verifiedY, { align: 'center' });
// }


// // const amcTestUser = users[19];
// // const amcTestSignature = amcTestUser?.signature || null;

// // if (amcTestSignature) {
// //   const amcSigWidth = 40;
// //   const amcSigHeight = 12;
// //   const amcSigX = 66;
// //   const amcSigY = yPos - 14;

// //   doc.addImage(
// //     amcTestSignature,
// //     'PNG',
// //     amcSigX,
// //     amcSigY,
// //     amcSigWidth,
// //     amcSigHeight
// //   );
// // }



// if (signatureMatches[4] === "verified") {
//   const amcSigWidth = 40;
//   const amcSigHeight = 12;
//   const amcSigX = 66;
//   const amcSigY = yPos - 14;

//   const today = new Date();
//   const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
//     (today.getMonth() + 1).toString().padStart(2, '0')
//   }/${today.getFullYear()}`;

//   // Position based on AMC signature
//   const textX = amcSigX + amcSigWidth / 2; // center aligned horizontally
//   const dateY = amcSigY + amcSigHeight + 2; // just below image
//   const verifiedY = dateY + 5; // a bit below date

//   doc.setFontSize(8);
//   doc.setTextColor(0, 0, 0); // black for date
//   doc.text(formattedDate, textX, dateY, { align: 'center' });

//   doc.setFontSize(8);
//   // doc.setTextColor(0, 128, 0); // green for 'Verified'
//    doc.setTextColor(0, 0, 0); // green for 'Verified'
//   doc.text('Verified', textX, verifiedY, { align: 'center' });
// }

      
//       doc.text("-------------                  -------------", 15, yPos);
//       yPos += 10;
//       // doc.text("प्र.लेखापाल                            सहा.आयुक्त", 15, yPos);


//       const signShrinkRatio = 0.6875; // 16px → 11px equivalent shrink

// // ***)))
// const lekhapalWidth = 30 * signShrinkRatio;
// const lekhapalHeight = (14 * signShrinkRatio) - 5;

// const ayuktaWidth = 30 * signShrinkRatio;
// const ayuktaHeight = (14 * signShrinkRatio) - 5;

// // First image (प्र.लेखापाल)
// doc.addImage(
//   MUPramukhLekhapal,
//   'PNG',
//   15,
//   yPos-4,
//   lekhapalWidth,
//   lekhapalHeight+2
// );

// // Second image (सहा.आयुक्त)
// doc.addImage(
//   MUSahaAayukta,
//   'PNG',
//   66, // Adjusted to align with right side
//   yPos-4,
//   ayuktaWidth,
//   ayuktaHeight+1
// );

// yPos += lekhapalHeight + 5; // Add vertical space after images
      
      
//       if (user.ward && signatures[user.ward]?.["Assistant Municipal Commissioner"]) {
//         const amcSigWidth = 30;
//         const amcSigHeight = 30;
//         const amcSigX = 80; // Adjust X based on your spacing needs
//         const amcSigY = yPos - amcSigHeight + 5;
        
//         doc.addImage(
//           signatures[user.ward]["Assistant Municipal Commissioner"],
//           'PNG',
//           amcSigX,
//           amcSigY,
//           amcSigWidth,
//           amcSigHeight
//         );
//       }
      
//       yPos += 7;
      
      
//       // doc.text(`       प्रभाग समिती-${wardname}`, 15, yPos);




// const baseShrinkRatio = 0.625;

// const fontReductionRatio = 13 / 16; // ≈ 0.8125

// const fontSizeReductionFinalRatio = 11 / 16; // ≈ 0.6875

// const samitiShrinkRatio = baseShrinkRatio * fontSizeReductionFinalRatio;

// let samitiImgWidth = 60 * samitiShrinkRatio;
// let samitiImgHeight = 12 * samitiShrinkRatio;


// doc.addImage(
//   prabhagsamiti,
//   'PNG',
//   15,
//   yPos - 5,
//   samitiImgWidth,
//   samitiImgHeight+2
// );



// doc.setFontSize(11); // Match image font size
// doc.text(`-${wardname}`, 15 + samitiImgWidth + 2, yPos + 1)



//       yPos += 10;
//       doc.text("----------------------------------------------------", 15, yPos);
//       yPos += 10;
      
      
      

//       doc.text(reverseDevanagariIfContainsViOrLi(`रु. ${totalAmount.toLocaleString('hi-IN')}/-`), 15, yPos);
//       yPos += 10;
      
//       const akshariImgWidth = 17; 
// const akshariImgHeight = 5;


// doc.addImage(
//   Akshari,
//   'PNG',
//   15,
//   yPos - 5, 
//   akshariImgWidth,
//   akshariImgHeight+1
// );



// doc.setFontSize(12); // Match image font size

// doc.text(
//   `: रुपये देण्यात यावेत)`,
//   15 + akshariImgWidth + 2, 
//   yPos
// );
//       yPos += 10;
//       doc.text(reverseDevanagariIfContainsViOrLi("दिनांक: _______                        उपायुक्त"), 15, yPos);
//       yPos += 15;
//       doc.text("-------------------------------------------------------", 15, yPos);
//       yPos += 10;
//       // ---->>>>
//       // doc.text("मागणीची संपूर्ण फेड म्हणून", 15, yPos);


// // मागणीची संपूर्ण फेड म्हणून इमेजचे मूळ आकार
// const maganiImgOriginalWidth = 55;
// const maganiImgOriginalHeight = 6.5;

// // डायगोनल 2px ने लहान
// const maganiOriginalDiagonal = Math.sqrt(maganiImgOriginalWidth ** 2 + maganiImgOriginalHeight ** 2);
// const maganiTargetDiagonal = maganiOriginalDiagonal - 2;
// const maganiScaleRatio = maganiTargetDiagonal / maganiOriginalDiagonal;

// const maganiImgWidth = parseFloat((maganiImgOriginalWidth * maganiScaleRatio).toFixed(2));
// const maganiImgHeight = parseFloat((maganiImgOriginalHeight * maganiScaleRatio).toFixed(2));


// const maganiImgX = 15;           
// const maganiImgY = yPos - 5 + 2; 


// doc.addImage(
//   MUMaganichiParatPhet,
//   'PNG',
//   maganiImgX,
//   maganiImgY,
//   maganiImgWidth,
//   maganiImgHeight
// );



//       yPos += 10;
      
//       yPos += 10;
      
//       yPos += 10;
//       doc.text(reverseDevanagariIfContainsViOrLi(`रु- ${totalAmountInWords} मिळाले`), 15, yPos);
//       yPos += 15;
    

// const mudrankOriginalW = 22;
// const mudrankOriginalH = 10;


// const mudrankDiag = Math.sqrt(mudrankOriginalW ** 2 + mudrankOriginalH ** 2);
// const mudrankTargetDiag = mudrankDiag - 2;
// const mudrankScale = mudrankTargetDiag / mudrankDiag;

// const mudrankScaledW = parseFloat((mudrankOriginalW * mudrankScale).toFixed(2));
// const mudrankScaledH = parseFloat((mudrankOriginalH * mudrankScale).toFixed(2));


// const mudrankPosX = 75; 
// const mudrankPosY = yPos - 6; 

// doc.addImage(
//   Mudrank,
//   'PNG',
//   mudrankPosX,
//   mudrankPosY,
//   mudrankScaledW,
//   mudrankScaledH
// );


//       yPos += 7;
//       doc.text("                                ----------------------", 15, yPos);
//       yPos += 15;
//       doc.text("                                पैसे घेणाऱ्याची सही", 15, yPos);
//       yPos = 30; 

// const originalWidth = 28;
// const originalHeight = 6;


// const originalDiagonal = Math.sqrt(originalWidth ** 2 + originalHeight ** 2);

// const targetDiagonal = originalDiagonal - 2;

// const scaleRatio = targetDiagonal / originalDiagonal;

// const nirnayImgWidth = parseFloat((originalWidth * scaleRatio).toFixed(2));
// const nirnayImgHeight = parseFloat((originalHeight * scaleRatio).toFixed(2));

// const imgX = 117;
// const imgY = yPos - 5 + 2;


// doc.addImage(
//   MUNirnayKramank,
//   'PNG',
//   imgX,
//   imgY-10,
//   nirnayImgWidth,
//   nirnayImgHeight+1
// );


// const lineStartX = imgX + nirnayImgWidth + 2;
// const lineY = yPos + 1;
// const lineEndX = lineStartX + 15;

// doc.setLineWidth(0.3);
// doc.line(lineStartX, lineY-9, lineEndX, lineY-9);



// const textX = lineEndX + 5;  
// const textY = lineY - 9;    

// doc.text(reverseDevanagariIfContainsViOrLi("दिनांक_____"), textX, textY);
      
     
//       yPos += 1;
      
      
//       doc.text(reverseDevanagariIfContainsViOrLi(`बिलांत दाखवलेली रु. ${totalAmount.toLocaleString('hi-IN')}/- ची रक्कम`), 120, yPos);
//       yPos += 9;
//       // doc.text(`(अक्षरी रुपये ${totalAmountInWords} मात्र)`, 120, yPos);
//       // ??????
//       // doc.text(`(रुपये ${totalAmountInWords} मात्र)`, 120, yPos);
//       const rupyaText = `(रुपये ${totalAmountInWords} `;
// doc.text(rupyaText, 120, yPos);

// // आता 'मात्र' च्या जागी image टाका:
// const textWidth = doc.getTextWidth(rupyaText);
// const matraX = 120 + textWidth + 1; // 1px gap ठेवला
// const matraY = yPos - 4; // text height नुसार fine-tune करा

// doc.addImage(matra, 'PNG', matraX, matraY, 12, 5); // width/height गरजेनुसार adjust करा

// // शेवटचा bracket पूर्ण करा (जर हवा असेल तर):
// doc.text(")", matraX + 13, yPos); // 13 म्हणजे image width + gap

//       yPos += 10;
//       doc.text("मंजूर करण्यात येत आहे.", 120, yPos);
//       yPos += 10;

//       // doc.text(reverseDevanagariIfContainsViOrLi("मुख्य लेखाधिकारी ----------------------"), 120, yPos);

//       const muOriginalWidth = 28;
// const muOriginalHeight = 6;

// const muOriginalDiagonal = Math.sqrt(muOriginalWidth ** 2 + muOriginalHeight ** 2);
// const muTargetDiagonal = muOriginalDiagonal - 2;  // 2px ने shrink
// const muScaleRatio = muTargetDiagonal / muOriginalDiagonal;

// const muImgWidth = parseFloat((muOriginalWidth * muScaleRatio).toFixed(2));
// const muImgHeight = parseFloat((muOriginalHeight * muScaleRatio).toFixed(2));

// const muImgX = 120;         
// const muImgY = yPos - 5 + 2; 

// // मुख्य लेखाधिकारी इमेज PDF मध्ये add करा
// doc.addImage(
//   MUMukhyaLekhadhikari,
//   'PNG',
//   muImgX,
//   muImgY,
//   muImgWidth+1,
//   muImgHeight+1.1
// );


// // const muLineStartX = muImgX + muImgWidth + 5;  
// // const muLineY = yPos + 1;
// // const muLineEndX = muLineStartX + 20;  

// // doc.setLineWidth(0.3);
// // doc.line(muLineStartX, muLineY, muLineEndX, muLineY);

      
// //       yPos += 13;
// //       // doc.text(reverseDevanagariIfContainsViOrLi("दिनांक                          उप-आयुक्त"), 120, yPos);
      
// // const upaayuktaOriginalWidth = 22;
// // const upaayuktaOriginalHeight = 5;

// // const upaayuktaOriginalDiagonal = Math.sqrt(
// //   upaayuktaOriginalWidth ** 2 + upaayuktaOriginalHeight ** 2
// // );
// // const upaayuktaTargetDiagonal = upaayuktaOriginalDiagonal - 2;
// // const upaayuktaScaleRatio = upaayuktaTargetDiagonal / upaayuktaOriginalDiagonal;


// // const upaayuktaImgWidth = parseFloat(
// //   (upaayuktaOriginalWidth * upaayuktaScaleRatio).toFixed(2)
// // );
// // const upaayuktaImgHeight = parseFloat(
// //   (upaayuktaOriginalHeight * upaayuktaScaleRatio).toFixed(2)
// // );


// // const upaayuktaImgX = 168;           
// // const upaayuktaImgY = yPos - 5 + 2;  


// // doc.text(reverseDevanagariIfContainsViOrLi("दिनांक"), 120, yPos);

// // // उप-आयुक्त इमेज PDF मध्ये टाका
// // doc.addImage(
// //   MUUpaaayukta,
// //   'PNG',
// //   upaayuktaImgX,
// //   upaayuktaImgY,
// //   upaayuktaImgWidth,
// //   upaayuktaImgHeight
// // );



//   const muLineStartX = muImgX + muImgWidth + 5;  
//   const muLineY = yPos + 1;
//   const muLineEndX = muLineStartX + 20;  

//   doc.setLineWidth(0.3);
//   doc.line(muLineStartX, muLineY, muLineEndX, muLineY);

      
//       yPos += 13;
//       // doc.text(reverseDevanagariIfContainsViOrLi("दिनांक                          उप-आयुक्त"), 120, yPos);








// const upaayuktaOriginalWidth = 22;
// const upaayuktaOriginalHeight = 5;

// // Shrink logic (2px ने डायगोनल लहान)
// const upaayuktaOriginalDiagonal = Math.sqrt(
//   upaayuktaOriginalWidth ** 2 + upaayuktaOriginalHeight ** 2
// );
// const upaayuktaTargetDiagonal = upaayuktaOriginalDiagonal - 2;
// const upaayuktaScaleRatio = upaayuktaTargetDiagonal / upaayuktaOriginalDiagonal;
// // ---<<<
// // Scale केल्यानंतरचे width आणि height
// const upaayuktaImgWidth = parseFloat(
//   (upaayuktaOriginalWidth * upaayuktaScaleRatio).toFixed(2)
// );

// const upaayuktaImgHeight = parseFloat(
//   (upaayuktaOriginalHeight * upaayuktaScaleRatio).toFixed(2)
// );

// // इमेज placement coordinates (दिनांक च्या बाजूला)
// var upaayuktaImgX = 168;           // टेक्स्ट नंतरची जागा
// var upaayuktaImgY = yPos - 5 + 2;  // थोडं खाली आणलं आहे


// if (signatureMatches[5] === "verified") {
//   const upaayuktaSigWidth = upaayuktaImgWidth;
//   const upaayuktaSigHeight = upaayuktaImgHeight;
//   const upaayuktaSigX = upaayuktaImgX;
//   const upaayuktaSigY = upaayuktaImgY;

//   const today = new Date();
//   const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
//     (today.getMonth() + 1).toString().padStart(2, '0')
//   }/${today.getFullYear()}`;

//   const textX = upaayuktaSigX + upaayuktaSigWidth / 2; // center of signature
//   const dateY = upaayuktaSigY + upaayuktaSigHeight + 2; // just below signature
//   const verifiedY = dateY + 5; // below date

//   doc.setFontSize(8);
//   doc.setTextColor(0, 0, 0); // black for date
//   doc.text(formattedDate, textX, dateY, { align: 'center' });

//   doc.setFontSize(8);
//   // doc.setTextColor(0, 128, 0); // green for 'Verified'
//   doc.setTextColor(0, 0, 0); // green for 'Verified'
//   doc.text('Verified', textX, verifiedY, { align: 'center' });
// }




// // 'दिनांक' टेक्स्ट (डाव्या बाजूला)

// // doc.text(reverseDevanagariIfContainsViOrLi("दिनांक>>>>"), 120, yPos);
// doc.setFontSize(13); // आपल्या हवेप्रमाणे size द्या (उदा. 12)
// doc.text(reverseDevanagariIfContainsViOrLi("दिनांक"), 120, yPos);

// // उप-आयुक्त इमेज PDF मध्ये टाका

// doc.addImage(
//   MUUpaaayukta,
//   'PNG',
//   upaayuktaImgX,
//   upaayuktaImgY,
//   upaayuktaImgWidth+1,
//   upaayuktaImgHeight+1.7
// );

  
      

//       doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 140, yPos + 7);
      
//       // ****
//       yPos += 15;
//       doc.text("----------------------------------------------------", 120, yPos);
//       // doc.text("---------------- प्रदानार्थ लेखापाल -------------------------------------------------------------- यांस,", 120, yPos + 7);

// const pradanarthImgOriginalWidth = 36;
// const pradanarthImgOriginalHeight = 5.2;

// const pradanarthOriginalDiagonal = Math.sqrt(pradanarthImgOriginalWidth ** 2 + pradanarthImgOriginalHeight ** 2);
// const pradanarthTargetDiagonal = pradanarthOriginalDiagonal - 2;
// const pradanarthScaleRatio = pradanarthTargetDiagonal / pradanarthOriginalDiagonal;

// const pradanarthImgWidth = parseFloat((pradanarthImgOriginalWidth * pradanarthScaleRatio).toFixed(2));
// const pradanarthImgHeight = parseFloat((pradanarthImgOriginalHeight * pradanarthScaleRatio).toFixed(2));

// const pradanarthImgX = 120 + 15; // 5px ने उजवीकडे shift
// const pradanarthImgY = yPos + 7 - 5 + 6;

// doc.addImage(
//   MUPradanarthLekhapal,
//   'PNG',
//   pradanarthImgX,
//   pradanarthImgY,
//   pradanarthImgWidth-1,
//   pradanarthImgHeight+2
// );



//       yPos += 15;
//       doc.text("---------                           ---------", 120, yPos-3);
//  yPos += 10;
//  doc.setFontSize(13); // आपल्या हवेप्रमाणे size द्या (उदा. 12)
//       doc.text("---------------------------------------------- यांस", 118, yPos);

     

// yPos += 20;



// const upaayuktaTestUser = users[19];
// const upaayuktaTestSignature = upaayuktaTestUser?.signature || null;

// // if (upaayuktaTestSignature) {
// //   const upaayuktaSigWidth = 40;
// //   const upaayuktaSigHeight = 12;
// //   const upaayuktaSigX = 66 + 100; // 40px right shift
// //   const upaayuktaSigY = yPos - 14-2;

// //   doc.addImage(
// //     upaayuktaTestSignature,
// //     'PNG',
// //     upaayuktaSigX,
// //     upaayuktaSigY,
// //     upaayuktaSigWidth,
// //     upaayuktaSigHeight
// //   );
// // }



// // Draw 'दिनांक' on left side
// doc.text(reverseDevanagariIfContainsViOrLi("दिनांक"), 120, yPos);

// // Original size of 'उप-आयुक्त' image
// const deputyCommissionerImgOriginalWidth = 22;
// const deputyCommissionerImgOriginalHeight = 5;

// // Shrink by 2px on diagonal
// const deputyCommissionerDiagonal = Math.sqrt(
//   deputyCommissionerImgOriginalWidth ** 2 + deputyCommissionerImgOriginalHeight ** 2
// );
// const deputyCommissionerTargetDiagonal = deputyCommissionerDiagonal - 2;
// const deputyCommissionerScaleRatio = deputyCommissionerTargetDiagonal / deputyCommissionerDiagonal;

// // Scaled dimensions
// const deputyCommissionerImgWidth = parseFloat(
//   (deputyCommissionerImgOriginalWidth * deputyCommissionerScaleRatio).toFixed(2)
// );
// const deputyCommissionerImgHeight = parseFloat(
//   (deputyCommissionerImgOriginalHeight * deputyCommissionerScaleRatio).toFixed(2)
// );

// // Image placement (right of 'दिनांक')
// const deputyCommissionerImgX = 168;
// const deputyCommissionerImgY = yPos - 5 + 2;

// // Add the image to PDF
// doc.addImage(
//   MUUpaaayukta,
//   'PNG',
//   deputyCommissionerImgX,
//   deputyCommissionerImgY,
//   deputyCommissionerImgWidth+1,
//   deputyCommissionerImgHeight+2
// );

// // Municipal name slightly shifted to right (5px)
// doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 125, yPos + 7);
      
//       yPos += 15; 
//       doc.text("----------------------------------------------------", 120, yPos);
      
//       yPos += 10; 
//       // doc.text(reverseDevanagariIfContainsViOrLi("धनादेश क्रमांक ----------  दिनांक  ------------"), 120, yPos);



//       const ddNumberImgOriginalWidth = 30;
// const ddNumberImgOriginalHeight = 5.5;

// const ddNumberDiagonal = Math.sqrt(
//   ddNumberImgOriginalWidth ** 2 + ddNumberImgOriginalHeight ** 2
// );
// const ddNumberTargetDiagonal = ddNumberDiagonal - 2;
// const ddNumberScaleRatio = ddNumberTargetDiagonal / ddNumberDiagonal;

// const ddNumberImgWidth = parseFloat((ddNumberImgOriginalWidth * ddNumberScaleRatio).toFixed(2));
// const ddNumberImgHeight = parseFloat((ddNumberImgOriginalHeight * ddNumberScaleRatio).toFixed(2));

// // Placement position
// const ddNumberImgX = 120;
// const ddNumberImgY = yPos - 5 + 2;  // adjust vertically as needed

// // Add image: 'धनादेश क्रमांक'
// doc.addImage(
//   MUDhanadeshKramank,
//   'PNG',
//   ddNumberImgX,
//   ddNumberImgY,
//   ddNumberImgWidth,
//   ddNumberImgHeight+2
// );

// // Remaining text after image
// doc.text(reverseDevanagariIfContainsViOrLi("----------  दिनांक  ------------"), ddNumberImgX + ddNumberImgWidth + 5, yPos);
      
//       yPos += 10;
    
// const ddnImgOriginalWidth = 46;
// const ddnImgOriginalHeight = 5.5;

// const ddnOriginalDiagonal = Math.sqrt(ddnImgOriginalWidth ** 2 + ddnImgOriginalHeight ** 2);
// const ddnTargetDiagonal = ddnOriginalDiagonal - 2;
// const ddnScaleRatio = ddnTargetDiagonal / ddnOriginalDiagonal;

// const ddnImgWidth = parseFloat((ddnImgOriginalWidth * ddnScaleRatio).toFixed(2));
// const ddnImgHeight = parseFloat((ddnImgOriginalHeight * ddnScaleRatio).toFixed(2));

// // Placement
// const ddnImgX = 120;
// const ddnImgY = yPos - 5 + 2; // vertical adjustment

// // Add image for 'द्वारे देण्यात आले आणि'
// doc.addImage(
//   MUDwareDenyatAale,
//   'PNG',
//   ddnImgX,
//   ddnImgY,
//   ddnImgWidth,
//   ddnImgHeight+1.5
// );

// // Add dashed line after image
// doc.text(reverseDevanagariIfContainsViOrLi("----------------------"), ddnImgX + ddnImgWidth + 5, yPos);

//       // doc.text(reverseDevanagariIfContainsViOrLi("प्रस्तावित रोख वहित नोंद घेतली"), 120, yPos + 7);

// // प्रस्तावित रोख वहित नोंद घेतली इमेजचे मूळ आकार
// const prustavImgOriginalWidth = 50;
// const prustavImgOriginalHeight = 6;

// // डायगोनल shrink logic
// const prustavOriginalDiagonal = Math.sqrt(prustavImgOriginalWidth ** 2 + prustavImgOriginalHeight ** 2);
// const prustavTargetDiagonal = prustavOriginalDiagonal - 2;
// const prustavScaleRatio = prustavTargetDiagonal / prustavOriginalDiagonal;

// const prustavImgWidth = parseFloat((prustavImgOriginalWidth * prustavScaleRatio).toFixed(2));
// const prustavImgHeight = parseFloat((prustavImgOriginalHeight * prustavScaleRatio).toFixed(2));

// // Placement coordinates
// const prustavImgX = 120;          // पूर्वीच्या टेक्स्टच्या जागी
// const prustavImgY = yPos + 7 - 5 + 2;  // थोडं adjust केलं

// // इमेज PDF मध्ये insert करा
// doc.addImage(
//   MUPrustavarRokhVahitNond,
//   'PNG',
//   prustavImgX,
//   prustavImgY,
//   prustavImgWidth,
//   prustavImgHeight+1.5
// );

//       yPos += 20;
//       doc.text("-------------                      -------------", 120, yPos);
//       yPos += 10;
//       doc.text("रोखपाल                          उप-आयुक्त", 120, yPos);
//       doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 130, yPos + 7); 
      
//       doc.line(110, 15, 110, yPos + 30); // **ही लाइन आता  60 पासून सुरू होईल**
      
      
      
      
//       if (signatures['Junior Engineer']) {
//         doc.addImage(signatures['Junior Engineer'], 'PNG', 15, yPos, 30, 15);
//         doc.text("Junior Engineer", 15, yPos + 20);
//       }
      
//       if (signatures['Executive Engineer']) {
//         doc.addImage(signatures['Executive Engineer'], 'PNG', 120, yPos, 30, 15);
//         doc.text("Executive Engineer", 120, yPos + 20);
//       }
      
//       if (signatures['Dy.Municipal Commissioner']) {
//         doc.addImage(signatures['Dy.Municipal Commissioner'], 'PNG', 120, yPos + 40, 30, 15);
//         doc.text("Dy.Municipal Commissioner", 120, yPos + 60);
//       }
      
//       const pdfData = doc.output('blob'); // Get Blob format
      
//       // Convert Blob to Object URL for preview
//       const pdfUrl = URL.createObjectURL(pdfData);
//       let type="form22";
//       handlePdfPreview(pdfUrl,type,selectedMonthYear);
//       setPdfBlob(pdfData);
      
//       const blob = new Blob([pdfBlob], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
      
//     } catch (error) {
//       console.error('Error generating Form 22 PDF:', error);
//     }
//   };


//   ==============================================================





// const handleDownloadForm22 = async () => {

//   // 🔴 तुझा existing data flow जसा आहे तसाच
//   const { foundReport, reportingData } = await fetchReportData(
//     selectedMonthYear,
//     user,
//     setMode,
//     setReportingDataSM,
//     setMonthArr
//   );

//   const signatureMatches = checkSignatureStatusForm22(monthArr);

//   const totalAmount = rows
//     .filter(r => r.monthAndYear === selectedMonthYear)
//     .reduce((s, r) => s + Number(r.netBillAmount || 0), 0);

//   const today = new Date().toLocaleDateString("en-IN");

//   // ===============================
//   // ✅ HTML TEMPLATE (FORM-22)
//   // ===============================
//   const html = `
//   <div class="marathi-pdf" style="width:210mm;padding:20mm">

//     <div style="display:flex;justify-content:space-between">
//       <div>M.S.C. Form 22 (Rule (1))</div>
//       <div>M.S.C. 22</div>
//     </div>

//     <div style="text-align:center;margin-top:10px">
//       <img src="${logovvcmc}" width="80"/>
//       <h2>नमुना नं. २२</h2>
//       <div>(नियम २२ (१))</div>
//       <h3>वसई विरार शहर महानगरपालिका</h3>
//     </div>

//     <p>
//       <b>बिल क्रमांक :</b> ____________
//       <span style="float:right">
//         <b>प्रमाणक क्रमांक :</b> ____________
//       </span><br/>
//       <b>दिनांक :</b> ${today}
//     </p>

//     <p>
//       पैसे देणाऱ्याचे नाव : म.रा.वि.वि. कंपनी<br/>
//       पत्ता : ${user.ward}<br/>
//       माल : विद्युत विभाग<br/>
//       मागणी पुस्तकाचा संदर्भ :
//       लेखा शीर्ष विद्युत विभाग विद्युत देयक
//     </p>

//     <table border="1" width="100%" cellspacing="0" cellpadding="6">
//       <thead>
//         <tr>
//           <th>अनु.क्र.</th>
//           <th>कामाचा किंवा वस्तूंचा तपशील</th>
//           <th>परिमाण / वजन</th>
//           <th>दर</th>
//           <th>युनिट</th>
//           <th>रक्कम (रु. पै.)</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td align="center">1</td>
//           <td>
//             वसई विरार शहर महानगरपालिका<br/>
//             कार्यक्षेत्रातील प्रभाग समिती ${user.ward}<br/>
//             विभागातील विरार विभागाचे<br/>
//             म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear}<br/>
//             चे विद्युत देयक
//           </td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td align="right">${totalAmount.toFixed(2)}</td>
//         </tr>
//       </tbody>
//       <tfoot>
//         <tr>
//           <td colspan="5" align="right"><b>एकूण</b></td>
//           <td align="right"><b>${totalAmount.toFixed(2)}</b></td>
//         </tr>
//       </tfoot>
//     </table>

//     <h3 style="text-align:center;margin-top:15px">
//       एकूण रक्कम रुपये (${totalAmount.toFixed(2)}/- मात्र)
//     </h3>

//     <div style="page-break-before:always"></div>

//     <p>
//       मा. आयुक्त यांच्याकडे मंजुरीसाठी सादर<br/>
//       मी मागणीची तपासणी केली असून ती सर्व बाबतीत अचूक आहे.
//     </p>

//     <p>
//       बिलांत दाखवलेली रु. ${totalAmount.toLocaleString("hi-IN")}/- ची रक्कम<br/>
//       (रुपये ${totalAmount} मात्र)
//     </p>

//     <p>
//       मंजूर करण्यात येत आहे.
//     </p>

//     <div style="display:flex;justify-content:space-between;margin-top:40px">
//       <div>प्र.लेखापाल</div>
//       <div>सहा. आयुक्त</div>
//       <div>उप-आयुक्त</div>
//     </div>

//     <p style="text-align:center;margin-top:20px">
//       वसई विरार शहर महानगरपालिका
//     </p>

//   </div>
//   `;

//   // ===============================
//   // PDF GENERATE
//   // ===============================
//   const wrapper = document.createElement("div");
//   wrapper.innerHTML = html;
//   document.body.appendChild(wrapper);

//   await html2pdf().set({
//     margin: 15,
//     filename: `Form22_${selectedMonthYear}.pdf`,
//     html2canvas: { scale: 2, useCORS: true },
//     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
//   }).from(wrapper).save();

//   document.body.removeChild(wrapper);
// };



// const handleDownloadForm22 = async () => {

//   // 🔴 तुझा existing data flow जसा आहे तसाच
//   const { foundReport, reportingData } = await fetchReportData(
//     selectedMonthYear,
//     user,
//     setMode,
//     setReportingDataSM,
//     setMonthArr
//   );

//   const signatureMatches = checkSignatureStatusForm22(monthArr);

//   const totalAmount = rows
//     .filter(r => r.monthAndYear === selectedMonthYear)
//     .reduce((s, r) => s + Number(r.netBillAmount || 0), 0);

//   const today = new Date().toLocaleDateString("en-IN");

//   // ===============================
//   // ✅ HTML TEMPLATE (FORM-22)
//   // ===============================
//   const html = `
//   <!-- 🔴 CHANGE 1: width काढून टाकला -->
//   <div class="marathi-pdf"
//        style="
//         padding:15mm;
//         box-sizing:border-box;
//         overflow:hidden;
//        ">

//     <div style="display:flex;justify-content:space-between">
//       <div>M.S.C. Form 22 (Rule (1))</div>
//       <div>M.S.C. 22</div>
//     </div>

//     <div style="text-align:center;margin-top:10px">
//       <img src="${logovvcmc}" width="70"/>
//       <h2>नमुना नं. २२</h2>
//       <div>(नियम २२ (१))</div>
//       <h3>वसई विरार शहर महानगरपालिका</h3>
//     </div>

//     <p>
//       <b>बिल क्रमांक :</b> ____________
//       <span style="float:right">
//         <b>प्रमाणक क्रमांक :</b> ____________
//       </span><br/>
//       <b>दिनांक :</b> ${today}
//     </p>

//     <p>
//       पैसे देणाऱ्याचे नाव : म.रा.वि.वि. कंपनी<br/>
//       पत्ता : ${user.ward}<br/>
//       माल : विद्युत विभाग<br/>
//       मागणी पुस्तकाचा संदर्भ :
//       लेखा शीर्ष विद्युत विभाग विद्युत देयक
//     </p>

//     <!-- 🔴 CHANGE 2: table-layout + word-break -->
//     <table
//       border="1"
//       width="100%"
//       cellspacing="0"
//       cellpadding="6"
//       style="
//         table-layout:fixed;
//         border-collapse:collapse;
//         font-size:14px;
//       "
//     >
//       <thead>
//         <tr>
//           <th style="width:6%">अनु.क्र.</th>
//           <th style="width:44%">कामाचा किंवा वस्तूंचा तपशील</th>
//           <th style="width:12%">परिमाण</th>
//           <th style="width:10%">दर</th>
//           <th style="width:10%">युनिट</th>
//           <th style="width:18%">रक्कम (रु. पै.)</th>
//         </tr>
//       </thead>

//       <tbody>
//         <tr>
//           <!-- 🔴 CHANGE 3: word-break -->
//           <td align="center" style="word-break:break-word">1</td>

//           <td style="word-break:break-word">
//             वसई विरार शहर महानगरपालिका<br/>
//             कार्यक्षेत्रातील प्रभाग समिती ${user.ward}<br/>
//             विभागातील विरार विभागाचे<br/>
//             म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear}<br/>
//             चे विद्युत देयक
//           </td>

//           <td></td>
//           <td></td>
//           <td></td>

//           <!-- 🔴 CHANGE 4: nowrap -->
//           <td align="right" style="white-space:nowrap">
//             ${totalAmount.toFixed(2)}
//           </td>
//         </tr>
//       </tbody>

//       <tfoot>
//         <tr>
//           <td colspan="5" align="right"><b>एकूण</b></td>
//           <td align="right"><b>${totalAmount.toFixed(2)}</b></td>
//         </tr>
//       </tfoot>
//     </table>

//     <h3 style="text-align:center;margin-top:15px">
//       एकूण रक्कम रुपये (${totalAmount.toFixed(2)}/- मात्र)
//     </h3>

//     <div style="page-break-before:always"></div>

//     <p>
//       मा. आयुक्त यांच्याकडे मंजुरीसाठी सादर<br/>
//       मी मागणीची तपासणी केली असून ती सर्व बाबतीत अचूक आहे.
//     </p>

//     <p>
//       बिलांत दाखवलेली रु. ${totalAmount.toLocaleString("hi-IN")}/- ची रक्कम<br/>
//       (रुपये ${totalAmount} मात्र)
//     </p>

//     <p>मंजूर करण्यात येत आहे.</p>

//     <div style="display:flex;justify-content:space-between;margin-top:40px">
//       <div>प्र.लेखापाल</div>
//       <div>सहा. आयुक्त</div>
//       <div>उप-आयुक्त</div>
//     </div>

//     <p style="text-align:center;margin-top:20px">
//       वसई विरार शहर महानगरपालिका
//     </p>

//   </div>
//   `;

//   // ===============================
//   // PDF GENERATE
//   // ===============================
//   const wrapper = document.createElement("div");
//   wrapper.innerHTML = html;
//   document.body.appendChild(wrapper);

//   await html2pdf().set({
//     // 🔴 CHANGE 5: margin array (safe A4)
//     margin: [15, 12, 15, 12],
//     filename: `Form22_${selectedMonthYear}.pdf`,
//     html2canvas: {
//       scale: 2,
//       useCORS: true,
//       scrollX: 0,
//       scrollY: 0
//     },
//     jsPDF: {
//       unit: "mm",
//       format: "a4",
//       orientation: "portrait"
//     }
//   }).from(wrapper).save();

//   document.body.removeChild(wrapper);
// };




const handleDownloadForm22 = async () => {

  // ===============================
  // EXISTING DATA FLOW (AS-IS)
  // ===============================
  const { foundReport, reportingData } = await fetchReportData(
    selectedMonthYear,
    user,
    setMode,
    setReportingDataSM,
    setMonthArr
  );

  const signatureMatches = checkSignatureStatusForm22(monthArr);

  const totalAmount = rows
    .filter(r => r.monthAndYear === selectedMonthYear)
    .reduce((s, r) => s + Number(r.netBillAmount || 0), 0);

  const today = new Date().toLocaleDateString("en-IN");

  // ===============================
  // HTML (FORM–22 : PAGE 1 + PAGE 2)
  // ===============================
  const html = `
  <div class="marathi-pdf"
    style="
      padding:15mm;
      box-sizing:border-box;
      font-family:'Noto Serif Devanagari', serif;
      font-size:14px;
      line-height:1.6;
    ">

    <!-- ================= PAGE 1 ================= -->

    <div style="display:flex;justify-content:space-between">
      <div>M.S.C. Form 22 (Rule (1))</div>
      <div>M.S.C. 22</div>
    </div>

    <div style="text-align:center;margin-top:10px">
      <img src="${logovvcmc}" width="70"/>
      <h2>नमुना नं. २२</h2>
      <div>(नियम २२ (१))</div>
      <h3>वसई विरार शहर महानगरपालिका</h3>
    </div>

    <p>
      <b>बिल क्रमांक :</b> ____________
      <span style="float:right"><b>प्रमाणक क्रमांक :</b> ____________</span><br/>
      <b>दिनांक :</b> ${today}
    </p>

    <p>
      पैसे देणाऱ्याचे नाव : म.रा.वि.वि. कंपनी<br/>
      पत्ता : ${user?.ward}<br/>
      माल : विद्युत विभाग<br/>
      मागणी पुस्तकाचा संदर्भ :
      लेखा शीर्ष विद्युत विभाग विद्युत देयक
    </p>

    <table border="1" width="100%" cellspacing="0" cellpadding="6"
      style="table-layout:fixed;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="width:6%">अनु.क्र.</th>
          <th style="width:44%">कामाचा किंवा वस्तूंचा तपशील</th>
          <th style="width:12%">परिमाण</th>
          <th style="width:10%">दर</th>
          <th style="width:10%">युनिट</th>
          <th style="width:18%">रक्कम (रु. पै.)</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td align="center">1</td>
          <td>
            वसई विरार शहर महानगरपालिका<br/>
            कार्यक्षेत्रातील प्रभाग समिती ${user?.ward}<br/>
            विभागातील विरार विभागाचे<br/>
            म.रा.वि.वि. कंपनीचे माहे ${selectedMonthYear}<br/>
            चे विद्युत देयक
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td align="right">${totalAmount.toFixed(2)}</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colspan="5" align="right"><b>एकूण</b></td>
          <td align="right"><b>${totalAmount.toFixed(2)}</b></td>
        </tr>
      </tfoot>
    </table>

    <!-- ===== MISSED PART (FIRST PAGE BOTTOM) ===== -->

    <p style="text-align:center;margin-top:10px;font-weight:bold">
      एकूण रक्कम रुपये (अक्षरी ________________________________ मात्र)
    </p>

    <div style="display:grid;grid-template-columns:1fr 1fr;column-gap:25px;font-size:13px">

      <!-- LEFT -->
      <div>
        <table width="100%" cellpadding="2">
          <tr><td>१) रक्कमेचे नियम तपासले</td><td>रु.</td></tr>
          <tr><td>२) पूर्वीचा खर्च</td><td>रु.</td></tr>
          <tr>
            <td>३) ह्या बिलांत दाखवलेला खर्च</td>
            <td>रु. ${totalAmount.toFixed(2)}/-</td>
          </tr>
          <tr><td>४) २ व ३ यांची बेरीज</td><td>रु.</td></tr>
          <tr><td>५) उपलब्ध शिल्लक</td><td>रु.</td></tr>
        </table>
      </div>

      <!-- RIGHT -->
      <div style="line-height:1.6">
        प्रमाणित करण्यात येते की सदर बिलांत दाखवलेली<br/>
        रक्कम व परिमाण अचूक असून सदर मागणी ही<br/>
        नियमानुसार असून महानगरपालिकेच्या<br/>
        संबंधित तरतुदीनुसार करण्यात आली आहे.<br/><br/>
        दिनांक : _____________<br/><br/>
        वस्तु घेणाऱ्या अधिकाऱ्याची सही
      </div>

    </div>

    <!-- ================= PAGE BREAK ================= -->
    <div style="page-break-before:always"></div>

    <!-- ================= PAGE 2 ================= -->

    <div style="display:grid;grid-template-columns:1fr 1fr;column-gap:20px;position:relative">

      <div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:#000"></div>

      <!-- LEFT COLUMN -->
      <div style="padding-right:12px">
        <p>
          मा. आयुक्त यांच्याकडे मंजुरीसाठी सादर<br/>
          मी मागणीची तपासणी केली असून ती सर्व बाबतीत अचूक आहे.
        </p>

        <p>दिनांक : ____________________</p>

        <p style="margin-top:25px">
          -----------------------------<br/>
          प्र.लेखापाल
        </p>

        <p>प्रभाग समिती – ${user?.ward}</p>

        <hr/>

        <p>मागणीची संपूर्ण फेड म्हणून</p>

        <p>
          रक्कम : <b>₹ ${totalAmount.toLocaleString("hi-IN")}/-</b><br/>
          (अक्षरी रुपये ${totalAmount} मात्र)
        </p>

        <p style="margin-top:30px">
          मुद्रा<br/><br/>
          -----------------------------<br/>
          पैसे घेणाऱ्याची सही
        </p>
      </div>

      <!-- RIGHT COLUMN -->
      <div style="padding-left:12px">
        <p>
          निर्णय क्रमांक : ____________________<br/>
          दिनांक : ____________________
        </p>

        <p>
          बिलांत दाखवलेली रक्कम<br/>
          <b>₹ ${totalAmount.toLocaleString("hi-IN")}/-</b><br/>
          (रुपये ${totalAmount} मात्र)
        </p>

        <p>मंजूर करण्यात येत आहे.</p>

        <p style="margin-top:30px">
          -----------------------------<br/>
          मुख्य लेखाधिकारी
        </p>

        <p style="margin-top:20px">
          दिनांक : ____________<br/>
          -----------------------------<br/>
          उप-आयुक्त
        </p>

        <p>वसई-विरार शहर महानगरपालिका</p>

        <hr/>

        <p>धनादेश क्रमांक : ____________<br/>दिनांक : ____________</p>

        <p>द्वारे देण्यात आले आणि प्रस्तावित रोख वहीत नोंद घेतली</p>

        <p>
          ---------------- &nbsp;&nbsp;
          ----------------<br/>
          रोखपाल &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; उप-आयुक्त
        </p>
      </div>

    </div>

  </div>
  `;

  // ===============================
  // PDF GENERATION
  // ===============================
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  await html2pdf().set({
    margin: [15, 12, 15, 12],
    filename: `Form22_${selectedMonthYear}.pdf`,
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  }).from(wrapper).save();

  document.body.removeChild(wrapper);
};






const downloadKaryalayinTipani =async() => {

const { foundReport, reportingData } = await fetchReportData(selectedMonthYear, user, setMode, setReportingDataSM, setMonthArr,wardName);

  setShowFormControl(true); 
    
try {
 
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  doc.addFileToVFS("DVOTSurekh_B_Ship.ttf",DVOTSurekhBShip);
    doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
    loadDvoSBShipFont(doc);
    doc.setFont("DVOTSurekh_B_Ship");
 
  const totalAmount = rows
  .filter(row => row.monthAndYear === selectedMonthYear)
  .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
  const totalAmountInWords = numberToMarathiWords(totalAmount);
  const pageWidth = doc.internal.pageSize.width;
  const leftSectionWidth = pageWidth * 0.15; 
  const rightSectionStart = leftSectionWidth + 5; 
  const rightAlignX = pageWidth - 15; 
  let yPos = 15;
  
  doc.setFontSize(10);
  doc.text(reverseDevanagariIfContainsViOrLi(`व. वि. श.`), 4, yPos); 
  yPos += 6; 
  doc.text(reverseDevanagariIfContainsViOrLi("महानगरपालिका"), 4, yPos); 
  
  doc.setDrawColor(0);
  doc.setLineWidth(0.1);
  doc.line(leftSectionWidth-2, 10, leftSectionWidth-2, 290); 
  
  doc.setFontSize(16);

  const imageWidthk = 50; 
const imageHeightk = 10;


const pageWidthk = doc.internal.pageSize.getWidth();


const centerXk = (pageWidthk - imageWidthk) / 2;


doc.addImage(karyalayintipani, 'PNG', centerXk, 10, imageWidthk, imageHeightk);


  doc.setFontSize(12);
  yPos = 30;
  const currentDate = new Date().toLocaleDateString('en-IN');
  doc.text(reverseDevanagariIfContainsViOrLi(`दिनांक: ${currentDate}`), rightAlignX, yPos, { align: "right" });
  yPos += 7;
  const wardname = [...new Set(
    rows.filter(row => row.ward === wardName) 
    .map(row => row.ward) 
)].join(', '); 

  doc.text(`${wardname}`, rightAlignX, yPos, { align: "right" });

const labelText = reverseDevanagariIfContainsViOrLi("विभाग:");
const labelWidth = doc.getTextWidth(labelText);
const imageWidth = 17;
const imageHeight = 5;
const spacing = 0;

const totalWidth = labelWidth + spacing + imageWidth;
const rightMargin = 10;


const startX = pageWidth - rightMargin - totalWidth;
const imageX = startX + labelWidth + spacing - 5; 

// Draw the text
doc.text(labelText, startX + labelWidth - 7, yPos, { align: "right" });

// Draw the image
doc.addImage(divabatti, "PNG", imageX, yPos - 4, imageWidth, imageHeight);

  yPos += 10;
  doc.text("मा.साहेब,", rightSectionStart, yPos);
  yPos += 7;

//   const meterpurposename = [...new Set(
//     rows.filter(row => row.meterPurpose === meterPurposeName) 
//         .map(row => row.meterPurpose)
// )].join(', '); 



const meterpurposename = meterPurposeManyName.length > 0 
  ? meterPurposeManyName.join(', ') 
  : "विद्युत मीटर";
  yPos += 2;
  doc.text(reverseDevanagariIfContainsViOrLi(`सादर करण्यात येते की, वसई विरार शहर महानगरपालिका ${wardname}`), rightSectionStart, yPos);
  yPos += 3;
  doc.addImage(mahanagarpaliketarfe, 'PNG', rightSectionStart, yPos, 80, 6); // adjust width/height as needed
  const meterPurpose = meterPurposeManyName.length > 0 ? meterPurposeManyName.join(', ') : "N/A";

  yPos += 2;
  
 
doc.text(`${meterPurpose}`, rightSectionStart , yPos + 10); // continue after image
yPos += 18;
 
  doc.text(reverseDevanagariIfContainsViOrLi("दिवाबत्तीची सोय केलेली आहे."), rightSectionStart, yPos);
  yPos += 2;
  

const imageWidthm = 120;
const imageHeightm = 6;
const spacingm = 2;

let x = rightSectionStart;
let y = yPos;


doc.addImage(maharashtarlong, 'PNG', rightSectionStart, yPos, 115, 7.5); 


  yPos += 12;  
  // doc.text(reverseDevanagariIfContainsViOrLi("केलेला आहे. या कामी म.रा.वि.वितरण कंपनी लिमिटेड यांच्याकडून पश्चिम"), rightSectionStart, yPos);

  doc.addImage(
  kelelaAaheYaKami,           // इम्पोर्ट केलेली इमेज
  rightSectionStart,           // X पोझिशन
  yPos - 4,                    // Y पोझिशन (जर टेक्स्टप्रमाणे लागायला वरखाली हलवायचे असल्यास +/- 4 अजस्ट करा)
  115,                           // इमेजची रुंदी (गरजेनुसार बदलू शकता)
  7                             // इमेजची उंची (गरजेनुसार बदलू शकता)
);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi(`विभागासाठी ${selectedMonthYear} रक्कम रुपये ${totalAmount.toLocaleString('hi-IN')}/-`), rightSectionStart, yPos);
  yPos += 7;
  // doc.text(`(अक्षरी रुपये ${totalAmountInWords} फक्त) चे वीज देयक सादर`, rightSectionStart, yPos);

// 1️⃣ पहिला भाग लावा
doc.text("(", rightSectionStart, yPos);

// 2️⃣ इमेज लावा (स्थानानुसार xPos समायोजित करा.)
doc.addImage(
  Akshari,
  rightSectionStart + 4, // "(" नंतर लगेच बसवण्यासाठी X पोझिशन समायोजित करा
  yPos - 5,               // Y पोझिशन (गरजेनुसार वरखाली करा.)
  12,                      // इमेजची रुंदी (गरजेनुसार बदला.)
  6.5                       // इमेजची उंची (गरजेनुसार बदला.)
);

// 3️⃣ उरलेला टेक्स्ट लावा
doc.text(` रुपये ${totalAmountInWords} फक्त) चे वीज देयक सादर`, rightSectionStart + 15, yPos);


  yPos += 7;
  doc.text("करून मागणी केलेली आहे.", rightSectionStart, yPos);
  yPos += 10;
  doc.text("-----------------------------------------------------------------------------------------------------", rightSectionStart, yPos);
  yPos += 25;

  const getSignatureForRole = (role, ward = user.ward) => {
    return reportingDataSM.find(remark => 
      remark.role === role && 
      remark.ward === ward &&
      remark.remark === "Approved"
    )?.signature;
  };


  // Store all approved signatures
const approvedSignatures = {
  lipik: getSignatureForRole("Lipik"),
  wardJE: getSignatureForRole("Junior Engineer"),
  headOfficeJE: getSignatureForRole("Junior Engineer", "Head Office"),
  accountant: getSignatureForRole("Accountant"),
  amc: getSignatureForRole("Assistant Municipal Commissioner")
};


// console.log("reportingDataSM ---down che",reportingDataSM)


const lipikData = reportingDataSM.find(item => item.role === 'Lipik');

// console.log("lipik--->>>",lipikData?.signature)
  const signatureWidthLI = 30;
  const signatureHeightLI = 15;
  const xPosLI = rightSectionStart + 0;
  const yOffsetLI = yPos - 15;



if (lipikData?.signature) {
  doc.addImage(
    lipikData.signature,
    'PNG',
    xPosLI,
    yOffsetLI,
    signatureWidthLI,
    signatureHeightLI
  );
}
    doc.text(reverseDevanagariIfContainsViOrLi("लिपिक, विद्युत विभाग"), rightSectionStart, yPos);
  

    const jrEngineerData = reportingDataSM.find(
      item => item.role === 'Junior Engineer' && item.ward !== 'Head Office'
    );
  
  const signatureWidthJR = 30;
    const signatureHeightJR = 15;
    const xPosJR = rightSectionStart + 60;
    const yOffsetJR = yPos - 17 - 5;

  
  if (jrEngineerData?.signature) {
    doc.addImage(
      jrEngineerData.signature,
      'PNG',
      xPosJR,
      yOffsetJR,
      signatureWidthJR,
      signatureHeightJR
    );
  }

    
    const signatureWidthjrw = 40; 
    const signatureHeightjrw = 7;
    const yOffsetJRw = yPos - 5;
   
    doc.addImage(kanistaabhiyanataward, 'PNG', rightSectionStart + 59, yOffsetJRw, signatureWidthjrw, signatureHeightjrw);


  
    const jrHOEngineerData = reportingDataSM.find(
      item => item.role === 'Junior Engineer' && item.ward === 'Head Office'
    );
  
    
    const signatureWidthJRHO = 30;
    const signatureHeightJRHO = 15;
    const xPosJRHO = rightSectionStart + 115;
    const yOffsetJRHO = yPos - 17 - 5;
    if(jrHOEngineerData?.signature){
      doc.addImage(
        jrHOEngineerData?.signature,
         'PNG',
         xPosJRHO,
         yOffsetJRHO,
         signatureWidthJRHO,
         signatureHeightJRHO
       );
    }
  
  
  
    const signatureWidthjrhow = 60; 
    const signatureHeightjrhow = 8;
    const yOffsetJRhow = yPos - 5;
   
    doc.addImage(kanistaabhiyantaho, 'PNG', rightSectionStart + 109, yOffsetJRhow,signatureWidthjrhow,signatureHeightjrhow);
    yPos += 7;
    // ******
    const prabhagImageWidth = 26;  // Adjust size as per your layout
const prabhagImageHeight = 6;

    // doc.text(reverseDevanagariIfContainsViOrLi(`प्रभाग समिती (${displayWardName})`), rightSectionStart, yPos);
    // doc.text(reverseDevanagariIfContainsViOrLi(`प्रभाग समिती (${displayWardName})`), rightSectionStart + 60, yPos);

    doc.addImage(prabhagsamiti, 'PNG', rightSectionStart-1, yPos - 4.5, prabhagImageWidth, prabhagImageHeight);
// Ward name beside image
doc.text(reverseDevanagariIfContainsViOrLi(`(${displayWardName})`), rightSectionStart + prabhagImageWidth + 2, yPos);

// Second image instead of second "प्रभाग समिती"
doc.addImage(prabhagsamiti, 'PNG', rightSectionStart-1 + 60, yPos - 4.5, prabhagImageWidth, prabhagImageHeight);
// Ward name beside second image
doc.text(reverseDevanagariIfContainsViOrLi(`(${displayWardName})`), rightSectionStart + 60 + prabhagImageWidth + 2, yPos);
    doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightSectionStart + 110, yPos);
    yPos += 7;
    doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightSectionStart, yPos);
    yPos += 10;
   
    yPos += 10;
 

  doc.text("मा.सादर,", rightSectionStart, yPos);
  yPos += 7;
  // doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिकेच्या विद्युत विभागाने सादर केलेल्या अहवालानुसार:"), rightSectionStart, yPos);

  // Insert image where "महानगरपालिकेच्या" would be
  doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर"), rightSectionStart, yPos);
const mahaImageWidth = 40;  // Adjust size as per image
const mahaImageHeight = 4.5;  // Adjust size as per image
doc.addImage(mahanagarpalikechya, 'PNG', rightSectionStart + 28.5, yPos - 4, mahaImageWidth, mahaImageHeight);

// Remaining part text (starting after image)
doc.text(reverseDevanagariIfContainsViOrLi("विद्युत विभागाने सादर केलेल्या अहवालानुसार:"), rightSectionStart + 27 + mahaImageWidth + 2, yPos);
  yPos += 7;
  // doc.text("१) आर्थिक वर्ष: २०२४-२५", rightSectionStart, yPos);
  const imageWidthfy = 30; // तुम्हाला हवी तशी width द्या
const imageHeightfy = 5.5; // proportion प्रमाणे height द्या

doc.addImage(aarthikvarsh, 'PNG', rightSectionStart, yPos-5, imageWidthfy, imageHeightfy);
  yPos += 7;
  // doc.text(reverseDevanagariIfContainsViOrLi("२) लेखाशिर्ष: दिवाबत्ती वीज देयक"), rightSectionStart, yPos);

const imageWidthLes = 28; // आवश्यकतेनुसार width द्या
const imageHeightLes = 4.4; // proportion प्रमाणे height द्या

doc.addImage(lekhashirshDivabattiVijDeyak, 'PNG', rightSectionStart-0.8, yPos-5, imageWidthLes, imageHeightLes);
  yPos += 7;
  doc.text("३) मूळ तरतूद: २,१७,२०,०००/-", rightSectionStart, yPos);
  yPos += 7;
  // doc.text("४) आतापर्यंतचा खर्च: ३,१६,४५,०३०/-", rightSectionStart, yPos);
  // Use this:
const imageWidthaata = 38; // तुमच्या PDF layout नुसार width सेट करा
const imageHeightaata = 5; // proportion नुसार height सेट करा

doc.addImage(aataparyantachaKharch, 'PNG', rightSectionStart, yPos-5, imageWidthaata, imageHeightaata);

// तुम्ही खर्चाची रक्कम हवी असेल, तर ती image नंतर किंवा शेजारी text म्हणून देऊ शकता:
doc.text("३,१६,४५,०३०/-", rightSectionStart + imageWidthaata + 2, yPos);
  yPos += 7;
  // doc.text(reverseDevanagariIfContainsViOrLi(`५) प्रस्तावित देयक रक्कम: ${totalAmount.toLocaleString('hi-IN')} /-`), rightSectionStart, yPos);

  const imageWidthpra = 39; // तुम्हाला हव्या प्रमाणे width ठरवा
const imageHeightpra = 5.5; // proportion प्रमाणे height ठरवा

doc.addImage(prastavitdeyakrakkam2, 'PNG', rightSectionStart, yPos-5, imageWidthpra, imageHeightpra);

// प्रस्तावित रक्कम text म्हणून टाका image च्या शेजारी:
doc.text(`${totalAmount.toLocaleString('hi-IN')} /-`, rightSectionStart + imageWidthpra + 2, yPos);

  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("६) शिल्लक तरतूद: १८,४८,१४,२५०/-"), rightSectionStart, yPos);
  yPos += 10;

  // doc.text(reverseDevanagariIfContainsViOrLi("तरी सदरचे देयक महाराष्ट्र राज्य वीज वितरण कंपनी लिमिटेड यांना"), rightSectionStart, yPos);


const beforeText = "तरी सदरचे देयक";
const afterText = "वीज वितरण कंपनी लिमिटेड यांना";
const imageWidthmtr = 22; // Adjust as needed
const imageHeightmtr = 5.5; // Adjust as needed

// Add before text
doc.text(reverseDevanagariIfContainsViOrLi(beforeText), rightSectionStart, yPos);

// Add image right after before text
const beforeTextWidth = doc.getTextWidth(reverseDevanagariIfContainsViOrLi(beforeText));
doc.addImage(maharashtra, 'PNG', rightSectionStart + beforeTextWidth + 2, yPos - 4.5, imageWidthmtr, imageHeightmtr);

// Add after text
doc.text(reverseDevanagariIfContainsViOrLi(afterText), rightSectionStart + beforeTextWidth + imageWidthmtr + 4, yPos);



  yPos += 7;
  // doc.text("उदाहोण्यासाठी मंजुरीस्तव सदर.", rightSectionStart, yPos);

  const imageWidthyana = 60;  // तुमच्या PDF layout नुसार adjust करा
const imageHeightyana = 5;  // proportion नुसार adjust करा

doc.addImage(yanaUdaHones, 'PNG', rightSectionStart, yPos-3, imageWidthyana, imageHeightyana);
  yPos += 25;
 


  
  const AccData = reportingDataSM.find(
    item => item.role === 'Accountant'
  );

const signatureWidthACC = 30;
    const signatureHeightACC = 15;
    const xPosACC = rightSectionStart + 0;
    const yOffsetACC = yPos - 15;
    if(AccData?.signature){

      doc.addImage(
        AccData?.signature,
        
              'PNG',
              xPosACC,
              yOffsetACC,
              signatureWidthACC,
              signatureHeightACC
            );
    }
 
  doc.text("लेखापाल", rightSectionStart, yPos);



const signatureWidthAMC = 30;
    const signatureHeightAMC = 15;
    const xPosAMC = rightSectionStart + 75;
    const yOffsetAMC = yPos - 15;

    doc.addImage(
         user?.signature,
          'PNG',
          xPosAMC,
          yOffsetAMC,
          signatureWidthAMC,
          signatureHeightAMC
        );
  doc.text("सहाय्यक आयुक्त", rightSectionStart + 75, yPos);
  doc.text("", rightSectionStart + 140, yPos);
  yPos += 7;
  // doc.text(reverseDevanagariIfContainsViOrLi(`प्रभाग समिती (${displayWardName})`), rightSectionStart, yPos);
  // doc.text(reverseDevanagariIfContainsViOrLi(`प्रभाग समिती (${displayWardName})`), rightSectionStart + 75, yPos);

  doc.addImage(prabhagsamiti, 'PNG', rightSectionStart, yPos-5, prabhagImageWidth, prabhagImageHeight);

// If you want to display ward name next to image:
doc.text(`(${displayWardName})`, rightSectionStart + prabhagImageWidth + 2, yPos);

// And for second position:
doc.addImage(prabhagsamiti, 'PNG', rightSectionStart + 75, yPos-5, prabhagImageWidth, prabhagImageHeight);
doc.text(`(${displayWardName})`, rightSectionStart + 75 + prabhagImageWidth + 2, yPos);
  doc.text("", rightSectionStart + 140, yPos);
  yPos += 7;
  doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightSectionStart, yPos);
  doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightSectionStart + 75, yPos);
  doc.text("", rightSectionStart + 140, yPos);
  const pdfData = doc.output('datauristring');
let type="karyalayintipani";
  
  handlePdfPreview(pdfData,type,selectedMonthYear,wardName);  
   
   const pdfBlob = doc.output('blob');
   setPdfBlob(pdfBlob);


} catch (error) {
  console.error("Error generating Karyalayin Tipani PDF:", error);
}
}




  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  return (
    <div style={gridStyle}>
      <Box sx={innerDivStyle}>
        {/* <Typography variant="h5" fontWeight="bold" color="#0d2136" mb={3}>ENERGY EXPENDITURE</Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          <BillDatePicker selectedMonthYear={selectedMonthYear} onChange={handleDateChange} />
          {(user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer' || user?.ward === 'Head Office') && (
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Search Ward</InputLabel>
              <Select value={wardName} onChange={handleChangeWard} label="Search Ward">
                <MenuItem value="">All Wards</MenuItem>
                {wardDataAtoI.map(w => <MenuItem key={w.ward} value={w.ward}>{w.ward}</MenuItem>)}
              </Select>
            </FormControl>
          )}
          <FormControl size="small" sx={{ minWidth: 250 }}>
            <InputLabel>Multiple Meter Purpose</InputLabel>
            <Select multiple value={meterPurposeManyName} onChange={handleChangeManyMeterPurpose} input={<OutlinedInput label="Multiple Meter Purpose" />}>
              {meterPurposeData.map(p => (
                <MenuItem key={p.purpose} value={p.purpose}>
                  <Checkbox checked={meterPurposeManyName.includes(p.purpose)} />
                  {p.purpose}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button variant="outlined" onClick={handleDownloadPDF}>Ward Bill Totals</Button>
          <Button variant="outlined" onClick={handleDownloadForm22}>Form 22 Report PDF</Button>
          <Button variant="outlined" onClick={downloadKaryalayinTipani}>Generate Karyalayin Tipani</Button>
          <Button variant="outlined" onClick={() => setFaultyMeterModalOpen(true)}>Faulty Meter Report</Button>
        </Box> */}





{/* ---------- TITLE ---------- */}

<Box
  sx={{
    marginLeft: isSidebarOpen ? '240px' : '70px',  
    transition: 'margin-left 0.3s ease',
    padding: '20px'
  }}
>
<Typography
  variant="h5"
  fontWeight="bold"
  color="#0d2136"
  sx={{ mb: 3 }}
>
  ENERGY EXPENDITURE
</Typography>

<Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 3,
    flexWrap: "nowrap",
    overflowX: "auto",
  }}
>
 
  {/* <BillDatePicker
    selectedMonthYear={selectedMonthYear}
    onChange={handleDateChange}
  /> */}

   <RegionalEnergyExpenditureBillDatePicker
    selectedMonthYear={selectedMonthYear}
    onChange={handleDateChange}
  />


  

  {(user?.role === "Super Admin" ||
    user?.role === "Admin" ||
    user?.role === "Executive Engineer" ||
    user?.ward === "Head Office") && (
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <InputLabel>Search Ward</InputLabel>
      <Select
        value={wardName}
        onChange={handleChangeWard}
        label="Search Ward"
      >
        <MenuItem value="">All Wards</MenuItem>
        {wardDataAtoI.map((w) => (
          <MenuItem key={w.ward} value={w.ward}>
            {w.ward}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )}

  {/* Meter Purpose */}
  <FormControl size="small" sx={{ minWidth: 200 }}>
    <InputLabel>Multiple Meter Purpose</InputLabel>
    <Select
      multiple
      value={meterPurposeManyName}
      onChange={handleChangeManyMeterPurpose}
      input={<OutlinedInput label="Multiple Meter Purpose" />}
    >
      {meterPurposeData.map((p) => (
        <MenuItem key={p.purpose} value={p.purpose}>
          <Checkbox checked={meterPurposeManyName.includes(p.purpose)} />
          {p.purpose}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>

<Box
  sx={{
    mb: 2,
    display: "flex",
    gap: 1.5,
    flexWrap: "nowrap",
    overflowX: "auto",
  }}
>
  <Button variant="outlined" onClick={handleDownloadPDF} style={{color:"#757575",borderColor:"#757575"}}>
    WARD BILL TOTALS
  </Button>

  <Button variant="outlined" onClick={handleDownloadForm22} style={{color:"#757575",borderColor:"#757575"}}>
    FORM 22 REPORT PDF
  </Button>

  <Button variant="outlined" onClick={downloadKaryalayinTipani} style={{color:"#757575",borderColor:"#757575"}}>
    GENERATE KARYALAYIN TIPANI
  </Button>

  <Button variant="outlined" onClick={() => setFaultyMeterModalOpen(true)} style={{color:"#757575",borderColor:"#757575"}}>
    FAULTY METER REPORT
  </Button>
</Box>



</Box>




        

        <Box sx={{ height: 600, width: '100%' }}>
          <StyledDataGrid
            rows={rows}
            columns={columns}
            pagination
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[10, 25, 50, 100]}
            rowCount={pagination?.totalBills || 0}
            loading={loading}
            sx={{ backgroundColor: 'white', marginLeft: isSidebarOpen ? '240px' : '70px',  
    transition: 'margin-left 0.3s ease',
    padding: '20px'}}
          />
        </Box>

        <FaultyMeterConsumerNumber
          open={faultyMeterModalOpen}
          handleClose={() => setFaultyMeterModalOpen(false)}
          jakraKramank={jakraKramank}
          setJakraKramank={setJakraKramank}
          consumerNumber={consumerNumber}
          setConsumerNumber={setConsumerNumber}
          date={date}
          setDate={setDate}
          handleSubmit={handleSaveConsumerDetails}
        />

        <PdfPreviewModal
          open={pdfPreviewOpen}
          onClose={() => setPdfPreviewOpen(false)}
          pdfUrl={pdfContent}
          title={pdfType}
          monthpassbackend={monthPass}
          wardName={wardName}
        />
      </Box>
    </div>
  );
}



;and const wardAddressTextMap = {
  "Ward-A": [
    "प्रभाग समिती अ, विभागीय कार्यालय,",
    "बोळींज, विरार (प.), ता. वसई",
    "जि. पालघर, पिन कोड ४०१३०३"
  ],
  "Ward-B": [
    "प्रभाग समिती बी, विभागीय कार्यालय,",
    "वसई (प.), ता. वसई",
    "जि. पालघर, पिन कोड ४०१३०५"
  ],
  "Ward-C": [
    "प्रभाग समिती सी, विभागीय कार्यालय,",
    "नालासोपारा (प.), ता. वसई",
    "जि. पालघर, पिन कोड ४०१३०५"
  ],
  "Ward-D": [
    "प्रभाग समिती डी, विभागीय कार्यालय,",
    "आचोळे, नालासोपारा (प.)",
    "जि. पालघर, पिन कोड ४०१२०९"
  ],
  "Ward-E": [
    "प्रभाग समिती ई,",
    "दुर्दम गार्डन जवळ,",
    "नालासोपारा (प.), ता. वसई",
    "जि. पालघर, पिन कोड ४०१२०३"
  ],
  "Ward-F": [
    "प्रभाग समिती एफ,",
    "वालिव मंदिर जवळ, वालिव",
    "गाव, वसई (पू.)"
  ],
  "Ward-G": [
    "प्रभाग समिती जी, वालिव,",
    "वालिव नाका, वसई ईस्ट",
    "जि. पालघर, पिन कोड ४०१२०८"
  ],
  "Ward-H": [
    "प्रभाग समिती एच, नावर,",
    "विभागीय कार्यालय, नावर",
    "नालासोपारा (पू.)"
  ],
  "Ward-I": [
    "प्रभाग समिती आय, कार्यालय,",
    "बोळींज, विरार (प.)",
    "जि. पालघर, पिन कोड ४०१३०३"
  ],
};


=====================

const handleSaveConsumerDetails = () => {
  if (!jakraKramank || !consumerNumber || !date) {
    setSnackbarMessage('Please fill all consumer details');
    setSnackbarOpen(true);

    setPdfData({ jakraKramank, consumerNumber, date });
    setPdfPreviewOpen(true);

    handleCloseFaultyMeterModal();
    return;
  }
function convertToMarathiDigits(numberStr) {
  const marathiDigits = ['०','१','२','३','४','५','६','७','८','९'];
  return String(numberStr).split('').map(char =>
    /\d/.test(char) ? marathiDigits[parseInt(char)] : char
  ).join('');
}

  console.log('Consumer details saved:', { jakraKramank, consumerNumber, date });

  setSnackbarMessage('Consumer details saved successfully!');
  setSnackbarOpen(true);
  setFaultyMeterModalOpen(false);

  // Generate the PDF
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  doc.addFileToVFS("DVOTSurekh_B_Ship.ttf", DVOTSurekhBShip);
  doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
  loadDvoSBShipFont(doc);
  doc.setFont("DVOTSurekh_B_Ship");
  doc.setFontSize(12);

  const pageWidth = doc.internal.pageSize.getWidth();
  const leftX = 10;
  const centerX = pageWidth / 2 - 10;
  const rightX = pageWidth - 60;
  let y = 20;

  // Add ward logo
  const isPrivilegedUser = ['Executive Engineer', 'Admin', 'Super Admin'].includes(user.role) || (user.role === 'Junior Engineer' && user.ward === 'Head Office');
  const selectedWard = isPrivilegedUser ? wardName : user.ward;
  const addressImage = getWardAddressImage(selectedWard);
  if (addressImage) {
    doc.addImage(addressImage, 'PNG', leftX, y, 50, 28);
  }

  // Phone
  const phoneText = ": ०२५०-२३३४१४४";
  const phoneTextWidth = doc.getTextWidth(phoneText);
  doc.addImage(FADurdhwani, 'PNG', rightX - phoneTextWidth - 15 + 50, y - 1.2, 15, 5.2);
  doc.text(phoneText, rightX - phoneTextWidth + 50, y + 2.5);

  // Fax
  const faxText = ": ०२५०-२५२५१०७";
  const faxTextWidth = doc.getTextWidth(faxText);
  doc.addImage(FAFax, 'PNG', rightX - faxTextWidth - 13 + 48 - 0.3, y + 5.5, 12, 5);
  doc.text(faxText, rightX - faxTextWidth + 47, y + 9.5);

  // जा.क्र.
  const jaKraSuffix = " :";
  const jaKraTextWidth = doc.getTextWidth(jaKraSuffix);
  doc.addImage(FAJaKra, 'PNG', rightX - jaKraTextWidth - 12 + 15, y + 13, 12, 4);
  doc.text(jaKraSuffix, rightX - jaKraTextWidth + 15, y + 17);
  doc.addImage(FAJakraFirstValue, 'PNG', rightX - jaKraTextWidth + 16, y + 11.8, 29,7);

 


if (jakraKramank) {
    const marathiJakra = convertToMarathiDigits(jakraKramank); 
  doc.setFontSize(12); // 1pt ने कमी
  doc.text(
    // String(jakraKramank),
    marathiJakra,
    rightX - jaKraTextWidth + 18 + 26 + 2 - 1, // 1px left
    y + 16.7 // 1px up
  );
  doc.setFontSize(12); // reset font size if needed
}


  // दिनांक
  const formattedDate = new Date(date).toLocaleDateString('mr-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  doc.text(reverseDevanagariIfContainsViOrLi(`दिनांक : ${formattedDate}`), rightX+1, y + 24);

  // Center logo
  const logoWidth = 30;
  const logoHeight = 30;
  doc.addImage(logovvcmccmp, 'PNG', centerX, 15, logoWidth, logoHeight);

  y += 36;
  doc.line(10, y - 2, pageWidth - 10, y - 2);
  y += 15;

  // Add prati image
  const pratiImage = getWardPrati(selectedWard);
  if (pratiImage) {
    doc.addImage(pratiImage, 'PNG', leftX, y, 50, 28);
    y += 28 + 12;
  }

  doc.setFontSize(15);

  // Center heading
  const headingY = 100 + 7;
  const updatedWidth = 46;
  const updatedHeight = 7.2;
  const imageX = (pageWidth - updatedWidth) / 2;
  doc.addImage(FAFaultyMeterBabat, 'PNG', imageX, headingY, updatedWidth+2, updatedHeight-1);

  // 🔒 Optionally add consumer number/date inside the PDF body
  // doc.text(`Customer No: ${consumerNumber}`, 20, headingY + 20);

  // Output
let currentY;
currentY += updatedHeight + 30;



 
const normalSpacing = 8;
const extraSpacing = 14;
const leftspaceX = leftX + 15;
 doc.setFontSize(14); 
y += 10;
 




const imageWidth = 75;
const imageHeight = 6;

const prabhagImageWidth = 75;
const prabhagImageHeight = 6;


doc.addImage(FAMahodayUproktaVishayanwaye, 'PNG', leftspaceX, y+6, imageWidth, imageHeight);


const gapBetweenImages = 1;
const secondImageX = leftspaceX + imageWidth + gapBetweenImages;

doc.addImage(FAVVCMCPrabhagSamiti, 'PNG', secondImageX, y+6, prabhagImageWidth, prabhagImageHeight);

y += Math.max(imageHeight, prabhagImageHeight) + normalSpacing;

const grahakIconWidth = 16;
const grahakIconHeight = 6;

// Draw FAGrahakK icon on left
doc.addImage(FAGrahakK, 'PNG', leftspaceX, y, grahakIconWidth, grahakIconHeight);

// Draw Consumer Number next to icon
// if (consumerNumber) {
//   doc.setFontSize(8);
//   doc.text(`${consumerNumber}`, leftspaceX + grahakIconWidth + 2, y + 4);
// }

if (consumerNumber) {
  const marathiConsumerNumber = convertToMarathiDigits(consumerNumber); // ← मराठीत रूपांतर
  doc.setFontSize(11);
  doc.text(
    marathiConsumerNumber,
    leftspaceX + grahakIconWidth + 2+1,
    y + 4
  );
}

// Draw FAGrahakKRaBadali image on same line (next to consumer number)
const grahakTextWidth = doc.getTextWidth(consumerNumber || '');
const grahakImageStartX = leftspaceX + grahakIconWidth + 2 + grahakTextWidth + 4; // Add margin after text

const grahakImageWidth = 99;
const grahakImageHeight = 5;
doc.addImage(FAGrahakKRaBadali, 'PNG', grahakImageStartX, y, grahakImageWidth-3.8, grahakImageHeight+0.8);



y += grahakImageHeight + 2;

// Add FAGrahakKNextNavinMeter image on new line
const navinMeterWidth = 70;
const navinMeterHeight = 5;
doc.addImage(FAGrahakKNextNavinMeter, 'PNG', leftspaceX, y, navinMeterWidth-4, navinMeterHeight+0.8);




const jenekarunImageWidth = 150;
const jenekarunImageHeight = 6;
y += grahakImageHeight + 2;
doc.addImage(FAJenekarunBillBharneSopeHoil, 'PNG', leftspaceX, y, jenekarunImageWidth, jenekarunImageHeight);

// Prepare y for next content
y += jenekarunImageHeight + 2;


const navinMeterImageWidth = 150; 
const navinMeterImageHeight = 6; 


doc.addImage(FANavinMeterBasavinycheMaganipatrak, 'PNG', leftspaceX, y, navinMeterImageWidth, navinMeterImageHeight);


y += navinMeterImageHeight + 2;
   
    y = 240;
const signatureX = pageWidth - 60;


let prabhagSamitiText = "प्रभाग समिती";

if (user?.ward === "Ward-A") {
  prabhagSamitiText = "प्रभाग समिती अ";
} else if (user?.ward === "Ward-B") {
  prabhagSamitiText = "प्रभाग समिती बी";
} else if (user?.ward === "Ward-C") {
  prabhagSamitiText = "प्रभाग समिती सी";
} else if (user?.ward === "Ward-D") {
  prabhagSamitiText = "प्रभाग समिती डी";
} else if (user?.ward === "Ward-E") {
  prabhagSamitiText = "प्रभाग समिती 'ई'";
} else if (user?.ward === "Ward-F") {
  prabhagSamitiText = "प्रभाग समिती एफ";
} else if (user?.ward === "Ward-G") {
  prabhagSamitiText = "प्रभाग समिती जी";
} else if (user?.ward === "Ward-H") {
  prabhagSamitiText = "प्रभाग समिती एच";
} else if (user?.ward === "Ward-I") {
  prabhagSamitiText = "प्रभाग समिती आय";
}


;


const rightPadding = 100;
const rightlX = pageWidth - 10; 



const wardImageMap = {
  'Ward-A': FAAdhikshakWardA,
  'Ward-B': FAAdhikshakWardB,
  'Ward-C': FAAdhikshakWardC,
  'Ward-D': FAAdhikshakWardD,
  'Ward-E': FAAdhikshakWardE,
  'Ward-F': FAAdhikshakWardF,
  'Ward-G': FAAdhikshakWardG,
  'Ward-H': FAAdhikshakWardH,
  'Ward-I': FAAdhikshakWardI,
};

// const isPrivilegedUser =
//   user.role === 'Executive Engineer' ||
//   user.role === 'Admin' ||
//   user.role === 'Super Admin' ||
//   (user.role === 'Junior Engineer' && user.ward === 'Head Office');


// const selectedWard = isPrivilegedUser ? wardName : user.ward;

const adhikshakImage = wardImageMap[selectedWard];






if (adhikshakImage) {
  const adhikshakImageWidth = 60;
  const adhikshakImageHeight = 20;

  doc.addImage(
    adhikshakImage,
    'PNG',
    rightlX - adhikshakImageWidth,
    y - 50, // shifted 15px upward
    adhikshakImageWidth,
    adhikshakImageHeight
  );

  y += adhikshakImageHeight + 2;
}


  
  const pdfData = doc.output('datauristring');
  const pdfBlob = doc.output('blob');
  const url = URL.createObjectURL(pdfBlob);
  const type = 'faultymeter';
  const selectedMonthYear = date;

  handlePdfPreview(pdfData, type, selectedMonthYear);
  setPdfBlobUrl(url);
};

