# JD-Segment-URL

`jd-segment-url` es una biblioteca de JavaScript para la generación dinámica de segmentos de URL en aplicaciones web. Permite configurar y transformar dinámicamente los parámetros de las URLs basándose en un conjunto de reglas y transformaciones definidas.

## ¿Que hace la biblioteca?

`jd-segment-url` es una biblioteca diseñada para facilitar la creación de URLs segmentadas de manera programática en aplicaciones web. Permite configurar parámetros estáticos y dinámicos, donde cada parámetro puede ser transformado según se necesite, utilizando funciones personalizadas o transformaciones predefinidas como la conversión de arrays a strings. Esta flexibilidad la hace ideal para situaciones donde los segmentos de URL necesitan ser generados dinámicamente basados en los datos de entrada del usuario o en la configuración de la aplicación.

## Integración

`jd-segment-url` puede ser agregada a tu proyecto de diversas maneras, dependiendo del entorno de desarrollo y el sistema de módulos que estés utilizando.

### Como módulo en proyectos Node.js o en el navegador

Para utilizar `jd-segment-url` como un módulo en un proyecto Node.js o directamente en el navegador, primero debes construir los archivos de distribución con Webpack. Aquí te mostramos cómo hacerlo:

1. Clona el repositorio a tu máquina local.
2. Instala las dependencias necesarias ejecutando `npm install` en el directorio del proyecto.
3. Ejecuta el script de construcción con `npm run build:dist` para generar el archivo `lib-segment-url.js` en la carpeta dist.

Una vez construido, puedes incluir lib-segment-url en tu proyecto de la siguiente manera:

**En Node.js:**

```js
const jdSegmentUrl = require('path/to/dist/lib-segment-url.js');
```

**En el navegador**

```html
<script src="path/to/dist/lib-segment-url.js"></script>
```

### Como módulo TypeScript

Si estás trabajando en un entorno TypeScript, asegúrate de incluir los archivos de definición de tipos al configurar tu proyecto. Puedes importar lib-segment-url directamente si el empaquetado y la resolución de módulos están configurados para resolver módulos TypeScript.

```ts
import { generateSegmentUrl } from 'path/to/src/index';
```

## Uso de la biblioteca

### Parámetros

- `config`: IConfig - Objeto de configuración para la generación de la URL.
  - `staticParam`: string - Segmento estático o base de la URL.
  - `requestData`: object - Objeto que contiene los datos que se insertarán en la URL como segmentos dinámicos.
  - **`dinamicParams`**: IDinamicParam[] - es un array de objetos, cada uno representando un parámetro dinámico que se puede insertar en la URL. Cada objeto tiene las siguientes propiedades:
    - `key`: string - El nombre del parámetro. Este nombre es utilizado para extraer el valor correspondiente del objeto requestData.
    - `isKeyVisible`: boolean - Determina si el nombre del parámetro debe ser visible en la URL. Si es true, el nombre del parámetro será incluido en la URL antes de su valor.
    - `fieldType`: fieldType (opcional) - Define el tipo de dato del parámetro. Esto es utilizado principalmente para validaciones y para asegurar que las transformaciones de valores sean aplicadas correctamente. Los tipos de datos soportados son:
      - `"string"`: Un texto.
      - `"number"`: Un valor numérico.
      - `"boolean"`: Un valor booleano.
      - `"array"`: Una lista de valores.
      - `"object"`: Un objeto JSON.
    - `transformValue`: ITransformValue (opcional) - Configuración que define cómo transformar el valor del parámetro antes de incluirlo en la URL. Este objeto puede incluir los siguientes campos:
      - `typeTransform`: typeTransform - El tipo de transformación a aplicar. Las opciones son:
        - `"CUSTOM"`: Permite definir una función personalizada para transformar el valor.
        - `"ARRAY_TO_STR"`: Convierte un array en un string, utilizando un separador especificado.
      - `typeParams`: IArrayToStrParams (opcional para ARRAY_TO_STR) - Parámetros adicionales necesarios para algunas transformaciones, como el separador en ARRAY_TO_STR.
      - `func`: (value: any) => any (opcional para CUSTOM) - Una función personalizada que recibe el valor del parámetro como entrada y devuelve el valor transformado.

###  Transformaciones

#### Transformación `ARRAY_TO_STR`

Esta transformación se utiliza para convertir un arreglo en una cadena de texto, uniendo sus elementos con un separador especificado.

**Parámetros de configuración para ARRAY_TO_STR**

