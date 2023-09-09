import React from "react";
import MainLayout from '../../components/layouts/MainLayout';
import { getFichas } from '../../db/db';
import { useState, useEffect } from "react";
import Link from "next/link";
import '../../styles/pages/fichas.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'sonner';

function FichasPage(){
//----------------Variables---------------------------------
    const [searchTerm, setSearchTerm] = useState('');
    const [originalFichas, setOriginalFichas] = useState([]);
    const [orderedFichas, setOrderedFichas] = useState([]);
    const [usuario, setUsuario] = useState('');
    const router = useRouter();
//----------------Variables---------------------------------

//----Función useEffect asyncrona para obtener la data de fichas-------
    useEffect(() => {
//-----Función asincrona para obtener las fichas----------------
        async function fetchFichas() {
            try {
                const data = await getFichas();
                setOriginalFichas(data);
                
                const orderedData = [...data].sort((a, b) => a.numero_ficha - b.numero_ficha);
                setOrderedFichas(orderedData);
            } catch (error) {
                console.error(error);
            }
        }
//-----Función asincrona para obtener las fichas----------------

//-----Inicializar funciones-------------------------
        fetchFichas();
//-----Inicializar funciones-------------------------
    }, [usuario, router, searchTerm]);
//----Función useEffect asyncrona para obtener la data de fichas-------

//----Función Handle de busqueda para filtrar por numero y nombre de fichas---
    const handleSearch = () => {
        const filteredFichas = originalFichas.filter((ficha) => {
            return (
                ficha.numero_ficha.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ficha.nombre_ficha.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    
        const orderedFilteredFichas = [...filteredFichas].sort((a, b) => a.numero_ficha - b.numero_ficha);
    
        setOrderedFichas(orderedFilteredFichas);
    };
//----Función Handle de busqueda para filtrar por numero y nombre de fichas---

// ----Función para cargar fichas ---------------------------
    const irDescargasFichas = () => {
        toast.loading('Puedes descargar en PDF ó Excel', {
            description: ''
          });
        setTimeout(() => {
            router.push('/down-fichas');
        }, 2000);
    };



//---área visual de la página---------
    return (
        <MainLayout>
            {/* titulo */}
            <div className="contenedor_titulo_fichas">
                <h1>Bienvenid@ al área de fichas</h1>   
            </div>
            {/* titulo */}

            {/* área de búsqueda de fichas y crear */}
            <div className="contenedor_busqueda_fichas">
                <div className="div_crear_ficha">
                <Link href="/fichas/nueva" className="crear_link_ficha">Crear ficha &nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-node-plus-fill" viewBox="0 0 16 16">
  <path d="M11 13a5 5 0 1 0-4.975-5.5H4A1.5 1.5 0 0 0 2.5 6h-1A1.5 1.5 0 0 0 0 7.5v1A1.5 1.5 0 0 0 1.5 10h1A1.5 1.5 0 0 0 4 8.5h2.025A5 5 0 0 0 11 13zm.5-7.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2a.5.5 0 0 1 1 0z"/>
                </svg></Link>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Buscar por número o nombre de ficha"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>Buscar</button>
                </div>
                <div className="div_crear_ficha">
                    <button onClick={irDescargasFichas} className="crear_link_ficha">
                        Descargar fichas &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
  <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                    </button>
                </div>
            </div>
            {/* área de búsqueda de fichas y crear */}

            {/* área de la ficha, recorrido map de todas las fichas */}
            <div className="contenedor_fichas">
            {orderedFichas.map((ficha) => {
                // Extraer el ID de la URL
                const urlParts = ficha.url.split('/');
                const id = urlParts[urlParts.length - 2]; // Suponemos que el ID está antes del último slash

                return (
                        <div key={ficha.url} className="div_card_fichas">
                            <div className="div_header_fichas">
                                <Image 
                                        src="https://res.cloudinary.com/unidigital/image/upload/v1693070445/biometric%20services/ficha-de-datos-de-seguridad_gjl0dh.png" alt="Icono de fichas" 
                                        width={30}
                                        height={30}  />
                                        &nbsp;&nbsp;                               
                                <p><strong>Id ficha:</strong> {id}</p>
                            </div>
                            <div className="div_body_fichas">
                                <p><strong>▫ Número de ficha:</strong> {ficha.numero_ficha}</p>
                                <p><strong>▫ Nombre de ficha:</strong> {ficha.nombre_ficha}</p>
                            </div>
                            <div className="div_button_editar_ficha">
                                <Link href={`/fichas/${id}`} className="edit_link_ficha">Editar &nbsp;
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg></Link>
                            </div>
                        </div>
                );
            })}
            </div>
            {/* área de la ficha, recorrido map de todas las fichas */}

            <Toaster/>
        </MainLayout>
    )
};
//---área visual de la página---------
export default FichasPage;
