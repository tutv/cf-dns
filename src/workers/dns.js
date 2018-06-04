const parseListDNS = require('../helpers/parseListDNS');
const IPServices = require('../services/IPServices');
const CloudFlareServices = require('../services/CloudFlareServices');

module.exports = () => {
    const records = parseListDNS(process.env.CF_DNS || "");

    IPServices.getMyIP()
        .then(myIP => {
            console.log('My IP', myIP);

            const promises = records.map(record => CloudFlareServices.updateDNS(record, myIP));

            return Promise.all(promises);
        })
        .then(updated => {
            console.log('UPDATED', updated);
        })
        .catch(error => {
            console.error('UPDATE_FAILED', error);
        });
};