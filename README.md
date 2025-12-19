# Sistema de vales y comisiones

API REST para administrar clientes, vales de crédito, pagos y cálculo de comisiones personalizadas.

# Instrucciones para ejecutar el proyecto

**Prerrequisitos**

Node.js v18 o superior

PostgreSQL v14 o superior

npm o yarn

_1. Clonar el repositorio_

```
git clone <url-del-repositorio>
cd backend_pv
```

2. Instalar dependencias

```
npm install
# o
yarn install
```

3. Configurar variables de entorno

Crear archivo .env en la raíz del proyecto:

```
env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/prestavale_db"
PORT=3000
NODE_ENV=development
```

4. Configurar base de datos
   bash

```
# Ejecutar migraciones de Prisma
npx prisma migrate dev --name init

# Generar cliente de Prisma
npx prisma generate
```

5. Ejecutar el proyecto

```
# Desarrollo (con hot-reload)
npm run dev
```

6. Verificar que esté funcionando en el navegador

```
http://localhost:3000/status
# Debería responder: {"status":"ok"...}
```

**Manejo de pagos y comisiones**

Flujo de Pagos

```
1. Crear vale → Se establece total = pendiente
2. Registrar pago → Se resta del pendiente
3. Si pendiente = 0 → Vale cambia a PAGADO
4. Si pago > pendiente → Excedente va a balanceFavor
5. Si vale está PAGADO → No se aceptan más pagos
```

Tipos de Pago

- Parcial: monto < saldo pendiente → solo se reduce saldo

- Total: monto = saldo pendiente → liquida el vale

- Excedente: monto > saldo pendiente → liquida y guarda excedente
