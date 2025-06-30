/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment ProductDialogResult on Product {\n    id\n    name\n    price\n    description\n  }\n": typeof types.ProductDialogResultFragmentDoc,
    "\n  fragment ProductTableItem on Product {\n    id\n    name\n    price\n    description\n  }\n": typeof types.ProductTableItemFragmentDoc,
    "fragment ProductInfo on Product {\n  id\n  name\n  price\n  description\n}": typeof types.ProductInfoFragmentDoc,
    "\n  query GetProducts {\n    products {\n      ...ProductTableItem\n    }\n  }\n  \n": typeof types.GetProductsDocument,
    "\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      ...ProductDialogResult\n    }\n  }\n  \n": typeof types.CreateProductDocument,
};
const documents: Documents = {
    "\n  fragment ProductDialogResult on Product {\n    id\n    name\n    price\n    description\n  }\n": types.ProductDialogResultFragmentDoc,
    "\n  fragment ProductTableItem on Product {\n    id\n    name\n    price\n    description\n  }\n": types.ProductTableItemFragmentDoc,
    "fragment ProductInfo on Product {\n  id\n  name\n  price\n  description\n}": types.ProductInfoFragmentDoc,
    "\n  query GetProducts {\n    products {\n      ...ProductTableItem\n    }\n  }\n  \n": types.GetProductsDocument,
    "\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      ...ProductDialogResult\n    }\n  }\n  \n": types.CreateProductDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductDialogResult on Product {\n    id\n    name\n    price\n    description\n  }\n"): (typeof documents)["\n  fragment ProductDialogResult on Product {\n    id\n    name\n    price\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductTableItem on Product {\n    id\n    name\n    price\n    description\n  }\n"): (typeof documents)["\n  fragment ProductTableItem on Product {\n    id\n    name\n    price\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductInfo on Product {\n  id\n  name\n  price\n  description\n}"): (typeof documents)["fragment ProductInfo on Product {\n  id\n  name\n  price\n  description\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts {\n    products {\n      ...ProductTableItem\n    }\n  }\n  \n"): (typeof documents)["\n  query GetProducts {\n    products {\n      ...ProductTableItem\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      ...ProductDialogResult\n    }\n  }\n  \n"): (typeof documents)["\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      ...ProductDialogResult\n    }\n  }\n  \n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;