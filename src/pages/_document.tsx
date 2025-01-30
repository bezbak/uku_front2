import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
  } from "next/document";
  
  class MyDocument extends Document<{  description: string }> {
    static async getInitialProps(
      ctx: DocumentContext
    ): Promise<DocumentInitialProps & { description: string }> {
      let description =
        "【uku.kg】 Крупнейший сайт для размещения бесплатных объявлений ➤ Кыргызстан ❱❱❱ 〚Актуальные объявления по темам〛▷ Недвижимость ➦ Транспорт ➦ Электроника ➦ Работа ➦ Услуги ➦ Дом и Сад ➦ Животные ➤ Кыргызстан ᐉ Сервис бесплатных частных и бизнес объявлений от uku.kg!";
  
      try {
        const { id } = ctx.query;
        
        if (id) {
          const res = await fetch(`https://uku.kg/api/v1/publication/${id}/`);
          const data = await res.json();
          description = data.description || description;
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
      
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps, description };
    }
  
    render() {
        const { description } = this.props;
        return (
            <Html lang="ru">
                <Head>
                    <meta name="description" content={`${description}`} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {/* <YMInitializer
                        accounts={[88273965]}
                        options={{
                            clickmap: true,
                            trackLinks: true,
                            accurateTrackBounce: true,
                            webvisor: true,
                        }}
                    /> */}
                </body>
                <style jsx global>{`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body .Toastify__toast-container {
                        --toastify-z-index: 10000000;
                    }
                `}</style>
            </Html>
        );
    }
}

export default MyDocument;
