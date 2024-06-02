<script setup>
import { onMounted, ref } from "vue";
import axios from 'axios';

const items = ref([])

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
  fetchData()
})
</script>

<template>
  <main>
      <div class="d-flex flex-column gap-3">
      <div class="p-5 mb-4 bg-body-tertiary rounded-3 bgJumbotron">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Custom jumbotron</h1>
          <p class="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in
            previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your
            liking.</p>
          <button class="btn btn-primary btn-lg" type="button">Example button</button>
        </div>
      </div>

      <div class="bg-white shadow p-3 rounded-4 w-100">
        <div class="container text-center">
          <div class="row">
            <div class="col">
              <label for="inputState" class="form-label">Departure</label>
              <v-combobox v-model="selectedItem" :items="items" item-title="city" item-text="city" item-value="id"
                label="Select an Item" return-object></v-combobox>
            </div>
            <div class="col">
              <label for="inputState" class="form-label">Arrival</label>
              <v-combobox v-model="selectedItem" :items="items" item-title="city" item-text="city" item-value="id"
                label="Select an Item" return-object></v-combobox>
            </div>
            <div class="col">
              <label for="inputState" class="form-label">Date</label>
              <input type="date" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
            </div>
            <div class="col d-flex justify-content-center align-items-stretch">
              <button type="button" class="btn btn-light w-100">Explore Now</button>
            </div>
          </div>
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
              <img src="..." class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Airport Pickup</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                  card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card" style="width: 18rem;">
              <img src="..." class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Airport Lounge</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                  card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card" style="width: 18rem;">
              <img src="..." class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Sim Card upon Arrival</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                  card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Extra Baggage</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.bgJumbotron{
  background-image: url('./assets/jumbotronbg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  filter: grayscale(70%);
}

</style>