<template>
  <header class="header">
    <router-link to="/">
      <img class="logo" src="@/assets/logo.svg" alt="Logo" />
    </router-link>

    <nav class="nav-center">
      <a href="#" class="nav-link">Microrrelatos</a>
      <a href="#" class="nav-link">Poesías</a>
      <a href="#" class="nav-link">Opinión</a>
    </nav>

    <nav class="nav-right">
      <router-link to="/create" class="nav-link">Crear Txt</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: #fff;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid #e0e0e0;
}

.logo {
  width: 120px;
  height: auto;
}

.nav-center, .nav-right {
  display: flex;
  gap: 3rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  transition: text-shadow 0.3s;
}

.nav-link:hover {
  text-shadow: 0 0 1px #333;
}

</style>