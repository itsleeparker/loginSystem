//code for btn submission
$('#hform').submit((fr)=>{
	const uname = $('#uname');
	const pwd = $('#pwd');
	if(validateForm($(uname).val() , $(pwd).val())){
		fr.preventDefault()
		$('#err').text('value cannot be empty');
	}
	
})

$('#rform').submit((e)=>{
	let elements = [];
	$('#rform input').each((i , e)=>{
		elements.push($(e).val());
	});
	if(validateRegister(elements)){
		$('#err').text('Fields cannot be empty');
		e.preventDefault();
	}
})

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

