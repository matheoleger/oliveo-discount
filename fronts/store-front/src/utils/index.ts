export const getProductsLocalStorage = () => {
    const productsString = localStorage.getItem('CART_PRODUCTS');

    if(productsString)
        return JSON.parse(productsString) as CartProduct[];

    return [];
}

export const setProductsLocalStorage = (cartProducts: CartProduct[]) => {
    localStorage.setItem("CART_PRODUCTS", JSON.stringify(cartProducts));
}