<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
let flightData = ref(null)
onMounted(() => {
  const newData = route.params.flightData
  flightData.value = JSON.parse(newData)
  // flightData.value = route.params.flightData;
  console.log(flightData.value)
})
</script>

<template>
  <main class="one-column d-flex flex-column gap-4">

    <div class="card" v-for="flight in flightData" :key="flight.id">
      <div class="card-body d-flex flex-row align-items-center justify-content-between">
        <div class="d-flex gap-3">
            <span class="fs-5 fw-bold">{{flight.departuretime}}</span>
            <span class="fs-6">{{ flight.duration }} mins</span>
            <span class="fs-5 fw-bold">{{ flight.arrivaltime }}</span>
        </div>
        <div class="d-flex gap-3">
            <span class="fs-4 fw-bold">{{ flight.price  }}$</span>
            
            <RouterLink :to="{name:'checkout', params:{id:flight.id}}">
              <button class="btn btn-outline-primary" type="button">Checkout</button>
            </RouterLink>
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