import { FakeCdsFgsRepository } from '../../repositories/fakes/FakeCdsFgsRepository';
import { PageCdsFgService } from './PageCdsFgService';

let fakeCdsFgsRepository: FakeCdsFgsRepository;
let pageCdsFgService: PageCdsFgService;

describe('PageCdsFG', () => {
  beforeEach(() => {
    fakeCdsFgsRepository = new FakeCdsFgsRepository();
    pageCdsFgService = new PageCdsFgService(fakeCdsFgsRepository);
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

    const page = await pageCdsFgService.execute({ perPage: 1, current: 2 });

    expect(page.data).toEqual([cdsFg2]);
    expect(page.total).toBe(2);
  });
});
