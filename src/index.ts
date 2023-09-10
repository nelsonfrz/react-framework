import React from "react";
import { renderToString } from "react-dom/server";

const assetPrefix = "build";

await Bun.build({
  entrypoints: ["src/app/index.tsx"],
  outdir: assetPrefix,
  minify: true,
});

const router = new Bun.FileSystemRouter({
  dir: "src/app/pages",
  style: "nextjs",
});

const server = Bun.serve({
  fetch: async (req) => {
    const url = new URL(req.url);
    if (url.pathname === `/${assetPrefix}/index.js`) {
      const file = Bun.file(`./${assetPrefix}/index.js`);
      const content = await file.text();

      return new Response(content, {
        headers: {
          "Content-type": "text/javascript",
        },
      });
    } else if (url.pathname === `/${assetPrefix}/output.css`) {
      const file = Bun.file(`./${assetPrefix}/output.css`);
      const content = await file.text();

      return new Response(content, {
        headers: {
          "Content-type": "text/css",
        },
      });
    }

    const matchedRoute = router.match(req);
    if (!matchedRoute) {
      return new Response("Page not found.", {
        status: 404,
      });
    }

    const module = await import(matchedRoute.filePath);
    let serverSideProps = {
      searchParams: url.searchParams,
    };
    if (module.getServerSideProps) {
      serverSideProps = {
        ...serverSideProps,
        ...(await module.getServerSideProps()),
      };
    }

    const renderedHTML = renderToString(
      React.createElement(module.default, {
        serverSideProps,
      })
    );

    const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
    <link href="./${assetPrefix}/output.css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${renderedHTML}</div>

    <script>
    window.__ssr_props = ${JSON.stringify(serverSideProps)};
    </script>
    <script type="module" src="./${assetPrefix}/index.js"></script>
  </body>
  </html>`;

    return new Response(html, {
      headers: {
        "Content-type": "text/html",
      },
    });
  },
});

console.log(`Server is listening on ${server.hostname}:${server.port}`);
