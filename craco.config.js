module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find and modify source-map-loader rule
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.enforce === 'pre' && String(rule.test).includes('js')) {
          rule.exclude = [
            ...(rule.exclude || []),
            /node_modules\/html2pdf\.js/
          ];
        }
      });
      return webpackConfig;
    },
  },
};
