(async () => {
    const tagReact = await j.fact({
        type: 'Blog.Tag',
        name: 'React'
    });

    // A fact is just a JSON object that has a `type` field.
    console.log(JSON.stringify(tagReact, null, 2));
})();