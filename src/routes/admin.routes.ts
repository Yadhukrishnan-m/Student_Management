import Express, { Request, Response } from "express";
import { AdminController } from "../controllers/admin.controller";
import path from "path";

export class AdminRoute {
  private AdminController: AdminController;
  private adminRouter: Express.Router;
  constructor(AdminController: AdminController) {
    this.AdminController =  AdminController;
    this.adminRouter = Express.Router();
    this.setRoutes();
  }
   
  private setRoutes() {
    this.adminRouter.get("/", (req: Request, res: Response) => {
        this.AdminController.loadAdminLoagin(req, res);
      });

      this.adminRouter.post("/login", (req: Request, res: Response) => {
        this.AdminController.adminLoagin(req, res);
      });
      this.adminRouter.get("/home", (req: Request, res: Response) => {
        this.AdminController.loadHome(req, res);
      });
      this.adminRouter.get("/edit/:id", (req: Request, res: Response) => {
        this.AdminController.loadEdit(req, res);
      });
      this.adminRouter.post("/edit/:id", (req: Request, res: Response) => {
        this.AdminController.edit(req, res);
      });
      this.adminRouter.get("/delete/:id", (req: Request, res: Response) => {
        this.AdminController.delete(req, res);
      });
      this.adminRouter.get("/logout", (req: Request, res: Response) => {
        this.AdminController.logout(req, res);
      });
  }


  public getAdminRoute() {
    return this.adminRouter;
  }
}
