import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
//import * as admin from 'firebase-admin';

/*
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'FIREBASE_DB',
});
console.log(`ADMIN CREDENTIAL: ${JSON.stringify(admin.credential.applicationDefault())}`);
*/
@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getAllUsers(): void {
    /*
    admin
      .auth()
      //.getUser()
      .listUsers()
      .then((list) => {
        console.log (`Fetched users list: ${JSON.stringify(list)}`);
      })
      .catch((error) => {
        console.log ( `Error fetching users list: ${error}`);
      });
      */
  }

  @Get('login')
  getHello(): string {
    //return this.appService.getHello();
    return 'user login page';
  }
  @Get('profile')
  getHelloWorld(): string {
    //return this.appService.getHelloWorld();
    return 'profile page';
  }
  @Post('login')
  checkLogin(@Res() res): string {
    return 'user auth';
  }
  @Post('signup')
  getLog(): string {
    return 'user reg';
  }
  @Post('logout')
  getProfile(): string {
    return 'user logout';
  }
}
