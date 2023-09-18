import React from 'react';
import { Page, Text, View, Document, StyleSheet,  Link,  } from '@react-pdf/renderer';

import {useState, useEffect} from 'react';
import { getFichas } from '../../db/db';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFAF8'
  },
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '5vh',
    marginTop: '10px',
    marginBottom: '10px',
    color: '#1D383E',
    textDecoration: 'underline',
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 24,
  },
  titleColumn: {
    fontSize: 18,
    textDecoration: 'underline',
  },
  table:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  sections:{
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

// Create Document Component
function MyDocumentFichas (){
//----------------Variables---------------------------------
  const [originalFichas, setOriginalFichas] = useState([]);
  const [orderedFichas, setOrderedFichas] = useState([]);
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
      }, []);
  //----Función useEffect asyncrona para obtener la data de fichas-------

  return (
    <Document>
      <Page size="A4" style={styles.page}>

          <View style={styles.container}>       
            <View style={styles.detailColumn}>
              <Text style={styles.name}>Fichas</Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.sections}>
              <Text style={styles.titleColumn}> Id ficha:</Text>
            </View>
            <View style={styles.sections}>
              <Text style={styles.titleColumn}> Número de ficha:</Text>
            </View>
            <View style={styles.sections}>
              <Text style={styles.titleColumn}> Nombre de ficha:</Text>
            </View>
          </View>
          <br/>
          <View style={styles.table}>
            <View style={styles.sections}>
              
              {orderedFichas.map((ficha) => {
                // Extraer el ID de la URL
                const urlParts = ficha.url.split('/');
                const id = urlParts[urlParts.length - 2]; // Suponemos que el ID está antes del último slash

                return (
                        <div key={ficha.url}> 
                          <Text >{id}</Text>                      
                        </div>
                      );
                  })}
            </View>
            <View style={styles.sections}>
              {orderedFichas.map((ficha) => {
                // Extraer el ID de la URL
                const urlParts = ficha.url.split('/');
                const id = urlParts[urlParts.length - 2]; // Suponemos que el ID está antes del último slash

                return (
                        <div key={ficha.url}> 
                          <Text >{ficha.numero_ficha}</Text>                      
                        </div>
                      );
                  })}
            </View>
            <View style={styles.sections}>
              {orderedFichas.map((ficha) => {
                // Extraer el ID de la URL
                const urlParts = ficha.url.split('/');
                const id = urlParts[urlParts.length - 2]; // Suponemos que el ID está antes del último slash

                return (
                        <div key={ficha.url}> 
                          <Text >{ficha.nombre_ficha}</Text>                      
                        </div>
                      );
                  })}
            </View>
          </View>
      </Page>
    </Document>
  )
};

export default MyDocumentFichas;