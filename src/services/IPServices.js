const request = require('request-promise-native');

exports.getMyIP = () => {
    const uri = 'http://checkip.amazonaws.com';

    return request({
        uri,
    }).then(text => {
        const IP = (text + "").trim();

        return Promise.resolve(IP);
    });
};