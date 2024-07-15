<template>
  <div>
    <nav class="sidebar-nav">
      <ul class="q-pl-none q-mt-none">
        <li class="q-mx-sm q-mb-sm">
          <router-link class="sidebar-item text-white flex items-center q-px-sm"
                       to="/"
                       exact>
            <q-icon name="speed"/>
            <span class="l-menu-title">Dashboard</span></router-link>
        </li>
        <li class="q-mx-sm q-mb-sm">
          <router-link class="sidebar-item text-white flex items-center q-px-sm"
                       to="/books"
                       exact>
            <q-icon name="book"/>
            <span class="l-menu-title">Books</span></router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarNavigation'
})

</script>

<style lang="scss">
.sidebar-nav {
  ul {
    list-style: none;
    & li {
      min-height: 48px;
      &.border-bottom {
        border-bottom: 1px solid #fff;
      }
      & a {
        height: 48px;
        gap: 20px;
        transition: all .3s ease-in-out;
        text-decoration: none;
        border-radius: 5px;
        & .q-icon {
          font-size: 24px;
        }
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        &.router-link-exact-active {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}
</style>
