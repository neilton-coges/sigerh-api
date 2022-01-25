import { TipoUsuario } from '../../entities/Usuario';
import { AppError } from '../../error/AppError';
import { FakeUsuariosRepository } from '../../repositories/fakes/FakeUsuariosRepository';
import { UpdateUsuarioService } from './UpdateUsuarioService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let updateUsuarioService: UpdateUsuarioService;

describe('UpdateUsuario', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    updateUsuarioService = new UpdateUsuarioService(
      fakeUsuariosRepository,
    );
  });

  it('deve ser possível atualizar um usuário', async () => {
    const usuario = await fakeUsuariosRepository.create({
      login: 'usuarioLogin',
      senha: 'usuarioSenha',
      tipo: TipoUsuario.ADMIN,
      servidorId: 'usuarioServidorId',
    });

    const usuarioUpdated = await updateUsuarioService.execute({
      id: usuario.id,
      senha: '',
      tipo: TipoUsuario.EDITOR,
    });

    expect(usuarioUpdated.tipo).toBe(TipoUsuario.EDITOR);
  });

  it('não deve ser possível atualizar um usuário inexistente', async () => {
    await expect(
      updateUsuarioService.execute({
        id: 'inexistente',
        senha: '',
        tipo: TipoUsuario.EDITOR,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
