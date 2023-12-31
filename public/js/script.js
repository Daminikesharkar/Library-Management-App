import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.1/+esm'

const form = document.getElementById('registration');
const book_name = document.getElementById('bookname');

function postData(userData){
    axios.post('/',userData)
        .then((response)=>{
            addUser(response.data.book)
        }).catch((error)=>{
            console.log(error);
        })
}

function deleteData(id){
     axios.get('/returnEntry'+`/${id}`)
        .then((response)=>{ 
            console.log(response.data.book )         
    })
}

form.addEventListener("submit",(event)=>{
    event.preventDefault()

    const userData ={
        bookname: book_name.value,
    }
    console.log(userData);

    postData(userData);
    form.reset();
})

function addUser(userData){
    const ulList = document.getElementById('newentries');
    console.log("in",userData)

    const li = document.createElement('li');
    li.className="userList";
    li.setAttribute('data-user-data', JSON.stringify(userData));

    var btn = document.createElement("button");
    btn.className = "btn return";

    var text = document.createTextNode("Bookname: "+userData.book_name+" Issued On: "+userData.issued_on+" Return date: "+userData.return_at+" current fine "+userData.current_fine);
    li.appendChild(text);

    btn.appendChild(document.createTextNode("Return"));

    li.appendChild(btn);

    ulList.appendChild(li);
}

function addInput(bookData, li) {

    const originalContent = li.innerHTML;
    li.innerHTML = '';

    var text = document.createTextNode("Pay fine: " + bookData.current_fine);
    li.appendChild(text);

    var btn = document.createElement("button");
    btn.className = "btn payfine";
    btn.id = "pay";
    btn.appendChild(document.createTextNode("Pay Fine"));

    li.appendChild(btn);

    const pay = document.getElementById('pay');
    pay.addEventListener('click', (e) => {
        e.preventDefault();
        const confirmPayment = window.confirm("Pay Fine: " + bookData.current_fine);
        if (confirmPayment) {
            handleFinePayment(bookData);
            li.remove();
        } else {
            li.innerHTML = originalContent;
        }
    });
}

function handleFinePayment(bookData) {
    console.log("Fine paid:", bookData.current_fine);
    bookData.current_fine = 0;
    deleteData(bookData.id);
}

const ulList = document.getElementById('newentries');
ulList.addEventListener('click',async (e)=>{
    if(e.target.classList.contains('return')){
        const li = e.target.parentElement;
        const userData = JSON.parse(li.getAttribute('data-user-data'))
        
        if(userData.current_fine > 0){
            addInput(userData,li);
           
        }else{
            li.remove();
            deleteData(userData.id);
        }
    }
})


function updateFinesForOverdueBooks(){
    axios.get('/updatedFine')
        .then((response)=>{
            console.log(response);
        })
}

function displayBooks(){
    axios.get('/books')
        .then((response)=>{
            const length = Object.keys(response.data.book).length;
            for(let i=0;i<length;i++){
                const data = response.data.book[i];
                console.log(data);
                addUser(data);
            }
    })
}

window.addEventListener('load',()=>{
    displayBooks();
    updateFinesForOverdueBooks();
})