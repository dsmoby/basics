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
    },
    {
        id: "4",
        name: "Usman",
        email: "usmanl@sample.com",
        age: 27, 
    },
    {
        id: "5",
        name: "Adam",
        email: "adam@sample.com",
        age: 35, 
    },
    {
        id: "6",
        name: "Manahil",
        email: "manahil@sample.com",
        age: 51, 
    }
]

const posts = [
    {
        id: "1", 
        title: "GraphQL Advantages",
        body: "single endpoint, fast, flexible, efficient, self-documenting",
        author: "1",
        published: true 
    }, 
    {
        id: "2",
        title: "How to GraphQL ",
        body: "It is easy to learn about graphQL since so many libraries are available",
        author: "2",
        published: true 
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
        post: "2"
    }
]

const db = {
    users,
    posts,
    comments
}

export { db as default }
