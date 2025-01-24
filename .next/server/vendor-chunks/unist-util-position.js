"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/unist-util-position";
exports.ids = ["vendor-chunks/unist-util-position"];
exports.modules = {

/***/ "(ssr)/./node_modules/unist-util-position/lib/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/unist-util-position/lib/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   pointEnd: () => (/* binding */ pointEnd),\n/* harmony export */   pointStart: () => (/* binding */ pointStart),\n/* harmony export */   position: () => (/* binding */ position)\n/* harmony export */ });\n/**\n * @typedef {import('unist').Node} Node\n * @typedef {import('unist').Point} Point\n * @typedef {import('unist').Position} Position\n */ /**\n * @typedef NodeLike\n * @property {string} type\n * @property {PositionLike | null | undefined} [position]\n *\n * @typedef PositionLike\n * @property {PointLike | null | undefined} [start]\n * @property {PointLike | null | undefined} [end]\n *\n * @typedef PointLike\n * @property {number | null | undefined} [line]\n * @property {number | null | undefined} [column]\n * @property {number | null | undefined} [offset]\n */ /**\n * Get the ending point of `node`.\n *\n * @param node\n *   Node.\n * @returns\n *   Point.\n */ const pointEnd = point(\"end\");\n/**\n * Get the starting point of `node`.\n *\n * @param node\n *   Node.\n * @returns\n *   Point.\n */ const pointStart = point(\"start\");\n/**\n * Get the positional info of `node`.\n *\n * @param {'end' | 'start'} type\n *   Side.\n * @returns\n *   Getter.\n */ function point(type) {\n    return point;\n    /**\n   * Get the point info of `node` at a bound side.\n   *\n   * @param {Node | NodeLike | null | undefined} [node]\n   * @returns {Point | undefined}\n   */ function point(node) {\n        const point = node && node.position && node.position[type] || {};\n        if (typeof point.line === \"number\" && point.line > 0 && typeof point.column === \"number\" && point.column > 0) {\n            return {\n                line: point.line,\n                column: point.column,\n                offset: typeof point.offset === \"number\" && point.offset > -1 ? point.offset : undefined\n            };\n        }\n    }\n}\n/**\n * Get the positional info of `node`.\n *\n * @param {Node | NodeLike | null | undefined} [node]\n *   Node.\n * @returns {Position | undefined}\n *   Position.\n */ function position(node) {\n    const start = pointStart(node);\n    const end = pointEnd(node);\n    if (start && end) {\n        return {\n            start,\n            end\n        };\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdW5pc3QtdXRpbC1wb3NpdGlvbi9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Q0FJQyxHQUVEOzs7Ozs7Ozs7Ozs7O0NBYUMsR0FFRDs7Ozs7OztDQU9DLEdBQ00sTUFBTUEsV0FBV0MsTUFBTSxPQUFNO0FBRXBDOzs7Ozs7O0NBT0MsR0FDTSxNQUFNQyxhQUFhRCxNQUFNLFNBQVE7QUFFeEM7Ozs7Ozs7Q0FPQyxHQUNELFNBQVNBLE1BQU1FLElBQUk7SUFDakIsT0FBT0Y7SUFFUDs7Ozs7R0FLQyxHQUNELFNBQVNBLE1BQU1HLElBQUk7UUFDakIsTUFBTUgsUUFBUSxRQUFTRyxLQUFLQyxRQUFRLElBQUlELEtBQUtDLFFBQVEsQ0FBQ0YsS0FBSyxJQUFLLENBQUM7UUFFakUsSUFDRSxPQUFPRixNQUFNSyxJQUFJLEtBQUssWUFDdEJMLE1BQU1LLElBQUksR0FBRyxLQUNiLE9BQU9MLE1BQU1NLE1BQU0sS0FBSyxZQUN4Qk4sTUFBTU0sTUFBTSxHQUFHLEdBQ2Y7WUFDQSxPQUFPO2dCQUNMRCxNQUFNTCxNQUFNSyxJQUFJO2dCQUNoQkMsUUFBUU4sTUFBTU0sTUFBTTtnQkFDcEJDLFFBQ0UsT0FBT1AsTUFBTU8sTUFBTSxLQUFLLFlBQVlQLE1BQU1PLE1BQU0sR0FBRyxDQUFDLElBQ2hEUCxNQUFNTyxNQUFNLEdBQ1pDO1lBQ1I7UUFDRjtJQUNGO0FBQ0Y7QUFFQTs7Ozs7OztDQU9DLEdBQ00sU0FBU0osU0FBU0QsSUFBSTtJQUMzQixNQUFNTSxRQUFRUixXQUFXRTtJQUN6QixNQUFNTyxNQUFNWCxTQUFTSTtJQUVyQixJQUFJTSxTQUFTQyxLQUFLO1FBQ2hCLE9BQU87WUFBQ0Q7WUFBT0M7UUFBRztJQUNwQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJhaW5pbmctbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdW5pc3QtdXRpbC1wb3NpdGlvbi9saWIvaW5kZXguanM/YmE1YSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ3VuaXN0JykuTm9kZX0gTm9kZVxuICogQHR5cGVkZWYge2ltcG9ydCgndW5pc3QnKS5Qb2ludH0gUG9pbnRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ3VuaXN0JykuUG9zaXRpb259IFBvc2l0aW9uXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiBOb2RlTGlrZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHR5cGVcbiAqIEBwcm9wZXJ0eSB7UG9zaXRpb25MaWtlIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3Bvc2l0aW9uXVxuICpcbiAqIEB0eXBlZGVmIFBvc2l0aW9uTGlrZVxuICogQHByb3BlcnR5IHtQb2ludExpa2UgfCBudWxsIHwgdW5kZWZpbmVkfSBbc3RhcnRdXG4gKiBAcHJvcGVydHkge1BvaW50TGlrZSB8IG51bGwgfCB1bmRlZmluZWR9IFtlbmRdXG4gKlxuICogQHR5cGVkZWYgUG9pbnRMaWtlXG4gKiBAcHJvcGVydHkge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9IFtsaW5lXVxuICogQHByb3BlcnR5IHtudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkfSBbY29sdW1uXVxuICogQHByb3BlcnR5IHtudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkfSBbb2Zmc2V0XVxuICovXG5cbi8qKlxuICogR2V0IHRoZSBlbmRpbmcgcG9pbnQgb2YgYG5vZGVgLlxuICpcbiAqIEBwYXJhbSBub2RlXG4gKiAgIE5vZGUuXG4gKiBAcmV0dXJuc1xuICogICBQb2ludC5cbiAqL1xuZXhwb3J0IGNvbnN0IHBvaW50RW5kID0gcG9pbnQoJ2VuZCcpXG5cbi8qKlxuICogR2V0IHRoZSBzdGFydGluZyBwb2ludCBvZiBgbm9kZWAuXG4gKlxuICogQHBhcmFtIG5vZGVcbiAqICAgTm9kZS5cbiAqIEByZXR1cm5zXG4gKiAgIFBvaW50LlxuICovXG5leHBvcnQgY29uc3QgcG9pbnRTdGFydCA9IHBvaW50KCdzdGFydCcpXG5cbi8qKlxuICogR2V0IHRoZSBwb3NpdGlvbmFsIGluZm8gb2YgYG5vZGVgLlxuICpcbiAqIEBwYXJhbSB7J2VuZCcgfCAnc3RhcnQnfSB0eXBlXG4gKiAgIFNpZGUuXG4gKiBAcmV0dXJuc1xuICogICBHZXR0ZXIuXG4gKi9cbmZ1bmN0aW9uIHBvaW50KHR5cGUpIHtcbiAgcmV0dXJuIHBvaW50XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcG9pbnQgaW5mbyBvZiBgbm9kZWAgYXQgYSBib3VuZCBzaWRlLlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGUgfCBOb2RlTGlrZSB8IG51bGwgfCB1bmRlZmluZWR9IFtub2RlXVxuICAgKiBAcmV0dXJucyB7UG9pbnQgfCB1bmRlZmluZWR9XG4gICAqL1xuICBmdW5jdGlvbiBwb2ludChub2RlKSB7XG4gICAgY29uc3QgcG9pbnQgPSAobm9kZSAmJiBub2RlLnBvc2l0aW9uICYmIG5vZGUucG9zaXRpb25bdHlwZV0pIHx8IHt9XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgcG9pbnQubGluZSA9PT0gJ251bWJlcicgJiZcbiAgICAgIHBvaW50LmxpbmUgPiAwICYmXG4gICAgICB0eXBlb2YgcG9pbnQuY29sdW1uID09PSAnbnVtYmVyJyAmJlxuICAgICAgcG9pbnQuY29sdW1uID4gMFxuICAgICkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGluZTogcG9pbnQubGluZSxcbiAgICAgICAgY29sdW1uOiBwb2ludC5jb2x1bW4sXG4gICAgICAgIG9mZnNldDpcbiAgICAgICAgICB0eXBlb2YgcG9pbnQub2Zmc2V0ID09PSAnbnVtYmVyJyAmJiBwb2ludC5vZmZzZXQgPiAtMVxuICAgICAgICAgICAgPyBwb2ludC5vZmZzZXRcbiAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2V0IHRoZSBwb3NpdGlvbmFsIGluZm8gb2YgYG5vZGVgLlxuICpcbiAqIEBwYXJhbSB7Tm9kZSB8IE5vZGVMaWtlIHwgbnVsbCB8IHVuZGVmaW5lZH0gW25vZGVdXG4gKiAgIE5vZGUuXG4gKiBAcmV0dXJucyB7UG9zaXRpb24gfCB1bmRlZmluZWR9XG4gKiAgIFBvc2l0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb24obm9kZSkge1xuICBjb25zdCBzdGFydCA9IHBvaW50U3RhcnQobm9kZSlcbiAgY29uc3QgZW5kID0gcG9pbnRFbmQobm9kZSlcblxuICBpZiAoc3RhcnQgJiYgZW5kKSB7XG4gICAgcmV0dXJuIHtzdGFydCwgZW5kfVxuICB9XG59XG4iXSwibmFtZXMiOlsicG9pbnRFbmQiLCJwb2ludCIsInBvaW50U3RhcnQiLCJ0eXBlIiwibm9kZSIsInBvc2l0aW9uIiwibGluZSIsImNvbHVtbiIsIm9mZnNldCIsInVuZGVmaW5lZCIsInN0YXJ0IiwiZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/unist-util-position/lib/index.js\n");

/***/ })

};
;