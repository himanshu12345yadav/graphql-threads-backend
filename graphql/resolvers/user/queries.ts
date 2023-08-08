import UserService from 'services/User';

const userQueries = {
  Query: {
    users: async (_: any, args: any) => {},
    getUserToken: async (_: any, args: any): Promise<string | Error> => {
      const { email, password } = args;
      const token = await UserService.getUserToken({ email, password });
      return token;
    },
  },
};

export default userQueries;
