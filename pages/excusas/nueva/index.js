import React from "react";
import MainLayout from '../../../components/layouts/MainLayout';
import { CreateExcusa } from '../../../db/db';
import { useState, useEffect } from "react";
import '../../../styles/pages/fichas.css';
import '../../../styles/pages/excusas.css';
import '../../../styles/pages/ingresos.css';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'sonner';
import Link from 'next/link';

function NuevaExcusasPage(){
//----------------Variables---------------------------------
    const [access_token, setAccess] = useState('');
    
    const [usuario, setUsuario] = useState('');
    const [first_name, setFirsName] = useState('');
    const [last_name, setLastName] = useState('');
    const [imagen_perfil, setImagenPerfil] = useState('');
    const [tipo_usuario, setTipoUsuario] = useState('');
    const [numero_ficha, setNumeroFicha] = useState('');
    const [fecha_excusa, setFechaExcusa] = useState('');
    const [hora_excusa, setHoraExcusa] = useState('');
    const [comentario_aprendiz, setComentarioAprendiz] = useState('Sin comentario');
    const [estado_excusa, setEstadoExcusa] = useState('pendiente');
    const [comentario_instructor, setComentarioInstructor] = useState('Sin comentario');
    const [file_excusa, setFileExcusa] = useState(null);


    const [excusas, setExcusas] = useState([]);
    const [excusasAprendiz, setExcusasAprendiz] = useState([]);
    const router = useRouter();
//----------------Variables---------------------------------

//----Función useEffect asyncrona para obtener la data de fichas-------
    useEffect(() => {
        //----Función para detectar al usuario si puede acceder---------
        if (typeof window !== 'undefined') {
            const storedUsuario = localStorage.getItem('access_token');
            setAccess(storedUsuario);
            }
        if (access_token == 'sin-acceso'){
            router.push('/');
        }
//----Función para detectar al usuario si puede acceder---------
        setUsuario(localStorage.getItem('username'));
        setFirsName(localStorage.getItem('first_name'));
        setLastName(localStorage.getItem('last_name'));
        setImagenPerfil(localStorage.getItem('imagen_perfil'));
        setTipoUsuario(localStorage.getItem('tipo_usuario'));
        setNumeroFicha(localStorage.getItem('ficha'));
        
        function fechahora () {
            const fechaActual = new Date();

            // Obtener el año, el mes y el día por separado
            const año = fechaActual.getFullYear();
            const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que sumamos 1
            const dia = fechaActual.getDate();

            // Formatear la fecha como YYYY-MM-DD
            const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;

            // Obtener la hora actual
            const horaActual = fechaActual.getHours();

            // Obtener los minutos y segundos
            const minutos = fechaActual.getMinutes();
            const segundos = fechaActual.getSeconds();

            // Formatear la hora como HH:MM:SS
            const horaFormateada = `${horaActual < 10 ? '0' : ''}${horaActual}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
            setFechaExcusa(fechaFormateada);
            setHoraExcusa(horaFormateada);

        }


//-----Inicializar funciones-------------------------
        fechahora();
//-----Inicializar funciones-------------------------
    }, [access_token,router,file_excusa]);
//----Función useEffect asyncrona para obtener la data de fichas-------



const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Verificar si el archivo tiene una extensión .pdf
    if (selectedFile && selectedFile.name.endsWith('.pdf')) {
      setFileExcusa(selectedFile);
    } else {
        toast.error('Error en la creación', {
            description: 'Seleccione un archivo PDF válido.'
          });
      setFileExcusa(null);
    }
  };

//   objeto a enviar

  const objetoExcusa = {
        "username": usuario,
        "first_name": first_name,
        "last_name": last_name,
        "imagen_perfil": imagen_perfil,
        "tipo_usuario": tipo_usuario,
        "numero_ficha": numero_ficha,
        "fecha_excusa": fecha_excusa,
        "hora_excusa": hora_excusa,
        "comentario_aprendiz": comentario_aprendiz,
        "estado_excusa": estado_excusa,
        "comentario_instructor": comentario_instructor,
        "archivo_excusa": file_excusa
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file_excusa && file_excusa.name.endsWith('.pdf')) {
        CreateExcusa(objetoExcusa);
        toast.loading('Creando ', {
            description: 'Excusa'
          });
          setTimeout(() => {
            toast.success('Excusa ', {
                description: 'Creada'
              });
          }, 3000);
          setTimeout(() => {
            router.push(`/excusas`);
          }, 5000);
          
    }
    else{
        toast.error('Error en la creación', {
            description: 'Seleccione un archivo PDF válido.'
          });
    }
    
  };

//---área visual de la página---------
    return (
        <MainLayout>
            <div className='container_botton_volver'>
            <h3><Link href="/excusas" className="volver_link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg> &nbsp;Volver</Link></h3>
        </div>
            {/* titulo */}
            <div className="contenedor_titulo_fichas">
                <h1>Bienvenid@ al área de creación de excusas</h1>   
            </div>
            {/* titulo */}
            {/* Excusas del aprendiz */}
            <div className="contenedor_excusas">
            { 
                tipo_usuario == 'aprendiz' ? (<div className="card_formulario">
                <form onSubmit={handleSubmit}>
             <div className="fila_formulario">
             <label htmlFor="username">Usuario:</label>
             <input
                 type="text"
                 id="username"
                 name="username"
                 value={usuario}
                 onChange={(e) => setUsuario(e.target.value)} 
                 disabled
                 required
             />
             </div>
             <div className="fila_formulario">
             <label htmlFor="first_name">Nombres:</label>
             <input
                 type="text"
                 id="first_name"
                 name="first_name"
                 value={first_name}
                 onChange={(e) => setFirsName(e.target.value)} 
                 disabled
                 required
             />
             </div>
             <div className="fila_formulario">
             <label htmlFor="last_name">Apellidos:</label>
             <input
                 type="text"
                 id="last_name"
                 name="last_name"
                 value={last_name}
                 onChange={(e) => setLastName(e.target.value)} 
                 disabled
                 required
             />
             </div>
             <div className="fila_formulario">
             <label htmlFor="imagen_perfil">Imagen de perfil:</label>
             <input
                 type="text"
                 id="imagen_perfil"
                 name="imagen_perfil"
                 value={imagen_perfil}
                 onChange={(e) => setImagenPerfil(e.target.value)} 
                 disabled
                 required
             />
             </div>
             <div className="fila_formulario">
             <label htmlFor="tipo_usuario">Tipo de Usuario:</label>
             <input
                 type="text"
                 id="tipo_usuario"
                 name="tipo_usuario"
                 value={tipo_usuario}
                 onChange={(e) => setTipoUsuario(e.target.value)}
                 disabled 
                 required
             />
             </div>
             <div className="fila_formulario">
             <label htmlFor="numero_ficha">Número Ficha:</label>
             <input
                 type="text"
                 id="numero_ficha"
                 name="numero_ficha"
                 value={numero_ficha}
                 onChange={(e) => setNumeroFicha(e.target.value)} 
                 disabled
                 required
             />
             </div>
             <div className="fila_formulario">
             <label htmlFor="fecha_excusa">Fecha de la excusa:</label>
             <input
                 type="date"
                 id="fecha_excusa"
                 name="fecha_excusa"
                 value={fecha_excusa}
                 onChange={(e) => setNumeroFicha(e.target.value)}
                 disabled 
                 required
             />
             </div>
             <div className="fila_formulario">
             <label htmlFor="hora_excusa">Hora de la excusa:</label>
             <input
                 type="hour"
                 id="hora_excusa"
                 name="hora_excusa"
                 value={hora_excusa}
                 onChange={(e) => setHoraExcusa(e.target.value)} 
                 disabled
                 required
             />
             </div>
             <div className="fila_formulario">
             <label htmlFor="comentario_aprendiz">Comentario del aprendiz:</label>
             <input
                 type="search"
                 id="comentario_aprendiz"
                 name="comentario_aprendiz"
                 value={comentario_aprendiz}
                 placeholder="Por favor ingrese un comentario"
                 onChange={(e) => setComentarioAprendiz(e.target.value)} 
             />
             </div>
             <div className="fila_formulario">
             <label htmlFor="estado_excusa">Estado de la excusa:</label>
             <input
                 type="text"
                 id="estado_excusa"
                 name="estado_excusa"
                 value={estado_excusa}
                 onChange={(e) => setEstadoExcusa(e.target.value)} 
                 disabled
                 required
             />
             </div>
             <div className="fila_formulario">
             <label htmlFor="comentario_instructor">Comentario del instructor:</label>
             <input
                 type="search"
                 id="comentario_instructor"
                 name="comentario_instructor"
                 value={comentario_instructor}                 
                 onChange={(e) => setComentarioInstructor(e.target.value)}
                 disabled
                 required
             />
             </div>
             <div className="fila_formulario">
                 <label htmlFor="file_excusa">Archivo de la excusa:</label>
                 <input
                     type="file"
                     id="file_excusa"
                     name="file_excusa"
                     accept=".pdf"
                     onChange={handleFileChange}
                     required
                 />
                 {/* Puedes mostrar el nombre del archivo seleccionado si es necesario */}
                 
                 
                 </div>
                 <div className="fila_formulario">
                 {file_excusa && <p>Archivo seleccionado: {file_excusa.name}</p>}
                 </div>
                 <div className="button_card_excusa">
                                 <div>
                 <input type="submit" value="Enviar Excusa" className="boton_enviar_excusa"/></div>
                             </div>
             
             </form>

             </div>) : (<></>)
            }
            </div>
            {/* Excusas del aprendiz */}
            {/* Todas las excusas se muestran al instructor */}
            <div className="contenedor_excusas">
            { 
                tipo_usuario !== 'aprendiz' ? (<div className="card_formulario">
                   <form onSubmit={handleSubmit}>
                <div className="fila_formulario">
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)} 
                    disabled
                    required
                />
                </div>
                <div className="fila_formulario">
                <label htmlFor="first_name">Nombres:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={first_name}
                    onChange={(e) => setFirsName(e.target.value)} 
                    disabled
                    required
                />
                </div>
                <div className="fila_formulario">
                <label htmlFor="last_name">Apellidos:</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)} 
                    disabled
                    required
                />
                </div>
                <div className="fila_formulario">
                <label htmlFor="imagen_perfil">Imagen de perfil:</label>
                <input
                    type="text"
                    id="imagen_perfil"
                    name="imagen_perfil"
                    value={imagen_perfil}
                    onChange={(e) => setImagenPerfil(e.target.value)} 
                    disabled
                    required
                />
                </div>
                <div className="fila_formulario">
                <label htmlFor="tipo_usuario">Tipo de Usuario:</label>
                <input
                    type="text"
                    id="tipo_usuario"
                    name="tipo_usuario"
                    value={tipo_usuario}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                    disabled 
                    required
                />
                </div>
                <div className="fila_formulario">
                <label htmlFor="numero_ficha">Número Ficha:</label>
                <input
                    type="text"
                    id="numero_ficha"
                    name="numero_ficha"
                    value={numero_ficha}
                    onChange={(e) => setNumeroFicha(e.target.value)} 
                    disabled
                    required
                />
                </div>
                <div className="fila_formulario">
                <label htmlFor="fecha_excusa">Fecha de la excusa:</label>
                <input
                    type="date"
                    id="fecha_excusa"
                    name="fecha_excusa"
                    value={fecha_excusa}
                    onChange={(e) => setNumeroFicha(e.target.value)}
                    disabled 
                    required
                />
                </div>
                <div className="fila_formulario">
                <label htmlFor="hora_excusa">Hora de la excusa:</label>
                <input
                    type="hour"
                    id="hora_excusa"
                    name="hora_excusa"
                    value={hora_excusa}
                    onChange={(e) => setHoraExcusa(e.target.value)} 
                    disabled
                    required
                />
                </div>
                <div className="fila_formulario">
                <label htmlFor="comentario_aprendiz">Comentario del aprendiz:</label>
                <input
                    type="text"
                    id="comentario_aprendiz"
                    name="comentario_aprendiz"
                    value={comentario_aprendiz}
                    
                    onChange={(e) => setComentarioAprendiz(e.target.value)} 
                    disabled
                    required
                />
                </div>
                <div className="fila_formulario">
                <label htmlFor="estado_excusa">Estado de la excusa:</label>
                <input
                    type="text"
                    id="estado_excusa"
                    name="estado_excusa"
                    value={estado_excusa}
                    onChange={(e) => setEstadoExcusa(e.target.value)} 
                    disabled
                    required
                />
                </div>
                <div className="fila_formulario">
                <label htmlFor="comentario_instructor">Comentario del instructor:</label>
                <input
                    type="search"
                    id="comentario_instructor"
                    name="comentario_instructor"
                    value={comentario_instructor}
                    placeholder="Por favor ingrese un comentario"
                    onChange={(e) => setComentarioInstructor(e.target.value)}
                />
                </div>
                <div className="fila_formulario">
                    <label htmlFor="file_excusa">Archivo de la excusa:</label>
                    <input
                        type="file"
                        id="file_excusa"
                        name="file_excusa"
                        accept=".pdf"
                        onChange={handleFileChange}
                        required
                    />
                    {/* Puedes mostrar el nombre del archivo seleccionado si es necesario */}
                    
                    
                    </div>
                    <div className="fila_formulario">
                    {file_excusa && <p>Archivo seleccionado: {file_excusa.name}</p>}
                    </div>
                    <div className="button_card_excusa">
                                    <div>
                    <input type="submit" value="Enviar Excusa" className="boton_enviar_excusa"/></div>
                                </div>
                
                </form>

                </div>) : (<></>)
            }
            </div>
            {/* Todas las excusas se muestran al instructor */}
            <Toaster/>
        </MainLayout>
    )
};
//---área visual de la página---------
export default NuevaExcusasPage;
