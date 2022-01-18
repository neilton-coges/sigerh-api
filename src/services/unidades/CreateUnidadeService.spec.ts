import { AppError } from '../../error/AppError';
import { FakeUnidadesRepository } from '../../repositories/fakes/FakeUnidadesRepository';
import { CreateUnidadeService } from './CreateUnidadeService';

let fakeUnidadesRepository: FakeUnidadesRepository;
let createUnidadeService: CreateUnidadeService;

describe('CreateUnidade', () => {
  beforeEach(() => {
    fakeUnidadesRepository = new FakeUnidadesRepository();
    createUnidadeService = new CreateUnidadeService(fakeUnidadesRepository);
  });

  it('deve ser possível criar uma nova unidade', async () => {
    const unidade = await createUnidadeService.execute({
      descricao: 'descricao',
      sigla: 'sigla',
    });

    expect(unidade).toHaveProperty('id');
  });

  it('não deve ser possível criar um nova unidade com unidade pai inexistente', async () => {
    await expect(
      createUnidadeService.execute({
        sigla: 'sigla',
        descricao: 'descricao',
        unidadePaiId: 'inexistente',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
