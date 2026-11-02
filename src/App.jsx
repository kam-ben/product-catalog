import { products } from "./data/products.js";
import { formatMoney } from "./utils/format.js";
import { getCategories, getFinalPrice, getStats } from "./utils/products.js";

function App (){
    const stats = getStats (products);
    const categories = getCategories(products);
    const statsCards = [
        {label: "products", value: stats.total},
        {label: "in Stock", value: stats.inStockCount},
        {label: "categories", value: stats.categoryCount},
        {label: "Average Price", value: formatMoney(stats.averagePrice)},
    ];

   return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
          <p className="mt-2 text-slate-600">
            Everything below is calculated from one list of products.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {products.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            No products available.
          </p>
        ) : (
          <>
            <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {statsCards.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
                >
                  <dt className="text-sm text-slate-500">{label}</dt>
                  <dd className="mt-1 text-2xl font-bold tabular-nums">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {categories.map((category) => {
              const items = products
                .filter((product) => product.category === category)
                .sort((a, b) => getFinalPrice(a) - getFinalPrice(b));

              return (
                <section key={category} className="mt-10">
                  <h2 className="text-xl font-semibold">{category}</h2>
                  <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((product) => {
                      const finalPrice = getFinalPrice(product);
                      const hasDiscount = product.discountPercent > 0;

                      return (
                        <li
                          key={product.id}
                          className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
                        >
                          <div
                            aria-hidden="true"
                            className={`relative flex h-36 items-center justify-center bg-slate-100 text-6xl ${
                              product.inStock ? "" : "grayscale"
                            }`}
                          >
                            {product.emoji}
                            {hasDiscount && (
                              <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-0.5 text-xs font-bold text-white">
                                -{product.discountPercent}%
                              </span>
                            )}
                            {!product.inStock && (
                              <span className="absolute right-3 top-3 rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-bold text-white">
                                Sold out
                              </span>
                            )}
                          </div>

                          <div className="flex flex-1 flex-col p-5">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p
                              className="text-sm text-slate-500"
                              aria-label={`Rated ${product.rating} out of 5`}
                            >
                              ★ {product.rating}
                            </p>

                            <div className="mt-3 flex items-baseline gap-2">
                              <span className="text-lg font-bold tabular-nums">
                                {formatMoney(finalPrice)}
                              </span>
                              {hasDiscount && (
                                <span className="text-sm tabular-nums text-slate-500 line-through">
                                  {formatMoney(product.price)}
                                </span>
                              )}
                            </div>

                            <div className="mt-auto pt-4">
                              <button
                                type="button"
                                disabled={!product.inStock}
                                className="w-full cursor-pointer rounded-lg bg-cyan-700 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:active:scale-100"
                              >
                                {product.inStock ? "Add to cart" : "Out of stock"}
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </>
        )}
      </main>
    </div>
  );
}

export default App;