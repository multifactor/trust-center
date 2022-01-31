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

The Multifactor Trust Center provides tools for interacting with trusted computing devices such as Intel SGX and AWS Nitro enclaves. Validate attestation documents, verify cryptographic proofs, and encrypt secrets using PGP for use in enclaves, either manually via the online portal (trust.multifactor.com) or programmatically via the trust-center SDK. The trust center is entirely open source, requires no network connectivity, and is hosted on GitHub pages to ensure public auditability.

Note: The SDK uses crypto.X509Certificate for certificate validation and thus requires Node.js v15.6.0 or later.

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

## Usage
### example-1
First code usage example...

```
// first code usage example...
```
