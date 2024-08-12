type ApiResponse<T = any> = Response & { data?: T };

type RequestInterceptor = (
  options: RequestInit
) => RequestInit | Promise<RequestInit>;
type ResponseInterceptor<T = any> = (
  response: ApiResponse
) => ApiResponse<T> | Promise<ApiResponse<T>>;

class Fetcher {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;
  private requestInterceptors: RequestInterceptor[];
  private responseInterceptors: ResponseInterceptor[];

  constructor({ baseUrl = "", defaultHeaders = {} } = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setDefaultHeaders(headers: HeadersInit) {
    this.defaultHeaders = headers;
  }

  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor<T = any>(interceptor: ResponseInterceptor<T>) {
    this.responseInterceptors.push(interceptor);
  }

  private async interceptRequest(options: RequestInit): Promise<RequestInit> {
    options.headers = { ...this.defaultHeaders, ...options.headers };

    for (const interceptor of this.requestInterceptors) {
      options = (await interceptor(options)) || options;
    }

    return options;
  }

  private async interceptResponse<T = any>(
    response: Response
  ): Promise<ApiResponse<T>> {
    for (const interceptor of this.responseInterceptors) {
      response = (await interceptor(response)) || response;
    }

    return response;
  }

  private async parseJsonResponse(response: Response): Promise<any> {
    const contentType = response.headers.get("Content-Type") || "";

    if (contentType.includes("application/json")) {
      return response.json();
    } else if (contentType.startsWith("image/")) {
      return response.blob();
    }

    return response.text();
  }

  private handleError(response: Response) {
    if (!response.ok) {
      return response.text().then((text) => {
        const error = new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
        (error as any).response = response;
        (error as any).responseText = text;

        throw error;
      });
    }
  }

  async request<T = any>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    options = await this.interceptRequest(options);

    const fullUrl = this.baseUrl + url;

    let response: ApiResponse = await fetch(fullUrl, options);

    this.handleError(response);

    response = await this.interceptResponse(response);
    response.data = await this.parseJsonResponse(response);

    return response;
  }

  get<T = any>(
    url: string,
    options: RequestInit = {},
    params: Record<string, any> = {}
  ): Promise<ApiResponse<T>> {
    const queryString =
      params && Object.keys(params).length > 0
        ? `?${new URLSearchParams(params).toString()}`
        : "";
    const fullUrl = `${url}${queryString}`;

    return this.request(fullUrl, { ...options, method: "GET" });
  }

  post<T = any>(
    url: string,
    body: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put<T = any>(
    url: string,
    body: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  patch<T = any>(
    url: string,
    body: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  delete<T = any>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request(url, { ...options, method: "DELETE" });
  }
}

export const fetcher = new Fetcher({
  baseUrl:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_BASE_URL
      : process.env.NEXT_PUBLIC_DEV_BASE_URL,
  defaultHeaders: { "Content-Type": "application/json" },
});
