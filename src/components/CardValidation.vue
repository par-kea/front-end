<template>
    <div>
      <h2>Validación de tarjeta</h2>
      <div ref="cardElement"></div>
      <button @click="saveCard">Guardar tarjeta</button>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const elements = this.$stripe.elements();
  
      const card = elements.create('card');
      card.mount(this.$refs.cardElement);
      card.addEventListener('change', this.handleCardChange);
  
      this.card = card;
    },
    methods: {
      handleCardChange(event) {
        // Aquí puedes realizar validaciones adicionales en tiempo real,
        // por ejemplo, mostrar un mensaje de error si la tarjeta no es válida
      },
      saveCard() {
        this.$emit('card-saved', {
          cardElement: this.card,
          // También puedes agregar otros datos relacionados con el cliente o la tarjeta aquí
        });
      },
    },
  };
  </script>
  