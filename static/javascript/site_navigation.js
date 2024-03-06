"use strict"

//Create pathname for webpages to be used when navigating site
function create_pathname(page_name)
{
    let path_name = page_name.toLowerCase().replaceAll(' ', '_');
    return path_name;
}

//################### NAVIGATION-EVENT-LISTENERS #####################//

//redirect to homepage when clicking on logo
document.querySelector('#logo').addEventListener('click', () => {
    window.location.assign('/');
});

//Get list items with anchor tags only from the navigation bar
let len = main_menu_items.length;
let i = 0;
let list = []
while(i < len)
{
    if(main_menu_items[i].querySelector('a') == null)
    {
        i++;
        continue;
    }
    let list_item = main_menu_items[i];
    list[i] = list_item;
    i++;
}
//set event listeners for all the anchor tags in the navigation bar
list.forEach(element => {
    let path_name = create_pathname(element.querySelector('a').innerText);
    if(path_name != location.pathname.slice(1))
    {
        element.addEventListener('mouseover', () => {
            element.classList.add('hover_nav');
        });
        element.addEventListener('mouseout', () => {
            element.classList.remove('hover_nav');
        });
        element.addEventListener('click', () => {
            window.location.pathname = '/' + path_name;
        });
        element.classList.add('menu-item-inactive');
    }
    else
    {
        element.classList.add('menu-item-active');
    }
});

//To be updated
const login = document.querySelector('#sign_in');

if(login != null)
{
    loginBtn.addEventListener('click', () => {
        form_variables.bgImgContainer.classList.add('active-popup');
        form_variables.coverDiv.classList.add('active-popup');
    });    
}