import marked from 'marked'
import { sanitizeHtml } from './sanitizer'
import { ParsedRequest } from './types'
const twemoji = require('twemoji')
const twOptions = { folder: 'svg', ext: '.svg' }
const emojify = (text: string) => twemoji.parse(text, twOptions)

function getCss(theme: string, fontSize: string) {
  let background = '#ebebeb'

  if (theme === 'dark') {
    background = '#17171d'
  }

  return `
  @import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");

    body {
      background: ${background};
      height: 100vh;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      font-family: 'Nunito', sans-serif !important;
      font-size: ${sanitizeHtml(fontSize)};
      font-style: normal;
    }

    code {
      font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, sans-serif;
      font-size: .875em;
      white-space: pre-wrap;
    }

    code:before,
    code:after {
      content: '\`';
    }

    .img-wrapper {
      margin: 50px 0 50px;
      padding-top: 75px;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
    }

    .img {
      width: 200px;
      height: 200px;
    }
    .img[src*="//hackclub.com/team/"],
    .img[src*="//dl.airtable.com/"],
    .img[src*="//github.com/"] {
      border-radius: 100px;
      width: 175px;
      height: 175px;
    }

    .plus {
      color: #7a8c97;
      font-size: 60px;
      padding: 0 30px;
    }

    .container {
      margin: 100px 150px 150px;
    }

    .spacer {
      margin: 50px 0;
      width: 100%;
    }

    .brand {
      font-size: 105px;
      padding: 50px;
      text-align: center;
      font-weight: bold;
      position: absolute;
      top: 0;
      width: 100%;
      color: #ec3750;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .brand span {
      color: #7a8c97;
      font-weight: normal;
      margin-right: 0.2em;
    }
    .logo {
      width: 500px;
      margin: 0 50px;
    }

    .heading {
      color: #FD6563;
      margin: 0 50px;
      padding-bottom: 25px;
      line-height: 0.875;
      font-weight: 900;
    }

    .heading * {
      margin: 0;
    }

    .caption {
      font-size: ${Number(sanitizeHtml(fontSize).match(/\d+/)) * 0.375}px;
      color: #7a8c97;
      letter-spacing: 0;
    }

    .emoji {
      height: 1em;
      width: 1em;
      margin: 0 .05em 0 .1em;
      vertical-align: -0.1em;
    }`
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, theme, md, fontSize, images, caption } = parsedReq
  return `<!DOCTYPE html>
  <html>
  <meta charset="utf-8">
  <title>Generated Image</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    ${getCss(theme, fontSize)}
  </style>
  <body>
    <div class="brand">
      <img class="logo" src="https://1.bp.blogspot.com/-X9coUQmFEA4/X7kCcLE7rrI/AAAAAAAAEPc/mrIKtDiTXQ4vOQ_DdTtXg8cVeLAT9fv-gCLcBGAsYHQ/s320/hackum-logo.png">
    </div>
    <div class="container">
      ${
        images.length > 0
          ? `<div class="img-wrapper">
              <img class="img" src="${sanitizeHtml(images[0])}" />
              ${images.slice(1).map(img =>
                `<div class="plus">+</div>
                <img class="img" src="${sanitizeHtml(img)}" />`
              ).join('')}
            </div>`
          : '<div class="spacer"></div>'
      }
      <div class="heading">${emojify(
        md ? marked(text) : sanitizeHtml(text)
      )}</div>
      ${
        caption && caption !== 'undefined'
          ? `<div class="caption">${emojify(sanitizeHtml(caption))}</div>`
          : ''
      }
    </div>
  </body>
</html>`
}
