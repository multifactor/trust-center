/**
 * @file Cryptographic Secrets Management
 * @copyright Multifactor 2021 All Rights Reserved
 *
 * @description
 * Encrypt secrets for use in enclaves
 *
 * @author Vivek Nair (https://nair.me) <vivek@nair.me>
 */
const openpgp = require('openpgp')

/**
 * Encrypt secrets for use in secure enclaves using PGP.
 *
 * @example
 * const trust = require('trust-center');
 * const attestationResult = trust.enclaves.nitro.verify(attestationDocument); // -> {valid: true, attr: {...}}
 * trust.secrets.encryptForEnclave(attestationResult, secret); // -> '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
 *
 * @param {AttestationResult} attestation - The result of validating an attestation document (eg. using {@link nitro.verifyAttestation})
 * @param {string} secret - Plaintext message to encrypt for use in a secure enclave
 * @returns {string} ASCII-armored PGP-encrypted message
 * @author Vivek Nair (https://nair.me) <vivek@nair.me>
 * @since 0.2.0
 * @async
 * @memberOf secrets
 */
async function encryptForEnclave (attestation, secret) {
  if (attestation.valid !== true) throw new TypeError('Attestation result must be valid to produce encryption')
  try {
    const publicKey = await openpgp.readKey({ armoredKey: attestation.attr.public_key.toString() })
    return await openpgp.encrypt({
      message: await openpgp.createMessage({ text: secret }),
      encryptionKeys: publicKey
    })
  } catch (e) {
    throw new Error('Attestation document does not contain valid PGP key')
  }
}
module.exports.encryptForEnclave = encryptForEnclave
