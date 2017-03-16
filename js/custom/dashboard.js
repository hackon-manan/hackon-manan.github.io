$(function(){


    if($.cookie('userId')=="null"||$.cookie('userId')==null||$.cookie('userId')==undefined){
        location.href="index.html";
    }
    else{
      var loadModel=document.getElementById('loadModel');
var responseModel=document.getElementById('responseModel');

              $('#url').attr("src",""+$.cookie('url'));
            $('#nspan').html("Hello, "+$.cookie('name'));
            loadModel.style.display="block";
             $.ajax({
                      url: "https://hackonweb.herokuapp.com/"+$.cookie('userId')+"/challenges",
                  type:'GET',
                success: function(result){
               
                  /*alert(JSON.stringify(result));*/
                  var d=result.doneChallenges;
                   for(var i=0;i<d.length;i++){
                      $('#'+d[i]+' a').css("text-decoration","none");
                       $('#'+d[i]+' .card').css("background-color","grey");
                       $('#'+d[i]+' .card').hover(function(){
                            $(this).css("border","0px");
                       });
                   }
                   $('#score').html(result.totalScore);
                      loadModel.style.display="none";
                },
              error:function(){
                  loadModel.style.display="none";
                $('#response').html("Some Error has occured");
                responseModel.style.display="block";
              }
              });

    }
   
});