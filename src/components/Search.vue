<template>
    <Header />
    <div>
        <input type="text" class="search-box" v-model="searchQuery" placeholder="Search" />

        <table class="custom-table">
            <thead>
                <tr>
                    <!-- <th @click="sortTable('course_name')">Id</th>
                    <th @click="sortTable('book_name')">Book Name</th>
                    <th @click="sortTable('contact')">Contact</th>
                    <th @click="sortTable('book_assigned')">Book Assigned</th>
                    <th @click="sortTable('address')">Address</th> -->
                    <th>Id</th>
                    <th >Book Name</th>
                    <th >Contact</th>
                    <th >Book Assigned</th>
                    <th >Address</th>
                    <!-- {{ paginatedData }} -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in paginatedData" :key="item.id">
                    <!-- {{ paginatedData }} -->
                    <td>{{ item.course_name }}</td>
                    <td>{{ item.book_name }}</td>
                    <td>{{ item.contact }}</td>
                    <td>{{ item.book_assigned }}</td>
                    <td>{{ item.address }}</td>
                    <!-- {{ item }} -->
                </tr>
            </tbody>
        </table>
        <div class="pagination">
            <button :disabled="currentPage === 1" @click="previousPage">Previous</button>
            <span>{{ currentPage }}</span>
            <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
        </div>
    </div>
</template>
  
<script>
import Header from './Header.vue'
import axios from 'axios'
export default {
    name: 'Sear-ch',
    components: {
        Header
    },
    data() {
        return {
            library: [],
            searchQuery: '',
            // sortKey: '',
            // sortDirection: 1,
            page: 1,
            itemsperPage: 20,
            records: [],
            pageSize: 5, // Number of items per page
            currentPage: 1, // Current page number
        };
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
            let result = await axios.get("http://localhost:3000/library");
            console.log(result)
            this.library = result.data;
            console.log(this.library[0])
        },
        // sortTable(key) {
        //     console.log(key)
        //     if (this.sortKey === key) {
        //         this.sortDirection *= -1;
        //     } else {
        //         this.sortKey = key;
        //         this.sortDirection = 1;
        //     }
        // },
        search() {
            this.currentPage = 1; // Reset to the first page
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            console.log("next")
            if (this.currentPage < this.totalPages) {
                console.log("Inside If in next")
                this.currentPage++;
                
            }
            console.log(this.currentPage,this.totalPages)
        },
        goToPage(pageNumber) {
            if (pageNumber >= 1 && pageNumber <= this.totalPages) {
                this.currentPage = pageNumber;
            }
        },
    },
    computed: {
        // filteredItems() {
        //     if (this.searchQuery) {
        //         console.log(this.searchQuery)
        //         const query = this.searchQuery.toLowerCase();
        //         return this.users.filter((item) => {
        //             return (
        //                 item.id.toLowerCase().includes(query) ||
        //                 item.book_name.toLowerCase().includes(query) ||
        //                 item.contact.toLowerCase().includes(query) ||
        //                 item.book_assigned.toLowerCase().includes(query) ||
        //                 item.address.toLowerCase().includes(query) 

        //             );
        //         });
        //     } else {
        //         return this.users;
        //     }
        // },
        filteredData() {
            if (!this.searchQuery) {
                return this.library;
            }
            const lowerCaseQuery = this.searchQuery.toLowerCase();
            // console.log(this.library)
            console.log(this.paginatedItems,"line 110")
            return this.library.filter(item => {
                return Object.values(item).some(value =>
                    value.toString().toLowerCase().includes(lowerCaseQuery)
                );
                
            });
        },
        totalPages() {
            return Math.ceil(this.filteredData.length / this.pageSize);
        },
        paginatedData() {
            // console.log(this.filteredData);
           
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            console.log(startIndex,endIndex)
            // console.log(startIndex,this.itemsperPage)
            return this.filteredData.slice(startIndex,endIndex);
            // return this.filteredData;
    },
},
    async mounted() {
        this.loadData();
    },
}
</script>
<style>

</style>


