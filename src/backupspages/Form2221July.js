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
//         const response = await axios.post(`${baseUrl}/searchReport`, {
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
//               data.cell.x + 2 + 35, 
//               data.cell.y + 16 + 2.8    
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


// const vastuImgPosX = 130; 
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

// const vastuImgPosXa = 130; 
// const vastuImgPosYb = yPos + 82; 
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
//             const rightColX = data.cell.x + 5;
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
            
         
//             doc.text("       ________    ________", rightColX-9, imgY-2);
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
  
//    doc.setTextColor(0, 0, 0); // green for 'Verified'
//   doc.text('Verified', textX, verifiedY, { align: 'center' });
// }

      
//       doc.text("-------------                  -------------", 15, yPos);
//       yPos += 10;
      

//       const signShrinkRatio = 0.6875;

// const lekhapalWidth = 30 * signShrinkRatio;
// const lekhapalHeight = (14 * signShrinkRatio) - 5;

// const ayuktaWidth = 30 * signShrinkRatio;
// const ayuktaHeight = (14 * signShrinkRatio) - 5;


// doc.addImage(
//   MUPramukhLekhapal,
//   'PNG',
//   15,
//   yPos-4,
//   lekhapalWidth,
//   lekhapalHeight+2
// );


// doc.addImage(
//   MUSahaAayukta,
//   'PNG',
//   66,
//   yPos-4,
//   ayuktaWidth,
//   ayuktaHeight+1
// );

// yPos += lekhapalHeight + 5; 
      
      
//       if (user.ward && signatures[user.ward]?.["Assistant Municipal Commissioner"]) {
//         const amcSigWidth = 30;
//         const amcSigHeight = 30;
//         const amcSigX = 80;
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
      
      
     




// const baseShrinkRatio = 0.625;

// const fontReductionRatio = 13 / 16; 

// const fontSizeReductionFinalRatio = 11 / 16;

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



// doc.setFontSize(11); 
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



// doc.setFontSize(12); 

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
     
// const maganiImgOriginalWidth = 55;
// const maganiImgOriginalHeight = 6.5;


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
      
//       const rupyaText = `(रुपये ${totalAmountInWords} `;
// doc.text(rupyaText, 120, yPos);


// const textWidth = doc.getTextWidth(rupyaText);
// const matraX = 120 + textWidth + 1; 
// const matraY = yPos - 4; 
// doc.addImage(matra, 'PNG', matraX, matraY, 12, 5); 

// doc.text(")", matraX + 13, yPos); 

//       yPos += 10;
//       doc.text("मंजूर करण्यात येत आहे.", 120, yPos);
//       yPos += 10;

     
//       const muOriginalWidth = 28;
// const muOriginalHeight = 6;

// const muOriginalDiagonal = Math.sqrt(muOriginalWidth ** 2 + muOriginalHeight ** 2);
// const muTargetDiagonal = muOriginalDiagonal - 2;  
// const muScaleRatio = muTargetDiagonal / muOriginalDiagonal;

// const muImgWidth = parseFloat((muOriginalWidth * muScaleRatio).toFixed(2));
// const muImgHeight = parseFloat((muOriginalHeight * muScaleRatio).toFixed(2));

// const muImgX = 120;         
// const muImgY = yPos - 5 + 2; 


// doc.addImage(
//   MUMukhyaLekhadhikari,
//   'PNG',
//   muImgX,
//   muImgY,
//   muImgWidth+1,
//   muImgHeight+1.1
// );



//   const muLineStartX = muImgX + muImgWidth + 5;  
//   const muLineY = yPos + 1;
//   const muLineEndX = muLineStartX + 20;  

//   doc.setLineWidth(0.3);
//   doc.line(muLineStartX, muLineY, muLineEndX, muLineY);

      
//       yPos += 13;
     







// const upaayuktaOriginalWidth = 22;
// const upaayuktaOriginalHeight = 5;


// const upaayuktaOriginalDiagonal = Math.sqrt(
//   upaayuktaOriginalWidth ** 2 + upaayuktaOriginalHeight ** 2
// );
// const upaayuktaTargetDiagonal = upaayuktaOriginalDiagonal - 2;
// const upaayuktaScaleRatio = upaayuktaTargetDiagonal / upaayuktaOriginalDiagonal;


// const upaayuktaImgWidth = parseFloat(
//   (upaayuktaOriginalWidth * upaayuktaScaleRatio).toFixed(2)
// );

// const upaayuktaImgHeight = parseFloat(
//   (upaayuktaOriginalHeight * upaayuktaScaleRatio).toFixed(2)
// );


// var upaayuktaImgX = 168;          
// var upaayuktaImgY = yPos - 5 + 2;  


// if (signatureMatches[5] === "verified") {
//   const upaayuktaSigWidth = upaayuktaImgWidth;
//   const upaayuktaSigHeight = upaayuktaImgHeight;
//   const upaayuktaSigX = upaayuktaImgX;
//   const upaayuktaSigY = upaayuktaImgY;

//   const today = new Date();
//   const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
//     (today.getMonth() + 1).toString().padStart(2, '0')
//   }/${today.getFullYear()}`;

//   const textX = upaayuktaSigX + upaayuktaSigWidth / 2; 
//   const dateY = upaayuktaSigY + upaayuktaSigHeight + 2; 
//   const verifiedY = dateY + 5; 

//   doc.setFontSize(8);
//   doc.setTextColor(0, 0, 0);
//   doc.text(formattedDate, textX, dateY, { align: 'center' });

//   doc.setFontSize(8);

//   doc.setTextColor(0, 0, 0);
//   doc.text('Verified', textX, verifiedY, { align: 'center' });
// }







// doc.setFontSize(13); 
// doc.text(reverseDevanagariIfContainsViOrLi("दिनांक"), 120, yPos);



// doc.addImage(
//   MUUpaaayukta,
//   'PNG',
//   upaayuktaImgX,
//   upaayuktaImgY,
//   upaayuktaImgWidth+1,
//   upaayuktaImgHeight+1.7
// );

  
      

//       doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 140, yPos + 7);
      
     
//       yPos += 15;
//       doc.text("----------------------------------------------------", 120, yPos);
     

// const pradanarthImgOriginalWidth = 36;
// const pradanarthImgOriginalHeight = 5.2;

// const pradanarthOriginalDiagonal = Math.sqrt(pradanarthImgOriginalWidth ** 2 + pradanarthImgOriginalHeight ** 2);
// const pradanarthTargetDiagonal = pradanarthOriginalDiagonal - 2;
// const pradanarthScaleRatio = pradanarthTargetDiagonal / pradanarthOriginalDiagonal;

