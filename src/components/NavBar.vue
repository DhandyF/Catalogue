<template>
  <div class="nav">
    <nuxt-link to="/" class="brand">
      Catalogue
    </nuxt-link>
  </div>
</template>

<style scoped>
.nav {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  overflow: hidden;
  position: fixed;
  background-color: white;
  top: 0;
  z-index: 10;
  border-radius: 0px 0px 10px 10px;
  -moz-border-radius: 0px 0px 10px 10px;
  -webkit-border-radius: 0px 0px 10px 10px;
  box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.2);
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.2);
}

.brand {
  font-family: 'Quicksand-Bold', sans-serif;
  display: block;
  font-size: 20px;
  color:#5c4050;
  letter-spacing: 1px;
  text-decoration: none;
}

nav a {
  font-family: 'Quicksand-SemiBold', sans-serif;
  display: block;
  font-size: 15px;
  color:#5c4050;
  text-decoration: none;
}
</style>
