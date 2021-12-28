import { AppError } from '../../error/AppError';
import {
  FakeNiveisCargosRepository,
} from '../../repositories/fakes/FakeNiveisCargosRepository';
import { CreateNivelCargoService } from './CreateNivelCargoService';

let fakeNiveisCargosRepository: FakeNiveisCargosRepository;
let createNivelCargoService: CreateNivelCargoService;

describe('CreateNivelCargo', () => {
  beforeEach(() => {
    fakeNiveisCargosRepository = new FakeNiveisCargosRepository();
    createNivelCargoService = new CreateNivelCargoService(fakeNiveisCargosRepository);
  });

  it('deve ser possível criar um novo nível de cargo', async () => {
    const nivelCargo = await createNivelCargoService.execute({
      codigo: 'nivelCargoCodigo',
      descricao: 'nivelCargoDescricao',
    });

    expect(nivelCargo).toHaveProperty('id');
  });

  it('não deve ser possível criar um novo nível de cargo com código existente', async () => {
    const nivelCargo1 = await createNivelCargoService.execute({
      codigo: 'nivelCargo1Codigo',
      descricao: 'nivelCargo1Descricao',
    });

    await expect(
      createNivelCargoService.execute({
        codigo: nivelCargo1.codigo,
        descricao: 'nivelCargo2Descricao',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
