const express = require('express');
const logger = require('morgan');
const axios = require('axios');
const userRoute = require('./routes/user');

const app = express();

// Middlewares
app.use(logger('dev'));

//Routes
app.use('/user', userRoute)

async function getUserInfo() {
    try {
        const user = (await axios.get('https://jsonplaceholder.typicode.com/users')).data;
        const posts = (await axios.get('https://jsonplaceholder.typicode.com/posts')).data;
        const comments = (await axios.get('https://jsonplaceholder.typicode.com/comments')).data;

        const userData = [];
        for (let i = 0; i < user.length; i++) {
            let data = {
                id: user[i].id,
                name: user[i].name,
                username: user[i].username,
                email: user[i].email,
                comments: [],
                posts: []
            }

            for (let j = 0; j < posts.length; j++) {
                if (user[i].id === posts[j].userId) {
                    let post = {
                        id: posts[j].postId,
                        title: posts[j].title,
                        body: posts[j].body
                    }

                    for (let k = 0; k < comments.length; k++) {
                        if (posts[j].id === comments[k].postId) {
                            let comment = {
                                id: comments[k].id,
                                name: comments[k].name,
                                body: comments[k].body
                            }
                            data.comments.push(comment);
                        }
                    }

                    data.posts.push(post);
                }
            }

            userData.push(data);
        }

        console.error(userData);
    } catch (error) {
        console.error(error);
    }
}

//Start the server
const port = app.get('port') || 3000;
app.listen(port);

// app.get('/', (req, res, next) => {
//     getUser().then( function(result) {
//         let user = result;
//         // console.log(user);
//         return res.send(user);
//     });
// });

getUserInfo();