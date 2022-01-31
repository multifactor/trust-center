/* eslint no-unused-expressions: "off" */
require('chai').should()
const trust = require('../../src')
const fs = require('fs')
const path = require('path')
const openpgp = require('openpgp')
const { suite, test } = require('mocha')

suite('secrets', () => {
  test('encryptForEnclave', async () => {
    const document = fs.readFileSync(path.join(__dirname, '../enclaves/nitro/attestation.cbor'))
    const attestation = await trust.enclaves.nitro.verifyAttestation(document)
    const encrypted = await trust.secrets.encryptForEnclave(attestation, 'password')
    encrypted.should.be.a.string
    const message = await openpgp.readMessage({
      armoredMessage: encrypted
    })
  })
})
