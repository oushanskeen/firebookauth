import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import * as admin from 'firebase-admin';
import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp(process.env.FIREBASE_PRIVATE_KEY);

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
  login(): string {
    //return this.appService.getHello();
    //return 'user login page';
    
  }
  @Get('profile')
  getHelloWorld(): string {
    //return this.appService.getHelloWorld();
    return 'profile page';
  }
  @Post('login')
  sessionLogin(@Req() req, @Res() res): string {
    //return 'user auth';
    const idToken = req.body.idToken.toString();
    const csrfToken = req.body.csrfToken.toString();
    if (csrfToken !== req.cookies.csrfToken) {
      res.status(401).send("UNAUTHORIZED REQUEST");
      return;
    }
    const expiresIn = 60*60*24*5*1000;

    //create session cookie file
    admin
      .auth()
      .createSessionCookie(idToken,{ expiresIn })
      .then(
        (sessionCookie) => {
          res.cookie('session',sessionCookie)
          res.end(JSON.stringify({status:'success'}))
        },
        (error) => {
          res.status(401).send('UNAUTHORIZED REQUEST')
        }
      );
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
