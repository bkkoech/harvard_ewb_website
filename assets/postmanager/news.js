
// nmaxPosts = 1;
// var nnumberofposts = input.length
// var npoststart = 0;
// var npostNum = Math.min(nmaxPosts,nnumberofposts)
// var npostend = npostNum

// // Disable load next/prev btn when posts < maxPosts
// if (nnumberofposts <= nmaxPosts){
// 	$("#nloadnext").addClass('disabled');
// 	$("#nloadprev").addClass('disabled');
// }


// // Load next when btn clicked
// $("#nloadnext").click(function(){
//     $("#newsposts").empty();
//     if (npostend+npostNum <nnumberofposts){
//         npoststart+=npostNum;
//         npostend+=npostNum;
// 				$("#nloadprev").removeClass('disabled');
// 				$("#nloadnext").removeClass('disabled');
//         newsrender(input, npoststart, npostend);
//     } else {
//         npoststart += npostNum;
//         npostend=nnumberofposts;
//         $("#nloadnext").addClass('disabled');
//         $("#nloadprev").removeClass('disabled');
// 				newsrender(input, npoststart, npostend);
//     }
//     console.log('nA', npoststart, 'nB', npostend);
// });

// // Load previous when btn clicked
// $("#nloadprev").click(function(){
//     $("#newsposts").empty();
// 		if (npoststart>nnumberofposts - npostNum){
// 			npoststart = nnumberofposts - npostNum - nnumberofposts % npostNum;
// 			npostend = npoststart+npostNum;
// 			$("#nloadprev").removeClass('disabled');
// 			$("#nloadnext").removeClass('disabled');
// 			newsrender(input, npoststart, npostend);
// 		}
//     else if (npoststart-npostNum > 0){
//         npoststart -= npostNum
//         npostend -= npostNum
// 				$("#nloadprev").removeClass('disabled');
// 				$("#nloadnext").removeClass('disabled');
//         newsrender(input, poststart, postend);
//     } else {
//         npoststart=0
//         npostend=npostNum
//         $("#nloadprev").addClass('disabled')
//         $("#nloadnext").removeClass('disabled')
//         newsrender(input, npoststart, npostend);
//     }
//     console.log('nA', npoststart, 'nB', npostend);
// });


//newsrender(input, npoststart, npostend);

newsrender(input, 0, numberofposts);
// Function to render posts from int poststart to intpostend
function newsrender(inputA, starthere, endhere){
	console.log("EVERY SINGLE TIME:")

	console.log("This is the max post:", maxPosts);
	console.log("(render funciton)Range to be rendered:", starthere, endhere)
	for (let i = starthere; i < endhere; i++){

		console.log("post number", i)
		let id = i.toString()


		let newsArticle = $("<tr id=news" + id + ">" +
					"<td>" + 
						"<p><b id=ndate" + id + ">" + /*Date goes here*/"</b></p>" +
						"<p>" +
							"<span class='image left'>" +
								"<a href='news.html#news" + id + "' class='image' id = na1" + id + ">" +
						 		/*Image goes here*/
						 		"</a>"  +
							"</span>" +
						"</p>" +
						"<h3 id=nh3" + id + ">" + /*Heading goes here*/"</h3>" +
						"<p id=np" + id + "></p>" + /*main body goes here*/
						"<p style='text-align: right' id = nnameoptitle" + id + ">" + 
							/*Name and title of author goes here*/ 
						"</p>" +
					"</td>" +
				"</tr>" +
				"<tr>" + 
					"<td>" +
						"<div id = nlink" + id + "/>" +
						/*link and link text goes here*/
					"</td>" +
				"</tr>");

		$("#newsposts").append(newsArticle); //article
		$("#nnameoptitle"+id).append("- <i>" + inputA[i][3] + "</i>"); //author name
		if (inputA[i][4] != "") $("#nnameoptitle"+id).append(", <i>" + inputA[i][4] + "</i>"); //title of author
		$("#ndate"+id).append(inputA[i][5]); //date
		$("#nh3"+id).append(inputA[i][6]); //title
		if (inputA[i][8] != "" && inputA[i][9] != "") {
			//append link and its title if available
			$("#nlink"+id).append("<a href="+inputA[i][8]+" class='button special fit'>"+inputA[i][9]+"</a>");
		}
		//create paragraph brakes
		console.log("this is the text:", input[i][7]);
		inputA[i][7] = inputA[i][7].replace(/(?:\r\n|\r|\n)/g, '<br />');
		//append to page
		$("#np"+id).append(inputA[i][7])



		//inserting image or video
		if (inputA[i][10] == "IMAGE"){
			inputA[i][11]=inputA[i][11].replace("open?id=", "uc?id=");
			$("#na1"+id).append("<img src='"+inputA[i][11]+"&export=download' alt='' />")
		} else if (inputA[i][10] == "VIDEO") {
			//	swap watch?v= with embed/ in input[i][12]
			inputA[i][12]=inputA[i][12].replace("watch?v=", "embed/");
			$("#na1"+id).append("<iframe width='840' height='500' src='"+inputA[i][12]+"'></iframe>")
		}

	}
}



