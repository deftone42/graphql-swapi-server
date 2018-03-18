import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import { getConnection } from './connection';
import { filmType } from './film';
import { Person } from '../models/person.model';
import { getList, getListByUrls, getObjectById } from '../../api/index';
import { Film } from '../models/film.model';
import { Entities } from '../../api/entities.enum';
import { specieType } from './specie';
import { Specie } from '../models/specie.model';
import { starshipType } from './starship';
import { Starship } from '../models/starship.model';

export const personType = new GraphQLObjectType({
  name: 'Person',
  description: 'A People resource is an individual person or character within the Star Wars universe.',
  fields: {
    name: {
      type: GraphQLString
    },
    height: {
      type: GraphQLString
    },
    mass: {
      type: GraphQLString
    },
    hair_color: {
      type: GraphQLString
    },
    skin_color: {
      type: GraphQLString
    },
    eye_color: {
      type: GraphQLString
    },
    birth_year: {
      type: GraphQLString
    },
    gender: {
      type: GraphQLString
    },
    homeworld: {
      type: GraphQLString
    },
    films: {
      type: new GraphQLList(filmType),
      resolve: (person: Person) => getListByUrls<Film>(person.films)
    },
    species: {
      type: new GraphQLList(GraphQLString)
    },
    vehicles: {
      type: new GraphQLList(GraphQLString)
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

export const PeopleConnection = getConnection(personType);

export const personFields = {
  people: {
    type: PeopleConnection,
    args: {
      search: {
        type: GraphQLString
      }
    },
    resolve: (_, args) => getList<Person>(Entities.People, args.search),
  },
  person: {
    type: personType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the person.',
      },
    },
    resolve: (_, args) => getObjectById<Person>(Entities.People, args.id),
  },
}
