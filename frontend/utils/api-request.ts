type ApiRequestArgs = {
  method: string
  endpoint: string
  requestBody?: object
}

// TODO refactor api request interface
export const apiRequest = async <T> (
  baseUrl: string,
  { method, endpoint, requestBody }: ApiRequestArgs,
  headers = {},
): Promise<T | undefined> => {
  try {
    const fullEndpoint = baseUrl + endpoint
    const url = method === 'GET'
      ? getRequestUrl(fullEndpoint, requestBody as Record<string, string>)
      : fullEndpoint

    const res = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers
      },
      ...(
        method !== 'GET'
          ? { body: JSON.stringify(requestBody) }
          : {}
      )
    })

    return await res.json()
  } catch (e) {
    console.error(`Error on api request. Endpoint: ${endpoint}, Error: ${e}`)
  }
}

const getRequestUrl = (url: string, queryObject: Record<string, string>): string => {
  const search = new URLSearchParams(queryObject).toString()
  return url + (search ? '?' + search : '')
}
