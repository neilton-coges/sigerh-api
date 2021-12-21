import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { NomeacoesController } from '../controllers/NomeacoesController';

const nomeacoesRoutes = Router();
const nomeacoesController = new NomeacoesController();

const createValidation = celebrate({
  [Segments.BODY]: {
    tipo: Joi.string().valid('NOMEACAO', 'EXONERACAO'),
    cargoId: Joi.string().required(),
    cdsFgId: Joi.string().allow(null, ''),
    unidadeId: Joi.string().required(),
    servidorId: Joi.string().required(),
    data: Joi.date().required(),
    diofProcesso: Joi.string().allow(null, ''),
    observacao: Joi.string().allow(null, ''),
  },
});

nomeacoesRoutes.get('/', nomeacoesController.index);
nomeacoesRoutes.post('/', createValidation, nomeacoesController.create);

export { nomeacoesRoutes };