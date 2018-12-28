(async () => {
    const person = await j.fact({
        type: 'Jinaga.User',
        publicKey: '---IF THIS WERE A REAL USER, THEIR PUBLIC KEY WOULD BE HERE---'
    });
    const post = await j.fact({
        type: 'Blog.Post',
        created: new Date(),
        author: person
    });

    // A predecessor is just another JSON object.
    // It's called a predecessor becuase it comes first.
    // In this case, we have to have a person before they can write a post.
    console.log(JSON.stringify(post, null, 2));
})();