import "react"
import express from "express"
import ReactDOMServer from "react-dom/server"
import puppeteer from "puppeteer"

const app = express()
const port = 3000

const ImageComponent = () => {
   return `
      <div className="bg-blue-500 text-white p-20 font-sans">
         <h1>Hello, Dynamic Image!</h1>
         {/* Add more JSX as needed */}
      </div>
   `
}

app.get("/test", async (req, res) => {
   const browser = await puppeteer.launch({
      headless: "new",
   })
   const page = await browser.newPage()

   // Get the HTML string from the ImageComponent
   const html = ImageComponent()

   // Set the HTML content on the page
   await page.setContent(html)

   // Capture a screenshot of the rendered content
   const screenshot = await page.screenshot()

   // Send the image as the response
   res.type("image/png").send(screenshot)

   // Close the browser
   await browser.close()
})

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})
