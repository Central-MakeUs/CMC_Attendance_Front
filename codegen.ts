import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as loadEnv } from 'dotenv';
import { execSync } from 'child_process';

loadEnv({ path: '.env.local' });

try {
  execSync(`curl -sf "${process.env.API_BASE_URL}/scheme" -o schema.graphql`);
} catch {}

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/gql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
