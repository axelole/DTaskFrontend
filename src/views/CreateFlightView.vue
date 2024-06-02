<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const form = ref({
  departure: "",
  arrival: "",
  date: "",
  departuretime: "",
  duration: "",
  arrivaltime: "",
  price: ""
})

const router = useRouter()

const createFlight = async () => {
  console.log(form.value)
  try {
    const formData = new FormData()
    formData.append("departure", form.value.departure.iata)
    formData.append("arrival", form.value.arrival.iata)
    formData.append("date", form.value.date)
    formData.append("departuretime", form.value.departuretime)
    formData.append("duration", form.value.duration)
    formData.append("arrivaltime", form.value.arrivaltime)
    formData.append("price", form.value.price)
    const response = await axios.post("http://localhost:3000/flight", formData, {
      headers: {
        "Content-Type": "application/json"
      }
    }) 
      console.log(response) 
      if (response.status === 200) {
        alert("Registration Success")
        router.push("/admin")
      }
  } catch (error) {
    console.log(error)
  }
}

const items = ref([])

async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3000/airport')
    console.log(response)
    items.value = response.data.map(item => ({
      ...item,
      display: `${item.city}, ${item.country}, ${item.iata}`
    }))
    console.log(items[0].display)
    // people.value = response.data
    // console.log(people.value)
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  fetchData()
})
</script>

<template>
<main class="d-flex flex-column justify-content-center align-items-center mt-5">
  <a href="/admin" class="btn btn-primary">Flight List</a>
  <form class="w-100" style="max-width: 350px;" @submit.prevent="createFlight">
    <h1 class="h3 mb-3 fw-normal">Create Flight</h1>

    <label for="inputState" class="form-label">Departure</label>
              <v-combobox v-model="form.departure" :items="items" item-title="display" item-text="display" item-value="id"
              label="Select an Item" return-object>
              <!-- <template v-slot:selection="data">
                {{ data.item.display }}
              </template> -->
            </v-combobox>
            <label for="inputState" class="form-label">Arrival</label>
              <v-combobox v-model="form.arrival" :items="items" item-title="display" item-text="display" item-value="id"
              label="Select an Item" return-object>
              <!-- <template v-slot:selection="data">
                {{ data.item.display }}
              </template> -->
            </v-combobox>
    <div class="form-floating">
      <input type="date" class="form-control"  v-model="form.date">
      <label for="floatingInput">Date</label>
    </div>
    <div class="form-floating">
      <input type="time" class="form-control"  v-model="form.departuretime">
      <label for="floatingInput">Departure Time</label>
    </div>
    <div class="form-floating">
      <input type="number" class="form-control"  v-model="form.duration">
      <label for="floatingInput">Duration</label>
    </div>
    <div class="form-floating">
      <input type="time" class="form-control"  v-model="form.arrivaltime">
      <label for="floatingInput">Arrival Time</label>
    </div>
    <div class="form-floating">
      <input type="number" class="form-control"  v-model="form.price">
      <label for="floatingInput">Price</label>
    </div>
    <button class="btn btn-primary w-100 py-2" type="submit">Create</button>
  </form>
</main>
</template>
