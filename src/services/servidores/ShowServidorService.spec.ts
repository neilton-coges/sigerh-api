import {
  CorRaca, EstadoCivil, Genero, TipoSanguineo,
} from '../../entities/Servidor';
import { AppError } from '../../error/AppError';
import { FakeServidoresRepository } from '../../repositories/fakes/FakeServidoresRepository';
import { ShowServidorService } from './ShowServidorService';

let fakeServidoresRepository: FakeServidoresRepository;
let showServidorService: ShowServidorService;

describe('ShowServidor', () => {
  beforeEach(() => {
    fakeServidoresRepository = new FakeServidoresRepository();
    showServidorService = new ShowServidorService(fakeServidoresRepository);
  });

  it('deve ser possível mostrar um servidor', async () => {
    const servidorCreated = await fakeServidoresRepository.create({
      nome: 'servidorNome',
      dataNascimento: 'servidorDataNascimento',
      telefoneCorporativo: 'servidorTelefoneCorporativo',
      telefonePessoal: 'servidorTelefonePessoal',
      emailCorporativo: 'servidorEmailCorporativo',
      emailPessoal: 'servidorEmailPessoal',
      genero: Genero.MASCULINO,
      tipoSanguineo: TipoSanguineo['A+'],
      corRaca: CorRaca.BRANCA,
      nacionalidade: 'servidorNacionalidade',
      naturalidadeCidade: 'servidorNaturalidadeCidade',
      naturalidadeEstado: 'servidorNaturalidadeEstado',
      estadoCivil: EstadoCivil.CASADO,
      conjugeNome: 'servidorConjugeNome',
      conjugeDataNascimento: 'servidorConjugeDataNascimento',
      conjugeCpf: 'servidorConjugeCpf',
      nomeMae: 'servidorNomeMae',
      nomePai: 'servidorNomePai',
      cpf: 'servidorCpf',
      rgNumero: 'servidorRgNumero',
      rgOrgaoEmissor: 'servidorRgOrgaoEmissor',
      rgDataEmissao: 'servidorRgDataEmissao',
      tituloNumero: 'servidorTituloNumero',
      tituloSecao: 'servidorTituloSecao',
      tituloZona: 'servidorTituloZona',
      pis: 'servidorPis',
    });

    const servidorReturned = await showServidorService.execute(servidorCreated.id);

    expect(servidorCreated).toEqual(servidorReturned);
  });

  it('não deve ser possível mostrar um servidor inexistente', async () => {
    await expect(
      showServidorService.execute('inexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
