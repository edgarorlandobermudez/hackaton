# hackaton
hackaton

# Guía para Ejecutar la Aplicación

Este documento te guiará a través del proceso de configuración y ejecución de la aplicación. Si sigues estos pasos, deberías poder ejecutar la aplicación sin problemas.

## Requisitos

1. **Python**: Asegúrate de tener [Python](https://www.python.org/downloads/) instalado en tu sistema. Recomendamos usar la versión 3.8 o superior.
2. **Node.js**: Si estás trabajando con el front-end, asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema. La versión recomendada es la LTS.
3. **Docker** (Opcional): Si prefieres usar Docker para la base de datos, asegúrate de tener [Docker](https://www.docker.com/products/docker-desktop) instalado.

## Configuración del Entorno

### 1. Clona el Repositorio

Primero, necesitas clonar el repositorio a tu máquina local. Abre una terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git

## Configuración del Entorno

### 2. Configura el Entorno Virtual

Para gestionar las dependencias de Python, se recomienda utilizar un entorno virtual. Sigue estos pasos para configurar uno:

```bash
cd tu_repositorio
python -m venv my_venv

## 3. Activa el Entorno Virtual

Dependiendo de tu sistema operativo, activa el entorno virtual con uno de los siguientes comandos:

- **En Windows**:

  ```bash
  my_venv\Scripts\activate

## 4. Instala las Dependencias

Con el entorno virtual activado, instala las dependencias de Python con:

```bash

pip install -r requirements.txt

npm install

## 5. Configura la Base de Datos


Si estás usando Docker para la base de datos, puedes iniciar un contenedor de PostgreSQL con el siguiente comando:


docker-compose up -d

## 6. Ejecuta la Aplicación

**Backend:** Para iniciar el servidor de FastAPI, ejecuta:

```bash
uvicorn main:app --reload

npm start

## 7. Accede a la Aplicación

**Backend:** La API debería estar disponible en [http://localhost:8000](http://localhost:8000).

**Frontend:** La aplicación web debería estar disponible en [http://localhost:3000](http://localhost:3000).

## 8. Prueba la Aplicación

Abre tu navegador y ve a [http://localhost:3000](http://localhost:3000) para interactuar con la aplicación. Puedes usar los formularios para insertar y filtrar casos, y ver los registros existentes.

## Problemas Comunes

- **Problema de Conexión a la Base de Datos:** Asegúrate de que la base de datos esté en funcionamiento y configurada correctamente en `docker-compose.yml` o en tu configuración local.
- **Errores en el Front-End:** Verifica la consola del navegador para mensajes de error y asegúrate de que el servidor de React esté ejecutándose.

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un Fork del repositorio.
2. Crea una nueva rama para tus cambios.
3. Haz un Pull Request con una descripción clara de tus cambios.

## Licencia

Este proyecto está bajo la Licencia MIT.
