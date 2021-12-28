import { AppError } from '../../error/AppError';
import {
  FakePadroesClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakePadroesClassesNiveisCargosRepository';
import {
  FakeReajustesClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakeReajustesClassesNiveisCargosRepository';
import {
  DestroyReajusteClasseNivelCargoService,
} from './DestroyReajusteClasseNivelCargoService';

let fakeReajustesClassesNiveisCargosRepository: FakeReajustesClassesNiveisCargosRepository;
let fakePadroesClassesNiveisCargosRepository: FakePadroesClassesNiveisCargosRepository;
let destroyReajusteClasseNivelCargoService: DestroyReajusteClasseNivelCargoService;

describe('DestroyReajsuteClasseNivelCargo', () => {
  beforeEach(() => {
    fakeReajustesClassesNiveisCargosRepository = new FakeReajustesClassesNiveisCargosRepository();
    fakePadroesClassesNiveisCargosRepository = new FakePadroesClassesNiveisCargosRepository();
    destroyReajusteClasseNivelCargoService = new DestroyReajusteClasseNivelCargoService(
      fakeReajustesClassesNiveisCargosRepository,
      fakePadroesClassesNiveisCargosRepository,
    );
  });

  it('deve ser possível remover um reajuste de uma classe', async () => {
    await fakePadroesClassesNiveisCargosRepository.create({
      codigo: 'padraoClasseNivelCargo1Codigo',
      descricao: 'padraoClasseNivelCargo1Descricao',
      valor: 2300,
      classeNivelCargoId: 'classeNivelCargoId',
    });

    await fakePadroesClassesNiveisCargosRepository.create({
      codigo: 'padraoClasseNivelCargo2Codigo',
      descricao: 'padraoClasseNivelCargo2Descricao',
      valor: 4300,
      classeNivelCargoId: 'classeNivelCargoId',
    });

    const reajusteClasseNivelCargo = await fakeReajustesClassesNiveisCargosRepository.create({
      percentual: 3,
      observacao: 'reajusteClasseNivelCargoObservacao',
      classeNivelCargoId: 'classeNivelCargoId',
    });

    const destroy = jest.spyOn(fakeReajustesClassesNiveisCargosRepository, 'destroy');

    await destroyReajusteClasseNivelCargoService.execute(reajusteClasseNivelCargo.id);

    expect(destroy).toHaveBeenCalledWith(reajusteClasseNivelCargo.id);
  });

  it('não deve ser possível remover um reajuste inexistente', async () => {
    await expect(
      destroyReajusteClasseNivelCargoService.execute(
        'reajusteClasseNivelCargoIdInexistente',
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
