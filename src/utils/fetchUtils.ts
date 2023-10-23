import { userService } from '../services/user.service';

async function fetchWithUserId(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const userId = await userService.getId();
  const headers = {
    ...init?.headers,
    'UserID': userId
  };

  return fetch(input, {
    ...init,
    headers
  });
}

export { fetchWithUserId };

