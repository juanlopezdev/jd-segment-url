# Examples

## Example Basic

This is a basic example of how to use the library in its basic form. [code](./example-basic.html)

```js
  const data = {
    tipovuelo: 'oneway',
    origen: 'LIM',
    destino: 'ROM',
    fsalida: '29-07-2022',
    adultos: 2,
    nino: 0,
    infantes: 0,
    clase: 'E'
  }

  const dinamicParams = [
    { key: 'tipovuelo', isKeyVisible: false },
    { key: 'origen', isKeyVisible: false },
    { key: 'destino', isKeyVisible: false },
    { key: 'fsalida', isKeyVisible: false },
    { key: 'adultos', isKeyVisible: false },
    { key: 'nino', isKeyVisible: false },
    { key: 'infantes', isKeyVisible: false },
    { key: 'clase', isKeyVisible: true }
  ]

  const url = jdSegmentUrl.generateSegmentUrl({
    requestData: data,
    staticParam: 'flights',
    dinamicParams: dinamicParams
  });

  console.log('URL:', url);
  // Return flights/oneway/LIM/ROM/29-07-2022/2/0/0/clase/E/
```

## Example Custom Tranform

This is an example of how to use the value transformation in a custom way [code](./example-custom-transform.html)

```js
  const data = {
    tipovuelo: 'multicity',
    origen: ['LIM', 'MAD', 'ROM'],
    destino: ['MAD', 'ROM', 'LIM'],
    ftramo: ['29-07-2022', '09-08-2022', '21-08-2022'],
    adultos: 2,
    nino: 0,
    infantes: 0,
    clase: 'E'
  }

  const dinamicParams = [
    { key: 'tipovuelo', isKeyVisible: false },
    {
      key: 'origen',
      isKeyVisible: false,
      transformValue: {
        typeTransform: 'CUSTOM',
        func: (value) => value.join(',')
      }
    },
    {
      key: 'destino',
      isKeyVisible: false,
      transformValue: {
        typeTransform: 'CUSTOM',
        func: (value) => value.join(',')
      }
    },
    {
      key: 'ftramo',
      isKeyVisible: false,
      transformValue: {
        typeTransform: 'CUSTOM',
        func: (value) => value.join(',')
      }
    },
    { key: 'adultos', isKeyVisible: false },
    { key: 'nino', isKeyVisible: false },
    { key: 'infantes', isKeyVisible: false },
    { key: 'clase', isKeyVisible: false }
  ]

  const url = jdSegmentUrl.generateSegmentUrl({
    requestData: data,
    staticParam: 'flights',
    dinamicParams: dinamicParams
  });

  console.log('URL:', url);
  // Return flights/multicity/LIM,MAD,ROM/MAD,ROM,LIM/29-07-2022,09-08-2022,21-08-2022/2/0/0/E/
```

## Example using ARRAY_TO_STR function

This function is preloaded by the library, ready to use [code](./example-ARRAY_TO_STR.html)

```js
  const data = {
    tipovuelo: 'multicity',
    origen: ['LIM', 'MAD', 'ROM'],
    destino: ['MAD', 'ROM', 'LIM'],
    ftramo: ['29-07-2022', '09-08-2022', '21-08-2022'],
    adultos: 2,
    nino: 0,
    infantes: 0,
    clase: 'E'
  }

  const dinamicParams = [
    { key: 'tipovuelo', isKeyVisible: false },
    {
      key: 'origen',
      isKeyVisible: false,
      transformValue: {
        typeTransform: 'ARRAY_TO_STR',
        typeParams: { separator: ',' }
      }
    },
    {
      key: 'destino',
      isKeyVisible: false,
      transformValue: {
        typeTransform: 'ARRAY_TO_STR',
        typeParams: { separator: ',' }
      }
    },
    {
      key: 'ftramo',
      isKeyVisible: false,
      transformValue: {
        typeTransform: 'ARRAY_TO_STR',
        typeParams: { separator: ',' }
      }
    },
    { key: 'adultos', isKeyVisible: false },
    { key: 'nino', isKeyVisible: false },
    { key: 'infantes', isKeyVisible: false },
    { key: 'clase', isKeyVisible: false }
  ]

  const url = jdSegmentUrl.generateSegmentUrl({
    requestData: data,
    staticParam: 'flights',
    dinamicParams: dinamicParams
  });

  console.log('URL:', url);
  // Return flights/multicity/LIM,MAD,ROM/MAD,ROM,LIM/29-07-2022,09-08-2022,21-08-2022/2/0/0/E/
```

