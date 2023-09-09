import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Importar la hoja de estilo de la fuente de Google Fonts con font-display */}
          <link href="https://fonts.googleapis.com/css?family=Laila:500|Fira+Sans:200italic|Noto+Sans:regular&display=optional" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Poly:regular&display=optional" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
