<template>
  <Header />
  <h1>Hello {{ name }}, Welcome to Home Page</h1>
  <table border="1" class="custom-table">
    <tr>
      <th scope="col" @click="sortTable('course_name')">Course Name</th>
      <th scope="col" @click="sortTable('book_name')">Book Name</th>
      <th scope="col" @click="sortTable('contact')">Contact</th>
      <th scope="col" @click="sortTable('book_assigned')">Book Assigned</th>
      <th scope="col" @click="sortTable('address')">Address</th>
      <th scope="col" v-if="isAdmin">Actions</th>
    </tr>
    <tr v-for="item in paginatedItems" :key="item.id">
      <td>{{ item.course_name }}</td>
      <td>{{ item.book_name }}</td>
      <td>{{ item.contact }}</td>
      <td>{{ item.book_assigned }}</td>
      <td>{{ item.address }}</td>
      <!-- <td>{{ sortedItems[item]}}</td> -->
      <td v-if="isAdmin">
        <router-link :to="'/updateBooks/' + item.id">Update Page</router-link>
        <button v-on:click="deleteLibrary(item.id)">Delete</button>
      </td>

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
  name: 'Home-page',
  data() {
    return {
      isAdmin: '',
      name: '',
      library: [],
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
    async deleteLibrary(id) {
      console.log(id)
      let result = await axios.delete("http://localhost:3000/library/" + id);
      console.log(result)
      if (result.status == 200) {
        this.loadData()

      }
    },
    async loadData() {
      let user = localStorage.getItem('user-info');
      this.name = JSON.parse(user).name
      console.log(JSON.parse(user).role)
      console.log("this is homepage")
      // if (!user) {
      //   this.$router.push({ name: 'SignUp' })
      // }
      this.name = JSON.parse(user).name
      let result = await axios.get("http://localhost:3000/library");
      console.log(result)
      this.library = result.data;
      console.log(this.library)
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
  beforeMount() {
    var user = localStorage.getItem('user-info');
    if (!user) {
        this.$router.push({ name: 'Login' })
      }
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
      console.log(this.sortedItems, "Hiiiiiiii")
      // this.isAdmin = (JSON.parse(user).role) == 'admin' ? true : false
    } catch (e) {
      console.log(e)
    }
  },
  computed: {
    //  sortedData() {
    //     const key = this.sortKey;
    //     const direction = this.sortDirection;

    //     // Create a copy of the original data array
    //     const data = [...this.tableData];

    //     // Perform the sorting based on the sort key and direction
    //     data.sort((a, b) => {
    //       if (a[key] < b[key]) {
    //         return -1 * direction;
    //       }
    //       if (a[key] > b[key]) {
    //         return 1 * direction;
    //       }
    //       return 0;
    //     });

    //     return data;
    //   },
    sortedItems() {
      if (this.sortKey) {
        const library = [...this.library];
        library.sort((a, b) => {
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
        return library;
      }
      return this.library;
    },
    totalPages() {
      // console.log(this.sortedItems,"SortedItems")
      // console.log(this.library,"Library")
      return Math.ceil(this.library.length / this.pageSize);
    },
    paginatedItems() {
      console.log(this.sortedItems, "SortedItems")
      console.log(this.library, "Library")
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.sortedItems.slice(startIndex, endIndex);
      // console.log("Library",this.library)
    },

  },

}

</script>

<style >
td {
  width: 200px;
  height: 40px;
}
</style>