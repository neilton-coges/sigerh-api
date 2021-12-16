import { inject, injectable } from 'tsyringe';

import { Servidor } from '../../entities/Servidor';
import { AppError } from '../../error/AppError';
import { CreateServidorData, IServidoresRepository } from '../../repositories/models/IServidoresRepository';

@injectable()
class CreateServidorService {
  constructor(
    @inject('ServidoresRepository')
    private servidoresRepository: IServidoresRepository,
  ) {}

  async execute({
    nome,
    dataNascimento,
    telefoneCorporativo,
    telefonePessoal,
    emailCorporativo,
    emailPessoal,
    genero,
    tipoSanguineo,
    corRaca,
    nacionalidade,
    naturalidadeCidade,
    naturalidadeEstado,
    estadoCivil,
    conjugeNome,
    conjugeCpf,
    conjugeDataNascimento,
    nomeMae,
    nomePai,
    cpf,
    rgNumero,
    rgOrgaoEmissor,
    rgDataEmissao,
    tituloNumero,
    tituloSecao,
    tituloZona,
    pis,
  }: CreateServidorData): Promise<Servidor> {
    const servidorCpfExists = await this.servidoresRepository.findByCpf(cpf);

    if (servidorCpfExists) {
      throw new AppError('Já existe um servidor com este CPF cadastrado.');
    }

    const servidorEmailPessoalExists = await this.servidoresRepository.findByEmail(emailPessoal);

    if (servidorEmailPessoalExists) {
      throw new AppError('Já existe um servidor com este e-mail pessoal cadastrado.');
    }

    if (emailCorporativo) {
      const servidorEmailCorporativoExists = await this.servidoresRepository
        .findByEmail(emailCorporativo);

      if (servidorEmailCorporativoExists) {
        throw new AppError('Já existe um servidor com este e-mail corporativo cadastrado.');
      }
    }

    const servidor = await this.servidoresRepository.create({
      nome,
      dataNascimento,
      telefoneCorporativo,
      telefonePessoal,
      emailCorporativo,
      emailPessoal,
      genero,
      tipoSanguineo,
      corRaca,
      nacionalidade,
      naturalidadeCidade,
      naturalidadeEstado,
      estadoCivil,
      conjugeNome,
      conjugeCpf,
      conjugeDataNascimento,
      nomeMae,
      nomePai,
      cpf,
      rgNumero,
      rgOrgaoEmissor,
      rgDataEmissao,
      tituloNumero,
      tituloSecao,
      tituloZona,
      pis,
    });

    return servidor;
  }
}

export { CreateServidorService };
