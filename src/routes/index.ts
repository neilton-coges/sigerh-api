import { Router } from 'express';

import { cdsFgsRoutes } from './cdsFgs.routes';
import { niveisCargosRoutes } from './niveisCargos.routes';
import { cargosRoutes } from './cargos.routes';
import { unidadesRoutes } from './unidades.routes';
import { jornadasRoutes } from './jornadas.routes';
import { servidoresRoutes } from './servidores.routes';
import { nomeacoesRoutes } from './nomeacoes.routes';

const routes = Router();

routes.use('/cds_fgs', cdsFgsRoutes);
routes.use('/niveis_cargos', niveisCargosRoutes);
routes.use('/cargos', cargosRoutes);
routes.use('/unidades', unidadesRoutes);
routes.use('/jornadas', jornadasRoutes);
routes.use('/servidores', servidoresRoutes);
routes.use('/nomeacoes', nomeacoesRoutes);

export { routes };
