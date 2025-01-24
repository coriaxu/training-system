"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/style-to-object";
exports.ids = ["vendor-chunks/style-to-object"];
exports.modules = {

/***/ "(ssr)/./node_modules/style-to-object/cjs/index.js":
/*!***************************************************!*\
  !*** ./node_modules/style-to-object/cjs/index.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = this && this.__importDefault || function(mod) {\n    return mod && mod.__esModule ? mod : {\n        \"default\": mod\n    };\n};\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nexports[\"default\"] = StyleToObject;\nvar inline_style_parser_1 = __importDefault(__webpack_require__(/*! inline-style-parser */ \"(ssr)/./node_modules/inline-style-parser/index.js\"));\n/**\n * Parses inline style to object.\n *\n * @param style - Inline style.\n * @param iterator - Iterator.\n * @returns - Style object or null.\n *\n * @example Parsing inline style to object:\n *\n * ```js\n * import parse from 'style-to-object';\n * parse('line-height: 42;'); // { 'line-height': '42' }\n * ```\n */ function StyleToObject(style, iterator) {\n    var styleObject = null;\n    if (!style || typeof style !== \"string\") {\n        return styleObject;\n    }\n    var declarations = (0, inline_style_parser_1.default)(style);\n    var hasIterator = typeof iterator === \"function\";\n    declarations.forEach(function(declaration) {\n        if (declaration.type !== \"declaration\") {\n            return;\n        }\n        var property = declaration.property, value = declaration.value;\n        if (hasIterator) {\n            iterator(property, value, declaration);\n        } else if (value) {\n            styleObject = styleObject || {};\n            styleObject[property] = value;\n        }\n    });\n    return styleObject;\n} //# sourceMappingURL=index.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3R5bGUtdG8tb2JqZWN0L2Nqcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLElBQUlBLGtCQUFrQixJQUFLLElBQUksSUFBSSxDQUFDQSxlQUFlLElBQUssU0FBVUMsR0FBRztJQUNqRSxPQUFPLE9BQVFBLElBQUlDLFVBQVUsR0FBSUQsTUFBTTtRQUFFLFdBQVdBO0lBQUk7QUFDNUQ7QUFDQUUsOENBQTZDO0lBQUVHLE9BQU87QUFBSyxDQUFDLEVBQUM7QUFDN0RELGtCQUFlLEdBQUdHO0FBQ2xCLElBQUlDLHdCQUF3QlQsZ0JBQWdCVSxtQkFBT0EsQ0FBQyw4RUFBcUI7QUFDekU7Ozs7Ozs7Ozs7Ozs7Q0FhQyxHQUNELFNBQVNGLGNBQWNHLEtBQUssRUFBRUMsUUFBUTtJQUNsQyxJQUFJQyxjQUFjO0lBQ2xCLElBQUksQ0FBQ0YsU0FBUyxPQUFPQSxVQUFVLFVBQVU7UUFDckMsT0FBT0U7SUFDWDtJQUNBLElBQUlDLGVBQWUsQ0FBQyxHQUFHTCxzQkFBc0JGLE9BQU8sRUFBRUk7SUFDdEQsSUFBSUksY0FBYyxPQUFPSCxhQUFhO0lBQ3RDRSxhQUFhRSxPQUFPLENBQUMsU0FBVUMsV0FBVztRQUN0QyxJQUFJQSxZQUFZQyxJQUFJLEtBQUssZUFBZTtZQUNwQztRQUNKO1FBQ0EsSUFBSUMsV0FBV0YsWUFBWUUsUUFBUSxFQUFFYixRQUFRVyxZQUFZWCxLQUFLO1FBQzlELElBQUlTLGFBQWE7WUFDYkgsU0FBU08sVUFBVWIsT0FBT1c7UUFDOUIsT0FDSyxJQUFJWCxPQUFPO1lBQ1pPLGNBQWNBLGVBQWUsQ0FBQztZQUM5QkEsV0FBVyxDQUFDTSxTQUFTLEdBQUdiO1FBQzVCO0lBQ0o7SUFDQSxPQUFPTztBQUNYLEVBQ0EsaUNBQWlDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJhaW5pbmctbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvc3R5bGUtdG8tb2JqZWN0L2Nqcy9pbmRleC5qcz83NWZhIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gU3R5bGVUb09iamVjdDtcbnZhciBpbmxpbmVfc3R5bGVfcGFyc2VyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImlubGluZS1zdHlsZS1wYXJzZXJcIikpO1xuLyoqXG4gKiBQYXJzZXMgaW5saW5lIHN0eWxlIHRvIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gc3R5bGUgLSBJbmxpbmUgc3R5bGUuXG4gKiBAcGFyYW0gaXRlcmF0b3IgLSBJdGVyYXRvci5cbiAqIEByZXR1cm5zIC0gU3R5bGUgb2JqZWN0IG9yIG51bGwuXG4gKlxuICogQGV4YW1wbGUgUGFyc2luZyBpbmxpbmUgc3R5bGUgdG8gb2JqZWN0OlxuICpcbiAqIGBgYGpzXG4gKiBpbXBvcnQgcGFyc2UgZnJvbSAnc3R5bGUtdG8tb2JqZWN0JztcbiAqIHBhcnNlKCdsaW5lLWhlaWdodDogNDI7Jyk7IC8vIHsgJ2xpbmUtaGVpZ2h0JzogJzQyJyB9XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gU3R5bGVUb09iamVjdChzdHlsZSwgaXRlcmF0b3IpIHtcbiAgICB2YXIgc3R5bGVPYmplY3QgPSBudWxsO1xuICAgIGlmICghc3R5bGUgfHwgdHlwZW9mIHN0eWxlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gc3R5bGVPYmplY3Q7XG4gICAgfVxuICAgIHZhciBkZWNsYXJhdGlvbnMgPSAoMCwgaW5saW5lX3N0eWxlX3BhcnNlcl8xLmRlZmF1bHQpKHN0eWxlKTtcbiAgICB2YXIgaGFzSXRlcmF0b3IgPSB0eXBlb2YgaXRlcmF0b3IgPT09ICdmdW5jdGlvbic7XG4gICAgZGVjbGFyYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGRlY2xhcmF0aW9uKSB7XG4gICAgICAgIGlmIChkZWNsYXJhdGlvbi50eXBlICE9PSAnZGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb3BlcnR5ID0gZGVjbGFyYXRpb24ucHJvcGVydHksIHZhbHVlID0gZGVjbGFyYXRpb24udmFsdWU7XG4gICAgICAgIGlmIChoYXNJdGVyYXRvcikge1xuICAgICAgICAgICAgaXRlcmF0b3IocHJvcGVydHksIHZhbHVlLCBkZWNsYXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0eWxlT2JqZWN0ID0gc3R5bGVPYmplY3QgfHwge307XG4gICAgICAgICAgICBzdHlsZU9iamVjdFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdHlsZU9iamVjdDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJuYW1lcyI6WyJfX2ltcG9ydERlZmF1bHQiLCJtb2QiLCJfX2VzTW9kdWxlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0IiwiU3R5bGVUb09iamVjdCIsImlubGluZV9zdHlsZV9wYXJzZXJfMSIsInJlcXVpcmUiLCJzdHlsZSIsIml0ZXJhdG9yIiwic3R5bGVPYmplY3QiLCJkZWNsYXJhdGlvbnMiLCJoYXNJdGVyYXRvciIsImZvckVhY2giLCJkZWNsYXJhdGlvbiIsInR5cGUiLCJwcm9wZXJ0eSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/style-to-object/cjs/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/style-to-object/esm/index.mjs":
/*!****************************************************!*\
  !*** ./node_modules/style-to-object/esm/index.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _cjs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cjs/index.js */ \"(ssr)/./node_modules/style-to-object/cjs/index.js\");\n\n// ensure compatibility with rollup umd build\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_cjs_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] || _cjs_index_js__WEBPACK_IMPORTED_MODULE_0__);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3R5bGUtdG8tb2JqZWN0L2VzbS9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBNEM7QUFFNUMsNkNBQTZDO0FBQzdDLGlFQUFlQSxxREFBcUIsSUFBSUEsMENBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cmFpbmluZy1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9zdHlsZS10by1vYmplY3QvZXNtL2luZGV4Lm1qcz9jZWMwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZVRvT2JqZWN0IGZyb20gJy4uL2Nqcy9pbmRleC5qcyc7XG5cbi8vIGVuc3VyZSBjb21wYXRpYmlsaXR5IHdpdGggcm9sbHVwIHVtZCBidWlsZFxuZXhwb3J0IGRlZmF1bHQgU3R5bGVUb09iamVjdC5kZWZhdWx0IHx8IFN0eWxlVG9PYmplY3Q7XG4iXSwibmFtZXMiOlsiU3R5bGVUb09iamVjdCIsImRlZmF1bHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/style-to-object/esm/index.mjs\n");

/***/ })

};
;