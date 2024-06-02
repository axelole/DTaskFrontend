<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onUnmounted, provide } from 'vue';
import axios from 'axios';

const user = ref(localStorage.getItem('user'))
const updateUser = () => {
  user.value = localStorage.getItem('user')
}

window.addEventListener('storage', updateUser)

onUnmounted(() => {
  window.removeEventListener('storage', updateUser)
})
const router = useRouter()
const signout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('role')
  user.value = null
  router.push('/')
}

const login = async (form) => {
  try {
    console.log(form.value)
    const formData = new FormData()
    formData.append("username", form.username)
    formData.append("password", form.password)
    const response = await axios.post("http://localhost:3000/login", formData, {
      headers: {
        "Content-Type": "application/json"
      }
    }) 
      console.log(response) 
      if (response.status === 200) {
        localStorage.setItem('user', response.data[0].username)
        localStorage.setItem('role', response.data[0].roles)
        localStorage.setItem('id', response.data[0].id)
        alert("Login Success")
        router.push("/")
        user.value = localStorage.getItem('user')
      }
  } catch (error) {
    console.log(error)
  }
}

provide('login', login)

</script>

<template>
  <div class="d-flex flex-column gap-3">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <img src="" alt="logo" width="42" height="42">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/forum">Q&A Board</a>
            </li>
          </ul>
          <div class="d-flex gap-3" role="search">
            <div v-if="user" class="d-flex gap-3 align-items-center">
              <span>Welcome, {{ user }}</span>
              <button class="btn btn-outline-success" @click="signout">Sign Out</button>
            </div>
            <div v-else class="d-flex gap-3 align-items-center">
              <a href="/signup" class="btn btn-outline-success">Sign Up</a>
              <a href="/signin" class="btn btn-outline-success">Sign In</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped></style>
