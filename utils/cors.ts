import { VercelResponse, VercelRequest } from "@vercel/node";

type PromiseFunction<T> = (
  req: VercelRequest,
  res: VercelResponse
) => Promise<T>;

export async function allowCors<T>(
  req: VercelRequest,
  res: VercelResponse,
  fn: PromiseFunction<T>
) {
  res.setHeader("Access-Control-Allow-Credentials", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
}
