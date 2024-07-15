<template>
  <q-layout view="lhh lpR fFf">
    <q-drawer
      show-if-above
      :width="280"
      :breakpoint="500"
      bordered
      class="bg-primary overflow-auto"
    >
      <div class="logo-wrap flex items-center justify-end q-pr-lg">
        <img
          alt="Bookstore logo"
          src="~assets/quasar-logo-vertical.svg"
          style="width: 188px; height: 50px"
        >
      </div>
      <SidebarNav/>
    </q-drawer>
    <q-header class="bg-white items-center q-px-md border-bottom">
    </q-header>
    <q-page-container class="l-background">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import SidebarNav from './SidebarNavigation.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    SidebarNav
  }
})
</script>

<style lang="scss">

.q-layout {
  border-top: 5px solid $primary;
}

.border-bottom {
  border-bottom: 1px solid #DEDEDE;
}

.l-background {
  background-color: #F1F4F7;
}

.logo-wrap {
  height: 90px;
  background: white;
  position: relative;

  &:after {
    content: '';
    height: 62px;
    width: 1px;
    background: #DEDEDE;
    position: absolute;
    right: 0;
    top: calc(50% - 31px);
  }
}

.q-header {
  height: 91px;
}
</style>
