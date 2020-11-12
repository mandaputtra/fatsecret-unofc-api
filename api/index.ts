import { NowResponse } from "@vercel/node";
import { startBrowser } from "../utils/browser"

export default async (_, response: NowResponse): Promise<void> => {

  const isDev: boolean = process.env.NOW_REGION === "dev1"
  const CHROMEPATH: string = process.env.CHROMIUM_PATH || ""
  const browserInstance = await startBrowser(isDev, CHROMEPATH);
  const page = await browserInstance.newPage();
  await page.goto("https://www.fatsecret.co.id/kalori-gizi/");

  interface MenuMakananUmum {
    title: string | undefined | null,
    desc: string | undefined | null,
  }
  
  // List Makanan Umum
  const MakananUmum = await page.evaluate(() => {
    const td = document.querySelectorAll("table.generic.common td")
    let listMenu: MenuMakananUmum[] = []
    td.forEach((menu) => {
      let menuUmum: MenuMakananUmum = {
        title: menu.querySelector("b")?.textContent,
        desc: menu.querySelector(".smallText")?.textContent?.replace("lagi", "")
      }
      listMenu.push(menuUmum)
    })
    return listMenu
  })
  
  response.json({
    data: MakananUmum,
    message: "Success fetch api",
    success: true,
  });
};
