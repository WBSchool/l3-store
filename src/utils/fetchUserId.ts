import { userService } from '../services/user.service';

async function fetchWithUserId(input: RequestInfo, options?: RequestInit): Promise<Response> {
    const header = {
        ...options?.headers,
        "UserID": userService.getId()
    }

    const result = fetch(input, {
        ...options,
        ...header
    })
    return result;
}

export { fetchWithUserId };