// module.exports = {
//   webpack: {
//     configure: (webpackConfig) => {
//       // Find and modify source-map-loader rule
//       webpackConfig.module.rules.forEach((rule) => {
//         if (rule.enforce === 'pre' && String(rule.test).includes('js')) {
//           rule.exclude = [
//             ...(rule.exclude || []),
//             /node_modules\/html2pdf\.js/
//           ];
//         }
//       });
//       return webpackConfig;
//     },
//   },
// };

// ------------------------------

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.enforce === 'pre' && String(rule.test).includes('js')) {
          
          // Get the existing exclude value
          let existingExcludes = [];
          
          if (Array.isArray(rule.exclude)) {
            existingExcludes = rule.exclude;
          } else if (rule.exclude) {
            // If it's NOT an array (string, RegExp), make it an array
            existingExcludes = [rule.exclude];
          }
          
          // Final updated exclude array
          rule.exclude = [
            ...existingExcludes,
            /node_modules\/html2pdf\.js/
          ];
        }
      });
      return webpackConfig;
    },
  },
};
