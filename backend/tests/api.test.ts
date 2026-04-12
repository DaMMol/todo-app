import app from '../src/app';
import { LoginResponse } from '../src/interfaces/MessageInterfaces';
import { UserTest } from '../src/interfaces/User';
import { db } from '../src/utils/db';
import { getUserList, postUser, loginUser, deleteUser } from './userFunctions';

describe('API tests', () => {
  afterAll(async () => {
    await db.destroy();
  });

  let userData: LoginResponse;
  let userData2: LoginResponse;

  const testUser: UserTest = {
    username: 'Test User1',
    password: 'testpassword2',
  };

  const testUser2: UserTest = {
    username: 'Test User2',
    password: 'testpassword1',
  };

  it('should create a new user', async () => {
    await postUser(app, testUser);
  });

  it('should create a second user', async () => {
    await postUser(app, testUser2);
  });

  it('should login the user', async () => {
    const vars = {
      credentials: {
        username: testUser.username!,
        password: testUser.password!,
      },
    };
    userData = await loginUser(app, vars);
  });

  it('should login the second user', async () => {
    const vars = {
      credentials: {
        username: testUser2.username!,
        password: testUser2.password!,
      },
    };
    userData2 = await loginUser(app, vars);
  });

  it('should get the user list', async () => {
    await getUserList(app);
  });

  it('should delete the user', async () => {
    await deleteUser(app, userData.token);
  });

  it('should delete the second user', async () => {
    await deleteUser(app, userData2.token);
  });
});
