import { gql } from '@/gql';
import { gqlClient } from '@/lib/graphql/server';
import { getAccessToken } from '@/lib/cookies/server';
import { verifySession } from '@/lib/dal';
import SetupView from './_components/SetupView';

const GenerationsQuery = gql(`
  query Generations {
    generations {
      id
      number
    }
  }
`);

async function getGenerations() {
  const accessToken = await getAccessToken();

  if (!accessToken) return [];

  try {
    const data = await gqlClient.request(GenerationsQuery, undefined, {
      Authorization: `Bearer ${accessToken}`,
    });
    return data.generations;
  } catch {
    return [];
  }
}

export default async function SetupPage() {
  const [generations, session] = await Promise.all([
    getGenerations(),
    verifySession(),
  ]);

  return (
    <SetupView generations={generations} isRoot={session?.role === 'ROOT'} />
  );
}
