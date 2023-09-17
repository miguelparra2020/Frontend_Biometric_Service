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
    const [excusasAprendiz, setExcusasAprendiz] = useState([]);
    const [estadoFiltrado, setEstadoFiltrado] = useState("pendiente"); 
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
                const usuario = localStorage.getItem('username');
                const dataAprendiz = [];
                console.log(data);     
                setExcusas(data);  
                setTipoUsuario(localStorage.getItem('tipo_usuario')) ;  
                console.log("Soy usuario:", usuario);

                // Filtrar data según el usuario
                data.forEach(item => {
                    if (item.username === usuario) {
                        dataAprendiz.push(item);
                    }
                });

                console.log("Data del aprendiz:", dataAprendiz);
                setExcusasAprendiz(dataAprendiz);

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

    const excusasFiltradas = excusas.filter(item => item.estado_excusa === estadoFiltrado);
//---área visual de la página---------
    return (
        <MainLayout>
            {/* titulo */}
            <div className="contenedor_titulo_fichas">
                <h1>Bienvenid@ al área de excusas</h1>   
            </div>
            <div className="button_card_excusa">
                                    <div><Link href="/excusas/nueva" className="boton_editar_excusa"><button> Crear excusa</button></Link></div>
                                </div>
            {/* titulo */}
            {/* Excusas del aprendiz */}
            <div className="contenedor_excusas">
            { 
                tipo_usuario == 'aprendiz' ? (<div>
                    {excusasAprendiz.map((item) => (
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
                                    <div><strong>Tipo:</strong>   {item.tipo_usuario}</div>
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
                                    <div>◽<strong>Estado:</strong> {item.estado_excusa}</div>&nbsp;
                                    <div>
                                        {item.estado_excusa == "pendiente" ? (<Image src="https://res.cloudinary.com/unidigital/image/upload/v1694903486/biometric%20services/caducado_zvji6p.png" width={25} height={25} alt="Imagen de pdf"/>) : (<></>)}
                                        {item.estado_excusa == "aprobada" ? (<Image src="https://res.cloudinary.com/unidigital/image/upload/v1694903699/biometric%20services/cheque_c4qgg7.png" width={25} height={25} alt="Imagen de pdf"/>) : (<></>)}
                                        {item.estado_excusa == "anulada" ? (<Image src="https://res.cloudinary.com/unidigital/image/upload/v1694903759/biometric%20services/rechazado_i5mzyx.png" width={25} height={25} alt="Imagen de pdf"/>) : (<></>)}
                                        
                                        </div>
                                </div>
                                <br/>
                                <div className="fila_card_excusa">
                                    <div>◽<strong>Comentarios del instructor:</strong> {item.comentario_instructor}</div>
                                </div>
                                <br/>
                                <div className="button_card_excusa">
                                    <div><Link href={`/excusas/${item.id}`} className="boton_editar_excusa"><button> Editar Excusa <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button></Link></div>
                                </div>
                                                       
                            </div>
                        ))}
                </div>) : (<></>)
            }
            </div>
            {/* Excusas del aprendiz */}
            {/* Todas las excusas se muestran al instructor */}
            <div className="contenedor_excusas">
            { 
                tipo_usuario !== 'aprendiz' ? (<div>
                    <div className="fila_botones">
                    <button onClick={() => setEstadoFiltrado("pendiente")}className="boton_pendiente">Pendientes <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg></button>&nbsp;&nbsp;&nbsp;
                    <button onClick={() => setEstadoFiltrado("aprobada")}className="boton_aprobada">Aprobadas <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg></button>&nbsp;&nbsp;&nbsp;
                    <button onClick={() => setEstadoFiltrado("anulada")}className="boton_anulada">Anuladas <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
</svg></button></div>
                    {excusasFiltradas.map((item) => (
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
                                    <div><strong>Tipo:</strong>   {item.tipo_usuario}</div>
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
                                    <div>◽<strong>Estado:</strong> {item.estado_excusa}</div>&nbsp;
                                    <div>
                                        {item.estado_excusa == "pendiente" ? (<Image src="https://res.cloudinary.com/unidigital/image/upload/v1694903486/biometric%20services/caducado_zvji6p.png" width={25} height={25} alt="Imagen de pdf"/>) : (<></>)}
                                        {item.estado_excusa == "aprobada" ? (<Image src="https://res.cloudinary.com/unidigital/image/upload/v1694903699/biometric%20services/cheque_c4qgg7.png" width={25} height={25} alt="Imagen de pdf"/>) : (<></>)}
                                        {item.estado_excusa == "anulada" ? (<Image src="https://res.cloudinary.com/unidigital/image/upload/v1694903759/biometric%20services/rechazado_i5mzyx.png" width={25} height={25} alt="Imagen de pdf"/>) : (<></>)}
                                        
                                        </div>
                                </div>
                                <br/>
                                <div className="fila_card_excusa">
                                    <div>◽<strong>Comentarios del instructor:</strong> {item.comentario_instructor}</div>
                                </div>
                                <br/>
                                <div className="button_card_excusa">
                                    <div><Link href={`/excusas/${item.id}`}className="boton_editar_excusa"><button> Editar Excusa <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button></Link></div>
                                </div>
                                                       
                            </div>
                        ))}
                </div>) : (<></>)
            }
            </div>
            {/* Todas las excusas se muestran al instructor */}

        </MainLayout>
    )
};
//---área visual de la página---------
export default ExcusasPage;
