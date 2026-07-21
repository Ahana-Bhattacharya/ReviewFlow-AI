// loader.js


function showLoader(){


const result =
document.getElementById("result");


result.innerHTML = `


<div class="loader-container">


<div class="loader"></div>


<p>

AI is reviewing your code...

</p>


</div>


`;


}





function hideLoader(){


const loader =
document.querySelector(
".loader-container"
);


if(loader){

    loader.remove();

}


}