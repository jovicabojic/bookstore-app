<template>
  <q-page class="q-px-md bg-white">
    <q-card class="q-pt-lg no-shadow">
      <div class="row page-header">
        <div class="col-sm-6">
          <h5 class="q-my-none">
            {{ store.book.title }}
          </h5>
        </div>
        <div class="col-md-6 flex justify-end items-center" />
      </div>
    </q-card>

    <div class="q-py-md full-height">
      <div class="q-gutter-y-md">
        <q-card class="shadow-0 full-height main-card-wrapper">
          <q-card-section class='q-pa-none q-pt-lg'>
            <q-form class='q-gutter-md'>
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label class='q-pb-xs'>Title</q-item-label>
                    <q-input dense outlined v-model='store.book.title'/>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class='q-pb-xs'>Author name</q-item-label>
                    <q-input dense outlined v-model='store.book.authorName'/>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class='q-pb-xs'>Release date</q-item-label>
                    <q-input dense outlined v-model='store.book.releaseDate'/>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class='q-pb-xs'>Genre</q-item-label>
                    <q-input dense outlined v-model='store.book.genre' />
                  </q-item-section>
                </q-item>
                <q-item class="q-mt-md">
                  <q-item-section>
                    <div class="row q-mt-md">
                      <q-item-label class='q-pb-xs q-mb-md'>Cover image</q-item-label>
                      <div class="col-12">
                        <q-img
                          v-if="store.book.coverImage"
                          :src="store.book.coverImage"
                          spinner-color="white"
                          style="max-width: 300px; height: 150px;"
                          fit="contain"
                        />
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
                <hr/>
              </q-list>
            </q-form>
          </q-card-section>
          <q-card-section>
            <q-card-actions align='right'>
              <q-btn
                label='Update'
                color='primary'
                rounded
                class="text-capitalize"
                @click='editItem'
              ></q-btn>
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { booksStore } from 'stores/modules/books'
const route = useRoute()
const id = route.params.id
const store = booksStore()

onMounted(() => {
  store.fetchBook(id)
})

async function editItem () {
  try {
    await store.updateBook(id, store.book)
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss">
.option-rows-wrap {
  & > div {
    border: 1px solid #DEDEDE;

    &:nth-child(odd) {
      background: rgba(222, 222, 222, 0.25);
    }

    &:nth-child(even) {
      background: white;
    }
  }
}

.q-table {
  text-align: left;

  tr {
    & td:last-child {
      text-align: right;
    }

    & th:last-child {
      text-align: right;
    }
  }
}
</style>
