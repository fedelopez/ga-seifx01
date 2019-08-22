let readingList = [
    {
        title: "Book 1",
        author: "Author 1",
        alreadyRead: false
    },
    {
        title: "Book 2",
        author: "Author 2",
        alreadyRead: true
    },
    {
        title: "Book 3",
        author: "Author 3",
        alreadyRead: true
    },
    {
        title: "Book 4",
        author: "Author 4",
        alreadyRead: false
    },
];
for (book of readingList) {
    console.log(`${book.title} by ${book.author}`)
    if (book.alreadyRead) {
        console.log(`You already read ${book.title} by ${book.author}`);
    } else {
        console.log(`You still need to read ${book.title} by ${book.author}`);
    }
}


