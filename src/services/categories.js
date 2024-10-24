import { categoriaActiva } from "../../main";
import { handlegetproduct } from "../persistence/localstorage";
import { handleRenderList } from "../views/store";

//====CATEGORIAS=======//
const handleFilterProductsByCategory = (categoryIn) => {
    const products = handlegetproduct()
    switch (categoryIn) {
        case categoriaActiva:
            handleRenderList(products)
            break;
        case "Todo":
            handleRenderList(products)
            break;

        case "Hamburguesas":
        case "Papas":
        case "Gaseosas":
            const result = products.filter((el) => el.categoria === categoryIn)
            handleRenderList(result);
        default:
            break;
        case "mayorprecio":
            const resultPrecio = products.sort((a, b) => b.precio - a.precio)
            handleRenderList(resultPrecio)
            break
        case "menorprecio":
            const resultPrecios = products.sort((a, b) => a.precio - b.precio)
            handleRenderList(resultPrecios)
            break
    }
}

export const renderCategories = () => {
    const ullist = document.getElementById("listfilter");
    ullist.innerHTML = `
    <li id="Todo">Todos los productos</li>
    <li id="Hamburguesas">Hamburguesas</li>
    <li id="Papas">Papas</li>
    <li id="Gaseosas">Gaseosas</li>
    <li id="mayorprecio">mayorprecio</li>
    <li id="menorprecio">menorprecio</li>
    ` ;
    const lielements = ullist.querySelectorAll("li");
    lielements.forEach((liElement) => {
        liElement.addEventListener("click", () => {
            handleClick(liElement);
        })
    })
    const handleClick = (elemento) => {
        handleFilterProductsByCategory(elemento.id);
        lielements.forEach((el) => {
            if (el.classList.contains("liActive")) {
                el.classList.remove("liActive")
            }
            else {
                if (elemento === el) {
                    el.classList.add("liActive")
                }
            }
        })
    }
};