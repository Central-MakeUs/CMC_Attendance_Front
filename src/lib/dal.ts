import { cache } from 'react';
import { gql } from '@/gql';
import { gqlClient } from '@/lib/graphql/server';
import { getAccessToken } from '@/lib/cookies/server';

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

const fetchViewer = async () => {
  const accessToken = await getAccessToken();

  if (!accessToken) return null;

  try {
    const { viewer } = await gqlClient.request(ViewerQuery, undefined, {
      Authorization: `Bearer ${accessToken}`,
    });
    return viewer;
  } catch {
    return null;
  }
};

export const verifySession = cache(fetchViewer);

