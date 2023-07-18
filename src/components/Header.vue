<template>
    <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/addBooks" v-if="isAdmin">Add Books</router-link>
        <router-link to="/search" >Search Books</router-link>
        <router-link to="/accounts" v-if="isAdmin">Accounts Created</router-link>
        <!-- <router-link to="/updateBooks" v-if="isAdmin">Update the books</router-link> -->
       
        
        <a href="#" v-on:click="logout">Logout</a>
    </div>
</template>

<script>
export default{
    name: 'Head-er',
    data(){
        return{
            isAdmin: false
        }
    },
    beforeMount(){
        var user = localStorage.getItem('user-info');
        this.isAdmin = (JSON.parse(user).role)=='admin'? true:false
    },
   
    methods:{
        logout(){
            alert("Logged out successfully")
            localStorage.clear();
            this.$router.push({name:'Login'})
        }
    }
}

</script>

<style >
 .nav{
    background-color: aquamarine;
 }
 .nav{
    background-color: rgb(107, 216, 216);
    overflow: hidden;
 }
 .nav a{
    float: left;
    color: antiquewhite;
    padding: 14px 16px;
    text-align: center;
    font-size: 17px;
    text-decoration: solid;
    margin-right: 5px;
 }
 .nav a:hover{
    background: white;
    color:#333;
 }

</style>