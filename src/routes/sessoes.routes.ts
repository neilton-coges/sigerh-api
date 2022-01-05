import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { SessoesController } from '../controllers/SessoesController';

const sessoesRoutes = Router();
const sessoesController = new SessoesController();

const createValidation = celebrate({
  [Segments.BODY]: {
    login: Joi.string().required(),
    senha: Joi.string().required(),
  },
});

sessoesRoutes.post('/', createValidation, sessoesController.create);

export { sessoesRoutes };