// const pradanarthImgWidth = parseFloat((pradanarthImgOriginalWidth * pradanarthScaleRatio).toFixed(2));
// const pradanarthImgHeight = parseFloat((pradanarthImgOriginalHeight * pradanarthScaleRatio).toFixed(2));

// const pradanarthImgX = 120 + 15; 
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
//  doc.setFontSize(13); 
//       doc.text("---------------------------------------------- यांस", 118, yPos);

     

// yPos += 20;



// const upaayuktaTestUser = users[19];
// const upaayuktaTestSignature = upaayuktaTestUser?.signature || null;




// doc.text(reverseDevanagariIfContainsViOrLi("दिनांक"), 120, yPos);


// const deputyCommissionerImgOriginalWidth = 22;
// const deputyCommissionerImgOriginalHeight = 5;


// const deputyCommissionerDiagonal = Math.sqrt(
//   deputyCommissionerImgOriginalWidth ** 2 + deputyCommissionerImgOriginalHeight ** 2
// );
// const deputyCommissionerTargetDiagonal = deputyCommissionerDiagonal - 2;
// const deputyCommissionerScaleRatio = deputyCommissionerTargetDiagonal / deputyCommissionerDiagonal;


// const deputyCommissionerImgWidth = parseFloat(
//   (deputyCommissionerImgOriginalWidth * deputyCommissionerScaleRatio).toFixed(2)
// );
// const deputyCommissionerImgHeight = parseFloat(
//   (deputyCommissionerImgOriginalHeight * deputyCommissionerScaleRatio).toFixed(2)
// );


// const deputyCommissionerImgX = 168;
// const deputyCommissionerImgY = yPos - 5 + 2;


// doc.addImage(
//   MUUpaaayukta,
//   'PNG',
//   deputyCommissionerImgX,
//   deputyCommissionerImgY,
//   deputyCommissionerImgWidth+1,
//   deputyCommissionerImgHeight+2
// );


// doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 125, yPos + 7);
      
//       yPos += 15; 
//       doc.text("----------------------------------------------------", 120, yPos);
      
//       yPos += 10; 
     



//       const ddNumberImgOriginalWidth = 30;
// const ddNumberImgOriginalHeight = 5.5;

// const ddNumberDiagonal = Math.sqrt(
//   ddNumberImgOriginalWidth ** 2 + ddNumberImgOriginalHeight ** 2
// );
// const ddNumberTargetDiagonal = ddNumberDiagonal - 2;
// const ddNumberScaleRatio = ddNumberTargetDiagonal / ddNumberDiagonal;

// const ddNumberImgWidth = parseFloat((ddNumberImgOriginalWidth * ddNumberScaleRatio).toFixed(2));
// const ddNumberImgHeight = parseFloat((ddNumberImgOriginalHeight * ddNumberScaleRatio).toFixed(2));


// const ddNumberImgX = 120;
// const ddNumberImgY = yPos - 5 + 2; 

// doc.addImage(
//   MUDhanadeshKramank,
//   'PNG',
//   ddNumberImgX,
//   ddNumberImgY,
//   ddNumberImgWidth,
//   ddNumberImgHeight+2
// );


// doc.text(reverseDevanagariIfContainsViOrLi("----------  दिनांक  ------------"), ddNumberImgX + ddNumberImgWidth + 5, yPos);
      
//       yPos += 10;
    
// const ddnImgOriginalWidth = 46;
// const ddnImgOriginalHeight = 5.5;

// const ddnOriginalDiagonal = Math.sqrt(ddnImgOriginalWidth ** 2 + ddnImgOriginalHeight ** 2);
// const ddnTargetDiagonal = ddnOriginalDiagonal - 2;
// const ddnScaleRatio = ddnTargetDiagonal / ddnOriginalDiagonal;

// const ddnImgWidth = parseFloat((ddnImgOriginalWidth * ddnScaleRatio).toFixed(2));
// const ddnImgHeight = parseFloat((ddnImgOriginalHeight * ddnScaleRatio).toFixed(2));


// const ddnImgX = 120;
// const ddnImgY = yPos - 5 + 2; 

// doc.addImage(
//   MUDwareDenyatAale,
//   'PNG',
//   ddnImgX,
//   ddnImgY,
//   ddnImgWidth,
//   ddnImgHeight+1.5
// );


// doc.text(reverseDevanagariIfContainsViOrLi("----------------------"), ddnImgX + ddnImgWidth + 5, yPos);

    

// const prustavImgOriginalWidth = 50;
// const prustavImgOriginalHeight = 6;


// const prustavOriginalDiagonal = Math.sqrt(prustavImgOriginalWidth ** 2 + prustavImgOriginalHeight ** 2);
// const prustavTargetDiagonal = prustavOriginalDiagonal - 2;
// const prustavScaleRatio = prustavTargetDiagonal / prustavOriginalDiagonal;

// const prustavImgWidth = parseFloat((prustavImgOriginalWidth * prustavScaleRatio).toFixed(2));
// const prustavImgHeight = parseFloat((prustavImgOriginalHeight * prustavScaleRatio).toFixed(2));


// const prustavImgX = 120;         
// const prustavImgY = yPos + 7 - 5 + 2; 


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
      
//       doc.line(110, 60, 110, yPos + 10); 
      
      
      
      
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
      
//       const pdfData = doc.output('blob');
      
    
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
// ================================================================================
// 23 July 2025

// --------------------------------------------------------------------------

