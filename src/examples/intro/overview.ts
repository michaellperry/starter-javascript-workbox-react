async function dataIsStoredAsFacts() {
    console.log('In Jinaga, data is stored in terms of facts.');
    console.log('A fact is an immutable JSON object with a type:');

    const qedcode = await j.fact({
        type: 'Blog.Site',
        domain: 'qedcode.com'
    });

    console.log(JSON.stringify(qedcode, null, 2));
    console.log('');

    return qedcode;
}

async function factsHavePredecessors(qedcode) {
    console.log('A fact can refer to other facts.');
    console.log('When it does, those other facts are called *predecessors*:');

    const post = await j.fact({
        type: 'Blog.Post',
        createdAt: new Date(),
        site: qedcode
    });

    console.log(JSON.stringify(post, null, 2));
    console.log('');
}

async function queryForSuccessors(qedcode) {
    console.log('To find a set of related facts, run a query.');
    console.log('The query starts from a predecessor, and uses a template function');
    console.log('to describe the shape of the desired successors:');

    const posts = await j.query(qedcode, j.for(postInSite));

    console.log(JSON.stringify(posts, null, 2));
    console.log('Notice how every time you run the code, a new post appears.');
    console.log('');
}

function postInSite(s) {
    return j.match({
        type: 'Blog.Post',
        site: s
    });
}

(async () => {
    const qedcode = await dataIsStoredAsFacts();
    await factsHavePredecessors(qedcode);
    await queryForSuccessors(qedcode);
})();