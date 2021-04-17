import { NowResponse, NowRequest } from '@vercel/node'
import cheerio from 'cheerio'
import { fetchHTML } from '../../utils/fetch'

interface DataResponse {
  title: string;
}

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  const name = request.query.name

  const html = await fetchHTML(`kalori-gizi/umum/${name}`, {})

  if (html === 'Not Found') {
    response.json({ message: 'Food not found' })
    return
  }
  const $ = cheerio.load(html)

  const title = $("h1[style='text-transform:none']").text()
  const data: DataResponse = {
    title
  }
  response.json(data)
}
