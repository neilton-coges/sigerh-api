import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import {
  ClassesNiveisCargosController,
} from '../controllers/ClassesNiveisCargosController';
import {
  NiveisCargosController,
} from '../controllers/NiveisCargosController';
import {
  PadroesClassesNiveisCargosController,
} from '../controllers/PadroesClassesNiveisCargosController';
import {
  ReajustesClassesNiveisCargosController,
} from '../controllers/ReajustesClassesNiveisCargosController';
import { is } from '../middlewares/acl';

const niveisCargosRoutes = Router();
const niveisCargosController = new NiveisCargosController();
const classesNiveisCargosController = new ClassesNiveisCargosController();
const padroesClassesNiveisCargosController = new PadroesClassesNiveisCargosController();
const reajustesClassesNiveisCargosController = new ReajustesClassesNiveisCargosController();

const nivelCargoBodyValidation = {
  [Segments.BODY]: {
    codigo: Joi.string().required(),
    descricao: Joi.string().required(),
  },
};

const createNivelCargoValidation = celebrate(
  nivelCargoBodyValidation,
);
const updateNivelCargoValidation = celebrate(
  nivelCargoBodyValidation,
);

niveisCargosRoutes.get('/', niveisCargosController.index);
niveisCargosRoutes.get('/:id', is(['ADMIN', 'EDITOR']), niveisCargosController.show);
niveisCargosRoutes.post('/', is(['ADMIN', 'EDITOR']), createNivelCargoValidation, niveisCargosController.create);
niveisCargosRoutes.put('/:id', is(['ADMIN', 'EDITOR']), updateNivelCargoValidation, niveisCargosController.updated);
niveisCargosRoutes.delete('/:id', is(['ADMIN', 'EDITOR']), niveisCargosController.destroy);

const classeNivelCargoBodyValidation = {
  [Segments.BODY]: {
    codigo: Joi.string().required(),
    descricao: Joi.string().required(),
  },
};

const createClasseNivelCargoValidation = celebrate(
  classeNivelCargoBodyValidation,
);
const updateClasseNivelCargoValidation = celebrate(
  classeNivelCargoBodyValidation,
);

niveisCargosRoutes.get(
  '/:nivelCargoId/classes',
  is(['ADMIN', 'EDITOR']),
  classesNiveisCargosController.index,
);
niveisCargosRoutes.get(
  '/:nivelCargoId/classes/:id',
  is(['ADMIN', 'EDITOR']),
  classesNiveisCargosController.show,
);
niveisCargosRoutes.post(
  '/:nivelCargoId/classes',
  is(['ADMIN', 'EDITOR']),
  createClasseNivelCargoValidation,
  classesNiveisCargosController.create,
);
niveisCargosRoutes.put(
  '/:nivelCargoId/classes/:id',
  is(['ADMIN', 'EDITOR']),
  updateClasseNivelCargoValidation,
  classesNiveisCargosController.update,
);
niveisCargosRoutes.delete(
  '/:nivelCargoId/classes/:id',
  is(['ADMIN', 'EDITOR']),
  classesNiveisCargosController.destroy,
);

const createPadraoClasseNivelCargoValidation = celebrate({
  [Segments.BODY]: {
    codigo: Joi.string().required(),
    descricao: Joi.string().required(),
    valor: Joi.number().required(),
  },
});
const updatePadraoClasseNivelCargoValidation = celebrate({
  [Segments.BODY]: {
    codigo: Joi.string().required(),
    descricao: Joi.string().required(),
  },
});

niveisCargosRoutes.get(
  '/:nivelCargoId/classes/:classeNivelCargoId/padroes',
  is(['ADMIN', 'EDITOR']),
  padroesClassesNiveisCargosController.index,
);

niveisCargosRoutes.get(
  '/:nivelCargoId/classes/:classeNivelCargoId/padroes/:id',
  is(['ADMIN', 'EDITOR']),
  padroesClassesNiveisCargosController.show,
);

niveisCargosRoutes.post(
  '/:nivelCargoId/classes/:classeNivelCargoId/padroes/',
  is(['ADMIN', 'EDITOR']),
  createPadraoClasseNivelCargoValidation,
  padroesClassesNiveisCargosController.create,
);

niveisCargosRoutes.put(
  '/:nivelCargoId/classes/:classeNivelCargoId/padroes/:id',
  is(['ADMIN', 'EDITOR']),
  updatePadraoClasseNivelCargoValidation,
  padroesClassesNiveisCargosController.update,
);

niveisCargosRoutes.delete(
  '/:nivelCargoId/classes/:classeNivelCargoId/padroes/:id',
  is(['ADMIN', 'EDITOR']),
  padroesClassesNiveisCargosController.destroy,
);

const reajusteClasseNivelCargoBodyValidation = {
  [Segments.BODY]: {
    percentual: Joi.number().positive().required(),
    observacao: Joi.string().allow(null, ''),
  },
};

const createReajusteClasseNivelCargoValidation = celebrate(
  reajusteClasseNivelCargoBodyValidation,
);

niveisCargosRoutes.get(
  '/:nivelCargoId/classes/:classeNivelCargoId/reajustes',
  is(['ADMIN', 'EDITOR']),
  reajustesClassesNiveisCargosController.index,
);

niveisCargosRoutes.post(
  '/:nivelCargoId/classes/:classeNivelCargoId/reajustes',
  is(['ADMIN', 'EDITOR']),
  createReajusteClasseNivelCargoValidation,
  reajustesClassesNiveisCargosController.create,
);

niveisCargosRoutes.delete(
  '/:nivelCargoId/classes/:classeNivelCargoId/reajustes/:id',
  is(['ADMIN', 'EDITOR']),
  reajustesClassesNiveisCargosController.destroy,
);

export { niveisCargosRoutes };
