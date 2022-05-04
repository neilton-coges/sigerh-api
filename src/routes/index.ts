import { Router } from 'express';

import { cdsFgsRoutes } from './cdsFgs.routes';
import { niveisCargosRoutes } from './niveisCargos.routes';
import { cargosRoutes } from './cargos.routes';
import { unidadesRoutes } from './unidades.routes';
import { jornadasRoutes } from './jornadas.routes';
import { servidoresRoutes } from './servidores.routes';
import { nomeacoesRoutes } from './nomeacoes.routes';
import { usuariosRoutes } from './usuarios.routes';
import { sessoesRoutes } from './sessoes.routes';
import { progressoesRoutes } from './progressoes.routes';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/cds_fgs', ensureAuthenticated, cdsFgsRoutes);
routes.use('/niveis_cargos', ensureAuthenticated, niveisCargosRoutes);
routes.use('/cargos', ensureAuthenticated, cargosRoutes);
routes.use('/unidades', ensureAuthenticated, unidadesRoutes);
routes.use('/jornadas', ensureAuthenticated, jornadasRoutes);
routes.use('/servidores', ensureAuthenticated, servidoresRoutes);
routes.use('/nomeacoes', ensureAuthenticated, nomeacoesRoutes);
routes.use('/usuarios', ensureAuthenticated, usuariosRoutes);
routes.use('/sessoes', sessoesRoutes);
routes.use('/progressoes', progressoesRoutes);

export { routes };
