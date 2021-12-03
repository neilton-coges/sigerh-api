import { Router } from 'express';

import { cdsFgsRoutes } from './cdsFgs.routes';

const routes = Router();

routes.use('/cds_fgs', cdsFgsRoutes);

export { routes };
