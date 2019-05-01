const { register, scaffold } = require('./index')

const qlString = `
  define Karadi {
    name: String
    school {
      district: String
    }
  }
  define Alcohol {
    color: String
  }
  `

register(qlString)



console.log(scaffold('Karadi'));