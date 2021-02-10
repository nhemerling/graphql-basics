const users = [{
  id: '1',
  name: 'Nicoco',
  email: 'coco@email.com',
  age: 29
}, {
  id: '2',
  name: 'Jess',
  email: 'jess@email.com'
}, {
  id: '3',
  name: 'Fred',
  email: 'freddydeddy@hotmail.com'
}]

const posts = [{
  id: '1',
  title: 'Bags of donuts',
  body: 'OOOOOOOOOO',
  published: true,
  author: '1'
}, {
  id: '2',
  title: 'All the Almonds of the World',
  body: 'here here here here here',
  published: false,
  author: '1'
}, {
  id: '3',
  title: 'Garbage',
  body: 'Here is some garbage',
  published: true,
  author: '2'
}]

const comments = [{
  id: '101',
  text: 'Literally garbage',
  author: '1',
  post: '3'
}, {
  id: '202',
  text: 'Thanks for the garbage!',
  author: '2',
  post: '3'
}, {
  id: '303',
  text: 'Even smells like garbage',
  author: '3',
  post: '3'
}, {
  id: '404',
  text: 'Happy for this delicious bag of donuts.',
  author: '3',
  post: '1'
}]

const db = {
  users,
  posts,
  comments
}

export { db as default }