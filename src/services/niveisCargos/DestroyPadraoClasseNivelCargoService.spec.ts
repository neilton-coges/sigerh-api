import { AppError } from '../../error/AppError';
import {
  FakePadroesClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakePadroesClassesNiveisCargosRepository';
import {
  DestroyPadraoClasseNivelCargoService,
} from './DestroyPadraoClasseNivelCargoService';

let fakePadroesClassesNiveisCargosRepository: FakePadroesClassesNiveisCargosRepository;
let destroyPadraoClasseNivelCargoService: DestroyPadraoClasseNivelCargoService;

describe('DestroyPadraoClasseNivelCargo', () => {
  beforeEach(() => {
    fakePadroesClassesNiveisCargosRepository = new FakePadroesClassesNiveisCargosRepository();
    destroyPadraoClasseNivelCargoService = new DestroyPadraoClasseNivelCargoService(
      fakePadroesClassesNiveisCargosRepository,
    );
  });

  it('deve ser possível remover uma padrão de classe', async () => {
    const padraoClasseNivelCargo = await fakePadroesClassesNiveisCargosRepository.create({
      codigo: 'padraoClasseNivelCargoCodigo',
      descricao: 'padraoClasseNivelCargoDescricao',
      valor: 12313,
      classeNivelCargoId: 'classeNivelCargo',
    });

    const destroy = jest.spyOn(fakePadroesClassesNiveisCargosRepository, 'destroy');

    await destroyPadraoClasseNivelCargoService.execute(padraoClasseNivelCargo.id);

    expect(destroy).toHaveBeenCalledWith(padraoClasseNivelCargo.id);
  });

  it('não deve ser possível remover uma padrão de classe inexistente', async () => {
    await expect(
      destroyPadraoClasseNivelCargoService.execute('padraoClasseNivelCargoIdInexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
