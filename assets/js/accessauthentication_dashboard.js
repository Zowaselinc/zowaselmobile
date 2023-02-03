/* -------------------------- ACCESS AUTHENTICATION ------------------------- */
let authToken = localStorage.getItem('authToken');
let zowaselUser = localStorage.getItem('zowaselUser');

if(!(authToken && zowaselUser)){
    localStorage.clear();
    sessionStorage.clear();
    location.assign('../login.html');
}
/* -------------------------- ACCESS AUTHENTICATION ------------------------- */