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
import { Planet } from '../models/planet.model';
import { personType } from './person';
import { Person } from '../models/person.model';

export const planetType = new GraphQLObjectType({
  name: 'Planet',
  description: 'A Planet resource is a large mass, planet or planetoid in the Star Wars Universe, at the time of 0 ABY.',
  fields: {
    name: {
      type: GraphQLString
    },
    rotation_period: {
      type: GraphQLString
    },
    orbital_period: {
      type: GraphQLString
    },
    diameter: {
      type: GraphQLString
    },
    climate: {
      type: GraphQLString
    },
    gravity: {
      type: GraphQLString
    },
    terrain: {
      type: GraphQLString
    },
    surface_water: {
      type: GraphQLString
    },
    population: {
      type: GraphQLString
    },
    films: {
      type: new GraphQLList(filmType),
      resolve: (planet: Planet) => getListByUrls<Film>(planet.films),
    },
    residents: {
      type: new GraphQLList(personType),
      resolve: (planet: Planet) => getListByUrls<Person>(planet.residents),
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

export const PlanetConnection = getConnection(planetType);

export const planetFields = {
  planets: {
    type: PlanetConnection,
    args: {
      search: {
        type: GraphQLString
      }
    },
    resolve: (_, args) => getList<Planet>(Entities.Planets, args.search),
  },
  planet: {
    type: planetType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the planet.',
      },
    },
    resolve: (_, args) => getObjectById<Planet>(Entities.Planets, args.id),
  },
}
