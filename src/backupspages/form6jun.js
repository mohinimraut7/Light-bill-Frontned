const handleDownloadForm22 = async() => {

 const { foundReport, reportingData } = await fetchReportData(
    selectedMonthYear,
    user,
    setMode,
    setReportingDataSM,
    setMonthArr
  );


  console.log("dhdhdhdhd",monthArr)

  const signatureMatches = checkSignatureVerification(monthArr, users);

  const lipikInfo = signatureMatches.find(
  match => match.role === "Lipik" && match.checked
);

// if (lipikInfo) {
//   console.log("✅ Lipik is verified and checked:", lipikInfo);
//   // तुम्ही इथे tick icon किंवा checkbox UI मध्ये वापरा
// }

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
      // Create PDF in portrait mode
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Set up font
      doc.addFileToVFS("DVOTSurekh_B_Ship.ttf", DVOTSurekhBShip);
      doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
      loadDvoSBShipFont(doc);
      doc.setFont("DVOTSurekh_B_Ship");
      
      // Set initial vertical position
      let yPos = 15;
      
      // --- Header Section ---
      doc.setFontSize(10);
      doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
      doc.text("M.S.C. 22", 170, yPos);
      
      const logoWidth = 30;
      const logoHeight = 30;
      const logoX = 15;
      const logoY = yPos + 10; // Adjusting Y so it aligns well with "महानगरपालिका" text
      
      const allWardNames = [...new Set(rows.map(row => row.ward))];
      
      // Ensure the selected wardName is prioritized
      const wardnameList = allWardNames.includes(wardName)
        ? [wardName, ...allWardNames.filter(name => name !== wardName)]
        : allWardNames;
      
      // Join the ward names into a single string separated by commas
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
      
      // --- Form Details with Lines ---
      doc.addImage(billkramank, 'PNG', 15, yPos - 3, 20, 5);
      
      doc.line(40, yPos, 100, yPos);
      doc.addImage(pramanakKramank, 'PNG', 105, yPos - 2.5, 23, 4);
      
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
      
      doc.addImage(bookRef, 'PNG', 15, yPos - 2.5, 119, 6);
      
      const totalAmount = rows
        .filter(row => row.monthAndYear === selectedMonthYear)
        .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
      
      const totalAmountInWords = (totalAmount); 
      let l1 = fixPashchim(`पश्चिम`);
      
      // --- Main Table ---
      yPos += 10;
      
      // -------------------------------------------------------------------
      doc.autoTable({
        startY: yPos,
        head: [[
          '', // अनुक्रमांक
          '', // कामाचा तपशील
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
              data.cell.y + 6, // Positioned below text
              40,              // Width increased by 2px (previously 24)
              5               // Height unchanged
            );
            
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(
              `${user?.ward}`,           // तुमचा desired text
              data.cell.x + 2 + 40 ,         // image X + image Width + padding
              data.cell.y + 6 + 3.5             // image Y + half image height (for vertical align)
            );
            
            doc.addImage(
              NAVibhagatilVirarVibhagache,
              'PNG',
              data.cell.x + 2,
              data.cell.y + 11,     // previous image च्या खाली (6 + 2 margin)
              40,
              4
            );
            doc.addImage(
              NAMRaVVComMahe,
              'PNG',
              data.cell.x + 2,
              data.cell.y + 16,     // previous image च्या खाली (6 + 2 margin)
              35,
              4
            );
            // Text for selectedMonthYear
            doc.setFontSize(8);
            doc.setTextColor(0, 0, 0);
            doc.text(
              `${selectedMonthYear}`,
              data.cell.x + 2 + 35, // image X + image width + padding (3px)
              data.cell.y + 16 + 2.8    // image Y + approx half of height for vertical center
            );
            doc.addImage(
              NACheVidvutDeyak,
              'PNG',
              data.cell.x + 2,
              data.cell.y + 21,     // previous image च्या खाली (6 + 2 margin)
              26,
              4
            );
          }
          
          if (data.section === 'head') {
            if (data.column.index === 0 && data.row.index === 0) {
              doc.addImage(anukramank, 'PNG', data.cell.x + 2, data.cell.y + 3, 13, 6);
            }
            
            if (data.column.index === 1 && data.row.index === 0) {
              doc.addImage(kamachaTapashil, 'PNG', data.cell.x + 2, data.cell.y + 3, 40, 6);
            }
            
            if (data.column.index === 2 && data.row.index === 0) {
              doc.addImage(parimanVajan, 'PNG', data.cell.x + 2, data.cell.y + 2, 28, 6);
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
          lineColor: [0, 0, 0]
        },
        bodyStyles: {
          lineWidth: 0.1,
          lineColor: [0, 0, 0]
        },
        footStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
          lineWidth: 0.1,
          lineColor: [0, 0, 0]
        },
        columnStyles: {
          0: { cellWidth: 15 },
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
      
      
      // Get the Y position after the table
      yPos = doc.autoTable.previous.finalY + 10;
      
      // Add the total amount in words with proper spacing
      doc.setFontSize(10);
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
      
      
      doc.addImage(akshari, 'PNG', currentX, y - 4, akshariImageWidth, 4);
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
doc.text(
  reverseDevanagariIfContainsViOrLi("दिनांक:"),
  vastuImgPosX - 20, // 40px left of image
  vastuImgPosY + (vastuImgScaledH / 2) // vertically centered with image
);

// PDF मध्ये इमेज add करा
// if (lipikInfo) {
//   console.log("✅ Lipik is verified and checked:", lipikInfo);
//   // तुम्ही इथे tick icon किंवा checkbox UI मध्ये वापरा
// }

doc.addImage(
  VastuGhenaryaAdhikaryachiSahi,
  'PNG',
  vastuImgPosX,
  vastuImgPosY,
  vastuImgScaledW,
  vastuImgScaledH
);



// if (lipikInfo && lipikInfo.checked && lipikInfo.isVerified) {
//   console.log("✅ Lipik is verified and checked:", lipikInfo);

//   // Replace signature with verified tick icon at same position
//   doc.addImage(
//     checkIcon,        // ✅ Base64 PNG of green tick icon
//     'PNG',
//     vastuImgPosX,         // X position — same as earlier
//     vastuImgPosY,         // Y position
//     vastuImgScaledW,      // Width
//     vastuImgScaledH       // Height
//   );
// } else {
//   // Else add original signature if exists
//   if (lipikInfo?.user?.signature) {
//     doc.addImage(
//       lipikInfo.user.signature,
//       'PNG',
//       vastuImgPosX,
//       vastuImgPosY,
//       vastuImgScaledW,
//       vastuImgScaledH
//     );
//   }
// }

     
      
      // // Signature just above the label line
      // if (user.ward && signatures[user.ward]?.["Lipik"]) {
      //   const signatureWidth = 30;
      //   const signatureHeight = 30;
      //   const signatureX = pageWidth - signatureWidth - 15;
      //   const signatureY = labelY - signatureHeight - 0; // just above label
      //   const signaturePadding = 5; // change as needed
        
      //   doc.addImage(
      //     signatures[user.ward]["Lipik"],
      //     'PNG',
      //     signatureX + signaturePadding,
      //     signatureY + signaturePadding,
      //     signatureWidth,
      //     signatureHeight
      //   );
      // }
      


      // ✅ Get 20th user (index 19) for testing
const testUser = users[19]; // Ensure at least 20 users exist

// ✅ Directly use the signature from testUser without checking role
const testSignature = testUser?.signature || null; // or testUser?.sahi, as per your structure

if (testSignature) {
  const signatureWidth = 40;
  const signatureHeight = 12;

  // 🠘 Shift 13px to the left and 5px upward
  const signatureX = pageWidth - signatureWidth - 15 - 13;
  const signatureY = labelY - signatureHeight - 8;
  // ----------------------
  // *******

  doc.addImage(
    testSignature,
    'PNG',
    signatureX,
    signatureY,
    signatureWidth,
    signatureHeight
  );

// if (lipikInfo && lipikInfo.checked && lipikInfo.isVerified) {
//   // Set green color for the text
//   doc.setTextColor(0, 128, 0); // RGB for green

//   // Draw the text "Approved by Lipik" instead of signature image
//   doc.text("Approved by Lipik", signatureX, signatureY + signatureHeight / 2);
// } else {
//   // Fallback to normal signature image
//   doc.addImage(
//     testSignature,
//     'PNG',
//     signatureX,
//     signatureY,
//     signatureWidth,
//     signatureHeight
//   );
// }



 const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
    (today.getMonth() + 1).toString().padStart(2, '0')
  }/${today.getFullYear()}`;

  doc.text(
    `${formattedDate}`,
    signatureX - 22,
    signatureY + signatureHeight - 1
  );

}  
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
            const imgHeight = 6;
            const imgGap = 12; // Gap between images
            
          

         const shrinkRatio = 0.83; // Approximately 3px reduction (around 14%)
doc.addImage(FTRakmecheNiyamWatap, 'PNG', leftColX, imgY, 30 * shrinkRatio, imgHeight * shrinkRatio);


            doc.text("_______________ रु.", leftColX + 37, imgY + 4);
            imgY += imgGap;
            
            

const imageScaleFactor = 0.75; // approximately 4px shrink (around 14%)
doc.addImage(FTPurvichaKharch, 'PNG', leftColX, imgY, 28 * imageScaleFactor, imgHeight * imageScaleFactor);



            doc.text("_______________ रु.", leftColX + 37, imgY + 4);
            imgY += imgGap;
            
            

            const scaleFactor = 0.83; // approx 16.7% कमी
const newWidth = 45 * scaleFactor;
const newHeight = imgHeight * scaleFactor;

doc.addImage(FTHyaBilantDakhavilela, 'PNG', leftColX, imgY, newWidth, newHeight);
            doc.text(`${totalAmount.toFixed(2)}/-`, leftColX + 47, imgY + 4);
            imgY += imgGap;
            
           
            doc.text("२ व ३ यांची बेरीज", leftColX, imgY + 4);

// Line आणि "रु." हा भाग 20px ने उजवीकडे
doc.text("_______________ रु.", leftColX + 37, imgY + 4);
            imgY += imgGap;
            
          
            
 const imgShrinkRatio = 0.75; // 3px font कमी केल्यासारखा shrink
doc.addImage(FTUpalabdhShillak, 'PNG', leftColX, imgY, 35 * imgShrinkRatio, imgHeight * imgShrinkRatio);



            doc.text("_______________ रु.", leftColX + 37, imgY + 4);
          }
          
          
          if (data.column.index === 1 && data.row.index === 0) {
            const rightColX = data.cell.x + 5;
            let imgY = data.cell.y + 5;
            const imgHeight = 6;
            const imgGap = 12; 
            
           
             const shrinkRatioPr = 0.84;
            doc.addImage(FTPramanitKarnyat, 'PNG', rightColX, imgY, 70, imgHeight*shrinkRatioPr);
            imgY += imgGap;
            
          
            doc.addImage(FTParimaneAchuk, 'PNG', rightColX, imgY, 70, imgHeight);
            imgY += imgGap;
            
           
            const shrinkRatio = 0.88;
doc.addImage(FTSthititMilalya, 'PNG', rightColX, imgY, 40 * shrinkRatio, imgHeight * shrinkRatio);

           
            imgY += imgGap;
            
          
            doc.addImage(FTSakhyatmakLekhachya, 'PNG', rightColX, imgY, 65, imgHeight);
            imgY += imgGap;
            
            

const imageWidth = 40 - 2; 
const imageHeight = imgHeight - 2;

doc.addImage(FTKarnyatAalyaAahet, 'PNG', rightColX, imgY, imageWidth, imageHeight);




          
            imgY += imgGap * 1.5;
            
         
            doc.text("       ________    ________", rightColX, imgY);
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
      yPos = 30; 
      doc.setFontSize(12);
     

    
const ushaFontShrinkRatio = 0.6875; 

const ayuktaImgWidth = 69 * ushaFontShrinkRatio;
const ayuktaImgHeight = (25 * ushaFontShrinkRatio) - 12; 

doc.addImage(
  MUMaAayuktaYanchyakade,
  'PNG',
  15,
  yPos,
  ayuktaImgWidth,
  ayuktaImgHeight
);


   
      yPos += 10;




const tapasaniImgShrinkRatio = 0.6875; 


const tapasaniImgWidth = (95 * tapasaniImgShrinkRatio); 
const tapasaniImgHeight = ((24 * tapasaniImgShrinkRatio) - 11); 


doc.addImage(
  MUMemaganichiTapasani,
  'PNG',
  15,
  yPos - 3, 
  tapasaniImgWidth,
  tapasaniImgHeight
);



      yPos += 10;
      doc.setFontSize(10);
      doc.text("अचूक आहे.", 15, yPos);
      yPos += 10;
      doc.text(reverseDevanagariIfContainsViOrLi("दिनांक: ----------------------------"), 15, yPos);
      yPos += 15;
      
      // if (user.ward && signatures[user.ward]?.["Accountant"]) {
      //   const accountantSigWidth = 30;
      //   const accountantSigHeight = 30;
      //   const accountantSigX = 15; 
      //   const accountantSigY = yPos;
        
      //   doc.addImage(
      //     signatures[user.ward]["Accountant"],
      //     'PNG',
      //     accountantSigX,
      //     accountantSigY - accountantSigHeight + 15, 
      //     accountantSigWidth,
      //     accountantSigHeight
      //   );
      // }
      



 // 🧪 Use the demo signature from testUser
const testUsert = users[19]; // Make sure at least 20 users exist
const demoSignature = testUsert?.signature || null; // or testUser?.sahi if applicable

if (demoSignature) {
  // 🖊️ Use these exact values for testing position
  var demoSigWidth = 40;
  var demoSigHeight = 12;
  var demoSigX = 15;
  var demoSigY = yPos;

  doc.addImage(
    demoSignature,
    'PNG',
    demoSigX,
    demoSigY - demoSigHeight - 2,
    demoSigWidth,
    demoSigHeight
  );
}


const amcTestUser = users[19];
const amcTestSignature = amcTestUser?.signature || null;

if (amcTestSignature) {
  const amcSigWidth = 40;
  const amcSigHeight = 12;
  const amcSigX = 66;
  const amcSigY = yPos - 14;

  doc.addImage(
    amcTestSignature,
    'PNG',
    amcSigX,
    amcSigY,
    amcSigWidth,
    amcSigHeight
  );
}

      
      doc.text("-----------------                     -------------------", 15, yPos);
      yPos += 10;
      // doc.text("प्र.लेखापाल                            सहा.आयुक्त", 15, yPos);


      const signShrinkRatio = 0.6875; // 16px → 11px equivalent shrink

// Widths and heights for both signatures
const lekhapalWidth = 30 * signShrinkRatio;
const lekhapalHeight = (14 * signShrinkRatio) - 5;

const ayuktaWidth = 30 * signShrinkRatio;
const ayuktaHeight = (14 * signShrinkRatio) - 5;

// First image (प्र.लेखापाल)
doc.addImage(
  MUPramukhLekhapal,
  'PNG',
  15,
  yPos-4,
  lekhapalWidth,
  lekhapalHeight
);

// Second image (सहा.आयुक्त)
doc.addImage(
  MUSahaAayukta,
  'PNG',
  66, // Adjusted to align with right side
  yPos-4,
  ayuktaWidth,
  ayuktaHeight
);

yPos += lekhapalHeight + 5; // Add vertical space after images
      
      
      if (user.ward && signatures[user.ward]?.["Assistant Municipal Commissioner"]) {
        const amcSigWidth = 30;
        const amcSigHeight = 30;
        const amcSigX = 80; // Adjust X based on your spacing needs
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
      
      
      // doc.text(`       प्रभाग समिती-${wardname}`, 15, yPos);




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
  yPos - 3,
  samitiImgWidth,
  samitiImgHeight
);



doc.setFontSize(11); // Match image font size
doc.text(`-${wardname}`, 15 + samitiImgWidth + 2, yPos + 1)



      yPos += 10;
      doc.text("----------------------------------------------------", 15, yPos);
      yPos += 10;
      
      
      

      doc.text(reverseDevanagariIfContainsViOrLi(`रु. ${totalAmount.toLocaleString('hi-IN')}/-`), 15, yPos);
      yPos += 10;
      // doc.text(`(अक्षरी: ${totalAmountInWords} रुपये देण्यात यावेत)`, 15, yPos);
      const akshariImgWidth = 17; // तुम्ही पाहून adjust करू शकता
const akshariImgHeight = 5; // यालाही image proportion नुसार ठेवा


doc.addImage(
  Akshari,
  'PNG',
  15,
  yPos - 5, 
  akshariImgWidth,
  akshariImgHeight
);


// doc.text(
//   `: ${totalAmountInWords} रुपये देण्यात यावेत)`,
//   15 + akshariImgWidth + 2, 
//   yPos
// );



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
      // ---->>>>
      // doc.text("मागणीची संपूर्ण फेड म्हणून", 15, yPos);


// मागणीची संपूर्ण फेड म्हणून इमेजचे मूळ आकार
const maganiImgOriginalWidth = 55;
const maganiImgOriginalHeight = 6.5;

// डायगोनल 2px ने लहान
const maganiOriginalDiagonal = Math.sqrt(maganiImgOriginalWidth ** 2 + maganiImgOriginalHeight ** 2);
const maganiTargetDiagonal = maganiOriginalDiagonal - 2;
const maganiScaleRatio = maganiTargetDiagonal / maganiOriginalDiagonal;

const maganiImgWidth = parseFloat((maganiImgOriginalWidth * maganiScaleRatio).toFixed(2));
const maganiImgHeight = parseFloat((maganiImgOriginalHeight * maganiScaleRatio).toFixed(2));

// Placement coordinates
const maganiImgX = 15;           // टेक्स्टच्या पूर्वीच्या X coordinate प्रमाणे
const maganiImgY = yPos - 5 + 2; // हलकं adjust केलं आहे

// इमेज PDF मध्ये टाका
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
      
      // Dynamic totalAmount repeated
      // ****>>>>


      
      // doc.text(reverseDevanagariIfContainsViOrLi(`प्रभाग समिती रु. ${totalAmount.toLocaleString('hi-IN')}/-`), 15, yPos);








      

      yPos += 10;
      doc.text(reverseDevanagariIfContainsViOrLi(`रु- ${totalAmountInWords} मिळाले`), 15, yPos);
      yPos += 15;
      // <<<<>>>>
      // doc.text("                                मुद्रांक", 15, yPos);


const mudrankOriginalW = 22;
const mudrankOriginalH = 10;

// डायगोनल 2px ने लहान करणे
const mudrankDiag = Math.sqrt(mudrankOriginalW ** 2 + mudrankOriginalH ** 2);
const mudrankTargetDiag = mudrankDiag - 2;
const mudrankScale = mudrankTargetDiag / mudrankDiag;

const mudrankScaledW = parseFloat((mudrankOriginalW * mudrankScale).toFixed(2));
const mudrankScaledH = parseFloat((mudrankOriginalH * mudrankScale).toFixed(2));

// Position set करा (पूर्वी text जिथे होतं तिथे)
const mudrankPosX = 75; // adjust as needed for right alignment
const mudrankPosY = yPos - 6; // हलकं वर

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
      // doc.text(reverseDevanagariIfContainsViOrLi("निर्णय क्रमांक ----------------"), 120, yPos);



const originalWidth = 28;
const originalHeight = 6;


const originalDiagonal = Math.sqrt(originalWidth ** 2 + originalHeight ** 2);

const targetDiagonal = originalDiagonal - 2;

const scaleRatio = targetDiagonal / originalDiagonal;

const nirnayImgWidth = parseFloat((originalWidth * scaleRatio).toFixed(2));
const nirnayImgHeight = parseFloat((originalHeight * scaleRatio).toFixed(2));

const imgX = 117;
const imgY = yPos - 5 + 2;

// Add image
doc.addImage(
  MUNirnayKramank,
  'PNG',
  imgX,
  imgY,
  nirnayImgWidth,
  nirnayImgHeight
);

// Line after image
const lineStartX = imgX + nirnayImgWidth + 2;
const lineY = yPos + 1;
const lineEndX = lineStartX + 15;

doc.setLineWidth(0.3);
doc.line(lineStartX, lineY, lineEndX, lineY);



const textX = lineEndX + 5;  
const textY = lineY - 1;    

doc.text(reverseDevanagariIfContainsViOrLi("दिनांक_____"), textX, textY);


      
      // yPos += 10;
      // doc.text(reverseDevanagariIfContainsViOrLi("दिनांक_____"), 120, yPos);
      yPos += 10;
      
      // Dynamic totalAmount in right section
      doc.text(reverseDevanagariIfContainsViOrLi(`बिलांत दाखवलेली रु. ${totalAmount.toLocaleString('hi-IN')}/- ची रक्कम`), 120, yPos);
      yPos += 7;
      doc.text(`(अक्षरी रुपये ${totalAmountInWords} मात्र)`, 120, yPos);
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

const muImgX = 120;         // टेक्स्टच्या X coordinate प्रमाणे ठेवलं
const muImgY = yPos - 5 + 2; // थोडी adjustment आवश्यक असल्यास बदल

// मुख्य लेखाधिकारी इमेज PDF मध्ये add करा
doc.addImage(
  MUMukhyaLekhadhikari,
  'PNG',
  muImgX,
  muImgY,
  muImgWidth,
  muImgHeight
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

// Scale केल्यानंतरचे width आणि height
const upaayuktaImgWidth = parseFloat(
  (upaayuktaOriginalWidth * upaayuktaScaleRatio).toFixed(2)
);
const upaayuktaImgHeight = parseFloat(
  (upaayuktaOriginalHeight * upaayuktaScaleRatio).toFixed(2)
);

// इमेज placement coordinates (दिनांक च्या बाजूला)
const upaayuktaImgX = 168;           // टेक्स्ट नंतरची जागा
const upaayuktaImgY = yPos - 5 + 2;  // थोडं खाली आणलं आहे

// 'दिनांक' टेक्स्ट (डाव्या बाजूला)
doc.text(reverseDevanagariIfContainsViOrLi("दिनांक"), 120, yPos);

// उप-आयुक्त इमेज PDF मध्ये टाका
doc.addImage(
  MUUpaaayukta,
  'PNG',
  upaayuktaImgX,
  upaayuktaImgY,
  upaayuktaImgWidth,
  upaayuktaImgHeight
);

  
      if (user.ward && signatures[user.ward]?.["Dy.Municipal Commissioner"]) {
        const dmcSigWidth = 30;
        const dmcSigHeight = 30;
        const dmcSigX = 160;
        const dmcSigY = yPos - dmcSigHeight + 5; 
        
        doc.addImage(
          signatures[user.ward]["Dy.Municipal Commissioner"],
          'PNG',
          dmcSigX,
          dmcSigY,
          dmcSigWidth,
          dmcSigHeight
        );
      }
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
  pradanarthImgWidth,
  pradanarthImgHeight
);






      yPos += 15;
      doc.text("---------                           ---------", 120, yPos-3);
 yPos += 10;
      doc.text("---------------------------------------------- यांस", 118, yPos);

      // yPos += 10;
      // doc.text(reverseDevanagariIfContainsViOrLi("दिनांक                          उप-आयुक्त"), 120, yPos);
      // doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 120, yPos + 7);


// Position update (was: yPos += 10)
yPos += 20;



const upaayuktaTestUser = users[19];
const upaayuktaTestSignature = upaayuktaTestUser?.signature || null;

if (upaayuktaTestSignature) {
  const upaayuktaSigWidth = 40;
  const upaayuktaSigHeight = 12;
  const upaayuktaSigX = 66 + 100; // 40px right shift
  const upaayuktaSigY = yPos - 14-2;

  doc.addImage(
    upaayuktaTestSignature,
    'PNG',
    upaayuktaSigX,
    upaayuktaSigY,
    upaayuktaSigWidth,
    upaayuktaSigHeight
  );
}



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
  deputyCommissionerImgWidth,
  deputyCommissionerImgHeight
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
  ddNumberImgHeight
);

// Remaining text after image
doc.text(reverseDevanagariIfContainsViOrLi("----------  दिनांक  ------------"), ddNumberImgX + ddNumberImgWidth + 5, yPos);
      
      yPos += 10;
      // doc.text(reverseDevanagariIfContainsViOrLi("द्वारे देण्यात आले आणि ----------------------"), 120, yPos);
      // 'द्वारे देण्यात आले आणि' image dimensions
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
  ddnImgHeight
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
  prustavImgHeight
);

      yPos += 20;
      doc.text("-------------                      -------------", 120, yPos);
      yPos += 10;
      doc.text("रोखपाल                          उप-आयुक्त", 120, yPos);
      doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 130, yPos + 7);
      
      doc.line(110, 60, 110, yPos + 10); // **ही लाइन आता  60 पासून सुरू होईल**
      
      
      
      
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

  // ======================================

  // const handleDownloadForm22 = async() => {
  //   const { foundReport, reportingData } = await fetchReportData(selectedMonthYear, user, setMode, setReportingDataSM, setMonthArr);
  
  //   if (selectedMonthYear) {
  //     try {
  //       const response = await axios.post(`${baseUrl}/searchReport`, {
  //         month: selectedMonthYear,
  //       });
  //       const foundReport = response.data;
        
  //       if (foundReport && foundReport[0] && foundReport[0].monthReport === selectedMonthYear) {
  //         setMode('edit');
  //       } else {
  //         setMode('create');
  //       }
  
  //       // ✅ NEW: Get signature verification data
  //       const signatureMatches = checkSignatureVerification(foundReport, users);
  //       const verifiedSignatures = getSignaturesByRole(signatureMatches);
        
  //       console.log("Signature Matches:", signatureMatches);
  //       console.log("Verified Signatures by Role:", verifiedSignatures);
  
  //     } catch (error) {
  //       console.error("Error searching for report:", error);
  //     }
  //   }
    
  //   setShowFormControl(true); 
    
  //   try {
  //     // Create PDF in portrait mode
  //     const doc = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'mm',
  //       format: 'a4'
  //     });
      
  //     // Set up font
  //     doc.addFileToVFS("DVOTSurekh_B_Ship.ttf", DVOTSurekhBShip);
  //     doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
  //     loadDvoSBShipFont(doc);
  //     doc.setFont("DVOTSurekh_B_Ship");
      
  //     // Set initial vertical position
  //     let yPos = 15;
      
  //     // --- Header Section ---
  //     doc.setFontSize(10);
  //     doc.text("M.S.C. Form 22 (Rule (1))", 15, yPos);
  //     doc.text("M.S.C. 22", 170, yPos);
      
  //     const logoWidth = 30;
  //     const logoHeight = 30;
  //     const logoX = 15;
  //     const logoY = yPos + 10;
      
  //     const allWardNames = [...new Set(rows.map(row => row.ward))];
  //     const wardnameList = allWardNames.includes(wardName)
  //       ? [wardName, ...allWardNames.filter(name => name !== wardName)]
  //       : allWardNames;
  //     const wardname = wardnameList.join(', ');
      
  //     doc.addImage(logovvcmc, 'PNG', logoX, logoY, logoWidth, logoHeight);
      
  //     yPos += 20;
  //     doc.setFontSize(12);
  //     doc.text("नमुना नं. २२", 85, yPos);
      
  //     yPos += 8;
  //     doc.text(reverseDevanagariIfContainsViOrLi("(नियम २२ (१))"), 85, yPos);
      
  //     yPos += 10;
  //     doc.setFontSize(14);
  //     doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), 65, yPos);
      
  //     yPos += 15;
  //     doc.setFontSize(11);
      
  //     // --- Form Details with Lines ---
  //     doc.addImage(billkramank, 'PNG', 15, yPos - 3, 20, 5);
  //     doc.line(40, yPos, 100, yPos);
  //     doc.addImage(pramanakKramank, 'PNG', 105, yPos - 2.5, 23, 4);
  //     doc.line(140, yPos, 170, yPos);
      
  //     const currentDate = new Date().toLocaleDateString('en-IN');
  //     doc.text(reverseDevanagariIfContainsViOrLi(`दिनांक ${currentDate}`), 150, yPos);
      
  //     yPos += 10;
  //     doc.text(reverseDevanagariIfContainsViOrLi("पैसे देणाऱ्याचे नांव : म.रा.वि.वि. कंपनी"), 15, yPos);
  //     yPos += 8;
  //     doc.text(`पत्ता : ${user?.ward}`, 15, yPos);
  //     yPos += 8;
  //     doc.text(reverseDevanagariIfContainsViOrLi("माल : विद्युत विभाग"), 15, yPos);
  //     yPos += 8;
      
  //     doc.addImage(bookRef, 'PNG', 15, yPos - 2.5, 119, 6);
      
  //     const totalAmount = rows
  //       .filter(row => row.monthAndYear === selectedMonthYear)
  //       .reduce((sum, row) => sum + (Number(row.netBillAmount) || 0), 0);
      
  //     const totalAmountInWords = (totalAmount); 
  //     let l1 = fixPashchim(`पश्चिम`);
      
  //     // --- Main Table ---
  //     yPos += 10;
      
  //     doc.autoTable({
  //       startY: yPos,
  //       head: [[
  //         '', // अनुक्रमांक
  //         '', // कामाचा तपशील
  //         '',
  //         'दर',
  //         reverseDevanagariIfContainsViOrLi('युनिट'),
  //         'रक्कम\nरु.    पै.'
  //       ]],
  //       body: [[
  //         '१',
  //         reverseDevanagariIfContainsViOrLi(`वसई विरार शहर महानगरपालिका`), 
  //         '',
  //         '',
  //         '',
  //         `${totalAmount.toFixed(2)}/-`
  //       ]],
        
  //       foot: [[
  //         { content: 'एकूण',  colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
  //         { content: `${totalAmount.toFixed(2)}/-`, styles: { halign: 'right', fontStyle: 'bold' } }
  //       ]],
  //       didParseCell: function (data) {
  //         if (data.section === 'body' && data.row.index === 0 && data.column.index === 1) {
  //           data.cell.styles.minCellHeight = 30; 
  //           data.cell.styles.textColor = [0, 0, 0];
  //         }
  //       },
        
  //       didDrawCell: function (data) {
  //         if (data.section === 'body' && data.column.index === 1 && data.row.index === 0) {
  //           doc.addImage(
  //             NAkaryashetraPrabhaSamiti,
  //             'PNG',
  //             data.cell.x + 2,
  //             data.cell.y + 6,
  //             40,
  //             5
  //           );
            
  //           doc.setFontSize(10);
  //           doc.setTextColor(0, 0, 0);
  //           doc.text(
  //             `${user?.ward}`,
  //             data.cell.x + 2 + 40,
  //             data.cell.y + 6 + 3.5
  //           );
            
  //           doc.addImage(
  //             NAVibhagatilVirarVibhagache,
  //             'PNG',
  //             data.cell.x + 2,
  //             data.cell.y + 11,
  //             40,
  //             4
  //           );
  //           doc.addImage(
  //             NAMRaVVComMahe,
  //             'PNG',
  //             data.cell.x + 2,
  //             data.cell.y + 16,
  //             35,
  //             4
  //           );
            
  //           doc.setFontSize(8);
  //           doc.setTextColor(0, 0, 0);
  //           doc.text(
  //             `${selectedMonthYear}`,
  //             data.cell.x + 2 + 35,
  //             data.cell.y + 16 + 2.8
  //           );
  //           doc.addImage(
  //             NACheVidvutDeyak,
  //             'PNG',
  //             data.cell.x + 2,
  //             data.cell.y + 21,
  //             26,
  //             4
  //           );
  //         }
          
  //         if (data.section === 'head') {
  //           if (data.column.index === 0 && data.row.index === 0) {
  //             doc.addImage(anukramank, 'PNG', data.cell.x + 2, data.cell.y + 3, 13, 6);
  //           }
            
  //           if (data.column.index === 1 && data.row.index === 0) {
  //             doc.addImage(kamachaTapashil, 'PNG', data.cell.x + 2, data.cell.y + 3, 40, 6);
  //           }
            
  //           if (data.column.index === 2 && data.row.index === 0) {
  //             doc.addImage(parimanVajan, 'PNG', data.cell.x + 2, data.cell.y + 2, 28, 6);
  //           }
  //         }
  //       },
  //       styles: {
  //         font: 'DVOTSurekh_B_Ship',
  //         fontSize: 10,
  //         cellPadding: 2,
  //         lineWidth: 0.1,
  //         lineColor: [0, 0, 0]
  //       },
  //       headStyles: {
  //         fillColor: [255, 255, 255],
  //         textColor: 0,
  //         lineWidth: 0.1,
  //         lineColor: [0, 0, 0]
  //       },
  //       bodyStyles: {
  //         lineWidth: 0.1,
  //         lineColor: [0, 0, 0]
  //       },
  //       footStyles: {
  //         fillColor: [255, 255, 255],
  //         textColor: 0,
  //         lineWidth: 0.1,
  //         lineColor: [0, 0, 0]
  //       },
  //       columnStyles: {
  //         0: { cellWidth: 15 },
  //         1: { cellWidth: 82 },
  //         2: { cellWidth: 35 },
  //         3: { cellWidth: 15 },
  //         4: { cellWidth: 15 },
  //         5: { cellWidth: 25 }
  //       },
  //       theme: 'grid',
  //       tableLineWidth: 0.1,
  //       tableLineColor: [0, 0, 0]
  //     });
      
  //     // Get the Y position after the table
  //     yPos = doc.autoTable.previous.finalY + 10;
      
  //     // Add the total amount in words with proper spacing
  //     doc.setFontSize(10);
  //     const pageWidth = doc.internal.pageSize.getWidth();
      
  //     const prefix = 'एकूण रक्कम रुपये (';
  //     const suffix = `${totalAmount.toFixed(2)}/-`;
  //     const closingBracket = ')';
      
  //     const prefixWidth = doc.getTextWidth(prefix);
  //     const amountWidth = doc.getTextWidth(suffix);
  //     const closingBracketWidth = doc.getTextWidth(closingBracket);
      
  //     const akshariImageWidth = 14;
  //     const matraImageWidth = 10;
      
  //     const totalWidth = prefixWidth + akshariImageWidth + amountWidth + matraImageWidth + closingBracketWidth;
  //     let currentX = (pageWidth - totalWidth) / 2;
  //     const y = yPos;
      
  //     doc.text(prefix, currentX, y);
  //     currentX += prefixWidth;
      
  //     doc.addImage(akshari, 'PNG', currentX, y - 4, akshariImageWidth, 4);
  //     currentX += akshariImageWidth;
      
  //     doc.text(suffix, currentX, y);
  //     currentX += amountWidth;
      
  //     doc.addImage(matra, 'PNG', currentX, y - 3, matraImageWidth, 4);
  //     currentX += matraImageWidth;
      
  //     doc.text(closingBracket, currentX, y);
      
  //     yPos += 15;
      
  //     const labelY = 270+5; 
  
  //     const vastuImgOrigW = 52;
  //     const vastuImgOrigH = 4.5;
  
  //     const vastuDiagOrig = Math.sqrt(vastuImgOrigW ** 2 + vastuImgOrigH ** 2);
  //     const vastuDiagTarget = vastuDiagOrig - 2;
  //     const vastuDiagScale = vastuDiagTarget / vastuDiagOrig;
  
  //     const vastuImgScaledW = parseFloat((vastuImgOrigW * vastuDiagScale).toFixed(2));
  //     const vastuImgScaledH = parseFloat((vastuImgOrigH * vastuDiagScale).toFixed(2));
  
  //     const vastuImgPosX = 140; 
  //     const vastuImgPosY = yPos+85; 
      
  //     doc.text(
  //       reverseDevanagariIfContainsViOrLi("दिनांक:"),
  //       vastuImgPosX - 20,
  //       vastuImgPosY + (vastuImgScaledH / 2)
  //     );
  
  //     // ✅ CRITICAL CHANGE: Replace VastuGhenaryaAdhikaryachiSahi with verified signature
  //     // Check if we have a verified Lipik signature for this ward/role
  //     let signatureToUse = VastuGhenaryaAdhikaryachiSahi; // Default fallback
      
  //     // Get signature verification for current report
  //     if (foundReport && foundReport.length > 0) {
  //       const currentReportMatches = checkSignatureVerification(foundReport, users);
  //       const lipikMatch = currentReportMatches.find(match => 
  //         match.role === "Lipik" && 
  //         match.user.ward === user?.ward && 
  //         match.isVerified
  //       );
        
  //       if (lipikMatch && lipikMatch.user.signature) {
  //         signatureToUse = lipikMatch.user.signature;
  //         console.log("✅ Using verified Lipik signature:", lipikMatch.user.username);
  //       } else {
  //         console.log("⚠️ No verified Lipik signature found, using default");
  //       }
  //     }
  
  //     // Add the signature (either verified user signature or default)
  //     doc.addImage(
  //       signatureToUse,
  //       'PNG',
  //       vastuImgPosX,
  //       vastuImgPosY,
  //       vastuImgScaledW,
  //       vastuImgScaledH
  //     );
  
  //     // ✅ ADDITIONAL SIGNATURE REPLACEMENTS FOR OTHER ROLES
      
  //     // Replace test signatures with verified signatures where available
  //     const rolePositions = {
  //       "Lipik": { x: pageWidth - 40 - 15 - 13, y: labelY - 12 - 8, width: 40, height: 12 },
  //       "Accountant": { x: 15, y: yPos - 12 - 2, width: 40, height: 12 },
  //       "Assistant Municipal Commissioner": { x: 66 + 100, y: yPos - 14 - 2, width: 40, height: 12 },
  //       "Dy.Municipal Commissioner": { x: 66 + 100, y: yPos - 14 - 2, width: 40, height: 12 }
  //     };
  
  //     // Apply verified signatures for each role
  //     if (foundReport && foundReport.length > 0) {
  //       const currentReportMatches = checkSignatureVerification(foundReport, users);
        
  //       currentReportMatches.forEach(match => {
  //         if (match.isVerified && rolePositions[match.role]) {
  //           const pos = rolePositions[match.role];
            
  //           // Add verified signature instead of test signature
  //           doc.addImage(
  //             match.user.signature,
  //             'PNG',
  //             pos.x,
  //             pos.y,
  //             pos.width,
  //             pos.height
  //           );
            
  //           console.log(`✅ Added verified ${match.role} signature for ${match.user.username}`);
  //         }
  //       });
  //     }
  
  //     // Continue with rest of PDF generation...
  //     // [Rest of your existing PDF generation code remains the same]
      
  //     yPos += 10;
  //     const availableWidth = pageWidth - 30;
  //     const colWidth = availableWidth / 2;
      
  //     // [Continue with your existing autoTable and other PDF content...]
      
  //     const pdfData = doc.output('blob');
  //     const pdfUrl = URL.createObjectURL(pdfData);
  //     let type = "form22";
  //     handlePdfPreview(pdfUrl, type, selectedMonthYear);
  //     setPdfBlob(pdfData);
      
  //     const blob = new Blob([pdfBlob], { type: 'application/pdf' });
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
      
  //   } catch (error) {
  //     console.error('Error generating Form 22 PDF:', error);
  //   }
  // };
  ===================
  // if (user.ward && signatures[user.ward]?.["Dy.Municipal Commissioner"]) {
        //   const dmcSigWidth = 30;
        //   const dmcSigHeight = 30;
        //   const dmcSigX = 160;
        //   const dmcSigY = yPos - dmcSigHeight + 5; 
          
        //   doc.addImage(
        //     signatures[user.ward]["Dy.Municipal Commissioner"],
        //     'PNG',
        //     dmcSigX,
        //     dmcSigY,
        //     dmcSigWidth,
        //     dmcSigHeight
        //   );
        // }
  =============================
   // yPos += 10;
      // doc.text(reverseDevanagariIfContainsViOrLi("दिनांक                          उप-आयुक्त"), 120, yPos);
      // doc.text(reverseDevanagariIfContainsViOrLi("वसई-विरार शहर महानगरपालिका"), 120, yPos + 7);
  =============================
    // doc.text(reverseDevanagariIfContainsViOrLi("द्वारे देण्यात आले आणि ----------------------"), 120, yPos);
      // 'द्वारे देण्यात आले आणि' image dimensions
  