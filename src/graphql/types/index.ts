import { personFields } from './person';
import { filmFields } from './film';
import { starshipFields } from './starship';
import { planetFields } from './planet';
import { vehicleFields } from './vehicle';
import { specieFields } from './specie';

export const fields = {
  ...personFields,
  ...filmFields,
  ...starshipFields,
  ...planetFields,
  ...vehicleFields,
  ...specieFields,
};
