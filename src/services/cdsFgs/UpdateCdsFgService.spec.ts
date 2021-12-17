import { AppError } from '../../error/AppError';
import { FakeCdsFgsRepository } from '../../repositories/fakes/FakeCdsFgsRepository';
import { UpdateCdsFgService } from './UpdateCdsFgService';

let fakeCdsFgsRepository: FakeCdsFgsRepository;
let updateCdsFgService: UpdateCdsFgService;

describe('UpdateCdsFg', () => {
  beforeEach(() => {
    fakeCdsFgsRepository = new FakeCdsFgsRepository();
    updateCdsFgService = new UpdateCdsFgService(fakeCdsFgsRepository);
  });

  it('deve ser possível atualizar um CDS/FG', async () => {
    const cdsFg = await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      simbologia: 'cdsFgSimbologia',
      remuneracao: 2000,
      quantidadeVagas: 20,
    });

    const cdsFgUpdated = await updateCdsFgService.execute({
      ...cdsFg,
      tipo: 'FG',
    });

    expect(cdsFgUpdated.tipo).toBe('FG');
  });

  it('não deve ser possível atualizar um CDS/FG inexistente', async () => {
    await expect(updateCdsFgService.execute({
      id: 'cdsFgIdInexistente',
      tipo: 'CDS',
      simbologia: 'cdsFgSimbologia',
      remuneracao: 3000,
      quantidadeVagas: 10,
    })).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar um CDS/FG com simbologia já existente', async () => {
    await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      simbologia: 'cdsFg1Simbologia',
      remuneracao: 2000,
      quantidadeVagas: 20,
    });

    const cdsFg = await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      simbologia: 'cdsFg2Simbologia',
      remuneracao: 2000,
      quantidadeVagas: 20,
    });

    await expect(updateCdsFgService.execute({
      ...cdsFg,
      simbologia: 'cdsFg1Simbologia',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar um CDS/FG com quantidade de vagas menor do que quantidade de nomeados', async () => {
    const cdsFg = await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      simbologia: 'cdsFgSimbologia',
      remuneracao: 2000,
      quantidadeVagas: 20,
    });

    await expect(updateCdsFgService.execute({
      ...cdsFg,
      quantidadeVagas: -2,
    })).rejects.toBeInstanceOf(AppError);
  });
});
