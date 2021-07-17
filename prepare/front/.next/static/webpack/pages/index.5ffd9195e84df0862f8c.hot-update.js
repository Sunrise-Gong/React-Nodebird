webpackHotUpdate_N_E("pages/index",{

/***/ "./components/PostForm.js":
/*!********************************!*\
  !*** ./components/PostForm.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ \"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ \"./node_modules/antd/es/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _reducers_post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/post */ \"./reducers/post.js\");\n/* harmony import */ var _hooks_useInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/useInput */ \"./hooks/useInput.js\");\n\n\nvar _this = undefined,\n    _jsxFileName = \"/Users/haedod-i/Desktop/React-Nodebird/prepare/front/components/PostForm.js\",\n    _s = $RefreshSig$();\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;\n\n\n\n //액션\n\n\n\nvar PostForm = function PostForm() {\n  _s();\n\n  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useSelector\"])(function (state) {\n    return state.post;\n  }),\n      imagePaths = _useSelector.imagePaths,\n      addPostDone = _useSelector.addPostDone;\n\n  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useDispatch\"])();\n\n  var _useInput = Object(_hooks_useInput__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(''),\n      _useInput2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_useInput, 3),\n      text = _useInput2[0],\n      onChangeText = _useInput2[1],\n      setText = _useInput2[2]; //------------------------------------------------ 작성한 글이 업로드 성공시 인풋창 비우기\n\n\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(function () {\n    if (addPostDone) {\n      setText('');\n    }\n  }, [addPostDone]); //------------------------------------------------ 이미지 업로드 버튼 클릭\n\n  var imageInput = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useRef\"])();\n  var onClickImageUpload = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useCallback\"])(function () {\n    imageInput.current.click();\n  }, [imageInput.current]); //------------------------------------------------ 이미지 업로드 \n\n  var onChangeImages = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useCallback\"])(function (e) {\n    console.log('images', e.target.files);\n    var imageFormData = new FormData();\n    [].forEach.call(e.target.files, function (f) {\n      imageFormData.append('image', f);\n    }); // e.target.files 가 유사 배열이여서 call 을 사용함\n\n    dispatch({\n      type: _reducers_post__WEBPACK_IMPORTED_MODULE_4__[\"UPLOAD_IMAGES_REQUEST\"],\n      data: imageFormData\n    });\n  }, []);\n  var onRemoveImage = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useCallback\"])(function (index) {\n    return function () {\n      dispatch({\n        type: _reducers_post__WEBPACK_IMPORTED_MODULE_4__[\"REMOVE_IMAGE\"],\n        data: index\n      });\n    };\n  }); //------------------------------------------------ 게시글/이미지 등록버튼 클릭\n\n  var onSubmit = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useCallback\"])(function () {\n    var formData = new FormData();\n    imagePaths.forEach(function (p) {\n      formData.append('image', p);\n    });\n    formData.append('content', text);\n    dispatch({\n      type: _reducers_post__WEBPACK_IMPORTED_MODULE_4__[\"ADD_POST_REQUEST\"],\n      data: formData\n    });\n  }, [text, imagePaths]);\n  return __jsx(antd__WEBPACK_IMPORTED_MODULE_2__[\"Form\"], {\n    style: {\n      margin: '10px 0 20 px'\n    },\n    encType: \"multipart/form-data\",\n    onFinish: onSubmit,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 49,\n      columnNumber: 9\n    }\n  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__[\"Input\"].TextArea, {\n    value: text,\n    onChange: onChangeText,\n    maxLength: 140,\n    placeholder: \"\\uC5B4\\uB5A4 \\uC2E0\\uAE30\\uD55C \\uC77C\\uC774 \\uC788\\uC5C8\\uB098\\uC694?\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 54,\n      columnNumber: 13\n    }\n  }), __jsx(\"div\", {\n    style: {\n      marginBottom: 20\n    },\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 60,\n      columnNumber: 13\n    }\n  }, __jsx(\"input\", {\n    type: \"file\",\n    name: \"image\",\n    multiple: true,\n    hidden: true,\n    ref: imageInput,\n    onChange: onChangeImages\n    /* 이미지 선택후 확인을 누르면 실행됨 */\n    ,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 61,\n      columnNumber: 17\n    }\n  }), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n    onClick: onClickImageUpload,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 62,\n      columnNumber: 17\n    }\n  }, \"\\uC774\\uBBF8\\uC9C0 \\uC5C5\\uB85C\\uB4DC\"), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n    type: \"primary\",\n    style: {\n      \"float\": 'right'\n    },\n    htmlType: \"submit\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 63,\n      columnNumber: 17\n    }\n  }, \"\\uC9F9\\uC9F9\")), __jsx(\"div\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 71,\n      columnNumber: 13\n    }\n  }, imagePaths.map(function (v, i) {\n    return (// 이미지 업로드 미리보기 부분\n      __jsx(\"div\", {\n        key: v,\n        style: {\n          display: 'inline-block'\n        },\n        __self: _this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 73,\n          columnNumber: 21\n        }\n      }, __jsx(\"img\", {\n        src: \"http://localhost:3065/\".concat(v),\n        style: {\n          width: '200px'\n        },\n        alt: v,\n        __self: _this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 74,\n          columnNumber: 25\n        }\n      }), __jsx(\"div\", {\n        __self: _this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 75,\n          columnNumber: 25\n        }\n      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n        onClick: onRemoveImage(i),\n        __self: _this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 76,\n          columnNumber: 29\n        }\n      }, \"\\uC81C\\uAC70\")))\n    );\n  })));\n};\n\n_s(PostForm, \"grZ0lbPKQPoMIr8sPJFir6I6RiA=\", false, function () {\n  return [react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useSelector\"], react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useDispatch\"], _hooks_useInput__WEBPACK_IMPORTED_MODULE_5__[\"default\"]];\n});\n\n_c = PostForm;\n/* harmony default export */ __webpack_exports__[\"default\"] = (PostForm);\n\nvar _c;\n\n$RefreshReg$(_c, \"PostForm\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9Qb3N0Rm9ybS5qcz83OWM1Il0sIm5hbWVzIjpbIlBvc3RGb3JtIiwidXNlU2VsZWN0b3IiLCJzdGF0ZSIsInBvc3QiLCJpbWFnZVBhdGhzIiwiYWRkUG9zdERvbmUiLCJkaXNwYXRjaCIsInVzZURpc3BhdGNoIiwidXNlSW5wdXQiLCJ0ZXh0Iiwib25DaGFuZ2VUZXh0Iiwic2V0VGV4dCIsInVzZUVmZmVjdCIsImltYWdlSW5wdXQiLCJ1c2VSZWYiLCJvbkNsaWNrSW1hZ2VVcGxvYWQiLCJ1c2VDYWxsYmFjayIsImN1cnJlbnQiLCJjbGljayIsIm9uQ2hhbmdlSW1hZ2VzIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJmaWxlcyIsImltYWdlRm9ybURhdGEiLCJGb3JtRGF0YSIsImZvckVhY2giLCJjYWxsIiwiZiIsImFwcGVuZCIsInR5cGUiLCJVUExPQURfSU1BR0VTX1JFUVVFU1QiLCJkYXRhIiwib25SZW1vdmVJbWFnZSIsImluZGV4IiwiUkVNT1ZFX0lNQUdFIiwib25TdWJtaXQiLCJmb3JtRGF0YSIsInAiLCJBRERfUE9TVF9SRVFVRVNUIiwibWFyZ2luIiwibWFyZ2luQm90dG9tIiwibWFwIiwidiIsImkiLCJkaXNwbGF5Iiwid2lkdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtDQUN5Rjs7QUFDekY7O0FBRUEsSUFBTUEsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBTTtBQUFBOztBQUNuQixxQkFBb0NDLCtEQUFXLENBQUMsVUFBQ0MsS0FBRDtBQUFBLFdBQVdBLEtBQUssQ0FBQ0MsSUFBakI7QUFBQSxHQUFELENBQS9DO0FBQUEsTUFBUUMsVUFBUixnQkFBUUEsVUFBUjtBQUFBLE1BQW9CQyxXQUFwQixnQkFBb0JBLFdBQXBCOztBQUNBLE1BQU1DLFFBQVEsR0FBR0MsK0RBQVcsRUFBNUI7O0FBQ0Esa0JBQXNDQywrREFBUSxDQUFDLEVBQUQsQ0FB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bmVudHMvUG9zdEZvcm0uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZVJlZiwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnV0dG9uLCBGb3JtLCBJbnB1dCB9IGZyb20gJ2FudGQnO1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgQUREX1BPU1RfUkVRVUVTVCwgUkVNT1ZFX0lNQUdFLCBVUExPQURfSU1BR0VTX1JFUVVFU1QgfSBmcm9tICcuLi9yZWR1Y2Vycy9wb3N0JzsvL+yVoeyFmFxuaW1wb3J0IHVzZUlucHV0IGZyb20gJy4uL2hvb2tzL3VzZUlucHV0JztcblxuY29uc3QgUG9zdEZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpbWFnZVBhdGhzLCBhZGRQb3N0RG9uZSB9ID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5wb3N0KTtcbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG4gICAgY29uc3QgW3RleHQsIG9uQ2hhbmdlVGV4dCwgc2V0VGV4dF0gPSB1c2VJbnB1dCgnJyk7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSDsnpHshLHtlZwg6riA7J20IOyXheuhnOuTnCDshLHqs7Xsi5wg7J247ZKL7LC9IOu5hOyasOq4sFxuICAgIFxuICAgIHVzZUVmZmVjdCgoKSA9PiB7IGlmIChhZGRQb3N0RG9uZSkgeyBzZXRUZXh0KCcnKTsgfSB9LCBbYWRkUG9zdERvbmVdKTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0g7J2066+47KeAIOyXheuhnOuTnCDrsoTtirwg7YG066atXG4gICAgY29uc3QgaW1hZ2VJbnB1dCA9IHVzZVJlZigpO1xuICAgIFxuICAgIGNvbnN0IG9uQ2xpY2tJbWFnZVVwbG9hZCA9IHVzZUNhbGxiYWNrKCgpID0+IHsgaW1hZ2VJbnB1dC5jdXJyZW50LmNsaWNrKCk7IH0sIFtpbWFnZUlucHV0LmN1cnJlbnRdKTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0g7J2066+47KeAIOyXheuhnOuTnCBcbiAgICBjb25zdCBvbkNoYW5nZUltYWdlcyA9IHVzZUNhbGxiYWNrKChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbWFnZXMnLCBlLnRhcmdldC5maWxlcyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbWFnZUZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIFxuICAgICAgICBbXS5mb3JFYWNoLmNhbGwoZS50YXJnZXQuZmlsZXMsIChmKSA9PiB7IGltYWdlRm9ybURhdGEuYXBwZW5kKCdpbWFnZScsIGYpOyB9KTsgLy8gZS50YXJnZXQuZmlsZXMg6rCAIOycoOyCrCDrsLDsl7TsnbTsl6zshJwgY2FsbCDsnYQg7IKs7Jqp7ZWoXG4gICAgICAgIFxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFVQTE9BRF9JTUFHRVNfUkVRVUVTVCwgZGF0YTogaW1hZ2VGb3JtRGF0YSB9KTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBvblJlbW92ZUltYWdlID0gdXNlQ2FsbGJhY2soKGluZGV4KSA9PiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IFJFTU9WRV9JTUFHRSxcbiAgICAgICAgICAgIGRhdGE6IGluZGV4LFxuICAgICAgICB9KTtcbiAgICB9KTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIOqyjOyLnOq4gC/snbTrr7jsp4Ag65Ox66Gd67KE7Yq8IO2BtOumrVxuICAgIGNvbnN0IG9uU3VibWl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBcbiAgICAgICAgaW1hZ2VQYXRocy5mb3JFYWNoKChwKSA9PiB7IGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2UnLCBwKTsgfSk7XG4gICAgICAgIFxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2NvbnRlbnQnLCB0ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogQUREX1BPU1RfUkVRVUVTVCwgZGF0YTogZm9ybURhdGEgfSk7XG4gICAgfSwgW3RleHQsIGltYWdlUGF0aHNdKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxGb3JtXG4gICAgICAgICAgICBzdHlsZT17eyBtYXJnaW46ICcxMHB4IDAgMjAgcHgnIH19XG4gICAgICAgICAgICBlbmNUeXBlPVwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiXG4gICAgICAgICAgICBvbkZpbmlzaD17b25TdWJtaXR9Plxuey8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSDqsozsi5zquIAg7J6R7ISx7LC9ICovfVxuICAgICAgICAgICAgPElucHV0LlRleHRBcmVhXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RleHR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlVGV4dH1cbiAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezE0MH1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuyWtOuWpCDsi6DquLDtlZwg7J287J20IOyeiOyXiOuCmOyalD9cIiAvPlxuey8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSDsnbTrr7jsp4Agb3Ig6rKM7Iuc6riAIOuTseuhnSDrsoTtirwgKi99XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMjAgfX0+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgbmFtZT1cImltYWdlXCIgbXVsdGlwbGUgaGlkZGVuIHJlZj17aW1hZ2VJbnB1dH0gb25DaGFuZ2U9e29uQ2hhbmdlSW1hZ2VzIC8qIOydtOuvuOyngCDshKDtg53tm4Qg7ZmV7J247J2EIOuIhOultOuptCDsi6TtlonrkKggKi99IC8+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrSW1hZ2VVcGxvYWR9PuydtOuvuOyngCDsl4XroZzrk5w8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgZmxvYXQ6ICdyaWdodCcgfX1cbiAgICAgICAgICAgICAgICAgICAgaHRtbFR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgICAg7Ke57Ke5XG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7aW1hZ2VQYXRocy5tYXAoKHYsIGkpID0+ICggLy8g7J2066+47KeAIOyXheuhnOuTnCDrr7jrpqzrs7TquLAg67aA67aEXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXt2fSBzdHlsZT17eyBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtgaHR0cDovL2xvY2FsaG9zdDozMDY1LyR7dn1gfSBzdHlsZT17eyB3aWR0aDogJzIwMHB4JyB9fSBhbHQ9e3Z9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17b25SZW1vdmVJbWFnZShpKX0+7KCc6rGwPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvRm9ybT5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUG9zdEZvcm07Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/PostForm.js\n");

/***/ })

})