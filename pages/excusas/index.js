import React from "react";
import MainLayout from '../../components/layouts/MainLayout';
import { getExcusas } from '../../db/db';
import { useState, useEffect } from "react";
import Link from "next/link";
import '../../styles/pages/fichas.css';
import '../../styles/pages/excusas.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

function ExcusasPage(){
//----------------Variables---------------------------------
    const [access_token, setAccess] = useState('');
    const [tipo_usuario, setTipoUsuario] = useState('');
    const [excusas, setExcusas] = useState([]);
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

//-----Función asincrona para obtener las excusas----------------
        async function fecthExcusas () {
            try {
                const data = await getExcusas();
                console.log(data);     
                setExcusas(data);  
                setTipoUsuario(localStorage.getItem('tipo_usuario')) ;         
            } catch (error) {
                console.log(error);                
            }
        }
       
//-----Función asincrona para obtener las excusas----------------

//-----Inicializar funciones-------------------------
    fecthExcusas();
//-----Inicializar funciones-------------------------
    }, [access_token,router]);
//----Función useEffect asyncrona para obtener la data de fichas-------


//---área visual de la página---------
    return (
        <MainLayout>
            {/* titulo */}
            <div className="contenedor_titulo_fichas">
                <h1>Bienvenid@ al área de excusas</h1>   
            </div>
            {/* titulo */}
            { 
                tipo_usuario == 'aprendiz' ? (<div>Soy aprendiz</div>) : (<></>)
            }
            <div className="contenedor_excusas">
            { 
                tipo_usuario !== 'aprendiz' ? (<div>
                    {excusas.map((item) => (
                            <div key={item.id} className="card_excusa">
                                <div className="header_card_excusa"> 
                                    <div><Image src={item.imagen_perfil} width={50} height={50} alt="Imagen de perfil" className="imagen_perfil_card_excusa"/></div>
                                    &nbsp;&nbsp;
                                    <div><strong>Id excusa:</strong>  {item.id} </div>
                                    &nbsp;&nbsp;
                                    <div><Image src="https://res.cloudinary.com/unidigital/image/upload/v1694901295/biometric%20services/historial-medico_ekakxl.png" width={40} height={40} alt="Imagen de excusa"/></div>
                                </div>
                                <br/>
                                <div className="fila_card_excusa">
                                    <div>◽<strong>Usuario:</strong> {item.username}</div>&nbsp;&nbsp;
                                    <div><strong>Nombre:</strong>  {item.first_name}  {item.last_name}</div>
                                </div>
                                <div className="fila_card_excusa">
                                    <div>◽<strong>Ficha:</strong> {item.numero_ficha}</div>&nbsp;&nbsp;
                                    <div><strong>Tipo:</strong>  {item.first_name}  {item.tipo_usuario}</div>
                                </div>
                                <div className="fila_card_excusa">
                                    <div>◽<strong>Comentario del aprendiz:</strong> {item.comentario_aprendiz}</div>
                                </div>
                                <br/>
                                <div className="fila_card_excusa">
                                    <div><strong>Archivo Excusa:</strong> 
                                        <Link href={item.archivo_excusa} target="_blank"> <Image src="https://res.cloudinary.com/unidigital/image/upload/v1694902849/biometric%20services/pdf_juwlld.png" width={30} height={30} alt="Imagen de pdf"/></Link>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="fila_card_excusa">
                                    <div>◽<strong>Estado:</strong> {item.estado_excusa}</div>
                                </div>

                                                       
                            </div>
                        ))}
                </div>) : (<></>)
            }
            </div>

        </MainLayout>
    )
};
//---área visual de la página---------
export default ExcusasPage;
