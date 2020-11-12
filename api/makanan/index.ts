import { NowResponse } from "@vercel/node";

export default async (_, response: NowResponse): Promise<void> => {
  response.json({
    data: "Testing Routes",
    message: "Success fetch api",
    success: true,
  });
};
