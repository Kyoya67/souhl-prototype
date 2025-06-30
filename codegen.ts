import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/lib/graphql/schema.graphql",
  documents: ["src/**/*.tsx", "src/**/*.graphql"],
  generates: {
    "src/lib/graphql/generated/": {
      preset: "client",
      plugins: [],
      config: {
        useTypeImports: true,
        fragmentMasking: false
      }
    }
  }
};

export default config;
