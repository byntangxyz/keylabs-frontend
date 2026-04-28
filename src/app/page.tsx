import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="relative min-h-[calc(100vh-4rem)] pt-24 pb-16 px-6 md:px-12 lg:px-24 bg-[url('/images/hero-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-linear-to-r from-background/80 via-background/60 to-background/10" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col items-start gap-6 pt-30">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Build your setup.
            </h2>
            <h3 className="-mt-5 text-lg font-medium text-foreground sm:text-xl lg:text-2xl">
              Your keys, Your own rules
            </h3>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-4 py-2 text-md font-semibold text-primary-foreground shadow-sm cursor-pointer hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Get Product
            </Link>

            <div className="space-y-3 pt-60">
              <h3 className="text-2xl font-semibold uppercase tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                Customize Everything!
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-foreground/80 sm:text-base">
                Find the best switches, keycaps, and accessories for your dream
                mechanical keyboard. Premium selection, delivered straight to
                your door.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
}
