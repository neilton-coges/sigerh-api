import { ValueTransformer } from 'typeorm';

const numberTransformer: ValueTransformer = {
  to: (data: number) => data,
  from: (data: string) => parseFloat(data),
};

export { numberTransformer };
