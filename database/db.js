// database/db.js - Módulo para la conexión con PostgreSQL usando la librería pg
// Utiliza una instancia de Pool para gestionar conexiones reutilizables

import pkg from 'pg'
const { Pool } = pkg

let pool = null // Singleton: almacena la instancia de Pool

export function getDatabaseInstance () {
  if (!pool) {
    // Creamos una nueva instancia de Pool con las credenciales definidas en .env
    pool = new Pool({ //
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT)
    })
  }
  return pool // Retornamos la instancia existente o recién creada
}

export async function executeQuery (query, params = []) {
  const db = getDatabaseInstance()
  const res = await db.query(query, params)
  return res.rows // Devulve las filas del resultado de la consulta
}
