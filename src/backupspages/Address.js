import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

// Import images
import FAWardAAddress from '../Images/FAWardAAddress.png';
import FAWardBAddress from '../Images/FAWardBAddress.png';
import FAWardCAddress from '../Images/FAWardCAddress.png';
import FAWardDAddress from '../Images/FAWardDAddress.png';
import FAWardEAddress from '../Images/FAWardEAddress.png';
import FAWardFAddress from '../Images/FAWardFAddress.png';
import FAWardGAddress from '../Images/FAWardGAddress.png';
import FAWardHAddress from '../Images/FAWardHAddress.png';
import FAWardIAddress from '../Images/FAWardIAddress.png';

const FaultyMeterReport = ({ user, logovvcmccmp, DVOTSurekhBShip, loadDvoSBShipFont, reverseDevanagariIfContainsViOrLi }) => {
  const [pdfBlob, setPdfBlob] = useState(null);
  const [showFormControl, setShowFormControl] = useState(false);
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);

  // Helper function to get address image based on ward
  const getWardAddressImage = (ward) => {
    switch (ward) {
      case "Ward-A": return FAWardAAddress;
      case "Ward-B": return FAWardBAddress;
      case "Ward-C": return FAWardCAddress;
      case "Ward-D": return FAWardDAddress;
      case "Ward-E": return FAWardEAddress;
      case "Ward-F": return FAWardFAddress;
      case "Ward-G": return FAWardGAddress;
      case "Ward-H": return FAWardHAddress;
      case "Ward-I": return FAWardIAddress;
      default: return null;
    }
  };

  const handlePdfPreview = (pdfData, type, selectedMonthYear) => {
    // Implementation of PDF preview functionality
    console.log("PDF Preview", pdfData, type, selectedMonthYear);
  };




  
  const downloadFaultyMeterReport = () => {
    setShowFormControl(true);
    try {
      var doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
     
      doc.addFileToVFS("DVOTSurekh_B_Ship.ttf", DVOTSurekhBShip);
      doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
      loadDvoSBShipFont(doc);
      doc.setFont("DVOTSurekh_B_Ship");

      doc.setFontSize(12);

      const pageWidth = doc.internal.pageSize.getWidth();
      
      const leftX = 10;
      const centerX = pageWidth / 2-10;
      const rightX = pageWidth - 60;
      let y = 20;
      
      // Use address image based on user's ward
      if (user?.ward) {
        const addressImage = getWardAddressImage(user.ward);
        if (addressImage) {
          // Add the address image instead of text
          // Adjust width and height as needed for proper sizing of the image
          const imgWidth = 80;
          const imgHeight = 25;
          doc.addImage(addressImage, 'PNG', leftX, y, imgWidth, imgHeight);
        }
      }
      
      doc.text("दूरध्वनी : ०२५०-२३३४१४४", rightX, y);
      doc.text("फॅक्स : ०२५०-२५२५१०७", rightX, y + 6);
      doc.text("जा.क्र. :-", rightX, y + 18);
      doc.text(reverseDevanagariIfContainsViOrLi("दिनांक :-"), rightX, y + 24);

      let yPos = 15;
      const logoWidth = 30;
      const logoHeight = 30;

      const pageHeight = doc.internal.pageSize.getHeight();
      const centerY = yPos + 0;

      doc.addImage(logovvcmccmp, 'PNG', centerX, centerY, logoWidth, logoHeight);

      y += 36; 
      const lineY = y - 2; 
      doc.line(10, lineY, doc.internal.pageSize.getWidth() - 10, lineY); 
      y += 15; 
      
      doc.text("प्रति,", leftX, y);
      y += 8;
      doc.text(reverseDevanagariIfContainsViOrLi("मा. उप-कार्यकारी अभियंता"), leftX, y);
      y += 8;
      doc.text(reverseDevanagariIfContainsViOrLi("म.रा.वि.वि.कं.लि,"), leftX, y);
      y += 8;
      doc.text("वसई प.", leftX, y);
      y += 12;
      
      doc.setFontSize(15);
      
      const subjectText = reverseDevanagariIfContainsViOrLi("विषय:- फॉल्टी मिटर बाबत.");

      doc.text(subjectText, pageWidth / 2, y, { align: "center" });
      y += 12;
      y += 12;

      const normalSpacing = 8;
      const extraSpacing = 14; 
      const leftspaceX = leftX + 15; 
      doc.setFontSize(14); 

      doc.text(reverseDevanagariIfContainsViOrLi("महोदय, उपरोक्त विषयान्वये कळविण्यात येते की,"), leftspaceX, y);
      y += normalSpacing;
      doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका, प्रभाग समिती 'एच'"), leftspaceX, y);
      y += extraSpacing;

      doc.text(reverseDevanagariIfContainsViOrLi("दिवागणमन तलाव ग्राहक क्र. श्री फेज विद्युत मिटर फॉल्टी असून"), leftspaceX, y);
      y += normalSpacing;
      doc.text(reverseDevanagariIfContainsViOrLi("सदर मिटर बदली करून नविन मिटर बसविणे गरजेचे आहे."), leftspaceX, y);
      y += extraSpacing;

      doc.text(reverseDevanagariIfContainsViOrLi("जेणे करून रिडींग प्रमाणे बिल भरणे सोईचे होईल."), leftspaceX, y);
      y += normalSpacing;
      doc.text(reverseDevanagariIfContainsViOrLi("सदर कामी म.रा.वि.वि.कं.लि. नियमानुसार"), leftspaceX, y);
      y += extraSpacing;

      doc.text(reverseDevanagariIfContainsViOrLi("नविन मिटर बसविण्याचे मागणीपत्रक (Form quotation)"), leftspaceX, y);
      y += normalSpacing;
      doc.text(reverseDevanagariIfContainsViOrLi("महापालिकेकडे पाठवावे ही विनंती."), leftspaceX, y);
      y += extraSpacing;
         
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

      const rightPadding = 100;
      const rightlX = pageWidth - 10; 

      doc.text(reverseDevanagariIfContainsViOrLi("अधिक्षक, विद्युत विभाग"), rightlX, y, { align: 'right' });
      doc.text(reverseDevanagariIfContainsViOrLi(prabhagSamitiText), rightlX, y + 8, { align: 'right' });
      doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightlX, y + 16, { align: 'right' });

      const pdfData = doc.output('datauristring');
      let type = "faultymeter";
      
      handlePdfPreview(pdfData, type, selectedMonthYear);

      const pdfBlob = doc.output('blob');
      setPdfBlob(pdfBlob);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="p-4">
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={downloadFaultyMeterReport}
      >
        Generate Faulty Meter Report
      </button>
      
      {pdfBlob && (
        <div className="mt-4">
          <a 
            href={URL.createObjectURL(pdfBlob)} 
            download="faulty_meter_report.pdf"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download Report
          </a>
        </div>
      )}
    </div>
  );
};

