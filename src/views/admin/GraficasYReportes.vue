<template>
  <div class="chart-container">
    <div class="chart-row">
      <div class="chart-item">
        <canvas ref="chart1"></canvas>
      </div>
      <div class="chart-item">
        <canvas ref="chart2"></canvas>
      </div>
    </div>
    <div class="chart-row">
      <div class="chart-item">
        <canvas ref="chart3"></canvas>
      </div>
      <div class="chart-item">
        <canvas ref="chart4"></canvas>
      </div>
    </div>
  </div>
</template>

<style>
.chart-container {
  background-color: black;
  padding: 20px;
}

.chart-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.chart-item {
  width: 45%;
  height: 200px;
}

canvas {
  background-color: white;
}
</style>

<script>
export default {
  mounted() {
    this.initializeCharts();
  },
  methods: {
    initializeCharts() {
      const chart1 = this.$refs.chart1;
      const chart2 = this.$refs.chart2;
      const chart3 = this.$refs.chart3;
      const chart4 = this.$refs.chart4;

      const data1 = [10, 20, 30, 40, 50]; // Ejemplo de datos para la gráfica 1
      const data2 = [5, 15, 25, 35, 45];  // Ejemplo de datos para la gráfica 2
      const data3 = [100, 200, 150, 300, 250]; // Ejemplo de datos para la gráfica 3
      const data4 = [8, 12, 16, 20, 24]; // Ejemplo de datos para la gráfica 4

      this.renderChart(chart1, data1);
      this.renderChart(chart2, data2);
      this.renderChart(chart3, data3);
      this.renderChart(chart4, data4);
    },
    renderChart(canvas, data) {
      const ctx = canvas.getContext('2d');
      // Configura los estilos y dibuja la gráfica utilizando la API de dibujo de HTML5

      // Establece el color de fondo del lienzo en blanco
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Establece los estilos para los ejes y las etiquetas
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.font = '12px sans-serif';
      ctx.fillStyle = 'black';

      // Calcula el ancho y alto del área de trazado de la gráfica
      const plotWidth = canvas.width - 40; // Deja un margen de 20px en cada lado
      const plotHeight = canvas.height - 40; // Deja un margen de 20px en cada lado

      // Calcula la escala en los ejes X e Y
      const xScale = plotWidth / (data.length - 1);
      const yScale = plotHeight / Math.max(...data);

      // Dibuja los ejes X e Y
      ctx.beginPath();
      ctx.moveTo(20, 20); // Origen (20, 20)
      ctx.lineTo(20, 20 + plotHeight); // Línea vertical del eje Y
      ctx.lineTo(20 + plotWidth, 20 + plotHeight); // Línea horizontal del eje X
      ctx.stroke();

      // Dibuja las etiquetas de los ejes X e Y
      ctx.fillText('X', canvas.width - 10, canvas.height - 10);
      ctx.fillText('Y', 10, 10);

      // Dibuja las barras utilizando los datos proporcionados
      ctx.fillStyle = 'blue';
      for (let i = 0; i < data.length; i++) {
        const x = 20 + i * xScale;
        const y = 20 + plotHeight - data[i] * yScale;
        const barWidth = xScale / 2;
        const barHeight = plotHeight - y;

        ctx.fillRect(x, y, barWidth, barHeight);
      }
    },
    updateCharts() {
      // Actualiza los datos de las gráficas y vuelve a renderizarlas llamando a this.renderChart() con los nuevos datos
    }
  }
};
</script>
