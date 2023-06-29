# Nombre de la API

- API de Gestión Educativa

# Descripción
- Esta es una API REST desarrollada en Node.js que utiliza Sequelize como ORM (Object-Relational Mapping) y MariaDB como base de datos. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) en diferentes entidades, como Alumnos, Aulas, Carreras, Materias, Notas y Profesores. Además, se utiliza Swagger para la documentación de la API y Docker para el despliegue.


## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución de JavaScript en el servidor.

- **Sequelize**: ORM que facilita la interacción con la base de datos.

- **MariaDB**: Sistema de gestión de bases de datos relacional.

- **Docker**: Plataforma de contenedores para facilitar el despliegue y la configuración de la aplicación.

- **Swagger**: Herramienta de documentación de API que proporciona una interfaz interactiva para probar los servicios.

- **Mocha**: Framework de pruebas para realizar tests automatizados.


## Requisitos previos

Asegúrate de tener instalado lo siguiente en tu entorno de desarrollo:
- Node.js :[Descargar Node](https://nodejs.org/es/download)
- MariaDB: [Descargar MariaDB](https://mariadb.org/download/?t=mariadb)
- Docker (opcional, para contenerizar la aplicación) [Descargar Docker](https://www.docker.com/)

## Configuración
Sigue los pasos a continuación para configurar y ejecutar la API:

1. [Clona el repositorio de GitHub: git clone](https://github.com/tu-usuario/tu-repositorio.git)
1. Instala las dependencias del proyecto: npm install
1. Crea un archivo .env en la raíz del proyecto y define las variables de entorno necesarias, como las credenciales de la base de datos y el token de acceso.
1. Inicia el contenedor de Docker para la base de datos MariaDB
1. Ejecuta las migraciones y los seeds para inicializar la base de datos
1. Inicia la API: npm start
1. La API estará disponible en http://localhost:3001/api/#/

## Uso de la API

Antes de utilizar los servicios de la API, asegúrate de iniciar sesión y obtener un token de acceso válido. A continuación, se detallan los servicios disponibles:

* **Alumnos**: Permite realizar operaciones CRUD en Alumnos. Cada Alumno está asociado a una Materia.

* **Aulas**: Permite realizar operaciones CRUD en Aulas. Cada Aula está asociada a una Materia.

* **Carreras**: Permite realizar operaciones CRUD en Carreras. Cada Carrera está asociada a una Materia.

* **Materias**: Permite realizar operaciones CRUD en Materias. Cada Materia está asociada a un Alumno, un Aula, un Profesor y una Carrera.

* **Materias Carrera**: Permite realizar operaciones CRUD en la relación entre Materias y Carreras.

* **Notas**: Permite realizar operaciones CRUD en Notas. Cada Nota está asociada a una Materia y a un  Alumno.

* **Profesores**: Permite realizar operaciones CRUD en Profesores. Cada Profesor está asociado a una Materia.

Para acceder a los servicios protegidos debe tener un usuario y una contraseña para acceder al Token de acceso.

## Ejecución de pruebas

Se han implementado pruebas unitarias para garantizar el correcto funcionamiento de la API. 

## Creadores
- ***Bonadeo Lucas*** @lucasbonadeo
- ***Chiappanni Valentino*** @valentinochiappanni
- ***Noguera Julieta*** @julietanoguera






