import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-auto border-t-2 border-amber-900 bg-amber-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-900 uppercase tracking-wider">IkoSite</span>
                </div>
                <p className="text-sm text-amber-500">
                    © All rights reserved.
                </p>
                <div className="flex gap-6 text-sm font-medium text-amber-600">
                    <a href="#" className="hover:text-amber-900">Privacy Policy</a>
                    <a href="#" className="hover:text-amber-900">Contact Support</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;