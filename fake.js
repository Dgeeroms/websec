$(document).ready(function(){let errorTimeout;const fadeSpeed=1000;function setResponseMsg(responseTxt,colour){$("#responseMsg").text(responseTxt);if(!$("#responseMsg").is(":visible")){$("#responseMsg").css({"color":colour}).fadeIn(fadeSpeed)}else{$("#responseMsg").animate({color:colour},fadeSpeed)}clearTimeout(errorTimeout);errorTimeout=setTimeout(()=>{$("#responseMsg").fadeOut(fadeSpeed)},5000)}$("#uploadBtn").click(function(){$("#fileSelect").click()});$("#fileSelect").change(function(){const fileBox=document.getElementById("fileSelect").files[0];const reader=new FileReader();reader.readAsDataURL(fileBox);reader.onload=function(event){

			//Check File Size
			if (event.target.result.length > 50 * 8 * 1024){
				setResponseMsg("File too big", "red");			
				return;
			}
			//Check Magic Number
			if (atob(event.target.result.split(",")[1]).slice(0,3) != "ÿØÿ"){
				setResponseMsg("Invalid file format", "red");
				return;	
			}
			//Check File Extension
			const extension = fileBox.name.split(".")[1].toLowerCase();
			if (extension != "jpg" && extension != "jpeg"){
				setResponseMsg("Invalid file format", "red");
				return;
			}


const text={success:"File successfully uploaded",failure:"No file selected",invalid:"Invalid file type"};$.ajax("/",{data:JSON.stringify({name:fileBox.name,type:fileBox.type,file:event.target.result}),contentType:"application/json",type:"POST",success:function(data){let colour="";switch(data){case "success":colour="green";break;case "failure":case "invalid":colour="red";break}setResponseMsg(text[data],colour)}})}})});
