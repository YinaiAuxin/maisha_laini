"use strict"

form_variables.registerLink.addEventListener('click', () => {
    form_variables.wrapper.classList.add('active');
    form_variables.bgImgContainer.classList.add('active');
});

form_variables.loginLink.addEventListener('click', () => {
    form_variables.wrapper.classList.remove('active');
    form_variables.bgImgContainer.classList.remove('active');
});

const logoutBtn = loginBtn.querySelector('#logout');
if(logoutBtn != null)
{
    loginBtn.addEventListener('dblclick', () => {
        console.log('double click');
        window.location.assign('/clear_session');
    });
    loginBtn.addEventListener('click', () => {
        let exit = window.confirm('You are about to log out. Click \'OK\' confirm.');
        if(exit)
        {
            window.location.assign('/clear_session');
        }
    });
}

function removePopupForm() {
    form_variables.bgImgContainer.classList.remove('active-popup');
    form_variables.coverDiv.classList.remove('active-popup');
}

form_variables.closeBtn.addEventListener('click', removePopupForm);

form_variables.coverDiv.addEventListener('dblclick', removePopupForm);


//Testing registration system
//username testing
const msg_pholder = '?';
const messages = {
    default: String(),
    required: 'This field is required',
    too_short: 'too short. Atleast 0 characters required',
    too_long: 'too long. Max 0 characters accepted',
    upper:  'must contain atleast 0 uppercase letter(s)',
    lower:  'must contain atleast 0 lowercase letter(s)',
    digit: 'must contain atleast 0 digit(s)',
    email: 'Invalid email address provided',
    not_found: 'User not found',
    no_special: 'No special characters allowed',
    already_exists: 'Username already exists'
}
const valid_form = {
    fullName: true,
    username: false,
    email: false,
    password: false
}
function IsFormValid(){
    const button = document.querySelector('#register_submit');
    if(valid_form.fullName && valid_form.username && valid_form.email && valid_form.password){
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
    } else {
        button.classList.add('disabled')
        button.setAttribute('disabled','');
    }
} 

function CustomMessage(formFieldName, defaultMessage, customNumber = null)
{
    if(customNumber === null) {
        return formFieldName.concat(defaultMessage.padStart(defaultMessage.length + 1));
    } else {
        return formFieldName.concat(defaultMessage.padStart(defaultMessage.length + 1).replace(0, customNumber));
    }
}

const usr = document.querySelector('#username_r');
const usr_field_name = 'Username';
const usr_msg = document.querySelector('#usr_msg');

usr.addEventListener('input', () => {
    const usr_v = usr.value;
    let len = usr_v.length;

    if(len === 0)
    {
        usr_msg.innerText = messages.required;
        valid_form.username = false;
    }
    else if(len < 6)
    {
        usr_msg.innerText = CustomMessage(usr_field_name, messages.too_short, 6);
        valid_form.username = false;
    }
    else if(usr_v.match(/^[a-zA-Z0-9]+$/) == null) 
    {
        usr_msg.innerText = messages.no_special;
        valid_form.username = false;
    }
    else
    {
        const register_form = document.querySelector('form#register');
        const user_data = new FormData(register_form);
        const request = new XMLHttpRequest();
        request.open('POST', '/search')
        request.send(user_data);
        setTimeout(() => {
            if(request.responseText == 'True')
            {
                usr_msg.innerText = messages.already_exists;
                valid_form.username = false;
            }
            else{
                usr_msg.innerText = messages.default;
                valid_form.username = true;
            }
            IsFormValid();
        }, 500)
    }
    IsFormValid();
});

//pwd testing
const pwd_r = document.querySelector('#password_r');
const pwd_field_name = 'Password';
const pwd_r_msg = document.querySelector('#pwd_r_msg')
pwd_r.addEventListener('input', () => {
    let usr_input = pwd_r.value;
    let p_len = usr_input.length;
    if (p_len === 0) {
        pwd_r_msg.innerText = messages.required;
        valid_form.password = false;
    } else if (p_len < 8) {
        pwd_r_msg.innerText =  CustomMessage(pwd_field_name, messages.too_short, 8);
        valid_form.password = false;
    } else if (p_len > 16) {
        pwd_r_msg.innerText = CustomMessage(pwd_field_name, messages.too_long, 16);
        valid_form.password = false;
    } else {
        let containsCap = false;
        let containsLow = false;
        let containsDigit = false;
        for (let j = 0; j < p_len; j++)
        {
            let chr = usr_input[j];
            if (isUpper(chr) && !containsCap) {
                containsCap = true;
            } else if (isLower(chr) && !containsLow){
                containsLow = true;
            } else if (isDigit(chr) && !containsDigit){
                containsDigit = true;
            }
            
            if(!containsCap){
                pwd_r_msg.innerText = CustomMessage(pwd_field_name, messages.upper, 1);
                valid_form.password = false;
            } else if (!containsLow){
                pwd_r_msg.innerText = CustomMessage(pwd_field_name, messages.lower, 1);
                valid_form.password = false;
            } else if(!containsDigit){
                pwd_r_msg.innerText = CustomMessage(pwd_field_name, messages.digit, 1);
                valid_form.password = false;
            } else {
                pwd_r_msg.innerText = messages.default;
                valid_form.password = true;
                break;
            }
        }
    }
    IsFormValid()
});

//email testing

const email = document.querySelector('#email');
const email_field_name = 'Email';
const email_msg = document.querySelector('#email_msg');

email.addEventListener('input', () => {
    const emailInput = email.value;
    const len = emailInput.length;
    const at_symbol = emailInput.indexOf('@');
    const dot_symbol = emailInput.lastIndexOf('.');
    if (len === 0 )
    {
        email_msg.innerText = messages.required;
        valid_form.email = false;   
    }
    else if (at_symbol < 1 || 
        dot_symbol < at_symbol || 
        at_symbol < emailInput.lastIndexOf('@') || 
        !isLower(emailInput[len - 1].toLowerCase()) ||
        !isLower(emailInput[at_symbol + 1].toLowerCase()))
    {
        email_msg.innerText = messages.email;
        valid_form.email = false;
    }
    else{
        email_msg.innerText = messages.default;
        valid_form.email = true;
    }
    IsFormValid();
});

function isLower(chr){
    if (chr.match(/[a-z]/) != null) {
        return true;
    }
    return false;
}

function isUpper(chr){
    if (chr.match(/[A-Z]/) != null) {
        return true;
    }
    return false;
}

function isDigit(chr) {
    if(chr.match(/[0-9]/) != null) {
        return true;
    }
    return false;
}


///This will work with login only
let valid_username, valid_password;


const login_form = document.querySelector('form#login');
const user_l = document.querySelector('#username_l');
const login_submit = document.querySelector('#login_submit');

user_l.addEventListener('input', () => {
    const username = user_l.value;
    const usr_msg = document.querySelector('#user_l_msg');
    if(username.length == 0)
    {
        usr_msg.innerText = messages.required;
    }
});


login_submit.addEventListener('click', async function(e) {
    const usr_msg = document.querySelector('#user_l_msg');
    const user_data = new FormData(login_form);
    const request = new XMLHttpRequest();
    request.open('POST', '/login')
    const openRequest = request.send(user_data);
    setTimeout(() => {
        if(request.readyState > 1)
        {
            usr_msg.innerText = request.responseText;
        }
    }, 500);
});