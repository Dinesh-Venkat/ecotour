$(document).ready(function () {
	$(".fancybox").fancybox({
		helpers: {
			title: { type: 'inside' }
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
		openEffect: 'none',
		closeEffect: 'none',
		prevEffect: 'none',
		nextEffect: 'none',

		arrows: false,
		helpers: {
			media: {},
			buttons: {}
		}
	});

window.dataLayer = window.dataLayer || [];

gtag('js', new Date());

gtag('config', 'UA-1350892-1');

function gtag() { dataLayer.push(arguments); }


function formSubmit() {
	var noOfPersons = document.getElementById("inputPaxQuantity").value;
	var address = document.getElementById("inputMessage").value;
	var email = document.getElementById("inputEmail").value;
	var arrivalDate = document.getElementById("inputDateFrom").value;
	var userDetails = [];

	for(i = 0; i < noOfPersons; i++){
		let userDetail = {
			user_name : $("#inputName" + i).val(),
			age : $("#age" + i).val(),
			gender : $("#inputName" + i).val(),
			mobile_num : $("#inputPhone" + i).val(),
			email : email,
			address : address,
			arrival_date : arrivalDate,
			id_proof_type : $("#gov_id" + i).val(),
			id_proof_details : $("#idno" + i).val()
		};
		userDetails.push(userDetail);
	}
	console.log(JSON.stringify(userDetails));

	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8081/userreq",
		data: JSON.stringify(userDetails),
		dataType: 'text',
		cache: false,
		timeout: 300000,
		crossDomain:true,
		success: function (data) {
			window.location.href="../views/confirmation.html?date="+arrivalDate;
		},
		error: function (e) {
			console.log("ERROR : ", e);
		}
	});
}

function addDiv(obj) {
	var val = obj.value;

	for (i = 1; i < 15; i++) {
		var ele = 'addOn' + i;
		document.getElementById(ele).style.display = "none";
	}
	for (i = 1; i < val; i++) {
		var ele = 'addOn' + i;
		document.getElementById(ele).style.display = "block";

	}
}
