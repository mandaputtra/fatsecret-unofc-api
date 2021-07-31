import { NowResponse, NowRequest } from '@vercel/node'

export default async (_request: NowRequest, response: NowResponse): Promise<void> => {
  response.json({ status: 'work in progress' })
}
