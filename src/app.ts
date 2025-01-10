import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv'
import { StudentRoute } from './routes/student.routes';
import {AdminRoute} from './routes/admin.routes'
import path from "path";
import session from 'express-session'; // Import express-session
import flash from 'connect-flash'; 
import nocache from 'nocache'; 

import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { StudentRepository } from './repositories/student.repository';
import {  AdminController } from './controllers/admin.controller';
import { AdminService} from './services/admin.service';
import { AdminRepository } from './repositories/admin.repository';
declare module "express-session" {
    interface SessionData {
      student?: string | null; // Student ID or additional session data
      admin?:string |null
    }
  }
export class App {
    public app: Application;

    constructor() {
        dotenv.config()
        this.app = express();
        this.setMiddlewares();
        this.setAdminRoute()
        this.setStudentRoute();
        this.setupViewEngine();
    }
    
    private setupViewEngine() {
        // Set the views directory
        this.app.set("views", path.join(__dirname, "views"));
        // Set EJS as the templating engine
        this.app.set("view engine", "ejs");
      }

    private setMiddlewares(): void {
       
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(session({
            secret:  'secret', // You should store this in .env file
            resave: false,
            saveUninitialized: true
          }));
      
          // Flash messages middleware
          this.app.use(flash());
      
          // Middleware to make flash messages available in the view templates
          this.app.use((req: Request, res: Response, next: () => void) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            next();
          });
          this.app.use(nocache());
    }

   
 private setStudentRoute(){
  const studentRepository=new StudentRepository()
  const studentService=new StudentService(studentRepository)
  const studentController=new StudentController(studentService)
    const studentRoute=new StudentRoute(studentController)
  this.app.use('/',studentRoute.getStudentRoute());
 }
 private setAdminRoute() {
  const adminRepository = new AdminRepository();
  const adminService = new AdminService(adminRepository);  
  const adminController = new AdminController(adminService);  
  const adminRoute = new AdminRoute(adminController);
  this.app.use('/admin', adminRoute.getAdminRoute());
}

      
      
     
    public getApp() {
        return this.app;
      }
}


