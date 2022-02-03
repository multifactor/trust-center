[![trust-center](https://raw.githubusercontent.com/multifactor/trust-center/master/site/logo.png "trust-center")](https://trust.multifactor.com "trust-center")

Multifactor Trust Center

[![GitHub issues](https://img.shields.io/github/issues/multifactor/trust-center)](https://github.com/multifactor/trust-center/issues)
[![GitHub tag](https://img.shields.io/github/tag/multifactor/trust-center.svg)](https://github.com/multifactor/trust-center/tags)
[![GitHub release](https://img.shields.io/github/release/multifactor/trust-center.svg)](https://github.com/multifactor/trust-center/releases)
[![NPM release](https://img.shields.io/npm/v/trust-center.svg)](https://www.npmjs.com/package/trust-center)

[Site](https://trust.multifactor.com) |
[Docs](https://trust.multifactor.com/docs) |
[Contributing](https://github.com/multifactor/trust-center/blob/master/CONTRIBUTING.md) |
[Security](https://github.com/multifactor/trust-center/blob/master/SECURITY.md) |
[Multifactor](https://github.com/multifactor) |
[Author](https://github.com/VCNinc)

The Multifactor Trust Center provides tools for interacting with trusted computing devices such as Intel SGX and AWS Nitro enclaves. Validate attestation documents, verify cryptographic proofs, and encrypt secrets for use in enclaves using PGP, either manually via the online portal (trust.multifactor.com) or programmatically via the trust-center SDK. The trust center is entirely open source, requires no network connectivity, and is hosted on GitHub pages to ensure public auditability.

## Demo
Try using the link below to validate this [AWS Nitro attestation document](https://github.com/multifactor/trust-center/tree/main/test/examples) using the online portal, which will check that its signatures are valid and that the PCR0 value matches the value passed in the URL:

[https://trust.multifactor.com/?pcr0=1595770e76cea659a5650a88b965b053eb66a0ce5a60a460223d50ff1d16b394d2651b130a38af4ccd818ad8cf42c963#/nitro](https://trust.multifactor.com/?pcr0=1595770e76cea659a5650a88b965b053eb66a0ce5a60a460223d50ff1d16b394d2651b130a38af4ccd818ad8cf42c963#/nitro)

## Download
### GitHub
[Download Latest Release](https://github.com/multifactor/trust-center/releases)

## Installation
### In a browser:
Get the latest tag with SRI from [jsDelivr](https://www.jsdelivr.com/package/npm/trust-center) (recommended), or include the latest version automatically like so:

	<script src="https://cdn.jsdelivr.net/gh/multifactor/trust-center/index.min.js"></script>

### Using npm:
	npm install trust-center

### In Node.js:
	const trust-center = require('trust-center');

Note: The SDK uses crypto.X509Certificate for certificate validation and thus requires Node.js v15.6.0 or later.

## Usage
The following code snippet uses the trust-center SDK to verify an AWS Nitro attestation document and then encrypt a secret for use within the enclave.

```
// add required dependencies
const trust = require('trust-center')
const fs = require('fs')
const path = require('path')

// load attestation document in CBOR format
const attestationDocument = fs.readFileSync(path.join(__dirname, 'attestation.cbor'))
// parse and validate attestation document
const attestationResult = await trust.enclaves.nitro.verifyAttestation(attestationDocument)

// verify attestation document validity
if (!attestationResult.valid) throw new Error('Failed to validate enclave attestation: ' + attestationResult.reason)
// check that pcr0 matches desired enclave image file hash
if (attestationResult.attr.pcr0 !== '1595770e76cea659a5650a88b965b053eb66a0ce5a60a460223d50ff1d16b394d2651b130a38af4ccd818ad8cf42c963') throw new Error('Failed to validate enclave attestation')

// encrypt secret for enclave using PGP
const encrypted = await trust.secrets.encryptForEnclave(attestationResult, 'my secret')
console.log(encrypted) // -> '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
```
