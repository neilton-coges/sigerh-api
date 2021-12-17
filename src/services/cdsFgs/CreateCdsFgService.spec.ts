import { AppError } from '../../error/AppError';
import { FakeCdsFgsRepository } from '../../repositories/fakes/FakeCdsFgsRepository';
import { CreateCdsFgService } from './CreateCdsFgService';

let fakeCdsFgsRepository: FakeCdsFgsRepository;
let createCdsFgService: CreateCdsFgService;

describe('CreateCdsFg', () => {
  beforeEach(() => {
    fakeCdsFgsRepository = new FakeCdsFgsRepository();
    createCdsFgService = new CreateCdsFgService(fakeCdsFgsRepository);
  });

  it('deve ser possível cadastrar um novo CDS/FG', async () => {
    const cdsFg = await createCdsFgService.execute({
      tipo: 'CDS',
      simbologia: 'cdsFgSimbologia',
      remuneracao: 1000,
      quantidadeVagas: 100,
    });

    expect(cdsFg).toHaveProperty('id');
  });

  it('não deve ser possível cadastrar um novo CDS/FG com simbologia já existente', async () => {
    await createCdsFgService.execute({
      tipo: 'CDS',
      simbologia: 'cdsFgSimbologiaExistente',
      remuneracao: 1000,
      quantidadeVagas: 100,
    });

    await expect(
      createCdsFgService.execute({
        tipo: 'CDS',
        simbologia: 'cdsFgSimbologiaExistente',
        remuneracao: 1000,
        quantidadeVagas: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
