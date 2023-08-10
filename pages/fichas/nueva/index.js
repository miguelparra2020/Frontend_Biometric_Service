import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CreateFicha,getFichas } from '../../../db/db';
import { useRouter } from 'next/router';

import MainLayout from '../../../components/layouts/MainLayout'


function NuevaFichaPage() {
    const [numero_ficha, setNumeroFicha] = useState(''); // Estado para el numero_ficha
    const [nombre_ficha, setNombreFicha] = useState(''); // Estado para el nombre_ficha
    const [existeFicha, setExisteFichas] = useState([]); // Estado para almacenar las fichas existentes 
    const router = useRouter();

    //Fetch para validar si la ficha exite
    useEffect(() => {
        async function fetchFichas() {
          const fichas = await getFichas();
          setExisteFichas(fichas);
        }
    
        fetchFichas();
      }, []);

      //Validación de formulario 
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validar si el numero de la ficha ya existe del producto ya existe
        const fichaExiste = existeFicha.some((ficha) => ficha.numero_ficha === numero_ficha);
        if (fichaExiste) {
          alert('El número de la ficha ya existe. Por favor, ingrese un número único.');
          return;
        }
    
        const fichaData = {
            numero_ficha,
            nombre_ficha,
        };
        console.log(fichaData);
        const createFicha = await CreateFicha(fichaData);
        console.log(fichaData);
        alert("Ha creado la ficha de manera exitosa");
        router.push(`/fichas`);
      };

    
    return(
        <MainLayout>
        <div>
            <h3><Link href="/fichas">Volver</Link></h3>
        </div>
        <div>
            <h1>Crear ficha</h1>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
            <label>
            Número de la ficha:
            <input type="number" value={numero_ficha} onChange={(e) => setNumeroFicha(e.target.value)} />
            </label>
            <label>
            Nombre de la ficha:
            <input type="text" value={nombre_ficha} onChange={(e) => setNombreFicha(e.target.value)} />
            </label>
            <button type="submit">Crear ficha</button> 
        </form>
        </div>
        </MainLayout>
    )
}

export default NuevaFichaPage;