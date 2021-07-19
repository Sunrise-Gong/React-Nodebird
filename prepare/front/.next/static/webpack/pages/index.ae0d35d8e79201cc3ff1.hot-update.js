webpackHotUpdate_N_E("pages/index",{

/***/ "./components/PostImages.js":
/*!**********************************!*\
  !*** ./components/PostImages.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ \"./node_modules/@ant-design/icons/es/index.js\");\n/* harmony import */ var _ImagesZoom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ImagesZoom */ \"./components/ImagesZoom/index.js\");\nvar _this = undefined,\n    _jsxFileName = \"/Users/haedod-i/Desktop/React-Nodebird/prepare/front/components/PostImages.js\",\n    _s = $RefreshSig$();\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n// PostCard.js 의 자식\n\n\n\n // 폴더만 써도 자동으로 그 안의 index.js가 임폴트\n\nvar PostImages = function PostImages(_ref) {\n  _s();\n\n  var images = _ref.images;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false),\n      showImagesZoom = _useState[0],\n      setShowImagesZoom = _useState[1];\n\n  var onZoom = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])(function () {\n    setShowImagesZoom(true);\n  }, []);\n  var onClose = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])(function () {\n    setShowImagesZoom(false);\n  }, []);\n\n  if (images.length === 1) {\n    return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(\"img\", {\n      role: \"presentation\",\n      src: \"http://localhost:3065/\".concat(images[0].src),\n      alt: images[0].src,\n      onClick: onZoom,\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 18,\n        columnNumber: 17\n      }\n    }), showImagesZoom && __jsx(_ImagesZoom__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      images: images,\n      onClose: onClose,\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 19,\n        columnNumber: 36\n      }\n    }));\n  }\n\n  if (images.length === 2) {\n    return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(\"img\", {\n      role: \"presentation\",\n      style: {\n        width: '50%',\n        display: 'inline-block'\n      },\n      src: images[0].src,\n      alt: images[0].src,\n      onClick: onZoom,\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 27,\n        columnNumber: 17\n      }\n    }), __jsx(\"img\", {\n      role: \"presentation\",\n      style: {\n        width: '50%',\n        display: 'inline-block'\n      },\n      src: images[1].src,\n      alt: images[1].src,\n      onClick: onZoom,\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 28,\n        columnNumber: 17\n      }\n    }), showImagesZoom && __jsx(_ImagesZoom__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      images: images,\n      onClose: onClose,\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 29,\n        columnNumber: 36\n      }\n    }));\n  }\n\n  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(\"div\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 36,\n      columnNumber: 13\n    }\n  }, __jsx(\"img\", {\n    role: \"presentation\",\n    style: {\n      width: '50%'\n    },\n    src: images[0].src,\n    alt: images[0].src,\n    onClick: onZoom,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 37,\n      columnNumber: 17\n    }\n  }), __jsx(\"div\", {\n    role: \"presentation\",\n    style: {\n      display: 'inline-block',\n      width: '50%',\n      textAlign: 'center',\n      verticalAlign: 'middle'\n    },\n    onClick: onZoom,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 39,\n      columnNumber: 17\n    }\n  }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__[\"PlusOutlined\"], {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 43,\n      columnNumber: 21\n    }\n  }), __jsx(\"br\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 44,\n      columnNumber: 21\n    }\n  }), images.length - 1, \"\\uAC1C\\uC758 \\uC0AC\\uC9C4 \\uB354\\uBCF4\\uAE30\")), showImagesZoom && __jsx(_ImagesZoom__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    images: images,\n    onClose: onClose,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 48,\n      columnNumber: 32\n    }\n  }));\n};\n\n_s(PostImages, \"xZ+WVc/D16Fmvriq1CwZMW/wLmE=\");\n\n_c = PostImages;\nPostImages.propTypes = {\n  images: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object)\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (PostImages);\n\nvar _c;\n\n$RefreshReg$(_c, \"PostImages\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9Qb3N0SW1hZ2VzLmpzPzNkZGEiXSwibmFtZXMiOlsiUG9zdEltYWdlcyIsImltYWdlcyIsInVzZVN0YXRlIiwic2hvd0ltYWdlc1pvb20iLCJzZXRTaG93SW1hZ2VzWm9vbSIsIm9uWm9vbSIsInVzZUNhbGxiYWNrIiwib25DbG9zZSIsImxlbmd0aCIsInNyYyIsIndpZHRoIiwiZGlzcGxheSIsInRleHRBbGlnbiIsInZlcnRpY2FsQWxpZ24iLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtDQUV1Qzs7QUFFdkMsSUFBTUEsVUFBVSxHQUFHLFNBQWJBLFVBQWEsT0FBZ0I7QUFBQTs7QUFBQSxNQUFiQyxNQUFhLFFBQWJBLE1BQWE7O0FBQy9CLGtCQUE0Q0Msc0RBQVEsQ0FBQyxLQUFELENBQXBEO0FBQUEsTUFBT0MsY0FBUDtBQUFBLE1BQXVCQyxpQkFBdkI7O0FBRUEsTUFBTUMsTUFBTSxHQUFHQyx5REFBVyxDQUFDLFlBQU07QUFBRUYscUJBQWlCLENBQUMsSUFBRCxDQUFqQjtBQUEwQixHQUFuQyxFQUFxQyxFQUFyQyxDQUExQjtBQUVBLE1BQU1HLE9BQU8sR0FBR0QseURBQVcsQ0FBQyxZQUFNO0FBQUVGLHFCQUFpQixDQUFDLEtBQUQsQ0FBakI7QUFBMkIsR0FBcEMsRUFBc0MsRUFBdEMsQ0FBM0I7O0FBRUEsTUFBSUgsTUFBTSxDQUFDTyxNQUFQLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3JCLFdBQ0ksbUVBQ0k7QUFBSyxVQUFJLEVBQUMsY0FBVjtBQUF5QixTQUFHLGtDQUEyQlAsTUFBTSxDQUFDLENBQUQsQ0FBTixDQUFVUSxHQUFyQyxDQUE1QjtBQUF3RSxTQUFHLEVBQUVSLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVVEsR0FBdkY7QUFBNEYsYUFBTyxFQUFFSixNQUFyRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BREosRUFFS0YsY0FBYyxJQUFJLE1BQUMsbURBQUQ7QUFBWSxZQUFNLEVBQUVGLE1BQXBCO0FBQTRCLGFBQU8sRUFBRU0sT0FBckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUZ2QixDQURKO0FBTUg7O0FBRUQsTUFBSU4sTUFBTSxDQUFDTyxNQUFQLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3JCLFdBQ0ksbUVBQ0k7QUFBSyxVQUFJLEVBQUMsY0FBVjtBQUF5QixXQUFLLEVBQUU7QUFBRUUsYUFBSyxFQUFFLEtBQVQ7QUFBZ0JDLGVBQU8sRUFBRTtBQUF6QixPQUFoQztBQUEyRSxTQUFHLEVBQUVWLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVVEsR0FBMUY7QUFBK0YsU0FBRyxFQUFFUixNQUFNLENBQUMsQ0FBRCxDQUFOLENBQVVRLEdBQTlHO0FBQW1ILGFBQU8sRUFBRUosTUFBNUg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQURKLEVBRUk7QUFBSyxVQUFJLEVBQUMsY0FBVjtBQUF5QixXQUFLLEVBQUU7QUFBRUssYUFBSyxFQUFFLEtBQVQ7QUFBZ0JDLGVBQU8sRUFBRTtBQUF6QixPQUFoQztBQUEyRSxTQUFHLEVBQUVWLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVVEsR0FBMUY7QUFBK0YsU0FBRyxFQUFFUixNQUFNLENBQUMsQ0FBRCxDQUFOLENBQVVRLEdBQTlHO0FBQW1ILGFBQU8sRUFBRUosTUFBNUg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUZKLEVBR0tGLGNBQWMsSUFBSSxNQUFDLG1EQUFEO0FBQVksWUFBTSxFQUFFRixNQUFwQjtBQUE0QixhQUFPLEVBQUVNLE9BQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFIdkIsQ0FESjtBQU9IOztBQUVELFNBQ0ksbUVBQ0k7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJO0FBQUssUUFBSSxFQUFDLGNBQVY7QUFBeUIsU0FBSyxFQUFFO0FBQUVHLFdBQUssRUFBRTtBQUFULEtBQWhDO0FBQWtELE9BQUcsRUFBRVQsTUFBTSxDQUFDLENBQUQsQ0FBTixDQUFVUSxHQUFqRTtBQUFzRSxPQUFHLEVBQUVSLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVVEsR0FBckY7QUFBMEYsV0FBTyxFQUFFSixNQUFuRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREosRUFHSTtBQUNJLFFBQUksRUFBQyxjQURUO0FBRUksU0FBSyxFQUFFO0FBQUVNLGFBQU8sRUFBRSxjQUFYO0FBQTJCRCxXQUFLLEVBQUUsS0FBbEM7QUFBeUNFLGVBQVMsRUFBRSxRQUFwRDtBQUE4REMsbUJBQWEsRUFBRTtBQUE3RSxLQUZYO0FBR0ksV0FBTyxFQUFFUixNQUhiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FJSSxNQUFDLDhEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFKSixFQUtJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFMSixFQU1LSixNQUFNLENBQUNPLE1BQVAsR0FBZ0IsQ0FOckIsaURBSEosQ0FESixFQWFLTCxjQUFjLElBQUksTUFBQyxtREFBRDtBQUFZLFVBQU0sRUFBRUYsTUFBcEI7QUFBNEIsV0FBTyxFQUFFTSxPQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBYnZCLENBREo7QUFpQkgsQ0EzQ0Q7O0dBQU1QLFU7O0tBQUFBLFU7QUE2Q05BLFVBQVUsQ0FBQ2MsU0FBWCxHQUF1QjtBQUNuQmIsUUFBTSxFQUFFYyxpREFBUyxDQUFDQyxPQUFWLENBQWtCRCxpREFBUyxDQUFDRSxNQUE1QjtBQURXLENBQXZCO0FBSWVqQix5RUFBZiIsImZpbGUiOiIuL2NvbXBvbmVudHMvUG9zdEltYWdlcy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFBvc3RDYXJkLmpzIOydmCDsnpDsi51cbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUGx1c091dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xuXG5pbXBvcnQgSW1hZ2VzWm9vbSBmcm9tICcuL0ltYWdlc1pvb20nOyAvLyDtj7TrjZTrp4wg7I2o64+EIOyekOuPmeycvOuhnCDqt7gg7JWI7J2YIGluZGV4Lmpz6rCAIOyehO2PtO2KuFxuXG5jb25zdCBQb3N0SW1hZ2VzID0gKHsgaW1hZ2VzIH0pID0+IHtcbiAgICBjb25zdCBbc2hvd0ltYWdlc1pvb20sIHNldFNob3dJbWFnZXNab29tXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBcbiAgICBjb25zdCBvblpvb20gPSB1c2VDYWxsYmFjaygoKSA9PiB7IHNldFNob3dJbWFnZXNab29tKHRydWUpOyB9LCBbXSk7XG5cbiAgICBjb25zdCBvbkNsb3NlID0gdXNlQ2FsbGJhY2soKCkgPT4geyBzZXRTaG93SW1hZ2VzWm9vbShmYWxzZSk7IH0sIFtdKTtcbiAgICBcbiAgICBpZiAoaW1hZ2VzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8aW1nIHJvbGU9XCJwcmVzZW50YXRpb25cIiBzcmM9e2BodHRwOi8vbG9jYWxob3N0OjMwNjUvJHtpbWFnZXNbMF0uc3JjfWB9IGFsdD17aW1hZ2VzWzBdLnNyY30gb25DbGljaz17b25ab29tfSAvPlxuICAgICAgICAgICAgICAgIHtzaG93SW1hZ2VzWm9vbSAmJiA8SW1hZ2VzWm9vbSBpbWFnZXM9e2ltYWdlc30gb25DbG9zZT17b25DbG9zZX0gLz59XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGltYWdlcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPGltZyByb2xlPVwicHJlc2VudGF0aW9uXCIgc3R5bGU9e3sgd2lkdGg6ICc1MCUnLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyB9fSBzcmM9e2ltYWdlc1swXS5zcmN9IGFsdD17aW1hZ2VzWzBdLnNyY30gb25DbGljaz17b25ab29tfSAvPlxuICAgICAgICAgICAgICAgIDxpbWcgcm9sZT1cInByZXNlbnRhdGlvblwiIHN0eWxlPXt7IHdpZHRoOiAnNTAlJywgZGlzcGxheTogJ2lubGluZS1ibG9jaycgfX0gc3JjPXtpbWFnZXNbMV0uc3JjfSBhbHQ9e2ltYWdlc1sxXS5zcmN9IG9uQ2xpY2s9e29uWm9vbX0gLz5cbiAgICAgICAgICAgICAgICB7c2hvd0ltYWdlc1pvb20gJiYgPEltYWdlc1pvb20gaW1hZ2VzPXtpbWFnZXN9IG9uQ2xvc2U9e29uQ2xvc2V9IC8+fVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxpbWcgcm9sZT1cInByZXNlbnRhdGlvblwiIHN0eWxlPXt7IHdpZHRoOiAnNTAlJyB9fSBzcmM9e2ltYWdlc1swXS5zcmN9IGFsdD17aW1hZ2VzWzBdLnNyY30gb25DbGljaz17b25ab29tfSAvPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiIFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgd2lkdGg6ICc1MCUnLCB0ZXh0QWxpZ246ICdjZW50ZXInLCB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyB9fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblpvb219PlxuICAgICAgICAgICAgICAgICAgICA8UGx1c091dGxpbmVkIC8+XG4gICAgICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgICAgICB7aW1hZ2VzLmxlbmd0aCAtIDF96rCc7J2YIOyCrOynhCDrjZTrs7TquLBcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3Nob3dJbWFnZXNab29tICYmIDxJbWFnZXNab29tIGltYWdlcz17aW1hZ2VzfSBvbkNsb3NlPXtvbkNsb3NlfSAvPn1cbiAgICAgICAgPC8+XG4gICAgKTtcbn07XG5cblBvc3RJbWFnZXMucHJvcFR5cGVzID0ge1xuICAgIGltYWdlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQb3N0SW1hZ2VzOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/PostImages.js\n");

/***/ })

})