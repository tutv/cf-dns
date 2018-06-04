const request = require('request-promise-native');

const baseRequest = request.defaults({
    baseUrl: 'https://api.cloudflare.com/client',
    headers: {
        'X-Auth-Email': process.env.CF_EMAIL || '',
        'X-Auth-Key': process.env.CF_API_KEY,
    }
});

const _getDNSRecord = (name, zoneId) => {
    const zoneIdValidated = zoneId || process.env.CF_ZONE_ID;

    return baseRequest({
        uri: `/v4/zones/${zoneIdValidated}/dns_records?&name=${name}&page=1&per_page=1&match=all`,
        method: 'GET',
        json: true
    }).then(response => {
        const {success, result} = response;

        if (!success) {
            throw new Error(`Cannot get dns record with name: ${name}`);
        }


        if (!result || !Array.isArray(result) || !result.length) {
            throw new Error(`Record not found with name: ${name}`);
        }

        const record = result[0];

        return Promise.resolve(record);
    });
};

const _changeRecordWithIP = (recordId, recordName, IP, zoneId) => {
    const zoneIdValidated = zoneId || process.env.CF_ZONE_ID;

    return baseRequest({
        uri: `/v4/zones/${zoneIdValidated}/dns_records/${recordId}`,
        method: 'PUT',
        body: {
            type: 'A',
            content: IP,
            name: recordName
        },
        json: true
    }).then(response => {
        const {success} = response;

        return Promise.resolve(success);
    });
};

exports.updateDNS = (recordName, IP, zoneId) => {
    const recordNameValidated = (recordName + "").trim();

    return _getDNSRecord(recordNameValidated)
        .then(record => {
            const recordId = record.id;

            return _changeRecordWithIP(recordId, recordNameValidated, IP, zoneId);
        });
};