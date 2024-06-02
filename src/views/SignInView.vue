<script setup>
import { ref, inject } from 'vue';

const form = ref({
  username: "",
  password: ""
})

const login = inject('login')
</script>

<template>
<main class="d-flex flex-column justify-content-center align-items-center mt-5">
  <form class="w-100" style="max-width: 350px;" @submit.prevent="login(form)">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="form.username">
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="form.password">
      <label for="floatingPassword">Password</label>
    </div>
    <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
  </form>
</main>

</template>
