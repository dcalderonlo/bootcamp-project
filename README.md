# Proyecto Final - Bootcamp

## Pasos para ejecutar la app:

Comando usado para realizar el container y el volumen de mongodb en docker:
>docker run -d -p 27017:27017 --name bootcamp-final_container -v bootcamp-final_data:/data/db mongo

Llenamos la base de datos mongo con los datos del archivo en data/users.json con el siguiente comando:
>docker cp src/data/users.json bootcamp-final_container:/users.json

>docker exec -it bootcamp-final_container mongoimport --db users --collection users --file /users.json --jsonArray

Para correr la app con node 20.10.xx se puede utilizar el comando:
>node --watch src/index.js
