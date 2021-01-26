const Query = {
    users(parent, args, { db } , info) {
        if (!args.query) {
            return db.users
        }
        return db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
    },

    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts
        }
        return db.posts.filter(post => {
            const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())   
            return titleMatch || bodyMatch
        })
    },
    comments(parent, args, { db }, info) {
        if (!args.pk) {
            return db.comments
        }
        return db.comments.filter( comment => comment.id === args.pk )
        
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
    
}

export { Query as default }
    
