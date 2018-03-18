import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';

import { getConnection } from './connection';
import { Entities } from '../../api/entities.enum';
import { Film } from '../models/film.model';
import { getList, getObjectById } from '../../api/index';

export const filmType = new GraphQLObjectType({
  name: 'Film',
  description: 'A Film resource is a single film.',
  fields: {
    title: {
      type: GraphQLString
    },
    episode_id: {
      type: GraphQLInt
    },
    opening_crawl: {
      type: GraphQLString
    },
    director: {
      type: GraphQLString
    },
    producer: {
      type: GraphQLString
    },
    release_date: {
      type: GraphQLString
    },
    species: {
      type: new GraphQLList(GraphQLString)
    },
    starships: {
      type: new GraphQLList(GraphQLString)
    },
    vehicles: {
      type: new GraphQLList(GraphQLString)
    },
    characters: {
      type: new GraphQLList(GraphQLString)
    },
    planets: {
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

export const FilmConnection = getConnection(filmType);

export const filmFields = {
  films: {
    type: FilmConnection,
    args: {
      search: {
        type: GraphQLString
      }
    },
    resolve: (_, args) => getList<Film>(Entities.Films, args.search),
  },
  film: {
    type: filmType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the film.',
      },
    },
    resolve: (_, args) => getObjectById<Film>(Entities.Films, args.id),
  },
}
