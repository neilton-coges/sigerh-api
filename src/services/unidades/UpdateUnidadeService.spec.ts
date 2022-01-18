import { AppError } from '../../error/AppError';
import { FakeUnidadesRepository } from '../../repositories/fakes/FakeUnidadesRepository';
import { UpdateUnidadeService } from './UpdateUnidadeService';

let fakeUnidadesRepository: FakeUnidadesRepository;
let updateUnidadeService: UpdateUnidadeService;

describe('UpdateUnidade', () => {
  beforeEach(() => {
    fakeUnidadesRepository = new FakeUnidadesRepository();
    updateUnidadeService = new UpdateUnidadeService(fakeUnidadesRepository);
  });

  it('deve ser possível atualizar uma unidade', async () => {
    const { id } = await fakeUnidadesRepository.create({
      sigla: 'sigla',
      descricao: 'descricao',
    });

    const unidadeUpdated = await updateUnidadeService.execute({
      id,
      sigla: 'siglaAtualizada',
      descricao: 'descricaoAtualizado',
    });

    expect(unidadeUpdated.sigla).toBe('siglaAtualizada');
    expect(unidadeUpdated.descricao).toBe('descricaoAtualizado');
  });

  it('não deve ser possível atualizar uma unidade inexistente', async () => {
    await expect(
      updateUnidadeService.execute({
        id: 'inexistente',
        descricao: 'descricao',
        sigla: 'sigla',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
