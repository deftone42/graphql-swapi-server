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
import { Starship } from '../models/starship.model';
import { personType } from './person';
import { Person } from '../models/person.model';

export const starshipType = new GraphQLObjectType({
  name: 'Starship',
  description: 'A Starship resource is a single transport craft that has hyperdrive capability.',
  fields: {
    name: {
      type: GraphQLString
    },
    model: {
      type: GraphQLString
    },
    starship_class: {
      type: GraphQLString
    },
    manufacturer: {
      type: GraphQLString
    },
    cost_in_credits: {
      type: GraphQLString
    },
    length: {
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
    hyperdrive_rating: {
      type: GraphQLString
    },
    MGLT: {
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
      resolve: (starship: Starship) => getListByUrls<Film>(starship.films),
    },
    pilots: {
      type: new GraphQLList(personType),
      resolve: (starship: Starship) => getListByUrls<Person>(starship.pilots),
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

export const StarshipConnection = getConnection(starshipType);

export const starshipFields = {
  starships: {
    type: StarshipConnection,
    args: {
      search: {
        type: GraphQLString
      }
    },
    resolve: (_, args) => getList<Starship>(Entities.Starships, args.search),
  },
  starship: {
    type: starshipType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the starship.',
      },
    },
    resolve: (_, args) => getObjectById<Starship>(Entities.Starships, args.id),
  },
}
