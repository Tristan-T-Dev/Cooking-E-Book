let footerAdd = document.querySelector('.footer');
let book = document.querySelector('.book');
let backBtn = document.querySelector('.back');
let body = document.querySelector('body');
let RecipeBox = document.querySelector('.recipe_box');
let ProcedureBox = document.querySelector('.procedure_box');
let RecipeBtn = document.getElementById('RecipeBtn');
let ProcedureBtn = document.getElementById('ProcedureBtn');
let backBoxes = document.querySelectorAll('.back_box'); 
let Addlist = document.querySelector('.addlist');
let error = document.querySelector('.error');
let dishTitle = document.getElementById('dish_title');
let recipeDescription = document.getElementById('recipe_mess');
let procedureDescription = document.getElementById('procedure_mess');
let orderlist = document.querySelectorAll('.order');
let none_box = document.querySelector('.none_box');
let add = document.querySelector('.add');


footerAdd.addEventListener('click', () => {
    body.classList.toggle('showlist')
    footerAdd.style.visibility = 'hidden';
});
backBtn.addEventListener('click', () => {
    body.classList.remove('showlist')
    footerAdd.style.visibility = 'visible';
});

ProcedureBtn.addEventListener('click', () => {
    ProcedureBox.classList.add('active');
    RecipeBox.classList.remove('active');
});

RecipeBtn.addEventListener('click', () => {
    RecipeBox.classList.add('active');
    ProcedureBox.classList.remove('active');
});
backBoxes.forEach(backBox => {
    backBox.addEventListener('click', () => {
        ProcedureBox.classList.remove('active');
        RecipeBox.classList.remove('active');
    });
});

function AddItemList() {

    let title = dishTitle.value.trim();
    let recipeText = recipeDescription.value.trim();
    let procedureText = procedureDescription.value.trim();

    if(title === "") {
        console.log('Please Add Tasks');
        Addlist.classList.add('error');
        setTimeout(() => {
            Addlist.classList.remove('error');
        }, 1000);
        
    }else{
        const newItem = document.createElement('li');
            newItem.classList.add('list');
            none_box.style.display = 'none';


            // Fill the new item with the user inputs
            newItem.innerHTML = `
                <h2 class="title">${dishTitle.value}</h2>
                <p><a href="#" class="recipe-link" data-title="${title}" data-recipe="${recipeText}">Recipes</a> <span> | </span> <a href="#" class="procedure-link" data-title="${title}" data-procedure="${procedureText}">Procedure</a></p>
                <button class="delete_btn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>`;

            // Append the new item to the order list
            const orderList = document.querySelector('.order');
            orderList.appendChild(newItem);

            // Create new Recipe box for the dish
            const newRecipeBox = document.createElement('div');
            newRecipeBox.classList.add('recipe_box');
            newRecipeBox.innerHTML = `
                <button type="button" class="back_box"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg></button>
                <h4>Ingredients</h4>
                <div class="recipe">
                    <h2>${title}</h2>
                    <p>${recipeText}</p>
                </div>
            `;

            // Create new procedure box for the dish
            const newProcedureBox = document.createElement('div');
            newProcedureBox.classList.add('procedure_box');
            newProcedureBox.innerHTML = `
                <button type="button" class="back_box"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg></button>
                <h4 class="title_box">Procedure</h4>
                <div class="procedure">
                    <h2>${title}</h2>
                    <p>${procedureText}</p>
                </div>
            `;

            // Append recipe and procedure boxes to the document
            body.appendChild(newRecipeBox);
            body.appendChild(newProcedureBox);

            // Add event listeners for recipe and procedure links
            newItem.querySelector('.recipe-link').addEventListener('click', (e) => {
                e.preventDefault();
                newRecipeBox.classList.add('active');
                newProcedureBox.classList.remove('active');
            });

            newItem.querySelector('.procedure-link').addEventListener('click', (e) => {
                e.preventDefault();
                newProcedureBox.classList.add('active');
                newRecipeBox.classList.remove('active');
            });

            // Add event listeners for back buttons in recipe and procedure boxes
            newRecipeBox.querySelector('.back_box').addEventListener('click', () => {
                newRecipeBox.classList.remove('active');
            });

            newProcedureBox.querySelector('.back_box').addEventListener('click', () => {
                newProcedureBox.classList.remove('active');
            });

            // Add event listeners for delete buttons
            newItem.querySelector('.delete_btn').addEventListener('click', () => {
                // Remove the list item from the order list
                newItem.remove();
    
                newRecipeBox.remove();
                newProcedureBox.remove();
    
                // If there are no more items, show the 'none_box'
                if (orderList.children.length === 0) {
                    none_box.style.display = 'block';
                }
            });


            // Clear the form
            dishTitle.value = '';
            recipeDescription.value = '';
            procedureDescription.value = '';
    }
}

