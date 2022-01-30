(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["trust-center"] = factory();
	else
		root["trust-center"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 138:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  ...__webpack_require__(933)
}


/***/ }),

/***/ 933:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Modules
 * @namespace modules
 */
module.exports = {
  ...__webpack_require__(226)
}


/***/ }),

/***/ 226:
/***/ ((module) => {

/**
 * @file Key Derivation Function (KDF)
 * @copyright Multifactor 2021 All Rights Reserved
 *
 * @description
 * Implements several key derivation functions (KDFs) that can underly the MFKDF
 *
 * @author Vivek Nair (https://nair.me) <vivek@nair.me>
 */

/**
   * Single-factor (traditional) key derivation function; produces a derived a key from a single input.
   *
   * @example
   * // derive 256b key using pbkdf2-sha256 with 100,000 rounds
   * ...
   *
   * @param {string} input - KDF input string
   * @param {string} salt - KDF salt string
   * @returns A derived key as a Buffer.
   * @author Vivek Nair (https://nair.me) <vivek@nair.me>
   * @since 0.0.1
   * @async
   * @memberOf modules
   */
async function module1 (input, salt) {
  console.log('module1')
}
module.exports.module1 = module1


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(138);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});