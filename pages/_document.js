import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import {renderStaticOptimized} from 'glamor/server'

export default class MyDocument extends Document {
  static async getInitialProps({renderPage}) {
    const page = renderPage()
    const styles = renderStaticOptimized(() => page.html)
    return {...page, ...styles}
  }

  constructor(props) {
    super(props)
    const {__NEXT_DATA__, ids} = this.props
    if (typeof window !== 'undefined') {
      rehydrate(ids)
    } else {
      __NEXT_DATA__.ids = ids
    }
  }

  render() {
    return (
      <html>
        <Head>
          <title>Awesomefest 11 Quick Schedule</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700" rel="stylesheet" />
          <link href="/static/global.css" rel="stylesheet" />
          <style dangerouslySetInnerHTML={{__html: this.props.css}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
