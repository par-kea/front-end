<template>
    <div class="modal">
      <h3>Formulario de reserva</h3>
      <form @submit="submitForm">
        <label>
          Hora de inicio reserva:
          <input type="time" v-model="inicioReserva" required>
        </label>
        <br>
        <label>
          Fecha de inicio reserva:
          <input type="date" v-model="fechaInicioReserva" required>
        </label>
        <br>
        <label>
          Hora finalización reserva:
          <input type="time" v-model="finReserva" required>
        </label>
        <br>
        <label>
          Fecha finalización reserva:
          <input type="date" v-model="fechaFinReserva" required>
        </label>
        <br>
        <button type="submit">Reservar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReservationForm',
    data() {
      return {
        inicioReserva: '',
        fechaInicioReserva: '',
        finReserva: '',
        fechaFinReserva: '',
      };
    },
    methods: {
      submitForm() {
        alert(`Reserva realizada:
          Hora de inicio: ${this.inicioReserva}
          Fecha de inicio: ${this.fechaInicioReserva}
          Hora de finalización: ${this.finReserva}
          Fecha de finalización: ${this.fechaFinReserva}
        `);
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  </style>
  