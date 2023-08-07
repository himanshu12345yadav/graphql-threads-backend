import client from 'lib/db';

const userMutations = {
  createUser: async (_: any, args: any) => {
    const { firstName, lastName, email, password } = args.user;
    await client.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        salt: 'random_salt',
      },
    });

    return true;
  },
  updateUser: async (_: any, args: any) => {},
};

export default userMutations;
