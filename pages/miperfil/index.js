import React, {useState, useEffect}from "react";
import MainLayout from '../../components/layouts/MainLayout';
import { Suspense } from 'react';
import '../../styles/pages/home.css';
import '../../styles/pages/miperfil.css';
import Image from 'next/image';
import Link from "next/link";

const MiPerfilPage = () => {
    // ----Constantes y variables de estado-----------
    const [username, setUsername] = useState('');
    const [ficha, setFicha] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [tipo_usuario, setTipoUsuario] = useState('');
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
        }
    }, []);
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
                                 <Image 
                                        src="https://res.cloudinary.com/unidigital/image/upload/v1693070445/biometric%20services/ficha-de-datos-de-seguridad_gjl0dh.png" alt="Icono de fichas" 
                                        width={30}
                                        height={30}  />
                            </div>
                            <br/>
                            <div className="perfil-header">
                                <p className="perfil-title"><strong>Usuario:</strong> {username}</p>
                                <p className="perfil-title"><strong>Nombres:</strong> {first_name}</p>
                                <p className="perfil-title"><strong>Apellidos:</strong> {last_name}</p>
                                <p className="perfil-title"><strong>Correo:</strong> {email}</p>
                                <p className="perfil-title"><strong>Ficha:</strong> {ficha}</p>
                                <p className="perfil-title"><strong>Tipo de usuario:</strong> {tipo_usuario}</p>                                
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
