const Schedule = require('node-schedule');
const {EVERY_FIVE_MINUTES} = require('./constants/Crontab');
const dnsUpdater = require('./workers/dns');

module.exports = () => {
    console.log('Register cron job.');

    dnsUpdater();

    Schedule.scheduleJob(EVERY_FIVE_MINUTES, dnsUpdater);
};
