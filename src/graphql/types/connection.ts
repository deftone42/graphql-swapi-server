import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

export const getConnection = (type) => {
  return new GraphQLObjectType({
    name: type + 'Connection',
    fields: {
      count: {
        type: GraphQLInt
      },
      next: {
        type: GraphQLString,
        description: 'Next page of results'
      },
      previous: {
        type: GraphQLString,
        description: 'Previous page of results'
      },
      results: {
        type: new GraphQLList(type),
        description: 'List of results'
      },
    }
  });
}
