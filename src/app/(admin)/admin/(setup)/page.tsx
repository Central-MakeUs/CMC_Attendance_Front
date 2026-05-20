import { gql } from '@/gql';
import { gqlClient } from '@/lib/graphql/server';
import { getAccessToken } from '@/lib/cookies/server';
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
  const generations = await getGenerations();

  return <SetupView generations={generations} />;
}
