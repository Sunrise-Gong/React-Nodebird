webpackHotUpdate_N_E("pages/profile",{

/***/ "./pages/profile.js":
/*!**************************!*\
  !*** ./pages/profile.js ***!
  \**************************/
/*! exports provided: __N_SSP, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSP\", function() { return __N_SSP; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_AppLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/AppLayout */ \"./components/AppLayout.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! swr */ \"./node_modules/swr/esm/index.js\");\n/* harmony import */ var _components_NicknameEditForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/NicknameEditForm */ \"./components/NicknameEditForm.js\");\n/* harmony import */ var _components_FollowList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/FollowList */ \"./components/FollowList.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ \"./node_modules/next/dist/client/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);\nvar _this = undefined,\n    _jsxFileName = \"/Users/haedod-i/Desktop/React-Nodebird/prepare/front/pages/profile.js\",\n    _s = $RefreshSig$();\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\n\n\n\n\n\n\nvar fetcher = function fetcher(url) {\n  return axios__WEBPACK_IMPORTED_MODULE_3___default.a.get(url, {\n    withCredentials: true\n  }).then(function (result) {\n    return result.data;\n  });\n};\n\nvar Profile = function Profile() {\n  _s();\n\n  //const dispatch = useDispatch();\n  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_7__[\"useSelector\"])(function (state) {\n    return state.user;\n  }),\n      me = _useSelector.me;\n\n  var _useSWR = Object(swr__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\"http://localhost:3065/user/followers?limit=\".concat(follwersLimit), fetcher),\n      followersData = _useSWR.data,\n      followerError = _useSWR.error;\n\n  var _useSWR2 = Object(swr__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\"http://localhost:3065/user/followings?limit=\".concat(followingsLimit), fetcher),\n      followingsData = _useSWR2.data,\n      followingError = _useSWR2.error; // useEffect(() => {\n  //     dispatch({ type: LOAD_FOLLOWERS_REQUEST });\n  //     dispatch({ type: LOAD_FOLLOWINGS_REQUEST });\n  // }, []);\n\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    if (!(me && me.id)) {\n      next_router__WEBPACK_IMPORTED_MODULE_8___default.a.push('/');\n    }\n  }, [me && me.id]);\n\n  if (!me) {\n    return __jsx(\"div\", {\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 31,\n        columnNumber: 23\n      }\n    }, \"\\uB85C\\uADF8\\uC778 \\uC0C1\\uD0DC\\uAC00 \\uC544\\uB2D9\\uB2C8\\uB2E4.\");\n  }\n\n  if (followerError || followingError) {\n    console.error(followerError || followingError);\n    return '팔로잉/팔로워 로딩 중 에러가 발생합니다';\n  }\n\n  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 40,\n      columnNumber: 13\n    }\n  }, __jsx(\"title\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 41,\n      columnNumber: 17\n    }\n  }, \"\\uB0B4 \\uD504\\uB85C\\uD544 | NodeBird\")), __jsx(_components_AppLayout__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 43,\n      columnNumber: 13\n    }\n  }, __jsx(_components_NicknameEditForm__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 44,\n      columnNumber: 17\n    }\n  }), __jsx(_components_FollowList__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    header: \"\\uD314\\uB85C\\uC789 \\uBAA9\\uB85D\",\n    data: followingsData\n    /*me.Followings*/\n    ,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 45,\n      columnNumber: 17\n    }\n  }), __jsx(_components_FollowList__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    header: \"\\uD314\\uB85C\\uC6CC \\uBAA9\\uB85D\",\n    data: followersData\n    /*me.Followers*/\n    ,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 46,\n      columnNumber: 17\n    }\n  })));\n};\n\n_s(Profile, \"yOwurXNg48oALiet3pdHwYEUo/c=\", false, function () {\n  return [react_redux__WEBPACK_IMPORTED_MODULE_7__[\"useSelector\"], swr__WEBPACK_IMPORTED_MODULE_4__[\"default\"], swr__WEBPACK_IMPORTED_MODULE_4__[\"default\"]];\n});\n\n_c = Profile;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Profile);\n\nvar _c;\n\n$RefreshReg$(_c, \"Profile\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvcHJvZmlsZS5qcz81YmUyIl0sIm5hbWVzIjpbImZldGNoZXIiLCJ1cmwiLCJheGlvcyIsImdldCIsIndpdGhDcmVkZW50aWFscyIsInRoZW4iLCJyZXN1bHQiLCJkYXRhIiwiUHJvZmlsZSIsInVzZVNlbGVjdG9yIiwic3RhdGUiLCJ1c2VyIiwibWUiLCJ1c2VTV1IiLCJmb2xsd2Vyc0xpbWl0IiwiZm9sbG93ZXJzRGF0YSIsImZvbGxvd2VyRXJyb3IiLCJlcnJvciIsImZvbGxvd2luZ3NMaW1pdCIsImZvbGxvd2luZ3NEYXRhIiwiZm9sbG93aW5nRXJyb3IiLCJ1c2VFZmZlY3QiLCJpZCIsIlJvdXRlciIsInB1c2giLCJjb25zb2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFJQSxJQUFNQSxPQUFPLEdBQUcsU0FBVkEsT0FBVSxDQUFDQyxHQUFEO0FBQUEsU0FBU0MsNENBQUssQ0FBQ0MsR0FBTixDQUFVRixHQUFWLEVBQWU7QUFBRUcsbUJBQWUsRUFBRTtBQUFuQixHQUFmLEVBQTBDQyxJQUExQyxDQUErQyxVQUFDQyxNQUFEO0FBQUEsV0FBWUEsTUFBTSxDQUFDQyxJQUFuQjtBQUFBLEdBQS9DLENBQVQ7QUFBQSxDQUFoQjs7QUFFQSxJQUFNQyxPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFNO0FBQUE7O0FBQ2xCO0FBQ0EscUJBQWVDLCtEQUFXLENBQUMsVUFBQ0MsS0FBRDtBQUFBLFdBQVdBLEtBQUssQ0FBQ0MsSUFBakI7QUFBQSxHQUFELENBQTFCO0FBQUEsTUFBUUMsRUFBUixnQkFBUUEsRUFBUjs7QUFFQSxnQkFBc0RDLG1EQUFNLHNEQUErQ0MsYUFBL0MsR0FBZ0VkLE9BQWhFLENBQTVEO0FBQUEsTUFBY2UsYUFBZCxXQUFRUixJQUFSO0FBQUEsTUFBb0NTLGFBQXBDLFdBQTZCQyxLQUE3Qjs7QUFDQSxpQkFBd0RKLG1EQUFNLHVEQUFnREssZUFBaEQsR0FBbUVsQixPQUFuRSxDQUE5RDtBQUFBLE1BQWNtQixjQUFkLFlBQVFaLElBQVI7QUFBQSxNQUFxQ2EsY0FBckMsWUFBOEJILEtBQTlCLENBTGtCLENBT2xCO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQUkseURBQVMsQ0FBQyxZQUFNO0FBQUUsUUFBSSxFQUFFVCxFQUFFLElBQUlBLEVBQUUsQ0FBQ1UsRUFBWCxDQUFKLEVBQW9CO0FBQUVDLHdEQUFNLENBQUNDLElBQVAsQ0FBWSxHQUFaO0FBQW1CO0FBQUUsR0FBcEQsRUFBc0QsQ0FBQ1osRUFBRSxJQUFJQSxFQUFFLENBQUNVLEVBQVYsQ0FBdEQsQ0FBVDs7QUFFQSxNQUFJLENBQUNWLEVBQUwsRUFBUztBQUFFLFdBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5RUFBUDtBQUFrQzs7QUFFN0MsTUFBSUksYUFBYSxJQUFJSSxjQUFyQixFQUFxQztBQUNqQ0ssV0FBTyxDQUFDUixLQUFSLENBQWNELGFBQWEsSUFBSUksY0FBL0I7QUFDQSxXQUFPLHdCQUFQO0FBQ0g7O0FBRUQsU0FDSSxtRUFDSSxNQUFDLGdEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRDQURKLENBREosRUFJSSxNQUFDLDZEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSSxNQUFDLG9FQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFESixFQUVJLE1BQUMsOERBQUQ7QUFBWSxVQUFNLEVBQUMsaUNBQW5CO0FBQTRCLFFBQUksRUFBRUQ7QUFBYztBQUFoRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBRkosRUFHSSxNQUFDLDhEQUFEO0FBQVksVUFBTSxFQUFDLGlDQUFuQjtBQUE0QixRQUFJLEVBQUVKO0FBQWE7QUFBL0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUhKLENBSkosQ0FESjtBQVlILENBakNEOztHQUFNUCxPO1VBRWFDLHVELEVBRXVDSSwyQyxFQUNFQSwyQzs7O0tBTHRETCxPOztBQW9EU0Esc0VBQWYiLCJmaWxlIjoiLi9wYWdlcy9wcm9maWxlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBBcHBMYXlvdXQgZnJvbSAnLi4vY29tcG9uZW50cy9BcHBMYXlvdXQnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB7IEVORCB9IGZyb20gJ3JlZHV4LXNhZ2EnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB1c2VTV1IgZnJvbSAnc3dyJztcblxuaW1wb3J0IE5pY2tuYW1lRWRpdEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9OaWNrbmFtZUVkaXRGb3JtJztcbmltcG9ydCBGb2xsb3dMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvRm9sbG93TGlzdCc7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0IHsgTE9BRF9NWV9JTkZPX1JFUVVFU1QgfSBmcm9tICcuLi9yZWR1Y2Vycy91c2VyJztcbmltcG9ydCB3cmFwcGVyIGZyb20gJy4uL3N0b3JlL2NvbmZpZ3VyZVN0b3JlJztcblxuY29uc3QgZmV0Y2hlciA9ICh1cmwpID0+IGF4aW9zLmdldCh1cmwsIHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pLnRoZW4oKHJlc3VsdCkgPT4gcmVzdWx0LmRhdGEpO1xuXG5jb25zdCBQcm9maWxlID0gKCkgPT4ge1xuICAgIC8vY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICAgIGNvbnN0IHsgbWUgfSA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUudXNlcik7XG4gICAgXG4gICAgY29uc3QgeyBkYXRhOiBmb2xsb3dlcnNEYXRhLCBlcnJvcjogZm9sbG93ZXJFcnJvciB9ID0gdXNlU1dSKGBodHRwOi8vbG9jYWxob3N0OjMwNjUvdXNlci9mb2xsb3dlcnM/bGltaXQ9JHtmb2xsd2Vyc0xpbWl0fWAsIGZldGNoZXIpO1xuICAgIGNvbnN0IHsgZGF0YTogZm9sbG93aW5nc0RhdGEsIGVycm9yOiBmb2xsb3dpbmdFcnJvciB9ID0gdXNlU1dSKGBodHRwOi8vbG9jYWxob3N0OjMwNjUvdXNlci9mb2xsb3dpbmdzP2xpbWl0PSR7Zm9sbG93aW5nc0xpbWl0fWAsIGZldGNoZXIpO1xuXG4gICAgLy8gdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyAgICAgZGlzcGF0Y2goeyB0eXBlOiBMT0FEX0ZPTExPV0VSU19SRVFVRVNUIH0pO1xuICAgIC8vICAgICBkaXNwYXRjaCh7IHR5cGU6IExPQURfRk9MTE9XSU5HU19SRVFVRVNUIH0pO1xuICAgIC8vIH0sIFtdKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7IGlmICghKG1lICYmIG1lLmlkKSkgeyBSb3V0ZXIucHVzaCgnLycpOyB9IH0sIFttZSAmJiBtZS5pZF0pO1xuICAgIFxuICAgIGlmICghbWUpIHsgcmV0dXJuIDxkaXY+66Gc6re47J24IOyDge2DnOqwgCDslYTri5nri4jri6QuPC9kaXY+OyB9XG5cbiAgICBpZiAoZm9sbG93ZXJFcnJvciB8fCBmb2xsb3dpbmdFcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGZvbGxvd2VyRXJyb3IgfHwgZm9sbG93aW5nRXJyb3IpO1xuICAgICAgICByZXR1cm4gJ+2MlOuhnOyeiS/tjJTroZzsm4wg66Gc65SpIOykkSDsl5Drn6zqsIAg67Cc7IOd7ZWp64uI64ukJztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgICAgIDx0aXRsZT7rgrQg7ZSE66Gc7ZWEIHwgTm9kZUJpcmQ8L3RpdGxlPlxuICAgICAgICAgICAgPC9IZWFkPlxuICAgICAgICAgICAgPEFwcExheW91dD5cbiAgICAgICAgICAgICAgICA8Tmlja25hbWVFZGl0Rm9ybSAvPlxuICAgICAgICAgICAgICAgIDxGb2xsb3dMaXN0IGhlYWRlcj1cIu2MlOuhnOyeiSDrqqnroZ1cIiBkYXRhPXtmb2xsb3dpbmdzRGF0YS8qbWUuRm9sbG93aW5ncyovfSAvPlxuICAgICAgICAgICAgICAgIDxGb2xsb3dMaXN0IGhlYWRlcj1cIu2MlOuhnOybjCDrqqnroZ1cIiBkYXRhPXtmb2xsb3dlcnNEYXRhLyptZS5Gb2xsb3dlcnMqL30gLz5cbiAgICAgICAgICAgIDwvQXBwTGF5b3V0PlxuICAgICAgICA8Lz5cbiAgICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFNlcnZlclNpZGVQcm9wcyA9IHdyYXBwZXIuZ2V0U2VydmVyU2lkZVByb3BzKGFzeW5jIChjb250ZXh0KSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2dldFNlcnZlclNpZGVQcm9wcyDsi5zsnpEnKTtcbiAgICBjb25zb2xlLmxvZygn7Zek642UJywgY29udGV4dC5yZXEuaGVhZGVycyk7XG4gICAgXG4gICAgY29uc3QgY29va2llID0gY29udGV4dC5yZXEgPyBjb250ZXh0LnJlcS5oZWFkZXJzLmNvb2tpZSA6ICcnO1xuICAgIFxuICAgIGF4aW9zLmRlZmF1bHRzLmhlYWRlcnMuQ29va2llID0gJyc7XG4gICAgaWYgKGNvbnRleHQucmVxICYmIGNvb2tpZSkgeyBheGlvcy5kZWZhdWx0cy5oZWFkZXJzLkNvb2tpZSA9IGNvb2tpZTsgfVxuXG4gICAgY29udGV4dC5zdG9yZS5kaXNwYXRjaCh7IHR5cGU6IExPQURfTVlfSU5GT19SRVFVRVNUIH0pO1xuICAgIFxuICAgIGNvbnRleHQuc3RvcmUuZGlzcGF0Y2goRU5EKTtcbiAgICBjb25zb2xlLmxvZygnZ2V0U2VydmVyU2lkZVByb3BzIOuBnScpO1xuICAgIFxuICAgIGF3YWl0IGNvbnRleHQuc3RvcmUuc2FnYVRhc2sudG9Qcm9taXNlKCk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/profile.js\n");

/***/ })

})