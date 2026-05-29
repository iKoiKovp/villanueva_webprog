import Button from '../../components/Button';
import logo from '../../assets/IS.webp';
import feature1 from '../../assets/feature1.jpg';
import feature2 from '../../assets/feature2.png';
import feature3 from '../../assets/feature3.png';

export const HomePage = ( ) => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-amber-900 bg-amber-50 px-4 py-6 sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-500">
                            Hero Section
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight !text-amber-900 sm:text-4xl">
                            Welcome to Wireframe Studio Layout
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-amber-600 sm:text-base">
                            Discover the art of wireframing with a simple layout for hero content, key <br />
                            numbers, and feature cards.
                        </p>
                        <div className="mt-6">
                            <Button to="/about" variant="primary">
                            Learn More
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-3xl border-2 border-dashed border-amber-300 bg-amber-100 p-6">
                        <img src={logo} alt='logo' />
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-amber-900 bg-amber-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-500">
                        KPI Section
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold !text-amber-900">Quick overview blocks</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-5">
                        <p className="text-2xl font-bold text-amber-900">
                            12
                        </p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-500">
                            Projects
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-5">
                        <p className="text-2xl font-bold text-amber-900">
                            08
                        </p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-500">
                            Sections
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-5">
                        <p className="text-2xl font-bold text-amber-900">
                            24
                        </p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-500">
                            Screens
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-5">
                        <p className="text-2xl font-bold text-amber-900">
                            04
                        </p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-500">
                            Layouts
                        </p>
                    </div>
                </div>
            </section>
            <section className="border-y-2 border-amber-900 bg-amber-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-500">
                        Feature Cards
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold !text-amber-900">
                        Simple wireframe cards
                    </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    <article className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-amber-200">
                            <img src={feature1} alt='feature1' />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-amber-900">Feature Card One</h3>
                        <p className="mt-3 text-sm leading-6 text-amber-600">
                            A clean placeholder for title, short text, and action.
                        </p>
                        <Button className="mt-4" variant="primary">View More</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-amber-200">
                            <img src={feature2} alt='feature2' />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-amber-900">Feature Card Two</h3>
                        <p className="mt-3 text-sm leading-6 text-amber-600">
                            Balanced spacing keeps the card layout easy to scan.
                        </p>
                        <Button className="mt-4" variant="primary">View More</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-amber-900 bg-amber-100 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-amber-200">
                            <img src={feature3} alt='feature3' />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-amber-900">Feature Card Three</h3>
                        <p className="mt-3 text-sm leading-6 text-amber-600">
                            Repeated blocks give the page a consistent wireframe rhythm.
                        </p>
                        <Button className="mt-4" variant="primary">View More</Button>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default HomePage ;