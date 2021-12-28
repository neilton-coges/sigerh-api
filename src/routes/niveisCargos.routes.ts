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
niveisCargosRoutes.get('/:id', niveisCargosController.show);
niveisCargosRoutes.post('/', createNivelCargoValidation, niveisCargosController.create);
niveisCargosRoutes.put('/:id', updateNivelCargoValidation, niveisCargosController.updated);
niveisCargosRoutes.delete('/:id', niveisCargosController.destroy);

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
  classesNiveisCargosController.index,
);
niveisCargosRoutes.get(
  '/:nivelCargoId/classes/:id',
  classesNiveisCargosController.show,
);
niveisCargosRoutes.post(
  '/:nivelCargoId/classes',
  createClasseNivelCargoValidation,
  classesNiveisCargosController.create,
);
niveisCargosRoutes.put(
  '/:nivelCargoId/classes/:id',
  updateClasseNivelCargoValidation,
  classesNiveisCargosController.update,
);
niveisCargosRoutes.delete(
  '/:nivelCargoId/classes/:id',
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
  padroesClassesNiveisCargosController.index,
);

niveisCargosRoutes.get(
  '/:nivelCargoId/classes/:classeNivelCargoId/padroes/:id',
  padroesClassesNiveisCargosController.show,
);

niveisCargosRoutes.post(
  '/:nivelCargoId/classes/:classeNivelCargoId/padroes/',
  createPadraoClasseNivelCargoValidation,
  padroesClassesNiveisCargosController.create,
);

niveisCargosRoutes.put(
  '/:nivelCargoId/classes/:classeNivelCargoId/padroes/:id',
  updatePadraoClasseNivelCargoValidation,
  padroesClassesNiveisCargosController.update,
);

niveisCargosRoutes.delete(
  '/:nivelCargoId/classes/:classeNivelCargoId/padroes/:id',
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
  reajustesClassesNiveisCargosController.index,
);

niveisCargosRoutes.post(
  '/:nivelCargoId/classes/:classeNivelCargoId/reajustes',
  createReajusteClasseNivelCargoValidation,
  reajustesClassesNiveisCargosController.create,
);

niveisCargosRoutes.delete(
  '/:nivelCargoId/classes/:classeNivelCargoId/reajustes/:id',
  reajustesClassesNiveisCargosController.destroy,
);

export { niveisCargosRoutes };
