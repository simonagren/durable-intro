const sp =  require("@pnp/sp").sp;

module.exports = async function (context) {
    
    const siteName = context.bindings.siteName;

    if (!siteName) {
        throw new Error("A Site name is required as input.");
    }
    
    context.log(`Getting lists in '${siteName}'...`);
    
    // Get all the Lists
    const lists = await sp.web.lists.select('Id','Title','Hidden').filter('Hidden eq false').get();
    
    return lists;
        
};