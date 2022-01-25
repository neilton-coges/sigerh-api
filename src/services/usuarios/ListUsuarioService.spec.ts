import { TipoUsuario } from '../../entities/Usuario';
import { FakeUsuariosRepository } from '../../repositories/fakes/FakeUsuariosRepository';
import { ListUsuarioService } from './ListUsuarioService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let listUsuarioService: ListUsuarioService;

describe('ListUsuario', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    listUsuarioService = new ListUsuarioService(
      fakeUsuariosRepository,
    );
  });

  it('deve ser possível listar usuários', async () => {
    const usuario1 = await fakeUsuariosRepository.create({
      login: 'usuario1Login',
      senha: 'usuario1Senha',
      tipo: TipoUsuario.ADMIN,
      servidorId: 'usuario1ServidorId',
    });

    const usuario2 = await fakeUsuariosRepository.create({
      login: 'usuario2Login',
      senha: 'usuario2Senha',
      tipo: TipoUsuario.ADMIN,
      servidorId: 'usuario2ServidorId',
    });

    const list = await listUsuarioService.execute({});

    expect(list).toEqual([usuario1, usuario2]);
  });
});
