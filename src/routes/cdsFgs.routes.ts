import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import { CdsFgsController } from '../controllers/CdsFgsController';

const cdsFgsRoutes = Router();
const cdsFgsController = new CdsFgsController();

const bodyValidation = {
  [Segments.BODY]: {
    tipo: Joi.string().required().valid('CDS', 'FG'),
    sigla: Joi.string().required(),
    nome: Joi.string().required(),
    valor: Joi.number().required().positive(),
    qtdVagas: Joi.number().required().positive(),
  },
};

const createValidation = celebrate(bodyValidation);

const updateValidation = celebrate(bodyValidation);

cdsFgsRoutes.get('/', cdsFgsController.index);
cdsFgsRoutes.get('/:id', cdsFgsController.show);
cdsFgsRoutes.post('/', createValidation, cdsFgsController.create);
cdsFgsRoutes.put('/:id', updateValidation, cdsFgsController.update);

export { cdsFgsRoutes };
