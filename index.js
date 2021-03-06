import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from "uuid/v4"

// Scalar types: String, Boolean, Int, Float, ID

const users = [
    {
        id: "1",
        name: "Nazli",
        email: "nazli@example.com",
        age: 33, 
    },
    {
        id: "2",
        name: "Moby",
        email: "moby@sample.com",
        age: 29
    },
    {
        id: "3",
        name: "Sarah",
        email: "sara@sample.com",
        age: 46, 
    }
]

const posts = [
    {
        id: "1", 
        title: "GraphQL Advantages",
        body: "single endpoint, fast, flexible, efficient, self-documenting",
        author: "1",
        published: false 
    }, 
    {
        id: "2",
        title: "How to GraphQL ",
        body: "It is easy to learn about graphQL since so many libraries are available",
        author: "2",
        published: false 
    },
    {
        id: "3",
        title: "GraphQL is futuristic",
        body: "flexibility and lean nature of GraphQL make it ideal to use with clients with very little resource especially storage like smartphones and other device as part of IoT",
        author: "1",
        published: false 
    }, 
    {
        id: "4",
        title: "MERNG Stack",
        body: "MERNG stands for Mongodb Express React Node GraphQL",
        author: "2",
        published: true 
    }
]

const comments = [
    {
        id: "1",
        text: "well this post is very informative",
        author: "1",
        post: "1"
    },
    {
        id: "2",
        text: "It seems the author lacks the knowledge of the subject",
        author: "1",
        post: "2"
    },
    {
        id: "3",
        text: "You should better research on the topic before posting about it",
        author: "2",
        post: "1"
    },
    {
        id: "4",
        text: "to be honest, it is very funny",
        author: "3",
        post: "4"
    },
    {
        id: "5",
        text: "Thank you, very informative and to the point",
        author: "2",
        post: "3"
    }
]

// Type Definitions (Schema)
const typeDefs = `
    type Query {
       me: User!
       users(query:String): [User!]!
       posts(query:ID): [Post!]!
       post: Post!
       comments(pk:ID): [Comment!]
    }

    type Mutation {
        createUser(name:String!, email:String!, age: Int): User!
        createPost(title: String!, body: String!, author: ID!, published: Boolean!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User{
       id: ID!
       name: String!
       email: String!
       age: Int
       posts: [Post!]
       comments: [Comment!]!
    }
    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
    type Comment{
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`
// Resolver 

const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
        },

        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }
            return posts.filter(post=> post.id === args.query)
        },
        comments(parent, args, ctx, info) {
            if (!args.pk) {
                return comments
            }
            return comments.filter( comment => comment.id === args.pk )
            
        },

        me() {
            return {
                id: "1244",
                name: "Django Khan",
                email: "django@mail.com",
                age: 21
            }
        },
        post() {
            return {
                id: "558",
                title: "Beginner's tutorial for GraphQL with NodeJs",
                body: "GraphQL is a new technique that replaces RESTFul Api as it has several advantages for instance, it is faster, more flexilbe, cleaner, use less data, self-documenting etc. In this you will learn how to make your own graphql server in node from scratch using libraries like babel and graphql-yoga"
            }
        }
    
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some( existing_user => existing_user.email === args.email)
            if (emailTaken) {
                throw new Error(`A user with ${args.email} already exists`)
            }

            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }
            users.push(user)
            return user
        }, 
        createPost(parent, args, ctx, info) {
            const existingAuthor = users.find(existing_user => existing_user.id === args.author)
            if (!existingAuthor) {
                throw new Error("Author not found!")
            }
            
            const new_post = {
                id: uuidv4(),
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }

            posts.push(new_post)
            return new_post

        },
        createComment(parent, args, ctx, info) {
            const userExists = users.find(existing_user => existing_user.id === args.author)
            const postExists = posts.find(existig_post => existig_post.id === args.post && existig_post.published )

            if (!userExists) {
                throw new Error("The user does not exist")
            }

            if (!postExists) {
                throw new Error("The post not found")
            }

            const newComment = {
                id: uuidv4(),
                text: args.text,
                post: args.post,
                author: args.author
            }
            comments.push(newComment)
            return newComment
        }

    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find( user => user.id === parent.author)
        }, 
        comments(parent, args, ctx, info) {
            return comments.filter( comment => comment.post === parent.id)
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter( post => post.author === parent.id)
        }, 
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id )
        }
    }, 
    Comment: {
        author(parent, args, ctx, info) {
            return users.find( user => user.id === parent.author)
        },
        post(parent, args, ctx, info) {
            return posts.find( post => post.id === parent.post)
        }
    }

}


const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log("The server is up and running"))