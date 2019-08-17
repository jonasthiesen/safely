import { safely } from '../safely'

describe('safely', () => {
  const lowerCase = str => str.toLowerCase()
  const safeLowerCase = safely(lowerCase)

  it('can perform the action as intented', () => {
    const str = 'ThisShouldBeLowerCASE!'

    expect(safeLowerCase(str)).toEqual(str.toLowerCase())
  })

  it('the safe function can take multiple arguments', () => {
    const safeAddFunction = safely((a, b) => a + b)

    expect(safeAddFunction(5, 5)).toEqual(10)
  })

  it('will not fail because the action throws an exception', () => {
    const num = 5

    // Verify that the original version throws
    expect(() => lowerCase(num)).toThrow()

    // And the safe version doesn't
    expect(safeLowerCase(num)).toBeNull()
  })
})