export default FaultyMeterReport;
===========================
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

// Import ward address images
import FAWardAAddress from '../Images/FAWardAAddress.png';
import FAWardBAddress from '../Images/FAWardBAddress.png';
import FAWardCAddress from '../Images/FAWardCAddress.png';
import FAWardDAddress from '../Images/FAWardDAddress.png';
import FAWardEAddress from '../Images/FAWardEAddress.png';
import FAWardFAddress from '../Images/FAWardFAddress.png';
import FAWardGAddress from '../Images/FAWardGAddress.png';
import FAWardHAddress from '../Images/FAWardHAddress.png';
import FAWardIAddress from '../Images/FAWardIAddress.png';

// Import recipient images
import FAPratiVirarPurv from '../Images/PratiVirarPurv.png';
import FAPratiVirarPachhim from '../Images/PratiVirarPacchim.png';
import FAPratiNalasoparaPurv from '../Images/PratiNalasoparaPurv.png';
import FAPratiNalasoparaPacchim from '../Images/PratiNalasoparaPacchim.png';
import FAPratiVasaiPurv from '../Images/PratiVasaiPurv.png';
import FAPratiVasaiPacchim from '../Images/PratiVasaiPacchim.png';

const FaultyMeterReport = ({ user, logovvcmccmp, DVOTSurekhBShip, loadDvoSBShipFont, reverseDevanagariIfContainsViOrLi }) => {
  const [pdfBlob, setPdfBlob] = useState(null);
  const [showFormControl, setShowFormControl] = useState(false);
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);

  const getWardAddressImage = (ward) => {
    switch (ward) {
      case "Ward-A": return FAWardAAddress;
      case "Ward-B": return FAWardBAddress;
      case "Ward-C": return FAWardCAddress;
      case "Ward-D": return FAWardDAddress;
      case "Ward-E": return FAWardEAddress;
      case "Ward-F": return FAWardFAddress;
      case "Ward-G": return FAWardGAddress;
      case "Ward-H": return FAWardHAddress;
      case "Ward-I": return FAWardIAddress;
      default: return null;
    }
  };

  const getWardPrati = (ward) => {
    switch (ward) {
      case "Ward-A": return FAPratiVirarPachhim;
      case "Ward-B": return FAPratiVirarPurv;
      case "Ward-C": return FAPratiVirarPurv;
      case "Ward-D": return FAPratiNalasoparaPurv;
      case "Ward-E": return FAPratiNalasoparaPacchim;
      case "Ward-F": return FAPratiVasaiPurv;
      case "Ward-G": return FAPratiVasaiPurv;
      case "Ward-H": return FAPratiVasaiPacchim;
      case "Ward-I": return FAPratiVasaiPacchim;
      default: return null;
    }
  };

  const handlePdfPreview = (pdfData, type, selectedMonthYear) => {
    console.log("PDF Preview", pdfData, type, selectedMonthYear);
  };

  const downloadFaultyMeterReport = () => {
    setShowFormControl(true);
    try {
      var doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
     
      doc.addFileToVFS("DVOTSurekh_B_Ship.ttf", DVOTSurekhBShip);
      doc.addFont("DVOTSurekh_B_Ship.ttf", "DVOTSurekh_B_Ship", "normal");
      loadDvoSBShipFont(doc);
      doc.setFont("DVOTSurekh_B_Ship");

      doc.setFontSize(12);

      const pageWidth = doc.internal.pageSize.getWidth();
      
      const leftX = 10;
      const centerX = pageWidth / 2-10;
      const rightX = pageWidth - 60;
      let y = 20;
      
      // Add ward address image
      if (user?.ward) {
        const addressImage = getWardAddressImage(user.ward);
        if (addressImage) {
          const imgWidth = 80;
          const imgHeight = 25;
          doc.addImage(addressImage, 'PNG', leftX, y, imgWidth, imgHeight);
        }
      }
      
      doc.text("दूरध्वनी : ०२५०-२३३४१४४", rightX, y);
      doc.text("फॅक्स : ०२५०-२५२५१०७", rightX, y + 6);
      doc.text("जा.क्र. :-", rightX, y + 18);
      doc.text(reverseDevanagariIfContainsViOrLi("दिनांक :-"), rightX, y + 24);

      let yPos = 15;
      const logoWidth = 30;
      const logoHeight = 30;
      const centerY = yPos + 0;

      doc.addImage(logovvcmccmp, 'PNG', centerX, centerY, logoWidth, logoHeight);

      y += 36; 
      const lineY = y - 2; 
      doc.line(10, lineY, doc.internal.pageSize.getWidth() - 10, lineY); 
      y += 15; 
      
      // Add recipient image based on ward
      if (user?.ward) {
        const pratiImage = getWardPrati(user.ward);
        if (pratiImage) {
          const pratiWidth = 80;
          const pratiHeight = 30;
          doc.addImage(pratiImage, 'PNG', leftX, y, pratiWidth, pratiHeight);
          y += pratiHeight + 12; // Adjust y position after adding image
        }
      }

      doc.setFontSize(15);
      
      const subjectText = reverseDevanagariIfContainsViOrLi("विषय:- फॉल्टी मिटर बाबत.");
      doc.text(subjectText, pageWidth / 2, y, { align: "center" });
      y += 24;

      const normalSpacing = 8;
      const extraSpacing = 14; 
      const leftspaceX = leftX + 15; 
      doc.setFontSize(14); 

      doc.text(reverseDevanagariIfContainsViOrLi("महोदय, उपरोक्त विषयान्वये कळविण्यात येते की,"), leftspaceX, y);
      y += normalSpacing;
      doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका, प्रभाग समिती 'एच'"), leftspaceX, y);
      y += extraSpacing;

      doc.text(reverseDevanagariIfContainsViOrLi("दिवागणमन तलाव ग्राहक क्र. श्री फेज विद्युत मिटर फॉल्टी असून"), leftspaceX, y);
      y += normalSpacing;
      doc.text(reverseDevanagariIfContainsViOrLi("सदर मिटर बदली करून नविन मिटर बसविणे गरजेचे आहे."), leftspaceX, y);
      y += extraSpacing;

      doc.text(reverseDevanagariIfContainsViOrLi("जेणे करून रिडींग प्रमाणे बिल भरणे सोईचे होईल."), leftspaceX, y);
      y += normalSpacing;
      doc.text(reverseDevanagariIfContainsViOrLi("सदर कामी म.रा.वि.वि.कं.लि. नियमानुसार"), leftspaceX, y);
      y += extraSpacing;

      doc.text(reverseDevanagariIfContainsViOrLi("नविन मिटर बसविण्याचे मागणीपत्रक (Form quotation)"), leftspaceX, y);
      y += normalSpacing;
      doc.text(reverseDevanagariIfContainsViOrLi("महापालिकेकडे पाठवावे ही विनंती."), leftspaceX, y);
      y += extraSpacing;
         
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

      const rightlX = pageWidth - 10; 

      doc.text(reverseDevanagariIfContainsViOrLi("अधिक्षक, विद्युत विभाग"), rightlX, y, { align: 'right' });
      doc.text(reverseDevanagariIfContainsViOrLi(prabhagSamitiText), rightlX, y + 8, { align: 'right' });
      doc.text(reverseDevanagariIfContainsViOrLi("वसई विरार शहर महानगरपालिका"), rightlX, y + 16, { align: 'right' });

      const pdfData = doc.output('datauristring');
      let type = "faultymeter";
      
      handlePdfPreview(pdfData, type, selectedMonthYear);

      const pdfBlob = doc.output('blob');
      setPdfBlob(pdfBlob);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="p-4">
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={downloadFaultyMeterReport}
      >
        Generate Faulty Meter Report
      </button>
      
      {pdfBlob && (
        <div className="mt-4">
          <a 
            href={URL.createObjectURL(pdfBlob)} 
            download="faulty_meter_report.pdf"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download Report
          </a>
        </div>
      )}
    </div>
  );
};

export default FaultyMeterReport;