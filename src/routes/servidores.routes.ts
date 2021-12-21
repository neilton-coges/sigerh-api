import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ServidoresController } from '../controllers/ServidoresController';
import { ServidoresLotacoesController } from '../controllers/ServidoresLotacoesController';
import {
  CorRaca, EstadoCivil, Genero, TipoSanguineo,
} from '../entities/Servidor';

const servidoresRoutes = Router();
const servidoresController = new ServidoresController();
const servidoresLotacoesController = new ServidoresLotacoesController();

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
const updateServidorLoatacaoValidation = celebrate({
  [Segments.BODY]: {
    matricula: Joi.string().allow(null, ''),
    dataAdmissao: Joi.date().allow(null, ''),
    observacao: Joi.string().allow(null, ''),
    jornadaId: Joi.string().allow(null, ''),
    subUnidadeId: Joi.string().allow(null, ''),
  },
});

servidoresRoutes.get('/', servidoresController.index);
servidoresRoutes.get('/:id', servidoresController.show);
servidoresRoutes.post('/', createValidation, servidoresController.create);
servidoresRoutes.put('/:id', updateValidation, servidoresController.update);
servidoresRoutes.delete('/:id', servidoresController.destroy);

servidoresRoutes.get('/:servidorId/lotacoes', servidoresLotacoesController.index);
servidoresRoutes.put('/:servidorId/lotacoes/:id', updateServidorLoatacaoValidation, servidoresLotacoesController.update);

export { servidoresRoutes };
