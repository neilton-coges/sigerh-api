import {
  CorRaca, EstadoCivil, Genero, TipoSanguineo,
} from '../../entities/Servidor';
import { TipoUsuario } from '../../entities/Usuario';
import { AppError } from '../../error/AppError';
import { FakeServidoresRepository } from '../../repositories/fakes/FakeServidoresRepository';
import { FakeUsuariosRepository } from '../../repositories/fakes/FakeUsuariosRepository';
import { CreateUsuarioService } from './CreateUsuarioService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let fakeServidoresRepository: FakeServidoresRepository;
let createUsuarioService: CreateUsuarioService;

describe('CreateUsuario', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    fakeServidoresRepository = new FakeServidoresRepository();
    createUsuarioService = new CreateUsuarioService(
      fakeUsuariosRepository,
      fakeServidoresRepository,
    );
  });

  it('deve ser possível criar um novo usuário', async () => {
    const servidor = await fakeServidoresRepository.create({
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

    const usuario = await createUsuarioService.execute({
      login: 'usuarioLogin',
      senha: 'usuarioPassword',
      tipo: TipoUsuario.ADMIN,
      servidorId: servidor.id,
    });

    expect(usuario).toHaveProperty('id');
  });

  it('não deve ser possível criar um usuário para um servidor inexistente', async () => {
    await expect(
      createUsuarioService.execute({
        login: 'usuarioLogin',
        senha: 'usuarioPassword',
        tipo: TipoUsuario.EDITOR,
        servidorId: 'servidorIdInexistente',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível criar mais de um usuário para o mesmo servidor', async () => {
    const servidor = await fakeServidoresRepository.create({
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

    await createUsuarioService.execute({
      login: 'usuario1Login',
      senha: 'usuario1Password',
      tipo: TipoUsuario.ADMIN,
      servidorId: servidor.id,
    });

    await expect(
      createUsuarioService.execute({
        login: 'usuario2Login',
        senha: 'usuario2Password',
        tipo: TipoUsuario.ADMIN,
        servidorId: servidor.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível criar um usuário com login existente', async () => {
    const servidor1 = await fakeServidoresRepository.create({
      nome: 'servidor1Nome',
      dataNascimento: 'servidor1DataNascimento',
      telefoneCorporativo: 'servidor1TelefoneCorporativo',
      telefonePessoal: 'servidor1TelefonePessoal',
      emailCorporativo: 'servidor1EmailCorporativo',
      emailPessoal: 'servidor1EmailPessoal',
      genero: Genero.MASCULINO,
      tipoSanguineo: TipoSanguineo['A+'],
      corRaca: CorRaca.BRANCA,
      nacionalidade: 'servidor1Nacionalidade',
      naturalidadeCidade: 'servidor1NaturalidadeCidade',
      naturalidadeEstado: 'servidor1NaturalidadeEstado',
      estadoCivil: EstadoCivil.CASADO,
      conjugeNome: 'servidor1ConjugeNome',
      conjugeDataNascimento: 'servidor1ConjugeDataNascimento',
      conjugeCpf: 'servidor1ConjugeCpf',
      nomeMae: 'servidor1NomeMae',
      nomePai: 'servidor1NomePai',
      cpf: 'servidor1Cpf',
      rgNumero: 'servidor1RgNumero',
      rgOrgaoEmissor: 'servidor1RgOrgaoEmissor',
      rgDataEmissao: 'servidor1RgDataEmissao',
      tituloNumero: 'servidor1TituloNumero',
      tituloSecao: 'servidor1TituloSecao',
      tituloZona: 'servidor1TituloZona',
      pis: 'servidor1Pis',
    });

    const servidor2 = await fakeServidoresRepository.create({
      nome: 'servidor2Nome',
      dataNascimento: 'servidor2DataNascimento',
      telefoneCorporativo: 'servidor2TelefoneCorporativo',
      telefonePessoal: 'servidor2TelefonePessoal',
      emailCorporativo: 'servidor2EmailCorporativo',
      emailPessoal: 'servidor2EmailPessoal',
      genero: Genero.MASCULINO,
      tipoSanguineo: TipoSanguineo['A+'],
      corRaca: CorRaca.BRANCA,
      nacionalidade: 'servidor2Nacionalidade',
      naturalidadeCidade: 'servidor2NaturalidadeCidade',
      naturalidadeEstado: 'servidor2NaturalidadeEstado',
      estadoCivil: EstadoCivil.CASADO,
      conjugeNome: 'servidor2ConjugeNome',
      conjugeDataNascimento: 'servidor2ConjugeDataNascimento',
      conjugeCpf: 'servidor2ConjugeCpf',
      nomeMae: 'servidor2NomeMae',
      nomePai: 'servidor2NomePai',
      cpf: 'servidor2Cpf',
      rgNumero: 'servidor2RgNumero',
      rgOrgaoEmissor: 'servidor2RgOrgaoEmissor',
      rgDataEmissao: 'servidor2RgDataEmissao',
      tituloNumero: 'servidor2TituloNumero',
      tituloSecao: 'servidor2TituloSecao',
      tituloZona: 'servidor2TituloZona',
      pis: 'servidor2Pis',
    });

    const usuario1 = await createUsuarioService.execute({
      login: 'usuario1Login',
      senha: 'usuario1Password',
      tipo: TipoUsuario.ADMIN,
      servidorId: servidor1.id,
    });

    await expect(
      createUsuarioService.execute({
        login: usuario1.login,
        senha: 'usuario2Password',
        tipo: TipoUsuario.ADMIN,
        servidorId: servidor2.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
