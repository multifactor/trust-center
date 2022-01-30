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
