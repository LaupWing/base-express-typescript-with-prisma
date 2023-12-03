import express from "express"
import path from "path"
import puppeteer from "puppeteer"

const app = express()

app
   .set("view engine", "ejs")
   .use(express.static(path.join(process.cwd(), "public")))
   .set("views", path.join(process.cwd(), "views"))
   .get("/", async (req, res) => {
      // const browser = await puppeteer.launch()
      // console.log(path.join(__dirname, "views"))
      // const page = await browser.newPage()
      return res.render("index", {
         title: "Hello, OpenGraph Image!"
      })
      // console.log(renderedHTML)
      // res.send('test')
      // // Set the HTML content on the page
      // await page.setContent(renderedHTML!, { waitUntil: "domcontentloaded" })

      // // Capture a screenshot of the rendered content
      // const screenshot = await page.screenshot()

      // // Send the image as the response
      // res.type("image/png").send(screenshot)

      // Close the browser
      // await browser.close()
   })


app.listen(3000, () => console.log("Server is running on port 3000"))