// Import durable functions
const df = require("durable-functions");

module.exports = async function (context, myTimer) {
    // Create client instance
    const client = df.getClient(context);

    const timeStamp = new Date().toISOString();
    
    if(myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }

    // start orchestration with hardcoded site name
    const instanceId = await client.startNew('OGetUniquePermItems', undefined, 'test3');
    
    // Log the started instance
    context.log(`Started orchestration with ID = '${instanceId}'.`);
    context.log('JavaScript timer trigger function ran!', timeStamp);   
};