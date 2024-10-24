import { handlegetproduct } from "../persistence/localstorage";
import { handleRenderList } from "../views/store";

export const handlesearchProductByName = () => {
    const inputheader = document.getElementById("input_header");
    const products = handlegetproduct();
    console.log(products);
    const result = products.filter((el) =>
        el.nombre.toLowerCase().includes(inputheader.value)
    );

    handleRenderList(result);
}