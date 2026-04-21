import Button from '../components/Button'
import visgrid2 from '../assets/visgrid2.jpg';
import visgrid1 from '../assets/visgrid1.jpeg';
import visgrid3 from '../assets/visgrid3.jpg';
import visgrid4 from '../assets/visgrid4.jpg';
import aboutpic1 from '../assets/aboutpic1.png';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-amber-900 bg-amber-50 px-4 py-6 sm:oy-8 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="rounded-3xl border-2 border-dashed border-amber-300 bg-amber-100 p-6">
                    <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-amber-200">
                        <img src={aboutpic1} alt='aboutpic1' />
                    </div>
                </div>
                <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-500">
                        About Section
                    </p>
                    <h1 className="max-w-xl text-3xl font-bold leading-tight !text-amber-900 sm:text-4xl">
                        A profile wireframe focused on layout, spacing, and content grouping.
                    </h1>
                    <p className="mt-4 max-w-lg text-sm leading-7 text-amber-600 sm:text-base">
                        This page follows the same low-fidelity system as the homepage with a simple hero, overview blocks, and supporting sections for profile details.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Button to="/" variant="primary">
                        Back Home
                        </Button>
                        <Button to="/articles">Open Articles</Button>
                    </div>
                </div>
            </div>
        </section>

        <section className="border-y-2 border-amber-900 bg-amber-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-500">
                    Profile Overview
                </p>
                <h2 className="mt-2 text-2xl font-semibold !text-amber-900">
                    Quick summary blocks
                </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-5">
                    <p className="text-2xl font-bold text-amber-900">03</p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-500">
                        Years
                    </p>
                </div>
                <div className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-5">
                    <p className="text-2xl font-bold text-amber-900">16</p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-500">
                        Projects
                    </p>
                </div>
                <div className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-5">
                    <p className="text-2xl font-bold text-amber-900">00</p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-500">
                        Clients
                    </p>
                </div>
                <div className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-5">
                    <p className="text-2xl font-bold text-amber-900">03</p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-500">
                        Focus Areas
                    </p>
                </div>
            </div>
        </section>
        <section className="border-y-2 border-amber-900 bg-amber-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking [0.28em] text-amber-500">
                        Section Flow
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold !text-amber-900">About Me</h2>

                    <div className="mt-6 space-y-4">
                        <article className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-5">
                            <h3 className="text-lg font-semibold text-amber-900">Intro Block</h3>
                            <p className="mt-3 text-sm leading-6 text-amber-600">
                                My name is Rojge Jericho Villanueva, studying BSIT - Specializing in Mobile and Web Application
                            </p>
                        </article>

                        <article className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-5">
                            <h3 className="text-lg font-semibold text-amber-900">Experience Block</h3>
                            <p className="mt-3 text-sm leading-6 text-amber-600">
                                3rd Year IT College Student for National University - Manila Campus
                            </p>
                        </article>

                        <article className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-5">
                            <h3 className="text-lg font-semibold text-amber-900">Details Block</h3>
                            <p className="mt-3 text-sm leading-6 text-amber-600">
                                Another placeholder area for skills, notes, or references.
                            </p>
                        </article>
                    </div>
                </div>

                <div className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-50-500">
                        Visual Grid
                    </p>
                    <div className="mt-5 grid grap-4 sm:grid-cols-2">
                        <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-amber-200">
                            <img src={visgrid2} alt='visgrid2' className='rounded-[1.25rem]'/>
                        </div>
                        <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-amber-200">
                            <img src={visgrid1} alt='visgrid1' className='rounded-[1.25rem]'/>
                        </div>
                        <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-amber-200">
                            <img src={visgrid3} alt='visgrid3' className='rounded-[1.25rem]'/>
                        </div>
                        <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-amber-200">
                            <img src={visgrid4} alt='visgrid4' className='rounded-[1.25rem]'/>
                        </div>
                    </div>
                    <Button className="mt-5">View Section</Button>
                </div>
            </div>
        </section>
    </div>
  );
};

export default AboutPage;