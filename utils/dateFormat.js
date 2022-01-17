const moment = require('moment')
// var timestamp = moment().unix();

// console.log(timestamp)

// console.log(moment(timestamp, 'X').format('YYYY-MM-DDTHH:mm:ssZ'))

module.exports = (
    timestamp => {
        moment(timestamp, 'X').format('YYYY-MM-DDTHH:mm:ssZ')
    }
)