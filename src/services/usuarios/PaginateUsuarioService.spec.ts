import { TipoUsuario } from '../../entities/Usuario';
import { FakeUsuariosRepository } from '../../repositories/fakes/FakeUsuariosRepository';
import { PaginateUsuarioService } from './PaginateUsuarioService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let paginateUsuarioService: PaginateUsuarioService;

describe('PaginateUsuario', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    paginateUsuarioService = new PaginateUsuarioService(
      fakeUsuariosRepository,
    );
  });

  it('deve ser possível paginar usuários', async () => {
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

    const page = await paginateUsuarioService.execute({});

    expect(page.data).toEqual([usuario1, usuario2]);
  });
});
