import { NowResponse } from "@vercel/node";
import nodeFetch from "node-fetch";
import withRetry from "@vercel/fetch-retry";
import cheerio from "cheerio";

const fetch = withRetry(nodeFetch);

export default async (_, response: NowResponse): Promise<void> => {
  interface MenuUmum {
    title: string;
    desc: string;
    image: string;
  }

  const res = await fetch("https://www.fatsecret.co.id/kalori-gizi/");
  const body = await res.text();

  const $ = cheerio.load(body);
  const menuUmum: MenuUmum[] = [];
  $("table.generic.common td.borderBottom").each((_, elem: any) => {
    const element = $(elem).children(".details");
    const title = element.find("a.prominent").text();
    const desc = element.find(".smallText").text().replace("lagi", "");
    const image = $(elem).find("a > img").attr("src");
    const menu: MenuUmum = {
      title,
      desc,
      image,
    };
    menuUmum.push(menu);
  });

  response.json({
    data: menuUmum,
    message: "Success fetch api",
    success: true,
  });
};
