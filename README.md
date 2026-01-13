# Juegoteca

Plataforma web de minijuegos desarrollada como parte de la cursada de **Laboratorio IV**, utilizando **Angular** y **Firebase**.  
El proyecto permite a los usuarios registrarse, jugar distintos minijuegos, competir mediante puntuaciones globales y comunicarse a través de un chat en tiempo real.

**Demo online:**  
https://sala-de-juegos-ezequiel-melo.web.app/home

**Repositorio:**  
https://github.com/EzequielMelo/TP_LaboratorioIV_SalaDeJuegos

---

## Descripción del Proyecto

**Juegoteca** es una aplicación web orientada al entretenimiento, compuesta por una colección de minijuegos con sistema de usuarios, puntajes y rankings globales.

El acceso a los juegos y al chat está restringido únicamente a usuarios autenticados.  
Cada juego cuenta con su propia lógica, sistema de vidas y registro de puntuación, la cual se almacena de forma persistente en la base de datos.

Este proyecto fue mi **primer acercamiento a Angular y Firebase**, y sirvió como base para desarrollos posteriores de mayor complejidad.

---

## Juegos Incluidos

El sistema cuenta con **4 minijuegos**, tres definidos por la consigna de la materia y uno de elección libre:

### Ahorcado

- Juego clásico de adivinar palabras antes de perder todas las vidas.
- Las palabras se obtienen dinámicamente desde una **API externa**.

### Mayor o Menor

- Juego de cartas donde el usuario debe adivinar si la siguiente carta será mayor o menor que la actual.
- El puntaje se acumula según las respuestas correctas consecutivas.

### Preguntados

- Juego de preguntas tipo quiz con múltiples categorías.
- Las preguntas se consumen desde una **API externa**, utilizando una API Key personalizada.

### Arma las Palabras (Juego elegido)

- A partir de una palabra inicial, el usuario debe formar todas las palabras posibles.
- El objetivo es encontrar todas las combinaciones válidas para ganar la partida.

---

## Sistema de Usuarios

- Autenticación mediante **Firebase Authentication**.
- Registro y login de usuarios.
- Acceso restringido a juegos y chat solo para usuarios logueados.
- Persistencia de datos de usuario, puntajes y progreso en **Firestore**.

---

## Chat Global

- Chat en tiempo real accesible solo para usuarios autenticados.
- Implementado con **Firebase Firestore**.
- Permite la interacción entre todos los jugadores conectados.

---

## Aprendizajes y Desafíos

Este proyecto representó un hito importante en mi formación como desarrollador, ya que me permitió:

- Trabajar por primera vez con **Angular** y su arquitectura basada en componentes.
- Utilizar **TypeScript** de forma práctica.
- Integrar **Firebase** como solución completa (auth, base de datos y hosting).
- Implementar lógica de juegos con manejo de estados, vidas y puntuaciones.
- Consumir **APIs externas** desde el frontend.
- Crear funcionalidades en tiempo real (chat).
- Diseñar una aplicación responsive con **Tailwind CSS**.

Los conocimientos adquiridos en este proyecto fueron fundamentales para el desarrollo posterior de aplicaciones más complejas, como el proyecto **Clínica Online**.

---

## Tecnologías Utilizadas

- **Angular**
- **TypeScript**
- **Firebase**
  - Authentication
  - Firestore
  - Hosting
- **Tailwind CSS**
- APIs externas para contenido dinámico

---

## Notas

Este proyecto fue desarrollado con fines académicos, priorizando la correcta implementación de la lógica, la arquitectura de la aplicación y el aprendizaje de nuevas tecnologías por sobre la complejidad visual.

---
