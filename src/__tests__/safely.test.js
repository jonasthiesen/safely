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

  it('takes an optional callback that gets called when the function throws', () => {
    const safeLowerCase = safely(lowerCase, () => '-')

    expect(safeLowerCase(5)).toEqual('-')
  })

  it('can log the error and continue', () => {
    const errorMessage = (() => {
      let msg = null
      try {
        lowerCase(5)
      } catch (error) {
        msg = error
      }
      return msg
    })()

    let loggerValue = null
    const logger = value => { loggerValue = value }

    const safeLowerCase = safely(lowerCase, logger)

    safeLowerCase(5)

    expect(loggerValue).toEqual(errorMessage)
  })
})
