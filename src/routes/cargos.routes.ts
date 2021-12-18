import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { CargosController } from '../controllers/CargosController';
import { TipoCargo } from '../entities/Cargo';

const cargosRoutes = Router();
const cargosController = new CargosController();

const bodyValidation = {
  [Segments.BODY]: {
    tipo: Joi.string().valid(...Object.keys(TipoCargo)).required(),
    nome: Joi.string().required(),
  },
};

const queryValidation = {
  [Segments.QUERY]: {
    isPaginate: Joi.boolean(),
    perPage: Joi.number().positive(),
    currente: Joi.number().positive(),
    tipo: Joi.string().valid(...Object.keys(TipoCargo)),
    nome: Joi.string().allow(null, ''),
  },
};

const createValidation = celebrate(bodyValidation);
const updateValidation = celebrate(bodyValidation);
const indexValitation = celebrate(queryValidation);

cargosRoutes.get('/', indexValitation, cargosController.index);
cargosRoutes.get('/:id', cargosController.show);
cargosRoutes.post('/', createValidation, cargosController.create);
cargosRoutes.put('/:id', updateValidation, cargosController.update);
cargosRoutes.delete('/:id', cargosController.destroy);

export { cargosRoutes };
