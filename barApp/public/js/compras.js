
//function that recibes an id the it will use to get the data from the database

let compras = []



function newCompra(id) {
    compras.push({id: id, mp: false});
}

function newCompraMp(id) {
    compras.push({id: id, mp: true});
}

setInterval(() => {
    if(compras.length > 0) {
        let compra = compras.shift();
        axios.post('/caja/newCompra', 
            {
                id: compra.id,
                mp: compra.mp
            }, 
            {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(function (res) {
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}, 500);

