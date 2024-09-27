const { app } = require('@azure/functions');
const axios = require('axios');

app.http('getDiscordVersion', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        try {
            const response = await axios.get('https://discord.com/api/v9/versions');
            const versionData = response.data;

            return {
                headers: { 'Content-Type': 'application/json' },
                body: versionData
            };
        } catch (error) {
            context.log(`Error fetching Discord version: ${error.message}`);
            return {
                status: 500,
                body: { error: 'Failed to fetch Discord version' }
            };
        }
    }
});