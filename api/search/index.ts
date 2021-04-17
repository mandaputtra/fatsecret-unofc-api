import { NowResponse, NowRequest } from '@vercel/node'
import cheerio from 'cheerio'
import { fetchHTML } from '../../utils/fetch'

interface FoundList {
  title: string;
  serving: string;
  otherServing: string[];
  calories: number;
  fat: number;
  carbo: number;
  protein: number;
  apiURL: string;
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

  $('table.generic.searchResult td.borderBottom').each((_, elem: any) => {
    const element = $(elem)
    const title = element.find('a.prominent').text()
    const slug = element.find('a.prominent').attr('href').split('/')[3]
    const normalizeText = element
      .find('div.smallText.greyText.greyLink')
      .text()
      .replace(/(\r\n|\n|\r\t|\t|\r)/gm, '')

    const splitSection = normalizeText.split('Ukuran Lainnya:')
    const splitGeneralInfoString = splitSection[0].split('-')
    // Search other serving method
    let otherServing = []
    if (splitSection[1]) {
      const val = splitSection[1].split(',')
      val.pop()
      otherServing = val
    }
    const generalInfo = splitGeneralInfoString[1].split('|')
    const calories = +generalInfo[0].replace(/Kalori:|kkal/g, '') || 0
    const fat = +generalInfo[1].replace(/Lemak:|g/g, '').replace(',', '.') || 0
    const carbo =
      +generalInfo[2].replace(/Karb:|g/g, '').replace(',', '.') || 0
    const protein =
      +generalInfo[3].replace(/Prot:|g/g, '').replace(',', '.') || 0

    items.push({
      title,
      apiURL: `/detail/${slug}`,
      protein,
      fat,
      carbo,
      calories,
      otherServing,
      serving: splitGeneralInfoString[0]
    })
  })

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
