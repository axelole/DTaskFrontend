<script setup>
import { computed, onMounted, ref } from "vue";
import axios from 'axios';
import Paginate from 'vuejs-paginate-next'; 

const items = ref([])
const currentPage = ref(1)

async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3000/booking-list')
    console.log(response)
    items.value = response.data
    // people.value = response.data
    // console.log(people.value)
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  fetchData()
})

const getItems = computed(() => {
  const current = currentPage.value * 5
  const start = current - 5
  return flight.value.slice(start, current)
})

const clickCallback = (pageNum) => {
  console.log(pageNum)
  currentPage.value = Number(pageNum)
}


</script>

<template>
  <main class="one-column d-flex flex-column gap-4">

    <div class="card" v-for="item in items" :key="item.id">
      <div class="card-body d-flex flex-row align-items-center justify-content-between">
        <div class="d-flex gap-3">
            <span class="fs-5 fw-bold">FullName</span>
            <span class="fs-6">FlightDeparture</span>
            <span class="fs-6">FlightArrival</span>
            <span class="fs-6">FlightTime</span>
            <span class="fs-5 fw-bold">Seat</span>
        </div>
        <div class="d-flex gap-3">
            <span class="fs-4 fw-bold">$80</span>
        </div>
      </div>
    </div>

  </main>
</template>

<style>
.one-column {
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
}
</style>