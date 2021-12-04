import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { CargosController } from '../controllers/CargosController';

const cargosRoutes = Router();
const cargosController = new CargosController();

const bodyValidation = {
  [Segments.BODY]: {
    nome: Joi.string().required(),
  },
};

const createValidation = celebrate(bodyValidation);
const updateValidation = celebrate(bodyValidation);

cargosRoutes.get('/', cargosController.index);
cargosRoutes.get('/:id', cargosController.show);
cargosRoutes.post('/', createValidation, cargosController.create);
cargosRoutes.put('/:id', updateValidation, cargosController.update);
cargosRoutes.delete('/:id', cargosController.destroy);

export { cargosRoutes };