const handleDownloadForm22 = async() => {

 const { foundReport, reportingData } = await fetchReportData(
    selectedMonthYear,
    user,
    setMode,
    setReportingDataSM,
    setMonthArr
  );


  console.log("dhdhdhdhd",monthArr)

  const signatureMatches = checkSignatureStatusForm22(monthArr);
console.log("signatureMatches test form22-->>",signatureMatches[0])

  const lipikInfo = signatureMatches.find(
  match => match.role === "Lipik" && match.checked
);


    if (selectedMonthYear) {
      try {
        const response = await axios.post(`${baseUrl}/searchReport`, {
          month: selectedMonthYear,
        });
        const foundReport = response.data;
        
        if (foundReport && foundReport[0] && foundReport[0].monthReport === selectedMonthYear) {
          setMode('edit');
        } else {
          setMode('create');
        }
      } catch (error) {
        console.error("Error searching for report:", error);
      }
    }
    
    setShowFormControl(true); 
    
    try {
   
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      
      doc.addFileToVFS("DVOTSurekh_B_Ship.ttf", DVOTSurekhBShip);
      doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
      loadDvoSBShipFont(doc);
      doc.setFont("DVOTSurekh_B_Ship");
      
     
      let yPos = 15;
      
     
      doc.setFontSize(10);
      doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
      doc.text("M.S.C. 22", 170, yPos);
      
      const logoWidth = 30;
      const logoHeight = 30;
      const logoX = 15;
      const logoY = yPos + 10; 
      
      const allWardNames = [...new Set(rows.map(row => row.ward))];
      
     
      const wardnameList = allWardNames.includes(wardName)
        ? [wardName, ...allWardNames.filter(name => name !== wardName)]
        : allWardNames;
      
     
      const wardname = wardnameList.join(', ');
      
      doc.addImage(logovvcmc, 'PNG', logoX, logoY, logoWidth, logoHeight);
      
      yPos += 20;
      doc.setFontSize(12);
      doc.text("नमुना नं. २२", 85, yPos);
      
      yPos += 8;
      doc.text(reverseDevanagariIfContainsViOrLi("(नियम २२ (१))"), 85, yPos);
      
      yPos += 10;
      doc.setFontSize(14);
      doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), 65, yPos);
      
      yPos += 15;
      doc.setFontSize(11);
      
      
      //doc.addImage(billkramank, 'PNG', 15, yPos - 3, 20, 5);
      doc.addImage(billkramank, 'PNG', 14, yPos - 4, 21, 6);


      doc.line(40, yPos, 100, yPos);
       //doc.addImage(pramanakKramank, 'PNG', 105, yPos - 2.5, 23, 4);
      doc.addImage(pramanakKramank, 'PNG', 104, yPos - 3.5, 28, 4.5);

      
      doc.line(140, yPos, 170, yPos);
      const currentDate = new Date().toLocaleDateString('en-IN');
      doc.text(reverseDevanagariIfContainsViOrLi(`दिनांक ${currentDate}`), 150, yPos);
      
      yPos += 10;
      doc.text(reverseDevanagariIfContainsViOrLi("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी"), 15, yPos);
      yPos += 8;
      
      doc.text(`पत्ता : ${user?.ward}`, 15, yPos);
      
      yPos += 8;
      doc.text(reverseDevanagariIfContainsViOrLi("माल : विद्युत विभाग"), 15, yPos);
      yPos += 8;
      
      doc.addImage(bookRef, 'PNG', 15, yPos - 2.5, 100, 6);
      
      const totalAmount = rows
        .filter(row => row.monthAndYear === selectedMonthYear)
        .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
      
      const totalAmountInWords = (totalAmount); 
      let l1 = fixPashchim(`पश्चिम`);
      
      
      yPos += 10;
      
      // -------------------------------------------------------------------
      doc.autoTable({
        startY: yPos,
        head: [[
          '', 
          '',
          '',
          'दर',
          reverseDevanagariIfContainsViOrLi('युनिट'),
          'रक्कम\nरु.    पै.'
        ]],
        body: [[
          '१',
          reverseDevanagariIfContainsViOrLi(`वसई विरार शहर महानगरपालिका`), 
          '',
          '',
          '',
          `${totalAmount.toFixed(2)}/-`
        ]],
        
        foot: [[
          { content: 'एकूण',  colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
          { content: `${totalAmount.toFixed(2)}/-`, styles: { halign: 'right', fontStyle: 'bold' } }
        ]],




        
        didParseCell: function (data) {
          // दर आणि युनिट headings vertical center साठी
  if (
    data.section === 'head' &&
    (data.column.index === 0||data.column.index === 1||data.column.index === 2 || data.column.index === 3 || data.column.index === 4)
  ) {
    data.cell.styles.valign = 'middle'; // vertical align center
  }
// ------
          if (data.section === 'body' && data.row.index === 0 && data.column.index === 1) {
            data.cell.styles.minCellHeight = 30; 
            data.cell.styles.textColor = [0, 0, 0];
          }
        },
        
        didDrawCell: function (data) {
          if (data.section === 'body' && data.column.index === 1 && data.row.index === 0) {
            doc.addImage(
              NAkaryashetraPrabhaSamiti,
              'PNG',
              data.cell.x + 2,
              data.cell.y + 6.3,
              41,             
              5.7             
            );
            
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(
              `${user?.ward}`,           
              data.cell.x + 3 + 40 ,         
              data.cell.y + 6.4 + 3.9           
            );
            
            doc.addImage(
              NAVibhagatilVirarVibhagache,
              'PNG',
              data.cell.x + 2,
              data.cell.y + 11.6,   
              41,
              4.8
            );
            doc.addImage(
              NAMRaVVComMahe,
              'PNG',
              data.cell.x + 2,
              data.cell.y + 17,    
              35,
              4.8
            );
           
            doc.setFontSize(8);
            doc.setTextColor(0, 0, 0);
            doc.text(
              `${selectedMonthYear}`,
              data.cell.x + 2 + 35+1, 
              data.cell.y + 16 + 2.8+2    
            );
            doc.addImage(
              NACheVidvutDeyak,
              'PNG',
              data.cell.x + 2,
              data.cell.y + 22.5,   
              26,
              4.8
            );
          }

          
          
          if (data.section === 'head') {
            if (data.column.index === 0 && data.row.index === 0) {
              // doc.addImage(anukramank, 'PNG', data.cell.x + 2, data.cell.y + 3, 15, 6);

              doc.addImage(anukramank, 'PNG', data.cell.x + 2, data.cell.y + 3.7, 16.8, 6.37);

            }
            
            if (data.column.index === 1 && data.row.index === 0) {
              doc.addImage(kamachaTapashil, 'PNG', data.cell.x + 2, data.cell.y + 3.7, 44, 6);
            }

            
            
            if (data.column.index === 2 && data.row.index === 0) {
              // doc.addImage(parimanVajan, 'PNG', data.cell.x + 2, data.cell.y + 2, 28, 6);
              doc.addImage(parimanVajan, 'PNG', data.cell.x + 2, data.cell.y + 2.7, 30, 7);

            }
            
            
          }
        },
        styles: {
          font: 'DVOTSurekh_B_Ship',
          fontSize: 10,
          cellPadding: 2,
          lineWidth: 0.1,
          lineColor: [0, 0, 0]
        },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
          lineWidth: 0.1,
          lineColor: [0, 0, 0],
           fontSize: 11 // default पेक्षा 1px ने वाढवले
        },
        bodyStyles: {
          lineWidth: 0.1,
          lineColor: [0, 0, 0],
          fontSize: 11 // default पेक्षा 1px ने वाढवले
        },
        footStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
          lineWidth: 0.1,
          lineColor: [0, 0, 0]
        },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 82 },
          2: { cellWidth: 35 },
          3: { cellWidth: 15 },
          4: { cellWidth: 15 },
          5: { cellWidth: 25 }
        },
        theme: 'grid',
        tableLineWidth: 0.1,
        tableLineColor: [0, 0, 0]
      });
      
      
    
      yPos = doc.autoTable.previous.finalY + 10;
      
    
      doc.setFontSize(11);
      const pageWidth = doc.internal.pageSize.getWidth();
      
      
      const prefix = 'एकूण रक्कम रुपये (';

      const suffix = `${totalAmount.toFixed(2)}/-`;

      const closingBracket = ')';
      
      const prefixWidth = doc.getTextWidth(prefix);
      const amountWidth = doc.getTextWidth(suffix);
      const closingBracketWidth = doc.getTextWidth(closingBracket);
      
      const akshariImageWidth = 14;
      const matraImageWidth = 10;
      
      const totalWidth = prefixWidth + akshariImageWidth + amountWidth + matraImageWidth + closingBracketWidth;
      let currentX = (pageWidth - totalWidth) / 2;
      const y = yPos;
      
      
      doc.text(prefix, currentX, y);
      currentX += prefixWidth;
      
     
      currentX += akshariImageWidth;
      
      
      doc.text(suffix, currentX, y);
      currentX += amountWidth;
      
      
      doc.addImage(matra, 'PNG', currentX, y - 3, matraImageWidth, 4);
      currentX += matraImageWidth;
      
      
      doc.text(closingBracket, currentX, y);
      
      
      yPos += 15;
      
      const labelY = 270+5; 
     

