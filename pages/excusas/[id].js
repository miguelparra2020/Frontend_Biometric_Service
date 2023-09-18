import React from "react";
import MainLayout from '../../components/layouts/MainLayout';
import { getExcusa, updateExcusa, deleteExcusa } from '../../db/db';
import { useState, useEffect } from "react";
import '../../styles/pages/fichas.css';
import '../../styles/pages/excusas.css';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'sonner';

function IdExcusasPage(){
//----------------Variables---------------------------------
    const [access_token, setAccess] = useState('');
    const router = useRouter();
    const { id } = router.query;
    const [usuario, setUsuario] = useState('');
    const [usuario_aprendiz, setUsuarioAprendiz] = useState('');
    const [first_name, setFirsName] = useState('');
    const [last_name, setLastName] = useState('');
    const [imagen_perfil, setImagenPerfil] = useState('');
    const [tipo_usuario, setTipoUsuario] = useState('');
    const [tipo_usuario_editar, setTipoUsuarioEditar] = useState('');
    const [numero_ficha, setNumeroFicha] = useState('');
    const [fecha_excusa, setFechaExcusa] = useState('');
    const [hora_excusa, setHoraExcusa] = useState('');
    const [comentario_aprendiz, setComentarioAprendiz] = useState('Sin comentario');
    const [estado_excusa, setEstadoExcusa] = useState('pendiente');
    const [comentario_instructor, setComentarioInstructor] = useState('Sin comentario');
    const [file_excusa, setFileExcusa] = useState(null);

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
        

//-----Función asincrona para obtener las excusas----------------
        async function fecthExcusa () {
            try {
                const dataExcusa = await getExcusa(id);
                setUsuario(dataExcusa.username);
                setUsuarioAprendiz(localStorage.getItem("username"));
                setFirsName(dataExcusa.first_name);
                setLastName(dataExcusa.last_name);
                setImagenPerfil(dataExcusa.imagen_perfil);
                setTipoUsuario(localStorage.getItem("tipo_usuario"));
                setTipoUsuarioEditar(dataExcusa.tipo_usuario);
                setNumeroFicha(dataExcusa.numero_ficha);
                setFechaExcusa(dataExcusa.fecha_excusa);
                setHoraExcusa(dataExcusa.hora_excusa);
                setComentarioAprendiz(dataExcusa.comentario_aprendiz);
                setEstadoExcusa(dataExcusa.estado_excusa);
                setComentarioInstructor(dataExcusa.comentario_instructor);
                setFileExcusa(dataExcusa.archivo_excusa);


            } catch (error) {     
                toast.error('Error', {
                    description: error
                  });    
            }
        }
       
//-----Función asincrona para obtener las excusas----------------

//-----Inicializar funciones-------------------------
fecthExcusa();
//-----Inicializar funciones-------------------------
    }, [access_token,router,id]);
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await updateExcusa(id, objetoExcusa);
        toast.loading('Actualizando ', {
            description: 'Excusa'
        });
        setTimeout(() => {
            toast.success('Excusa ', {
                description: 'Actualizada'
            });
        }, 3000);
        setTimeout(() => {
            router.push(`/excusas`);
        }, 5000);  
    } catch (error) {
        toast.error('Excusa ', {
            description: error
        });
    }
      
  };

  const objetoExcusaAprendiz = {
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
  const handleSubmitAprendiz = async (e) => {
    e.preventDefault();
    try {
        await updateExcusa(id, objetoExcusaAprendiz);
        toast.loading('Actualizando ', {
            description: 'Excusa'
        });
        setTimeout(() => {
            toast.success('Excusa ', {
                description: 'Actualizada'
            });
        }, 3000);
        setTimeout(() => {
            router.push(`/excusas`);
        }, 5000); 
    } catch (error) {
        toast.error('Excusa ', {
            description: error
        });
    }
       
  };

  const handleEliminarAprendiz = async (e) => {
    e.preventDefault();
    try {
        await deleteExcusa(id);
        toast.loading('Eliminando ', {
            description: 'Excusa'
        });
        setTimeout(() => {
            toast.success('Excusa ', {
                description: 'Eliminada'
            });
        }, 3000);
        setTimeout(() => {
            router.push(`/excusas`);
        }, 5000); 
    } catch (error) {
        toast.error('Excusa ', {
            description: error
        });
    }
     
  }
//---área visual de la página---------
    return (
        <MainLayout>
            {/* titulo */}
            <div className="contenedor_titulo_fichas">
                <h1>Bienvenid@ al área de editar una excusa</h1>   
                
            </div>
            {/* titulo */}
            {/* Excusas del aprendiz */}
            <div className="contenedor_excusas">
            { 
                tipo_usuario == 'aprendiz' && usuario == usuario_aprendiz ? (<div className="card_formulario">
                <form onSubmit={handleSubmitAprendiz}>
                <div className="fila_formulario">
             <label htmlFor="username">Id excusa:</label>
             <label htmlFor="username">{id}</label>
             </div>
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
                 <input type="submit" value="Actualizar Excusa" className="boton_enviar_excusa"/></div>
                             </div>
                <br/>
                <div className="button_card_excusa">
                                 <div>
                 <button onClick={handleEliminarAprendiz} value="Eliminar Excusa" className="boton_eliminar_excusa">Eliminar Excusa</button>
                             </div></div>
                
             
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
                <label htmlFor="username">Id excusa:</label>
                <label htmlFor="username">{id}</label>
                </div>
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
                <label htmlFor="estado_excusa">Estado de la excusa:</label>
                <select
                    id="estado_excusa"
                    name="estado_excusa"
                    value={estado_excusa}
                    onChange={(e) => setEstadoExcusa(e.target.value)} 
                    required
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="aprobada">Aprobada</option>
                    <option value="anulada">Anulada</option>
                </select>
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
                    {/* Puedes mostrar el nombre del archivo seleccionado si es necesario */}
                    
                    
                    <div className="button_card_excusa">
                                    <div>
                    <input type="submit" value="Actulizar Excusa" className="boton_enviar_excusa"/></div>
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
export default IdExcusasPage;
