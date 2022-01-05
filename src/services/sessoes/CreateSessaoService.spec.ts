import bcryptjs from 'bcryptjs';

import { TipoUsuario } from '../../entities/Usuario';
import { AppError } from '../../error/AppError';
import { FakeUsuariosRepository } from '../../repositories/fakes/FakeUsuariosRepository';
import { CreateSessaoService } from './CreateSessaoService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let createSessaoService: CreateSessaoService;

describe('CreateSession', () => {
  beforeAll(() => {
    jest.spyOn(bcryptjs, 'compare').mockImplementation(async (value1, value2) => value1 === value2);
  });

  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    createSessaoService = new CreateSessaoService(
      fakeUsuariosRepository,
    );
  });

  it('deve ser possível criar um sessão para usuário', async () => {
    await fakeUsuariosRepository.create({
      login: 'usuarioLogin',
      senha: 'usuarioSenha',
      tipo: TipoUsuario.ADMIN,
      servidorId: 'usuarioServidorId',
    });

    const session = await createSessaoService.execute({
      login: 'usuarioLogin',
      senha: 'usuarioSenha',
    });

    expect(session).toHaveProperty('token');
  });

  it('não deve ser possível criar uma sessão com login inexistente', async () => {
    await expect(
      createSessaoService.execute({
        login: 'loginInexistente',
        senha: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível criar uma sessão com senha inválida', async () => {
    await fakeUsuariosRepository.create({
      login: 'usuarioLogin',
      senha: 'usuarioSenha',
      tipo: TipoUsuario.ADMIN,
      servidorId: 'usuarioServidorId',
    });

    await expect(
      createSessaoService.execute({
        login: 'usuarioLogin',
        senha: 'senha-invalida',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
