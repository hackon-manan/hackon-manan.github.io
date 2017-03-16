$(function(){


  var loadModel=document.getElementById('loadModel');
var responseModel=document.getElementById('responseModel');

 window.onclick = function(event) {
      if (event.target == responseModel) {
          responseModel.style.display = "none";
         
      }
  }
  loadModel.style.display="block";

	 $.ajax({
                      url: "https://hackonweb.herokuapp.com/submissions",
                  type:'GET',
                success: function(result){
                
                  if(!result.length){
                      $('#content').append("<p>There are no submissions yet.</p>");
                  }
                  else{
                                  var table=$('#table');
                   
                   
      $.each(result, function(i, item) {
        //table.append('<tr><td>'+item.personalDetails.name+'</td><td>'+item.submissionDetails.challangeName+'</td><td>Correct</td></tr>');
        if(item.submissionDetails.status==true)
          table.append('<tr><td>'+item.personalDetails.name+'</td><td>'+item.submissionDetails.challangeName+'</td><td>Correct</td></tr>');
        else{
          table.append('<tr><td>'+item.personalDetails.name+'</td><td>'+item.submissionDetails.challangeName+'</td><td>Incorrect</td></tr>');

        }
        });
                  }
                  loadModel.style.display="none";
                },
              error:function(){
                  loadModel.style.display="none";
                $('#response').html("Some Error has occured");
                responseModel.style.display="block";
              }
              });


     $('#close-span').click(function(){
      responseModel.style.display="none";
  });
});