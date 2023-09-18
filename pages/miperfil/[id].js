import React, { useEffect, useState, useRef } from "react";
import MainLayout from '../../components/layouts/MainLayout';
import { getUsuarios, getFichas, updateUsuario, getUsuario, deleteUsuario } from '../../db/db';
import { useRouter } from 'next/router';
import '../../styles/pages/ingresos.css';
import { Toaster, toast } from 'sonner';
import Link from 'next/link';


const EditarPerfilPage = () => {
    // ----Constantes y variables de estado-----------
    const [access_token, setAccess] = useState('');
    const [existeUsuario, setExisteUsuario] = useState(''); 
    const [id_user, setIdUser] = useState('');
    const [username, setUsername] = useState(''); 
    const [tipo_user, setTipoUser] = useState(''); 
    const [first_name, setFirstName] = useState(''); 
    const [last_name, setLastName] = useState(''); 
    const [email, setEmail] = useState('');
    const [ficha, setFicha] = useState([]);   
    const [fichas, setFichas] = useState([]); 
    const [fichaSeleccionada, setFichaSeleccionada] = useState(""); 
    const [tipo_usuario, setTipoUsuario] = useState(""); 
    const [tipo_usuario_seleccionado, setTipoUsuarioSeleccionado] = useState(""); 
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [pregunta_seguridad, setPreguntaSeguridad] = useState(null);
    const [respuesta_seguridad, setRespuestaSeguridad] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    // ----Constantes y variables de estado-----------

    
      

    

  
      
      
      

    useEffect(() => {

        setUsername(localStorage.getItem("username"));
        setTipoUser(localStorage.getItem("tipo_usuario"));
       
        if (typeof window !== 'undefined') {
            const storedUsuario = localStorage.getItem('access_token');
            setAccess(storedUsuario);
        }
        if (access_token == 'sin-acceso'){
            router.push('/');
        }
        async function fetchUsuarios() {
            const Usuarios = await getUsuarios();
            setExisteUsuario(Usuarios);
        }
        async function fetchUsuario() {
            const Usuario = await getUsuario(id);
            setFirstName(Usuario.first_name);
            setLastName(Usuario.last_name);
            setEmail(Usuario.email);
            setFichaSeleccionada(Usuario.ficha);
            setTipoUsuario(Usuario.tipo_usuario);
            setTipoUsuarioSeleccionado(Usuario.tipo_usuario);
            setPreguntaSeguridad(Usuario.pregunta_seguridad);
            setRespuestaSeguridad(Usuario.respuesta_seguridad);
            setIdUser(Usuario.id);
            console.log("Soy los datos del usuario a editar:",Usuario)
        }
        async function fetchFichas() {
            const data = await getFichas();
            setFichas(data);
            console.log(data);
        }
        fetchUsuario();
        fetchFichas();
        fetchUsuarios();
    }, [access_token, router,tipo_usuario_seleccionado,id]);

    //---Función para el cambio de selección de ficha----
    const handleFichaChangeNueva = (e) => {
        setFichaSeleccionada(e.target.value);
        setFicha(e.target.value);
    };
    //---Función para el cambio de selección de ficha----

    const handleTipoUsuarioChangeNuevo = (e) => {
        setTipoUsuarioSeleccionado(e.target.value);
    };

    const handlePreguntaChange = (e) => {
        setPreguntaSeguridad(e.target.value);
    };

    //Validación de formulario 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password != confirmPassword) {
            toast.error('Error en la contraseña', {
                description: 'Al confirmar es diferente, por favor validar!'
              });
            return;
        }

        

        const usuarioData = {
            username: id,
            email,
            first_name,
            last_name,
            ficha: fichaSeleccionada,
            tipo_usuario: tipo_usuario,
            password,
            pregunta_seguridad,
            respuesta_seguridad,
        };
        console.log("Datos a actualizar:", usuarioData);


        try {
            const actualizarUsuario = await updateUsuario(id_user, usuarioData);
            console.log(actualizarUsuario);
            toast.success('Actualización de usuario', {
                description: 'Exitoso!'
            });
            setTimeout(() => {
                router.push('/usuarios');
            }, 2000);
        } catch (error) {
            toast.error('Actualización de usuario', {
                description: 'Error', error
            });
        }
        // const createUsuario = await CreateUsuario(usuarioData);
        // console.log(createUsuario);
        
    };

    const handleEliminar = async (e) => {
        e.preventDefault();
        try {
            await deleteUsuario(id_user);
            toast.success('Eliminación de usuario', {
                description: 'Exitosa!'
            });
            setTimeout(() => {
                router.push('/usuarios');
            }, 2000);
        } catch (error) {
            toast.error('Eliminación de usuario', {
                description: 'Error', error
            });
        }

    }

    
    return(
        <MainLayout>
        <div className='container_botton_volver'>
            <h3><Link href="/miperfil" className="volver_link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg> &nbsp;Volver</Link></h3>
        </div>
        <div className="titulo-ingresos">
                <h1>Bienvenid@ al área de editar perfil</h1>  
            </div> 
        <div>
            <br/>           
            {tipo_user == 'aprendiz' && username == id ? (<>
                <form onSubmit={handleSubmit} className="container" encType="multipart/form-data">
            <div>
            Número de documento identidad = usuario:&nbsp;
            <input type="number" value={id} onChange={(e) => setUsername(e.target.value)} className="inputs-ingresos" required disabled/>
            </div>
            <div>
            Nombres:&nbsp;
            <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <div>
            Apellidos:&nbsp;
            <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <div>
            Email:&nbsp;
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="inputs-ingresos" required/>
            </div>
                        
            <div>
            Contraseña:&nbsp;
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <div>
            Confirmar contraseña:&nbsp;
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <br/>
            <br/>
            <div>
            <h3>Para la recuperación de cuenta:&nbsp;</h3> 
            </div>
            <br/><br/>
            <div>
            Escoge una pregunta de seguridad:&nbsp;
            <select value={pregunta_seguridad} className="inputs-ingresos" required onChange={handlePreguntaChange}>
                <option value="">Seleccionar pregunta</option>
                <option value="¿Cuál fue el nombre de tu primera mascota?">¿Cuál fue el nombre de tu primera mascota?</option>
                <option value="¿Cuál fue el nombre de tu mejor amigo en la infancia?">¿Cuál fue el nombre de tu mejor amigo en la infancia?</option>
                <option value="¿En qué ciudad conociste a tu primer pareja?">¿En qué ciudad conociste a tu primer pareja?</option>
                <option value="¿Cuál es tu comida favorita de la abuela?">¿En Cuál es tu comida favorita de la abuela?</option>
            </select>
            </div>
            <div>
            Respuesta a la pregunta de seguridad - <strong>en minúsculas</strong> :&nbsp;
            <input type="text" value={respuesta_seguridad} onChange={(e) => setRespuestaSeguridad(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <br/>
            <button type="submit">Actualizar Perfil <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
  <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
</svg></button> 
        </form>
           </>):(<></>)}
           {tipo_user !== 'aprendiz' ? (<>
            <form onSubmit={handleSubmit} className="container" encType="multipart/form-data">
            <div>
            Número de documento identidad = usuario:&nbsp;
            <input type="number" value={id} onChange={(e) => setUsername(e.target.value)} className="inputs-ingresos" required disabled/>
            </div>
            <div>
            Nombres:&nbsp;
            <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <div>
            Apellidos:&nbsp;
            <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <div>
            Email:&nbsp;
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <div>
            Asignar ficha:&nbsp;
            <select value={fichaSeleccionada} className="inputs-ingresos" required onChange={handleFichaChangeNueva} >
                <option value="">Selecciona una ficha</option>
                {fichas.map((ficha) => (
                    <option key={ficha.url} value={ficha.numero_ficha}>
                        {ficha.numero_ficha}
                    </option>
                ))}
            </select>
            </div>
            <div>
            Tipo de usuario:&nbsp;
            <select value={tipo_usuario} className="inputs-ingresos" required onChange={(e) => setTipoUsuario(e.target.value)} >
                <option value="">Seleccionar Tipo de Usuario</option>
                <option value="aprendiz">Aprendiz</option>
                <option value="instructor">Instructor</option>
                <option value="administrador">Administrador</option>
            </select>
            </div>
            
            <div>
            Contraseña:&nbsp;
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <div>
            Confirmar contraseña:&nbsp;
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <br/>
            <br/>
            <div>
            <h3>Para la recuperación de cuenta:&nbsp;</h3> 
            </div>
            <br/><br/>
            <div>
            Escoge una pregunta de seguridad:&nbsp;
            <select value={pregunta_seguridad} className="inputs-ingresos" required onChange={handlePreguntaChange}>
                <option value="">Seleccionar pregunta</option>
                <option value="¿Cuál fue el nombre de tu primera mascota?">¿Cuál fue el nombre de tu primera mascota?</option>
                <option value="¿Cuál fue el nombre de tu mejor amigo en la infancia?">¿Cuál fue el nombre de tu mejor amigo en la infancia?</option>
                <option value="¿En qué ciudad conociste a tu primer pareja?">¿En qué ciudad conociste a tu primer pareja?</option>
                <option value="¿Cuál es tu comida favorita de la abuela?">¿En Cuál es tu comida favorita de la abuela?</option>
            </select>
            </div>
            <div>
            Respuesta a la pregunta de seguridad - <strong>en minúsculas</strong> :&nbsp;
            <input type="text" value={respuesta_seguridad} onChange={(e) => setRespuestaSeguridad(e.target.value)} className="inputs-ingresos" required/>
            </div>
            <br/>
            <button  type="submit">Actualizar usuario <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
  <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
</svg></button> &nbsp;&nbsp;
            <button onClick={handleEliminar} >Eliminar usuario <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg></button> 
        </form>
           </>):(<></>)}

        </div>
        <Toaster/>
        </MainLayout>
    )
};


export default EditarPerfilPage;
