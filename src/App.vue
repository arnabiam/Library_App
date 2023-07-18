<template>

  <!-- <Signup/> -->

  <router-view/>
</template>

<script>
// import Signup from './components/SignUp.vue'
export default {
  name: 'App',
  // components: {
  //   Signup
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
body{
  padding:0;
  margin: 0;
}
.logo{
  width: 140px;
 }
.register input, .login input, .add input{
  margin-top: 5px;
  width: 300px;
  height:40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
 }
 .register button{
  width: 320px;
  height:40px;
  border: 1px solid skyblue;
  background: rgb(9, 173, 238);
  color: whitesmoke;
  cursor: pointer;
 }
 .login button, .add button{
  width: 320px;
  height:40px;
  border: 1px solid skyblue;
  background: rgb(3, 168, 233);
  color: whitesmoke;
  cursor: pointer;
 }
 .search-box {
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.custom-table th,
.custom-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.custom-table th {
  background-color: #f2f2f2;
}

.custom-table tr:hover {
  background-color: #f5f5f5;
}
</style>
