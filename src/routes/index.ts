import { Express, Request, Response } from "express";
import HelloController from "../controllers/hello.controller";
import UserController from "../controllers/user.controller";
import validateSchema from "../middleware/validateSchema";
import { userSchema } from "../schemas/user.schema";
import auth from "../middleware/auth";

function routes(app: Express) {
  app.get('/api/hello', HelloController.index);
  app.post('/api/user', auth, validateSchema(userSchema), UserController.create);
  app.put('/api/user/:id', UserController.update);
  app.get('/api/user/:id', auth, UserController.get);
  app.post('/api/user/login', UserController.login);
}

export default routes;