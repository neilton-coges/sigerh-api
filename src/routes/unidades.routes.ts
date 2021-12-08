import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { UnidadesController } from '../controllers/UnidadesController';

const unidadesRoutes = Router();
const unidadesController = new UnidadesController();

const bodyValidation = {
  [Segments.BODY]: {
    sigla: Joi.string().required(),
    nome: Joi.string().required(),
    unidadePaiId: Joi.string(),
  },
};

const createValidation = celebrate(bodyValidation);
const updateValidation = celebrate(bodyValidation);

unidadesRoutes.get('/', unidadesController.index);
unidadesRoutes.get('/:id', unidadesController.show);
unidadesRoutes.post('/', createValidation, unidadesController.create);
unidadesRoutes.put('/:id', updateValidation, unidadesController.update);
unidadesRoutes.delete('/:id', unidadesController.destroy);

export { unidadesRoutes };
