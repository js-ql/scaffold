# ScaffoldQL

ScaffoldQL is a JavaScript library that is used to generate objects using scaffolds.

Inspired by GraphQL


## Installation:

```
npm install --save scaffoldql
```

## Usage:

```javascript
const {Scaffold} = require('scaffoldql');

Scaffold(
`
{
  parent{
    child{
      grandchild
    }
    anotherChild
  }
  anotherParent
}
`
).then(obj => console.log(obj));

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