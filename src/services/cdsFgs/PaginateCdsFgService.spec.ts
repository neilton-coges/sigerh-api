import { FakeCdsFgsRepository } from '../../repositories/fakes/FakeCdsFgsRepository';
import { PaginateCdsFgService } from './PaginateCdsFgService';

let fakeCdsFgsRepository: FakeCdsFgsRepository;
let paginateCdsFgService: PaginateCdsFgService;

describe('PaginateCdsFg', () => {
  beforeEach(() => {
    fakeCdsFgsRepository = new FakeCdsFgsRepository();
    paginateCdsFgService = new PaginateCdsFgService(fakeCdsFgsRepository);
  });

  it('deve paginar CDS/FG', async () => {
    await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      sigla: 'sigla1',
      nome: 'nome1',
      valor: 2000,
      qtdVagas: 10,
    });

    const cdsFg2 = await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      sigla: 'sigla2',
      nome: 'nome2',
      valor: 3000,
      qtdVagas: 5,
    });

    const page = await paginateCdsFgService.execute({ perPage: 1, current: 2 });

    expect(page.data).toEqual([cdsFg2]);
    expect(page.total).toBe(2);
  });
});
