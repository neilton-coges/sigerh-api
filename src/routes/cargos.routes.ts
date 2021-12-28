import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { CargosController } from '../controllers/CargosController';
import { TipoCargo } from '../entities/Cargo';

const cargosRoutes = Router();
const cargosController = new CargosController();

const bodyValidation = {
  [Segments.BODY]: {
    tipo: Joi.string().valid(...Object.keys(TipoCargo)).required(),
    descricao: Joi.string().required(),
    nivelCargoId: Joi
      .alternatives()
      .conditional('tipo', {
        is: TipoCargo.EFETIVO,
        then: Joi.string().required(),
      }),
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
