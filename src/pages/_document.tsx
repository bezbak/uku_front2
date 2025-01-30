import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
  } from "next/document";
  
  class MyDocument extends Document<{  description: string, image: string, title: string }> {
    static async getInitialProps(
      ctx: DocumentContext
    ): Promise<DocumentInitialProps & { description: string, image: string, title: string }> {
      let description =
        "【uku.kg】 Крупнейший сайт для размещения бесплатных объявлений ➤ Кыргызстан ❱❱❱ 〚Актуальные объявления по темам〛▷ Недвижимость ➦ Транспорт ➦ Электроника ➦ Работа ➦ Услуги ➦ Дом и Сад ➦ Животные ➤ Кыргызстан ᐉ Сервис бесплатных частных и бизнес объявлений от uku.kg!";
      let image = '/image/_logo.png'
      let title = 'uku.kg'
      try {
        const { id } = ctx.query;
        
        if (id) {
          const res = await fetch(`https://uku.kg/api/v1/publication/${id}/`);
          const data = await res.json();
          image = data.images[0].image
          console.log(data.category);
          description = `${data.description} - ${data.category.name}` || description;
          title = `${data.title} - ${data.category.name}` || description;
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
      
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps, description, image, title };
    }
  
    render() {
        const { description, image, title } = this.props;
        return (
            <Html lang="ru">
                <Head>
                    <meta name="description" content={`${description}`} />
                    <meta property="og:image" content={`${image}`} />
                    <meta property="image_src" content={`${image}`} />
                    <meta property="og:title" content={`${title}`} />
                    <meta property="og:description" content={`${description}`}  />
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
