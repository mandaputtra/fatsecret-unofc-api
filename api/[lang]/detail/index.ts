import { VercelRequest, VercelResponse } from '@vercel/node'
import { getLang } from '../../../utils/lang'

export default async (request: VercelRequest, response: VercelResponse): Promise<void> => {
  const langConfig = getLang(String(request.query.lang))
  const detailUrl = request.query.url
  if (!detailUrl) {
    response.json({ error: 'please provide detailLink on search' })
    return
  }
  if (!langConfig) {
    response.json({ error: `${request.query.lang} are not supported` })
    return
  }
  response.json({
    status: 'work in progress',
    debug: `${langConfig.baseUrl}${detailUrl}`
  })
}
