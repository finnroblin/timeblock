"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 2633:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(8930);
;// CONCATENATED MODULE: external "@chakra-ui/theme-tools"
const theme_tools_namespaceObject = require("@chakra-ui/theme-tools");
;// CONCATENATED MODULE: ./src/theme.tsx



const fonts = {
    mono: `'Menlo', monospace`
};
const breakpoints = (0,theme_tools_namespaceObject.createBreakpoints)({
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em"
});
const theme = (0,react_.extendTheme)({
    colors: {
        black: "#16161D"
    },
    fonts,
    breakpoints,
    icons: {
        logo: {
            path: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                width: "3000",
                height: "3163",
                viewBox: "0 0 3000 3163",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("rect", {
                        width: "3000",
                        height: "3162.95",
                        fill: "none"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("path", {
                        d: "M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z",
                        fill: "currentColor"
                    })
                ]
            }),
            viewBox: "0 0 3000 3163"
        }
    }
});
/* harmony default export */ const src_theme = (theme);

;// CONCATENATED MODULE: ./src/pages/_app.tsx



function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(react_.ChakraProvider, {
        resetCSS: true,
        theme: src_theme,
        children: /*#__PURE__*/ jsx_runtime_.jsx(react_.ColorModeProvider, {
            options: {
                useSystemColorMode: true
            },
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 8930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2633));
module.exports = __webpack_exports__;

})();