/* eslint no-unused-expressions: "off" */
require('chai').should()
const trust = require('../../../src')
const fs = require('fs')
const path = require('path')
const { suite, test } = require('mocha')

suite('nitro', () => {
  suite('verifyAttestation', () => {
    test('invalid', async () => {
      const document = fs.readFileSync(path.join(__dirname, '../../examples/invalid.cbor'))
      const result = await trust.enclaves.nitro.verifyAttestation(document)

      result.valid.should.be.false
    })

    test('valid', async () => {
      const document = fs.readFileSync(path.join(__dirname, '../../examples/valid.cbor'))
      const result = await trust.enclaves.nitro.verifyAttestation(document)

      result.valid.should.be.true
      result.attr.pcr0.should.equal('1595770e76cea659a5650a88b965b053eb66a0ce5a60a460223d50ff1d16b394d2651b130a38af4ccd818ad8cf42c963')
      result.attr.pcr1.should.equal('5c01976a546ec6b740353189afd3bf5fe29df96328887111e7c802cf2ff5ad636deed2ab8254e7a51a45fca01d0ae062')
      result.attr.pcr2.should.equal('18b2e982ac79347027c940c62112a49f038dcda056f3ba9ef2e27f8d4d9a217ca325acbf3b4abdfa55e81ce99c04ba99')
      result.attr.user_data.toString().should.equal('hello, world!')
    })
  })

  test('full example', async () => {
    // add required dependencies
    // const trust = require('trust-center')
    // const fs = require('fs')
    // const path = require('path')

    // load attestation document in CBOR format
    const attestationDocument = fs.readFileSync(path.join(__dirname, '../../examples/valid.cbor'))
    // parse and validate attestation document
    const attestationResult = await trust.enclaves.nitro.verifyAttestation(attestationDocument)

    // verify attestation document validity
    if (!attestationResult.valid) throw new Error('Failed to validate enclave attestation: ' + attestationResult.reason)
    // check that pcr0 matches desired enclave image file hash
    if (attestationResult.attr.pcr0 !== '1595770e76cea659a5650a88b965b053eb66a0ce5a60a460223d50ff1d16b394d2651b130a38af4ccd818ad8cf42c963') throw new Error('Failed to validate enclave attestation')

    // encrypt secret for enclave using PGP
    const encrypted = await trust.secrets.encryptForEnclave(attestationResult, 'my secret')
    encrypted.should.be.a.string
    // console.log(encrypted) // -> '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
  })
})
