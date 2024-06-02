<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute()

const role = 'user'

const flightId = ref()
const seats = ref([])
const selectedSeat = ref('')

const form = ref({
  fullName: "",
  phone: 0,
  email: ""
})

const purchaseFlight = async () => {
  try {
    const formData = {
      userid: Number(localStorage.getItem('id')),
      flightid: Number(route.params.id),
      seatid: selectedSeat.value,
      fullName: form.value.fullName,
      phone: form.value.phone,
      email: form.value.email
    }
    const response = await axios.post('http://localhost:3000/booking', formData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(response.data)
    alert("Purchase Complete!")
  } catch (error) {
    console.log(error)
  }
}

const fetchSeat = async () => {
  const id = route.params.id
  try {
    const response = await axios.get(`http://localhost:3000/seat/${id}`)
    console.log(response)
    seats.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const selectSeat = (seatNumber) => {
  selectedSeat.value = seatNumber
}
 
fetchSeat()


</script>

<template>
  <main class="one-column d-flex flex-row gap-4">
    <div class="card w-100">
      <div class="card-body d-flex flex-row align-items-center justify-content-between">
        <div class="grid w-100">
          <button v-for="seat in seats" class="col seat btn btn-secondary" :key="seat.id" :disabled="seat.booked" @click="selectSeat(seat.id)" :class="{'btn-success' :seat.id === selectedSeat}">{{seat.seatnumber}}</button>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-body d-flex flex-row align-items-center justify-content-between">
        <form class="w-100 d-flex flex-column gap-4" @submit.prevent="purchaseFlight">
          <div class="form-floating">
            <input type="text" class="form-control" v-model="form.fullName">
            <label for="floatingInput">Full Name</label>
          </div>
          <div class="form-floating">
            <input type="tel" class="form-control" v-model="form.phoneNumber">
            <label for="floatingInput">Phone Number</label>
          </div>
          <div class="form-floating">
            <input type="email" class="form-control" v-model="form.email">
            <label for="floatingInput">Email</label>
          </div>
          <button class="btn btn-primary w-100 py-2" type="submit">Purchase</button>

        </form>
      </div>
    </div>
  </main>
</template>

<style>
.one-column {
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
}

.seat {
  height: 50px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  ;
  gap: 1rem;
}
</style>