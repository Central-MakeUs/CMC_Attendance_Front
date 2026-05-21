import { Suspense } from 'react';
import { gql } from '@/gql';
import { gqlClient } from '@/lib/graphql/server';
import { getAccessToken } from '@/lib/cookies/server';
import Sidebar from './_components/Sidebar';

const GenerationsDocument = gql(`
  query Generations {
    generations {
      id
      number
      startDate
      endDate
    }
  }
`);

async function getGenerations() {
  const accessToken = await getAccessToken();

  if (!accessToken) return [];

  try {
    const data = await gqlClient.request(GenerationsDocument, undefined, {
      Authorization: `Bearer ${accessToken}`,
    });
    return data.generations;
  } catch {
    return [];
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const generations = await getGenerations();

  return (
    <div className="flex h-screen">
      <Suspense>
        <Sidebar generations={generations} />
      </Suspense>
      <main className="flex-1">{children}</main>
    </div>
  );
}
