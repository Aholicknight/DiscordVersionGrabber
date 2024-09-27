const { app } = require('@azure/functions');
const fetch = require('node-fetch');

app.http('getDiscordVersion', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        try {
            const response = await fetch('https://discord.com/api/v9/versions');
            const data = await response.json();

            return {
                headers: { 'Content-Type': 'application/json' },
                body: data
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