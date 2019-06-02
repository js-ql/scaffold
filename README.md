[![npm version](https://badge.fury.io/js/scaffoldql.svg)](https://badge.fury.io/js/scaffoldql)
# ScaffoldQL

ScaffoldQL is a JavaScript library that is used to generate objects using scaffolds.

Inspired by GraphQL


## Installation:

```
npm install --save scaffoldql
```

## Usage:

### Simple Usage:

```javascript
const { init } = require('scaffoldql')

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
const { init } = require('scaffoldql')

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
const { init } = require('scaffoldql')

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
