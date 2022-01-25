import { TipoUsuario } from '../../entities/Usuario';
import { AppError } from '../../error/AppError';
import { FakeUsuariosRepository } from '../../repositories/fakes/FakeUsuariosRepository';
import { DestroyUsuarioService } from './DestroyUsuarioService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let destroyUsuarioService: DestroyUsuarioService;

describe('DestroyUsuario', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    destroyUsuarioService = new DestroyUsuarioService(
      fakeUsuariosRepository,
    );
  });

  it('deve ser possível remover um usuário', async () => {
    const usuario = await fakeUsuariosRepository.create({
      login: 'usuarioLogin',
      senha: 'usuarioSenha',
      tipo: TipoUsuario.ADMIN,
      servidorId: 'usuarioServidorId',
    });

    const destroy = jest.spyOn(fakeUsuariosRepository, 'destroy');

    await destroyUsuarioService.execute(usuario.id);

    expect(destroy).toHaveBeenCalledWith(usuario.id);
  });

  it('não deve ser possível remover um usuário inexistente', async () => {
    await expect(
      destroyUsuarioService.execute('usuarioIdInexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
