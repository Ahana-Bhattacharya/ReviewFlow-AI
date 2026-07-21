// =====================================
// ReviewFlow AI
// Tab Controller
// =====================================


function initializeTabs(){


    const tabs =
    document.querySelectorAll(
        ".review-tabs button"
    );


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



            window.selectedReview =
            tab.dataset.tab;



            console.log(
                "Selected Review:",
                window.selectedReview
            );



        });


    });


}


initializeTabs();