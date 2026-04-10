import React from 'react';
import Button from '../components/Button';

function NotFoundPage() {
    return (
        <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-amber-50 px-4 text-center">
            <div className="relative mb-8">
                <p className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-amber-900">
                    Oopsies!
                </p>
            </div>
            <h2 className="text-3xl font-bold tracking-tight !text-amber-900 sm:text-4xl">
                Page Not Found
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-amber-600">
                The link you followed to get here must be broken, or the page has been moved. 
                Let's get you back on track!
            </p>
            <div className="mt-10">
                <Button to="/">Return to Homepage</Button>
            </div>
        </div>
    );
}

export default NotFoundPage;