const vastuImgOrigW = 52;
const vastuImgOrigH = 4.5;


const vastuDiagOrig = Math.sqrt(vastuImgOrigW ** 2 + vastuImgOrigH ** 2);
const vastuDiagTarget = vastuDiagOrig - 2;
const vastuDiagScale = vastuDiagTarget / vastuDiagOrig;


const vastuImgScaledW = parseFloat((vastuImgOrigW * vastuDiagScale).toFixed(2));
const vastuImgScaledH = parseFloat((vastuImgOrigH * vastuDiagScale).toFixed(2));


const vastuImgPosX = 140; 
const vastuImgPosY = yPos+85; 
doc.setFontSize(13);
doc.text(
  reverseDevanagariIfContainsViOrLi("दिनांक:"),
  vastuImgPosX - 20, 
  vastuImgPosY + (vastuImgScaledH / 2) 
);

// Add vertical line on first page from 200px to bottom
const pageHeight = doc.internal.pageSize.getHeight();
doc.setLineWidth(0.1);
doc.setDrawColor(0, 0, 0);
doc.line(110, 206, 110, pageHeight - 17);

const vastuImgPosXa = 135; 
const vastuImgPosYb = yPos + 82.5; 
doc.addImage(
  VastuGhenaryaAdhikaryachiSahi,
  'PNG',
  vastuImgPosXa,
  vastuImgPosYb,
  vastuImgScaledW + 2.5,
  vastuImgScaledH + 2.5
);



const testUser = users[19]; 


const testSignature = testUser?.signature || null; 

