const { getDefaultValue } = require('../src/typer')
const { STRING, ARRAY, OBJECT } = require('../src/constants')


describe('tests for typer', () => {

  it('should throw an error for invalid keys', () => {
    const error = 'Invalid key type, key must be a non empty string'
    expect(() => getDefaultValue('')).toThrow(new Error(error))
    expect(() => getDefaultValue({})).toThrow(new Error(error))
    expect(() => getDefaultValue([])).toThrow(new Error(error))
    expect(() => getDefaultValue(4)).toThrow(new Error(error))
    expect(() => getDefaultValue(Object)).toThrow(new Error(error))
    expect(() => getDefaultValue([Symbol])).toThrow(new Error(error))
  })

  it('should return null if no type is specified', () => {
    expect(getDefaultValue('name')).toEqual(['name', null])
    expect(getDefaultValue('age')).toEqual(['age', null])
  })

  it('should return a value for Object, String and Array', () => {
    expect(getDefaultValue(`name:${STRING}`)).toEqual(['name',''])
    expect(getDefaultValue(`friends:${ARRAY}`)).toEqual(['friends',[]])
    expect(getDefaultValue(`parent:${OBJECT}`)).toEqual(['parent',{}])
  })

  it('should return null for other types', () => {
    expect(getDefaultValue(`age:Number`)).toEqual(['age',null])
    expect(getDefaultValue(`isAlive:Boolean`)).toEqual(['isAlive',null])
  })
})