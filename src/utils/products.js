export const getFinalPrice = ({price, discountPercentage}) =>
    price - price * (discountPercentage / 100);

export const getCategories = (products) => [
    ...new Set(products.map((product) => product.category)),
];

export const getStats = (products) => {
    const inStockCount = products.filter((product) => product.inStock).length;
    const totalPrice = products.reduce(
        (sum,product) => sum + getFinalPrice(product),0
    );

    const averagePrice = products.length === 0 ? 0 : totalPrice / products.length;

    return{
        total: products.length,
        inStockCount,
        categoryCount: getCategories(products).length,
        averagePrice,
    };

}