import fs from "fs"
import express from "express"
import { createServer as createViteServer } from "vite"
import { renderToReadableStream } from "react-dom/server"
import React from "react"
import { build as buildVite } from "vite"

const isProd = process.env.NODE_ENV === "production"
const port = 5173

const app = express()

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
})

app.use(vite.middlewares)

app.use("/", async (req, res, next) => {
  const url = req.originalUrl

  try {
    let template = fs.readFileSync("./index.html", { encoding: "utf-8" })

    template = await vite.transformIndexHtml(url, template)

    //   ssr 에 필요한 모듈 로드
    const { render } = await vite.ssrLoadModule("./src/entry-server.tsx")

    //   render 함수 실행
    const { html: appHtml } = render()

    // index.html 에 html 넣고 응답 내려주기
    const html = template.replace("<!-- app-body -->", appHtml)
    res.status(200).set("Content-Type", "text/html").end(html)
  } catch (e) {
    vite.ssrFixStacktrace(e)
    next(e)
  }
})

app.use("/rsc", (req, res) => {
  const stream = renderToReadableStream()
})

const chilentEntryPoints = new Set()
async function build() {
  // 1. build server components
  // NOTE: externalize client component bundles from server bundle
  await buildVite({
    logLevel: "error",
    build: {
      ssr: true,
      outDir: "build",
      rollupOptions: {},
    },
    plugins: [
      {
        name: "vite-plugin-rsc",
        load(id) {},

        transform(code, id) {
          const packageRegex = /node_modules/g
          if (packageRegex.test(id)) return null
          const reactComponentRegex = /\.(jsx|tsx)$/
          if (reactComponentRegex.test(id)) {
            if (code.startsWith("'use client'")) {
              chilentEntryPoints.add(id)
              return {}
            }
          }
        },
      },
    ],
  })

  // 2. build client components
}

app.listen(port, async () => {
  await build()
  console.log(`start server on port ${port}`)
})
