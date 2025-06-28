import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
})

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        typePolicies: {
            Product: {
                fields: {
                    // 必要に応じてキャッシュポリシーを設定
                },
            },
        },
    }),
    // 開発時のデバッグを有効化
    connectToDevTools: true,
}) 