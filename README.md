# bankingApp

Aplicación de Banca para prueba técnica

# puesta en marcha(deploy)

```
npm install && npm start
```

# Usuarios de prueba y con datos

```
Jonathan
"accountNumber": "2011902833",
    "password": "7e6uz8!\"rnjp8i"

Mauricio

"accountNumber": "7085211582",
    "password": "lywl59<>cihrg4",

Gladys

"accountNumber": "1643195360",
    "password": "4u5zi5)=0u9ryg",


Admin

"accountNumber": "1120201823",
    "password": "z7kio7<>6j68oj",
```

# EndPoints /api

## POST /users

Cear usuarios solicitando los siguientes datos:

- name
- lastName
- age
- bankBalance
- roleUser: opcional [ADMIN | CLIENT], por defecto será CLIENT

Ejemplo usuario cliente:

```
{
  "name": "Jean",
  "lastName": "Grey",
  "age": 20,
  "bankBalance": 10000
}
```

Ejemplo usuario Administrador

```
{
    "name": "admin",
    "lastName": "admin",
    "age": 0,
    "bankBalance": 0,
    "roleUser": "ADMIN"
}
```

## GET /users

Obtiene todos los usuarios registrados en el sistema. Requiere privilegios de administrador

## GET /account

Obtiene los datos del usuario de sesión. Requiere login

## POST /login

Login en la aplicación. Es requerido el número de cuenra generado en el registro de usuarios y la contraseña.
Ejemplo:
Request

```
{
    "accountNumber": "2011902833",
    "password": "7e6uz8!\"rnjp8i"
}
```

Reponse
Un JWT para añadir a las cabeceras de autenticación (Bearer Token)

## GET /connections

Todas las conexiones del cliente de sesión (Las que ha enviado y las que ha aceptado). Requiere autenticación

## GET /connections/detail

Obtienen los datos básicos de los usuarios conectados al usuario de la sesión

## GET /connections/request

Obtiene las peticiones de conexión que han enviado otros usuarios al usuario de la sesión

## POST /connections

Envía una solicitud de conexión a un usuario.
Requiere indicar el número de cuenta del usuario al que se quiere enviar la petición de conexión.
Ejemplo
Request:

```
{
    "accountNumber": "7085211582"
}
```

## POST /connections/actions

Permite realizar acciones sobre las conexiones
### Aprobar conexión
Aprueba conexión que está en estado SEND. LAs peticiones por aprobar se obtienen por medio del servicio /aconnections/request

Para aprobar la petición es necesario indicar el número de cuenta del usuario que ha enviado la solicitud e indicar el estado
Ejemplo:

```
{
    "accountNumber": "7085211582",
    "actionStatus": "APROVED"
}
```

### Cancelar conexión

Cancela una petición enviada. Para cancelar la petición es necesario informar el número de cuenta del usuario al que se le envió la petición
Ejemplo:

```
{
    "accountNumber": "7085211582",
    "actionStatus": "DISABLED"
}
```

## GET /transactions

Obtiene todas las transacciones en las que participa el usuario de la sesión (transaciones enviadas y recibidas)

## GET /transactions/export

Exporta en un csv las transacciones del usuario de la sesión

Ejemplo

```
"Sender","Receiver","Amount","TimeStamp"
"2011902833","7085211582",5,"2022-03-07T10:07:54.474Z"
"2011902833","7085211582",700,"2022-03-07T10:51:28.869Z"
"2011902833","7085211582",1200,"2022-03-07T11:10:28.757Z"
```

## POST /transactions

Crea una transacción. El usuario de la sesión figura como emisor de la transacción.

Ejemplo:

```
{
    "accountNumber": "7085211582",
    "mount": 1200
}
```

Response:

```
{
    "_id": "6225e824d02db7950a66fb37",
    "accountSender": "2011902833",
    "accountReceiver": "7085211582",
    "mount": 1200,
    "date": "2022-03-07T11:10:28.757Z",
    "status": "SEND",
    "__v": 0
}
```

## GET /transactions/admin

Requiere permisos de administrador

Permite ver las ganancias del banco teniendo en cuenta las reglas de las comisiones establecidas por cada trasacción.
0.5% >= 1000 y 1% < 1000

Solo se tienen en cuenta las transacciones con estado enviadas. Esto en vista que en los requisitos solicitados para los puntos extra se requiere la posibilidad de cancelar una transacción antes de que pase un minuto (No implementado)
