import { NowResponse } from "@vercel/node";

export default async (_, response: NowResponse): Promise<void> => {
  response.json({
    data: "Hello, world. I'm testing vercel",
    message: "Success fetch api",
    success: true,
  });
};
