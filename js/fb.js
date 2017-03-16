 function getUserData() {
            FB.api('/me', function(response) {
                
                if(response&& !response.error)  
               loadChallenges(response.name,response.email,response.id);
                console.log(JSON.stringify(response));
                FB.api("/"+response.id+"/picture?type=large",function (response) {
                    if (response && !response.error) {
                        /* handle the result */
                        console.log(JSON.stringify(response))
                        
                        $.cookie('url',response.data.url);
                    }
                });
            });
        }
         function loadChallenges(names,emails,ids){
          var loadModel=document.getElementById('loadModel');
        var responseModel=document.getElementById('responseModel');
             loadModel.style.display="block";
               //$('#loginBtn').html('<img src="images/btnload.gif" width="10px" height="10px">Logging in...');
               console.log($('#loginBtn').html());
                  $.ajax({
                      url: "https://hackonweb.herokuapp.com/login",
                  type:'POST',
                  contentType: 'application/json',
                 
                  data : JSON.stringify({name:names,email:emails,id:ids}),
                success: function(result){
                    $.cookie('userId',ids);
                    $.cookie('name',names);
                    loadModel.style.display="none";
                    location.href="dashboard.html";
                },
              error:function(){
                  loadModel.style.display="none";
                $('#response').html("Some Error has occured");
                responseModel.style.display="block";
              }
              });
          }
        function logUserOut(){
            FB.logout(function(response) {
                console.log('logged out');
            });
        }

 //load the JavaScript SDK
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.com/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
window.fbAsyncInit = function() {
    //SDK loaded, initialize it
    FB.init({
        appId      : '1572211359712500',
        xfbml      : true,
        version    : 'v2.2',
        cookie  : true,
    });
    document.getElementById("loginBtn").onclick=function() {
    //do the login
    FB.login(function(response) {
        if (response.authResponse) {
            //user just authorized your app
          //



           // document.getElementById('loginBtn').style.display = 'none';
            getUserData();
        }
    }, {scope: 'email,public_profile', return_scopes: true});
};
    //check user session and refresh it
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            //user is authorized
            console.log("user authorized");

            //document.getElementById('loginBtn').style.display = 'none';
            getUserData();
        } else {
            console.log("user not authorized");
            //user is not authorized
        }
    });
}; 
       