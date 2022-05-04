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
      descricao: 'cargoDescricao',
      nivelCargoId: '',
      intervaloProgressao: undefined,
    });

    const cargoUpdated = await updateCargoService.execute({
      id,
      tipo: TipoCargo.COMISSAO,
      descricao: 'cargoDescricaoAtualizado',
      nivelCargoId: '',
      intervaloProgressao: undefined,
    });

    expect(cargoUpdated.descricao).toBe('cargoDescricaoAtualizado');
  });

  it('não deve ser possível atualizar um cargo inexistente', async () => {
    await expect(
      updateCargoService.execute({
        id: 'inexistente',
        tipo: TipoCargo.COMISSAO,
        descricao: 'cargoDescricao',
        nivelCargoId: '',
        intervaloProgressao: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar um cargo com nome já existente', async () => {
    const cargo1 = await fakeCargosRepository.create({
      tipo: TipoCargo.EFETIVO,
      descricao: 'cargo1Descricao',
      nivelCargoId: 'nivelCargoId',
      intervaloProgressao: 2,
    });

    const cargo2 = await fakeCargosRepository.create({
      tipo: TipoCargo.COMISSAO,
      descricao: 'cargo2Descricao',
      nivelCargoId: 'nivelCargoId',
      intervaloProgressao: undefined,
    });

    await expect(updateCargoService.execute({
      ...cargo2,
      descricao: cargo1.descricao,
    })).rejects.toBeInstanceOf(AppError);
  });
});
