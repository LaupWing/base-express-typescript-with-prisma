import express from "express"
import path from "path"
import puppeteer from "puppeteer"

const app = express()

async function renderTemplate(viewName: string, data: any) {
   return new Promise((resolve, reject) => {
      app.render(viewName, data, (err, html) => {
         if (err) {
            reject(err)
         } else {
            resolve(html)
         }
      })
   })
}

app.set("view engine", "ejs")
   .use(express.static(path.join(process.cwd(), "public")))
   .set("views", path.join(process.cwd(), "views"))
   .get("/", async (req, res) => {
      const browser = await puppeteer.launch()
      console.log(path.join(__dirname, "views"))
      const page = await browser.newPage()
      const renderedHTML = await renderTemplate("index", { name: "John Doe" })
      await page.addStyleTag({url: 'http://example.com/style.css'})
      // res.send(renderedHTML)
      // console.log(renderedHTML)
      // res.send('test')
      // Set the HTML content on the page
      // res.send("hi")
      await page.setContent(renderedHTML as string, { waitUntil: "domcontentloaded" })

      // // Capture a screenshot of the rendered content
      const screenshot = await page.screenshot()

      // Send the image as the response
      res.type("image/png").send(screenshot)

      await browser.close()
   })

app.listen(3000, () => console.log("Server is running on port 3000"))
