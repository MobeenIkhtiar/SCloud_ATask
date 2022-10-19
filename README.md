

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript  repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev
```

```bash
# watch mode
$ npm run start:dev
```

```bash
# Register vehicle API end point
http://localhost:3000/toll-tax/register
#Request : POST
#payload
{
    "interchange":"Zero point",
    "numberPlate":"RYK-123",
      "date":"2022-10-23"
}
```

```bash
# calculate Tax vehicle API end point
http://localhost:3000/toll-tax/exit
#Request : POST
#payload
{
    "interchange":"Ph4 Interchange",
    "numberPlate":"RYK-123",
      "date":"2022-10-23"
}
```

```bash
# Output 
{
    "baseRate": 20,
    "costBreakdown": 2,
    "subTotal": 22,
    "discount": 2.2,
    "total": 19.8
}
```





