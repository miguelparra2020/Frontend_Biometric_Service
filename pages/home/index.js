// --------Importaciones y librerías--------------
import React from "react";
import MainLayout from '../../components/layouts/MainLayout';
import { getIngresos, getSalidas, getUsuario, getUsuarios } from '../../db/db';
import { useState, useEffect } from "react";
import Link from "next/link";
import '../../styles/pages/home.css';
import Image from 'next/image';
import { Suspense } from 'react';
import { useRouter } from 'next/router';
import '../../styles/pages/fichas.css';
import '../../styles/pages/usuarios.css';
// --------Importaciones y librerías--------------

// ----Función de exportar el componente---------
const HomePage = () => {

//---------------Variables------------------------------------------------- 
    const [ingresos, setIngresos] = useState([]);
    const [salidas, setSalidas] = useState([]);
    const [fechaInicioFiltro, setFechaInicioFiltro] = useState(getFormattedDate());
    const [fotografia, setFotografia] = useState('');
    const [fechaFinFiltro, setFechaFinFiltro] = useState(getFormattedDate());
    const [access_token, setAccess] = useState('');
    const [username, setUsername] = useState('');
    const [usuario, setUsuario] = useState('');
    const [usuarios, setUsuarios] = useState('');
    const router = useRouter();

    const [busquedaUsuario, setBusquedaUsuario] = useState('');
    // ... (tu código actual)
//---------------Variables------------------------------------------------- 


//-------Función para obtener la fecha de hoy ---------------------
    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
//-------Función para obtener la fecha de hoy ---------------------

const realizarBusqueda = () => {
    console.log(`Valor de busquedaUsuario: ${busquedaUsuario}`);

    if (!busquedaUsuario){
        setBusquedaUsuario('')
        router.push('/home');
    }
    else{
          // Realiza la búsqueda y muestra los resultados de ingresos.
          const busquedaMinuscula = busquedaUsuario.toLowerCase(); // Convierte la búsqueda a minúsculas.

          // Realiza la búsqueda y muestra los resultados de ingresos.
          const registrosIngresosFiltrados = ingresos.filter((ingreso) => {
            const usuarioIngreso = usuarios.find((user) => user.username === ingreso.username);
        
            // Convierte first_name y last_name a minúsculas para hacer la comparación insensible a mayúsculas y minúsculas.
            const firstNameMinuscula = usuarioIngreso ? usuarioIngreso.first_name.toLowerCase() : '';
            const lastNameMinuscula = usuarioIngreso ? usuarioIngreso.last_name.toLowerCase() : '';
        
            return (
              ingreso.username.includes(busquedaMinuscula) ||
              (usuarioIngreso &&
                (firstNameMinuscula.includes(busquedaMinuscula) ||
                  lastNameMinuscula.includes(busquedaMinuscula)))
            );
          });
            // Realiza la búsqueda y muestra los resultados de salidas.
            const registrosSalidasFiltrados = salidas.filter((salida) => {
                // return salida.username.includes(busquedaUsuario);

                const usuarioSalida = usuarios.find((user) => user.username === salida.username);
        
                // Convierte first_name y last_name a minúsculas para hacer la comparación insensible a mayúsculas y minúsculas.
                const firstNameMinuscula = usuarioSalida ? usuarioSalida.first_name.toLowerCase() : '';
                const lastNameMinuscula = usuarioSalida ? usuarioSalida.last_name.toLowerCase() : '';
            
                return (
                salida.username.includes(busquedaMinuscula) ||
                (usuarioSalida &&
                    (firstNameMinuscula.includes(busquedaMinuscula) ||
                    lastNameMinuscula.includes(busquedaMinuscula)))
                );
            });
  
      // Actualiza el estado de los registros de ingresos y salidas para mostrar los resultados de la búsqueda.
      setIngresos(registrosIngresosFiltrados);
      setSalidas(registrosSalidasFiltrados);
    }
    
    
  };




//   const recargarBusqueda = () => {
//     setBusquedaUsuario('');
//     router.push('/home');
//   }
  

    useEffect(() => {
        // Esta lógica se ejecutará solo una vez cuando el componente se monte.
   
//----Función para detectar al usuario si puede acceder---------
        if (typeof window !== 'undefined') {
            const storedUsuario = localStorage.getItem('access_token');
            setAccess(storedUsuario);
            }
        if (access_token == 'sin-acceso'){
            router.push('/');
        }
        
//----Función para detectar al usuario si puede acceder---------
        
//--- obtención de la data de local storage------
        setUsername(localStorage.getItem('username'));
//--- obtención de la data de local storage------



//---Función para obtener todos los datos de todos los usuarios--------
        async function fetchUsuarios() {
        try {
            const data = await getUsuarios();
            setUsuarios(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
            }
//---Función para obtener todos los datos de todos los usuarios--------

//--- Función para obtener los datos del usuario----
        async function fetchUsuario() {
            try {
                const data = await getUsuario(username);
                setUsuario(data);
                localStorage.setItem('id',data.id);
                localStorage.setItem('first_name',data.first_name);
                localStorage.setItem('last_name',data.last_name);
                localStorage.setItem('email',data.email);
                localStorage.setItem('ficha',data.ficha);
                localStorage.setItem('tipo_usuario',data.tipo_usuario);
                // Obtén la imagen de perfil del usuario
                const imagenPerfil = data.imagen_perfil || 'https://res.cloudinary.com/unidigital/image/upload/v1694319071/biometric%20services/usuario_llozkf.png';

                // Guarda la imagen de perfil en el localStorage
                localStorage.setItem('imagen_perfil', imagenPerfil);
                setFotografia(imagenPerfil);
                localStorage.setItem('pregunta_seguridad',data.pregunta_seguridad);
                localStorage.setItem('respuesta_seguridad',data.respuesta_seguridad);

                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
//--- Función para obtener los datos del usuario----

//---Función asyncrona para obtener los datos de ingresos -----------------
        async function fetchIngreos() {
            try {
                const data = await getIngresos();
                setIngresos(data);
                console.log(data);
                // Continúa con las demás llamadas a las funciones fetch (fetchSalidas, fetchUsuario, etc.).
                // También puedes realizar el filtrado aquí si el usuario es un aprendiz.
                // if (usuario && usuario.tipo_usuario === 'aprendiz') {
                //     const registrosIngresosFiltrados = data.filter((ingreso) => {
                //         return ingreso.username === username;
                //     });
                //     setIngresos(registrosIngresosFiltrados);
                // }
            } catch (error) {
                console.error(error);
            }
        }
//---Función asyncrona para obtener los datos de ingresos -----------------

//---Función asyncrona para obtener los datos de salidas -----------------
        async function fetchSalidas() {
            try {
                const data = await getSalidas();
                setSalidas(data);
                console.log(data);
                // if (usuario && usuario.tipo_usuario === 'aprendiz') {
                //     const registrosSalidasFiltrados = data.filter((salida) => {
                //         return salida.username === username;
                //     });
                //     setSalidas(registrosSalidasFiltrados);

                // }
            } catch (error) {
                console.error(error);
            }
        }
//---Función asyncrona para obtener los datos de salidas -----------------

//---Inicializar funciones asyncronas -----------------
        fetchUsuarios();  
        fetchUsuario();
        fetchIngreos();
        fetchSalidas();  
        
//---Inicializar funciones asyncronas -----------------
    }, [access_token,username, router]);
    
    console.log(usuario)
    return (
        <MainLayout>
            {/* Imagen de perfil */}
            <div className="contenedor_titulo_asistencias">
                <Image src={fotografia} alt="Imagen de perfil" width={80} height={80} className="rounded-image" />
            </div>
            {/* Imagen de perfil */}
            {/* titulo */}
            <div className="contenedor_titulo_asistencias">
                
                <h1>Bienvenid@ {usuario.first_name} {usuario.last_name} al área de asistencias</h1>   
            </div>
            <div className="contenedor_titulo_asistencias">
                <h2>Usuario {usuario.username} {usuario.tipo_usuario} - Ficha {usuario.ficha}</h2>   
            </div>
            {/* titulo */}

            {/* Filtros */}
            <div className="contenedor_filtros_asistencias">
                <div className="div_titulo_filtrar">
                    <h1>Filtrar</h1> 
                </div>
                <div className="div_fechas"> 
                    <div className="div_fecha_inicio">
                        Por fecha inicial: &nbsp;
                        <input
                            type="date"
                            value={fechaInicioFiltro}
                            onChange={(e) => setFechaInicioFiltro(e.target.value)}
                            className="date_input" 
                        />
                    </div>
                    <div className="div_fecha_final"> 
                        hasta la fecha: &nbsp;
                        <input
                            type="date"
                            value={fechaFinFiltro}
                            onChange={(e) => setFechaFinFiltro(e.target.value)}
                            className="date_input" 
                        />
                    </div>
                    
                </div>

            </div>
                {/* busqueda por usuario */}
                {usuario.tipo_usuario !== "aprendiz" &&(
                <div className="contenedor_filtros_asistencias">
                    <div>
                            <input
                            type="text"
                            placeholder="Buscar por usuario o nombre"
                            className="date_input"
                            value={busquedaUsuario}
                            onChange={(e) => {
                                setBusquedaUsuario(e.target.value);
                            }}
                            />&nbsp; 
                            <button onClick={realizarBusqueda} className="boton_busqueda">Buscar</button>   
                    </div>
                </div>)}
                {/* busqueda por usuario */}
            {/* Filtros */}

            
            {/* registros */}
            <div className="contenedor_registros">

                {/* registros de ingresos*/}
                <div className="contenedor_registro_ingresos">

                    {/* Botón de crear un nuevo ingreso */}
                    {usuario.tipo_usuario !== "aprendiz" && (
                    <div className="div_button_editar_ficha">
                    <Link href={`/home/ingresos`} 
                    className="edit_link_ficha">
                    Crear un nuevo ingreso &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
  <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                    </svg>
                                </Link>
                    </div>)}
                    {/* Botón de crear un nuevo ingreso */}

                    {/* titulo registro de ingresos */}
                    <div className="div_titulo_registros">
                        <h1>Registros de ingresos</h1> 
                    </div>
                    {/* titulo registro de ingresos */}

                    {/* mapeo de todos los registros de ingreso */}
                    <div className="div_contenedor_card_registros">
                        
                        {/* mapeo con filtro */}
                        <Suspense fallback={<Loading />}>
                            {ingresos.filter((ingreso) => {
                                    if (!fechaInicioFiltro || !fechaFinFiltro) return true; // Mostrar todo si no se ingresaron fechas
                                    return (
                                        ingreso.fecha_ingreso >= fechaInicioFiltro &&
                                        ingreso.fecha_ingreso <= fechaFinFiltro
                                    );
                                })
                                .map((ingreso) => {
                            // Extraer el ID de la URL
                            const urlParts = ingreso.url.split('/');
                            const id = urlParts[urlParts.length - 2]; // Suponemos que el ID está antes del último slash
                            const usuario = usuarios ? usuarios.find((user) => user.username === ingreso.username) : null;

                            return (
                                <div key={ingreso.url}>
                                    {/* card completa */}
                                    <div className="div_card">

                                        {/* div header img - id */}
                                        <div className="div_card_header">
                                        <Image 
                                            src={usuario.imagen_perfil} alt="Icono de ingresos" 
                                            width={30}
                                            height={30}  className="rounded-image"/>&nbsp;&nbsp; 
                                            <p><strong>Id ingreso:</strong> {id}</p>&nbsp;&nbsp; 
                                            <Image 
                                            src="https://res.cloudinary.com/unidigital/image/upload/v1692931577/biometric%20services/acceso_wmsdly.png" alt="Icono de ingresos" 
                                            width={30}
                                            height={30}  />
                                            &nbsp;&nbsp;                               
                                            
                                        </div>
                                        {/* div header img - id */}

                                        {/* div con usuario y nombre */}
                                        <div className="div_card_usuario">
                                            <p className="div_card_usuario_ind">
                                                <strong>▫ Usuario:</strong> {ingreso.username}
                                            </p>
                                            <p className="div_card_usuario_ind">
  <strong>Nombre:</strong>{" "}
  <span className="div_card_usuario_nombre">
    {usuario ? `${usuario.first_name} ${usuario.last_name}` : "Nombre no encontrado"}
  </span>
</p>
                                        </div>
                                        {/* div con usuario y nombre */}

                                        {/* Div con fecha y hora de ingreso */}
                                        <div className="div_card_usuario">
                                            <p className="div_card_usuario_ind">
                                                <strong>▫ Fecha de ingreso:</strong> {ingreso.fecha_ingreso}</p>
                                            <p className="div_card_usuario_ind">
                                                <strong>Hora de ingreso:</strong> {ingreso.hora_ingreso}</p>
                                        </div>
                                        {/* Div con fecha y hora de ingreso */}

                                        {/* Div con ficha y zona */}
                                        <div className="div_card_usuario">
                                            <p className="div_card_usuario_ind">
                                                <strong>▫ Ficha:</strong>{" "}
                                                <span className="div_card_usuario_nombre">
                                                    {usuario ? `${usuario.ficha}` : "Ficha no encontrado"}
                                                </span>{" "}
                                            </p>
                                            <p className="div_card_usuario_ind">
                                                <strong>Zona:</strong> {ingreso.zona}
                                            </p>
                                        </div>
                                        {/* Div con ficha y zona */}

                                        {/* botón editar registro */}
                                        {usuario.tipo_usuario !== "aprendiz" && (
                                        <div className="div_card_usuario_button_editar">
                                            <Link href={`/home/ingresos/${id}`}className="edit_link">Editar &nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg></Link>
                                        </div>)}
                                        {/* botón editar registro */}
                                        
                                    </div>
                                    {/* card completa */}
                                    
                                </div>
                                );
                            })}
                        </Suspense>
                    </div>
                    {/* mapeo de todos los registros de ingreso */}

                </div>
                {/* registros de ingresos*/}

                {/* registros de salidas*/}
                <div className="contenedor_registro_ingresos">
                    {/* Botón de crear una nueva salida */}
                    {usuario.tipo_usuario !== "aprendiz" && (
                    <div className="div_button_editar_ficha">
                                <Link href={`/home/salidas`} className="edit_link_ficha">Crear una nueva salida &nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg></Link>
                    </div>)}
                    {/* Botón de crear una nueva salida */}
                    
                    {/* titulo registro de salidas */}
                    <div className="div_titulo_registros">
                        <h1>Registros de Salidas</h1>  
                    </div>
                    {/* titulo registro de salidas */}

                    {/* mapeo de todos los registros de salida */}
                    <div className="div_contenedor_card_registros">
                        {/* mapeo con filtro */}
                        <Suspense fallback={<Loading />}>
                            {salidas
                                .filter((salida) => {
                                    if (!fechaInicioFiltro || !fechaFinFiltro) return true; // Mostrar todo si no se ingresaron fechas
                                    return (
                                        salida.fecha_salida >= fechaInicioFiltro &&
                                        salida.fecha_salida <= fechaFinFiltro
                                    );
                                })
                                .map((salida) => {
                                // Extraer el ID de la URL
                                const urlParts = salida.url.split('/');
                                const id = urlParts[urlParts.length - 2]; // Suponemos que el ID está antes del último slash
                                const usuario = usuarios.find((user) => user.username === salida.username);

                                return (
                                    <div key={salida.url}>
                                        {/* card completa */}
                                        <div className="div_card">

                                            {/* div header img - id */}
                                            <div className="div_card_header">
                                                <Image 
                                                src={usuario.imagen_perfil} alt="Icono de salidas" 
                                                width={30}
                                                height={30}  className="rounded-image"/>&nbsp;&nbsp; 
                                                                               
                                                <p><strong>Id salida:</strong> {id}</p>&nbsp;&nbsp; 

                                                <Image 
                                                src="https://res.cloudinary.com/unidigital/image/upload/v1692931577/biometric%20services/cerrar-sesion_wlgj16.png" alt="Icono de ingresos" 
                                                width={30}
                                                height={30}  />
                                                &nbsp;&nbsp;
                                            </div>
                                            {/* div header img - id */}

                                            {/* div con usuario y nombre */}
                                            <div className="div_card_usuario">
                                                <p className="div_card_usuario_ind">
                                                    <strong>▫ Usuario:</strong> {salida.username}</p>
                                                <p className="div_card_usuario_ind">
                                                <strong>Nombre:</strong>{" "}
                                                <span className="div_card_usuario_nombre">
                                                    {usuario ? `${usuario.first_name} ${usuario.last_name}` : "Nombre no encontrado"}
                                                </span>{" "}
                                                </p>
                                            </div>
                                            {/* div con usuario y nombre */}

                                            {/* Div fecha y hora de ingreso */}
                                            <div className="div_card_usuario">
                                                <p className="div_card_usuario_ind">
                                                    <strong>▫ Fecha de salida:</strong> {salida.fecha_salida}</p>
                                                <p className="div_card_usuario_ind">
                                                    <strong>Hora de salida:</strong> {salida.hora_salida}</p>
                                            </div>
                                            {/* Div fecha y hora de ingreso */}

                                            {/* Div con ficha y zona */}
                                            <div className="div_card_usuario">
                                                <p className="div_card_usuario_ind">
                                                    <strong>▫ Ficha:</strong>{" "}
                                                    <span className="div_card_usuario_nombre">
                                                        {usuario ? `${usuario.ficha}` : "Ficha no encontrado"}
                                                    </span>{" "}
                                                </p>
                                                <p className="div_card_usuario_ind">
                                                    <strong>Zona:</strong> {salida.zona}
                                                </p>
                                            </div>
                                            {/* Div con ficha y zona */}

                                            {/* botón editar registro */}
                                            {usuario.tipo_usuario !== "aprendiz" && (
                                            <div className="div_card_usuario_button_editar">
                                                <Link href={`/home/salidas/${id}`}className="edit_link">Editar &nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg></Link>
                                            </div>)}
                                            {/* botón editar registro */}
                                            
                                        </div>
                                        {/* card completa */}
                                    </div>
                                        );
                                    })}
                        </Suspense>
                        {/* mapeo con filtro */}
                    </div>
                    {/* mapeo de todos los registros de salida */}

                </div>
                {/* registros de salidas*/}

            </div>
            {/* registros */}
        </MainLayout>
    )
};

export default HomePage;
// ----Función de exportar el componente---------

//---Función en caso de no carga de datos
function Loading() {
    return <h2>🌀 Loading...</h2>;
}
//---Función en caso de no carga de datos