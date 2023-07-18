<template>
    <Header />
    <h1>Hello {{ name }}, Welcome to Home Page</h1>
    <table border="1" class="custom-table">
        <tr>
            <th scope="col"  @click="sortTable('name')">Name</th>
            <th scope="col"  @click="sortTable('email')">Email</th>
            <th scope="col"  @click="sortTable('role')">Roles Assigned</th>


        </tr>
        <!-- <tr v-for="item in users" :key="item.id"> -->
        <tr v-for="(item, index) in paginatedItems" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.role }}</td>


        </tr>
    </table>
    <div class="pagination">
        <button :disabled="currentPage === 1" @click="previousPage">Previous</button>
        <span>{{ currentPage }}</span>
        <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
    </div>
</template>
  
<script >
import Header from './Header.vue'
import axios from 'axios'
export default {
    name: 'Acc-ounts',
    data() {
        return {
            isAdmin: '',
            name: '',
            users: [],
            sortKey: '',
            sortDirection: 1,
            page: 1,
            perPage: 20,
            records: [],
            pageSize: 5, // Number of items per page
            currentPage: 1, // Current page number
        }
    },
    components: {
        Header
    },
    methods: {

        async loadData() {
            let user = localStorage.getItem('user-info');
            // this.name = JSON.parse(user).name
            //   console.log(JSON.parse(user).role)
            console.log("this is homepgae")
            if (!user) {
                this.$router.push({ name: 'SignUp' })
            }
            this.name = JSON.parse(user).name
            let result = await axios.get("http://localhost:3000/user");
            console.log(result)
            this.users = result.data;
            console.log(this.users)
        },
       
        sortTable(key) {
            console.log(key)
            if (this.sortKey === key) {
                this.sortDirection *= -1;
            } else {
                this.sortKey = key;
                this.sortDirection = 1;
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
    },

    computed: {
        sortedItems() {
            if (this.sortKey) {
                const users = [...this.users];
                users.sort((a, b) => {
                    const fieldA = a[this.sortKey];
                    const fieldB = b[this.sortKey];
                    if (fieldA < fieldB) {
                        return -1 * this.sortDirection;
                    }
                    if (fieldA > fieldB) {
                        return 1 * this.sortDirection;
                    }
                    return 0;
                });
                // this.a = library

                // console.log("Library",library)
                return users;
            }
            return this.users;
        },
        totalPages() {
            return Math.ceil(this.users.length / this.pageSize);
        },
        paginatedItems() {
            console.log(this.users,"User Items")
            console.log(this.sortedItems,"Sorted Items")
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.sortedItems.slice(startIndex, endIndex);
        },
    },
    beforeMount() {
        var user = localStorage.getItem('user-info');
        console.log("Hello");
        this.isAdmin = (JSON.parse(user).role) == 'admin' ? true : false
    },
    async mounted() {
        this.loadData();
    },
    async afterMount() {
        try {
            // var user = localStorage.getItem('user-info');
            console.log("Hello");
            // this.isAdmin = (JSON.parse(user).role) == 'admin' ? true : false
        } catch (e) {
            console.log(e)
        }
    }

}

</script>
  
<style >
td {
    width: 200px;
    height: 40px;
}
</style>