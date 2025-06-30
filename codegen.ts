import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: ["src/**/*.tsx", "src/**/*.graphql"],
  generates: {
    "src/lib/graphql/generated/": {
      preset: "client",
      plugins: [],
      config: {
        useTypeImports: true,
        fragmentMasking: true
      }
    }
  }
};

export default config;
