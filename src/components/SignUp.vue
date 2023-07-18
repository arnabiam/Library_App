<template>
  <img class="logo" src="../assets/library.jpg">
  <h1>Sign Up</h1>
  <div class="register">
    <form @submit.prevent="handleSubmission">
      <input type="text" placeholder="Enter Name" v-model="name" required />
      <input type="text" placeholder="Enter Email" v-model="email" required />
      <span v-if="msg.email">{{ msg.email }}</span>
      <input type="password" placeholder="Enter Password" v-model="password" required />
      <span v-if="msg.password">{{ msg.password }}</span><br>
      <select v-model="selectedRole">
        <option value="admin">Admin</option>
        <option value="student">Student</option>
      </select>
      <button v-on:click="signUp" :disabled="!disabled.every(i => i === false)">Signup</button>
    </form>
    <p>
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Sign-up',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      msg: [],
      selectedRole: '',
      disabled: [true, true]
    }
  },
  methods: {
    validateEmail(value) {
      //eslint-disable-next-line
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg['email'] = '';
        this.disabled = [false, this.disabled[1]]
      } else {
        this.msg['email'] = 'Invalid Email Address';
        this.disabled = [true, this.disabled[1]]
      }
    },
    validatePassword(value) {
      let difference = 8 - value.length;
      if (value.length < 8) {
        this.msg['password'] = 'Must be 8 characters! ' + difference + ' characters left';
        this.disabled = [this.disabled[1], true]
      } else {
        this.msg['password'] = '';
        this.disabled = [this.disabled[1], false]
      }
    },
    async signUp() {
      console.log(this.selectedRole)
      //  console.warn("signup", this.name, this.email, this.password)
      //  console.log(this.name,this.email,this.password)
     let results;
      try{
       results = await axios.post("http://localhost:3000/user", {


        name: this.name,
        email: this.email,
        password: this.password,
        role: this.selectedRole



      }
      )}catch(error){
        console.log(error)
      }
     console.log(results.status)
      if (results.status === 201) {
        console.log(results.data.length)
        alert("Signed up Successfully");
        // localStorage.setItem("user-info", JSON.stringify(results.data))
        this.$router.push({ name: 'Login' }).catch(error => {
   console.log(error.message)
})
      }
      else if (!this.email && !this.password && !this.name) {
        alert("Please fillup all the fields")
      }
    }
  },
  mounted() {
    // let user = localStorage.getItem('user-info');
    // if (!user) {
    //   this.$router.push({ name: 'Login' })
    // }
  },
  watch: {
    email(value) {
      // binding this to the data value in the email input
      // this.email = value;
      this.validateEmail(value);
    },
    password(value) {
      // this.password = value;
      this.validatePassword(value);
    }

  }
}

</script>

<style>
/* .logo{
  width: 140px;
 } */
/* .register input{
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
  background: skyblue;
  color: whitesmoke;
  cursor: pointer;
 } */
</style>

