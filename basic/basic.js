const axios = require('axios');

async function getUserInfo() {
    try {
        //Req: 1 - 2

        async function callApi(url) {
            const resp = await axios.get('https://jsonplaceholder.typicode.com' + url);
            return resp.data;
        }

        const [
            users,
            posts,
            comments
        ] = await Promise.all([
            callApi('/users'),
            callApi('/posts'),
            callApi('/comments')
        ]);


        //----------------------------------------------------------
        //Req: 3

        const userData = users.map(user => {
            // Câu này find luôn
            const userPosts = posts.find(post => user.id === post.userId)
            // commnent có email, dùng để find đc
            const userComments = comments.find(comment => comment.email === user.email)

            return {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                comments: userComments,
                posts: userPosts
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
        const user1stComment = newUserData.sort((a, b) => {
            return  b.commentsCount - a.commentsCount; //Max to min
        });

        const user1stPost = newUserData.sort((a, b) => {
            return  b.postsCount - a.postsCount; //Max to min
        });

        // console.log(user1stComment[0]);
        // console.log(user1stPost);

        //----------------------------------------------------------
        //Req: 7
        const userDataSorted = newUserData.sort((a, b) => {
            // return  a.name.localeCompare(b.name); //String alpha
            return  b.postsCount - a.postsCount; //Max to min
        });
        // console.log(userDataSorted);

        //----------------------------------------------------------
        //Req: 8
        const [
            post,
            commentsOfPost
        ] = await Promise.all([
            callApi('/posts/1'),
            callApi('/posts/1/comments')
        ]);

        const postDt = { ...post, comments: commentsOfPost};
        console.log(postDt);

    } catch (error) {
        console.error(error);
    }
}

//-----------
getUserInfo();