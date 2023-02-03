/* -------------------------- ACCESS AUTHENTICATION ------------------------- */
let authToken = localStorage.getItem('authToken');
let zowaselUser = localStorage.getItem('zowaselUser');

if(authToken && zowaselUser){
    location.href="dashboard/index.html";
}
// else{
//     localStorage.clear();
//     sessionStorage.clear();
//     location.assign('../login.html');
// }
/* -------------------------- ACCESS AUTHENTICATION ------------------------- */