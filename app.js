const config = require('config')
const fs = require('fs')
const express = require('express')
//const spdy = require('spdy') //for https
const cors = require('cors') 
const morgan = require('morgan')
//const TimeFormat = require('hh-mm-ss')
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

// config constants
const morganFormat = config.get('morganFormat')
const htdocsPath = config.get('htdocsPath')
const privkeyPath = config.get('privkeyPath')
const fullchainPath = config.get('fullchainPath')
const port = config.get('port') 
const mbtilesDir = config.get('mbtilesDir')
const logDirPath = config.get('logDirPath')

// logger configuration
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: `${logDirPath}/server-%DATE%.log`,
      datePattern: 'YYYY-MM-DD'
    })
  ]
})

logger.stream = {
  write: (message) => { logger.info(message.trim()) }
}

// app
const app = express()
var VTRouter = require('./routes/VT') //tiling
var esriIFRouter = require('./routes/esriIF') //esri interface (tilemap, etc..)
app.use(cors())
app.use(morgan(morganFormat, {
  stream: logger.stream
}))
app.use(express.static(htdocsPath))
app.use('/VT', VTRouter)
app.use('/esriIF', esriIFRouter) //esri interface

//for http
app.listen(port, () => {
    console.log(`Running at Port ${port} ...`)
})

/* for https
spdy.createServer({
  key: fs.readFileSync(privkeyPath),
  cert: fs.readFileSync(fullchainPath)
}, app).listen(port)
*/