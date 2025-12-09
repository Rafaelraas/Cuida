/**
 * Test helper functions for authentication
 */

/**
 * Extract session cookie from response headers
 * 
 * @param setCookieHeader - The set-cookie header value from response
 * @returns The session cookie value
 */
export function extractSessionCookie(setCookieHeader: string | string[] | undefined): string {
  if (!setCookieHeader) return ''
  
  const cookieString = Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader
  return cookieString
}

/**
 * Register and login a test user
 * 
 * @param client - The API test client
 * @param userData - User registration data
 * @returns Object with user data and session cookie
 */
export async function registerAndLogin(
  client: any,
  userData: {
    fullName: string
    email: string
    password: string
    userType: 'professional' | 'patient'
    phoneNumber?: string
  }
) {
  // Register user
  await client.post('/api/auth/register').json(userData)

  // Login
  const loginResponse = await client.post('/api/auth/login').json({
    email: userData.email,
    password: userData.password,
  })

  const sessionCookie = extractSessionCookie(loginResponse.header('set-cookie'))

  return {
    user: loginResponse.body().user,
    sessionCookie,
  }
}
