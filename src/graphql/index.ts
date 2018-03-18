import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { fields } from './types/index';

export const baseUrl = 'https://swapi.co/api/';

export const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: fields,
});

export const schema = new GraphQLSchema({
  query: queryType
});
