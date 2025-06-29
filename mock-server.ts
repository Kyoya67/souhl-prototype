import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

let products = [
  { id: '1', name: 'MacBook Pro', price: 299999, description: 'The latest MacBook Pro' },
  { id: '2', name: 'iPhone 15', price: 124800, description: 'The latest iPhone' },
  { id: '3', name: 'AirPods Pro', price: 39800, description: 'Noise-cancelling' },
  { id: '4', name: 'Apple Watch', price: 69800, description: 'Support for health and fitness' },
  { id: '5', name: 'iPad Pro', price: 129800, description: '最速のiPad' },
]

type Product = {
  id: string
  name: string
  price: number
  description: string
  category: string
}

type CreateProductInput = {
  name: string
  price: number
  description: string
}

const typeDefs = /* GraphQL */ `
  type Product {
    id: ID!
    name: String!
    price: Int!
    description: String!
    category: String!
  }

  input CreateProductInput {
    name: String!
    price: Int!
    description: String!
  }

  type Query {
    product(id: ID!): Product
    products: [Product!]!
    productCount: Int!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
  }
`

const resolvers = {
  Product: {
    category: (parent: Product) => {
      if (parent.name.includes('MacBook') || parent.name.includes('iPad')) return 'Computer'
      if (parent.name.includes('iPhone')) return 'Smartphone'
      if (parent.name.includes('Watch')) return 'Wearable'
      return 'Other'
    }
  },
  Query: {
    product: (_: unknown, { id }: { id: string }) => {
      return products.find(product => product.id === id)
    },
    products: () => {
      return products
    },
    productCount: () => {
      return products.length
    },
  },
  Mutation: {
    createProduct: (_: unknown, { input }: { input: CreateProductInput }) => {
      const newProduct = { ...input, id: String(products.length + 1) }
      products.push(newProduct)
      return newProduct
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
})

startStandaloneServer(server, {}).then(({ url }) => {
  console.log('🚀 Apollo Server running on ' + url)
})