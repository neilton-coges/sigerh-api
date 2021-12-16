import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateServidorService } from '../services/servidores/CreateServidorService';
import { DestroyServidorService } from '../services/servidores/DestroyServidorService';
import { ListServidorService } from '../services/servidores/ListServidorService';
import { PaginateServidorService } from '../services/servidores/PaginateServidorService';
import { ShowServidorService } from '../services/servidores/ShowServidorService';
import { UpdateServidorService } from '../services/servidores/UpdateServidorService';

type IndexRequestQuery = {
  cpf?: string;
  nome?: string;
  isPaginate?: boolean;
  perPage?: number;
  current?: number;
}

class ServidoresController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      cpf, nome, isPaginate, perPage, current,
    } = request.query as IndexRequestQuery;

    if (isPaginate) {
      const paginateServidorService = container.resolve(PaginateServidorService);

      const page = await paginateServidorService.execute({
        cpf,
        nome,
        current,
        perPage,
      });

      return response.json(page);
    }
    const listServidorService = container.resolve(ListServidorService);

    const servidores = await listServidorService.execute({
      cpf,
      nome,
    });

    return response.json(servidores);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showServidorService = container.resolve(ShowServidorService);

    const servidor = await showServidorService.execute(id);

    return response.json(servidor);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createServidorService = container.resolve(CreateServidorService);

    const servidor = await createServidorService.execute({
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

    return response.status(201).json(servidor);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
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
    } = request.body;

    const updateServidorService = container.resolve(UpdateServidorService);

    const servidor = await updateServidorService.execute({
      id,
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

    return response.json(servidor);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const destroyServidorService = container.resolve(DestroyServidorService);

    await destroyServidorService.execute(id);

    return response.json();
  }
}

export { ServidoresController };
