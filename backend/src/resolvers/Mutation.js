const Mutations = {
  createItem: async function(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem(
      {
        data: { ...args }
      },
      info
    );
    return item;
  },
  updateItem: function(parent, args, ctx, info) {
    const updates = {
      ...args
    };
    delete updates.id;
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  }
};

module.exports = Mutations;
