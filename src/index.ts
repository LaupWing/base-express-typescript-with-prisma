import express from "express"
import path from "path"
import puppeteer from "puppeteer"

const app = express()

app.set("view engine", "ejs")
   .set("views", path.join(__dirname, "views"))
   .get("/", async (req, res) => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      const renderedHTML = res.render("index", {
         title: "Hello, OpenGraph Image!"
      })

      // Set the HTML content on the page
      await page.setContent(renderedHTML!, { waitUntil: "domcontentloaded" })

      // Capture a screenshot of the rendered content
      const screenshot = await page.screenshot()

      // Send the image as the response
      res.type("image/png").send(screenshot)

      // Close the browser
      await browser.close()
   })


app.listen(3000, () => console.log("Server is running on port 3000"))