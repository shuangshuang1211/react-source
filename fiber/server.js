import express from 'express'

const app = express()

app.use(express.static('dist'))

const template = `
  <html>
    <head>
      <title>Fiber Test</title>
    </head>
    <body>
      <div></div>
      <script src="bundle.js"></script>
    </body>
  </html>
`

app.get('*', (req, res) => {
  res.send(template)
})

app.listen(5005, () => {
  console.log('server is running at http://localhost:5005/')
})