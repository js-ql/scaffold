[![npm version](https://badge.fury.io/js/%40js-ql%2Fscaffold.svg)](https://badge.fury.io/js/%40js-ql%2Fscaffold)# Scaffold

Scaffold is a JavaScript library that is used to generate objects using templates inspired from GraphQL.


## Installation:

```
npm install --save @js-ql/scaffold
```

## Usage:

### Simple Usage:

```javascript
const { init } = require('@js-ql/scaffold')

const queryString = `
{
  parent {
    child {
      grandchild
    }
    anotherChild
  }
  anotherParent
}`

const store = init()

console.log(store.scaffold(queryString))

/*
{
  parent: {
    child: {
      grandchild: null
    },
    anotherChild: null
  },
  anotherParent: null
} 
 */



```

### With Types:
```javascript
const { init } = require('@js-ql/scaffold')

const queryString = `
{
  name: String
  friends: Array
  sex: String
}
`

const store = init()

console.log(store.scaffold(queryString))
/*
{
  name: '',
  friends: [],
  sex: ''
}
*/

```

### By Defining Schemas

```javascript
const { init } = require('@js-ql/scaffold')

const queryString = `
define Person {
  name: String
  friends: Array
  sex: String
}
`

const store = init()

store.registerSchema(queryString)

console.log(store.scaffoldSchema('Person'))

/*
{
  name: '',
  friends: [],
  sex: ''
}
*/


```
