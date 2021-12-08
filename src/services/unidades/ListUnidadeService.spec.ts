import { FakeUnidadesRepository } from '../../repositories/fakes/FakeUnidadesRepository';
import { ListUnidadeService } from './ListUnidadeService';

let fakeUnidadesRepository: FakeUnidadesRepository;
let listUnidadeService: ListUnidadeService;

describe('ListUnidade', () => {
  beforeEach(() => {
    fakeUnidadesRepository = new FakeUnidadesRepository();
    listUnidadeService = new ListUnidadeService(fakeUnidadesRepository);
  });

  it('deve ser possível listar unidades', async () => {
    const unidade1 = await fakeUnidadesRepository.create({
      sigla: 'sigla1',
      nome: 'nome1',
    });

    const unidade2 = await fakeUnidadesRepository.create({
      sigla: 'sigla2',
      nome: 'nome2',
    });

    const unidades = await listUnidadeService.execute({});

    expect(unidades).toEqual([unidade1, unidade2]);
  });
});
