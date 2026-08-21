import axios, { AxiosError } from 'axios';

type CsrfTokenResponse = {
    token: string;
};

type ApiErrorResponse = {
    message?: string;
};

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function postWithCsrf<TResponse, TRequest>(
    url: string,
    body: TRequest,
): Promise<TResponse> {
    const csrfResponse = await api.get<CsrfTokenResponse>('/csrf-token');

    const response = await api.post<TResponse>(url, body, {
        headers: {
            'X-CSRF-TOKEN': csrfResponse.data.token,
        },
    });

    return response.data;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
        const response = error as AxiosError<ApiErrorResponse>;
        return response.response?.data?.message ?? fallback;
    }

    return fallback;
}
