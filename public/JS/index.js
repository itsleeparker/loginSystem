//code for btn submission
$('#hform').submit((fr)=>{
	const uname = $('#uname');
	const pwd = $('#pwd');
	if(validateForm($(uname).val() , $(pwd).val())){
		fr.preventDefault()
		$('#err').text('value cannot be empty');
	}
	
})
const formSelection = (form)=>{
	$(form).submit((e)=>{
		let formID = $(form).attr("id"); 
		let elements = [];
		$("#"+formID+" input").each((i , e)=>{
			elements.push($(e).val());
		});
		console.log(elements);
	if(validateRegister(elements)){
		$('#err').text('Fields cannot be empty');
		e.preventDefault();
	}
	})
}

formSelection($('#rform'));

//validate form 2   takes an array of elements check if all of them are valid
const validateRegister = (elements)=>{	
	$(elements).each((i  , e)=>{
		if($(e) == ''){
			return false;
		}
	})
	return true;
}


// validationun
const validateForm =  (uname , pwd)=>{
	if($(uname).length <= 1 || $(pwd).length  <= 1){
		return false;
	}else{
		return true;
	}
}

