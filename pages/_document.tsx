import React from "react"
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from "styled-components"
import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/core/styles"
import { resetServerContext } from "react-beautiful-dnd"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentsSheet = new StyledComponentSheets()
    const materialSheets = new MaterialUiServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(
              materialSheets.collect(<App {...props} />)
            ),
        })

      const initialProps = await Document.getInitialProps(ctx)
      resetServerContext()
      return {
        ...initialProps,
        // styles: <>{initialProps.styles}{sheet.getStyleElement()}</>
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </React.Fragment>
        )
      }
    } finally {
      styledComponentsSheet.seal()
    }
  }
  render() {
    return (
      <Html>
        <Head>
          {/* Import CSS for nprogress */}
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.0/antd.min.css' />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"
          />
          {/* <link rel="stylesheet" type="text/css" href="path/to/notifications.css"/> */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="/font/cloud/fonts.css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Kodchasan"
          />
          <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@100;300&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css2?family=Pridi:wght@200;400&display=swap" rel="stylesheet"/>
          <script src="https://cdn.tiny.cloud/1/44ca2fod5qyubfxkdxxnxwpjkv0h4013bt0u9aqw37a5v6cu/tinymce/5/tinymce.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
