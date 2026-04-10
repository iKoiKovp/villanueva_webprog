import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import articles from '../assets/article-content.js';

function ArticlePage( ) {
    const { name } = useParams( );
    console.log(name);
    const article = articles.find(article => article.name === name);

    if (!article) {
        return (
            <div className='flex w-full flex-col gap-6'>
                <section className='border-y-2 border-amber-900 bg-amber-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
                    <div className='mx-auto max-w-3xl'>
                        <h1 className='text-3xl font-bold !text-amber-900'>Article not found</h1>
                        <Button to="/articles" className='mt-6'>Back to Articles</Button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className='flex w-full flex-col gap-6'>
            <section className='border-y-2 border-amber-900 bg-amber-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
                <div className='max-w-3xl'>
                    <div className='mb-4'>
                        <Button to="/articles">Back to Articles</Button>
                    </div>
                    <p className='mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-500'>
                        Article
                    </p>
                    <h1 className='text-3xl font-bold leading-tight !text-amber-900 sm:text-4xl'>
                        {article.title}
                    </h1>
                    <p className='mt-2 text-sm text-amber-500'>
                        {article.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </p>
                </div>
            </section>

            <section className='border-y-2 border-amber-900 bg-amber-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
                <div className='mx-auto max-w-3xl'>
                    <div className='flex aspect-4/3 items-center justify-center rounded-[1.25rem] border-2 border-amber-900 bg-amber-200 mb-8'>
                        <div className='h-24 w-24 border-2 border-amber-300 bg-amber-100' />
                    </div>

                    <div className='prose prse-sm max-w-none space-y-4 text-amber-700'>
                        {article.content.map((paragraph, index) => (
                            <p key={index} className='text-base leading-7 text-amber-700 whitespace-pre-wrap'>
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className='mt-8 border-t-2 border-amber-900 pt-6'>
                        <Button to="/articles">Back to Articles</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ArticlePage;