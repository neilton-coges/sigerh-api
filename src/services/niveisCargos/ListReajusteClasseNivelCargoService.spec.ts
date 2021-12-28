import {
  FakeReajustesClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakeReajustesClassesNiveisCargosRepository';
import {
  ListReajusteClasseNivelCargoService,
} from './ListReajusteClasseNivelCargoService';

let fakeReajustesClassesNiveisCargosRepository: FakeReajustesClassesNiveisCargosRepository;
let listReajusteClasseNivelCargoService: ListReajusteClasseNivelCargoService;

describe('ListReajusteClasseNivelCargo', () => {
  beforeEach(() => {
    fakeReajustesClassesNiveisCargosRepository = new FakeReajustesClassesNiveisCargosRepository();
    listReajusteClasseNivelCargoService = new ListReajusteClasseNivelCargoService(
      fakeReajustesClassesNiveisCargosRepository,
    );
  });

  it('deve ser capaz de listar reajustes de uma classe', async () => {
    const reajusteClasseNivelCargo1 = await fakeReajustesClassesNiveisCargosRepository.create({
      percentual: 3,
      observacao: '',
      classeNivelCargoId: 'classeNivelCargoId',
    });

    const reajusteClasseNivelCargo2 = await fakeReajustesClassesNiveisCargosRepository.create({
      percentual: 2,
      observacao: '',
      classeNivelCargoId: 'classeNivelCargoId',
    });

    const list = await listReajusteClasseNivelCargoService.execute('classeNivelCargoId');

    expect(list).toEqual([reajusteClasseNivelCargo1, reajusteClasseNivelCargo2]);
  });
});
