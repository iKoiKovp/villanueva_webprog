import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import articles from '../../assets/article-content.js';

const ArticleListPage = ( ) => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="flex flex-col items-center text-centerborder-y-2 border-amber-900 bg-amber-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking [0.28em] text-amber-500">
                    Articles
                </p>
                <h1 className="max-w-xl text-3xl font-bold leading-tight !text-amber-900 sm:text-4xl">
                    Featured articles in a simple card grid
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-7 text-amber-600 sm:text-base">
                    A clean wireframe section for article thumbnails, titles, short descriptions, and one clear action per card.
                </p>
                <div className="mt-6">
                    <Button to="/">Back Home</Button>
                </div>
            </section>

            <section className="border-y-2 border-amber-900 bg-amber-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking [0.28em] text-amber-500">
                        Featured Articles
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold !text-amber-900">Article Card Grid</h2>
                </div>

                <ArticleList articles={articles} />
            </section>
        </div>
    );
}

export default ArticleListPage;