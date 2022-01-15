import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { JornadasController } from '../controllers/JornadasController';
import { is } from '../middlewares/acl';

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
jornadasRoutes.get('/:id', is(['ADMIN', 'EDITOR']), jornadasController.show);
jornadasRoutes.post('/', is(['ADMIN', 'EDITOR']), createValidation, jornadasController.create);
jornadasRoutes.put('/:id', is(['ADMIN', 'EDITOR']), updateValtion, jornadasController.update);
jornadasRoutes.delete('/:id', is(['ADMIN', 'EDITOR']), jornadasController.destroy);

export { jornadasRoutes };
