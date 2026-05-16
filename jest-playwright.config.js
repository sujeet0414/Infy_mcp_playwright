module.exports = {
        browsers : ["chromium"],

        
        verbose: true,
        launchOptions: {
          headless: true,
        },
        setTimeout : 6000,
        contextOptions: {
          ignoreHTTPSErrors: true,
          viewport: {
            width: 1520,
            height: 800
          }
        },
        
         
        devices: [],
        
      
}