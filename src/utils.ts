

export async function fetcher<R=unknown>(url: URL | string, options?: RequestInit): Promise<R> {
    const response = await fetch(url, options)
    const headerType = response.headers.get('content-type')
    
    let responseData = null

    if (headerType && headerType.includes('application/json')) {
        responseData = await response.json()

    } else if (headerType && headerType.includes('text/html')) {
        responseData = await response.text()
    }

    if (!response.ok) {
        const error: Error & {body?: R}  = new Error(`${response.status}:${response.statusText}`)
        error.body = responseData
        throw error
    }

    try {
        if (typeof responseData === 'string') {
            responseData = JSON.parse(responseData)
        }
    } catch (error) {

    }

    return responseData as R
}