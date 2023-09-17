import React, {useState, useEffect}from "react";
import MainLayout from '../../components/layouts/MainLayout';
import { Suspense } from 'react';
import '../../styles/pages/home.css';
import '../../styles/pages/miperfil.css';
import '../../styles/pages/usuarios.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from "next/link";

const MiPerfilPage = () => {
    // ----Constantes y variables de estado-----------
    const [access_token, setAccess] = useState('');
    const [username, setUsername] = useState('');
    const [ficha, setFicha] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [tipo_usuario, setTipoUsuario] = useState('');
    const [imagen_perfil, setImagenPerfil] = useState('');
    const [pregunta_seguridad, setPreguntaSeguridad] = useState('');
    const [respuesta_seguridad, setRespuestaSeguridad] = useState('');
    const router = useRouter();
    // ----Constantes y variables de estado-----------

    // ----Función useEffects --------------------
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUsername(localStorage.getItem('username'));
            setFicha(localStorage.getItem('ficha'));
            setFirstName(localStorage.getItem('first_name'));
            setLastName(localStorage.getItem('last_name'));
            setEmail(localStorage.getItem('email'));
            setTipoUsuario(localStorage.getItem('tipo_usuario'));
            setImagenPerfil(localStorage.getItem('imagen_perfil'));
            setPreguntaSeguridad(localStorage.getItem('pregunta_seguridad'));
            setRespuestaSeguridad(localStorage.getItem('respuesta_seguridad'));
            const storedUsuario = localStorage.getItem('access_token');
            setAccess(storedUsuario);
        }
        if (access_token == 'sin-acceso'){
            router.push('/');
        }
    }, [access_token,router]);
    // ----Función useEffects --------------------
    
    return (
        <MainLayout>
            <div className="container-all">
                <div className="header-container">
                    <div className="header-container-titulo">
                        <h1>Bienvenid@ al área de mi Perfil</h1>
                    </div>
                </div>
            
                <div className="div-contenedor">
                    <div className="qr-container">
                        <Suspense fallback={<Loading />}>
                        <div className='icon-header'> 
                                <Image src={imagen_perfil} alt="Imagen de perfil" width={80} height={80} className="rounded-image" />
                            </div>
                            <br/>
                            <div className="perfil-header">
                                <p className="perfil-title"><strong>Usuario:</strong> {username}</p>
                                <p className="perfil-title"><strong>Nombres:</strong> {first_name}</p>
                                <p className="perfil-title"><strong>Apellidos:</strong> {last_name}</p>
                                <p className="perfil-title"><strong>Correo:</strong> {email}</p>
                                <p className="perfil-title"><strong>Ficha:</strong> {ficha}</p>
                                <p className="perfil-title"><strong>Tipo de usuario:</strong> {tipo_usuario}</p>    
                                <p className="perfil-title"><strong>Pregunta de seguridad:</strong> {pregunta_seguridad}</p>   
                                <p className="perfil-title"><strong>Respuesta de seguridad:</strong> {respuesta_seguridad}</p>

                            </div>  
                            <div>
                                <Link href={`/miperfil/${username}`}><button>Editar Perfil</button></Link>
                            </div>
                        </Suspense>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
};

export default MiPerfilPage;

function Loading() {
    return <h2>🌀 Loading...</h2>;
  }
