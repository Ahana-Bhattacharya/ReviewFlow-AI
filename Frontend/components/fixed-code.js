// =========================================
// fixed-code.js
// ReviewFlow AI
// AI Corrected Code Viewer
// =========================================


function renderFixedCode(fixedCode) {


    const container = document.getElementById("fixedCode");


    if (!container) return;



    if (!fixedCode) {

        container.innerHTML = `

            <div class="empty-state">

                <p>
                    No fixed code generated yet.
                </p>

            </div>

        `;

        return;

    }




    container.innerHTML = `


        <div class="fixed-code-card">


            <div class="fixed-code-header">


                <h3>

                    <img
                    src="assets/icons/fix-code.svg"
                    class="small-icon"
                    alt="Fix Code"
                    >

                    AI Improved Code

                </h3>



                <button
                id="copyFixedCode"
                class="secondary-btn"
                >

                    Copy Code

                </button>


            </div>





            <pre class="code-output">

<code id="fixedCodeBlock">${escapeHTML(fixedCode)}</code>

            </pre>


        </div>


    `;




    const copyButton =
    document.getElementById("copyFixedCode");



    copyButton.addEventListener(
        "click",
        () => {


            navigator.clipboard.writeText(fixedCode);



            copyButton.innerText =
            "Copied ✓";



            setTimeout(() => {

                copyButton.innerText =
                "Copy Code";

            },2000);


        }
    );


}





// Prevent HTML injection

function escapeHTML(code) {


    return code

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");


}