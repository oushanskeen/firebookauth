import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
//import { ServiceAccount } from 'firebase-admin';

//const app = await NestFactory.create<NestExpressApplication>(AppModule);

const mockUser = {
  email: 'user@example.com',
  emailVerified: false,
  phoneNumber: '+11234567890',
  password: 'secretPassword',
  displayName: 'John Doe',
  photoURL: 'http://www.example.com/12345678/photo.png',
  disabled: false,
};
const mockUserZero = {
  email: '0@0.0',
  emailVerified: false,
  phoneNumber: '+0',
  password: '0',
  displayName: '0 0',
  photoURL: '0',
  disabled: false,
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  admin.initializeApp({
    //credential: admin.credential.applicationDefault(),
    credential: admin.credential.applicationDefault(),
    databaseURL: 'FIREBASE_DB',
  });
  console.log(JSON.stringify(admin.credential.applicationDefault()));
  console.log(
    'CREDENTIAL: ' + JSON.stringify(admin.credential.applicationDefault()),
  );
  app.enableCors();
  app.setViewEngine('pug');

  // get all users
  admin
    .auth()
    .listUsers()
    .then(list => {
      console.log(`Fetched users list: ${JSON.stringify(list)}`);
    })
    .catch(error => {
      console.log(`Error fetching users list: ${error}`);
    });

  admin
    .auth()
    .createUser(mockUser)
    .then(userRecord => {
      console.log(`Successfully created new user: ${userRecord.uid}`);
    })
    .catch(error => {
      console.log(`Error creating new user: ${error}`);
    });

  admin
    .auth()
    .getUser('tatCXh59efPfhjGlZKLPTFXrhIQ2')
    .then(userRecord => {
      console.log(`Fetched user data: ${JSON.stringify(userRecord)}`);
    })
    .catch(error => {
      console.log(`Error fetching user data: ${error}`);
    });

  admin
    .auth()
    .getUserByEmail('inta.soul@gmail.com')
    .then(userRecord => {
      console.log(`Fetched user data: ${JSON.stringify(userRecord)}`);
    })
    .catch(error => {
      console.log(`Error fetching user data: ${error}`);
    });

  admin
    .auth()
    .updateUser('tatCXh59efPfhjGlZKLPTFXrhIQ2', { ...mockUserZero })
    .then(userRec => {
      console.log(`User: ${JSON.stringify(userRec)}`);
    })
    .catch(error => {
      console.log('Error updateing user: ${error}');
    });

  admin
    .auth()
    .deleteUser('tatCXh59efPfhjGlZKLPTFXrhIQ2')
    .then(() => {
      console.log(`Successfully delete user`);
    })
    .catch(error => {
      console.log(`Error deleting user, ${error}`);
    });

  await app.listen(configService.get<string>('API_PORT') || 4000);
}
bootstrap();
