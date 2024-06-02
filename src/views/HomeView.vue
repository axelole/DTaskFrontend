<script setup>
import { onMounted, ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";

const router = useRouter()

const items = ref([])
const selectedDeparture = ref(null)
const selectedArrival = ref(null)
const selectedDate = ref(null)


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

const form = ref({
  departure: '',
  arrival: '',
  date: ''
})

const searchFlight = async () => {
  try {
    const formData = {
      departure: form.value.departure.iata,
      arrival: form.value.arrival.iata,
      date: form.value.date
    }
    const response = await axios.post('http://localhost:3000/flight-search', formData)
    console.log(response)
    const newData = JSON.stringify(response.data)
    router.push({
      name: 'result', params: {
        flightData: newData
      }
    })
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <main>
    <div class="d-flex flex-column gap-3">
      <div class="p-5 mb-4 bg-body-tertiary rounded-3 bgJumbotron">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Swinny Tours</h1>
          <p class="col-md-8 fs-4">Welcome to Swinny Tours, where every journey is an adventure waiting to unfold!
            <br>
            At Swinny Tours, we believe that travel is not just about reaching a destination;
            <br>
            With a commitment to exceptional service and dedication to personalized service.
            <br>
            We ensure from the moment you inquire about a trip to the final farewell, our team of experienced travel
            specialists is here to guide you every step of the way. We handle all the logistics so you can focus on your
            journey.
          </p>
        </div>
      </div>

      <div class="bg-white shadow p-3 rounded-4 w-100">
        <div class="container text-center">
          <form class="row" @submit.prevent="searchFlight">
            <div class="col">
              <label for="inputState" class="form-label">Departure</label>
              <v-combobox v-model="form.departure" :items="items" item-title="display" item-text="display"
                item-value="id" label="Select an Item" return-object>
                <!-- <template v-slot:selection="data">
                  {{ data.item.display }}
                </template> -->
              </v-combobox>
            </div>
            <div class="col">
              <label for="inputState" class="form-label">Arrival</label>
              <v-combobox v-model="form.arrival" :items="items" item-title="display" item-text="display" item-value="id"
                label="Select an Item" return-object>
                <!-- <template v-slot:selection="data">
                  {{ data.item.display }}
                </template> -->
              </v-combobox>
            </div>
            <div class="col">
              <label for="inputState" class="form-label">Date</label>
              <input type="date" class="form-control" v-model="form.date">
            </div>
            <div class="col d-flex justify-content-center align-items-stretch">
              <button type="submit" class="btn btn-light w-100" @click="searchFlight">Explore Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="bg-dark text-white py-5">
      <div class="container">
        <div class="text-center">
          <h2>We Ensure You Fly with Us Forever</h2>
        </div>
        <div class="p-3 rounded-4 w-100">
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <h3>Talented Crew</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua.</p>
              </div>
              <div class="col">
                <h3>Safe Guard</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua.</p>
              </div>
              <div class="col">
                <h3>Best Awards</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua.</p>
              </div>
              <div class="col">
                <h3>Pickup at Home</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua.</p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <div>
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Airport Pickup</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                  card's content.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Airport Lounge</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                  card's content.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Sim Card upon Arrival</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                  card's content.</p>
              </div>
            </div>
          </div>
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Extra Baggage</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                content.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.bgJumbotron {
  background-image: url('./assets/jumbotronbg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  filter: grayscale(70%);
}
</style>