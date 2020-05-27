$(document).ready(function() {
	  $(".fancybox").fancybox({
	   helpers : {
		title : { type : 'inside' }
	   },
			/* afterLoad : function() {
			this.title = (this.title ? '' + this.title + '<br />' : '') + 'Image ' + (this.index + 1) + ' of ' + this.group.length;
		   } */
	  });
});

document.documentElement.className = 'js';

$('.fancybox-media')
				.attr('rel', 'media-gallery')
				.fancybox({
					openEffect : 'none',
					closeEffect : 'none',
					prevEffect : 'none',
					nextEffect : 'none',

					arrows : false,
					helpers : {
						media : {},
						buttons : {}
					}
				});

window.dataLayer = window.dataLayer || [];

gtag('js', new Date());

  gtag('config', 'UA-1350892-1');

function gtag(){dataLayer.push(arguments);}


function formSubmit() {
    var name=document.getElementById("inputName").value;
    var mobile=document.getElementById("inputPhone").value;
    var address=document.getElementById("inputMessage").value;
    var id=document.getElementById("gov_id").value;
    var idno=document.getElementById("idno").value;
    var email=document.getElementById("inputEmail").value;
    var arrivalDate=document.getElementById("inputDateFrom").value;
    var noOfPersons=document.getElementById("inputPaxQuantity").value;

if (noOfPersons >1){
for (i = 1; i < noOfPersons; i++) {
}

    window.location.href="../views/confirmation.html?date="+arrivalDate;
   }
}

function addDiv(obj){
       var val = obj.value;

 for (i = 1; i < 15; i++) {
     var ele='addOn'+i;
     document.getElementById(ele).style.display="none";
}
 for (i = 1; i < val; i++) {
     var ele='addOn'+i;
 document.getElementById(ele).style.display="block";

}
 }
