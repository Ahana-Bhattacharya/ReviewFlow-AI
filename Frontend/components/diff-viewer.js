// =========================================
// diff-viewer.js
// ReviewFlow AI
// Original vs Fixed Code Comparison
// =========================================


function renderDiffViewer(
    originalCode,
    fixedCode
) {


    const container =
    document.getElementById("diffViewer");



    if (!container) return;




    container.innerHTML = `


    <div class="diff-container">



        <div class="diff-box">


            <h3>
                Original Code
            </h3>


            <pre>

<code>${escapeHTML(originalCode)}</code>

            </pre>


        </div>





        <div class="diff-box fixed">


            <h3>
                AI Fixed Code
            </h3>


            <pre>

<code>${escapeHTML(fixedCode)}</code>

            </pre>


        </div>



    </div>


    `;


}





function escapeHTML(code) {


    return code

    .replace(/&/g,"&amp;")

    .replace(/</g,"&lt;")

    .replace(/>/g,"&gt;")

    .replace(/"/g,"&quot;")

    .replace(/'/g,"&#039;");


}