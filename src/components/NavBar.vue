<template>
  <nav class="nav">
    <router-link to="/">View</router-link>
    <router-link to="/viewer">3D Simulation</router-link>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  background: #ffffffdd;
  padding: 10px 20px;
  display: flex;
  gap: 20px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.router-link-active {
  font-weight: bold;
  color: #007acc;
}
</style>
