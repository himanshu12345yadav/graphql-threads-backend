import UserService from 'services/User';

const userMutations = {
  Mutation: {
    createUser: async (_: any, args: any): Promise<string> => {
      const token = await UserService.createUser(args.user);
      return token;
    },
    updateUser: async (_: any, args: any) => {},
  },
};

export default userMutations;
