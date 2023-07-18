import Homepage from './components/Homepage.vue';
import SignUp from './components/SignUp.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login'
// import Admin from './components/admin'
import Add from './components/Add'
import Update from './components/Update'
import Search from './components/Search'
import Accounts from './components/Accounts'

// let user = localStorage.getItem('user-info');
// let users = JSON.parse(user)
//  if(users.role=='admin'){
//     var isAdmin =  users.role
//     }
//     // else{
//     //     var isStudent = users.role
//     // }
// function guest(to, from, next) {
//     if (localStorage.activeUser) {
//       next({ name: "Admin" });
//     } else next();
//   }
//  var user = localStorage.getItem('user-info');
//   function guard(to, from, next) {
//     if (JSON.parse(user).role=='admin') {
//       next();
//     } else next({ name: "Homepage" });
//   }
const routes = [
    // {
    //     path: "/admin",
    //     name: "Admin",
    //     component: Admin,
    //     beforeEnter: guard,
    //   },
    {
        name: 'Homepage',
        component: Homepage,
        path: '/',
        meta: { requiresAuth: true }

    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up',
    },
    {
        name: 'Login',
        component: Login,
        path: '/login'
    },

    // {
    //     path: '/admin',
    //     name: 'admin',
    //     component: Admin,
    //     meta: { requiresAdmin: true} // Add a meta field to indicate admin access requirement
    // },
    {
        path: '/addBooks',
        name: 'add',
        component: Add,
        meta: { requiresAdmin: true, requiresAuth: true } // Add a meta field to indicate admin access requirement
    },
    {
        path: '/updateBooks/:id',
        name: 'Update',
        component: Update,
        meta: { requiresAdmin: true, requiresAuth: true }
        // meta: { requiresAdmin: true} // Add a meta field to indicate admin access requirement
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
        // meta: { requiresAdmin: true} // Add a meta field to indicate admin access requirement
        meta: { requiresAuth: true }

    },
    {
        path: '/accounts',
        name: 'Accounts',
        component: Accounts,
        meta: { requiresAdmin: true, requiresAuth: true }
        // meta: { requiresAdmin: true} // Add a meta field to indicate admin access requirement
    },
    // {
    //     path: '/updateBooks',
    //     name: 'Update',
    //     component: Update,
    //     // meta: { requiresAdmin: true} // Add a meta field to indicate admin access requirement
    // }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})
// router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAdmin) {

//         if (userIsAdmin()) {
//             next();
//         } else {
//             // If the user is not an admin, redirect to a different route or show an error message
//             next('/'); // Redirect to the home page or any other route
//         }
//     } else {
//         // If the route doesn't require admin access, proceed as usual
//         next();
//     }
// });
// router.beforeEach((to,from,next)=>{
//     if(!to.meta.requireAuth ){
//         next()
//         return
//     }
//     else {
//         var user = localStorage.getItem('user-info');
//         if(to.meta.requireAuth && JSON.parse(user).role=='admin' ){

//             next({name: 'admin'})
//     }
//     else if(to.meta.requireAuth && JSON.parse(user).role=='student' ){
//              next({name:'Homepage'})
//     }
//     }

// })
// router.beforeEach((to, from, next) => {
//     const isAuthenticated = checkAuthentication();
//     const isAdmin = false // Replace with your own authentication check logic
//     console.log(isAuthenticated)
//     if (to.meta.requiresAuth && !isAuthenticated ) {
//         next({name:'Login'}); // Redirect to the login page if authentication is required but the user is not authenticated
//     } else if (to.meta.requiresAuth && isAuthenticated) {
//         checkAdmin();
//         if (isAdmin && to.meta.requiresAdmin) {
//             console.log("Inside Admin")
//             next(); // Redirect to the dashboard if the user is already authenticated and trying to access the login page
//         }
//         else {
//             console.log("Else Condition")
//             next({name:'Search'})
//         }
//     } else {
//         console.log("Else Condition 2")
//         next(); // Proceed to the requested route
//         // console.log("Redirecting to aa")
//     }
// });
// function checkAuthentication() {
//     // Example: Check if the user is logged in by verifying the presence of a token in the local storage
//     return localStorage.getItem('user-info');
// }
// function checkAdmin() {
//     var user = localStorage.getItem('user-info');
//     const isAdmin = (JSON.parse(user).role) == 'admin' ? true : false
//     console.log(isAdmin)
//     return isAdmin
// }

router.beforeEach((to, from ,next)=>{
    if(!to.meta.requiresAuth){
        next();
        return
    }
    var user = localStorage.getItem('user-info');
    
    if(user){
        console.log('print 174')
        const isAdmin = (JSON.parse(user).role) == 'admin' ? true : false
        if(!to.meta.requiresAdmin){
            console.log('print 176')
            console.log(`${to} ${from} ${next}`)
          next()
        }
        else if(to.meta.requiresAdmin && isAdmin){
            console.log('print 182')
          next()
        }
        // else{
        //     next({name:'Homepage'})
        // }
        
    }
    else{
        console.log('print 191')
        next({name:'Login'})
    }
})



export default router;