"use strict"
//main navigation buttons
const main_menu_items = document.getElementsByClassName('main-menu-list-item');
const loginBtn = document.querySelector('#login');

//login form variables
let form_variables = {
    formPlaceholder: document.querySelector('.placeholder'),
    wrapper: document.querySelector('.wrapper'),
    loginLink: document.querySelector('.login_link'),
    registerLink: document.querySelector('.register_link'),
    closeBtn: document.querySelector('.icon_close'),
    bgImgContainer: document.querySelector('.bg_lgn_container'),
    coverDiv: document.querySelector('.cover_div')
}