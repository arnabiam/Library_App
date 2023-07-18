/* eslint-disable no-useless-escape */
<template>
    <img class="logo" src="../assets/library.jpg">
    <h1>Log In</h1>
    <div class="login">
        <form @submit.prevent="handleSubmission">
            <input type="text" placeholder="Enter Email" v-model="email" required />
            <span v-if="msg.email">{{ msg.email }}</span>
            <input type="password" placeholder="Enter Password" v-model="password" required />
            <span v-if="msg.password">{{ msg.password }}</span><br>
            <select v-model="selectedRole" required>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
            </select>
            <button v-on:click="logIn">Login</button>
        </form>
        <p>
            <router-link to="/sign-up">Signup</router-link>
        </p>
    </div>
</template>

<script >
import axios from 'axios'
export default {
    name: 'Log-in',
    data() {
        return {
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
        // handleSubmission(){
        //   alert(`Loggedin`)                                       
        // },
        async logIn() {
            let result = await axios.get(
                `http://localhost:3000/user?email=${this.email}&password=${this.password}&role=${this.selectedRole}`
            )
            if (result.status === 200 && result.data.length > 0) {
                alert("LoggedIn Successfully");
                localStorage.setItem("user-info", JSON.stringify(result.data[0]))
                this.$router.push({ name: 'Homepage' })
                console.log("hello")
            }
            else if (!this.email && !this.password && !this.selectedRole) {
                alert("Enter email id and password and fillup roles ")
            }
            else if (result) {
                alert("Email Password Role Combination not matching")
                console.log(result.data.length)
            }

            console.log(this.email, this.password, this.selectedRole)
            console.log(result)

        }
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

<style ></style>