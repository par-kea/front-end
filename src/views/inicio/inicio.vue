
<template>
    <div class="background-container">
      <div class="header">
        <div class="logo-container">
          <img class="logo" src="../../assets/img/logo2.2.png" />
        </div>
        <button class="login-button" @click="goToLogin">Iniciar Sesión</button>
      </div>
      <div class="content">
        <div class="additional-info">
          <div class="info-item">
            <div class="item-background"></div>
            <img class="item-image" src="../../assets/img/img19.jpg" />
            <p class="bienvenida">{{ bienvenida }}</p>
            <p class="company-description">{{ companyDescription }}</p>
          </div>
          <div class="info-item">
            <img class="item-image" src="../../assets/img/img17.jpg" />
            <p class="bienvenida">{{ funcionamiento }}</p>
            <p class="company-description">{{ infFun }}</p>
          </div>
          <div class="info-item">
            <img class="item-image" src="../../assets/img/img13.jpg" />
            <p class="bienvenida">{{ encontrar }}</p>
            <p class="company-description">{{ infDonde }}</p>
          </div>
        </div>
      </div>
      <div class="contact-info">
        <h2>¡Gracias por elegir Par-Kea Colombia para todas sus necesidades de parqueo!</h2>
        <h2>Contacto</h2>
        <p>Correo electrónico: info@Par-Kea.com</p>
        <p>Teléfono: +123456789</p>
      </div>
      <div class="bottom-line"></div>
    <div class="bottom-line2"></div>
    <div class="bottom-line3"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        backgroundImage: "../../assets/img/img3.jpg",
        encontrar: "¿Dónde encontrarnos?",
        infDonde: "En Par-Kea Colombia, estamos comprometidos en brindar una experiencia de parqueo conveniente y sin problemas a nuestros clientes. Tenemos parqueaderos en varias ciudades importantes de Colombia, incluyendo Bogotá, Medellín, Cali, Barranquilla y otras ciudades. Nuestros parqueaderos ofrecen una amplia gama de servicios de estacionamiento, desde cubiertos hasta descubiertos y semi-cubiertos, para satisfacer las necesidades de nuestros clientes. Además, nuestro sistema centralizado permite a los clientes consultar la disponibilidad y detalles de cualquier parqueadero perteneciente a nuestra compañía en cualquier ciudad donde se encuentre ubicado.",
        funcionamiento: "¿Cómo trabajamos?",
        infFun: "Nuestro proceso de reserva es sencillo. Los clientes pueden buscar y seleccionar el parqueadero que mejor se adapte a sus necesidades, ya sea por ubicación, tipo o disponibilidad. Pueden reservar en línea a través de nuestro sitio web o aplicación móvil y recibirán una confirmación por correo electrónico con los detalles de la reserva y las instrucciones de acceso. Al llegar al parqueadero, solo necesitan presentar la confirmación al personal para validarla y acceder al espacio reservado. El pago se realiza automáticamente con la tarjeta de crédito registrada. Además, nuestro sistema centralizado permite consultar la disponibilidad y detalles de cualquier parqueadero en cualquier ciudad donde estemos ubicados. ¡Esperamos brindarte una experiencia conveniente y sin problemas en tu próximo viaje!",
        bienvenida: "¡Bienvenido a Par-Kea Colombia!",
        companyDescription: "Somos una empresa líder en el mercado de parqueaderos en Colombia, con presencia en varias ciudades del país. Ofrecemos una amplia gama de servicios de parqueo, desde cubiertos hasta descubiertos y semi-cubiertos, y nos esforzamos por brindar la mejor experiencia de parqueo a nuestros clientes. Nuestro objetivo es estandarizar el servicio de parqueo en todo el país, ofreciendo un sistema sistematizado y fácil de usar que permita a nuestros clientes encontrar y reservar espacios de estacionamiento con facilidad. Además, estamos comprometidos con la innovación y la mejora continua, por lo que estamos constantemente buscando nuevas formas de mejorar nuestros servicios y satisfacer las necesidades cambiantes de nuestros clientes.",
      };
    },
    methods: {
      goToLogin() {
        this.$router.push({ name: "loginP" });
      },
    },
    mounted() {
      if (!this.$router) {
        console.error("El enrutador (`$router`) no está disponible en este componente.");
      }
    },
  };
  </script>
  
  <style>
 .background-container {
    /* background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1.3), transparent), url("../../assets/img/img8.jpg"); */
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 40px;
    box-sizing: border-box;
    position: relative;
  }

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #000000;
  width: 80%;
  margin-top: -40px;
}

.logo {
  width: 200px;
  position: fixed;
  top: 10px;
  left: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.login-button {
  background-color: #B01A1A;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.logo-container {
  display: flex;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.company-description {
  font-size: 16px;
  margin-top: 20px;
}

.additional-info {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.info-item {
  flex-basis: calc(33.33% - 10px);
  background-color: rgba(192, 192, 192, 0);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.info-item:hover {
  background-color: rgba(192, 192, 192, 0.8);
}

.item-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.info-item:hover .item-image {
  opacity: 0;
}

.info-item h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.info-item:hover h2 {
  opacity: 0;
}

.info-item .company-description {
  font-size: 17px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.info-item:hover .company-description {
  opacity: 1;
}

.contact-info {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  width: 90%;
  color: #D89602;
}

.contact-info h2 {
  margin-bottom: 0px;
}

.contact-info p {
  font-size: 13px;
  margin-bottom: 30px;
}
.bienvenida {
  color: #ffffff;
  text-shadow: -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000;
  font-size: 25px;
  font-weight: bold;
}

.bottom-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #ce1126;
}

.bottom-line2 {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #003893;
}

.bottom-line3 { 
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: #fcd116;
}

</style>