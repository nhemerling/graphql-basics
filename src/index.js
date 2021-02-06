import { GraphQLServer } from 'graphql-yoga';

//Scalar types - String, Boolean, Int, Float, ID

//Demo user data
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

//Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

//Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
    me() {
      return {
        id: '123098',
        name: 'Nicholas Hemerling',
        email: 'nicholas@email.com'
      }
    },
    post() {
      return {
        id: '456789',
        title: 'How to GraphQL',
        body: 'This is how',
        published: false
      }
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
      })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up!')
})