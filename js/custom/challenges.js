$(function(){

  
 if($.cookie('userId')=="null"||$.cookie('userId')==undefined||$.cookie('userId')==null){
    window.location.href="../../index.html";
 }
 else{
  $('#url').attr("src",""+$.cookie('url'));
            $('#nspan').html($.cookie('name'));
  var loadModel=document.getElementById('loadModel');
        var responseModel=document.getElementById('responseModel');

    window.onclick = function(event) {
      if (event.target == responseModel) {
          responseModel.style.display = "none";
         
      }
  }
  
  $('#password').click(function(e){
    e.preventDefault();
    loadModel.style.display="block";
    $.ajax({
                      url: "https://hackonweb.herokuapp.com/password",
                  type:'GET',
                success: function(result){
                   loadModel.style.display="none";
                  $('#response').html(result.result);
                   responseModel.style.display="block";
                },
              error:function(){
                 loadModel.style.display="none";
                $('#response').html("Some Error has occured");
                responseModel.style.display="block";
                 
              }
              });
  });

  $('#close-span').click(function(){
      responseModel.style.display="none";
  });

  $('#ansForm').submit(function(e){

        e.preventDefault();
       
        var userId=$.cookie('userId');
        var ans=$('#answerInput').val().trim();
        var chId=$('#chInput').val().trim();
        
        if(ans===''){
          $('#answerInput').addClass('warning');
        }
        else{
             loadModel.style.display="block";
                $.ajax({
                      url: "https://hackonweb.herokuapp.com/"+userId
                      +"/challenge/"+chId+"/"+ans,
                  type:'POST',
                  
                success: function(result){
                   $('#answerInput').val('');
                  result=JSON.parse(result);
                  loadModel.style.display="none";
                  $('#response').html("");
                  if(result.result=="success"){
                    $('#response').html("Congratulations!! You cracked it.");
                  }
                  else{
                    $('#response').html("Bad Luck! Try again");
                  }
                  
                  responseModel.style.display="block";
                    
                },
              error:function(){
                loadModel.style.display="none";
                $('#response').html("Some Error has occured");
                responseModel.style.display="block";
              }
              });
        }
        

      });
 }
	
});


