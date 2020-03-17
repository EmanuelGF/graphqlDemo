const express = require('express')
const app = express()

const schema = require('./schema/schema')

// Graphql setup
const graphqlHTTP = require('express-graphql');
app.use('/graphql', graphqlHTTP({
    schema
}))



const PORT = process.env.PORT || 8888
app.listen(PORT, ()=> {
    console.log(`Listening on port: ${PORT}`)
})