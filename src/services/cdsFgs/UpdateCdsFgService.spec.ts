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
      sigla: 'sigla',
      nome: 'nome',
      valor: 2000,
      qtdVagas: 20,
    });

    const cdsFgUpdated = await updateCdsFgService.execute({
      ...cdsFg,
      tipo: 'FG',
    });

    expect(cdsFgUpdated.tipo).toBe('FG');
  });

  it('não deve ser possível atualizar um CDS/FG inexistente', async () => {
    await expect(updateCdsFgService.execute({
      id: 'inexistente',
      tipo: 'CDS',
      sigla: 'sigla',
      nome: 'nome',
      valor: 3000,
      qtdVagas: 10,
    })).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar um CDS/FG com sigla já existente', async () => {
    await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      sigla: 'sigla1',
      nome: 'nome1',
      valor: 2000,
      qtdVagas: 20,
    });

    const cdsFg = await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      sigla: 'sigla2',
      nome: 'nome2',
      valor: 1500,
      qtdVagas: 25,
    });

    await expect(updateCdsFgService.execute({
      ...cdsFg,
      sigla: 'sigla1',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar um CDS/FG com quantidade de vagas menor do que quantidade de nomeados', async () => {
    const cdsFg = await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      sigla: 'sigla',
      nome: 'nome',
      valor: 2000,
      qtdVagas: 20,
    });

    await expect(updateCdsFgService.execute({
      ...cdsFg,
      qtdVagas: -2,
    })).rejects.toBeInstanceOf(AppError);
  });
});
