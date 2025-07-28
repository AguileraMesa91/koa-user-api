// database/userRepository.js
// Repositorio de usuarios que interactúa con la base de datos Supabase

import { supabase } from './supabaseClient.js'

export const userRepository = {
  // Obtiene todos los usuarios de la tabla "users"
  async getUsers () {
    try {
      const { data, error } = await supabase.from('users').select('*')
      if (error) {
        console.error('Error en getUsers:', error)
        throw error
      }
      return data
    } catch (err) {
      console.error('Excepción en getUsers:', err)
      throw err
    }
  },

  // Obtiene un usuario por su email
  async getUserByEmail (email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single() // Espera exactamente un resultado
      if (error) {
        console.error('Error en getUserByEmail:', error)
        throw error
      }
      return data
    } catch (err) {
      console.error('Excepción en getUserByEmail:', err)
      throw err
    }
  },

  // Obtiene un usuario por su ID
  async getUserById (id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
      if (error) {
        console.error('Error en getUserById:', error)
        throw error
      }
      return data
    } catch (err) {
      console.error('Excepción en getUserById:', err)
      throw err
    }
  },

  // Crea un nuevo usuario (con campos: name, email, password)
  async createUser (user) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert(user)
        .select()
        .single() // Devuelve el nuevo usuario creado
      if (error) {
        console.error('Error en createUser:', error)
        throw error
      }
      return data
    } catch (err) {
      console.error('Excepción en createUser:', err)
      throw err
    }
  },

  // Actualiza los datos de un usuario según su ID
  async updateUser ({ id, ...user }) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(user)
        .eq('id', id)
        .select()
        .single()
      if (error) {
        console.error('Error en updateUser:', error)
        throw error
      }
      return data
    } catch (err) {
      console.error('Excepción en updateUser:', err)
      throw err
    }
  },

  // Elimina un usuario por su ID
  async deleteUser (id) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
      if (error) {
        console.error('Error en deleteUser:', error)
        throw error
      }
    } catch (err) {
      console.error('Excepción en deleteUser:', err)
      throw err
    }
  }
}
