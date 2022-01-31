/**
 * Cryptographic Secrets Management
 * @namespace secrets
 */
module.exports = {
  enclaves: {
    ...require('./enclaves')
  },
  secrets: {
    ...require('./secrets')
  }
}
