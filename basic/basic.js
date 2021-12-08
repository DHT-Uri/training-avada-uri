const axios = require('axios');

async function getUserInfo() {
    try {
        //Req: 1 - 2
        const users = (await axios.get('https://jsonplaceholder.typicode.com/users')).data;
        const posts = (await axios.get('https://jsonplaceholder.typicode.com/posts')).data;
        const comments = (await axios.get('https://jsonplaceholder.typicode.com/comments')).data;


        //----------------------------------------------------------
        //Req: 3

        // User For
        // const userData = [];
        // for (let i = 0; i < user.length; i++) {
        //     let data = {
        //         id: user[i].id,
        //         name: user[i].name,
        //         username: user[i].username,
        //         email: user[i].email,
        //         comments: [],
        //         posts: []
        //     }
        //
        //     for (let j = 0; j < posts.length; j++) {
        //         if (user[i].id === posts[j].userId) {
        //             let post = {
        //                 id: posts[j].postId,
        //                 title: posts[j].title,
        //                 body: posts[j].body
        //             }
        //
        //             for (let k = 0; k < comments.length; k++) {
        //                 if (posts[j].id === comments[k].postId) {
        //                     let comment = {
        //                         id: comments[k].id,
        //                         name: comments[k].name,
        //                         body: comments[k].body
        //                     }
        //                     data.comments.push(comment);
        //                 }
        //             }
        //
        //             data.posts.push(post);
        //         }
        //     }
        //
        //     userData.push(data);
        // }
        //
        // console.error(userData);
        const userData = users.map(user => {
            const postData = posts.map(post => {
                if (user.id === post.userId) {
                    return {
                        id: post.id,
                        title: post.title,
                        body: post.body
                    };
                }
                return null;
            }).filter(post => {
                return post !== null;
            });

            const commentData = comments.map(comment => {
                const postDt = postData.map(post => {
                    if (post.id === comment.postId) {
                        return {
                            id: comment.id,
                            postId: comment.postId,
                            name: comment.name,
                            body: comment.body
                        }
                    }
                    return null;
                }).filter(pt => {
                    return pt !== null;
                });

                if (postDt.length !== 0) {
                    return postDt[0];
                }
                return null;
            }).filter(comment => {
                return comment !== null;
            });

            return {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                comments: commentData,
                posts: postData
            }
        });
        // console.log(userData);

        //----------------------------------------------------------
        //Req: 4
        const userWithMoreThan3Comments = userData.filter(data => {
            return data.comments.length > 3;
        });
        // console.log(userWithMoreThan3Comments);

        //----------------------------------------------------------
        //Req: 5
        const newUserData = userData.map(data => {
            return {
                id: data.id,
                name: data.name,
                username: data.username,
                email: data.email,
                commentsCount: data.comments.length,
                postsCount: data.posts.length
            }
        });
        // console.log(newUserData)

        //----------------------------------------------------------
        //Req: 6
        let user1stComment = newUserData[0];
        let user1stPost = newUserData[0];

        const userCheckData = newUserData.map(data => {
            if (user1stComment.commentsCount < data.commentsCount) {
                user1stComment = data;
            }

            if (user1stPost.postsCount < data.postsCount) {
                user1stPost = data;
            }

            return true;
        });

        // console.log(user1stComment);
        // console.log(user1stPost);

        //----------------------------------------------------------
        //Req: 7
        const demoData = [
            {
                id: 1,
                name: 'Leanne Graham',
                username: 'Bret',
                email: 'Sincere@april.biz',
                commentsCount: 50,
                postsCount: 9
            },
            {
                id: 2,
                name: 'Ervin Howell',
                username: 'Antonette',
                email: 'Shanna@melissa.tv',
                commentsCount: 50,
                postsCount: 1
            },
            {
                id: 3,
                name: 'Clementine Bauch',
                username: 'Samantha',
                email: 'Nathan@yesenia.net',
                commentsCount: 50,
                postsCount: 6
            },
            {
                id: 4,
                name: 'Patricia Lebsack',
                username: 'Karianne',
                email: 'Julianne.OConner@kory.org',
                commentsCount: 50,
                postsCount: 2
            },
            {
                id: 5,
                name: 'Chelsey Dietrich',
                username: 'Kamren',
                email: 'Lucio_Hettinger@annie.ca',
                commentsCount: 50,
                postsCount: 5
            }
        ];
        const userDataSorted = newUserData.sort((a, b) => {
            // return  a.name.localeCompare(b.name); //String alpha
            return  b.postsCount - a.postsCount; //Max to min
        });
        // console.log(userDataSorted);

        //----------------------------------------------------------
        //Req: 8
        const post = (await axios.get('https://jsonplaceholder.typicode.com/posts/1')).data;
        const commentsOfPost = (await axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')).data;

        const postDt = { ...post, comments: commentsOfPost};
        console.log(postDt);

    } catch (error) {
        console.error(error);
    }
}

//-----------
getUserInfo();