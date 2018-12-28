(async () => {
    // The predecessors are all listed out inline.
    // You don't have to call j.fact for each and every one.
    const tags = await j.fact({
        type: 'Blog.Post.Tags',
        post: {
            type: 'Blog.Post',
            created: new Date(),
            author: {
                type: 'Jinaga.User',
                publicKey: '---IF THIS WERE A REAL USER, THEIR PUBLIC KEY WOULD BE HERE---'
            }
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