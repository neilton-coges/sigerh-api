import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { UnidadesController } from '../controllers/UnidadesController';
import { is } from '../middlewares/acl';

const unidadesRoutes = Router();
const unidadesController = new UnidadesController();

const bodyValidation = {
  [Segments.BODY]: {
    sigla: Joi.string().required(),
    descricao: Joi.string().required(),
    unidadePaiId: Joi.string().allow('', null),
  },
};

const createValidation = celebrate(bodyValidation);
const updateValidation = celebrate(bodyValidation);

unidadesRoutes.get('/', unidadesController.index);
unidadesRoutes.get('/:id', is(['ADMIN', 'EDITOR']), unidadesController.show);
unidadesRoutes.post('/', is(['ADMIN', 'EDITOR']), createValidation, unidadesController.create);
unidadesRoutes.put('/:id', is(['ADMIN', 'EDITOR']), updateValidation, unidadesController.update);
unidadesRoutes.delete('/:id', is(['ADMIN', 'EDITOR']), unidadesController.destroy);

export { unidadesRoutes };
