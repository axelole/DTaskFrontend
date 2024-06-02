<template>
  <main class="one-column d-flex flex-column gap-4">
    <form @submit.prevent="createQuestion">
      <div class="input-group" v-if="role === 'user'">
        <input type="text" class="form-control" v-model="question">
        <button class="btn btn-outline-secondary" type="submit">Post</button>
      </div>
    </form>
    <!-- Question Cards -->
    <div class="card" v-for="item in questions" :key="item.id">
      <div class="card-body d-flex flex-column align-items-end">
        <p class="fs-5 w-100">{{ item.question }}</p>
        <p class="fs-6 p-2 bg-light w-100" v-if="item.answer">Jawaban Admin: {{ item.answer }}</p>
        <div v-else>
          <button class="btn btn-primary btn-sm text-right" v-if="role === 'admin' && !item.replying"
            @click="toggleReply(item)">Reply</button>
          <div v-if="item.replying">
            <input type="text" class="form-control" v-model="item.replyText">
            <button class="btn btn-primary btn-sm" @click="replyToQuestion(item)">Reply</button>
          </div>
        </div>
        <!-- Like and Dislike Buttons -->
        <div class="d-flex align-items-center">
          <button class="btn btn-link btn-sm" @click="likeQuestion(item)" :disabled="item.liked">
            <i class="bi bi-hand-thumbs-up-fill" :class="{ 'text-primary': item.liked }"></i>
          </button>
          <span class="me-2">{{ item.like }}</span>
          <button class="btn btn-link btn-sm" @click="dislikeQuestion(item)" :disabled="item.disliked">
            <i class="bi bi-hand-thumbs-down-fill" :class="{ 'text-danger': item.disliked }"></i>
          </button>
          <span>{{ item.dislike }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const role = ref(localStorage.getItem('role'))
const question = ref("")
const questions = ref([])

// Fetch questions
const fetchQuestions = async () => {
  try {
    const response = await axios.get("http://localhost:3000/forum")
    questions.value = response.data.map(item => ({
      ...item,
      replying: false,
      replyText: '',
      liked: item.liked || false,
      dislikes: item.dislikes || 0,
      likes: item.likes || 0,
      disliked: item.disliked || false
    }))
  } catch (error) {
    console.log(error)
  }
}

// Create question
const createQuestion = async () => {
  try {
    if (!question.value.trim()) {
      alert("Question cannot be empty.");
      return;
    }
    const formData = new FormData()
    formData.append("question", question.value)
    await axios.post("http://localhost:3000/forum", formData)
    question.value = "" // Clear input after successful submission
    fetchQuestions() // Refresh question list
  } catch (error) {
    console.log(error)
  }
}

// Toggle reply input
const toggleReply = (item) => {
  item.replying = !item.replying;
}

// Reply to question
const replyToQuestion = async (item) => {
  try {
    if (!item.replyText.trim()) {
      alert("Reply cannot be empty.");
      return;
    }
    const formData = new FormData()
    formData.append("id", item.id)
    formData.append("answer", item.replyText)
    // Assuming you have an API endpoint to handle replies
    await axios.put("http://localhost:3000/forum/reply", formData)
    item.replying = false; // Hide reply input after successful reply
    fetchQuestions() // Refresh question list
  } catch (error) {
    console.log(error)
  }
}

// Like question
const likeQuestion = async (item) => {
  try {
    await axios.put("http://localhost:3000/forum/like", { id: item.id })
    item.liked = true
    item.likes++
    fetchQuestions()
  } catch (error) {
    console.log(error)
  }
}

// Dislike question
const dislikeQuestion = async (item) => {
  try {
    await axios.put("http://localhost:3000/forum/dislike", { id: item.id })
    const questionIndex = questions.value.findIndex(q => q.id === item)
    item.disliked = true
    item.dislikes++
    fetchQuestions()
  } catch (error) {
    console.log(error)
  }
}

// Fetch questions on component mount
fetchQuestions()
</script>

<style>
.one-column {
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
}
</style>