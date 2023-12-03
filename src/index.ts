import "react"
import express from "express"
import ReactDOMServer from "react-dom/server"

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

app.get("/", (req, res) => {
   res.send("Hello World!")
})

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})
