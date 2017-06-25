const http = require('http')
const url = require('url')
var Feed = require('rss-to-json')
const port = process.env.PORT || 3000

const requestHandler = (request, response) => {
  var urlParts = url.parse(request.url, true)
  var query = urlParts.query

  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Request-Method', '*')
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  response.setHeader('Access-Control-Allow-Headers', '*')
  if (request.method === 'OPTIONS') {
    response.writeHead(200)
    response.end()
    return
  }

  if ('q' in query) {
    Feed.load('https://news.google.com/news/section?output=rss&q=' + encodeURI(query.q),
      function (err, rss) {
        if (err) {
          return console.log('something bad happened', err)
        }
        // console.log(rss.items)
        response.writeHead(200)
        response.end(JSON.stringify(rss.items))
      }
    )
  } else {
    response.writeHead(200)
    response.end('Sorry, wrong api')
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})