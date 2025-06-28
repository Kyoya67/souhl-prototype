import { createServer } from 'node:http'
import { createYoga, createSchema } from 'graphql-yoga'

// モックデータ
let products = [
    { id: '1', name: 'MacBook Pro', price: 299999, description: '最新のMacBook Pro' },
    { id: '2', name: 'iPhone 15', price: 124800, description: '最新のiPhone' },
    { id: '3', name: 'AirPods Pro', price: 39800, description: 'ノイズキャンセリング対応' },
]

// GraphQLスキーマとリゾルバー
const schema = createSchema({
    typeDefs: /* GraphQL */ `
      type Product {
        id: ID!
        name: String!
        price: Int!
        description: String!
      }

      input CreateProductInput {
        name: String!
        price: Int!
        description: String!
      }

      type Query {
        products: [Product!]!
        product(id: ID!): Product
      }

      type Mutation {
        createProduct(input: CreateProductInput!): Product!
      }
    `,
    resolvers: {
        Query: {
            products: () => products,
            product: (_, { id }) => products.find(p => p.id === id),
        },
        Mutation: {
            createProduct: (_, { input }) => {
                const newProduct = {
                    id: String(products.length + 1),
                    ...input,
                }
                products.push(newProduct)
                return newProduct
            },
        },
    },
})

// Yogaサーバー作成
const yoga = createYoga({
    schema,
    graphiql: true, // GraphiQLを有効化
    cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
    },
})

// サーバー起動
const server = createServer(yoga)

server.listen(4000, () => {
    console.log('🚀 Mock GraphQL Server running on http://localhost:4000/graphql')
    console.log('📊 GraphiQL interface: http://localhost:4000/graphql')
}) 