"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-extension-gfm-tagfilter";
exports.ids = ["vendor-chunks/micromark-extension-gfm-tagfilter"];
exports.modules = {

/***/ "(ssr)/./node_modules/micromark-extension-gfm-tagfilter/lib/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/micromark-extension-gfm-tagfilter/lib/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gfmTagfilterHtml: () => (/* binding */ gfmTagfilterHtml)\n/* harmony export */ });\n/**\n * @typedef {import('micromark-util-types').CompileContext} CompileContext\n * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension\n * @typedef {import('micromark-util-types').Token} Token\n */ // An opening or closing tag start, followed by a case-insensitive specific tag name,\n// followed by HTML whitespace, a greater than, or a slash.\nconst reFlow = /<(\\/?)(iframe|noembed|noframes|plaintext|script|style|title|textarea|xmp)(?=[\\t\\n\\f\\r />])/gi;\n// As HTML (text) parses tags separately (and very strictly), we don’t need to be\n// global.\nconst reText = new RegExp(\"^\" + reFlow.source, \"i\");\n/**\n * Create an HTML extension for `micromark` to support GitHubs weird and\n * useless tagfilter when serializing to HTML.\n *\n * @returns {HtmlExtension}\n *   Extension for `micromark` that can be passed in `htmlExtensions` to support\n *   GitHubs weird and useless tagfilter when serializing to HTML.\n */ function gfmTagfilterHtml() {\n    return {\n        exit: {\n            htmlFlowData (token) {\n                exitHtmlData.call(this, token, reFlow);\n            },\n            htmlTextData (token) {\n                exitHtmlData.call(this, token, reText);\n            }\n        }\n    };\n}\n/**\n * @this {CompileContext}\n * @param {Token} token\n * @param {RegExp} filter\n * @returns {undefined}\n */ function exitHtmlData(token, filter) {\n    let value = this.sliceSerialize(token);\n    if (this.options.allowDangerousHtml) {\n        value = value.replace(filter, \"&lt;$1$2\");\n    }\n    this.raw(this.encode(value));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLWV4dGVuc2lvbi1nZm0tdGFnZmlsdGVyL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Q0FJQyxHQUVELHFGQUFxRjtBQUNyRiwyREFBMkQ7QUFDM0QsTUFBTUEsU0FDSjtBQUVGLGlGQUFpRjtBQUNqRixVQUFVO0FBQ1YsTUFBTUMsU0FBUyxJQUFJQyxPQUFPLE1BQU1GLE9BQU9HLE1BQU0sRUFBRTtBQUUvQzs7Ozs7OztDQU9DLEdBQ00sU0FBU0M7SUFDZCxPQUFPO1FBQ0xDLE1BQU07WUFDSkMsY0FBYUMsS0FBSztnQkFDaEJDLGFBQWFDLElBQUksQ0FBQyxJQUFJLEVBQUVGLE9BQU9QO1lBQ2pDO1lBQ0FVLGNBQWFILEtBQUs7Z0JBQ2hCQyxhQUFhQyxJQUFJLENBQUMsSUFBSSxFQUFFRixPQUFPTjtZQUNqQztRQUNGO0lBQ0Y7QUFDRjtBQUVBOzs7OztDQUtDLEdBQ0QsU0FBU08sYUFBYUQsS0FBSyxFQUFFSSxNQUFNO0lBQ2pDLElBQUlDLFFBQVEsSUFBSSxDQUFDQyxjQUFjLENBQUNOO0lBRWhDLElBQUksSUFBSSxDQUFDTyxPQUFPLENBQUNDLGtCQUFrQixFQUFFO1FBQ25DSCxRQUFRQSxNQUFNSSxPQUFPLENBQUNMLFFBQVE7SUFDaEM7SUFFQSxJQUFJLENBQUNNLEdBQUcsQ0FBQyxJQUFJLENBQUNDLE1BQU0sQ0FBQ047QUFDdkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cmFpbmluZy1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9taWNyb21hcmstZXh0ZW5zaW9uLWdmbS10YWdmaWx0ZXIvbGliL2luZGV4LmpzP2E0NDUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtaWNyb21hcmstdXRpbC10eXBlcycpLkNvbXBpbGVDb250ZXh0fSBDb21waWxlQ29udGV4dFxuICogQHR5cGVkZWYge2ltcG9ydCgnbWljcm9tYXJrLXV0aWwtdHlwZXMnKS5IdG1sRXh0ZW5zaW9ufSBIdG1sRXh0ZW5zaW9uXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtaWNyb21hcmstdXRpbC10eXBlcycpLlRva2VufSBUb2tlblxuICovXG5cbi8vIEFuIG9wZW5pbmcgb3IgY2xvc2luZyB0YWcgc3RhcnQsIGZvbGxvd2VkIGJ5IGEgY2FzZS1pbnNlbnNpdGl2ZSBzcGVjaWZpYyB0YWcgbmFtZSxcbi8vIGZvbGxvd2VkIGJ5IEhUTUwgd2hpdGVzcGFjZSwgYSBncmVhdGVyIHRoYW4sIG9yIGEgc2xhc2guXG5jb25zdCByZUZsb3cgPVxuICAvPChcXC8/KShpZnJhbWV8bm9lbWJlZHxub2ZyYW1lc3xwbGFpbnRleHR8c2NyaXB0fHN0eWxlfHRpdGxlfHRleHRhcmVhfHhtcCkoPz1bXFx0XFxuXFxmXFxyIC8+XSkvZ2lcblxuLy8gQXMgSFRNTCAodGV4dCkgcGFyc2VzIHRhZ3Mgc2VwYXJhdGVseSAoYW5kIHZlcnkgc3RyaWN0bHkpLCB3ZSBkb27igJl0IG5lZWQgdG8gYmVcbi8vIGdsb2JhbC5cbmNvbnN0IHJlVGV4dCA9IG5ldyBSZWdFeHAoJ14nICsgcmVGbG93LnNvdXJjZSwgJ2knKVxuXG4vKipcbiAqIENyZWF0ZSBhbiBIVE1MIGV4dGVuc2lvbiBmb3IgYG1pY3JvbWFya2AgdG8gc3VwcG9ydCBHaXRIdWJzIHdlaXJkIGFuZFxuICogdXNlbGVzcyB0YWdmaWx0ZXIgd2hlbiBzZXJpYWxpemluZyB0byBIVE1MLlxuICpcbiAqIEByZXR1cm5zIHtIdG1sRXh0ZW5zaW9ufVxuICogICBFeHRlbnNpb24gZm9yIGBtaWNyb21hcmtgIHRoYXQgY2FuIGJlIHBhc3NlZCBpbiBgaHRtbEV4dGVuc2lvbnNgIHRvIHN1cHBvcnRcbiAqICAgR2l0SHVicyB3ZWlyZCBhbmQgdXNlbGVzcyB0YWdmaWx0ZXIgd2hlbiBzZXJpYWxpemluZyB0byBIVE1MLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2ZtVGFnZmlsdGVySHRtbCgpIHtcbiAgcmV0dXJuIHtcbiAgICBleGl0OiB7XG4gICAgICBodG1sRmxvd0RhdGEodG9rZW4pIHtcbiAgICAgICAgZXhpdEh0bWxEYXRhLmNhbGwodGhpcywgdG9rZW4sIHJlRmxvdylcbiAgICAgIH0sXG4gICAgICBodG1sVGV4dERhdGEodG9rZW4pIHtcbiAgICAgICAgZXhpdEh0bWxEYXRhLmNhbGwodGhpcywgdG9rZW4sIHJlVGV4dClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAdGhpcyB7Q29tcGlsZUNvbnRleHR9XG4gKiBAcGFyYW0ge1Rva2VufSB0b2tlblxuICogQHBhcmFtIHtSZWdFeHB9IGZpbHRlclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuZnVuY3Rpb24gZXhpdEh0bWxEYXRhKHRva2VuLCBmaWx0ZXIpIHtcbiAgbGV0IHZhbHVlID0gdGhpcy5zbGljZVNlcmlhbGl6ZSh0b2tlbilcblxuICBpZiAodGhpcy5vcHRpb25zLmFsbG93RGFuZ2Vyb3VzSHRtbCkge1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShmaWx0ZXIsICcmbHQ7JDEkMicpXG4gIH1cblxuICB0aGlzLnJhdyh0aGlzLmVuY29kZSh2YWx1ZSkpXG59XG4iXSwibmFtZXMiOlsicmVGbG93IiwicmVUZXh0IiwiUmVnRXhwIiwic291cmNlIiwiZ2ZtVGFnZmlsdGVySHRtbCIsImV4aXQiLCJodG1sRmxvd0RhdGEiLCJ0b2tlbiIsImV4aXRIdG1sRGF0YSIsImNhbGwiLCJodG1sVGV4dERhdGEiLCJmaWx0ZXIiLCJ2YWx1ZSIsInNsaWNlU2VyaWFsaXplIiwib3B0aW9ucyIsImFsbG93RGFuZ2Vyb3VzSHRtbCIsInJlcGxhY2UiLCJyYXciLCJlbmNvZGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/micromark-extension-gfm-tagfilter/lib/index.js\n");

/***/ })

};
;