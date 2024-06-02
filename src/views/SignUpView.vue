<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const form = ref({
  username: "",
  password: ""
})

const router = useRouter()

const register = async () => {
  try {
    console.log(form.value)
    const formData = new FormData()
    formData.append("username", form.value.username)
    formData.append("password", form.value.password)
    const response = await axios.post("http://localhost:3000/register", formData, {
      headers: {
        "Content-Type": "application/json"
      }
    }) 
      console.log(response) 
      if (response.status === 200) {
        alert("Registration Success")
        router.push("/signin")
      }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
<main class="d-flex flex-column justify-content-center align-items-center mt-5">
  <form class="w-100" style="max-width: 350px;" @submit.prevent="register">
    <h1 class="h3 mb-3 fw-normal">Sign Up</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="form.username">
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="form.password">
      <label for="floatingPassword">Password</label>
    </div>
    <button class="btn btn-primary w-100 py-2" type="submit">Sign Up</button>
    <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
  </form>
</main>
</template>
