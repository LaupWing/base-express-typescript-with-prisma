import express from "express"
import path from "path"


const app = express()

export async function renderTemplate(viewName: string, data: any) {
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
      
   })
   

app.listen(3000, () => console.log("Server is running on port 3000"))
