import chromium from "chrome-aws-lambda";

export async function startBrowser(isDev: Boolean, chromepath: string) {
  let browser: any;
  // const exePath = isDev ? chromepath : await chromium.executablePath
  const args =
  process.platform === "linux"
    ? [
        "--disable-gpu",
        "--renderer",
        "--no-sandbox",
        "--no-service-autorun",
        "--no-experiments",
        "--no-default-browser-check",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-extensions"
      ]
    : [];

  try {
    browser = await chromium.puppeteer.launch({
      args: args,
      defaultViewport: chromium.defaultViewport,
      executablePath: chromepath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    throw new Error(err);
  }
  return browser;
}