const path = require('path');
const indexFilePath = path.join(__dirname, '../views/index.html');

const Books = require('../models/book');

exports.getIndex = (req, res) => {
    res.sendFile(indexFilePath);
};

exports.updateFine = async (req,res)=>{

    const currentDate = new Date();
    const books = await Books.findAll();
  
    await Promise.all(
        books.map(async (book) => {
            if (book.return_at && new Date(book.return_at) < currentDate) {
                const hoursLate = Math.floor((currentDate - new Date(book.return_at)) / (1000 * 60 * 60));
                const fine = hoursLate * 10;

                await Books.update(
                    { current_fine: fine }, 
                    { where: 
                        { id: book.id } 
                    });
            }
        })
    );
}

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
    returnDate.setDate(currentDate.getDate());

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
    Books.findByPk(req.params.id)
        .then((book)=>{
            return book.destroy();
        })
        .catch((err)=>{
            console.log(err);
        })
};
