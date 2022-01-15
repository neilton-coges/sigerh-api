import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import { CdsFgsController } from '../controllers/CdsFgsController';
import { is } from '../middlewares/acl';

const cdsFgsRoutes = Router();
const cdsFgsController = new CdsFgsController();

const bodyValidation = {
  [Segments.BODY]: {
    tipo: Joi.string().required().valid('CDS', 'FG'),
    simbologia: Joi.string().required(),
    remuneracao: Joi.number().required().positive(),
    quantidadeVagas: Joi.number().required().positive(),
  },
};

const createValidation = celebrate(bodyValidation);

const updateValidation = celebrate(bodyValidation);

cdsFgsRoutes.get('/', cdsFgsController.index);
cdsFgsRoutes.get('/:id', is(['ADMIN', 'EDITOR']), cdsFgsController.show);
cdsFgsRoutes.post('/', is(['ADMIN', 'EDITOR']), createValidation, cdsFgsController.create);
cdsFgsRoutes.put('/:id', is(['ADMIN', 'EDITOR']), updateValidation, cdsFgsController.update);
cdsFgsRoutes.delete('/:id', is(['ADMIN', 'EDITOR']), cdsFgsController.destroy);

export { cdsFgsRoutes };
