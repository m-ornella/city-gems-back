// // tests/auth.test.ts
// import request from 'supertest';
// import app from '../server'; 

// describe('Authentication API', () => {
//   let token: string;
//   let userId: number; 

  
//   it('should register a new user', async () => {
//     const response = await request(app)
//       .post('/api/register')
//       .send({
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@example.com',
//         password: 'password123',
//       });
//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty('id');
//     userId = response.body.id; 
//   });

//   // Example test for user login
//   it('should login an existing user and return a token', async () => {
//     const response = await request(app)
//       .post('/api/login')
//       .send({
//         email: 'john.doe@example.com',
//         password: 'password123',
//       });
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('accessToken');
//     token = response.body.accessToken;
//   });


//   it('should access a protected route with valid token', async () => {
//     const response = await request(app)
//       .get('/api/logout')  // Adjust this to an actual protected route
//       .set('Authorization', `Bearer ${token}`);
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('data');
//   });

//   // Example test for logout
//   it('should logout the user', async () => {
//     const response = await request(app)
//       .post('/api/logout')
//       .send({ refreshToken: token, userId: userId });  // Use the stored userId and token
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('message', 'Logged out successfully');
//   });
// });
