import { openModal, setproductoActivo } from "../../main";
import { handlegetproduct } from "../persistence/localstorage"

//Funcion q trae elementos y llama al store
export const handlegetproductsToStore = () => {
    const products = handlegetproduct();
    handleRenderList(products);
}

//Se encarga de filtrar y renderizar la seccion y sus respectivos elementos
export const handleRenderList = (productsin) => {
    //Filtra arrays
    const burgers = productsin.filter((el) => el.categoria === "Hamburguesas");
    const papas = productsin.filter((el) => el.categoria === "Papas");
    const gaseosas = productsin.filter((el) => el.categoria === "Gaseosas");

    //Renderiza, tengo q aprender a escribir length pq tomaba todo falso por eso
    const renderProductGroup = (productos, title) => {
        console.log(productos);
        if (productos.length > 0) {
            const productosHTML = productos.map((producto, index) => {
                return `<div class="containerTargetItem" id="product-${producto.categoria}-${index}">
                    <div>
                    <img src=${producto.imagen}/>
                    <div>
                    <h2>${producto.nombre}</h2>
                    </div>
                    <div class="tarjetprops">
                    <p><b>Precio:</b> $ ${producto.precio}</p>
                    <p><b>Categoria:</b>${producto.categoria}</p>
                    </div>
                    </div>
                </div>
                `
            });
            //Retorna la seccion
            return `
            <section class="sectionStore">
            <div class="containertitle">
                <h3>${title}</h3>
            </div>
            <div class="containerProductStore">
            ${productosHTML.join("")}
            </div>
            </section>
            `
        } else {
            return ""
        }
    };

    //renderizar cada producto

    const appContainer = document.getElementById("storecontainer");
    appContainer.innerHTML = `
    ${renderProductGroup(burgers, "Hamburguesas")}
    ${renderProductGroup(papas, "Papas")}
    ${renderProductGroup(gaseosas, "Gaseosas")}
    `
    //Añade eventos de manera dinamica
    const addEvents = (productsin) => {
        if (productsin) {
            productsin.forEach((element, index) => {
                const productcontainer = document.getElementById(
                    `product-${element.categoria}-${index}`
                );
                productcontainer.addEventListener("click", () => {
                    setproductoActivo(element);
                    openModal();
                })
            });
        }
    }
    addEvents(burgers);
    addEvents(papas);
    addEvents(gaseosas);
};