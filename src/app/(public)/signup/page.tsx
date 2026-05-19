import { gql } from '@/gql';
import { gqlClient } from '@/lib/gql-client';
import type { Part } from '@/gql/graphql';
import SignupFunnel from './_components/SignupFunnel';

const PartsQueryDoc = gql(`
  query Parts {
    parts
  }
`);

export default async function SignupPage() {
  let parts: Part[] = [];
  try {
    const data = await gqlClient.request(PartsQueryDoc);
    parts = data.parts;
  } catch {
    parts = ['PM', 'Designer', 'Web', 'iOS', 'Android', 'Flutter', 'Server'];
  }

  return <SignupFunnel parts={parts} />;
}