if (signatureMatches[0] === "verified") {
  const signatureWidth = 40;
  const signatureHeight = 12;

  const signatureX = pageWidth - signatureWidth - 15 - 13;
  const signatureY = labelY - signatureHeight - 8;

  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
    (today.getMonth() + 1).toString().padStart(2, '0')
  }/${today.getFullYear()}`;

  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0); // black for date
  doc.text(formattedDate, signatureX - 22, signatureY + signatureHeight - 1);

  // Final position adjustment: 5px left, 3px upward
  const textXa = signatureX + signatureWidth / 2 - 15;
  const textYa = signatureY + signatureHeight + 4 - 3;

  doc.setFontSize(8);
  // doc.setTextColor(0, 128, 0); // green color for Verified
   doc.setTextColor(0, 0, 0); // green color for Verified
  doc.text('Verified', textXa, textYa, { align: 'center' });
}


doc.setTextColor(0, 0, 0); 
      yPos += 10;
      const availableWidth = pageWidth - 30;
      const colWidth = availableWidth / 2;
      
      // Create the two-column section with image replacements using the didDrawCell callback
      doc.autoTable({
        startY: yPos,
        head: false,
        body: [['', '']], // Empty placeholders for left and right columns
        styles: {
          font: 'DVOTSurekh_B_Ship',
          fontStyle: 'normal',
          fontSize: 10,
          cellPadding: 2
        },
        columnStyles: {
          0: { cellWidth: colWidth, halign: 'left' },
          1: { cellWidth: colWidth, halign: 'right' }
        },
        theme: 'plain',
        didDrawCell: function(data) {
          // Handle left column
          if (data.column.index === 0 && data.row.index === 0) {
            const leftColX = data.cell.x + 2;
            let imgY = data.cell.y + 5;
            const imgHeight = 6.7;
            const imgGap = 12; // Gap between images
            
          

         const shrinkRatio = 0.83; 
doc.addImage(FTRakmecheNiyamWatap, 'PNG', leftColX, imgY, (36 * shrinkRatio)+2.1,(imgHeight * shrinkRatio)+1.1);


            doc.text("_______________ रु.", leftColX + 37, imgY + 4);
            imgY += imgGap;
            
            

const imageScaleFactor = 0.76; 
doc.addImage(FTPurvichaKharch, 'PNG', leftColX, imgY, (28 * imageScaleFactor)+1.7, (imgHeight * imageScaleFactor)+1.2);



            doc.text("_______________ रु.", leftColX + 37, imgY + 4);
            imgY += imgGap;
            
            

            const scaleFactor = 0.91; 
const newWidth = 45 * scaleFactor;
const newHeight = imgHeight * scaleFactor;

doc.addImage(FTHyaBilantDakhavilela, 'PNG', leftColX-1, imgY, newWidth, newHeight);
            doc.text(`${totalAmount.toFixed(2)}/-`, leftColX + 50, imgY + 6);
            imgY += imgGap;
            
           doc.setFontSize(12); 
            doc.text("२ व ३ यांची बेरीज", leftColX, imgY + 4);

// Line आणि "रु." हा भाग 20px ने उजवीकडे
doc.text("_______________ रु.", leftColX + 37, imgY + 4);
            imgY += imgGap;
            
          
            
 const imgShrinkRatio = 0.75; 
doc.addImage(FTUpalabdhShillak, 'PNG', leftColX, imgY, (35 * imgShrinkRatio)+1, (imgHeight * imgShrinkRatio)+1);



            doc.text("_______________ रु.", leftColX + 37, imgY + 4);
          }
          
          
          if (data.column.index === 1 && data.row.index === 0) {
            const rightColX = data.cell.x + 15;
            let imgY = data.cell.y + 5;
            const imgHeight = 6;
            const imgGap = 12; 
            
           
             const shrinkRatioPr = 0.92;
           
            doc.addImage(FTPramanitKarnyat, 'PNG', rightColX, imgY, 82, (imgHeight * shrinkRatioPr) + 1);

            imgY += imgGap;
            
           
            doc.addImage(FTParimaneAchuk, 'PNG', rightColX, imgY, 84, imgHeight+1.7);
            imgY += imgGap;
            
           
            const shrinkRatio = 0.94;
// doc.addImage(FTSthititMilalya, 'PNG', rightColX, imgY, 40 * shrinkRatio, imgHeight * shrinkRatio);

           doc.addImage(
  FTSthititMilalya,
  'PNG',
  rightColX,
  imgY,
  (42 * shrinkRatio) + 1.7,
  (imgHeight * shrinkRatio) + 1.7
);

            imgY += imgGap;
            
          
            doc.addImage(FTSakhyatmakLekhachya, 'PNG', rightColX, imgY, 66.7, imgHeight+1.7);
            imgY += imgGap;
            
            

const imageWidth = 40 - 2; 
const imageHeight = imgHeight - 2;

doc.addImage(FTKarnyatAalyaAahet, 'PNG', rightColX, imgY, imageWidth+1.7, imageHeight+1.7);
          
            imgY += imgGap * 1.5;
            
         
            doc.text("       ________    ________", rightColX+1, imgY-2);
          }
        }
      });
      
      
      const breakdownTable = doc.autoTable.previous;
      if (
        breakdownTable &&
        breakdownTable.settings.margin &&
        typeof breakdownTable.startY === "number" &&
        typeof breakdownTable.finalY === "number"
      ) {
        const marginLeft = breakdownTable.settings.margin.left;
        const verticalLineX = marginLeft + colWidth;
        const tableTopY = breakdownTable.startY;
        const tableBottomY = breakdownTable.finalY;
        doc.setLineWidth(0.1);
        doc.setDrawColor(0, 0, 0);
        doc.line(verticalLineX, tableTopY, verticalLineX, tableBottomY);
      }
      
      
      doc.addPage();
      yPos = 17; 
      doc.setFontSize(12);
     

    
const ushaFontShrinkRatio = 0.6875; 

const ayuktaImgWidth = 69 * ushaFontShrinkRatio;
const ayuktaImgHeight = (25 * ushaFontShrinkRatio) - 12; 

doc.addImage(
  MUMaAayuktaYanchyakade,
  'PNG',
  15,
  yPos,
  ayuktaImgWidth+3,
  ayuktaImgHeight+1.5
);
   
      yPos += 10;

const tapasaniImgShrinkRatio = 0.6875; 
const tapasaniImgWidth = (95 * tapasaniImgShrinkRatio); 
const tapasaniImgHeight = ((24 * tapasaniImgShrinkRatio) - 11); 
doc.addImage(
  MUMemaganichiTapasani,
  'PNG',
  15,
  yPos - 2, 
  tapasaniImgWidth,
  tapasaniImgHeight+1.6
);



      yPos += 12;
      doc.setFontSize(12);
      doc.text("अचूक आहे.", 15, yPos);
      yPos += 10;
         doc.setFontSize(12);
      doc.text(reverseDevanagariIfContainsViOrLi("दिनांक: ----------------------------"), 15, yPos);
      yPos += 15;


const testUsert = users[19]; // Make sure at least 20 users exist
const demoSignature = testUsert?.signature || null; // or testUser?.sahi if applicable


if (signatureMatches[3] === "verified") {
    var demoSigWidth = 40;
  var demoSigHeight = 12;
  var demoSigX = 15;
  var demoSigY = yPos;

  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
    (today.getMonth() + 1).toString().padStart(2, '0')
  }/${today.getFullYear()}`;

  // Position based on demoSignature
  const signatureX = demoSigX;
  const signatureY = demoSigY - demoSigHeight - 2;
  const textX = signatureX + demoSigWidth / 2; // center aligned horizontally
  const dateY = signatureY + demoSigHeight + 4; // just below image
  const verifiedY = dateY + 5; // a bit below date

  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0); // black for date
  doc.text(formattedDate, textX, dateY, { align: 'center' });

  doc.setFontSize(8);
  // doc.setTextColor(0, 128, 0); // green for 'Verified'
  doc.setTextColor(0, 0, 0); // green for 'Verified'
  doc.text('Verified', textX, verifiedY, { align: 'center' });
}

