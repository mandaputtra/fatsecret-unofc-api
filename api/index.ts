import { NowResponse, NowRequest } from '@vercel/node'
import { languanges } from '../utils/lang'

export default async (
  _request: NowRequest,
  response: NowResponse
): Promise<void> => {
  response.json({
    supported_lang: languanges,
    repo: 'https://github.com/mandaputtra/fatsecret-unofc-api',
    credits: ['fatsecret.com', 'vercel.sh']
  })
}
