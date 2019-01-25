const sp =  require("@pnp/sp").sp;

module.exports = async function (context) {

    const list = context.bindings.list;

    if (!list) {
        throw new Error("A List is required as input.");
    }
    context.log(`Getting items in '${list.Title}'...`);

    // Get all the uniquely permissioned items in this list
    const items = await sp.web.lists.getById(list.Id).items.select('Id','HasUniqueRoleAssignments','FileRef').get();
    
    return items;
        
};