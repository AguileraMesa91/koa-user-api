import { supabase } from './supabaseClient.js'

export const userRepository = {
  async getUsers () {
    try {
      const { data, error } = await supabase.from('users').select('*')
      if (error) {
        console.error('❌ Error en getUsers:', error)
        throw error
      }
      return data
    } catch (err) {
      console.error('🔥 Excepción en getUsers:', err)
      throw err
    }
  },

  async getUserByEmail (email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (error) {
        console.error('❌ Error en getUserByEmail:', error)
        throw error
      }
      return data
    } catch (err) {
      console.error('🔥 Excepción en getUserByEmail:', err)
      throw err
    }
  },

  async getUserById (id) {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
      if (error) {
        console.error('❌ Error en getUserById:', error)
        throw error
      }
      return data
    } catch (err) {
      console.error('🔥 Excepción en getUserById:', err)
      throw err
    }
  },

  async createUser (user) {
    try {
      const { data, error } = await supabase.from('users').insert(user).select().single()
      if (error) {
        console.error('❌ Error en createUser:', error)
        throw error
      }
      return data
    } catch (err) {
      console.error('🔥 Excepción en createUser:', err)
      throw err
    }
  },

  async updateUser ({ id, ...user }) {
    try {
      const { data, error } = await supabase.from('users').update(user).eq('id', id).select().single()
      if (error) {
        console.error('❌ Error en updateUser:', error)
        throw error
      }
      return data
    } catch (err) {
      console.error('🔥 Excepción en updateUser:', err)
      throw err
    }
  },

  async deleteUser (id) {
    try {
      const { error } = await supabase.from('users').delete().eq('id', id)
      if (error) {
        console.error('❌ Error en deleteUser:', error)
        throw error
      }
    } catch (err) {
      console.error('🔥 Excepción en deleteUser:', err)
      throw err
    }
  }
}
