// review-card.js


function createReviewCard(
title,
icon,
content
){


return `


<div class="review-card">


<img

src="${icon}"

class="feature-icon"

>


<h3>

${title}

</h3>



<p>

${content}

</p>


</div>


`;

}