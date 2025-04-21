const express = require('express')
const app = express()
const port = 3000

// Existing routes
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page')
})

app.get('/about', (req, res) => {
  res.send('This is the About Page')
})

app.get('/contact', (req, res) => {
  res.send('Contact us at: email@example.com')
})

// New route: dynamic user ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params
  res.send(`User ID: ${id}`)
})

// New route: dynamic product category and ID, responds with JSON
app.get('/products/:category/:productId', (req, res) => {
  const { category, productId } = req.params
  res.json({ category, productId })
})

// 404 handler for any other routes
app.use((req, res) => {
  res.status(404).send('Page Not Found')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
