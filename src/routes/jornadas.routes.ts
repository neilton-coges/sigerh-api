import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { JornadasController } from '../controllers/JornadasController';

const jornadasController = new JornadasController();
const jornadasRoutes = Router();

const bodyValidation = {
  [Segments.BODY]: {
    nome: Joi.string().required(),
    horas: Joi.array().items(Joi.object({
      horaInicio: Joi.string().required(),
      horaFim: Joi.string().required(),
    })).min(1),
  },
};

const createValidation = celebrate(bodyValidation);
const updateValtion = celebrate(bodyValidation);

jornadasRoutes.get('/', jornadasController.index);
jornadasRoutes.get('/:id', jornadasController.show);
jornadasRoutes.post('/', createValidation, jornadasController.create);
jornadasRoutes.put('/:id', updateValtion, jornadasController.update);
jornadasRoutes.delete('/:id', jornadasController.destroy);

export { jornadasRoutes };
