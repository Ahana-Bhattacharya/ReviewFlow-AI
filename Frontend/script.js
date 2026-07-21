// =====================================
// ReviewFlow AI - Frontend Logic
// =====================================


// Backend URL
// Change after AWS deployment

const API_URL = "http://127.0.0.1:8000";



// =====================================
// Elements
// =====================================


const codeInput =
document.getElementById("codeInput");


const language =
document.getElementById("language");


const reviewBtn =
document.getElementById("reviewBtn");


const clearBtn =
document.getElementById("clearBtn");


const resultBox =
document.getElementById("result");


const copyBtn =
document.getElementById("copyBtn");


const fixedCodeBox =
document.getElementById("fixedCode");


const diffViewerBox =
document.getElementById("diffViewer");


const tabs =
document.querySelectorAll(
".review-tabs button"
);




// =====================================
// Variables
// =====================================


let currentReview = "";

let selectedReview = "automate";





// =====================================
// Smooth Scroll
// =====================================


function scrollToReview(){


    document
    .getElementById("review")
    .scrollIntoView({

        behavior:"smooth"

    });


}






// =====================================
// Review Tabs
// =====================================


tabs.forEach(tab=>{


    tab.addEventListener(
    "click",
    ()=>{


        tabs.forEach(t=>{


            t.classList.remove(
            "active"
            );


        });



        tab.classList.add(
        "active"
        );



        selectedReview =
        tab.dataset.tab ||
        tab.innerText
        .toLowerCase();
    console.log("Selected Review:", selectedReview);


    });


});








// =====================================
// Run AI Review
// =====================================


reviewBtn.addEventListener(

"click",

async()=>{


const code =
codeInput.value.trim();



if(!code){


    showMessage(
    "Please paste your code first."
    );


    return;


}





startLoading();



currentReview = "";



fixedCodeBox.innerHTML="";

diffViewerBox.innerHTML="";





try{


const response =

await fetch(

`${API_URL}/api/review/${selectedReview}`,

{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:JSON.stringify({


code:code,


language:
language.value


})


}

);







if(!response.ok){


throw new Error(
"Backend error"
);


}






const reader =

response.body.getReader();



const decoder =

new TextDecoder();





resultBox.innerHTML="";





while(true){


const {

done,

value

}=

await reader.read();




if(done)
break;




const chunk =

decoder.decode(
value
);




currentReview += chunk;




resultBox.innerHTML =

formatResponse(
currentReview
);





// Fixed Code Detection

if(
currentReview.includes(
"FIXED_CODE:"
)
){


renderFixedCode(

extractFixedCode(
currentReview
)

);


}






// Diff Detection

if(
currentReview.includes(
"DIFF:"
)

){


renderDiff(

extractDiff(
currentReview
)

);


}





resultBox.scrollTop =

resultBox.scrollHeight;



}



}

catch(error){



console.error(error);



resultBox.innerHTML =

`

<p style="color:#ef4444">

❌ Unable to connect with AI server.

Check backend connection.

</p>

`;



}

finally{


stopLoading();


}



}

);









// =====================================
// Loader
// =====================================


function startLoading(){


reviewBtn.disabled=true;



reviewBtn.innerHTML=

`

⏳ Reviewing...

`;



}





function stopLoading(){


reviewBtn.disabled=false;



reviewBtn.innerHTML=

`

✨ Run AI Review

`;



}









// =====================================
// Clear Button
// =====================================


clearBtn.addEventListener(

"click",

()=>{


codeInput.value="";



resultBox.innerHTML=

`

<p>
Your AI generated review will appear here...
</p>

`;



fixedCodeBox.innerHTML="";


diffViewerBox.innerHTML="";



currentReview="";



}

);









// =====================================
// Copy Report
// =====================================


copyBtn.addEventListener(

"click",

()=>{


if(!currentReview){


alert(
"No review available"
);


return;


}




navigator.clipboard.writeText(

currentReview

);



copyBtn.innerHTML=

`

✓ Copied

`;





setTimeout(()=>{


copyBtn.innerHTML=

`

Copy Report

`;



},2000);



}

);









// =====================================
// Format AI Response
// =====================================


function formatResponse(text){


return text



.replace(

/Summary/g,

"<h3>Summary</h3>"

)



.replace(

/Bugs/g,

"<h3>🐞 Bugs</h3>"

)



.replace(

/Security/g,

"<h3>🔒 Security Analysis</h3>"

)



.replace(

/Performance/g,

"<h3>⚡ Performance</h3>"

)



.replace(

/Complexity/g,

"<h3>📊 Complexity</h3>"

)



.replace(

/Refactored Code/g,

"<h3>✨ Refactored Code</h3>"

)



.replace(

/FIXED_CODE:/g,

""

)



.replace(

/DIFF:/g,

""

)



.replace(

/\n/g,

"<br>"

);



}









// =====================================
// Fixed Code Extractor
// =====================================


function extractFixedCode(text){


let start =

text.indexOf(
"FIXED_CODE:"
);



if(start===-1)
return "";



let end =

text.indexOf(
"DIFF:"
);



if(end===-1)

end=text.length;



return text.substring(

start + 11,

end

);



}









// =====================================
// Diff Extractor
// =====================================


function extractDiff(text){



let start =

text.indexOf(
"DIFF:"
);



if(start===-1)

return "";



return text.substring(

start+5

);



}









// =====================================
// Render Fixed Code
// =====================================


function renderFixedCode(code){


fixedCodeBox.innerHTML=

`

<div class="fixed-code-card">


<div class="fixed-code-header">


<h3>
✨ AI Corrected Code
</h3>


</div>



<pre class="code-output">

<code>

${code}

</code>

</pre>


</div>

`;



}









// =====================================
// Render Diff Viewer
// =====================================


function renderDiff(diff){



diffViewerBox.innerHTML=

`

<div class="diff-container">


<div class="diff-box">


<h3>
Original Code
</h3>


<pre>

${diff}

</pre>


</div>





<div class="diff-box fixed">


<h3>
AI Improved Code
</h3>


<pre>

${diff}

</pre>


</div>



</div>

`;



}









// =====================================
// Message Helper
// =====================================


function showMessage(message){



resultBox.innerHTML=

`

<p style="color:#facc15">

${message}

</p>

`;



}









// =====================================
// Default Active Tab
// =====================================


window.onload=()=>{


if(tabs.length){


tabs[0].classList.add(
"active"
);


}


};