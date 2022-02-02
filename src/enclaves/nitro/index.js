/**
 * @file AWS Nitro Enclaves
 * @copyright Multifactor 2021 All Rights Reserved
 *
 * @description
 * Cryptographic operations for AWS Nitro Enclaves
 *
 * @author Vivek Nair (https://nair.me) <vivek@nair.me>
 */
const cbor = require('cbor')
const cose = require('cose-js')
const crypto = require('crypto')
const caroot = require('./caroot')

/**
 * The result of calling a verifyAttestation function.
 * @typedef {Object} AttestationResult
 * @property {boolean} valid - Indicates whether the attestation document is valid.
 * @property {string} [reason] - If the attestation document is not valid, describes why validation failed.
 * @property {Object} [attr] - If the attestation document is valid, contains the attestation document attributes.
 */

/**
 * Verify a AWS Nitro attestation document. Validates the attestation document signature and certificate.
 * NOTE: You still need to verify the PCRs yourself to check if the request is generated by the desired enclave image.
 *
 * @example
 * const trust = require('trust-center');
 * await trust.enclaves.nitro.verify(validDocument); // -> {valid: true, attr: {...}}
 * await trust.enclaves.nitro.verify(invalidDocument); // -> {valid: false, reason: '...'}
 *
 * @param {Buffer} document - AWS Nitro attestation document as a Buffer
 * @returns {AttestationResult} The validation result and attestation document attributes or rejection reason
 * @author Vivek Nair (https://nair.me) <vivek@nair.me>
 * @since 0.1.7
 * @async
 * @memberOf nitro
 */
async function verifyAttestation (document) {
  // Parse attestation document
  const COSESign1 = cbor.decodeAllSync(document)[0]
  const AttestationDocument = cbor.decodeAllSync(COSESign1[2])[0]
  AttestationDocument.certificate = new crypto.X509Certificate(AttestationDocument.certificate)
  const key = AttestationDocument.certificate.publicKey.export({ format: 'jwk', type: 'spki' })

  // Validate attestation document signature
  try {
    const verifier = {
      key: {
        x: Buffer.from(key.x, 'base64'),
        y: Buffer.from(key.y, 'base64')
      }
    }
    await cose.sign.verify(document, verifier, { defaultType: cose.sign.Sign1Tag })
  } catch (error) {
    console.log(error)
    return { valid: false, reason: 'Failed to verify attestation document signature' }
  }

  // Validate signing certificate
  AttestationDocument.cabundle = AttestationDocument.cabundle.map(certificate => new crypto.X509Certificate(certificate))
  AttestationDocument.caroot = new crypto.X509Certificate(caroot)
  if (AttestationDocument.caroot.fingerprint256 !== '64:1A:03:21:A3:E2:44:EF:E4:56:46:31:95:D6:06:31:7E:D7:CD:CC:3C:17:56:E0:98:93:F3:C6:8F:79:BB:5B') return { valid: false, reason: 'Failed to verify root certificate' }
  if (!AttestationDocument.certificate.verify(AttestationDocument.cabundle[AttestationDocument.cabundle.length - 1].publicKey)) return { valid: false, reason: 'Failed to verify attestation document signing certificate' }
  for (let i = AttestationDocument.cabundle.length - 1; i > 0; i--) {
    if (!AttestationDocument.cabundle[i].verify(AttestationDocument.cabundle[i - 1].publicKey)) return { valid: false, reason: 'Failed to verify attestation document certificate chain' }
  }
  if (!AttestationDocument.cabundle[0].verify(AttestationDocument.caroot.publicKey)) return { valid: false, reason: 'Failed to verify attestation document certificate chain' }

  // Return Results
  AttestationDocument.pcrs.forEach((value, key) => {
    AttestationDocument['pcr' + key] = value.toString('hex')
  })
  delete AttestationDocument.pcrs
  return { valid: true, attr: AttestationDocument }
}
module.exports.verifyAttestation = verifyAttestation
