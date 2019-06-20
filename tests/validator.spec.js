const {isValidQl} = require('../src/validator')

describe('Validator Tests', () => {
  it('should contain a function isValidQl', () => {
    expect(typeof isValidQl).toBe('function')
  })

  it('should handle null/undefined cases', () => {
    expect(isValidQl()).toBeFalsy()
    expect(isValidQl(null)).toBeFalsy()
    expect(isValidQl(undefined)).toBeFalsy()
  })
})
