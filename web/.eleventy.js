module.exports = async function (eleventyConfig){

    // Hay que pasale las carpetas que contienen recursos
    eleventyConfig.addPassthroughCopy("src/assets/css")
    eleventyConfig.addPassthroughCopy("src/assets/js")
    eleventyConfig.addPassthroughCopy("src/assets/img")
    eleventyConfig.addPassthroughCopy("src/assets/icons");
    /*
    eleventyConfig.addPassthroughCopy("src/assets/download")
    eleventyConfig.addPassthroughCopy("src/CNAME");
    
    */

    

    return {
        dir:{
            input:  "src",
            output: "docs"
        },
    };
  };