import { NowResponse, NowRequest } from '@vercel/node'
import cheerio from 'cheerio'
import { fetchHTML } from '../../utils/fetch'

interface FoundList {
  title: string;
  apiURL: string;
  desc: string;
}

interface DataResponse {
  items: FoundList[];
  next: number;
  prev: number;
  current: number;
  total: number;
}

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  const query: any = request.query.q
  const page: any = request.query.pg || 0

  if (!query) {
    response.json('Please insert a query, q=??')
  }

  const html = await fetchHTML('kalori-gizi/search', {
    q: query,
    pg: page
  })
  const $ = cheerio.load(html)
  const items: FoundList[] = []

  const searchSum = $('.searchResultSummary').text().split(' ')
  const total = parseInt(searchSum[4])
  const endOfPage = total === parseInt(searchSum[2])
  const startOfPage = page < 1
  const next = endOfPage ? 0 : parseInt(page) + 1
  const prev = startOfPage ? 0 : parseInt(page) - 1
  const data: DataResponse = {
    items,
    total,
    prev,
    next,
    current: parseInt(page)
  }
  response.json(data)
}
