import React, { useEffect, useState, useRef } from "react";
import MainLayout from '../../../components/layouts/MainLayout';
import { getUsuarios, getFichas, CreateUsuario } from '../../../db/db';
import { useRouter } from 'next/router';
import '../../../styles/pages/ingresos.css';
import { Toaster, toast } from 'sonner';
import Image from 'next/image';


const CrearUsuarioPage = () => {
    // ----Constantes y variables de estado-----------
    const [access_token, setAccess] = useState('');
    const [existeUsuario, setExisteUsuario] = useState(''); 
    const [username, setUsername] = useState(''); 
    const [first_name, setFirstName] = useState(''); 
    const [last_name, setLastName] = useState(''); 
    const [email, setEmail] = useState('');
    const [ficha, setFicha] = useState([]);  
    const [fichas, setFichas] = useState([]); 
    const [fichaSeleccionada, setFichaSeleccionada] = useState(""); 
    const [tipo_usuario, setTipoUsuario] = useState(""); 
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [imagen_perfil, setImagenPerfil] = useState(null);
    const [imagenMostrar, setImagenMostrar] = useState(null);
    const [mostrarVideo, setMostrarVideo] = useState(false);
    const [pregunta_seguridad, setPreguntaSeguridad] = useState(null);
    const [respuesta_seguridad, setRespuestaSeguridad] = useState(null);
    const videoRef = useRef(null);
    const router = useRouter();

    // ----Constantes y variables de estado-----------


      
    const handleCameraClick = async () => {
        setMostrarVideo(true);
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
        } catch (error) {
          console.error('Error al acceder a la cámara: ', error);
        }
      };
    
      // Función para convertir base64 en objeto File
function base64ToFile(base64, filename) {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
  
    const byteArray = new Uint8Array(byteArrays);
  
    return new File([byteArray], filename, { type: 'image/png' }); // Puedes ajustar el tipo de archivo según corresponda
  }
  
  // En tu función handleCaptureClick
  const handleCaptureClick = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const capturedImageDataUrl = canvas.toDataURL('image/png');
    setImagenMostrar(capturedImageDataUrl);
    // Llama a la función base64ToFile para convertirlo en un objeto File
    const capturedImageFile = base64ToFile(capturedImageDataUrl, 'captured_image.png');
  
    // Asigna el objeto File a files[0]
    setImagenPerfil(capturedImageFile);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    setMostrarVideo(false);
  };

      
      
      

    useEffect(() => {
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
        async function fetchFichas() {
            const data = await getFichas();
            setFichas(data);
            console.log(data);
        }
        fetchFichas();
        fetchUsuarios();
    }, [access_token, router]);

    //---Función para el cambio de selección de ficha----
    const handleFichaChange = (e) => {
        setFichaSeleccionada(e.target.value);
        setFicha(e.target.value);
    };
    //---Función para el cambio de selección de ficha----

    const handleTipoUsuarioChange = (e) => {
        setTipoUsuario(e.target.value);
    };

    const handlePreguntaChange = (e) => {
        setPreguntaSeguridad(e.target.value);
    };

    //Validación de formulario 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validar si el usuario ya existe
        const usuarioExiste = existeUsuario.some((usuario) => usuario.username === username);
        if (usuarioExiste) {
            toast.error('Error en el usuario', {
                description: 'El usuario ingresado ya existe, por favor ingrese un valor diferente.'
              });
            return;
        }
        if (password != confirmPassword) {
            toast.error('Error en la contraseña', {
                description: 'Al confirmar es diferente, por favor validar!'
              });
            return;
        }

         // Validar que al menos una de las dos opciones tenga contenido
        if (!imagen_perfil && !imagenMostrar) {
            toast.error('Error en la imagen de perfil', {
            description: 'Debes seleccionar una imagen o tomar una foto antes de enviar el formulario.'
            });
            return;
        }

        // Si no se seleccionó una imagen de perfil, utiliza la imagen predeterminada
        const imagenPerfilAEnviar = imagen_perfil || 'https://res.cloudinary.com/unidigital/image/upload/v1694319071/biometric%20services/usuario_llozkf.png';

        const usuarioData = {
            username,
            email,
            first_name,
            last_name,
            ficha,
            tipo_usuario,
            password,
            imagen_perfil: imagenPerfilAEnviar, // Utiliza la imagen predeterminada si no se selecciona una
            pregunta_seguridad,
            respuesta_seguridad,
        };
        console.log(usuarioData);



        const createUsuario = await CreateUsuario(usuarioData);
        console.log(createUsuario);
        toast.success('Registro de usuario', {
            description: 'Exitoso!'
        });
        setTimeout(() => {
            router.push('/usuarios');
        }, 2000);
    };

    
    return(
        <MainLayout>
        <div>
            {/* <h3><Link href="/fichas">Volver</Link></h3> */}
        </div>
        <div className="titulo-ingresos">
                <h1>Bienvenid@ al área de crear usuarios</h1>  
            </div> 
        <div>
            <form onSubmit={handleSubmit} className="container" encType="multipart/form-data">
            <div>
            Número de documento identidad = usuario:&nbsp;
            <input type="number" value={username} onChange={(e) => setUsername(e.target.value)} className="inputs-ingresos" required/>
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
            <select value={fichaSeleccionada} className="inputs-ingresos" required onChange={handleFichaChange}>
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
            <select value={tipo_usuario} className="inputs-ingresos" required onChange={handleTipoUsuarioChange}>
                <option value="">Seleccionar Tipo de Usuario</option>
                <option value="aprendiz">Aprendiz</option>
                <option value="instructor">Instructor</option>
                <option value="administrador">Administrador</option>
            </select>
            </div>
            
            <div>
                Fotografía del usuario:&nbsp;
                <input type="file" onChange={(e) => setImagenPerfil(e.target.files[0])} className="inputs-ingresos" />
                <br/>
                <br/>
                <button onClick={handleCameraClick}>Tomar foto desde la cámara</button>
                <br/>
                <br/>
                <button onClick={handleCaptureClick}>Capturar</button>
                <br/>
                {imagenMostrar && <Image src={imagenMostrar} alt="Imagen de perfil" width={200} height={200} />}
                {mostrarVideo && (
                    <video ref={videoRef} autoPlay width={300} height={300} className="videoDiv" />
                )}
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
            <button type="submit">Crear usuario</button> 
        </form>
        </div>
        <Toaster/>
        </MainLayout>
    )
};


export default CrearUsuarioPage;
