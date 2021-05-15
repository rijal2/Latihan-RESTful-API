const { nanoid } = require('nanoid');
const books = require('./books');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
   
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
   
    const newBook = {
      title, tags, body, id, createdAt, updatedAt,
    };
   
    books.push(newBook);
   
    const isSuccess = books.filter((buku) => buku.id === id).length > 0;
   
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          bukuId: id,
        },
      });
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      buku,
    },
});
   

  
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const buku = books.filter((buku) => buku.id === id)[0];
   
   if (buku !== undefined) {
      return {
        status: 'success',
        data: {
          buku,
        },
      };
    }
   
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
 
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((buku) => buku.id === id);

    if (index !== -1) {
        books[index] = {
          ...books[index],
          title,
          tags,
          body,
          updatedAt,
        };
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil diperbarui',
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

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const index = books.findIndex((buku) => buku.id === id);
   
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });
      response.code(200);
      return response;
    }
   
   const response = h.response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};
   
module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };