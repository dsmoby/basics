import uuidv4 from "uuid/v4"

const Mutation = {
    createUser(parent, args, {db}, info) {
        const emailTaken = db.users.some( existing_user => existing_user.email === args.data.email)
        if (emailTaken) {
            throw new Error(`A user with ${args.data.email} already exists`)
        }

        const user = {
            id: uuidv4(),
            ...args
        }
        users.push(user)
        return user
    }, 

    deleteUser(parent, args, {db}, info) {
        const userIndex = users.findIndex(user => user.id === args.id)

        if (userIndex === -1) { throw new Error("user not found") } 

        const deletedUser = users.splice(userIndex, 1)

        db.posts = db.posts.filter(post => {
            db.comments.filter(comment => comment.post !== post.id )
            return post.author !== args.id
        })

        db.comments = db.comments.filter(comment => comment.author !== args.id)
        return deletedUser[0]
    },

    updateUser(parent, args, { db }, info) {
        const {id, data} = args
        const user = db.users.find(cur_user => cur_user.id === id)

        if (!user) {
            throw new Error("User not found")
        }

        if (typeof data.email === 'string' && user.email !== data.email) {
            const emailTaken = db.users.some(cur_user => cur_user.email === data.email)

            if (emailTaken) {
                throw new Error("Email already taken")
            }

            user.email = data.email
        }

        if (typeof data.name === 'string') {
            
            user.name = data.name
        }

        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user
          
    },

    createPost(parent, args, {db}, info) {
        const existingAuthor = db.users.find(existing_user => existing_user.id === args.data.author)
        if (!existingAuthor) {
            throw new Error("Author not found!")
        }
        
        const new_post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(new_post)
        return new_post

    },

    deletePost(parent, args, {db}, info) {
        const postIndex = db.posts.findIndex( current_post => current_post.id === args.id)
        if (postIndex === -1) {
            throw new Error("Post does not exist")
        }
        const deletedPost = db.posts.splice(postIndex, 1)
            
        db.comments = db.comments.filter(current_comment => current_comment.post !== args.id)
            
        return deletedPost[0]
    },

    updatePost(parent, args, { db }, info) {
        const { id, data } = args
        const post = db.posts.find(cur_post => cur_post.id === id)
        
        if (!post) {
            throw new Error("Post not found")
        }

        if (typeof data.title === 'string') {
            post.title = data.title     
        }

        if (typeof data.body === 'string') {
            post.body = data.body     
        }

        if (typeof data.published === 'boolean') {
            post.published = data.published     
        }

        return post
    },

    createComment(parent, args, {db, pubsub }, info) {
        const userExists = db.users.find(existing_user => existing_user.id === args.data.author)
        const postExists = db.posts.find(existig_post => existig_post.id === args.data.post && existig_post.published)
        const commentExists = db.comments.find(cur_cmnt => cur_cmnt.text === args.data.text && cur_cmnt.author === args.data.author && cur_cmnt.post === args.data.post )

        if (!userExists) {
            throw new Error("The user does not exist")
        }

        if (!postExists) {
            throw new Error("The post not found")
        }
        
        if (commentExists) {
            throw new Error("You already posted the comment")
        }

        const newComment = {
            id: uuidv4(),
            ...args.data
        }


        db.comments.push(newComment)

        pubsub.publish(`comment ${args.data.post}`, { comment: newComment })

        return newComment
    },
    deleteComment(parent, args, {db}, info) {
        const commentIdx = db.comments.findIndex(cur_cmnt => cur_cmnt.id === args.id)
        
        if (commentIdx === -1) {
            throw new Error("Comment not found")
        }

        const deleteCmnt = db.comments.splice(commentIdx, 1)

        return deleteCmnt[0]
    },
    updateComment(parent, args, { db }, info) {

        const { id, data } = args
        
        const comment = db.comments.find(cmnt => cmnt.id === id)

        if (!comment) {
            throw new Error("Comment not found")
        }

        if (typeof data.text !== 'string') {
            throw new Error("Invalid Type. Please enter a string only")
        }


        if (data.text !== comment.text) {
            comment.text = data.text
            console.log("comment updated")
        }
        else {
            console.log("comment did not update since there's no change")
        }

        return comment

    }

}
export default Mutation