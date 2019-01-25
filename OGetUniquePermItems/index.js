const sp =  require("@pnp/sp").sp;
const SPFetchClient = require("@pnp/nodejs").SPFetchClient;
const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    
    // Get input from the client that started
    const siteName = context.df.getInput();
    
    // Setup PnPJs
    sp.setup({
        sp: {
            fetchClientFactory: () => {
                return new SPFetchClient(
                  `${process.env.spTenantUrl}/sites/${siteName}/`, 
                  process.env.spId, 
                  process.env.spSecret);
            },
        },
    });
    
    // Call Activity that fetches all lists that arent hidden, and wait for it to finish
    const lists = yield context.df.callActivity("AGetLists", siteName);

    const output = [];

    for (let list of lists) {
        // For this example we will do all the calls in sequence
        // This could also be done in parallel, but then we need to handle throttling
        output.push(yield context.df.callActivity("AGetUniqueItems", list));
    }

    // Here we could save the result to some DB if we want to
    // yield context.df.callActivity('SaveItems', output);
    
    // For this example we just log the result  
    context.log(JSON.stringify(output));
    
    return context.instanceId;

})