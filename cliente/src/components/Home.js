import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Producto from "../classes/Producto.js";
import ProductoMin from "./ProductoMin.js";
import { productosContext } from "../context/productosContext.js";
import { SocketContext } from "../context/WebSocketContext.js";
import { CarroContext } from "../context/CarroContext.js";
import { CategoriaContext } from "../context/CategoriaContext.js";
import { ClienteContext } from "../context/ClienteContext.js";
import actualizarProductos from "../services/actualizacionProductos.js";
import { productoEnCarro } from "../services/utilsCarro.js";
import { AvisoContext } from "../context/AvisoContext.js";
import Swal from 'sweetalert2';





/**
 * Componente Home
 * Muestra los productos disponibles según la categoría seleccionada.
 */
function Home() {
  const { productos, setProductos } = useContext(productosContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { socket } = useContext(SocketContext);
  const { carro } = useContext(CarroContext);
  const [actualizar, setActualizar] = useState(true);
  const [productosCargados, setProductosCargados] = useState(false);
  const { categoriaSeleccionada, setCategoriaSeleccionada } = useContext(CategoriaContext);
  const { cliente } = useContext(ClienteContext);
  const { avisoMostrado, setAvisoMostrado } = useContext(AvisoContext);
  

  useEffect(() => {
    if (!avisoMostrado) {
      Swal.fire({
        title: '🛍️ Simulación de tienda',
        html: `
          <p>Esta tienda es una <strong>simulación</strong> creada como proyecto final del Grado Superior de DAW</p>
          <p>en el <strong>Instituto La Marisma de Huelva</strong>.</p>
        `,
        icon: 'info',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6',
        background: '#fefefe',
        customClass: {
          popup: 'animated fadeInDown'
        }
      });
      setAvisoMostrado(true);
    }


  }, [avisoMostrado, setAvisoMostrado]);

  /**
   * Carga los productos desde la API si no están en el contexto
   */
  useEffect(() => {
    if (!categoriaSeleccionada) setCategoriaSeleccionada('destacados');

    if (productos.length === 0) {
      fetch(`${process.env.REACT_APP_API_URL}/productos`)
        .then((response) => response.json())
        .then((data) => {
          const arrayProductos = data.map(
            (item) =>
              new Producto(
                item.id,
                item.nombre,
                item.descripcion,
                item.precio,
                item.stock,
                item.imagen,
                item.categoria,
                item.destacado
              )
          );
          setProductos(arrayProductos);
        });
    } else {
      console.log('Productos actualizados en Home, sin recargar desde API.');
      if (carro && carro.length > 0) {
        console.log(`informacion de carro en home: ${carro[0].producto.nombre}, ${carro[0].cantidad}`);
      }
    }
  }, [productos, carro, categoriaSeleccionada]);

  /**
   * Renderiza los productos filtrados por categoría y excluye los que ya están en el carrito
   */
  return (
    <div>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          padding: 0,
          listStyle: 'none'
        }}
      >
        {productos.map((producto) => {
          const enCarro = carro ? productoEnCarro(producto, carro) : false;

          // Si el producto ya está en el carro, no lo mostramos
          if (enCarro) return null;

          // Si la categoría es distinta de 'destacados'
          if (categoriaSeleccionada !== 'destacados') {
            return producto.categoria === categoriaSeleccionada ? (
              <li key={producto.id}>
                <ProductoMin producto={producto} />
              </li>
            ) : null;
          }

          // Si la categoría es 'destacados'
          return producto.destacado ? (
            <li key={producto.id}>
              <ProductoMin producto={producto} />
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
}

export default Home;