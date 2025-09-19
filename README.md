Proyecto Registro de Créditos usando python con Flask, SQL lite y Chart.js.

Este proyecto es una herramienta web, que permite registrar créditos con los campos: cliente, monto, tasa de interés, plazo y fecha de otorgamiento.

<img width="369" height="312" alt="image" src="https://github.com/user-attachments/assets/16428055-45c8-4275-bd85-5417b979b408" />

Así mismo mostrar la lista de clientes en una tabla, la cuál se actualiza cada que se hace un nuevo registro o se elimina o se edita.

<img width="912" height="394" alt="image" src="https://github.com/user-attachments/assets/4bb92bac-2cfe-45e2-b146-b31e550ee8ef" />

y visualizar los datos en una gráfica de acorde a la preferencia, pueden ser mostrados según rangos de montos, la fecha en la que se expidió el crédito ó por el monto de cada cliente
<img width="906" height="471" alt="image" src="https://github.com/user-attachments/assets/8e7730b0-3015-46c9-9845-5c60f994fd63" /><img width="901" height="479" alt="image" src="https://github.com/user-attachments/assets/8a183679-5cf9-4921-b4bb-7c30aff01533" /><img width="917" height="498" alt="image" src="https://github.com/user-attachments/assets/cd7a68d2-bc0b-45d2-95fa-c71b08a4c573" />

Estructura del proyecto

El proyecto se compone por una lista de archivos los cuales fungen diversas aplicaciones, el archivo app.py es el servidor Flask de python en donde irá toda la lógica de los registros, se usan métodos como GGET, POST, PUT y DELETE para trabajar con la base de datos SQL lite.
El archivo index.html es la interfaz principal de la página web es escencial para que el navegador sepa que mostrar en pantalla, por último el archivo script.js es el encargado de la lógica del front end, generar la tabla, las gráficas y las acciones de los botones, el archivo style.css es solo para darle estilo y que tenga una interfaz amigable con el usuario.

<img width="167" height="273" alt="image" src="https://github.com/user-attachments/assets/82e1a59f-2560-470c-bf47-0224a09d5d72" />

Instalación y ejecución

Para este proyecto se utilizó Visual Studio Code, desde el cúal se generó un entorno virtual para trabajar, para abrir e instalar el proyecto es necesario clonarlo desde github, abrir una terminal en windows y ejecutar el sig comando:
cd (ruta donde desea clonar el repositorio) generalmente es C:\Users\(usuario de la pc)\Desktop

cd C:\Users\Ejemplo\Desktop
git clone https://github.com/WeaponX789/Herramienta-de-Registro-de-Cr-ditos

<img width="972" height="302" alt="image" src="https://github.com/user-attachments/assets/65b450cf-e9ae-40c2-aa1e-82ca5e5c823e" />

Se generará una carpeta en el escritorio con todos los archivos.

Ahora en visual studio code agregamos la carpeta al espacio de trabajo y abrimos una terminal, ejecutamos el siguiente comando: virtualenv -p python3 env  
Ahora lo activamos con el comando: .\env\Scripts\activate 

<img width="730" height="209" alt="image" src="https://github.com/user-attachments/assets/06d38a81-81a7-49f8-8a69-663580e503c8" />

 una vez activo es necesario instalar Flask para el funcionamiento del servidor
 pip install flask flask_sqlalchemy

Iniciar la aplicación con el comando python app.py

y por último ingresar a la dirección http://127.0.0.1:5000 desde el navegador

Proyecto desarrollado por Eraclio Israel Beltrán Galarza 




