import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
    return (
        <div className='grid ga[-4 sm:grid-cols-2 xl:grid-cols-4'>
            {articles.map((article, index) => (
                <article key={article.name} className='rounded-3xl border-2 border-amber-900 bg-amber-100 p-4'>
                    <div className='flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-amber-200'>
                        <div className='h-12 w-12 border-2 border-amber-300 bg-amber-100' />
                    </div>
                    <p className='mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-500'>
                        Article {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className='mt-2 text-lg font-semibold text-amber-900'>{article.title}</h3>
                    <p className='mt-3 text-sm leading-6 text-amber-600'>
                        {article.content[0].substring(0.150)}...
                    </p>
                    <Link to={'/articles/${article.name}'}>
                        <Button to="mt-4">Read More</Button>
                    </Link>
                </article>
            ))}
        </div>
    );
};

export default ArticleList;