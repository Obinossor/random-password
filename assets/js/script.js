
// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

/**
* This is a helper function that will close the lightbox
* The lightbox shows the password generation criteria form
*/
function closeLightbox() 
{
document.getElementsByClassName('lightbox')[0].style.display = "none"; // why there is an array? get elements by class name will return the value in array even for a single element.

}

/**
* This helper function will clear out the password generation criteria form values
* so users can start fresh
*/
function clearFormSelection()
{
// first get the form based on the id
var form = document.querySelector("#password_criteria_form");

// now clear out the password length textbox value
form.querySelector("#password_length").value = "";

// next go through all the password character type checkboxes and clear their previous selections(if any)
var passwordCharTypes = form.querySelectorAll(".password_char_type");
for(var i = 0; i < passwordCharTypes.length; i++)
passwordCharTypes[i].checked = false;

return false;
}

/**
* This function will be called upon password form validation
* It will check all the criterias before the final password generation
*/
function validatePasswordCriteriaForm() 
{
var errorMessage = "";

var form = document.querySelector("#password_criteria_form");
// first check if the password length is numeric and between 8 and 128 
var passwordLength = form.querySelector("#password_length").value;
if(isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128)
errorMessage += "Must be a number and between 8 and 128\n";

// next check if the atleast one of the character type checkbox(es) are checked
var passwordCharacterTypeArray = [];
var charTypeSelected = false;
// using the selector, we are targeting all the password character type checkboxes and looping in them
var passwordCharTypes = form.querySelectorAll(".password_char_type");
for(var i = 0; i < passwordCharTypes.length; i++)
{
// for every checkbox that we find, check if the checkbox is selected and if it is, then collect the checkbox value and add it to an array for later use
// checkbox is selected, so do your thing...
if(passwordCharTypes[i].checked)
{
charTypeSelected = true; // this flag will determine if atleast one checkbox is selected
passwordCharacterTypeArray.push(passwordCharTypes[i].value); // collecting the selected checkbox value in the array
}
}

// if this flag is false that means in our previous loop we did not find a single selected checkbox 
// so we let ther users know by prompting the error message
if(!charTypeSelected)
errorMessage += "Atleast one Character type must be selected";
// up until now we have been collecting error messages (if any) and concatanating them in the errorMessage string
// and as the error message string has value in it, we do have error while validating the form, so prompt the error messages to the user
if(errorMessage != '')
alert(errorMessage);
else
{
// okay, awesome there are no validation errors. we can now generate the password based the user selection
// console.log(`There are no errors...`);
// console.log(passwordCharacterTypeArray);
// console.log(passwordLength);

// call the core function and pass the collected values (password generation criterias) as function parameter
var password = generatePassword({ "password_length": parseInt(passwordLength), "password_char_types": passwordCharacterTypeArray });// here we have assigned key and values to generatePassword function
passwordText.value = password; // now assign the password in the password placeholder textarea 

/// now clear out the form so that users can start with an empty form next time ///
clearFormSelection();

/// also close the lightbox
closeLightbox();
}

return false;
}

// this is a helper function that will generate a random number from a number range
function _generateRandomNumberFromRange(min, max) 
{ 
return Math.floor(Math.random() * (max - min + 1) + min)
}

// this is the password generation function
function generatePassword(criteria)
{
var specialCharacterArray = ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "\\", "^", "_", "`", "{", "|", "}", "~", " "];
var password = "";
for(let i = 0; i < criteria.password_length; i++)
{
var index = _generateRandomNumberFromRange(0, (criteria.password_char_types.length - 1)); // if I give length 10 then it will start counting from 0 to 9.

var passwordCharacterType = criteria.password_char_types[index];

if(passwordCharacterType == "lowercase")
password += String.fromCharCode(97+Math.floor(Math.random() * 26)); 
else if(passwordCharacterType == "uppercase")
password += String.fromCharCode(65+Math.floor(Math.random() * 26));
else if(passwordCharacterType == "numeric")
password += _generateRandomNumberFromRange(0, 9);
else if(passwordCharacterType == "special_character")
{
var spIndex = _generateRandomNumberFromRange(0, (specialCharacterArray.length - 1));
password += specialCharacterArray[spIndex]; 
}
}

return password;
}

// Write password to the #password input
function writePassword() {
document.getElementsByClassName('lightbox')[0].style.display = "block";
passwordText.value = ""; // clear out the password first because user has clicked the password generate button

// var password = generatePassword();
// passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword)