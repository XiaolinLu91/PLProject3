//TODO: Form validation

var person = function(){
	var data = {
		firstName: "FirstName",
		$firstName: function(n){ data.firstName = n},
		lastName: "LastName",
		$lastName: function(n){ data.lastName = n},
		email: "email",
		$email: function(n){ data.email = n},
		$descript: function(){return 'Name: '.concat(data.firstName,' ',data.lastName,'<BR>Email: ',data.email)}
	};

	var F = function(){};
	f = new F();

	f.sname = "Person"
	f.run = function(e){
		return data[e];
	}

	return f;
}();


var customer = function(p){
	var data = {
		firstName: "FirstName",
		$firstName: function(n){ data.firstName = n},
		lastName: "LastName",
		$lastName: function(n){ data.lastName = n},
		email: "email",
		$email: function(n){ data.email = n},
		customerNumber: "123",
		$customerNumber: function(n){ data.customerNumber = n},
		$getDisplayText: function(){ return 'Name: '.concat(data.firstName,' ',data.lastName,'<BR>Email: ',data.email,'<BR>Customer number: ',data.customerNumber)}
	};


	var F = function(){};
	F.prototype = p;
	f = new F();

	f.cname = "Customer";
	f.run = function(e){
		var r = data[e];
		if( r == undefined) return F.prototype.run(e);
		else return r;
	};

	return f;
}(person);

var employee = function(p){
	var data = {
		firstName: "FirstName",
		$firstName: function(n){ data.firstName = n},
		lastName: "LastName",
		$lastName: function(n){ data.lastName = n},
		email: "email",
		$email: function(n){ data.email = n},
		socialSecurity: "456",
		$socialSecurity: function(n){ data.socialSecurity = n},
		$getDisplayText: function(){ return 'Name: '.concat(data.firstName,' ',data.lastName,'<BR>Email: ',data.email,'<BR>Social Security number: ',data.socialSecurity)}
	};

	var F = function(){};
	F.prototype = p;
	f = new F();

	f.ename = "Employee";
	f.run = function(e){
		var r = data[e];
		if( r == undefined) return F.prototype.run(e);
		else return r;
	};

	return f;
}(person);

// create span element for display field error
function setErrorField(s) {
	var span_node  = document.createElement("span");
	span_node.setAttribute("id", s+"_error");
	span_node.setAttribute("hidden", "");
	span_node.innerText = "This field is required.";
	return span_node;
}

function add(s) {
 
    //Create an input type dynamically.
    var fname = document.createElement("input");
	var lname = document.createElement("input");
	var email = document.createElement("input");
	var extra = document.createElement("input");
	var submit = document.createElement("input");
	
    //Assign different attributes to the element.
    fname.setAttribute("type", "text");
    fname.setAttribute("value", "First Name");
	fname.setAttribute("id", "fname");
    fname.setAttribute("name", "fname");
 
    lname.setAttribute("type", "text");
    lname.setAttribute("value", "Last Name");
	lname.setAttribute("id", "lname");
    lname.setAttribute("name", "lname");

    email.setAttribute("type", "text");
    email.setAttribute("value", "Email Address");
	email.setAttribute("id", "email");
    email.setAttribute("name", "email");


	if(s == "c"){
		extra.setAttribute("type", "text");
		extra.setAttribute("value", "Customer Number");
		extra.setAttribute("id", "cusNum");
		extra.setAttribute("name", "cusNum");

		submit.setAttribute("type","button");
		submit.setAttribute("value","Submit");
		submit.setAttribute("id","submitCus");
		submit.setAttribute("name","submitCus");
	}

	if(s == "e"){
		extra.setAttribute("type", "text");
		extra.setAttribute("value", "Social Security Number");
		extra.setAttribute("id", "socNum");
		extra.setAttribute("name", "socNum");

		submit.setAttribute("type","button");
		submit.setAttribute("value","Submit");
		submit.setAttribute("id","submitEmp");
		submit.setAttribute("name","submitEmp");
	}
 
    var element1 = document.getElementById("first");
    var element2 = document.getElementById("second");
    var element3 = document.getElementById("third");
    var element4 = document.getElementById("fourth");
	var element5 = document.getElementById("fifth");

	
	
    //Append the element in page (in span).
    element1.appendChild(fname);
	element2.appendChild(lname);
	element3.appendChild(email);
	element4.appendChild(extra);
	element5.appendChild(submit);
	
	// add element after input element
	element1.appendChild(setErrorField("fname"));
	element2.appendChild(setErrorField("lname"));
	element3.appendChild(setErrorField("email"));
	element4.appendChild(setErrorField("extra"));
	 
	// check blank input
	$("input[value='Submit']").click(function(){
		blank_flag = false;
		$("input[type='text']").each(function(index, element){
			var error_node = element.nextSibling;
			if (element.value == "") {
				error_node.removeAttribute("hidden");
				blank_flag = true;
			}
			else 
				error_node.setAttribute("hidden", "");
		});
		console.info(blank_flag);
	});
	
	$("#submitCus").click(function(){
		var fname = $("#fname").val();
		var lname = $("#lname").val();
		var email = $("#email").val();
		var cusNum = $("#cusNum").val();

		var a1 = Object.create(customer);
		a1.run('$firstName')(fname);
		a1.run('$lastName')(lname);
		a1.run('$email')(email);
		a1.run('$customerNumber')(cusNum);
		//document.writeln(a1.run('$getDisplayText')());

		if (!blank_flag) {
			var des = a1.run('$getDisplayText')();
			document.getElementById("outputDiv").innerHTML += des.concat("<BR>","<BR>");
		}
	});

	$("#submitEmp").click(function(){
		var fname = $("#fname").val();
		var lname = $("#lname").val();
		var email = $("#email").val();
		var socNum = $("#socNum").val();

		var a1 = Object.create(employee);
		a1.run('$firstName')(fname);
		a1.run('$lastName')(lname);
		a1.run('$email')(email);
		a1.run('$socialSecurity')(socNum);
		//document.write(a1.run('$getDisplayText')());

		if (!blank_flag) {
			var des = a1.run('$getDisplayText')();
			document.getElementById("outputDiv").innerHTML += des.concat("<BR>","<BR>");
		}
	});
 
}


function remove(s){

    var element1 = document.getElementById("first");
    var element2 = document.getElementById("second");
    var element3 = document.getElementById("third");
    var element4 = document.getElementById("fourth");
	var element5 = document.getElementById("fifth");

	element1.removeChild(document.getElementById("fname"));
	element2.removeChild(document.getElementById("lname"));
	element3.removeChild(document.getElementById("email"));
	if(s == "c"){
		element4.removeChild(document.getElementById("cusNum"));
		element5.removeChild(document.getElementById("submitCus"));
	}
	if(s == "e"){
		element4.removeChild(document.getElementById("socNum"));
		element5.removeChild(document.getElementById("submitEmp"));
	}
	
	// remove error field element while removing input element
	$("span[id$='_error']").each(function(index, element){
		element.remove()
	});
}

var cusOpen = 0;
var empOpen = 0;
// for blank input checked, false: All filled, true: has at least one blank input
var blank_flag=false;

//Was not able to use toggle because there are two buttons
$(document).ready(function(){
	$("#customer").click(function(){
	if(cusOpen == 0 && empOpen == 0){
		add("c");
		cusOpen = 1;
		$("#fname").focus();
	}
	else if(cusOpen == 1 && empOpen == 0){
		remove("c");
		add("c");
	}
	else if(cusOpen == 0 && empOpen == 1){
		remove("e");
		empOpen = 0;
		add("c");
		cusOpen = 1;
		$("#fname").focus();
	}
	});

	$("#employee").click(function(){
		if(empOpen == 0 && cusOpen == 0){
			add("e");
			empOpen = 1;
			$("#fname").focus();
		}
		else if(empOpen == 1 && cusOpen == 0){
			remove("e");
			add("e");
		}
		else if(empOpen == 0 && cusOpen == 1){
			remove("c");
			cusOpen = 0;
			add("e");
			empOpen = 1;
			$("#fname").focus();
		}
	});
});

