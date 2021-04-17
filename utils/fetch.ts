import nodeFetch from 'node-fetch'
import withRetry from '@vercel/fetch-retry'
import qs from 'qs'

const fetch = withRetry(nodeFetch)
export const BASE_URL = 'https://www.fatsecret.co.id/'

const headers = {
  'cache-control': 'no-cache',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
}

function generateParams (options: object): string {
  const params = qs.stringify(options, {
    arrayFormat: 'brackets',
    encode: false
  })
  return params
}

export async function fetchHTML (dest: String, params: object): Promise<string> {
  const url = `${BASE_URL}${dest}?${generateParams(params)}`
  const res = await fetch(url, { headers })
  console.log(res.url)
  if (res.url === 'https://www.fatsecret.co.id/Default.aspx') {
    return 'Not Found'
  } else {
    const body = await res.text()
    return body
  }
}
