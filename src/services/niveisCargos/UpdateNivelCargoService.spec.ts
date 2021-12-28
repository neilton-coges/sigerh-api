import { AppError } from '../../error/AppError';
import {
  FakeNiveisCargosRepository,
} from '../../repositories/fakes/FakeNiveisCargosRepository';
import { UpdateNivelCargoService } from './UpdateNivelCargoService';

let fakeNiveisCargosRepository: FakeNiveisCargosRepository;
let updateNiveisCargosService: UpdateNivelCargoService;

describe('UpdateNivelCargo', () => {
  beforeEach(() => {
    fakeNiveisCargosRepository = new FakeNiveisCargosRepository();
    updateNiveisCargosService = new UpdateNivelCargoService(fakeNiveisCargosRepository);
  });

  it('deve ser possível atualizar um nível de cargo', async () => {
    const nivelCargo = await fakeNiveisCargosRepository.create({
      codigo: 'nivelCargoCodigo',
      descricao: 'nivelCargoDescricao',
    });

    const nivelCargoUpdated = await updateNiveisCargosService.execute({
      ...nivelCargo,
      descricao: 'nivelCargoDescricaoAtualizada',
    });

    expect(nivelCargoUpdated.descricao).toBe('nivelCargoDescricaoAtualizada');
  });

  it('não deve ser possível atualizar um nível de cargo inexistente', async () => {
    await expect(
      updateNiveisCargosService.execute({
        id: 'nivelCargoInexistenteId',
        codigo: 'nivelCargoInexistenteCodigo',
        descricao: 'nivelCargoInexistenteDescricao',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar um nível de cargo com código existente', async () => {
    const nivelCargo1 = await fakeNiveisCargosRepository.create({
      codigo: 'nivelCargo1Codigo',
      descricao: 'nivelCargo1Descricao',
    });

    const nivelCargo2 = await fakeNiveisCargosRepository.create({
      codigo: 'nivelCargo2Codigo',
      descricao: 'nivelCargo2Descricao',
    });

    await expect(
      updateNiveisCargosService.execute({
        ...nivelCargo1,
        codigo: nivelCargo2.codigo,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
