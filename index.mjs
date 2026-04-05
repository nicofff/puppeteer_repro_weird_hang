import puppeteer from 'puppeteer';


const browser = await puppeteer.launch({
  protocolTimeout: 20_000,
  args: ['--no-sandbox'], // Still fails if you comment this out and run with --cap-add=SYS_ADMIN
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function screenshotTask(id) {
  await sleep(Math.random() * 4000);
  console.log("Browser version", await browser.version())
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 768 });
  // await page.goto('https://cf.nearpod.com/neareducation/new/Scrubber/en/dash-slideEditor.png', { waitUntil: 'networkidle2' });
  console.log(`[tab${id}] goTo`);
  await page.goto('https://cnn.com', { waitUntil: 'networkidle2'  });
  console.log(`[tab${id}] taking screenshot`);
  //await page.bringToFront();
  await page.screenshot();
  console.log(`[tab${id}] done`);
  await page.close();
}

while (true) { 
  await Promise.all(Array.from({ length: 5 }, (_, i) => screenshotTask(i)));
}
await browser.close();
