const path = require('path');
const indexFilePath = path.join(__dirname, '../views/index.html');

const Books = require('../models/book');

exports.getIndex = (req, res) => {
    res.sendFile(indexFilePath);
};



exports.getBooks = (req,res)=>{
    Books.findAll()
        .then((books)=>{
            res.json({book: books});
        })  
        .catch((err)=>{
            console.log(err);
        })
};

exports.postBook = (req,res)=>{
    const book_name = req.body.bookname;
    const currentDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(currentDate.getDate() + 10);

    Books.create({
        book_name: book_name,
        issued_on: currentDate,
        return_at: returnDate,
        current_fine: 100, 
      }).then((createdEntry)=>{
        res.status(201).json({
            message: 'Entry created successfully',
            book: createdEntry
        });
        
    })
    .catch((err)=>{
        console.log(err);
    })
};

exports.retunEntry = (req,res)=>{
    console.log("delete",req.params.id)
    Books.findByPk(req.params.id)
        .then((book)=>{
            // console.log("innn",book)
            // if(book.current_fine == 0){
            //     console.log(book.current_fine)
            return book.destroy();
            // }else{
            //     console.log("Big Fine",book.current_fine)
            //     res.json({book: book});
            // }
        })
        .catch((err)=>{
            console.log(err);
        })
};
