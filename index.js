state = {
    globalRecipeData: []
}
taskContents = document.getElementById("taskContentrow")

const addCard = () => {
    const newRecipeDetails = {
        id: `${Date.now()}`,
        title: document.getElementById("recipeTitle").value,
        category: document.getElementById("recipeCategory").value,
        Ingredients: document.getElementById("recipeIngredients").value,
        steps: document.getElementById("recipeSteps").value
    };

    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newRecipeDetails));

    state.globalRecipeData.push(newRecipeDetails);
    saveToLocalStorage();
}

const generateTaskCard = ({id, title, category, Ingredients, steps}) => {
    return(`<div class="card text-center col-md-12 col-lg-6" style="margin: 15px;" id=${id} key=${id}>
    <div class="card-header position-relative">
        <div class="container-fluid me-auto">
            <h4 class="card-title position-absolute start-30">${title}</h4>
            <div class="position-end d-flex justify-content-end ml-auto">
                <button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
        
    </div>
    <div class="card-body bg-dark" style="color: white;">
      <h5 class="card-Category">${category}</h5>
      <p class="card-Ingrediants">${Ingredients}</p>
      <span class="card-Text">${steps}</span>
      
    </div>
    <div class="card-footer">
        <a href="#" class="btn btn-primary">OPEN RECIPE</a>
    </div>
</div>`)
}

const saveToLocalStorage = () => {
    localStorage.setItem("tasky", JSON.stringify({tasks: state.globalRecipeData}))
}

const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky"));
    console.log(localStorageCopy);
    if(localStorageCopy) {
        state.globalRecipeData = localStorageCopy.tasks
    }
    console.log(state.globalRecipeData)
    state.globalRecipeData.map((cardData) => {
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
    })
}

const deleteTask = (e) => {
    const targetID = e.getAttribute("name");
    state.globalRecipeData = state.globalRecipeData.filter((cardData) => cardData.id!==targetID);
    saveToLocalStorage();
    window.location.reload();
    if (type === "BUTTON")
        return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode
    );
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode
    );
}

const editTask = (e) => {
    if (!e) e = window.event;
    const targetID = e.getAttribute("name");
    let recipeCategory;
    let recipeIngredients;
    let recipeSteps;
    let submitButton;
    recipeCategory = e.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1];
    recipeIngredients = e.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[3];
    submitButton = e.parentNode.parentNode.parentNode.parentNode.childNodes[5].childNodes[1];
    recipeSteps = e.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[5];
  
    recipeCategory.setAttribute("contenteditable", "true");
    recipeIngredients.setAttribute("contenteditable", "true");
    recipeSteps.setAttribute("contenteditable", "true");
    submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
    submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");
    submitButton.innerHTML = "Save Changes";
  };
  const saveEdit = (e) => {
    if (!e) e = window.event;
    const targetID = e.target.id;
    const parentNode = e.target.parentNode.parentNode;
    console.log(parentNode.childNodes);
    const taskCategory = parentNode.childNodes[3].childNodes[1];
    const taskIngredients = parentNode.childNodes[3].childNodes[3];
    const submitButton = parentNode.childNodes[5].childNodes[1];
    const taskSteps = parentNode.childNodes[3].childNodes[5];
    const updateData = {
      recipeCategory: taskCategory.innerHTML,
      recipeIngredients: taskIngredients.innerHTML,
      recipeSteps: taskSteps.innerHTML,
    };
  
    let stateCopy = state.globalRecipeData;
    stateCopy = stateCopy.map((task) =>
      task.id === targetID
        ? {
            id: task.id,
            category: updateData.recipeCategory,
            Ingredients: updateData.recipeIngredients,
            steps: updateData.recipeSteps,
          }
        : task
    );
  
    state.globalRecipeData = stateCopy;
    saveToLocalStorage();
    recipeCategory.setAttribute("contenteditable", "false");
    recipeIngredients.setAttribute("contenteditable", "false");
    recipeSteps.setAttribute("contenteditable", "false");
    submitButton.innerHTML = "Open Task";
  };

  const searchTask = (e) => {
    if (!e) e = window.event;
    while (taskContents.firstChildS) {
      taskContents.removeChild(taskContents.firstChild);
    }
  
    const resultData = state.globalRecipeData.filter(({ category }) =>
      category.includes(e.target.value)
    );
  
    resultData.map((cardData) => {
      taskContents.insertAdjacentHTML("beforeend", newRecipeDetails(cardData));
    });
}