- `typeTransform`: Debe ser 'ARRAY_TO_STR'.
- `typeParams`: Objeto que contiene parámetros adicionales para esta transformación.
  - `separator`: string - El caracter o cadena de texto que se utilizará para separar los elementos del arreglo en la cadena resultante.

Ejemplo de uso

```js
{
  key: 'roles',
  isKeyVisible: false,
  fieldType: 'array',
  transformValue: {
    typeTransform: 'ARRAY_TO_STR',
    typeParams: {
      separator: ','
    }
  }
}
```

#### Transformación `CUSTOM`

Esta transformación permite aplicar una función personalizada para modificar el valor del parámetro antes de incluirlo en la URL.

**Parámetros de configuración para CUSTOM**

- `typeTransform`: Debe ser 'CUSTOM'.
- `func`: (value: any) => any - Una función que toma un valor como entrada y devuelve el valor transformado. Esta función puede realizar cualquier operación permitida en JavaScript para transformar el valor.

```js
{
  key: 'date',
  isKeyVisible: true,
  fieldType: 'string',
  transformValue: {
    typeTransform: 'CUSTOM',
    func: (value) => new Date(value).toISOString().split('T')[0]
  }
}
```

### Ejemplo de uso

Estos ejemplos ilustran cómo generar una URL con parámetros visibles e invisibles, utilizando transformaciones para convertir un array en una cadena de texto con un separador específico. La inclusión de tipos de datos ayuda a asegurar que las transformaciones se apliquen correctamente y que la URL generada sea válida y coherente con los datos de entrada.

**Ejemplo 1:**

```ts
import { generateSegmentUrl } from 'lib-segment-url';

const config = {
  staticParam: 'base',
  requestData: {
    userId: 123,
    userName: 'JohnDoe',
    userInfo: ['admin', 'active']
  },
  dinamicParams: [
    {
      key: 'userId',
      isKeyVisible: true
    },
    {
      key: 'userName',
      isKeyVisible: true
    },
    {
      key: 'userInfo',
      isKeyVisible: false,
      fieldType: 'array',
      transformValue: {
        typeTransform: 'ARRAY_TO_STR',
        typeParams: {
          separator: '-'
        }
      }
    }
  ]
};

const url = generateSegmentUrl(config);
console.log(url); // Outputs: base/userId/123/userName/JohnDoe/admin-active/
```

**Ejemplo 2:**

```ts

import { generateSegmentUrl } from 'lib-segment-url';

const config = {
  staticParam: 'profile',
  requestData: {
    userId: 101,
    role: ['admin', 'user'],
    active: true
  },
  dinamicParams: [
    {
      key: 'userId',
      isKeyVisible: true,
      fieldType: 'number'
    },
    {
      key: 'active',
      isKeyVisible: true,
      fieldType: 'boolean'
    },
    {
      key: 'role',
      isKeyVisible: false,
      fieldType: 'array',
      transformValue: {
        typeTransform: 'ARRAY_TO_STR',
        typeParams: {
          separator: '|'
        }
      }
    }
  ]
};

const url = generateSegmentUrl(config);
console.log(url); // Outputs: profile/userId/101/active/true/admin|user/

```

**Ejemplo 3**

Este ejemplo HTML incluye un script que genera una URL utilizando los parámetros configurados. La función generateSegmentUrl se llama con un objeto de configuración que especifica los parámetros estáticos y dinámicos, y cómo deben ser transformados y visualizados en la URL final.


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Segment URL Example</title>
    <script src="/dist/lib-segment-url.js"></script>
</head>
<body>
    <script>
      const config = {
          staticParam: 'user',
          requestData: {
              id: 123,
              name: 'JohnDoe',
              roles: ['editor', 'contributor']
          },
          dinamicParams: [
              {
                  key: 'id',
                  isKeyVisible: true,
                  fieldType: 'number'
              },
              {
                  key: 'name',
                  isKeyVisible: true,
                  fieldType: 'string'
              },
              {
                  key: 'roles',
                  isKeyVisible: false,
                  fieldType: 'array',
                  transformValue: {
                      typeTransform: 'ARRAY_TO_STR',
                      typeParams: {
                          separator: ','
                      }
                  }
              }
          ]
      };
      const url = jdSegmentUrl.generateSegmentUrl(config);
      const url = generateSegmentUrl(config);
      console.log('Generated URL:', url);
      // Outputs "user/id/123/name/JohnDoe/editor,contributor/"
    </script>
</body>
</html>

```

**Puedes ver mas ejemplos es [aqui](/examples/readme.md)**