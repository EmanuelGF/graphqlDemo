const express = require('express')
const app = express()

//Allow cross origin requests
const cors = require('cors')
app.use(cors())

/**Require the Graphql schema file  */
const schema = require('./schema/schema')

// Graphql setup
const graphqlHTTP = require('express-graphql');
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // Used to test the queries.
}))



const PORT = process.env.PORT || 8888  
app.listen(PORT, ()=> {
    console.log(`Listening on port: ${PORT}`)
})