<template>
  <q-page class='q-px-md bg-white'>
    <div class='flex justify-between items-center q-py-md'>
      <h5 class='page-heading-title q-my-none text-bold'>Books</h5>
      <q-btn class='text-capitalize q-px-lg'
             color='primary'
             label='Add book'
             rounded
             @click='showCreateDialog = true'></q-btn>
    </div>
    <div class='q-pt-sm'>
      <div>
        <q-table
          :rows='store.books'
          :columns='columns'
          row-key='name'
          :pagination='initialPagination'
          :filter='filter'
          class="no-shadow"
        >
          <template v-slot:top-right>
            <q-input square outlined dense debounce='300' v-model='filter'>
              <template v-slot:append>
                <q-icon name='search' />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-cover_image="props">
            <q-td :props="props">
              <q-img
                :src="props.row.cover_image"
                :ratio="1"
                width="40px"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn dense flat round size="12px" color="dark" field="edit" @click="editBook(props.row.id)" icon="edit"></q-btn>
              <q-btn dense flat round size="12px" color="dark" field="edit" @click="dialogConfirm(props.row)" icon="delete"></q-btn>
            </q-td>
          </template>
        </q-table>
        <!-- Create dialog -->
        <q-dialog v-model='showCreateDialog'>
          <q-card style='width: 600px; max-width: 60vw'>
            <q-card-section>
              <q-btn round flat dense icon='close' class='float-right' color='grey-8' v-close-popup></q-btn>
              <div class='text-h6'>Create book</div>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card-section class='q-pt-none'>
              <q-form class='q-gutter-md'>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label class='q-pb-xs'>Title</q-item-label>
                      <q-input dense outlined v-model='defaultItem.title'/>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label class='q-pb-xs'>Author name</q-item-label>
                      <q-input dense outlined v-model='defaultItem.author_name' />
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label class='q-pb-xs'>Release date</q-item-label>
                      <q-input dense outlined v-model='defaultItem.releaseDate' />
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label class='q-pb-xs'>Genre</q-item-label>
                      <q-input dense outlined v-model='defaultItem.genre' />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-form>
            </q-card-section>
            <q-card-section>
              <q-card-actions align='right'>
                <q-btn
                  class="text-capitalize"
                  label='Cancel'
                  color='negative'
                  rounded
                  v-close-popup
                ></q-btn>
                <q-btn
                  class="text-capitalize"
                  label='Save'
                  color='primary'
                  rounded
                  v-close-popup
                  @click='createBook'
                ></q-btn>
              </q-card-actions>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!-- Confirm delete modal -->
        <q-dialog v-model='showDeleteConfirmDialog' persistent>
          <q-card>
            <q-card-section class='row items-center'>
              <span class='q-ml-sm'>Are you sure you want to delete this item?</span>
            </q-card-section>

            <q-card-actions align='right'>
              <q-btn label='Cancel' color='negative' rounded class="text-capitalize" v-close-popup />
              <q-btn label='Delete' color='primary' @click='deleteBook(editedItem.id)' rounded class="text-capitalize" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
const columns = [
  {
    name: 'title',
    label: 'Title',
    align: 'left',
    field: row => row.title,
    sortable: true
  },
  { name: 'author', align: 'center', label: 'Author name', field: 'author_name' },
  { name: 'release', align: 'center', label: 'Release date', field: 'releaseDate' },
  { name: 'genre', align: 'center', label: 'Genre', field: 'genre' },
  { name: 'cover_image', align: 'center', label: 'Cover image', field: 'cover_image' },
  { name: 'action', align: 'right', label: 'Actions', field: '' }
]

import { defineComponent, onMounted, ref, reactive, toRaw } from 'vue'
import { booksStore } from 'stores/modules/books'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'BooksListPage',
  setup () {
    const router = useRouter()
    const store = booksStore()
    onMounted(() => {
      store.fetchAllBooks()
    })
    const defaultItem = reactive({
      title: '',
      author_name: '',
      releaseDate: '',
      genre: ''
    })
    function editBook (id) {
      router.push({
        name: 'BookView',
        params: { id }
      })
    }
    async function createBook () {
      const item = toRaw(defaultItem)
      try {
        await store.createBook(item)
      } catch (error) {
        console.log(error)
      }
    }
    function dialogConfirm (item) {
      this.showDeleteConfirmDialog = true
      this.editedItem = { ...item }
    }
    async function deleteBook (id) {
      try {
        await store.deleteBook(id)
      } catch (error) {
        console.log(error)
      }
    }
    return {
      defaultItem,
      filter: ref(''),
      columns,
      store,
      editedItem: defaultItem,
      showCreateDialog: ref(false),
      showEditDialog: ref(false),
      showDeleteConfirmDialog: ref(false),
      createBook,
      dialogConfirm,
      deleteBook,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 10
      },
      editBook
    }
  }
})
</script>
