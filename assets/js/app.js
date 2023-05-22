console.log("hello world!");

const cl = console.log;

const formContainer = document.getElementById("formContainer");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
const listContainer = document.getElementById("listContainer");
const formListControl = document.getElementById("list");
const cancelBtn = document.getElementById("cancelBtn");

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === 'x' ? random : (random & 0x3) | 0x8
        return value.toString(16);
    })
};


let listArr = [];


listArr = JSON.parse(localStorage.getItem("listData")) || [];

function listTemp(arr){
    let result = " ";
    
    arr.forEach(std =>{
        result +=`
        <div class="card list-card mb-2">
            <div class="card-body" id="${std.id}">
                <div class="row">
                    <div class="col-sm-10">
                        <div class="alert alert-danger">
                            <p class="font-weight-bold">${std.list}</p>
                            <button type="button" class="close btn btn-danger" onclick="onDeleteBtn(this)"><span aria-hidden="true">&times;</span></button>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <button type="button" class="btn btn-primary mt-1" onclick="onEditBtn(this)"><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </div>
            </div>
        </div>
                `
    })
    listContainer.innerHTML= result;
}
listTemp(listArr)

const onSubmitHandler = (eve) => {
    eve.preventDefault();
    cl("submitted");
    let obj ={
        list: formListControl.value,
        id : generateUuid()     
}
    listArr.unshift(obj);
    eve.target.reset();
    localStorage.setItem("listData", JSON.stringify(listArr));
    listTemp(listArr)
}

const onEditBtn = (ele) =>{
    let editId = ele.closest('.card-body').id;
    localStorage.setItem('editId', editId);
    let getItemId = listArr.find(ele => ele.id === editId);
    formListControl.value = getItemId.list;

    updateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
}

const onDeleteBtn = (ele) => {
    let deleteItem =ele.closest('.card-body').id;
    let findItem = listArr.findIndex(item => item.id === deleteItem);
    listArr.splice(findItem, 1);
    localStorage.setItem('listData',JSON.stringify(listArr));
    listTemp(listArr)
}


const onUpdateHandler = () => {
    let updatedId = localStorage.getItem("editId");
    // cl(updateData)
    listArr.forEach(obj =>{
        if(obj.id === updatedId){
            obj.list = formListControl.value;
        }
    })
    localStorage.setItem("listData", JSON.stringify(listArr));
    listTemp(listArr);
    formContainer.reset(); 
}
const onCancelHandler = () => {
    updateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
    formContainer.reset();
}

formContainer.addEventListener('submit', onSubmitHandler);
updateBtn.addEventListener('click',onUpdateHandler);
cancelBtn.addEventListener('click',onCancelHandler);