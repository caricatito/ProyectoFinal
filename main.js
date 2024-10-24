import { handlegetproduct, savelocalstorage } from "./src/persistence/localstorage";
import { renderCategories } from "./src/services/categories";
import { handlesearchProductByName } from "./src/services/search";
import { handlegetproductsToStore, handleRenderList } from "./src/views/store";
import './style.css'
import Swal from "sweetalert2";

//Aplication
export let categoriaActiva = null;

export const setCategoriaActiva = (categoriaIn) => {
  categoriaActiva = categoriaIn;
}

export let productoActivo = null;

export const setproductoActivo = (productoIn) => {
  productoActivo = productoIn;
}

handlegetproductsToStore();

renderCategories();


/*POPUP*/
const buttonadd = document.getElementById('buttonadd');
buttonadd.addEventListener("click", () => {
  openModal();
});

const cancelbutton = document.getElementById('cancelbutton');
cancelbutton.addEventListener("click", () => {
  handlecancelbutton();
});

const handlecancelbutton = () => {
  closeModal();
}


//FUNCIONES ABRIR Y CERRAR
export const openModal = () => {
  const modal = document.getElementById('modalPopUp');
  modal.style.display = "flex";
  const buttondelete = document.getElementById("deletebutton")

  if (productoActivo) {
    buttondelete.style.display = "block";
  } else {
    buttondelete.style.display = "none";
  }

  if (productoActivo) {
    const nombre = document.getElementById("nombre"),
      imagen = document.getElementById("img"),
      precio = document.getElementById("precio"),
      categoria = document.getElementById("categoria");
    nombre.value = productoActivo.nombre;
    imagen.value = productoActivo.imagen;
    precio.value = productoActivo.precio;
    categoria.value = productoActivo.categoria;
  }
}
export const closeModal = () => {
  const modal = document.getElementById('modalPopUp');
  modal.style.display = "none";
  setproductoActivo(null);
  resetModal();
}

const resetModal = () => {
  const nombre = document.getElementById("nombre"),
    imagen = document.getElementById("img"),
    precio = document.getElementById("precio"),
    categoria = document.getElementById("categoria");

  nombre.value = "";
  imagen.value = "";
  precio.value = 0;
  categoria.value = "Selecciona una Categoria";
}

//Modal Eliminar
const deletebutton = document.getElementById("deletebutton");
deletebutton.addEventListener("click", () => {
  handlebuttondelete();
})
const handlebuttondelete = () => {
  handleDeleteProduct();
}


//GUARDAR o MODIFICAR
const acceptButton = document.getElementById('acceptbutton');
acceptButton.addEventListener("click", () => {
  handlesaveormodifyelements();
})
const handlesaveormodifyelements = () => {
  const nombre = document.getElementById("nombre").value,
    imagen = document.getElementById("img").value,
    precio = document.getElementById("precio").value,
    categoria = document.getElementById("categoria").value;
  let object = null;

  if (productoActivo) {
    object = {
      ...productoActivo,
      nombre,
      imagen,
      precio,
      categoria
    }
  } else {
    object = {
      id: new Date().toISOString(),
      nombre,
      imagen,
      precio,
      categoria,
    }
  }
  Swal.fire({
    title: "",
    text: "Producto Guardado Correctamente",
    icon: "success"
  });
  savelocalstorage(object);
  handlegetproductsToStore();
  closeModal();
};

//BUTTONSEARCH

const buttonsearch = document.getElementById("buttonsearch");
buttonsearch.addEventListener("click", () => {
  handlesearchProductByName();
})


//ELiminar un ELemento
const handleDeleteProduct = () => {
  Swal.fire({
    title: "¿Desea Elminar el Producto?",
    text: "¿Seguro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      const products = handlegetproduct();
      const result = products.filter((el) => el.id !== productoActivo.id);
      //Setear unj nuevo array
      localStorage.setItem('products', JSON.stringify(result));
      const newproducts = handlegetproduct();
      handleRenderList(newproducts)
      closeModal();
    }
    else {
      closeModal();
    }
  });
}