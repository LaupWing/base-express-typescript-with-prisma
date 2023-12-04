import express from "express"
import puppeteer from "puppeteer"
import path from "path"
import { renderTemplate } from ".."
const router = express.Router()

router.get("/", async (req, res) => {
   const browser = await puppeteer.launch({
      headless: false,
   })
   console.log(path.join(__dirname, "views"))
   const page = await browser.newPage()
   const renderedHTML = await renderTemplate("index", { name: "John Doe" })
   // res.send(renderedHTML)
   // console.log(renderedHTML)
   // res.send('test')
   // Set the HTML content on the page
   // res.send("hi")
   await page.setContent(renderedHTML as string, {
      waitUntil: "domcontentloaded",
   })

   // // Capture a screenshot of the rendered content
   const screenshot = await page.screenshot()

   // Send the image as the response
   res.type("image/png").send(screenshot)

   await browser.close()
})

export default router