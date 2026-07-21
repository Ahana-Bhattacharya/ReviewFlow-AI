// code-editor.js


function createCodeEditor(){


return `


<div class="code-panel">


<label>
Programming Language
</label>


<select id="language">


<option>
Python
</option>

<option>
JavaScript
</option>

<option>
Java
</option>

<option>
C++
</option>

<option>
Go
</option>


</select>



<label>
Paste Source Code
</label>


<textarea

id="codeInput"

placeholder="Paste your code here..."

></textarea>





<div class="button-group">


<button 
class="primary-btn"
id="reviewBtn">

Run AI Review

</button>



<button
class="secondary-btn"
id="clearBtn">

Clear

</button>


</div>


</div>


`;


}