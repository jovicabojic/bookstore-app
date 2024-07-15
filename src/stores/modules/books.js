import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const booksStore = defineStore('books', {
  state: () => {
    return {
      books: [],
      book: {}
    }
  },
  actions: {
    async fetchAllBooks () {
      try {
        const response = await api.get('/books')
        this.books = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchBook (bookId) {
      try {
        const response = await api.get(`/books?id=${bookId}`)
        this.book = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async createBook (payload) {
      try {
        await api.post('/books', payload)
        await this.fetchAllBooks()
      } catch (error) {
        console.error(error)
      }
    },
    async deleteBook (bookId) {
      try {
        await api.delete(`/books/${bookId}`)
        await this.fetchAllBooks()
      } catch (error) {
        console.error(error)
      }
    },
    async updateBook (bookId, payload) {
      try {
        const response = await api.put(`/books/${bookId}`, payload)
        this.book = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
