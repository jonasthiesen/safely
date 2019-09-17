/**
 * Perform the action safely.
 *
 * This is useful when you want to perform an action, but you don't
 * have control on what goes in: e.g. you could get `null` sometimes,
 * which would break deep trees or member functions.
 *
 * @param {callback} fn The action to perform safely.
 * @param {any} args The arguments to pass to the function (action).
 * @returns {any} The new data or `null`.
 */
export const safely = (fn, handleError = null) => (...args) => {
  let result = null

  try {
    result = fn(...args)
  } catch (error) {
    if (handleError !== null) {
      result = handleError(error, args)
    }
  }

  return result
}
