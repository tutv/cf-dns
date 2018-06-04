# CloudFlare DNS Updater

Automatically update your IP to CloudFlare DNS.

## Config

Create `.env` file with content:

```
CF_EMAIL=your@email.com
CF_API_KEY=cloudflare_api
CF_ZONE_ID=zone_id
DNS=record.domain.com|another.domain.com
```

## Run now

```
node index.js

// Using pm2
pm2 start index.js --name your-name-app
```