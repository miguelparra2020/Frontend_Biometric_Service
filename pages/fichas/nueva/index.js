import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CreateFicha,getFichas } from '../../../db/db';
import { useRouter } from 'next/router';
import '../../../styles/pages/ingresos.css';
import MainLayout from '../../../components/layouts/MainLayout';
import { Toaster, toast } from 'sonner';


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
          toast.error('Error en la creación', {
            description: 'Ficha ingresada ya existe'
          });
          return;
        }
    
        const fichaData = {
            numero_ficha,
            nombre_ficha,
        };
        console.log(fichaData);
        const createFicha = await CreateFicha(fichaData);
        console.log(fichaData);
        toast.success('Exito en la creación', {
          description: 'Ficha creada'
        });
        setTimeout(() => {
            router.push(`/fichas`);
        }, 2000);

        
      };

    
    return(
        <MainLayout>
        <div className='container_botton_volver'>
            <h3><Link href="/fichas" className="volver_link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg> &nbsp;Volver</Link></h3>
        </div>
        <div className="titulo-ingresos">
            <h1>Crear ficha</h1>
        </div>
        <div>
            <form onSubmit={handleSubmit} className="container">
            <label>
            Número de la ficha:
            <input type="number" value={numero_ficha} onChange={(e) => setNumeroFicha(e.target.value)} className="inputs-ingresos" required/>
            </label>
            <label>
            Nombre de la ficha:
            <input type="text" value={nombre_ficha} onChange={(e) => setNombreFicha(e.target.value)} className="inputs-ingresos" required/>
            </label>
            <button type="submit">Crear ficha</button> 
        </form>
        </div>
        <Toaster/>
        </MainLayout>
    )
}

export default NuevaFichaPage;