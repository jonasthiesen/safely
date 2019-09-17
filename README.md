# What's this package trying to solve?
## Dirty data...
One of the primary motivations for this package is when you have a large amount of, potentially dirty, data. Imagine you want to lower case a lot of data, but, since it might be dirty, you cannot simply write: `x.toLowerCase()` because you have no idea if `x` is `null`, `5`, or something completely different – remember, you are working with potentially dirty data. You could check for `undefined`, `null`, etc., but that will quickly get ugly to look at. You could also wrap it in a `try/catch`, but that will also quickly become cluncky to write. The solution? How about wrapping the potentially dangerous operation in `safely` and let that take care of all the nasty stuff?

# Install
With your package manager of choice:

**Yarn**
```
yarn add @lugn/safely
```

**NPM**
```
npm i @lugn/safely
```

# How to use
You supply a function you want to make safe to `safely`. This prevents your function from throwing an error

## Example
```js
const dangerousLowerCase = str => str.toLowerCase()
const safeLowerCase = safely(dangerousLowerCase)

dangerousLowerCase('HELLO WORLD') // hello world
safeLowerCase('HELLO WORLD')      // hello world

dangerousLowerCase(5)             // TypeError
safeLowerCase(5)                  // null

dangerousLowerCase(null)          // TypeError
safeLowerCase(null)               // null
```

You can also provide an optional second argument to `safely`. This will be supplied with the error that was thrown when calling the function. This will allow you to change the value that is returned to something else instead of `null`. You can also use it to log the error.

## Example
```js
const dangerousLowerCase = str => str.toLowerCase()
const safeLowerCase = safely(dangerousLowerCase, () => 'n/a')

// Very primitive logger...
const logger = error => console.log(error)
const safeLowerCaseLogger = safely(dangerousLowerCase, error => logger(error))

safeLowerCase(null)       // n/a
safeLowerCaseLogger(null) // undefined (logs the error)
```

When doing some error handling, it might be relevant to know what the value was. This could be useful for logging, but maybe you want it to be handled a specific way depending on the value.

## Example
```js
const handleError = (error, value) => {
  if (value === '-') {
    return 0
  }
  
  console.log(`Error caused by: ${value}`, error)
}

const processResponse = item => Number(item)
const safeProcessResponse = safely(processResponse, (error, ([value])) => handleError(error, value))
```