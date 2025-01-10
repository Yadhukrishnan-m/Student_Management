import {Iadmin} from '../interfaces/admin.model.interface'
import {Istudent} from '../interfaces/student.model.interface'

import { Request,Response } from 'express';
import { IadminRepository } from '../interfaces/admin.repository.interface';
import { IadminService } from '../interfaces/admin.service.interface';
import { AdminRepository } from '../repositories/admin.repository';
import { AdminService } from '../services/admin.service';
import { BcryptPass } from "../utils/bcrypt"
export class AdminController{

    private adminService:IadminService;

    constructor(adminService: IadminService){
        this.adminService = adminService;
    }

    async adminLoagin(req:Request,res:Response): Promise <void > {
        try {
             
            const email:string=req.body.email
            const password:string=req.body.password;

            const result:boolean | Iadmin =await this.adminService.LoginStudent(email,password);
         
          
           if (result) {
             req.session.admin=email;
            res.redirect('/admin/home');
           
           }else{
            req.flash("error_msg", "wrong mail and password");
            res.redirect('/admin');
           }
           
        } catch (error) {
            console.log(error);
       }
    }

    async loadAdminLoagin(req:Request,res:Response): Promise <void > {
        try {
             
        res.render('admin/login')
           
        } catch (error) {
            console.log(error);
       }
    }
async loadHome(req:Request,res:Response):Promise<void>{
    try {
        if (req.session.admin) {
            const result:null | Istudent[] =await this.adminService.findStudents();
            if (result) {
                res.render('admin/home',{result})
            }else{
                req.flash("error_msg", "cant fetch students datas ");
                res.redirect('/admin');
            }
        }else{
            req.flash("error_msg", "please login ");
            res.redirect('/admin');
        }
    
    } catch (error) {
        console.log(error);
    }
}

    
async loadEdit(req:Request,res:Response):Promise<void>{
    try {
        if (req.session.admin) {
            const email:string=req.params.id;
            const userData=await this.adminService.findStudentByEmail(email);
            if (userData) {
              res.render('admin/editUser',{userData});
            }else{
              req.flash("error_msg", "cant fetch data from database ");
              res.redirect('/admin/home');
            }
        }else{
            req.flash("error_msg", "please login session expired ");
            res.redirect('/admin');
        }
     
    } catch (error) {
        console.log(error);
    }
}

    
async edit(req:Request,res:Response):Promise<void>{
    try {
        if (req.session.admin) {
           const email:string=req.params.id
            const name:string=req.body.name;
            const clas:number=req.body.class;
            const roleno:number=req.body.roleno
            const result:boolean=await this.adminService.edit(email,name,clas,roleno);

            if (result) {
                req.flash("success_msg", "updated sucessfully ");
                res.redirect('/admin/home');
            }else{
                req.flash("error_msg", "data updation failed");
            res.redirect('/admin/home');
            }
        }else{
            req.flash("error_msg", "please login session expired ");
            res.redirect('/admin');
        }
     
    } catch (error) {
        console.log(error);
    }
}

async delete(req:Request,res:Response):Promise<void>{
    try {
        const email:string=req.params.id
        const result:boolean=await this.adminService.delete(email);
        if (result) {
            req.flash("success_msg", "deleted successfully ");
            res.redirect('/admin/home');
        }else{
            req.flash("error_msg", "data deletion failed");
        res.redirect('/admin/home');
        }

    } catch (error) {
        console.log(error);
    }
}
async  logout(req:Request,res:Response): Promise <void > {
    try {

        req.session.destroy((err) => {
            if (err) {
                // Handle error if session destruction fails
                console.error('Error destroying session:', err);
                return res.status(500).send('Failed to log out');
            }
    
            // Redirect to the home page after session is destroyed
            return res.redirect('/admin');
        })
    } catch (error) {
        console.log(error);
    
    }
}


} 