const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler, } = require('./handler');
const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: () => {},
    },
    {
      method: 'GET',
      path: '/books',
      handler: getAllNotesHandler,
    },
    {
      method: 'GET',
      path: '/books/{id}',
      handler: () => {},
    },

    {
      method: 'GET',
      path: '/books/{id}',
      handler: getNoteByIdHandler,
    },
    {
      method: 'PUT',
      path: '/books/{id}',
      handler: () => {},
    },
    {
      method: 'PUT',
      path: '/books/{id}',
      handler: editNoteByIdHandler,
    },
    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: () => {},
    },
    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: deleteNoteByIdHandler,
   },
  ];
   
  module.exports = routes;