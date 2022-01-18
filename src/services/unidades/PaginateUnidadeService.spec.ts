import { FakeUnidadesRepository } from '../../repositories/fakes/FakeUnidadesRepository';
import { PaginateUnidadeService } from './PaginateUnidadeService';

let fakeUnidadesRepository: FakeUnidadesRepository;
let paginateUnidadeService: PaginateUnidadeService;

describe('PaginateUnidade', () => {
  beforeEach(() => {
    fakeUnidadesRepository = new FakeUnidadesRepository();
    paginateUnidadeService = new PaginateUnidadeService(fakeUnidadesRepository);
  });

  it('deve ser possível paginar unidades', async () => {
    const unidade1 = await fakeUnidadesRepository.create({
      sigla: 'sigla1',
      descricao: 'descricao1',
    });

    await fakeUnidadesRepository.create({
      sigla: 'sigla2',
      descricao: 'descricao2',
    });

    const page = await paginateUnidadeService.execute({
      perPage: 1,
    });

    expect(page.data).toEqual([unidade1]);
    expect(page.total).toEqual(2);
  });
});
