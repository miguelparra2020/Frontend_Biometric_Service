// --------Importaciones y librerías--------------
import React from "react";
import MainLayout from '../../components/layouts/MainLayout';
import { getIngresos, getSalidas, getUsuario, getUsuarios, getFichas } from '../../db/db';
import { useState, useEffect } from "react";
import Link from "next/link";
import '../../styles/pages/home.css';
import Image from 'next/image';
import { Suspense } from 'react';
import { useRouter } from 'next/router';
import '../../styles/pages/fichas.css';
import '../../styles/pages/usuarios.css';
import { Toaster, toast } from 'sonner';
import * as XLSX from 'xlsx';
// --------Importaciones y librerías--------------

// ----Función de exportar el componente---------
const HomePage = () => {

    const handleImageError = () => {
        // Recarga la página en caso de error
        window.location.reload();
      };

//---------------Variables------------------------------------------------- 
    const [ingresosTodosIniciales, setIngresosTodosIniciales] = useState([]);
    const [salidasTodasIniciales, setSalidasTodasIniciales] = useState([]);
    const [ingresosTodos, setIngresosTodos] = useState([]);
    const [salidasTodas, setSalidasTodas] = useState([]);

    const [ingresosAprendiz, setIngresosAprendiz] = useState([]);
    const [salidasAprendiz, setSalidasAprendiz] = useState([]);

    const [fichas, setFichas] = useState([]);
    const [fichaSeleccionada, setFichaSeleccionada] = useState([]);
    
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
        toast.loading('Buscando', {
        description: `${busquedaUsuario}`
        });
    
        if (!busquedaUsuario) {
        setBusquedaUsuario('');
        router.push('/home');
        } else {
        // Convierte la búsqueda a minúsculas.
        const busquedaMinuscula = busquedaUsuario.toLowerCase();
    
        // Realiza la búsqueda y muestra los resultados de ingresos.
        const registrosIngresosFiltrados = ingresosTodos.filter((ingreso) => {
            const usuarioIngreso = usuarios.find((user) => user.username === ingreso.username);
    
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
        const registrosSalidasFiltrados = salidasTodas.filter((salida) => {
            const usuarioSalida = usuarios.find((user) => user.username === salida.username);
    
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
        setIngresosTodos(registrosIngresosFiltrados);
        setSalidasTodas(registrosSalidasFiltrados);
        }
    };
  

    const recargarBusqueda = () => {
            setBusquedaUsuario('');
            toast.loading('Actulizando', {
                description: 'registros...'
            });
            router.push('/home');
    }

    const filtrarFicha = () => {
        toast.loading('Filtrando por ficha N.', {
            description: fichaSeleccionada
        });
        // Filtra los registros de ingreso basados en la ficha seleccionada
        const registrosIngresosFichas = ingresosTodosIniciales.filter((ingreso) => {
          return fichaSeleccionada === ingreso.ficha;
        });

        // Filtra los registros de salida basados en la ficha seleccionada
        const registrosSalidasFichas = salidasTodasIniciales.filter((salida) => {
            return fichaSeleccionada === salida.ficha;
          });
        
      
      
        // Actualiza el estado 'ingresosTodos' con los registros filtrados
        setIngresosTodos(registrosIngresosFichas);
        setSalidasTodas(registrosSalidasFichas);
      };

      const exportToExcelIngresos = (dataIngresos) => {
        // Crear un libro de trabajo (workbook)
        const wb = XLSX.utils.book_new();
      
        // Crear una hoja de trabajo (worksheet) con tus datos
        const ws = XLSX.utils.json_to_sheet(dataIngresos);
      
        // Agregar la hoja de trabajo al libro de trabajo
        XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
      
        // Descargar el archivo Excel con un nombre específico (por ejemplo, "Report.xlsb")
        XLSX.writeFile(wb, "Reporte ingresos.xlsb");
      }
      
      const exportToExcelSalidas = (dataSalidas) => {
        // Crear un libro de trabajo (workbook)
        const wb = XLSX.utils.book_new();
      
        // Crear una hoja de trabajo (worksheet) con tus datos
        const ws = XLSX.utils.json_to_sheet(dataSalidas);
      
        // Agregar la hoja de trabajo al libro de trabajo
        XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
      
        // Descargar el archivo Excel con un nombre específico (por ejemplo, "Report.xlsb")
        XLSX.writeFile(wb, "Reporte salidas.xlsb");
      }


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

            } catch (error) {
                console.error(error);
            }
        }
//--- Función para obtener los datos del usuario----
//--- Función para obtener los datos del usuario----
        async function fetchUsuarios() {
            try {
                const data = await getUsuarios();
                setUsuarios(data);
                

            } catch (error) {
                console.error(error);
            }
        }
//--- Función para obtener los datos del usuario----


        async  function fetchIngresosTodos(){
            
            try {
                const dataIngresos = await getIngresos();
                const dataUsuarios = await getUsuarios();
                const todosIngresosArray = [];
                dataIngresos.forEach(ingreso => {
                    const usuarioCorrespondiente = dataUsuarios.find(usuario => usuario.username === ingreso.username);
                    const urlParts = ingreso.url.split('/');
                    const id = urlParts[urlParts.length - 2];
                    const nuevoIngreso = {
                        ...ingreso, 
                        id_ingreso: id,
                        first_name: usuarioCorrespondiente ? usuarioCorrespondiente.first_name : 'first_name no encontrado',
                        last_name: usuarioCorrespondiente ? usuarioCorrespondiente.last_name : 'last_name no encontrado',
                        ficha: usuarioCorrespondiente ? usuarioCorrespondiente.ficha : 'ficha no encontrada',
                        imagen_perfil: usuarioCorrespondiente ? usuarioCorrespondiente.imagen_perfil : 'https://res.cloudinary.com/unidigital/image/upload/v1694319071/biometric%20services/usuario_llozkf.png',
                      };
                    todosIngresosArray.push(nuevoIngreso);
                  });
                  setIngresosTodosIniciales(todosIngresosArray);
                  setIngresosTodos(todosIngresosArray);
                

            } catch (error) {
                console.error(error);
            }
        };

        async  function fetchIngresosAprendiz(){            
            try {
                const dataIngresos = await getIngresos();
                const username = localStorage.getItem("username");
                
                const todosIngresosAprendiz = [];

                dataIngresos.forEach(ingreso => { 
                    if (username == ingreso.username) {
                        const urlParts = ingreso.url.split('/');
                        const id = urlParts[urlParts.length - 2];
                        const nuevoIngreso = {
                                ...ingreso, 
                                id_ingreso: id,
                                first_name: localStorage.getItem('first_name'),
                                last_name: localStorage.getItem('last_name'),
                                ficha: localStorage.getItem('ficha'),
                                imagen_perfil: localStorage.getItem('imagen_perfil'),
                        }
                        
                        todosIngresosAprendiz.push(nuevoIngreso);
                    }
                });

                setIngresosAprendiz(todosIngresosAprendiz);
                

            } catch (error) {
                console.error(error);
            }
        };

        async  function fetchSalidasTodas(){
            
            try {
                const dataSalidas = await getSalidas();
                const dataUsuarios = await getUsuarios();
                const todasSalidasArray = [];
                dataSalidas.forEach(salida => {
                    const usuarioCorrespondiente = dataUsuarios.find(usuario => usuario.username === salida.username);
                    const urlParts = salida.url.split('/');
                    const id = urlParts[urlParts.length - 2];
                    const nuevaSalida = {
                        ...salida, 
                        id_salida: id,
                        first_name: usuarioCorrespondiente ? usuarioCorrespondiente.first_name : 'first_name no encontrado',
                        last_name: usuarioCorrespondiente ? usuarioCorrespondiente.last_name : 'last_name no encontrado',
                        ficha: usuarioCorrespondiente ? usuarioCorrespondiente.ficha : 'ficha no encontrada',
                        imagen_perfil: usuarioCorrespondiente ? usuarioCorrespondiente.imagen_perfil : 'https://res.cloudinary.com/unidigital/image/upload/v1694319071/biometric%20services/usuario_llozkf.png',
                      };
                      todasSalidasArray.push(nuevaSalida);
                  });
                  setSalidasTodasIniciales(todasSalidasArray);
                  setSalidasTodas(todasSalidasArray);
                

            } catch (error) {
                console.error(error);
            }
        };

        async  function fetchSalidasAprendiz(){            
            try {
                const dataSalidas = await getSalidas();
                const username = localStorage.getItem("username");
                
                const todasSalidasAprendiz = [];

                dataSalidas.forEach(salida => { 
                    if (username == salida.username) {
                        const urlParts = salida.url.split('/');
                        const id = urlParts[urlParts.length - 2];
                        const nuevaSalida = {
                                ...salida, 
                                id_salida: id,
                                first_name: localStorage.getItem('first_name'),
                                last_name: localStorage.getItem('last_name'),
                                ficha: localStorage.getItem('ficha'),
                                imagen_perfil: localStorage.getItem('imagen_perfil'),
                        }
                        
                        todasSalidasAprendiz.push(nuevaSalida);
                    }
                });

                setSalidasAprendiz(todasSalidasAprendiz);
                

            } catch (error) {
                console.error(error);
            }
        };

        async  function fetchFichas(){            
            try {
                const dataFichas = await getFichas();
                setFichas(dataFichas);
            } catch (error) {
                console.error(error);
            }
        };

//---Inicializar funciones asyncronas -----------------
        fetchUsuario();
        fetchUsuarios();
        // fetchSalidas();
        fetchIngresosTodos();  
        fetchSalidasTodas();
        fetchIngresosAprendiz();
        fetchSalidasAprendiz();
        fetchFichas();
        
//---Inicializar funciones asyncronas -----------------
    }, [access_token,username, router]);
    
   


    return (
        <MainLayout>
            {/* Imagen de perfil */}
            <div className="contenedor_titulo_asistencias">
                <Image src={fotografia} alt="Imagen de perfil" width={80} height={80} className="rounded-image" loading="lazy" />
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
            {/* busqueda por usuario y nombre */}
            {usuario.tipo_usuario !== "aprendiz" &&(
            <div className="contenedor_filtros_asistencias">
                <div>
                        <input
                        
                        type="text"
                        placeholder="Buscar por usuario o nombre"
                        className="searh_input"
                        value={busquedaUsuario}
                        onChange={(e) => {
                            setBusquedaUsuario(e.target.value);
                        }}
                        /><br/> <br/> 
                        <button onClick={realizarBusqueda} className="boton_busqueda">Buscar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></button>&nbsp;    
                        <button onClick={recargarBusqueda} className="boton_busqueda">Recargar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg></button>   
                </div>
            </div>)}
            <br/>
            {/* busqueda por usuario y nombre*/}

            {/* busqueda por ficha */}
            {usuario.tipo_usuario !== "aprendiz" &&(
            <div className="contenedor_filtros_asistencias">
            <select
            className="searh_input"
              value={fichaSeleccionada}
              onChange={(e) => {
                setFichaSeleccionada(e.target.value);
                 // Llama a la función filtrarFicha cuando se seleccione una opción.
              }}
            >
              <option value="">Selecciona una ficha</option>
              {fichas.map((ficha) => (
                <option key={ficha.url} value={ficha.numero_ficha}>
                  {ficha.numero_ficha}
                </option>
              ))}
            </select>
            <button onClick={filtrarFicha}
            className="boton_busqueda"
          >Filtrar por ficha</button>
          </div>       
          
                
          )}
            {/* busqueda por ficha*/}
            {/* Filtros */}

            
            {/* todos los registros*/}
            <div className="contenedor_registros">

                {/* registros de ingresos todos*/}
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
                    {usuario.tipo_usuario !== "aprendiz" && (
                    <button onClick={() => exportToExcelIngresos(ingresosTodos)} className="boton_descargar_excel"
                    >Descargar Excel de Ingresos <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-xlsx" viewBox="0 0 16 16"
                    
                    >
                    <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM7.86 14.841a1.13 1.13 0 0 0 .401.823c.13.108.29.192.479.252.19.061.411.091.665.091.338 0 .624-.053.858-.158.237-.105.416-.252.54-.44a1.17 1.17 0 0 0 .187-.656c0-.224-.045-.41-.135-.56a1.002 1.002 0 0 0-.375-.357 2.028 2.028 0 0 0-.565-.21l-.621-.144a.97.97 0 0 1-.405-.176.37.37 0 0 1-.143-.299c0-.156.061-.284.184-.384.125-.101.296-.152.513-.152.143 0 .266.023.37.068a.624.624 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.093 1.093 0 0 0-.199-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.552.05-.777.15-.224.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.123.524.082.149.199.27.351.367.153.095.332.167.54.213l.618.144c.207.049.36.113.462.193a.387.387 0 0 1 .153.326.512.512 0 0 1-.085.29.558.558 0 0 1-.255.193c-.111.047-.25.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 0 1-.249-.115.578.578 0 0 1-.255-.384h-.764Zm-3.726-2.909h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415H1.5l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Zm1.923 3.325h1.697v.674H5.266v-3.999h.791v3.325Zm7.636-3.325h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Z"/>
                  </svg></button>)}
                    {/* titulo registro de ingresos */}

                    {/* mapeo de todos los registros de ingreso del aprendiz */}
                    <Suspense fallback={<Loading />}>
                    {usuario.tipo_usuario === "aprendiz" && (
                        <div className="div_contenedor_card_registros">
                        {/* mapeo con filtro */}
                        
                            {ingresosAprendiz.filter((ingreso) => {
                                    if (!fechaInicioFiltro || !fechaFinFiltro) return true; // Mostrar todo si no se ingresaron fechas
                                    return (
                                        ingreso.fecha_ingreso >= fechaInicioFiltro &&
                                        ingreso.fecha_ingreso <= fechaFinFiltro
                                    );
                                })
                                .map((ingreso) => {                            return (
                                <div key={ingreso.url}>
                                    {/* card completa */}
                                    <div className="div_card">

                                        {/* div header img - id */}
                                        <div className="div_card_header">
                                        <Image 
                                            src={ingreso.imagen_perfil} alt="Icono de ingresos" 
                                            width={30}
                                            height={30}  
                                            loading="lazy"
                                            className="rounded-image"/>&nbsp;&nbsp; 
                                            <p><strong>Id ingreso: {ingreso.id_ingreso} </strong></p>&nbsp;&nbsp; 
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
                                            {ingreso.first_name} {ingreso.last_name} 
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
                                                    {ingreso.ficha}
                                                </span>
                                            </p>
                                            <p className="div_card_usuario_ind">
                                                <strong>Zona:</strong> {ingreso.zona}
                                            </p>
                                        </div>
                                        {/* Div con ficha y zona */}

                                        
                                    </div>
                                    {/* card completa */}
                                    
                                </div>
                                );
                            })}
                        
                    </div>)}
                    </Suspense>
                    {/* mapeo de todos los registros de ingreso del aprendiz */}

                    {/* mapeo de todos los registros de ingreso de todos */}
                    <Suspense fallback={<Loading />}>
                    {usuario.tipo_usuario !== "aprendiz" && (
                        
                        <div className="div_contenedor_card_registros">
                        {/* mapeo con filtro */}
                        
                            {ingresosTodos.filter((ingreso) => {
                                    if (!fechaInicioFiltro || !fechaFinFiltro) return true; // Mostrar todo si no se ingresaron fechas
                                    return (
                                        ingreso.fecha_ingreso >= fechaInicioFiltro &&
                                        ingreso.fecha_ingreso <= fechaFinFiltro
                                    );
                                })
                                .map((ingreso) => {                            return (
                                <div key={ingreso.url}>
                                    {/* card completa */}
                                    <div className="div_card">

                                        {/* div header img - id */}
                                        <div className="div_card_header">
                                        <Image 
                                            src={ingreso.imagen_perfil} alt="Icono de ingresos" 
                                            width={30}
                                            height={30}  
                                            loading="lazy"
                                            className="rounded-image"/>&nbsp;&nbsp; 
                                            <p><strong>Id ingreso: {ingreso.id_ingreso} </strong></p>&nbsp;&nbsp; 
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
                                            {ingreso.first_name} {ingreso.last_name} 
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
                                                    {ingreso.ficha}
                                                </span>
                                            </p>
                                            <p className="div_card_usuario_ind">
                                                <strong>Zona:</strong> {ingreso.zona}
                                            </p>
                                        </div>
                                        {/* Div con ficha y zona */}

                                        {/* botón editar registro */}
                                <div className="div_card_usuario_button_editar">
                                            <Link href={`/home/ingresos/${ingreso.id_ingreso}`}className="edit_link">Editar &nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg></Link>
                                        </div>
                                        {/* botón editar registro */}
                                        
                                    </div>
                                    {/* card completa */}
                                    
                                </div>
                                );
                            })}
                        
                    </div>)}
                    </Suspense>
                    {/* mapeo de todos los registros de ingreso todos*/}

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
                    {usuario.tipo_usuario !== "aprendiz" && (
                    <button onClick={() => exportToExcelSalidas(salidasTodas)}                   
                    className="boton_descargar_excel">Descargar Excel de Salidas <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-xlsx" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM7.86 14.841a1.13 1.13 0 0 0 .401.823c.13.108.29.192.479.252.19.061.411.091.665.091.338 0 .624-.053.858-.158.237-.105.416-.252.54-.44a1.17 1.17 0 0 0 .187-.656c0-.224-.045-.41-.135-.56a1.002 1.002 0 0 0-.375-.357 2.028 2.028 0 0 0-.565-.21l-.621-.144a.97.97 0 0 1-.405-.176.37.37 0 0 1-.143-.299c0-.156.061-.284.184-.384.125-.101.296-.152.513-.152.143 0 .266.023.37.068a.624.624 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.093 1.093 0 0 0-.199-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.552.05-.777.15-.224.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.123.524.082.149.199.27.351.367.153.095.332.167.54.213l.618.144c.207.049.36.113.462.193a.387.387 0 0 1 .153.326.512.512 0 0 1-.085.29.558.558 0 0 1-.255.193c-.111.047-.25.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 0 1-.249-.115.578.578 0 0 1-.255-.384h-.764Zm-3.726-2.909h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415H1.5l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Zm1.923 3.325h1.697v.674H5.266v-3.999h.791v3.325Zm7.636-3.325h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Z"/>
                  </svg></button>)}
                    {/* titulo registro de salidas */}

                    {/* mapeo de todos los registros de salida del aprendiz */}
                    <Suspense fallback={<Loading />}>
                    {usuario.tipo_usuario === "aprendiz" && (
                        <div className="div_contenedor_card_registros">
                        {/* mapeo con filtro */}
                        
                            {salidasAprendiz
                                .filter((salida) => {
                                    if (!fechaInicioFiltro || !fechaFinFiltro) return true; // Mostrar todo si no se ingresaron fechas
                                    return (
                                        salida.fecha_salida >= fechaInicioFiltro &&
                                        salida.fecha_salida <= fechaFinFiltro
                                    );
                                })
                                .map((salida) => {

                                return (
                                    <div key={salida.url}>
                                        {/* card completa */}
                                        <div className="div_card">

                                            {/* div header img - id */}
                                            <div className="div_card_header">
                                            <Image 
                                            src={salida.imagen_perfil} alt="Icono de ingresos" 
                                            width={30}
                                            height={30}  
                                            loading="lazy"
                                            onError={handleImageError}
                                            className="rounded-image"/>&nbsp;&nbsp; 
                                                                               
                                                <p><strong>Id salida:</strong> {salida.id_salida}</p>&nbsp;&nbsp; 

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
                                                    {salida.first_name} {salida.last_name}
                                                </span>
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
                                                        {salida.ficha}
                                                    </span>
                                                </p>
                                                <p className="div_card_usuario_ind">
                                                    <strong>Zona:</strong> {salida.zona}
                                                </p>
                                            </div>
                                            {/* Div con ficha y zona */}

                                           
                                            
                                        </div>
                                        {/* card completa */}
                                    </div>
                                        );
                                    })}
                        
                        {/* mapeo con filtro */}
                    </div>
                    )}
                    </Suspense>
                    {/* mapeo de todos los registros de salida del aprendiz */}

                    {/* mapeo de todos los registros de salida */}
                    <Suspense fallback={<Loading />}>
                    {usuario.tipo_usuario !== "aprendiz" && (
                    <div className="div_contenedor_card_registros">
                        {/* mapeo con filtro */}
                        
                            {salidasTodas
                                .filter((salida) => {
                                    if (!fechaInicioFiltro || !fechaFinFiltro) return true; // Mostrar todo si no se ingresaron fechas
                                    return (
                                        salida.fecha_salida >= fechaInicioFiltro &&
                                        salida.fecha_salida <= fechaFinFiltro
                                    );
                                })
                                .map((salida) => {

                                return (
                                    <div key={salida.url}>
                                        {/* card completa */}
                                        <div className="div_card">

                                            {/* div header img - id */}
                                            <div className="div_card_header">
                                            <Image 
                                            src={salida.imagen_perfil} alt="Icono de ingresos" 
                                            width={30}
                                            height={30}  
                                            loading="lazy"
                                            onError={handleImageError}
                                            className="rounded-image"/>&nbsp;&nbsp; 
                                                                               
                                                <p><strong>Id salida:</strong> {salida.id_salida}</p>&nbsp;&nbsp; 

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
                                                    {salida.first_name} {salida.last_name}
                                                </span>
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
                                                        {salida.ficha}
                                                    </span>
                                                </p>
                                                <p className="div_card_usuario_ind">
                                                    <strong>Zona:</strong> {salida.zona}
                                                </p>
                                            </div>
                                            {/* Div con ficha y zona */}

                                            {/* botón editar registro */}
                                            
                                            <div className="div_card_usuario_button_editar">
                                                <Link href={`/home/salidas/${salida.id_salida}`}className="edit_link">Editar &nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg></Link>
                                            </div>
                                            {/* botón editar registro */}
                                            
                                        </div>
                                        {/* card completa */}
                                    </div>
                                        );
                                    })}
                        
                        {/* mapeo con filtro */}
                    </div>)}
                    </Suspense>
                    {/* mapeo de todos los registros de salida */}

                </div>
                {/* registros de salidas*/}

            </div>
            {/* todos los registros*/}
            <Toaster/>
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