//general link for google spreadsheets
var link =  "https://sheets.googleapis.com/v4/spreadsheets/";
//spreadsheet id for ewb spreadsheet
const spreadsheetID = "1VfLX6vDtMakak_Xkbi5UJXKZAYCxqu5SrkPy505jELE";
//authentication
const API_KEY = "?key=AIzaSyAJdpeOfeSN4nHtq5APfYaalEfRg-shB0g";
//range of cells from sheet
var range = "/values/" + "A" + ":" + "A";
//initiate empty datasheet
var dataSheets = {};

// finding no. of rows from spreadsheet
$.ajax({
	type: "GET",
	url: link + spreadsheetID + range + API_KEY,
	async: false,
	success: function(data, status){
	         	console.log("No. of rows in spreadsheet:", data.values.length, "Status :", status);
	         	range = "/values/" + "A2:" + "M" + (data.values.length).toString();
	     	}

})

//new get request for all the data
$.ajax({
	type: "GET",
	url: link + spreadsheetID + range + API_KEY,
	async: false,
	success: function(data, status){
		dataSheets = data;
			}
})

console.log("Spreadsheet Object:", dataSheets);

//make the most recent post first in the array
var input = dataSheets.values.reverse();




// "Do you want to post on the Website"-- only post "Yes"
var notArchived = []
for (obji in input){
	if (input[obji][2]=="Yes") notArchived.push(input[obji])
}
input = notArchived


var maxPosts = 6;


console.log("Array to be posted:", input);
var numberofposts = input.length
var poststart = 0;
var postNum = Math.min(maxPosts,numberofposts);
var postend = postNum;

// Disable load next/prev btn when posts < maxPosts
if (numberofposts <= maxPosts){
	$("#loadnext").addClass('disabled');
	$("#loadprev").addClass('disabled');
}


// Load next when btn clicked
$("#loadnext").click(function(){
    $("#mainposts").empty();
    if (postend+postNum <numberofposts){
        poststart+=postNum;
        postend+=postNum;
				$("#loadprev").removeClass('disabled');
				$("#loadnext").removeClass('disabled');
        render(input, poststart, postend);
    } else {
        poststart += postNum;
        postend=numberofposts;
        $("#loadnext").addClass('disabled');
        $("#loadprev").removeClass('disabled');
				render(input, poststart, postend);
    }
    console.log('A', poststart, 'B', postend);
});

// Load previous when btn clicked
$("#loadprev").click(function(){
    $("#mainposts").empty();
		if (poststart>numberofposts - postNum){
			poststart = numberofposts - postNum - numberofposts % postNum;
			postend = poststart+postNum;
			$("#loadprev").removeClass('disabled');
			$("#loadnext").removeClass('disabled');
			render(input, poststart, postend)
		}
    else if (poststart-postNum > 0){
        poststart -= postNum
        postend -= postNum
				$("#loadprev").removeClass('disabled');
				$("#loadnext").removeClass('disabled');
        render(input, poststart, postend)
    } else {
        poststart=0
        postend=postNum
        render(input, poststart, postend)
        $("#loadprev").addClass('disabled')
        $("#loadnext").removeClass('disabled')
    }
    console.log('A', poststart, 'B', postend);
});


render(input, poststart, postend);


// Function to render posts from int poststart to intpostend
function render(inputA, starthere, endhere){
	console.log("(render funciton)Range to be rendered:", starthere, endhere)
	for (let i = starthere; i < endhere; i++){

		console.log("post number", i)
		let id = i.toString()


		let article = $("<article>" + 
						 	"<a href='news.html#news" + id + "' class='image' id = a1" + id + ">" +
						 		/*Image goes here*/
						 	"</a>"  +
							"<h3 id = h3" + id + ">" + /*heading goes here*/"</h3>" +
							"<p><b id= date" + id + ">" + /*date goes here*/"</b></p>" +
							"<p id = p" + id + ">" + /*main body of post goes here*/"</p>" +
							"<p style='text-align: right' id = nameoptitle" + id + ">" + 
							/*Name and title of author goes here*/ 
							"</p>" +
							"<div id = link" + id + "/>"+
							//"<a id = link" + id + "href='#' class='button special fit'></a>" + 
							"<br/>" + 
							"<ul class='actions' id=ul" + id + ">" + 
								"<li><a href='news.html#news" + id + "' class='button'>More</a></li>" +
							"</ul>" +
							"</article>");

		$("#mainposts").append(article); //article
		$("#nameoptitle"+id).append("- <i>" + inputA[i][3] + "</i>"); //author name
		if (inputA[i][4] != "") $("#nameoptitle"+id).append(", <i>" + inputA[i][4] + "</i>"); //title of author
		$("#date"+id).append(inputA[i][5]); //date
		$("#h3"+id).append(inputA[i][6]); //title
		if (inputA[i][8] != "" && inputA[i][9] != "") {
			//append link and its title if available
			$("#link"+id).append("<a href="+inputA[i][8]+" class='button special fit'>"+inputA[i][9]+"</a>");
		}
		//create paragraph brakes
		console.log("this is the text:", input[i][7]);
		inputA[i][7] = inputA[i][7].replace(/(?:\r\n|\r|\n)/g, '<br />');


		//decrease size of text in front page and append "...""
		if (inputA[i][7].length > 350){
			$("#p"+id).append(inputA[i][7].substr(0, 350) + "..."); //paragraph
		} else {
			$("#p"+id).append(inputA[i][7]);
			$("#ul"+id).empty();
		}


		//inserting image or video
		if (inputA[i][10] == "IMAGE"){
			inputA[i][11]=inputA[i][11].replace("open?id=", "uc?id=");
			$("#a1"+id).append("<img src='"+inputA[i][11]+"&export=download' alt='' />")
		} else if (inputA[i][10] == "VIDEO") {
			//	swap watch?v= with embed/ in input[i][12]
			inputA[i][12]=inputA[i][12].replace("watch?v=", "embed/");
			$("#a1"+id).append("<iframe width='840' height='500' src='"+inputA[i][12]+"'></iframe>")
		}

	}
}



