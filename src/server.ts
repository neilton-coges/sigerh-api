import 'reflect-metadata';
import express from 'express';

import './config/database';

const app = express();

app.listen(3333, () => console.log('🚀 Server is running on port 3333'));
