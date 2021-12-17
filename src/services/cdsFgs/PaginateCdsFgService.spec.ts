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
      simbologia: 'cdsFg1Simbologia',
      remuneracao: 2000,
      quantidadeVagas: 10,
    });

    const cdsFg2 = await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      simbologia: 'cdsFg2Simbologia',
      remuneracao: 3000,
      quantidadeVagas: 5,
    });

    const page = await paginateCdsFgService.execute({ perPage: 1, current: 2 });

    expect(page.data).toEqual([cdsFg2]);
    expect(page.total).toBe(2);
  });
});
