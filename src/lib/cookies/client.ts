const isProduction = process.env.NODE_ENV === 'production';
const baseOptions = `path=/; samesite=lax${isProduction ? '; secure' : ''}`;

export const setAuthTokens = ({
  accessToken,
  refreshToken,
  accessTokenExpiresAt,
  refreshTokenExpiresAt,
  generation,
}: {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  generation?: { number: number } | null;
}) => {
  document.cookie = `access_token=${accessToken}; expires=${new Date(accessTokenExpiresAt).toUTCString()}; ${baseOptions}`;
  document.cookie = `refresh_token=${refreshToken}; expires=${new Date(refreshTokenExpiresAt).toUTCString()}; ${baseOptions}`;
  if (generation) {
    document.cookie = `generation_number=${generation.number}; expires=${new Date(refreshTokenExpiresAt).toUTCString()}; ${baseOptions}`;
  }
};

export const clearAuthTokens = () => {
  document.cookie = `access_token=; max-age=0; path=/`;
  document.cookie = `refresh_token=; max-age=0; path=/`;
};
