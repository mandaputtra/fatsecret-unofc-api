import { NowResponse } from '@vercel/node'
import cheerio from 'cheerio'
import { fetchHTML } from '../utils/fetch'

export default async (_, response: NowResponse): Promise<void> => {
  interface MenuUmum {
    title: string;
    desc: string;
    image: string;
  }

  const html = await fetchHTML('kalori-gizi', {})
  const $ = cheerio.load(html)
  const menuUmum: MenuUmum[] = []
  $('table.generic.common td.borderBottom').each((_, elem: any) => {
    const element = $(elem).children('.details')
    const title = element.find('a.prominent').text()
    const desc = element.find('.smallText').text().replace('lagi', '')
    const image = $(elem).find('a > img').attr('src')
    const menu: MenuUmum = {
      title,
      desc,
      image
    }
    menuUmum.push(menu)
  })

  response.json(menuUmum)
}
