import { FakeCdsFgsRepository } from '../../repositories/fakes/FakeCdsFgsRepository';
import { ListCdsFgService } from './ListCdsFgService';

let fakeCdsFgsRepository: FakeCdsFgsRepository;
let listCdsFgService: ListCdsFgService;

describe('ListCdsFg', () => {
  beforeEach(() => {
    fakeCdsFgsRepository = new FakeCdsFgsRepository();
    listCdsFgService = new ListCdsFgService(fakeCdsFgsRepository);
  });

  it('deve listar CDS/FG', async () => {
    const cdsFg1 = await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      simbologia: 'cdsFg1Simbologia',
      remuneracao: 2000,
      quantidadeVagas: 10,
    });

    const cdsFg2 = await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      simbologia: 'cdsFg2Simbologia',
      remuneracao: 2000,
      quantidadeVagas: 10,
    });

    const cdsFgs = await listCdsFgService.execute({});

    expect(cdsFgs).toHaveLength(2);
    expect(cdsFgs).toEqual(expect.arrayContaining([cdsFg1, cdsFg2]));
  });

  it('deve listar apenas CDS/FG do tipo CDS', async () => {
    await fakeCdsFgsRepository.create({
      tipo: 'FG',
      simbologia: 'cdsFg1Simbologia',
      remuneracao: 2000,
      quantidadeVagas: 10,
    });

    const cds = await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      simbologia: 'cdsFg2Simbologia',
      remuneracao: 1000,
      quantidadeVagas: 5,
    });

    const cdsFgs = await listCdsFgService.execute({
      tipo: 'CDS',
    });

    expect(cdsFgs).toHaveLength(1);
    expect(cdsFgs).toEqual(expect.arrayContaining([cds]));
  });
});
