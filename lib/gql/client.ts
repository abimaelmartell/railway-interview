import { GraphQLClient } from 'graphql-request'

export const railwayApi = new GraphQLClient('https://backboard.railway.app/graphql/v2', {
  headers: {
    Authorization: `Bearer ${process.env.RAILWAY_API_TOKEN}`,
  },
})

export default railwayApi
