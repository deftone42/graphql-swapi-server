import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import { getConnection } from './connection';
import { filmType } from './film';
import { Specie } from '../models/specie.model';
import { getList, getListByUrls, getObjectById, getObjectByUrl } from '../../api/index';
import { Film } from '../models/film.model';
import { Entities } from '../../api/entities.enum';
import { personType } from './person';
import { Person } from '../models/person.model';
import { planetType } from './planet';
import { Planet } from '../models/planet.model';

export const specieType = new GraphQLObjectType({
  name: 'Specie',
  description: 'A Species resource is a type of specie or character within the Star Wars Universe.',
  fields: {
    name: {
      type: GraphQLString
    },
    classification: {
      type: GraphQLString
    },
    designation: {
      type: GraphQLString
    },
    average_height: {
      type: GraphQLString
    },
    average_lifespan: {
      type: GraphQLString
    },
    eye_color: {
      type: GraphQLString
    },
    hair_colors: {
      type: GraphQLString
    },
    skin_colors: {
      type: GraphQLString
    },
    language: {
      type: GraphQLString
    },
    homeworld: {
      type: planetType,
      resolve: (specie: Specie) => getObjectByUrl<Planet>(specie.homeworld),
    },
    people: {
      type: new GraphQLList(personType),
      resolve: (specie: Specie) => getListByUrls<Person>(specie.people),
    },
    films: {
      type: new GraphQLList(filmType),
      resolve: (specie: Specie) => getListByUrls<Film>(specie.films),
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

export const SpecieConnection = getConnection(specieType);

export const specieFields = {
  species: {
    type: SpecieConnection,
    args: {
      search: {
        type: GraphQLString
      }
    },
    resolve: (_, args) => getList<Specie>(Entities.Species, args.search),
  },
  specie: {
    type: specieType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the specie.',
      },
    },
    resolve: (_, args) => getObjectById<Specie>(Entities.Species, args.id),
  },
}
