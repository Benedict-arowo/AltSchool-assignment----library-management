class User {
	id: number;
	name: string;
	borrowedBooks: Array<Book>;
	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
		this.borrowedBooks = [];
	}

	peakBook(ISBN: string): Book | undefined {
		return MainLibrary.books.find((book) => book.ISBN === ISBN);
	}
	returnBook(ISBN: string): boolean {
		const borrowedBook = this.borrowedBooks.find(
			(book) => book.ISBN === ISBN
		);
		if (borrowedBook) {
			this.borrowedBooks = this.borrowedBooks.filter(
				(book) => book.ISBN !== ISBN
			);
			borrowedBook.borrowed = false;

			return true;
		}
		return false;
	}
}

class Book {
	title: string;
	author: string;
	ISBN: string;
	id: string;
	borrowed: boolean;

	constructor({
		title,
		author,
		isbn,
		id,
		borrowed,
	}: {
		title: string;
		author: string;
		isbn: string;
		id: string;
		borrowed: boolean;
	}) {
		this.title = title;
		this.author = author;
		this.ISBN = isbn;
		this.id = id;
		this.borrowed = borrowed;
	}

	isBorrowed(): boolean {
		return this.borrowed;
	}
}

class Library {
	books: Book[];
	members: User[];

	constructor(books: Book[] = [], members: User[] = []) {
		this.books = books;
		this.members = members;
	}

	public registerMembers(user: User) {
		return this.members.push(user);
	}
	public addNewBook(book: Book) {
		this.books.push(book);
		return true;
	}

	public borrowBook(user: User, ISBN: string): boolean {
		if (user.borrowedBooks.length <= 3) {
			const book = this.books.find((book) => book.ISBN === ISBN);
			// If book exists, and is not yet borrowed. Then the user may borrow it.
			if (book && !book.isBorrowed()) {
				console.log(2);
				user.borrowedBooks.push(book);
				book.borrowed = true;
				return true;
			}
			return false;
		}

		return false;
	}
}

const MainLibrary = new Library();
const book1 = new Book({
	title: "The Lord of the Rings",
	author: "Tolkien",
	isbn: "123456789",
	id: "1",
	borrowed: false,
});
const book2 = new Book({
	title: "The Hobbit",
	author: "Tolkien",
	isbn: "987654321",
	id: "2",
	borrowed: false,
});

const user1 = new User(1, "User 1");
const user2 = new User(2, "User 2");

MainLibrary.addNewBook(book1);
MainLibrary.addNewBook(book2);
MainLibrary.registerMembers(user1);
MainLibrary.registerMembers(user2);

MainLibrary.borrowBook(user1, book1.ISBN);

// Book and User => User can have many books
// Library and Books => Library can have many books
// Library and user => Library can have many users
