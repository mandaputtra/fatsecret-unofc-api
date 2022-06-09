import { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchHTML } from "../../../utils/fetch";
import { getLang } from "../../../utils/lang";
import cheerio from "cheerio";
import { parse, stringify } from "qs";
import NextCors from "nextjs-cors";
export default async (
  request: VercelRequest,
  response: VercelResponse
): Promise<void> => {
  await NextCors(request, response, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const langConfig = getLang(String(request.query.lang));
  const detailUrl = request.query.url;
  const url = request.headers["x-forwarded-host"];
  const proto = request.headers["x-forwarded-proto"];
  const query: any = request.query.query;
  const page: any = +request.query.page || 0;
  const portionamount = request.query.portionamount;
  const portionid = request.query.portionid;
  const isGr = request.query.isGram ? true : false;

  if (!langConfig) {
    response.json({ error: `${request.query.lang} are not supported` });
    return;
  }

  if (!detailUrl) {
    response.json({ error: "please provide detailLink on search" });
    return;
  }
  if (!langConfig) {
    response.json({ error: `${request.query.lang} are not supported` });
    return;
  }

  let _url = langConfig.baseUrl + detailUrl;
  const html = await fetchHTML(_url, {
    portionamount,
    portionid,
    pg: page,
  });

  const $ = cheerio.load(html);
  let items: any = {};

  $("div.summarypanelcontent").each((_, elem: any) => {
    const element = $(elem);
    const x = element.find("h1").text();
    if (x) {
      items["food"] = x;
    }
  });

  $("div.nutrient.left").each((_, elem: any) => {
    const element = $(elem);
    const normalizeText = element.text().replace(/(\r\n|\n|\r\t|\t|\r)/gm, "");
    let item;
    const nextELem = element.next().text();

    switch (normalizeText) {
      case "Enerji":
        items["kj"] = parseItem(nextELem, "kj");
        break;

      case "":
        if (nextELem.indexOf("kcal") !== -1) {
          items["kcal"] = parseItem(nextELem, "kcal");
        }
        break;

      case "Protein":
        items["protein"] = parseItem(nextELem, "protein");
        break;

      case "Yağ":
        items["fat"] = parseItem(nextELem, "fat");
        break;

      case "Karbonhidratlar":
        items["carb"] = parseItem(nextELem, "carb");
        break;

      case "Doymuş Yağ":
        items["saturated_fat"] = parseItem(nextELem, "saturated_fat");
        break;

      case "Kolesterol":
        items["colestrol"] = parseItem(nextELem, "colestrol");
        break;
      case "Şeker":
        items["sugar"] = parseItem(nextELem, "sugar");
        break;

      case "Fiber":
        items["lif"] = parseItem(nextELem, "lif");
        break;

      case "Sodyum":
        items["sodyum"] = parseItem(nextELem, "sodyum");
        break;

      default:
        break;
    }
  });

  response.json(items);

  function parseItem(
    item: string,
    type:
      | "kj"
      | "kcal"
      | "protein"
      | "fat"
      | "carb"
      | "saturated_fat"
      | "colestrol"
      | "sugar"
      | "lif"
      | "sodyum"
  ) {
    const vb: any =
      item.replace(langConfig.detailRegex[type], "").replace(",", ".").trim() ||
      0;
    const x = Number(vb / 100);

    return Math.round(x * 100) / 100;

    //return vb;
  }

  /*  $("div.nutrient.black.right.tRight").each((_, elem: any) => {
    const element = $(elem);
    const normalizeText = element.text().replace(/(\r\n|\n|\r\t|\t|\r)/gm, "");
    console.log("ELEM", normalizeText);
  }); */
};
