<script setup>
import { computed, onMounted, ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import Paginate from 'vuejs-paginate-next'; 


const router = useRouter()
const items = ref([])
const flight = ref([])
const currentPage = ref(1)

async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3000/airport')
    console.log(response)
    items.value = response.data
    // people.value = response.data
    // console.log(people.value)
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  fetchData(),
    fetchFlight()
})

async function fetchFlight() {
  try {
    const response = await axios.get('http://localhost:3000/flight')
    console.log(response.data)
    flight.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const clickEdit = (id) => {
  router.push(`/edit-flight/${id}`)
}

const deleteFlight = async (id) => {
  if (window.confirm('Are you sure you want to Delete?')) {
    try {
      const response = await axios.delete(`http://localhost:3000/flight/${id}`)
      console.log(response)
      fetchFlight()
    } catch (error) {
      console.log(error)
    }
  }

}

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
  <main class="container">
    <div class="d-flex flex-column gap-4">
      <a href="/create-flight" class="btn btn-primary">Create Flight</a>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Departure</th>
            <th scope="col">Arrival</th>
            <th scope="col">Date</th>
            <th scope="col">Departure Time</th>
            <th scope="col">Duration</th>
            <th scope="col">Arrival Time</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="flight in getItems" :key="flight.id">
            <td>{{ flight.departure }}</td>
            <td>{{ flight.arrival }}</td>
            <td>{{ flight.date }}</td>
            <td>{{ flight.departuretime }}</td>
            <td>{{ flight.duration }}</td>
            <td>{{ flight.arrivaltime }}</td>
            <td>{{ flight.price }}</td>
            <td>
              <div class="d-flex gap-3">
                <button class="btn btn-primary" @click="clickEdit(flight.id)">Edit</button>
                <button class="btn btn-danger" @click="deleteFlight(flight.id)">Delete</button>
              </div>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
      <paginate
    :page-count="20"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'"
  >
  </paginate>
  </main>
</template>

<style scoped></style>