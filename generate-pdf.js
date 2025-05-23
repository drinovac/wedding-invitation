const puppeteer = require("puppeteer");
const fs = require("fs");

async function createPDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load your built Vue app
  await page.goto(`file://${__dirname}/dist/index.html`, {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "20mm",
      right: "20mm",
    },
  });

  fs.writeFileSync("wedding-invitation.pdf", pdf);
  console.log("PDF generated successfully!");

  await browser.close();
}

createPDF();
