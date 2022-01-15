import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { UsuariosController } from '../controllers/UsuariosController';
import { TipoUsuario } from '../entities/Usuario';
import { is } from '../middlewares/acl';

const usuariosRoutes = Router();
const usuariosController = new UsuariosController();

const createValidation = celebrate({
  [Segments.BODY]: {
    login: Joi.string().required(),
    senha: Joi.string().required(),
    confirmacaoSenha: Joi
      .string()
      .required()
      .valid(Joi.ref('senha')),
    tipo: Joi
      .string()
      .required()
      .valid(...Object.keys(TipoUsuario)),
    servidorId: Joi.string().required(),
  },
});

usuariosRoutes.post('/', is(['ADMIN', 'EDITOR']), createValidation, usuariosController.create);

export { usuariosRoutes };
