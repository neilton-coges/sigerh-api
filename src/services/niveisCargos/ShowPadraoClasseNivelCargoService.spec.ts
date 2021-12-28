import { AppError } from '../../error/AppError';
import {
  FakePadroesClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakePadroesClassesNiveisCargosRepository';
import {
  ShowPadraoClasseNivelCargoService,
} from './ShowPadraoClasseNivelCargoService';

let fakePadroesClassesNiveisCargosRepository: FakePadroesClassesNiveisCargosRepository;
let showPadraoClasseNivelCargoService: ShowPadraoClasseNivelCargoService;

describe('ShowPadraoClasseNivelCargo', () => {
  beforeEach(() => {
    fakePadroesClassesNiveisCargosRepository = new FakePadroesClassesNiveisCargosRepository();
    showPadraoClasseNivelCargoService = new ShowPadraoClasseNivelCargoService(
      fakePadroesClassesNiveisCargosRepository,
    );
  });

  it('deve ser possível mostrar um padrão de classe', async () => {
    const padraoClasseNivelCargoCreated = await fakePadroesClassesNiveisCargosRepository.create({
      codigo: 'padraoClasseNivelCargoCodigo',
      descricao: 'padraoClasseNivelCargoDescricao',
      valor: 2000,
      classeNivelCargoId: 'classeNivelCargoId',
    });

    const padraoClasseNivelCargo = await showPadraoClasseNivelCargoService.execute(
      padraoClasseNivelCargoCreated.id,
    );

    expect(padraoClasseNivelCargo).toEqual(padraoClasseNivelCargoCreated);
  });

  it('não deve ser possível mostrar um padrão de classe inexistente', async () => {
    await expect(
      showPadraoClasseNivelCargoService.execute(
        'padraoClasseNivelCargoCreatedIdInexistente',
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
