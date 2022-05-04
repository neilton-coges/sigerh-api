import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ProgressoesController } from '../controllers/ProgressoesController';
import { is } from '../middlewares/acl';

const progressoesRoutes = Router();
const progressoesController = new ProgressoesController();

const bodyValidation = {
  [Segments.BODY]: {
    servidorId: Joi.string().required(),
    cargoId: Joi.string().required(),
    classeNivelCargoId: Joi.string().required(),
    padraoClasseNivelCargoId: Joi.string().required(),
    dataProgressao: Joi.date().required(),
    processo: Joi.string().required(),
    observacao: Joi.string().allow(null, ''),
  },
};

const createValidation = celebrate(bodyValidation);

progressoesRoutes.get('/', is(['ADMIN', 'EDITOR']), progressoesController.index);
progressoesRoutes.get('/:id', is(['ADMIN', 'EDITOR']), progressoesController.show);
progressoesRoutes.post('/', is(['ADMIN', 'EDITOR']), createValidation, progressoesController.create);

export { progressoesRoutes };
