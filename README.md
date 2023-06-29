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



## Configuración

**Variables de entornos**:

[Ejemplo de variable de entorno](./.env_ejemplo)

```
# Base de datos
DATABASENAME = 'api'
DATABASEUSER = 'root'
DATABASEPASSWORD = 'root'
DATABASEHOST = 'localhost'
DATABASEPORT = 3310
DATABASEDIALECT = 'mariadb'
SECRET = '1234'
TEST = "false"
#Api
PORT = 5000
```

## Arrancar el proyecto

**Descargar las dependencias**:
```
 npm i
```

**Crear la base de datos con docker**:
```
docker-compose up -d
```

**Craer las tablas**:
```
npm run migrate
```

**Poblar las tablas**:
```
 npm run seed
```

**Iniciar el proyecto**:
```
 npm run start
```

## Ejecución de pruebas

Se han implementado pruebas unitarias para garantizar el correcto funcionamiento de la API.

**Usuarios de prueba**:

**Usuario 1**:

```
nombre: 'ValentinoChap'
contraseña: '123456'
```

**Usuario 2**:

```
nombre: 'LucasBona'
contraseña: '123456'
```

**Usuario 3**:

```
nombre: 'JulietaNog'
contraseña: '123456'
```

## Creadores
- ***Bonadeo Lucas*** @lucasbonadeo
- ***Chiappanni Valentino*** @valentinochiappanni
- ***Noguera Julieta*** @julietanoguera