if (signatureMatches[4] === "verified") {
  const amcSigWidth = 40;
  const amcSigHeight = 12;
  const amcSigX = 66;
  const amcSigY = yPos - 14;

  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
    (today.getMonth() + 1).toString().padStart(2, '0')
  }/${today.getFullYear()}`;

  // Position based on AMC signature
  const textX = amcSigX + amcSigWidth / 2; // center aligned horizontally
  const dateY = amcSigY + amcSigHeight + 2; // just below image
  const verifiedY = dateY + 5; // a bit below date

  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0); // black for date
  doc.text(formattedDate, textX, dateY, { align: 'center' });

  doc.setFontSize(8);
  // doc.setTextColor(0, 128, 0); // green for 'Verified'
   doc.setTextColor(0, 0, 0); // green for 'Verified'
  doc.text('Verified', textX, verifiedY, { align: 'center' });
}

      
      doc.text("-------------                  -------------", 15, yPos);
      yPos += 10;
     

      const signShrinkRatio = 0.6875; // 16px → 11px equivalent shrink

// ***)))
const lekhapalWidth = 30 * signShrinkRatio;
const lekhapalHeight = (14 * signShrinkRatio) - 5;

const ayuktaWidth = 30 * signShrinkRatio;
const ayuktaHeight = (14 * signShrinkRatio) - 5;


doc.addImage(
  MUPramukhLekhapal,
  'PNG',
  15,
  yPos-4,
  lekhapalWidth,
  lekhapalHeight+2
);


doc.addImage(
  MUSahaAayukta,
  'PNG',
  66,
  yPos-4,
  ayuktaWidth,
  ayuktaHeight+1
);

yPos += lekhapalHeight + 5; 
      
      
      if (user.ward && signatures[user.ward]?.["Assistant Municipal Commissioner"]) {
        const amcSigWidth = 30;
        const amcSigHeight = 30;
        const amcSigX = 80
        const amcSigY = yPos - amcSigHeight + 5;
        
        doc.addImage(
          signatures[user.ward]["Assistant Municipal Commissioner"],
          'PNG',
          amcSigX,
          amcSigY,
          amcSigWidth,
          amcSigHeight
        );
      }
      
      yPos += 7;

const baseShrinkRatio = 0.625;

const fontReductionRatio = 13 / 16; // ≈ 0.8125

const fontSizeReductionFinalRatio = 11 / 16; // ≈ 0.6875

const samitiShrinkRatio = baseShrinkRatio * fontSizeReductionFinalRatio;

let samitiImgWidth = 60 * samitiShrinkRatio;
let samitiImgHeight = 12 * samitiShrinkRatio;


doc.addImage(
  prabhagsamiti,
  'PNG',
  15,
  yPos - 5,
  samitiImgWidth,
  samitiImgHeight+2
);



doc.setFontSize(11); 
doc.text(`-${wardname}`, 15 + samitiImgWidth + 2, yPos + 1)



      yPos += 10;
      doc.text("----------------------------------------------------", 15, yPos);
      yPos += 10;
      
      
      

      doc.text(reverseDevanagariIfContainsViOrLi(`रु. ${totalAmount.toLocaleString('hi-IN')}/-`), 15, yPos);
      yPos += 10;
      
      const akshariImgWidth = 17; 
const akshariImgHeight = 5;


doc.addImage(
  Akshari,
  'PNG',
  15,
  yPos - 5, 
  akshariImgWidth,
  akshariImgHeight+1
);

doc.setFontSize(12); // Match image font size

doc.text(
  `: रुपये देण्यात यावेत)`,
  15 + akshariImgWidth + 2, 
  yPos
);
      yPos += 10;
      doc.text(reverseDevanagariIfContainsViOrLi("दिनांक: _______                        उपायुक्त"), 15, yPos);
      yPos += 15;
      doc.text("-------------------------------------------------------", 15, yPos);
      yPos += 10;
     
const maganiImgOriginalWidth = 55;
const maganiImgOriginalHeight = 6.5;

// डायगोनल 2px ने लहान
const maganiOriginalDiagonal = Math.sqrt(maganiImgOriginalWidth ** 2 + maganiImgOriginalHeight ** 2);
const maganiTargetDiagonal = maganiOriginalDiagonal - 2;
const maganiScaleRatio = maganiTargetDiagonal / maganiOriginalDiagonal;

const maganiImgWidth = parseFloat((maganiImgOriginalWidth * maganiScaleRatio).toFixed(2));
const maganiImgHeight = parseFloat((maganiImgOriginalHeight * maganiScaleRatio).toFixed(2));


const maganiImgX = 15;           
const maganiImgY = yPos - 5 + 2; 


doc.addImage(
  MUMaganichiParatPhet,
  'PNG',
  maganiImgX,
  maganiImgY,
  maganiImgWidth,
  maganiImgHeight
);



      yPos += 10;
      
      yPos += 10;
      
      yPos += 10;
      doc.text(reverseDevanagariIfContainsViOrLi(`रु- ${totalAmountInWords} मिळाले`), 15, yPos);
      yPos += 15;
    

const mudrankOriginalW = 22;
const mudrankOriginalH = 10;


const mudrankDiag = Math.sqrt(mudrankOriginalW ** 2 + mudrankOriginalH ** 2);
const mudrankTargetDiag = mudrankDiag - 2;
const mudrankScale = mudrankTargetDiag / mudrankDiag;

const mudrankScaledW = parseFloat((mudrankOriginalW * mudrankScale).toFixed(2));
const mudrankScaledH = parseFloat((mudrankOriginalH * mudrankScale).toFixed(2));


const mudrankPosX = 75; 
const mudrankPosY = yPos - 6; 

doc.addImage(
  Mudrank,
  'PNG',
  mudrankPosX,
  mudrankPosY,
  mudrankScaledW,
  mudrankScaledH
);


      yPos += 7;
      doc.text("                                ----------------------", 15, yPos);
      yPos += 15;
      doc.text("                                पैसे घेणाऱ्याची सही", 15, yPos);
      yPos = 30; 

const originalWidth = 28;
const originalHeight = 6;


const originalDiagonal = Math.sqrt(originalWidth ** 2 + originalHeight ** 2);

const targetDiagonal = originalDiagonal - 2;

const scaleRatio = targetDiagonal / originalDiagonal;

const nirnayImgWidth = parseFloat((originalWidth * scaleRatio).toFixed(2));
const nirnayImgHeight = parseFloat((originalHeight * scaleRatio).toFixed(2));

const imgX = 117;
const imgY = yPos - 5 + 2;


doc.addImage(
  MUNirnayKramank,
  'PNG',
  imgX,
  imgY-10,
  nirnayImgWidth,
  nirnayImgHeight+1
);


const lineStartX = imgX + nirnayImgWidth + 2;
const lineY = yPos + 1;
const lineEndX = lineStartX + 15;

doc.setLineWidth(0.3);
doc.line(lineStartX, lineY-9, lineEndX, lineY-9);



const textX = lineEndX + 5;  
const textY = lineY - 9;    

doc.text(reverseDevanagariIfContainsViOrLi("दिनांक_____"), textX, textY);
      
     
      yPos += 1;
      
      
      doc.text(reverseDevanagariIfContainsViOrLi(`बिलांत दाखवलेली रु. ${totalAmount.toLocaleString('hi-IN')}/- ची रक्कम`), 120, yPos);
      yPos += 9;
    
      const rupyaText = `(रुपये ${totalAmountInWords} `;
doc.text(rupyaText, 120, yPos);

// आता 'मात्र' च्या जागी image टाका:
const textWidth = doc.getTextWidth(rupyaText);
const matraX = 120 + textWidth + 1; // 1px gap ठेवला
const matraY = yPos - 4; // text height नुसार fine-tune करा

doc.addImage(matra, 'PNG', matraX, matraY, 12, 5); // width/height गरजेनुसार adjust करा

// शेवटचा bracket पूर्ण करा (जर हवा असेल तर):
doc.text(")", matraX + 13, yPos); // 13 म्हणजे image width + gap

      yPos += 10;
      doc.text("मंजूर करण्यात येत आहे.", 120, yPos);
      yPos += 10;

      // doc.text(reverseDevanagariIfContainsViOrLi("मुख्य लेखाधिकारी ----------------------"), 120, yPos);

      const muOriginalWidth = 28;
const muOriginalHeight = 6;

const muOriginalDiagonal = Math.sqrt(muOriginalWidth ** 2 + muOriginalHeight ** 2);
const muTargetDiagonal = muOriginalDiagonal - 2;  // 2px ने shrink
const muScaleRatio = muTargetDiagonal / muOriginalDiagonal;

const muImgWidth = parseFloat((muOriginalWidth * muScaleRatio).toFixed(2));
const muImgHeight = parseFloat((muOriginalHeight * muScaleRatio).toFixed(2));

const muImgX = 120;         
const muImgY = yPos - 5 + 2; 

// मुख्य लेखाधिकारी इमेज PDF मध्ये add करा
doc.addImage(
  MUMukhyaLekhadhikari,
  'PNG',
  muImgX,
  muImgY,
  muImgWidth+1,
  muImgHeight+1.1
);

  const muLineStartX = muImgX + muImgWidth + 5;  
  const muLineY = yPos + 1;
  const muLineEndX = muLineStartX + 20;  

  doc.setLineWidth(0.3);
  doc.line(muLineStartX, muLineY, muLineEndX, muLineY);

      
      yPos += 13;
      // doc.text(reverseDevanagariIfContainsViOrLi("दिनांक                          उप-आयुक्त"), 120, yPos);

const upaayuktaOriginalWidth = 22;
const upaayuktaOriginalHeight = 5;

// Shrink logic (2px ने डायगोनल लहान)
const upaayuktaOriginalDiagonal = Math.sqrt(
  upaayuktaOriginalWidth ** 2 + upaayuktaOriginalHeight ** 2
);
const upaayuktaTargetDiagonal = upaayuktaOriginalDiagonal - 2;
const upaayuktaScaleRatio = upaayuktaTargetDiagonal / upaayuktaOriginalDiagonal;
// ---<<<
// Scale केल्यानंतरचे width आणि height
const upaayuktaImgWidth = parseFloat(
  (upaayuktaOriginalWidth * upaayuktaScaleRatio).toFixed(2)
);

const upaayuktaImgHeight = parseFloat(
  (upaayuktaOriginalHeight * upaayuktaScaleRatio).toFixed(2)
);

// इमेज placement coordinates (दिनांक च्या बाजूला)
var upaayuktaImgX = 168;           // टेक्स्ट नंतरची जागा
var upaayuktaImgY = yPos - 5 + 2;  // थोडं खाली आणलं आहे


if (signatureMatches[5] === "verified") {
  const upaayuktaSigWidth = upaayuktaImgWidth;
  const upaayuktaSigHeight = upaayuktaImgHeight;
  const upaayuktaSigX = upaayuktaImgX;
  const upaayuktaSigY = upaayuktaImgY;

  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
    (today.getMonth() + 1).toString().padStart(2, '0')
  }/${today.getFullYear()}`;

  const textX = upaayuktaSigX + upaayuktaSigWidth / 2; // center of signature
  const dateY = upaayuktaSigY + upaayuktaSigHeight + 2; // just below signature
  const verifiedY = dateY + 5; // below date

  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0); // black for date
  doc.text(formattedDate, textX, dateY, { align: 'center' });

  doc.setFontSize(8);
  // doc.setTextColor(0, 128, 0); // green for 'Verified'
  doc.setTextColor(0, 0, 0); // green for 'Verified'
  doc.text('Verified', textX, verifiedY, { align: 'center' });
}




