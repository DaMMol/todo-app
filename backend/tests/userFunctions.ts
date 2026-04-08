import request from 'supertest';
import { UserTest } from '../src/interfaces/User';
import { Application } from 'express';
import {
  UserResponse,
  LoginResponse,
} from '../src/interfaces/MessageInterfaces';

const getUserList = (url: string | Application): Promise<UserTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/users')
      .set('Content-type', 'application/json')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const users = response.body;
          expect(users).toBeInstanceOf(Array);
          expect(users[0]).toHaveProperty('id');
          expect(users[0]).toHaveProperty('username');
          resolve(users);
        }
      });
  });
};

const postUser = (
  url: string | Application,
  user: UserTest,
): Promise<UserTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/users')
      .set('Content-type', 'application/json')
      .send(user)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.username).toBe(user.username);
          resolve(userData);
        }
      });
  });
};

const loginUser = (
  url: string | Application,
  vars: { credentials: { username: string; password: string } },
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/auth/login')
      .set('Content-type', 'application/json')
      .send(vars.credentials)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user = vars.credentials;
          const userData = response.body;
          expect(userData).toHaveProperty('token');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.username).toBe(user.username);
          resolve(userData);
        }
      });
  });
};

const deleteUser = (
  url: string | Application,
  token: string,
): Promise<UserResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete('/api/v1/users')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.message).toBe('User deleted');
          resolve(userData);
        }
      });
  });
};

export { getUserList, postUser, loginUser, deleteUser };
