(async () => {
    const person = {
        type: 'Jinaga.User',
        publicKey: '---IF THIS WERE A REAL USER, THEIR PUBLIC KEY WOULD BE HERE---'
    };

    const tags = await j.fact({
        type: 'Blog.Post.Tags',
        post: {
            type: 'Blog.Post',
            created: new Date(),
            author: person
        },
        tags: [{
            type: 'Blog.Tag',
            name: 'React'
        }, {
            type: 'Blog.Tag',
            name: 'CSS'
        }, {
            type: 'Blog.Tag',
            name: 'Micro-Frontends'
        }]
    });
    
    console.log(JSON.stringify(tags, null, 2));
})();