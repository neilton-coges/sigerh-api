import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../error/AppError';
import { IUsuariosRepository } from '../../repositories/models/IUsuariosRepository';

type CreateSessaoData = {
  login: string;
  senha: string;
}

type Sessao = {
  usuario: {
    id: string
    nome: string;
    tipo: string;
  },
  token: string;
}

@injectable()
class CreateSessaoService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  async execute({ login, senha }: CreateSessaoData): Promise<Sessao> {
    const usuario = await this.usuariosRepository.findByLoginWithServidor(login);

    if (!usuario) {
      throw new AppError('Login e/ou senha inválidos.');
    }

    const senhaIsValid = await compare(senha, usuario.senha);

    if (!senhaIsValid) {
      throw new AppError('Login e/ou senha inválidos.');
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: usuario.id,
      expiresIn: '1d',
    });

    const sessao = {
      usuario: {
        id: usuario.id,
        nome: usuario.servidor.nome,
        tipo: usuario.tipo,
      },
      token,
    };

    return sessao;
  }
}

export { CreateSessaoService };
