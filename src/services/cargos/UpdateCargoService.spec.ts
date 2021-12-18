import { TipoCargo } from '../../entities/Cargo';
import { AppError } from '../../error/AppError';
import { FakeCargosRepository } from '../../repositories/fakes/FakeCargosRepository';
import { UpdateCargoService } from './UpdateCargoService';

let fakeCargosRepository: FakeCargosRepository;
let updateCargoService: UpdateCargoService;

describe('UpdateCargo', () => {
  beforeEach(() => {
    fakeCargosRepository = new FakeCargosRepository();
    updateCargoService = new UpdateCargoService(fakeCargosRepository);
  });

  it('deve ser possivel atualizar um cargo', async () => {
    const { id } = await fakeCargosRepository.create({
      tipo: TipoCargo.FUNCAO_GRATIFICADA,
      nome: 'cargoNome',
    });

    const cargoUpdated = await updateCargoService.execute({
      id,
      tipo: TipoCargo.COMISSAO,
      nome: 'cargoNomeAtualizado',
    });

    expect(cargoUpdated.nome).toBe('cargoNomeAtualizado');
  });

  it('não deve ser possível atualizar um cargo inexistente', async () => {
    await expect(
      updateCargoService.execute({
        id: 'inexistente',
        tipo: TipoCargo.COMISSAO,
        nome: 'cargoNome',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar um cargo com nome já existente', async () => {
    const cargo1 = await fakeCargosRepository.create({
      tipo: TipoCargo.EFETIVO,
      nome: 'cargo1Nome',
    });

    const cargo2 = await fakeCargosRepository.create({
      tipo: TipoCargo.COMISSAO,
      nome: 'cargo2Nome',
    });

    await expect(updateCargoService.execute({
      ...cargo2,
      nome: cargo1.nome,
    })).rejects.toBeInstanceOf(AppError);
  });
});
