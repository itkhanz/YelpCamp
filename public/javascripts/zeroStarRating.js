/*************
Review Schema has a default value from 1 - 5, 
and if no star is selected then it throws error as zero star rating is not allowed.
To fix this issue, use some DOM Manipulation so, that form does not gets submitted if no star is selected.
Make sure your review form has a class of reviewForm!
we are selecting only the first input with by using the below code which doesn't get displayed on the page, 
it is use as the default value.
So, basically we aren't selecting any of those input which are seen on show.ejs, 
we are selecting the default one, and the default one is checked already because of the checked attribute. 
It is basically like, if the default input is still checked (which means no star is selected), 
then don't submit the form.
***************/

const reviewForm = document.querySelector(".reviewForm");
    const defaultStarInput = document.querySelector("input[name='review[rating]']");
    const statusContainer = document.querySelector("#status");
    if(reviewForm) {
        reviewForm.addEventListener("submit", function(e) {
            if(defaultStarInput.checked) {
                statusContainer.classList.remove("d-none");
                e.preventDefault();
            } else {
                statusContainer.classList.add("d-none");
            }
        })
}