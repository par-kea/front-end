import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () => import("@/views/inicio/inicio.vue"),
    meta: { isPublic: true },
    redirect: { name: "inicio" },
    children: [
      {
        path: "inicio",
        name: "inicio",
        meta: {
          title: "Inicio",
          descriptionLayout: "Inicio",
        },
        component: () => import("@/views/login/LoginP.vue"),
      }
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/_Layout.vue"),
    meta: { isPublic: true },
    redirect: { name: "loginP" },
    children: [
      {
        path: "loginP",
        name: "loginP",
        meta: {
          title: "Iniciar sesión",
          descriptionLayout: "Iniciar sesión",
        },
        component: () => import("@/views/login/LoginP.vue"),
      },
      {
        path: "registrar",
        name: "registro",
        meta: {
          title: "Registro del paciente",
          descriptionLayout: "Registro del paciente",
        },
        component: () => import("@/views/login/Registro.vue"),
      },
      {
        path: "preguntas",
        name: "preguntas",
        meta: {
          title: "Preguntas frecuentes",
          descriptionLayout: "Preguntas frecuentes",
        },
        component: () => import("@/views/login/Preguntas.vue"),
      },
      {
        path: "NuevaContra",
        name: "NuevaContra",
        meta: {
          title: "Cambio de contraseña",
          descriptionLayout: "Cambio de contraseña",
        },
        component: () => import("@/views/login/NuevaContra.vue"),
      },
      {
        path: "/success",
        name: "Success",
        component: () => import("@/views/clientes/_Layout.vue"),
      },{
        path: "/error",
        name: "Error",
        component: () => import("@/views/login/NuevaContra.vue"),
      },
      // {
      //   path: "Tarjeta",
      //   name: "Tarjeta",
      //   meta: {
      //     title: "Cambio de contraseña",
      //     descriptionLayout: "Cambio de contraseña",
      //   },
      //   component: () => import("@/views/login/Tar.vue"),
      // },
    ],
  },
  {
    path: "/admin",
    component: () => import("@/views/admin/_Layout.vue"),
    meta: { isPublic: true },
    redirect: { name: "parqueaderos" },
    children: [
      {
        path: "parqueaderos",
        name: "parqueaderos",
        meta: {
          title: "Inicio del administrador",
          descriptionLayout: "Inicio del administrador",
        },
        component: () => import("@/views/admin/Parqueaderos.vue"),
      },
      {
        path: "clientes",
        name: "clientes",
        meta: {
          title: "Administrador de clientes",
          descriptionLayout: "Administrador de clientes",
        },
        component: () => import("@/views/admin/Cliente.vue"),
      },
      {
        path: "reservas",
        name: "reservas",
        meta: {
          title: "Administrador de reserva",
          descriptionLayout: "Administrador de reserva",
        },
        component: () => import("@/views/admin/Reservas.vue"),
      },
      {
        path: "funcionarios",
        name: "funcionarios",
        meta: {
          title: "Administrador de funcionarioa",
          descriptionLayout: "Administrador de funcionarios",
        },
        component: () => import("@/views/admin/Funcionario.vue"),
      },
      {
        path: "auditoria",
        name: "auditoria",
        meta: {
          title: "Administrar Auditorias",
          descriptionLayout: "Administrar Auditorias",
        },
        component: () => import("@/views/admin/Auditoria.vue"),
      },
      {
        path: "GrafiasYReportes",
        name: "GrafiasYReportes",
        meta: {
          title: "Administrar Auditorias",
          descriptionLayout: "Administrar Auditorias",
        },
        component: () => import("@/views/admin/GraficasYReportes.vue"),
      },
    ],
  },
  {
    path: "/clientes",
    component: () => import("@/views/clientes/_Layout.vue"),
    meta: { isPublic: true },
    redirect: { name: "reservar" },
    children: [
      {
        path: "reservar",
        name: "reservar",
        meta: {
          title: "Ver agenda",
          descriptionLayout: "Ver agenda",
        },
        component: () => import("@/views/clientes/Reservar.vue"),
      },
      {
        path: "historial",
        name: "historial",
        meta: {
          title: "Ver historial",
          descriptionLayout: "Ver historial",
        },
        component: () => import("@/views/clientes/Historial.vue"),
      },
    ],
  },
  {
    path: "/funcionarios",
    component: () => import("@/views/funcionarios/_Layout.vue"),
    meta: { isPublic: true },
    redirect: { name: "ReservasF" },
    children: [
      {
        path: "ReservasF",
        name: "ReservasF",
        meta: {
          title: "Ver agenda",
          descriptionLayout: "Ver agenda",
        },
        component: () => import("@/views/funcionarios/ReservasF.vue"),
      },
      
      {
        path: "GrafiasYReportesFun",
        name: "GrafiasYReportesFun",
        meta: {
          title: "Administrar Auditorias",
          descriptionLayout: "Administrar Auditorias",
        },
        component: () => import("@/views/funcionarios/GraficasYReportesF.vue"),
      },
      // {
      //   path: "agenda/cita/:id",
      //   name: "cita",
      //   meta: {
      //     title: "Ver cita",
      //     descriptionLayout: "Ver cita",
      //   },
      //   component: () => import("@/views/funcionarios/Cita.vue"),
      // },
      
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
