/**
 * Parse string to array dns record.
 *
 * @param dns
 * @return {string[]}
 */
module.exports = (dns) => {
    const trimmed = (dns + "").trim();
    const records = trimmed.split('|');

    return records.map(record => (record + "").trim())
        .filter(record => !!record);
};