// 'दिनांक' टेक्स्ट (डाव्या बाजूला)

// doc.text(reverseDevanagariIfContainsViOrLi("दिनांक>>>>"), 120, yPos);
doc.setFontSize(13); // आपल्या हवेप्रमाणे size द्या (उदा. 12)
doc.text(reverseDevanagariIfContainsViOrLi("दिनांक"), 120, yPos);

// उप-आयुक्त इमेज PDF मध्ये टाका

doc.addImage(
  MUUpaaayukta,
  'PNG',
  upaayuktaImgX,
  upaayuktaImgY,
  upaayuktaImgWidth+1,
  upaayuktaImgHeight+1.7
);

  
      

      doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 140, yPos + 7);
      
      // ****
      yPos += 15;
      doc.text("----------------------------------------------------", 120, yPos);
      // doc.text("---------------- प्रदानार्थ लेखापाल -------------------------------------------------------------- यांस,", 120, yPos + 7);

const pradanarthImgOriginalWidth = 36;
const pradanarthImgOriginalHeight = 5.2;

const pradanarthOriginalDiagonal = Math.sqrt(pradanarthImgOriginalWidth ** 2 + pradanarthImgOriginalHeight ** 2);
const pradanarthTargetDiagonal = pradanarthOriginalDiagonal - 2;
const pradanarthScaleRatio = pradanarthTargetDiagonal / pradanarthOriginalDiagonal;

const pradanarthImgWidth = parseFloat((pradanarthImgOriginalWidth * pradanarthScaleRatio).toFixed(2));
const pradanarthImgHeight = parseFloat((pradanarthImgOriginalHeight * pradanarthScaleRatio).toFixed(2));

const pradanarthImgX = 120 + 15; // 5px ने उजवीकडे shift
const pradanarthImgY = yPos + 7 - 5 + 6;

doc.addImage(
  MUPradanarthLekhapal,
  'PNG',
  pradanarthImgX,
  pradanarthImgY,
  pradanarthImgWidth-1,
  pradanarthImgHeight+2
);



      yPos += 15;
      doc.text("---------                           ---------", 120, yPos-3);
 yPos += 10;
 doc.setFontSize(13); // आपल्या हवेप्रमाणे size द्या (उदा. 12)
      doc.text("---------------------------------------------- यांस", 118, yPos);

     

yPos += 20;



const upaayuktaTestUser = users[19];
const upaayuktaTestSignature = upaayuktaTestUser?.signature || null;




// Draw 'दिनांक' on left side
doc.text(reverseDevanagariIfContainsViOrLi("दिनांक"), 120, yPos);

// Original size of 'उप-आयुक्त' image
const deputyCommissionerImgOriginalWidth = 22;
const deputyCommissionerImgOriginalHeight = 5;

// Shrink by 2px on diagonal
const deputyCommissionerDiagonal = Math.sqrt(
  deputyCommissionerImgOriginalWidth ** 2 + deputyCommissionerImgOriginalHeight ** 2
);
const deputyCommissionerTargetDiagonal = deputyCommissionerDiagonal - 2;
const deputyCommissionerScaleRatio = deputyCommissionerTargetDiagonal / deputyCommissionerDiagonal;

