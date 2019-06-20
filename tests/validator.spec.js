const { isValidQl } = require('../src/validator')

describe('basic tests for isValidQl function:', () => {
  it('should contain a function isValidQl', () => {
    expect(typeof isValidQl).toBe('function')
  })

  it('should handle null/undefined/empty string cases', () => {
    expect(isValidQl()).toBeFalsy()
    expect(isValidQl(null)).toBeFalsy()
    expect(isValidQl(undefined)).toBeFalsy()
    expect(isValidQl('')).toBeFalsy()
  })

  it('should only accept strings', () => {
    expect(isValidQl(5)).toBeFalsy()
    expect(isValidQl({})).toBeFalsy()
    expect(isValidQl([])).toBeFalsy()
    expect(isValidQl({ name: 'hello' })).toBeFalsy()
    expect(isValidQl([Symbol])).toBeFalsy()
    expect(isValidQl('{}')).toBeFalsy()
  })

  it('should make sure brackets are to be balanced', () => {
    expect(isValidQl('{name}')).toBeTruthy()
    expect(isValidQl('{{}{}')).toBeFalsy()
    expect(isValidQl('}{')).toBeFalsy()
    expect(isValidQl('{{}}}{')).toBeFalsy()
    expect(isValidQl(`
    {
      name {
        age
        }
      }
    }
    `)).toBeFalsy()
  })

  it('should not accept schemas without keys', () => {
    expect(isValidQl('{}{}')).toBeFalsy()
    expect(isValidQl('{name{}}')).toBeFalsy()
    expect(isValidQl('{{name}}')).toBeFalsy()

  })

  it('should accept multiline strings', () => {

    expect(isValidQl(`
    {
    }
    `)).toBeFalsy()
    expect(isValidQl(`
    {
      name
      age
    }
    `)).toBeTruthy()

    expect(isValidQl(`
    name
    `)).toBeFalsy()

    expect(isValidQl(`
    {
      name {
        age
      }
    }
    `)).toBeTruthy()

    expect(isValidQl(`
    {
      name {
        age {
        }
      }
    }
    `)).toBeFalsy()

    expect(isValidQl(`
    {
      name {
        age {
          type
        }
      }
    }
    `)).toBeTruthy()

  })
})
