module.exports = function (source) {
    console.log('loaderOptions', this.query);
    // loaderOptions { loaderName: 'custom-loader' }
    console.log('sourceStart', source);
    //     sourceStart 
    //     // Imports
    //     import ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ from "../node_modules/css-loader/dist/runtime/noSourceMaps.js";
    //     import ___CSS_LOADER_API_IMPORT___ from "../node_modules/css-loader/dist/runtime/api.js";
    //     import ___CSS_LOADER_GET_URL_IMPORT___ from "../node_modules/css-loader/dist/runtime/getUrl.js";
    //     var ___CSS_LOADER_URL_IMPORT_0___ = new URL("../imgs/test.png", import.meta.url);
    //     var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
    //     var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
    //     // Module
    //     ___CSS_LOADER_EXPORT___.push([module.id, `.test{
    //     color:red;
    //     background-image:url(${___CSS_LOADER_URL_REPLACEMENT_0___});
    // }`, ""]);
    //     // Exports
    //     export default ___CSS_LOADER_EXPORT___;
    return source
}
