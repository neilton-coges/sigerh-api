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

const updateValidation = celebrate({
  [Segments.BODY]: {
    senha: Joi.string().allow('', null),
    confirmacaoSenha: Joi
      .string()
      .valid(Joi.ref('senha'))
      .allow('', null),
    tipo: Joi
      .string()
      .required()
      .valid(...Object.keys(TipoUsuario)),
  },
});

usuariosRoutes.get('/', is(['ADMIN']), usuariosController.index);
usuariosRoutes.get('/:id', is(['ADMIN']), usuariosController.show);
usuariosRoutes.post('/', is(['ADMIN']), createValidation, usuariosController.create);
usuariosRoutes.put('/:id', is(['ADMIN']), updateValidation, usuariosController.update);
usuariosRoutes.delete('/:id', is(['ADMIN']), usuariosController.destroy);

export { usuariosRoutes };
