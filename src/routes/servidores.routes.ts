import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ServidoresController } from '../controllers/ServidoresController';
import {
  CorRaca, EstadoCivil, Genero, TipoSanguineo,
} from '../entities/Servidor';

const servidoresRoutes = Router();
const servidoresController = new ServidoresController();

const bodyValidation = {
  [Segments.BODY]: {
    nome: Joi.string().required(),
    dataNascimento: Joi.string().required(),
    telefoneCorporativo: Joi.string().allow(null, ''),
    telefonePessoal: Joi.string().required(),
    emailCorporativo: Joi.string().email(),
    emailPessoal: Joi.string().email().required(),
    genero: Joi.string().required().valid(...Object.keys(Genero)),
    tipoSanguineo: Joi.string().required().valid(...Object.keys(TipoSanguineo)),
    corRaca: Joi.string().required().valid(...Object.keys(CorRaca)),
    nacionalidade: Joi.string().required(),
    naturalidadeCidade: Joi.string().required(),
    naturalidadeEstado: Joi.string().required(),
    estadoCivil: Joi.string().required().valid(...Object.keys(EstadoCivil)),
    conjugeNome: Joi.string(),
    conjugeCpf: Joi.string(),
    conjugeDataNascimento: Joi.string(),
    nomeMae: Joi.string(),
    nomePai: Joi.string(),
    cpf: Joi.string().required(),
    rgNumero: Joi.string().required(),
    rgOrgaoEmissor: Joi.string().required(),
    rgDataEmissao: Joi.string().required(),
    tituloNumero: Joi.string().required(),
    tituloSecao: Joi.string().required(),
    tituloZona: Joi.string().required(),
    pis: Joi.string().required(),
  },
};

const createValidation = celebrate(bodyValidation);
const updateValidation = celebrate(bodyValidation);

servidoresRoutes.get('/', servidoresController.index);
servidoresRoutes.get('/:id', servidoresController.show);
servidoresRoutes.post('/', createValidation, servidoresController.create);
servidoresRoutes.put('/:id', updateValidation, servidoresController.update);
servidoresRoutes.delete('/:id', servidoresController.destroy);

export { servidoresRoutes };
