import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import { getConnection } from './connection';
import { filmType } from './film';
import { getList, getListByUrls, getObjectById } from '../../api/index';
import { Film } from '../models/film.model';
import { Entities } from '../../api/entities.enum';
import { Vehicle, Vehicle } from '../models/vehicle.model';
import { personType } from './person';
import { Person } from '../models/person.model';

export const vehicleType = new GraphQLObjectType({
  name: 'Vehicle',
  description: 'A Vehicle resource is a single transport craft that does not have hyperdrive capability.',
  fields: {
    name: {
      type: GraphQLString
    },
    model: {
      type: GraphQLString
    },
    vehicle_class: {
      type: GraphQLString
    },
    manufacturer: {
      type: GraphQLString
    },
    length: {
      type: GraphQLString
    },
    cost_in_credits: {
      type: GraphQLString
    },
    crew: {
      type: GraphQLString
    },
    passengers: {
      type: GraphQLString
    },
    max_atmosphering_speed: {
      type: GraphQLString
    },
    cargo_capacity: {
      type: GraphQLString
    },
    consumables: {
      type: GraphQLString
    },
    films: {
      type: new GraphQLList(filmType),
      resolve: (vehicle: Vehicle) => getListByUrls<Film>(vehicle.films),
    },
    pilots: {
      type: new GraphQLList(personType),
      resolve: (vehicle: Vehicle) => getListByUrls<Person>(vehicle.pilots),
    },
    created: {
      type: GraphQLString
    },
    edited: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
  },
});

export const VehicleConnection = getConnection(vehicleType);

export const vehicleFields = {
  vehicles: {
    type: VehicleConnection,
    args: {
      search: {
        type: GraphQLString
      }
    },
    resolve: (_, args) => getList<Vehicle>(Entities.Vehicles, args.search),
  },
  vehicle: {
    type: vehicleType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the vehicle.',
      },
    },
    resolve: (_, args) => getObjectById<Vehicle>(Entities.Vehicles, args.id),
  },
}
