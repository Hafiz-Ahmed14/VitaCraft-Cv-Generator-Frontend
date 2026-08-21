import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

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

type RetriableRequestConfig = InternalAxiosRequestConfig & {
    _retriedAfterRefresh?: boolean;
};

let refreshRequest: Promise<void> | null = null;

async function refreshAccessToken(): Promise<void> {
    const csrfResponse = await api.get<CsrfTokenResponse>('/csrf-token');
    await api.post('/v1/auth/refresh', {}, {
        headers: { 'X-CSRF-TOKEN': csrfResponse.data.token },
    });
}

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const request = error.config as RetriableRequestConfig | undefined;
        const isAuthenticationRequest = request?.url?.startsWith('/v1/auth/');

        if (error.response?.status !== 401 || !request || request._retriedAfterRefresh || isAuthenticationRequest) {
            return Promise.reject(error);
        }

        request._retriedAfterRefresh = true;
        refreshRequest ??= refreshAccessToken().finally(() => {
            refreshRequest = null;
        });

        try {
            await refreshRequest;
            return api(request);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    },
);

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
