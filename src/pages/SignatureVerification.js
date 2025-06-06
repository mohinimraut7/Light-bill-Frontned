// SignatureVerification.js - Helper functions for signature verification

export const checkSignatureVerification = (reports, users) => {
  const matches = [];

  reports.forEach(report => {
    report.reportingRemarks.forEach(remark => {
      // Check if remark is "Approved"
      if (remark.remark === "Approved") {
        // Look through documents in this remark
        remark.documents.forEach(document => {
          // Check if this is a form22 document
          if (document.formType === "form22") {
            // Check each approvedBy ID
            document.approvedBy.forEach(approvedById => {
              // Find the corresponding user from the users array
              const matchedUser = users.find(user => 
                user._id === approvedById
              );
              
              if (matchedUser) {
                matches.push({
                  user: matchedUser,
                  document: document,
                  remark: remark,
                  isVerified: matchedUser.signature && matchedUser.signature.length > 0,
                  role: matchedUser.role,
                  ward: matchedUser.ward
                });
              }
            });
          }
        });
      }
    });
  });

  return matches;
};

export const getSignaturesByRole = (signatureMatches) => {
  const signaturesByRole = {};
  
  signatureMatches.forEach(match => {
    if (match.isVerified && match.user.signature) {
      signaturesByRole[match.role] = match.user.signature;
    }
  });
  
  return signaturesByRole;
};

export const getRoleHierarchy = () => [
  "Lipik",
  "Junior Engineer", 
  "Accountant",
  "Assistant Municipal Commissioner",
  "Dy.Municipal Commissioner"
];