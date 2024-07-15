import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export const booksStore = defineStore('books', {
  state: () => {
    return {
      books: [],
      book: {},
      bookEdit: {}
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
        this.book = response.data[0]
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
      } finally {
        Notify.create({
          message: 'Action successful',
          color: 'positive',
          position: 'top-right'
        })
      }
    },
    async updateBook (bookId, payload) {
      try {
        const response = await api.patch(`/books/${bookId}`, payload)
        this.book = response.data
        Notify.create({
          message: 'Action successful',
          color: 'positive',
          position: 'top-right'
        })
      } catch (error) {
        console.error(error)
      }
    },
    setBookEdit (payload) {
      this.bookEdit = payload
    },
    async fetchBookEdit (payload) {
      await this.fetchBook(payload)
      this.setBookEdit({
        title: this.book.title,
        authorName: this.book.authorName,
        releaseDate: this.book.releaseDate,
        genre: this.book.genre
      })
    }
  }
})
