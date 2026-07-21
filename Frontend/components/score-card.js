// score-card.js


function createScoreCard(
score,
label
){


return `


<div class="score-card">


<h2>

${score}%

</h2>


<p>

${label}

</p>


<div class="progress">


<div 
class="progress-bar"
style="width:${score}%">

</div>


</div>


</div>


`;

}