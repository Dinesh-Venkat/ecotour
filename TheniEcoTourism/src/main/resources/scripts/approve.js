$(document).ready( function () {


 var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    console.log(tmp[1]);
    console.log(document);
document.getElementById("reqId").innerHTML = tmp[1];

//server request should be done here using request id to get details from Database.
//If only one participant,then no need to show participant details. So need  to hide  that div if no participants.

var leader={ "name":"Mani", "age":30, "phone":8787778888,"address":"Andha Street,Indha pakkam,Chennai 63","email":"Endhu@gmail.com","id":"AADHAR","idNo":1213124152 };

var leaderData=[leader];


    var leaderRow='';
    $.each(leaderData, function (i, v) {

    leaderRow += "<tr class='table-row'><td>" + v.name + "</a></td>" + "<td>" + v.age + "</td>" + "<td>" + v.phone + "</td><td>" + v.address + "</td><td>"  + v.email + "</td><td>"+ v.id+ "</td><td>" + v.idNo + "</td>" + "</tr>";

    });
console.log(leaderRow);
    $("#tb_leader").append(leaderRow);


//comment below part and hide the div if java response length is 1
  var participant1 = { "name":"D", "age":35, "phone":8787778888,"id":"AADHAR","idNo":121423412 };
  var participant2 = { "name":"d", "age":30, "phone":1232312334,"id":"PAN","idNo":"BFISF1736D" };

    var data=[];
    data.push(participant1);
    data.push(participant2);


    var participantRow='';
    $.each(data, function (i, v) {

    participantRow += "<tr class='table-row'><td>" + v.name + "</a></td>" + "<td>" + v.age + "</td>" + "<td>" + v.phone + "</td><td>" + v.id+ "</td><td>" + v.idNo + "</td>" + "</tr>";

    });

    $("#tb_list").append(participantRow);

});


function approveDeclineRequest(message){
console.log(message);
console.log(document.getElementById(reqId).innerHTML);



//send server request to approve and make DB entry and send email to user
//for aproval alone set some default message and pass to server

//document.getElementById(reqId).innerHTML) gives request ID to .

window.location = "../views/adminMenuTest.html"; // Redirecting to other page.
}
