"use strict"
//empty header div to force static content starting position to below fixed header
const header_len = document.querySelector('header').offsetHeight + 2;
document.querySelector('#header_cover').style.height = header_len + 'px';


/*
//Hide and unhide slip from product cart
let slip = document.querySelector('#slip');
let close_btn = document.querySelector(".close");
let show_cart = document.querySelector("#cart");

close_btn.addEventListener('click', () => {
    slip.classList.add('slip_hidden');
});
show_cart.addEventListener('click', () => {
    slip.classList.remove('slip_hidden');
});

let search_info = document.querySelector('#uname');
search_info.addEventListener('keyup', async function() {
    let response = await fetch('/search?username=' + uname.value);
    let jobs = await response.text();
    jobs = jobs.slice(jobs.indexOf('<p>'), jobs.indexOf('</p>')).replace('<p>','');
    
    document.querySelector('ul').innerHTML = jobs;
});

async function getJobs(search){
    let path = 'http://127.0.0.1:5000/join_our_team'
    await fetch(path, {'mode': 'cors'})
        .then((response) => 
            response.text()
                .then((html) => {
                    let jobs = html.trim().slice(html.indexOf('<tbody>')+7, html.indexOf('</tbody>'));
                    let jobs_arr = jobs.replaceAll('<tr>','').split('</tr>');
                    let doc = document.querySelector('ul');
                    for(let z = 0; z < jobs_arr.length - 1; z++)
                    {
                        doc.innerHTML += '<hr>';
                        let tmp = jobs_arr[z];
                        let tmp_arr = tmp.replaceAll('<td>','').trim().split('</td>');
                        
                        let job_title = tmp_arr[0];
                        
                        let found = job_title.toLowerCase().indexOf(search.toLowerCase())

                        if(search && found >= 0)
                        {
                            doc.innerHTML += '<li>'+job_title+'</li>';
                        }
                    }
                })
        );
};
*/