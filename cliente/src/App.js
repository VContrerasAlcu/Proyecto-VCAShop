
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home.js';
import Detalles from './components/Detalles.js';
import Barra from './components/Barra.js';
import Compra from './components/Compra.js';
import RutaProtegida from './components/RutaProtegida.js';
import Validacion from './components/Validacion.js';
import { ProductoProvider } from './context/productoContext.js';
import Registro from './components/Registro.js';
import RecuperarPass from './components/RecuperarPass.js';
import { ClienteProvider } from './context/ClienteContext.js';
import {CarroProvider} from './context/CarroContext.js';
import { SocketProvider } from './context/WebSocketContext.js';
import { ProductosProvider } from './context/productosContext.js';
import CarroComp from './components/CarroComp.js';
import ClienteDatos from './components/ClienteDatos.js';
import PagoOk from './components/PagoOk.js';
import PagoError from './components/PagoError.js';
import { CategoriaProvider } from './context/CategoriaContext.js';
import Buscar from './components/Buscar.js';
import Conocenos from './components/Conocenos.js';
import { AvisoProvider } from './context/AvisoContext.js';




function App() {
  
  return (
    <AvisoProvider>
      <ProductosProvider>
        <SocketProvider>
          <ClienteProvider>
            <CarroProvider>
              <ProductoProvider>
                <CategoriaProvider>
                  <BrowserRouter>
                      <Barra />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/detalles" element={<Detalles />} />
                        <Route path="/compra" element={<RutaProtegida><Compra /></RutaProtegida>} />
                        <Route path="/validacion" element={<Validacion />} />
                        <Route path="/registro" element={<Registro />} />
                        <Route path="/recuperar" element={<RecuperarPass />} />
                        <Route path="/carro" element={<RutaProtegida><CarroComp /></RutaProtegida>} />
                        <Route path="/datosCliente" element={<RutaProtegida><ClienteDatos /></RutaProtegida>} />
                        <Route path="/pagoOk" element={<PagoOk />} />
                        <Route path="/pagoError" element={<PagoError />} />
                        <Route path="/buscar" element={<Buscar />} />
                        <Route path="/conocenos" element={<Conocenos />} />
                      </Routes>
                  </BrowserRouter>
                </CategoriaProvider>
              </ProductoProvider>
            </CarroProvider>
          </ClienteProvider>
        </SocketProvider>
      </ProductosProvider>
    </AvisoProvider>
  );
}

export default App;
