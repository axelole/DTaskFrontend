<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";

const orders = ref([])
const getOrders = async () => {
    try {
        const response = await axios.get('http://localhost:3000/booking')
        console.log(response.data)
        orders.value = response.data
    } catch (error) {
        console.log(error)
    }
}

getOrders()
</script>

<template>
    <main class="one-column d-flex flex-column gap-4">

        <div class="card" v-for="order in orders" :key="order.id">
            <div class="card-body d-flex flex-row align-items-center justify-content-between">
                <div class="d-flex gap-3">
                    <span class="fs-5 fw-bold">Full Name: {{ order.fullName }}</span>
                    <span class="fs-5 fw-bold">Phone: {{ order.phone }}</span>
                    <span class="fs-5 fw-bold">Flight: {{ order.flightid }}</span>
                    <span class="fs-5 fw-bold">Seat: {{ order.seatid }}</span>
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