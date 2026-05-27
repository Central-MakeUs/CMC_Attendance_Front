import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { gql } from '@/gql';
import { gqlClient } from '@/lib/graphql/server';
import { getAccessToken } from '@/lib/cookies/server';
import { ClientError } from '@/lib/graphql/core';

const ViewerQuery = gql(`
  query Viewer {
    viewer {
      userId
      loginId
      name
      nickname
      part
      role
      generationNumber
    }
  }
`);

const fetchViewer = async () => {
  const accessToken = await getAccessToken();

  if (!accessToken) return null;

  try {
    const { viewer } = await gqlClient.request(ViewerQuery, undefined, {
      Authorization: `Bearer ${accessToken}`,
    });
    return viewer;
  } catch (e) {
    if (e instanceof ClientError && e.response.status === 401) {
      const cookieStore = await cookies();
      cookieStore.delete('access_token');
      cookieStore.delete('refresh_token');
      cookieStore.delete('generation_number');
      redirect('/login');
    }
    return null;
  }
};

export const verifySession = cache(fetchViewer);

