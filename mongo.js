const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb://hurre:${password}@cluster0-shard-00-00.painn.mongodb.net:27017,cluster0-shard-00-01.painn.mongodb.net:27017,cluster0-shard-00-02.painn.mongodb.net:27017/personsDB?ssl=true&replicaSet=atlas-7g7luv-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {type: String, minlength: 8},
  number: String
})
const Person = mongoose.model('person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})
if (process.argv.length === 3) {
  Person.find({})
  .then(result => {
    console.log('phonebook: ')
    result.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  person.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}
