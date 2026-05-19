import { cache } from 'react';
import { cookies } from 'next/headers';
import { gql } from '@/gql';
import { gqlClient } from '@/lib/gql-client';

const ViewerQuery = gql(`
  query Viewer {
    viewer {
      userId
      loginId
      name
      nickname
      part
      role
    }
  }
`);

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) return null;

  try {
    const { viewer } = await gqlClient.request(ViewerQuery, undefined, {
      Authorization: `Bearer ${accessToken}`,
    });
    return viewer;
  } catch {
    return null;
  }
});
