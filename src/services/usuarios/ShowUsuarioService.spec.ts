import { TipoUsuario } from '../../entities/Usuario';
import { AppError } from '../../error/AppError';
import { FakeUsuariosRepository } from '../../repositories/fakes/FakeUsuariosRepository';
import { ShowUsuarioService } from './ShowUsuarioService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let showUsuarioService: ShowUsuarioService;

describe('ShowUsuario', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    showUsuarioService = new ShowUsuarioService(
      fakeUsuariosRepository,
    );
  });

  it('deve ser possível mostrar um usuário', async () => {
    const usuarioCreated = await fakeUsuariosRepository.create({
      login: 'usuarioLogin',
      senha: 'usuarioSenha',
      tipo: TipoUsuario.ADMIN,
      servidorId: 'usuarioServidorId',
    });

    const usuarioShow = await showUsuarioService.execute(usuarioCreated.id);

    expect(usuarioShow).toEqual(usuarioCreated);
  });

  it('não deve ser possível mostrar um usuário inexistente', async () => {
    await expect(
      showUsuarioService.execute('usuarioIdInexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
