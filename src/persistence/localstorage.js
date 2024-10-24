export const handlegetproduct = () => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products) {
        return products
    }
    else {
        return [];
    }
}

//Guardar en localStorage

export const savelocalstorage = (productsin) => {
    if (productsin) {
        let productsinlocal = handlegetproduct();
        console.log(productsin);
        const existingindex = productsinlocal.findIndex((productsLocal) =>
            productsLocal.id === productsin.id
        );
        if (existingindex !== -1) {
            productsinlocal[existingindex] = productsin;
        }
        else {
            productsinlocal.push(productsin);
        }
        //setear el nuevo array
        localStorage.setItem('products', JSON.stringify(productsinlocal));
    }
}