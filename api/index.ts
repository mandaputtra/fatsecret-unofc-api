import { NowResponse } from '@vercel/node'
import cheerio from 'cheerio'
import { fetchHTML, BASE_URL } from '../utils/fetch'

export default async (_, response: NowResponse): Promise<void> => {
  interface MenuUmum {
    title: string;
    desc: string;
    image: string;
    link: string;
  }

  const html = await fetchHTML('kalori-gizi', {})
  const $ = cheerio.load(html)
  const menuUmum: MenuUmum[] = []
  $('table.generic.common td.borderBottom').each((_, elem: any) => {
    const element = $(elem).children('.details')
    const title = element.find('a.prominent').text()
    const link = element.find('a.prominent').attr('href').replace('/', '') // delete first char
    const desc = element.find('.smallText').text().replace('lagi', '')
    const image = $(elem).find('a > img').attr('src')
    const menu: MenuUmum = {
      title,
      desc,
      image,
      link: `${BASE_URL}${link}`
    }
    menuUmum.push(menu)
  })

  response.json(menuUmum)
}
