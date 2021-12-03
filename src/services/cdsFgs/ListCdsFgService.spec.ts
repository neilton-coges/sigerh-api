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

    const cdsFgs = await listCdsFgService.execute({});

    expect(cdsFgs).toHaveLength(2);
    expect(cdsFgs).toEqual(expect.arrayContaining([cdsFg1, cdsFg2]));
  });

  it('deve listar apenas CDS/FG do tipo CDS', async () => {
    await fakeCdsFgsRepository.create({
      tipo: 'FG',
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

    const cdsFgs = await listCdsFgService.execute({
      tipo: 'CDS',
    });

    expect(cdsFgs).toHaveLength(1);
    expect(cdsFgs).toEqual(expect.arrayContaining([cdsFg2]));
  });
});
