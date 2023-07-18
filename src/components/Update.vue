<template>
    <Header />
    <h1>Hello Admin {{ name }}, Welcome to Update books Page</h1>
    <form class="add">
        <input type="text" placeholder="Enter Course Name" v-model="library.course_name">
        <input type="text" placeholder="Enter Book Name" v-model="library.book_name">
        <input type="text" placeholder="Enter contact of Student" v-model="library.contact">
        <input type="text" placeholder="Enter Assigned Student Name" v-model="library.book_assigned">
        <input type="text" placeholder="Enter Address" v-model="library.address">
        <button type="button" class="add" v-on:click="updateBooks">Add Details</button>
    </form>
</template>

<script >
import Header from './Header.vue'
import axios from 'axios'
export default {
    name: 'Up-date',
    components: {
        Header
    },
    data() {
        return {
            name: '',
            library: {
                course_name: '',
                book_name: '',
                contact: '',
                book_assigned: '',
                address: ''
            }
        }
    },
    methods:{
        async updateBooks(){
            
            console.log(this.library)
            console.log("hey",this.library)
            const result = await axios.put("http://localhost:3000/library/"+this.$route.params.id,{
                course_name: this.library.course_name,
                book_name: this.library.book_name,
                contact: this.library.contact,
                book_assigned:this.library.book_assigned,
                address:this.library.address
            });
            if(result.status == 200){
                this.$router.push({ name: 'Homepage' })
            }
            console.log(result)
        
        }
    },
    async mounted() {
        let user = localStorage.getItem('user-info');
        //   console.log(JSON.parse(user).role)
        if (!user) {
            this.$router.push({ name: 'SignUp' })
        }

        const result = await axios.get("http://localhost:3000/library/"+this.$route.params.id)
        console.log(`${this.$route.params.id}`, result)
        this.library=result.data
        this.name = JSON.parse(user).name


    }
}

</script>

<!-- <style >

</style> -->