// Scaled dimensions
const deputyCommissionerImgWidth = parseFloat(
  (deputyCommissionerImgOriginalWidth * deputyCommissionerScaleRatio).toFixed(2)
);
const deputyCommissionerImgHeight = parseFloat(
  (deputyCommissionerImgOriginalHeight * deputyCommissionerScaleRatio).toFixed(2)
);

// Image placement (right of 'दिनांक')
const deputyCommissionerImgX = 168;
const deputyCommissionerImgY = yPos - 5 + 2;

// Add the image to PDF
doc.addImage(
  MUUpaaayukta,
  'PNG',
  deputyCommissionerImgX,
  deputyCommissionerImgY,
  deputyCommissionerImgWidth+1,
  deputyCommissionerImgHeight+2
);

// Municipal name slightly shifted to right (5px)
doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 125, yPos + 7);
      
      yPos += 15; 
      doc.text("----------------------------------------------------", 120, yPos);
      
      yPos += 10; 
      // doc.text(reverseDevanagariIfContainsViOrLi("धनादेश क्रमांक ----------  दिनांक  ------------"), 120, yPos);



      const ddNumberImgOriginalWidth = 30;
const ddNumberImgOriginalHeight = 5.5;

const ddNumberDiagonal = Math.sqrt(
  ddNumberImgOriginalWidth ** 2 + ddNumberImgOriginalHeight ** 2
);
const ddNumberTargetDiagonal = ddNumberDiagonal - 2;
const ddNumberScaleRatio = ddNumberTargetDiagonal / ddNumberDiagonal;

const ddNumberImgWidth = parseFloat((ddNumberImgOriginalWidth * ddNumberScaleRatio).toFixed(2));
const ddNumberImgHeight = parseFloat((ddNumberImgOriginalHeight * ddNumberScaleRatio).toFixed(2));

// Placement position
const ddNumberImgX = 120;
const ddNumberImgY = yPos - 5 + 2;  // adjust vertically as needed

// Add image: 'धनादेश क्रमांक'
doc.addImage(
  MUDhanadeshKramank,
  'PNG',
  ddNumberImgX,
  ddNumberImgY,
  ddNumberImgWidth,
  ddNumberImgHeight+2
);

// Remaining text after image
doc.text(reverseDevanagariIfContainsViOrLi("----------  दिनांक  ------------"), ddNumberImgX + ddNumberImgWidth + 5, yPos);
      
      yPos += 10;
    
const ddnImgOriginalWidth = 46;
const ddnImgOriginalHeight = 5.5;

const ddnOriginalDiagonal = Math.sqrt(ddnImgOriginalWidth ** 2 + ddnImgOriginalHeight ** 2);
const ddnTargetDiagonal = ddnOriginalDiagonal - 2;
const ddnScaleRatio = ddnTargetDiagonal / ddnOriginalDiagonal;

const ddnImgWidth = parseFloat((ddnImgOriginalWidth * ddnScaleRatio).toFixed(2));
const ddnImgHeight = parseFloat((ddnImgOriginalHeight * ddnScaleRatio).toFixed(2));

// Placement
const ddnImgX = 120;
const ddnImgY = yPos - 5 + 2; // vertical adjustment

// Add image for 'द्वारे देण्यात आले आणि'
doc.addImage(
  MUDwareDenyatAale,
  'PNG',
  ddnImgX,
  ddnImgY,
  ddnImgWidth,
  ddnImgHeight+1.5
);

// Add dashed line after image
doc.text(reverseDevanagariIfContainsViOrLi("----------------------"), ddnImgX + ddnImgWidth + 5, yPos);

      // doc.text(reverseDevanagariIfContainsViOrLi("प्रस्तावित रोख वहित नोंद घेतली"), 120, yPos + 7);

// प्रस्तावित रोख वहित नोंद घेतली इमेजचे मूळ आकार
const prustavImgOriginalWidth = 50;
const prustavImgOriginalHeight = 6;

// डायगोनल shrink logic
const prustavOriginalDiagonal = Math.sqrt(prustavImgOriginalWidth ** 2 + prustavImgOriginalHeight ** 2);
const prustavTargetDiagonal = prustavOriginalDiagonal - 2;
const prustavScaleRatio = prustavTargetDiagonal / prustavOriginalDiagonal;

const prustavImgWidth = parseFloat((prustavImgOriginalWidth * prustavScaleRatio).toFixed(2));
const prustavImgHeight = parseFloat((prustavImgOriginalHeight * prustavScaleRatio).toFixed(2));

// Placement coordinates
const prustavImgX = 120;          // पूर्वीच्या टेक्स्टच्या जागी
const prustavImgY = yPos + 7 - 5 + 2;  // थोडं adjust केलं

// इमेज PDF मध्ये insert करा
doc.addImage(
  MUPrustavarRokhVahitNond,
  'PNG',
  prustavImgX,
  prustavImgY,
  prustavImgWidth,
  prustavImgHeight+1.5
);

      yPos += 20;
      doc.text("-------------                      -------------", 120, yPos);
      yPos += 10;
      doc.text("रोखपाल                          उप-आयुक्त", 120, yPos);
      doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 130, yPos + 7); 
      
      doc.line(110, 15, 110, yPos + 30); // **ही लाइन आता  60 पासून सुरू होईल**
      
      
      
      
      if (signatures['Junior Engineer']) {
        doc.addImage(signatures['Junior Engineer'], 'PNG', 15, yPos, 30, 15);
        doc.text("Junior Engineer", 15, yPos + 20);
      }
      
      if (signatures['Executive Engineer']) {
        doc.addImage(signatures['Executive Engineer'], 'PNG', 120, yPos, 30, 15);
        doc.text("Executive Engineer", 120, yPos + 20);
      }
      
      if (signatures['Dy.Municipal Commissioner']) {
        doc.addImage(signatures['Dy.Municipal Commissioner'], 'PNG', 120, yPos + 40, 30, 15);
        doc.text("Dy.Municipal Commissioner", 120, yPos + 60);
      }
      
      const pdfData = doc.output('blob'); // Get Blob format
      
      // Convert Blob to Object URL for preview
      const pdfUrl = URL.createObjectURL(pdfData);
      let type="form22";
      handlePdfPreview(pdfUrl,type,selectedMonthYear);
      setPdfBlob(pdfData);
      
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
    } catch (error) {
      console.error('Error generating Form 22 PDF:', error);
    }
  };