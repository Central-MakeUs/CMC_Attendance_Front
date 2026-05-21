import { cookies } from 'next/headers';

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('access_token')?.value;
};

export const getGenerationNumber = async () => {
  const cookieStore = await cookies();
  const value = cookieStore.get('generation_number')?.value;
  return value ? Number(value) : null;
};
