import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      login: Joi.string().required(),
      password: Joi.string().required(),
      is_active: Joi.boolean(),
    },
  }),
  usersController.create,
);

usersRouter.get('/', ensureAuthenticated, usersController.index);

export default usersRouter;
