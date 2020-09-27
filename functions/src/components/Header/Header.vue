<template>
  <b-navbar toggleable="md" class="app-header d-print-none">
    <b-navbar-nav class="navbar-nav-mobile ml-auto">
  
        <b-nav-item-dropdown right menu-class="py-0">
          <template slot="button-content">
            <span class="avatar rounded-circle thumb-sm float-left mr-2">
                          <!-- <i class="la la-user px-10" /> -->

              <img class="rounded-circle" src="../../assets/people/user.png" alt="..." />
            </span>
            
          </template>
        </b-nav-item-dropdown>
   
        <b-nav-item class="divider d-md-down-none"></b-nav-item>
        <b-nav-item-dropdown no-caret right menu-class="dropdown-menu-settings">
          <template slot="button-content">
            <i class="la la-cog px-2" />
          </template>
          <!-- <b-dropdown-item><i class="la la-user" /> My Account</b-dropdown-item>
          <b-dropdown-divider />
          <!-- <b-dropdown-item>Calendar</b-dropdown-item> -->
          <!-- <b-dropdown-item>
            Inbox &nbsp;&nbsp;<b-badge variant="danger" pill class="animate__animated animate__bounceIn">9</b-badge>
          </b-dropdown-item> -->
          <b-dropdown-divider />
          <b-dropdown-item-button @click="logout">
            <i class="la la-sign-out" /> Log Out
          </b-dropdown-item-button>
        </b-nav-item-dropdown>
       
        <!-- <b-nav-item class="d-md-down-none" @click="logout">
          <i class="la la-power-off px-2" />
        </b-nav-item> -->
        <b-nav-item class="d-md-none" @click="switchSidebarMethod" >
          <i class="la la-navicon px-2" />
        </b-nav-item>
      </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import firebase from "firebase"
export default {
  name: 'Header',
  data() {
    return {
      showNavbarAlert: true
    }
  },
  computed: {
    ...mapState('layout', {
      sidebarClose: state => state.sidebarClose,
      sidebarStatic: state => state.sidebarStatic,
    }),
  },
  methods: {
    ...mapActions('layout', ['toggleSidebar', 'toggleChat', 'switchSidebar', 'changeSidebarActive']),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    logout() {
      window.localStorage.setItem('authenticated', false);
       firebase
        .auth()
        .signOut()
        .then(() => {
      this.$router.push('/login');
        });
    },
  },
};
</script>

<style src="./Header.scss" lang="scss" />
