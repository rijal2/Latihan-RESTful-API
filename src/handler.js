const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((buku) => buku.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);
  response.header('Access-Control-Allow-Origin', '*');
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  const all = [...books.values()];
  let mBook = all;

  if (name !== undefined) {
    mBook = all.filter((entry) => entry.name.toLowerCase().includes(name.toLowerCase()));
    const response = h.response({
      status: 'success',
      data: {
        books: mBook.map((item) => (
          {
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          }
        )),
      },
    });
    response.code(200);
    return response;
  }

  if (reading !== undefined) {
    mBook = all.filter((entry) => entry.reading === (reading === '1'));
    const response = h.response({
      status: 'success',
      data: {
        books: mBook.map((item) => (
          {
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          }
        )),
      },
    });
    response.code(200);
    return response;
  }

  if (finished !== undefined) {
    mBook = all.filter((entry) => entry.finished === (finished === '1'));
    const response = h.response({
      status: 'success',
      data: {
        books: mBook.map((item) => (
          {
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          }
        )),
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((item) => (
        {
          id: item.id,
          name: item.name,
          publisher: item.publisher,
        }
      )),
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((buku) => buku.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // const updatedAt = new Date().toISOString();

  const index = books.findIndex((buku) => buku.id === id);

  const dataId = books.filter((item) => item.id === id);

  if (!dataId.length) {
    const response = h.response({

      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  if (!name) {
    const response = h.response({

      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((buku) => buku.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
