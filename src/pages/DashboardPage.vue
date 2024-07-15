<template>
  <q-page class="flex flex-center">
    <ul>
      <li v-for="(book, index) in bStore.books" :key="index" @click="deleteBook(book.id)">
        {{ book }}
      </li>
    </ul>
    {{ bStore.book }}
  </q-page>
</template>

<script setup>
import { booksStore } from 'stores/modules/books'
import { onMounted } from 'vue'

const bStore = booksStore()

const deleteBook = (id) => {
  bStore.deleteBook(id)
}

onMounted(() => {
  bStore.fetchAllBooks()
})
</script>
