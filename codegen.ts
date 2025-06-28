import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/schema.graphql",
  documents: ["src/**/*.tsx", "src/**/*.graphql"],
  generates: {
    "src/graphql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
