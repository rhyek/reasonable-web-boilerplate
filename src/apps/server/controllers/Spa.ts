import Controller, { route, get } from "../../../types/Controller"

@route('')
export default class extends Controller {
  @get()
  index() {
    return `
      <html>
        <body>
          <div id="app" />
          <script type="text/javascript" src="http://localhost:8080/app.js"></script>
        </body>
      </html>
    `
  }
}